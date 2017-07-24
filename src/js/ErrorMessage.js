import React,{Component} from 'react';

export default class ErrorMessage extends Component {

    constructor(props) {
        super(props);
        this.showErrors = this.showErrors.bind(this);
    }

	componentWillMount() {
		let display = this.props.errorsVisible ? 'block' : 'none';
		this.displayErrors = { display };
	}

	componentWillReceiveProps(nextProps) {
		let display = nextProps.errorsVisible ? 'block' : 'none';
		this.displayErrors = { display };
	}

    showErrors(error, i) {
    	return <p key={i}>{Object.values(error)[0]}</p>;
    }

	render() {
		return (
			<div className="alert alert-warning alert-dismissible" role="alert" style={ this.displayErrors }>
			    <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			    { this.props.errors.map(this.showErrors) }
			</div>
		)
	}
}