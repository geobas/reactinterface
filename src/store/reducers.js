import C from '../constants'
import { combineReducers } from 'redux'
import _ from 'lodash'

export const aptBodyVisible = (state=[], action) => {

	switch(action.type) {

		case C.TOGGLE_ADD_FORM :

			return action.payload;

		default:
			return state
	}
}

export const errorMsg = (state=[], action) => {

	switch(action.type) {

		case C.ADD_ERROR :

			return [...state, action.payload]

		// case C.REMOVE_ERROR :

		// 	return action.payload;

		default:
			return state
	}
}

export const errorMsgVisible = (state=[], action) => {

	switch(action.type) {

		case C.TOGGLE_ERROR_MESSAGES :

			return action.payload;

		default:
			return state
	}
}

export const myAppointments = (state=[], action) => {

	switch(action.type) {

		case C.ADD_APPOINTMENT :

			return [...state, action.payload]

		case C.REMOVE_APPOINTMENT :

			return state.filter(appointment => appointment.id !== action.payload)

		case C.SEARCH_APPOINTMENT :

			let filteredApts = [];

			state.forEach( appointment => {
				if (
					(appointment.petName.toLowerCase().indexOf(queryText(null, { type: C.SET_QUERY_TEXT, payload: action.payload.queryText }))!=-1) ||
					(appointment.ownerName.toLowerCase().indexOf(queryText(null, { type: C.SET_QUERY_TEXT, payload: action.payload.queryText }))!=-1) ||
					(appointment.aptDate.toLowerCase().indexOf(queryText(null, { type: C.SET_QUERY_TEXT, payload: action.payload.queryText }))!=-1) ||
					(appointment.aptNotes.toLowerCase().indexOf(queryText(null, { type: C.SET_QUERY_TEXT, payload: action.payload.queryText }))!=-1)
				) { filteredApts.push(appointment); }
			} );

			filteredApts = _.orderBy(filteredApts, appointment => appointment[orderBy(null, { type: C.SET_ORDER_BY, payload: action.payload.orderBy })].toLowerCase(), 
																	orderDir(null, { type: C.SET_ORDER_DIR, payload: action.payload.orderDir }));
			return filteredApts;

		default:
			return state
	}
}

export const orderBy = (state=[], action) => {

	switch(action.type) {

		case C.SET_ORDER_BY :

			return action.payload;

		default:
			return state
	}
}	

export const orderDir = (state=[], action) => {

	switch(action.type) {

		case C.SET_ORDER_DIR :

			return action.payload;

		default:
			return state
	}
}

export const queryText = (state=[], action) => {

	switch(action.type) {

		case C.SET_QUERY_TEXT :

			return action.payload;

		default:
			return state
	}
}

export default combineReducers({
	aptBodyVisible,
	errorMsg,
	errorMsgVisible,
	myAppointments,
	orderBy,
	orderDir,
	queryText
})