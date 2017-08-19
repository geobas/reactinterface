import storeFactory from './store'
import { toggleAddForm, addError, toggleErrorMessages, addAppointment, removeAppointment, searchAppointment, setOrderBy, setOrderDir, setQueryText } from './actions'

const store = storeFactory()

store.dispatch(
	toggleAddForm()
)

store.dispatch(
	toggleErrorMessages()
)

store.dispatch(
	addError({ petName : 'Pet name is too short...' })
)

store.dispatch(
	addError({ inputAptDate : 'Date was not given...' })
)

store.dispatch(
	toggleErrorMessages(true)
)

store.dispatch(
	addAppointment({
			"id": "1",
			"petName": "Buffy",
			"ownerName": "Hassum Harrod",
			"aptDate": "2016-06-20 15:30",
			"aptNotes": "This Chihuahua has not eaten for three days and is lethargic"
		})
)

store.dispatch(
	addAppointment({
			"id": "2",
			"petName": "Spot",
			"ownerName": "Constance Smith",
			"aptDate": "2016-06-24 08:30",
			"aptNotes": "This German Shepherd is having some back pain"
		})
)

store.dispatch(
	setOrderBy("ownerName")
)

store.dispatch(
	addAppointment({
			"id": "3",
			"petName": "Goldie",
			"ownerName": "Barot Smith",
			"aptDate": "2016-06-22 15:50",
			"aptNotes": "This Goldfish has some weird spots in the belly"
		})
)

store.dispatch(
	searchAppointment("constance", "petName", "desc")
)

store.dispatch(
	removeAppointment("2")
)