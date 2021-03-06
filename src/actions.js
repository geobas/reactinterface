import C from './constants'

export const toggleAddForm = (flag=false) =>
	({
		type: C.TOGGLE_ADD_FORM,
		payload: flag
	})

export const addError = error =>
	({
		type: C.ADD_ERROR,
		payload: error
	})

export const clearErrors = () =>
	({
		type: C.CLEAR_ERRORS
	})

export const toggleErrorMessages = (flag=false) =>
	({
		type: C.TOGGLE_ERROR_MESSAGES,
		payload: flag
	})

export const fetchAppointmentsSuccess = appointments =>
	({
		type: C.FETCH_APPOINTMENTS_SUCCESS,
		payload: appointments
	})

export const fetchAppointments = url => {
	return (dispatch) => {
		fetch(url)
			.then((response) => {
				if (!response.ok) {
					throw Error(`${response.status} URL ${response.statusText}`);
				}

				return response;
			})
			.then((response) => response.json())
			.then((appointments) => dispatch(fetchAppointmentsSuccess(appointments)))		
	}
}

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

// export const searchAppointment = () =>
// 	({
// 		type: C.SEARCH_APPOINTMENT,
// 	})

export const setOrderBy = (order='petName') =>
	({
		type: C.SET_ORDER_BY,
		payload: order
	})

export const setOrderDir = (order='asc') =>
	({
		type: C.SET_ORDER_DIR,
		payload: order
	})

export const setQueryText = (queryText='') =>
	({
		type: C.SET_QUERY_TEXT,
		payload: queryText
	})