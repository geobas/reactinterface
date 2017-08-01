import React from 'react';
import AddAppointment from '../js/AddAppointment.js';
import ReactTestUtils from 'react-dom/test-utils';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, { expect } from 'chai';
chai.use(sinonChai);
import chaiEnzyme from 'chai-enzyme'
chai.use(chaiEnzyme());

describe('AddAppointment', function () {

	it('loads without error', function () {
		const addAppointment = ReactTestUtils.renderIntoDocument(
			<AddAppointment
				bodyVisible = { false }
				handleToggle = { null }
				addApt = { null }
				addErrorMsg = { null }
			/>
		);

		expect(addAppointment).to.exist;
		expect(addAppointment.props.bodyVisible).to.equal(false);
		expect(addAppointment.props.handleToggle).to.equal(null);
		expect(addAppointment.props.addApt).to.equal(null);
		expect(addAppointment.props.addErrorMsg).to.equal(null);
	});

	it('adds appointment', function () {

		// Chai.js assertions for enzyme
		const handleToggle = sinon.stub();
		const addApt = sinon.stub();
		const addErrorMsg = sinon.stub();

		const wrapper = mount(
			<AddAppointment
				bodyVisible = { false }
				handleToggle = { handleToggle }
				addApt = { addApt }
				addErrorMsg = { addErrorMsg }
			/>
		);

		expect(wrapper.find('.panel-body')).to.have.style('display', 'none');
		wrapper.find('.apt-addheading').simulate('click');
		expect(handleToggle).to.have.been.calledOnce;
		wrapper.find('.panel-body').get(0).style.display = 'block';
		expect(wrapper.find('.panel-body')).to.have.style('display', 'block');

		// all fields are empty
		wrapper.find('.add-appointment').simulate('submit');
		expect(addErrorMsg).to.have.been.calledOnce;
		expect(addErrorMsg).to.have.been.calledWithExactly([{ petName : 'Pet name is too short...' }, { ownerName : 'Owner name is too short...' }, { inputAptDate : 'Date was not given...' }, { aptTime : 'Time was not given...' }], true);

		// some fields are empty
		// wrapper.find('#petName').node.value = 'dummy'; // it works also
		wrapper.find('#petName').get(0).value = 'dummy';
		wrapper.find('.add-appointment').simulate('submit');
		expect(addErrorMsg).to.have.been.calledWithExactly([{ ownerName : 'Owner name is too short...' }, { inputAptDate : 'Date was not given...' }, { aptTime : 'Time was not given...' }], true);

		// no field is empty
		wrapper.find('#petOwner').get(0).value = 'dummy';
		wrapper.find('#aptDate').get(0).value = 'date';
		wrapper.find('#aptTime').get(0).value = 'time';
		wrapper.find('.add-appointment').simulate('submit');
		expect(addErrorMsg).to.have.been.calledThrice;
		expect(addErrorMsg).to.have.been.calledWithExactly([], false);
		expect(addApt).to.have.been.calledOnce;
		expect(addApt).to.have.been.calledWithExactly({ petName: 'dummy', ownerName: 'dummy', aptDate: 'date time', aptNotes: '' });

	});

});