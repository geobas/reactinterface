import React from 'react';
import ErrorMessage from '../js/ErrorMessage.js';
import ReactTestUtils from 'react-dom/test-utils';
import chai, { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

/* chai-enzyme imports */
// import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'
chai.use(chaiEnzyme());

describe('ErrorMessage', function () {

	it('loads without error', function () {
		const errorMessage = ReactTestUtils.renderIntoDocument(
			<ErrorMessage
				errors = { [] }
				errorsVisible = { false }
			/>
		);

		expect(errorMessage).to.exist;
		expect(errorMessage.props.errors.length).to.equal(0);
		expect(errorMessage.props.errorsVisible).to.be.false;
	});

	it('shows error messages', function () {
		const errorMessage = ReactTestUtils.renderIntoDocument(
			<ErrorMessage
				errors = { [ {'error1': 'dummy1'}, {'error2': 'dummy2'} ] }
				errorsVisible = { true }
			/>
		);

		// Chai.js assertions
		expect(errorMessage).to.be.instanceOf(ErrorMessage);
		const errors = errorMessage.props.errors;
		expect(errors).to.not.be.undefined;
		expect(errors.length).to.equal(2, 'errors length fault');
		expect(errors[1]).to.have.property('error2': 'dummy2');
		expect(errors[1]['error2']).to.equal('dummy2');
		expect(errorMessage.props.errorsVisible).to.not.be.undefined;
		expect(errorMessage.props.errorsVisible).to.equal(true, 'errors div tag should be visible');

		// Chai.js assertions for enzyme
		const wrapper = mount(
			<ErrorMessage
				errors = { [ {'error1': 'dummy1'}, {'error2': 'dummy2'} ] }
				errorsVisible = { true }
			/>
		);
		expect(wrapper.find('.error')).to.have.length(2);
		expect(wrapper.find('p').first()).to.have.className('error');
		expect(wrapper.find('p').first().text()).to.equal('dummy1');
		expect(wrapper).to.have.style('display', 'block');
	});

});