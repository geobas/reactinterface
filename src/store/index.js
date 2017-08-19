import C from '../constants'
import appReducer from './reducers'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

const consoleMessages = store => next => action => {

	let result

	console.groupCollapsed(`dispatching action => ${action.type}`)
	// console.log(`total appointments before action "${action.type}" : `, store.getState().myAppointments.length)
	result = next(action)

	let { myAppointments } = store.getState()
	let { errorMsg } = store.getState()

	console.log(`
			aptBodyVisible: ${store.getState().aptBodyVisible}
	`)
  
	console.log(`
			errorMsg count: ${store.getState().errorMsg.length}			
	`)

	errorMsg.forEach( (error) => {
		console.log(`
			${Object.keys(error).map(k => error[k])}
		`)
	})

	console.log(`
			errorMsgVisible: ${store.getState().errorMsgVisible}
	`)

	console.table(myAppointments)

	console.log(`
			orderBy: ${store.getState().orderBy}
			orderDir: ${store.getState().orderDir}
			queryText: ${store.getState().queryText}
	`)

	// myAppointments.forEach( (appointment) => {
	// 	console.log(`
	// 		id: ${appointment.id}
	// 		petName: ${appointment.petName}
	// 		ownerName: ${appointment.ownerName}
	// 		aptDate: ${appointment.aptDate}
	// 		aptNotes: ${appointment.aptNotes}
	// 	`)
	// })

	// console.log(`total appointments after action "${action.type}" : ${myAppointments.length}`)

	console.groupEnd()

	return result

}

export default (initialState={}) => {
	return applyMiddleware(thunk,consoleMessages)(createStore)(appReducer, initialState)
}