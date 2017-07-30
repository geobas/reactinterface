import React from 'react';
import ReactDOM from 'react-dom';
import AptList from '../js/AptList.js';
import ReactTestUtils from 'react-dom/test-utils';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
chai.use(spies);
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
		const aptList = ReactTestUtils.renderIntoDocument(
			<AptList
				singleItem = { { petName: "Buffy", ownerName: "Hassum Harrod", aptDate: "2016-06-20 15:30", aptNotes: "This Chihuahua has not eaten for three days and is lethargic" } }
				whichItem = { { petName: "Buffy", ownerName: "Hassum Harrod", aptDate: "2016-06-20 15:30", aptNotes: "This Chihuahua has not eaten for three days and is lethargic" } }
			/>
		);

		// Chai.js assertions
		expect(aptList).to.be.instanceOf(AptList);
		const singleItem = aptList.props.singleItem;
		expect(singleItem).to.not.be.undefined;
		expect(singleItem).to.have.property('petName': 'Buffy');
		expect(singleItem).to.have.property('ownerName').that.is.a('String');
		expect(singleItem).to.have.property('aptDate').that.is.a('String');
		const whichItem = aptList.props.whichItem;
		expect(whichItem).to.not.be.undefined;
		expect(whichItem).to.have.property('ownerName': 'Hassum Harrod');

		// const spy = chai.spy(aptList);

		// const btn = ReactTestUtils.findRenderedDOMComponentWithClass(
  //           aptList, 'pet-delete'
  //       );
  //       ReactTestUtils.Simulate.click(btn);




		// Chai.js assertions for enzyme
		const wrapper = mount(
			<AptList
				singleItem = { { petName: "Buffy", ownerName: "Hassum Harrod", aptDate: "2016-06-20 15:30", aptNotes: "This Chihuahua has not eaten for three days and is lethargic" } }
				whichItem = { { petName: "Buffy", ownerName: "Hassum Harrod", aptDate: "2016-06-20 15:30", aptNotes: "This Chihuahua has not eaten for three days and is lethargic" } }
				onDelete = { callback }
			/>
		);
		const callback = chai.spy(wrapper, 'handleDelete');
		expect(wrapper.find('.pet-name').text()).to.equal('Buffy');
		expect(wrapper.find('.apt-notes').text()).to.equal('This Chihuahua has not eaten for three days and is lethargic');
		wrapper.find('.pet-delete').get(0).click();
		// expect(callback).to.have.been.called().with({ petName: "Buffy", ownerName: "Hassum Harrod", aptDate: "2016-06-20 15:30", aptNotes: "This Chihuahua has not eaten for three days and is lethargic" });

	});

});