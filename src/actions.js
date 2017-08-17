import C from './constants'

export const addAppointment = appointment =>
	({
		type: C.ADD_APPOINTMENT,
		payload: appointment
	})

export const removeAppointment = id =>
	({
		type: C.REMOVE_APPOINTMENT,
		payload: id
	})

export const searchAppointment = (queryText, orderBy, orderDir) =>
	({
		type: C.SEARCH_APPOINTMENT,
		payload: { queryText, orderBy, orderDir }
	})