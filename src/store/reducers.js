import C from '../constants'
import { combineReducers } from 'redux'
import _ from 'lodash'

export const allAppointments = (state=[], action) => {

	switch(action.type) {

		case C.ADD_APPOINTMENT :

			return [...state, action.payload]

		case C.REMOVE_APPOINTMENT :

			return state.filter(appointment => appointment.id !== action.payload)

		case C.SEARCH_APPOINTMENT :

			let filteredApts = [];

			state.forEach( appointment => {
				if (
					(appointment.petName.toLowerCase().indexOf(action.payload.queryText)!=-1) ||
					(appointment.ownerName.toLowerCase().indexOf(action.payload.queryText)!=-1) ||
					(appointment.aptDate.toLowerCase().indexOf(action.payload.queryText)!=-1) ||
					(appointment.aptNotes.toLowerCase().indexOf(action.payload.queryText)!=-1)
				) { filteredApts.push(appointment); }
			} );

			filteredApts = _.orderBy(filteredApts, appointment => appointment[action.payload.orderBy].toLowerCase(), action.payload.orderDir);

			return filteredApts;

		default:
			return state
	}

}

export default combineReducers({
	allAppointments
})