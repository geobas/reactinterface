import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import AptList from './AptList';
import ErrorMessage from './ErrorMessage';
import AddAppointment from './AddAppointment';
import SearchAppointments from './SearchAppointments';

import { connect } from 'react-redux';
import { fetchAppointments, toggleAddForm, addAppointment, addError,
		 toggleErrorMessages, clearErrors, setOrderBy, setOrderDir,
		 setQueryText, removeAppointment } from '../actions';

class MainInterface extends Component {
	constructor(props) {
		super(props);
		this.deleteMessage = this.deleteMessage.bind(this);
		this.toggleAddDisplay = this.toggleAddDisplay.bind(this);
		this.addItem = this.addItem.bind(this);
		this.addError = this.addError.bind(this);
		this.reOrder = this.reOrder.bind(this);
		this.setQueryText = this.setQueryText.bind(this);
		this.showAppointments = this.showAppointments.bind(this);
	}

	componentDidMount() {
		this.serverRequest = this.props.fetchAppointments('./assets/data.json');
	}

	componentWillUnmount() {
		this.serverRequest.abort();
	}

	deleteMessage(item) {
		this.props.removeAppointment(item.id);
	}

	toggleAddDisplay() {
		this.props.toggleAddDisplay(!this.props.aptBodyVisible);
	}

	addItem(tempItem) {
		this.props.addItem(tempItem);
	}

	addError(errorItems, visible) {
		this.props.clearErrors();
		this.props.addError(errorItems);
		this.props.toggleErrorMessages(visible);
	}

	reOrder(orderBy, orderDir) {
		this.props.setOrderBy(orderBy);
		this.props.setOrderDir(orderDir);
	}

	setQueryText(q) {
		this.props.setQueryText(q);
	}

	showAppointments() {
		let myAppointments = this.props.myAppointments;
		let queryText = this.props.queryText;
		let filteredApts = [];

		myAppointments.forEach( item => {
			if (
				(item.petName.toLowerCase().indexOf(queryText)!=-1) ||
				(item.ownerName.toLowerCase().indexOf(queryText)!=-1) ||
				(item.aptDate.toLowerCase().indexOf(queryText)!=-1) ||
				(item.aptNotes.toLowerCase().indexOf(queryText)!=-1)
			) { filteredApts.push(item); }
		} );

		filteredApts = _.orderBy(filteredApts, item => item[this.props.orderBy].toLowerCase(), this.props.orderDir);

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
					errors = { this.props.errorMsg }
					errorsVisible = { this.props.errorMsgVisible }
				/>
				<AddAppointment
					bodyVisible = { this.props.aptBodyVisible }
					handleToggle = { this.toggleAddDisplay }
					addApt = { this.addItem }
					addErrorMsg = { this.addError }
				/>
				<SearchAppointments
					orderBy = { this.props.orderBy }
					orderDir = { this.props.orderDir }
					onReOrder = { this.reOrder }
					onSearch = { this.setQueryText }
				/>
				<ul className="item-list media-list">{ this.showAppointments() }</ul>
			</div>
		)
	}

}

const mapStateToProps = (state) =>
	({
		aptBodyVisible: state.aptBodyVisible,
		errorMsg: state.errorMsg,
		errorMsgVisible: state.errorMsgVisible,
		myAppointments: state.myAppointments,
		orderBy: state.orderBy,
		orderDir: state.orderDir,
		queryText: state.queryText
	})

const mapDispatchToProps = (dispatch) =>
	({
		fetchAppointments: (url) => dispatch(fetchAppointments(url)),
		toggleAddDisplay: (flag) => dispatch(toggleAddForm(flag)),
		addItem: (item) => dispatch(addAppointment(item)),
		addError: (errorItems) => dispatch(addError(errorItems)),
		toggleErrorMessages: (visible) => dispatch(toggleErrorMessages(visible)),
		clearErrors: () => dispatch(clearErrors()),
		setOrderBy: (orderBy) => dispatch(setOrderBy(orderBy)),
		setOrderDir: (orderDir) => dispatch(setOrderDir(orderDir)),
		setQueryText: (qt) => dispatch(setQueryText(qt)),
		removeAppointment: (id) => dispatch(removeAppointment(id))
	})

export default connect(mapStateToProps, mapDispatchToProps)(MainInterface);