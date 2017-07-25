import React from 'react';
import ReactDOM from 'react-dom';
import ErrorMessage from '../js/ErrorMessage.js';
import ReactTestUtils from 'react-dom/test-utils';
import expect, { createSpy, spyOn, isSpy } from 'expect';

describe('ErrorMessage', function () {

    it('loads without error', function () {
        var errorMessage = ReactTestUtils.renderIntoDocument(
            <ErrorMessage
				errors = { [] }
				errorsVisible = { false }
            />
        );

        expect(errorMessage).toExist();
        expect(errorMessage.props.errors.length).toEqual(0);
    });

    it('shows error messages', function () {
        var errorMessage = ReactTestUtils.renderIntoDocument(
            <ErrorMessage
				errors = { [ {'error1': 'dummy1'}, {'error2': 'dummy2'} ] }
				errorsVisible = { true }
            />
        );

        const errors = errorMessage.props.errors;

        expect(errors.length).toEqual(2);
        expect(errors[1]).toEqual({'error2': 'dummy2'});
        expect(Object.values(errors[1])[0]).toEqual('dummy2');
        expect(errorMessage.props.errorsVisible).toEqual(true);
    });

});