import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputNumber, RadioGroup, RemindText } from 'ljit-react-components';
import './style.styl';

const propTypes = {
	options: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string,
		value: PropTypes.number,
	})),
	onChange: PropTypes.func.isRequired,
	remindText: PropTypes.string,
	placeholder: PropTypes.string,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	minValue: PropTypes.number,
	maxValue: PropTypes.number,
	disabled: PropTypes.bool,
};
const defaultProps = {
	options: [],
	remindText: '',
	placeholder: '',
	disabled: false,
};

class QuickInputNumberBlock extends Component {
	constructor(props) {
		super(props);

		this._handleInputValue = this._handleInputValue.bind(this);
	}

	_handleInputValue(value) {
		const { onChange } = this.props;

		onChange(value);
	}

	render() {
		const { value, options, placeholder, remindText, minValue, maxValue, disabled, } = this.props;

		return (
			<React.Fragment>
				<InputNumber
					className="quick-input-block__input-number"
					placeholder={placeholder}
					onChange={value => this._handleInputValue(value)}
					defaultValue={0}
					value={value}
					min={minValue}
					max={maxValue}
					disabled={disabled}
				/>
				<RadioGroup
					className="quick-input-block__radio-group"
					radioType={RadioGroup.RadioTypeEnums.BUTTON}
					buttonStyle={RadioGroup.ButtonStyleEnums.OUTLINE}
					options={options}
					onChange={e => this._handleInputValue(e.target.value)}
					disabled={disabled}
				/>
				<RemindText
					text={remindText}
				/>
			</React.Fragment>
		);
	}
}

QuickInputNumberBlock.propTypes = propTypes;
QuickInputNumberBlock.defaultProps = defaultProps;

export default QuickInputNumberBlock;
