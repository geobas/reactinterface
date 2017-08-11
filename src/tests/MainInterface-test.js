import React from 'react';
import MainInterface from '../js/MainInterface.js';
import AddAppointment from '../js/AddAppointment.js';
import ReactTestUtils from 'react-dom/test-utils';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, { expect } from 'chai';
chai.use(sinonChai);
import chaiEnzyme from 'chai-enzyme'
chai.use(chaiEnzyme());

describe('MainInterface', function () {

	// this.timeout(20);

	let wrapper;

	beforeEach(function() {

		wrapper = mount(
			<MainInterface />
		);

		wrapper.setState({
			aptBodyVisible: false,
			orderBy: 'petName',
			orderDir: 'asc',
			queryText: '',
			myAppointments: [
								{
									"petName": "Buffy",
									"ownerName": "Hassum Harrod",
									"aptDate": "2016-06-20 15:30",
									"aptNotes": "This Chihuahua has not eaten for three days and is lethargic"
								},
								{
									"petName": "Spot",
									"ownerName": "Constance Smith",
									"aptDate": "2016-06-24 08:30",
									"aptNotes": "This German Shepherd is having some back pain"
								}
							],
			errorMsg: [],
			errorMsgVisible: false
		});

	});

	it('loads without error', function () {

		expect(wrapper.find('.interface').exists()).to.be.true;
		expect(wrapper.getNode()).to.be.an.instanceof(MainInterface);
	});

	it('shows appointments', function () {

		// console.log(wrapper.debug());
		expect(wrapper.state('orderBy')).to.equal('petName');
		expect(wrapper.state('errorMsgVisible')).to.be.false;
		expect(wrapper.find('.panel-body')).to.have.style('display', 'none');
		expect(wrapper.find('.media-list').children()).to.have.length(2);
		expect(wrapper.find('.media-list').children().first().find('.pet-name').text()).to.equal('Buffy');
		expect(wrapper.find('.media-list').children().last().find('.apt-notes').text()).to.equal('This German Shepherd is having some back pain');

		wrapper.setState({ aptBodyVisible: true });
		expect(wrapper.find('.panel-body')).to.have.style('display', 'block');

		wrapper.find('.apt-addheading').simulate('click');
		expect(wrapper.find('.panel-body')).to.have.style('display', 'none');

	});

	it('adds a new appointment', function () {

		wrapper.setState({ aptBodyVisible: true });
		expect(wrapper.find('.panel-body')).to.have.style('display', 'block');
		expect(wrapper.find('.media-list li').length).to.equal(2);

		wrapper.find('#petName').get(0).value = 'dummy';
		wrapper.find('#petOwner').get(0).value = 'dummy';
		wrapper.find('#aptDate').get(0).value = '2017-08-02';
		wrapper.find('#aptTime').get(0).value = '14:06';
		wrapper.find('.btn-add-appointment').simulate('submit');
		expect(wrapper.find('.media-list li').length).to.equal(3);
		expect(wrapper.contains(<span className="pet-name">dummy</span>)).to.be.true;
		expect(wrapper.contains(<span className="apt-date pull-right">2017-08-02 14:06</span>)).to.be.true;
		wrapper.setState({ aptBodyVisible: false });

	});

	it('doesn\'t add a new appointment', function () {

		wrapper.setState({ aptBodyVisible: true });
		expect(wrapper.find('.panel-body')).to.have.style('display', 'block');
		expect(wrapper.find('.media-list li').length).to.equal(2);

		wrapper.find('#petName').get(0).value = 'dummy';
		wrapper.find('.btn-add-appointment').simulate('submit');
		expect(wrapper.find('.media-list li').length).to.equal(2);
		expect(wrapper.find('.alert-warning')).to.have.style('display', 'block');
		expect(wrapper.state('errorMsg')).to.be.an('array').that.is.not.empty;
		expect(wrapper.state('errorMsg')).to.be.an('array').to.have.lengthOf(3);
		expect(wrapper.contains(<p className='error'>Owner name is too short...</p>)).to.equal(true);

	});

	it('deletes an appointment', function () {

		expect(wrapper.find('.media-list li').length).to.equal(2);
		wrapper.find('.pet-delete').first().simulate('click');
		expect(wrapper.find('.media-list li').length).to.equal(1);

	});

	it('searches an appointment', function () {

		expect(wrapper.find('.media-list li').length).to.equal(2);
		wrapper.find('.SearchApts').get(0).value = 'dummy';
		wrapper.find('.SearchApts').first().simulate('change');
		expect(wrapper.find('.media-list li').length).to.equal(0);

		wrapper.find('.SearchApts').node.value = 'smith';
		wrapper.find('.SearchApts').first().simulate('change');
		expect(wrapper.find('.media-list li').length).to.equal(1);

		wrapper.find('.SearchApts').node.value = '08:30';
		wrapper.find('.SearchApts').first().simulate('change');
		expect(wrapper.find('.media-list li').length).to.equal(1);

	});

	it('sorts appointments', function () {

		expect(wrapper.find('.pet-name').first().text()).to.equal('Buffy');
		wrapper.find('.desc').first().simulate('click');
		expect(wrapper.find('.pet-name').first().text()).to.equal('Spot');

		wrapper.find('.asc').first().simulate('click');
		wrapper.find('.aptDate').first().simulate('click');
		expect(wrapper.find('.apt-date').last().text()).to.equal('2016-06-24 08:30');

	});


});