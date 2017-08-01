import React from 'react';
import ReactDOM from 'react-dom';
import AptList from '../js/AptList.js';
import ReactTestUtils from 'react-dom/test-utils';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);
import { shallow, mount, render } from 'enzyme';

/* chai-enzyme imports */
// import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'
chai.use(chaiEnzyme());

describe('AptList', function () {

	it('loads without error', function () {
		const aptList = ReactTestUtils.renderIntoDocument(
			<AptList
				singleItem = { 0 }
				whichItem = { 0 }
			/>
		);

		expect(aptList).to.exist;
		expect(aptList.props.singleItem).to.equal(0);
		expect(aptList.props.whichItem).to.equal(0);
	});

	it('shows a single appointment', function () {

		let itemReturned;
		const getItemToDelete = item => { itemReturned = item; }

		const aptList = ReactTestUtils.renderIntoDocument(
			<AptList
				singleItem = { { petName: "Buffy", ownerName: "Hassum Harrod", aptDate: "2016-06-20 15:30", aptNotes: "This Chihuahua has not eaten for three days and is lethargic" } }
				whichItem = { { petName: "Buffy", ownerName: "Hassum Harrod", aptDate: "2016-06-20 15:30", aptNotes: "This Chihuahua has not eaten for three days and is lethargic" } }
				onDelete = { getItemToDelete }
			/>
		);

		// Chai.js assertions
		expect(aptList).to.be.instanceOf(AptList);
		const singleItem = aptList.props.singleItem;
		expect(singleItem).to.not.be.undefined;
		expect(singleItem).to.have.property('petName');
		expect(singleItem).to.have.property('ownerName').that.is.a('String');
		expect(singleItem).to.have.property('aptDate').that.is.a('String');
		const whichItem = aptList.props.whichItem;
		expect(whichItem).to.not.be.undefined;
		expect(whichItem).to.have.property('ownerName').equal('Hassum Harrod');

		const btn = ReactTestUtils.findRenderedDOMComponentWithClass(
			aptList, 'pet-delete'
		);
		ReactTestUtils.Simulate.click(btn);
		expect(singleItem).to.have.property('petName').to.equal('Buffy');
		expect(itemReturned).to.have.property('petName').that.is.a('String');

		// Chai.js assertions for enzyme
		const deleteItem = sinon.stub();
		const wrapper = mount(
			<AptList
				singleItem = { { petName: "Buffy", ownerName: "Hassum Harrod", aptDate: "2016-06-20 15:30", aptNotes: "This Chihuahua has not eaten for three days and is lethargic" } }
				whichItem = { { petName: "Buffy", ownerName: "Hassum Harrod", aptDate: "2016-06-20 15:30", aptNotes: "This Chihuahua has not eaten for three days and is lethargic" } }
				onDelete = { deleteItem }
			/>
		);

		expect(wrapper.find('.pet-name').text()).to.equal('Buffy');
		expect(wrapper.find('.apt-notes').text()).to.equal('This Chihuahua has not eaten for three days and is lethargic');
		wrapper.find('.pet-delete').simulate('click');
		expect(deleteItem).to.have.been.calledOnce;
		expect(deleteItem).to.have.been.calledWith({ petName: "Buffy", ownerName: "Hassum Harrod", aptDate: "2016-06-20 15:30", aptNotes: "This Chihuahua has not eaten for three days and is lethargic" });
	});

});