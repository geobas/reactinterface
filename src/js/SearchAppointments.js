import React,{Component} from 'react';

export default class SearchAppointments extends Component {

	constructor(props) {
		super(props);
		this.handleSort = this.handleSort.bind(this);
		this.handleOrder = this.handleOrder.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
	}

	handleSort(e) {
		this.props.onReOrder(e.target.id, this.props.orderDir);
		e.preventDefault();
	}

	handleOrder(e) {
		this.props.onReOrder(this.props.orderBy, e.target.id);
		e.preventDefault();
	}

	handleSearch(e) {
		this.props.onSearch(e.target.value);
	}

	render() {
		return (
			<div className="row search-appointments">
			    <div className="col-sm-offset-3 col-sm-6">
			        <div className="input-group">
			            <input id="SearchApts" onChange={ this.handleSearch } placeholder="Search" type="text" className="form-control SearchApts" aria-label="Search Appointments" />
			            <div className="input-group-btn">
			                <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sort by: <span className="caret"></span>
			                </button>
			                <ul className="dropdown-menu dropdown-menu-right">
			                    <li><a href="#" id="petName" className="petName" onClick={ this.handleSort }>Pet Name { (this.props.orderBy === 'petName') ? <span className="glyphicon glyphicon-ok"></span>: null }</a>
			                    </li>
			                    <li><a href="#" id="aptDate" className="aptDate" onClick={ this.handleSort }>Date { (this.props.orderBy === 'aptDate') ? <span className="glyphicon glyphicon-ok"></span>: null }</a>
			                    </li>
			                    <li><a href="#" id="ownerName" className="ownerName" onClick={ this.handleSort }>Owner { (this.props.orderBy === 'ownerName') ? <span className="glyphicon glyphicon-ok"></span>: null }</a>
			                    </li>
			                    <li role="separator" className="divider"></li>
			                    <li><a href="#" id="asc" className="asc" onClick={ this.handleOrder }>Asc { (this.props.orderDir === 'asc') ? <span className="glyphicon glyphicon-ok"></span>: null }</a>
			                    </li>
			                    <li><a href="#" id="desc" className="desc" onClick={ this.handleOrder }>Desc { (this.props.orderDir === 'desc') ? <span className="glyphicon glyphicon-ok"></span>: null }</a>
			                    </li>
			                </ul>
			            </div>
			        </div>
			    </div>
			</div>
		)
	}
}