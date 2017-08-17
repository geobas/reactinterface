import storeFactory from './store'
import { toggleAddForm, addAppointment, removeAppointment, searchAppointment } from './actions'

const store = storeFactory()

store.dispatch(
	toggleAddForm(false)
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
	addAppointment({
			"id": "3",
			"petName": "Goldie",
			"ownerName": "Barot Smith",
			"aptDate": "2016-06-22 15:50",
			"aptNotes": "This Goldfish has some weird spots in the belly"
		})
)

store.dispatch(
	searchAppointment("smith", "ownerName", "desc")
)


store.dispatch(
	toggleAddForm(true)
)

store.dispatch(
	removeAppointment("2")
)