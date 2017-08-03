import React from 'react';
import SearchAppointments from '../js/SearchAppointments.js';
import ReactTestUtils from 'react-dom/test-utils';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, { expect } from 'chai';
chai.use(sinonChai);
import chaiEnzyme from 'chai-enzyme'
chai.use(chaiEnzyme());

describe('SearchAppointments', function () {

	it('loads without error', function () {
		const searchAppointments = ReactTestUtils.renderIntoDocument(
			<SearchAppointments
				orderBy = { null }
				orderDir = { null }
				onReOrder = { null }
				onSearch = { null }
			/>
		);

		expect(searchAppointments).to.exist;
		expect(searchAppointments.props.orderBy).to.equal(null);
		expect(searchAppointments.props.orderDir).to.equal(null);
		expect(searchAppointments.props.onReOrder).to.equal(null);
		expect(searchAppointments.props.onSearch).to.equal(null);
	});
	
	it('it filters appointments', function () {

		let orderByReturned, orderDirReturned, termReturned;
		const getParams = (orderBy, orderDir) => { orderByReturned = orderBy; orderDirReturned = orderDir; };
		const getSearchTerm = term => { termReturned = term; }

		const searchAppointments = ReactTestUtils.renderIntoDocument(
			<SearchAppointments
				orderBy = { 'petName' }
				orderDir = { 'asc' }
				onReOrder = { getParams }
				onSearch = { getSearchTerm }
			/>
		);

		// Chai.js assertions
		expect(searchAppointments).to.be.instanceOf(SearchAppointments);
		expect(searchAppointments.props.orderBy).to.not.be.undefined;
		expect(searchAppointments.props.orderBy).to.equal('petName');
		expect(searchAppointments.props.orderDir).to.not.be.undefined;	
		expect(searchAppointments.props.orderDir).to.equal('asc');

		// test
		let anchor = ReactTestUtils.findRenderedDOMComponentWithClass(
			searchAppointments, 'petName'
		);
		ReactTestUtils.Simulate.click(anchor);
		expect(orderByReturned).to.equal('petName');
		expect(orderDirReturned).to.equal('asc');

		// another test
		anchor = ReactTestUtils.findRenderedDOMComponentWithClass(
			searchAppointments, 'ownerName'
		);
		ReactTestUtils.Simulate.click(anchor);
		expect(orderByReturned).to.equal('ownerName');
		expect(orderDirReturned).to.equal('asc');        

		// another one
		anchor = ReactTestUtils.findRenderedDOMComponentWithClass(
			searchAppointments, 'desc'
		);
		ReactTestUtils.Simulate.click(anchor);
		expect(orderByReturned).to.equal('petName');
		expect(orderDirReturned).to.equal('desc');

		// last test
		let input = ReactTestUtils.findRenderedDOMComponentWithClass(
			searchAppointments, 'SearchApts'
		);
		ReactTestUtils.Simulate.change(input);
    	expect(termReturned).to.equal('');
    	input.value = 'xyz';
		ReactTestUtils.Simulate.change(input);
    	expect(termReturned).to.equal('xyz');

		// Chai.js assertions for enzyme
		const wrapper = mount(
			<SearchAppointments
				orderBy = { 'petName' }
				orderDir = { 'asc' }
				onReOrder = { getParams }
				onSearch = { getSearchTerm }
			/>
		);
		wrapper.find('.aptDate').simulate('click');
		expect(orderByReturned).to.equal('aptDate');
		expect(orderDirReturned).to.equal('asc');

		wrapper.find('.SearchApts').simulate('change');
		expect(termReturned).to.equal('');

	});	

});