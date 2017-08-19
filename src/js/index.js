import C from '../constants'
import React from 'react';
import { render } from 'react-dom'
import MainInterface from './MainInterface';
import sampleData from './initialState'
import storeFactory from '../store'
import { Provider } from 'react-redux'

const store = storeFactory(sampleData)

render(
	<Provider store={store}>
		<MainInterface />
	</Provider>,
	document.getElementById('petAppointments')
)