import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { InputNumber, } from 'ljit-react-components';

class RebateInputUnit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value || 0,
		};

		this._handleChange = this._handleChange.bind(this);
	}

	_handleChange(value) {
		this.setState({
			value: value,
		});

		this.props.onChange(value);
	}

	render() {
		const { inputStyle, min, max, step, } = this.props;

		return (
			<Fragment>
				<InputNumber
					min={min}
					max={max}
					step={step}
					value={this.state.value}
					style={inputStyle}
					onChange={this._handleChange}
				/>
				<span className="unit-text">上限：{max}   下限：{min}</span>
			</Fragment>
		);
	}
}


RebateInputUnit.propTypes = {
	value: PropTypes.number,
	inputStyle: PropTypes.object,
	step: PropTypes.number,
	min: PropTypes.number,
	max: PropTypes.number,
	onChange: PropTypes.func,
};
RebateInputUnit.defaultProps = {
};

export default RebateInputUnit;
