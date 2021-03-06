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

    showErrors(errors, i) {
    	return errors.map( (error,i) => <p className="error" key={ i }>{ error }</p>)
    }

	render() {
		return (
			<div className="alert alert-warning" role="alert" style={ this.displayErrors }>
			    { this.props.errors.map(this.showErrors) }
			</div>
		)
	}
}