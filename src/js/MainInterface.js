import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import AptList from './AptList';
import ErrorMessage from './ErrorMessage';
import AddAppointment from './AddAppointment';
import SearchAppointments from './SearchAppointments';

export default class MainInterface extends Component {
	constructor(props) {
		super(props);
		this.state = {
			aptBodyVisible: false,
			orderBy: 'petName',
			orderDir: 'asc',
			queryText: '',
			myAppointments: [],
			errorMsg: [],
			errorMsgVisible: false
		};
		this.deleteMessage = this.deleteMessage.bind(this);
		this.toggleAddDisplay = this.toggleAddDisplay.bind(this);
		this.addItem = this.addItem.bind(this);
		this.addError = this.addError.bind(this);
		this.reOrder = this.reOrder.bind(this);
		this.setQueryText = this.setQueryText.bind(this);
		this.showAppointments = this.showAppointments.bind(this);
	}

	componentDidMount() {
		this.serverRequest = $.get('./assets/data.json', result => this.setState( { myAppointments: result } ));
	}

	componentWillUnmount() {
		this.serverRequest.abort();
	}

	deleteMessage(item) {
		let newApts = _.without(this.state.myAppointments, item);
		this.setState({ myAppointments: newApts });
	}

	toggleAddDisplay() {
		let tempVisibility = !this.state.aptBodyVisible;
		this.setState({ aptBodyVisible: tempVisibility });
	}

	addItem(tempItem) {
		let tempApts = this.state.myAppointments;
		tempApts.push(tempItem);
		this.setState({ myAppointments: tempApts });
	}

	addError(errorItems, visible) {
		this.setState({ errorMsg: errorItems });
		this.setState({ errorMsgVisible: visible });
	}

	reOrder(orderBy, orderDir) {
		this.setState({ orderBy, orderDir });
	}

	setQueryText(q) {
		this.setState({ queryText: q });
	}

	showAppointments() {
		let myAppointments = this.state.myAppointments;
		let queryText = this.state.queryText;
		let filteredApts = [];

		myAppointments.forEach( item => {
			if (
				(item.petName.toLowerCase().indexOf(queryText)!=-1) ||
				(item.ownerName.toLowerCase().indexOf(queryText)!=-1) ||
				(item.aptDate.toLowerCase().indexOf(queryText)!=-1) ||
				(item.aptNotes.toLowerCase().indexOf(queryText)!=-1)
			) { filteredApts.push(item); }
		} );

		filteredApts = _.orderBy(filteredApts, item => item[this.state.orderBy].toLowerCase(), this.state.orderDir);

		filteredApts = filteredApts.map( (item, index) => {
			return (
				<AptList
					key = { index }
					singleItem = { item }
					whichItem = { item }
					onDelete = { this.deleteMessage }
				/>
			)
		} );

		return filteredApts;
	}

	render() {
		return (
			<div className="interface">
				<ErrorMessage
					errors = { this.state.errorMsg }
					errorsVisible = { this.state.errorMsgVisible }
				/>
				<AddAppointment
					bodyVisible = { this.state.aptBodyVisible }
					handleToggle = { this.toggleAddDisplay }
					addApt = { this.addItem }
					addErrorMsg = { this.addError }
				/>
				<SearchAppointments
					orderBy = { this.state.orderBy }
					orderDir = { this.state.orderDir }
					onReOrder = { this.reOrder }
					onSearch = { this.setQueryText }
				/>
				<ul className="item-list media-list">{ this.showAppointments() }</ul>
			</div>
		)
	}

}