import C from '../constants'
import appReducer from './reducers'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

const consoleMessages = store => next => action => {

	let result

	console.groupCollapsed(`dispatching action => ${action.type}`)
	console.log(`total appointments before action "${action.type}" : `, store.getState().myAppointments.length)
	result = next(action)

	let { myAppointments } = store.getState()

	console.log(`
			aptBodyVisible: ${store.getState().aptBodyVisible}
	`)

	myAppointments.forEach( (appointment) => {
		console.log(`
			id: ${appointment.id}
			petName: ${appointment.petName}
			ownerName: ${appointment.ownerName}
			aptDate: ${appointment.aptDate}
			aptNotes: ${appointment.aptNotes}
		`)
	})

	console.log(`total appointments after action "${action.type}" : ${myAppointments.length}`)

	console.groupEnd()

	return result

}

export default (initialState={}) => {
	return applyMiddleware(thunk,consoleMessages)(createStore)(appReducer, initialState)
}