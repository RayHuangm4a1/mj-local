import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import AntdSlider from 'antd/lib/slider';
import cx from 'classnames';
import InputNumber from '../input-number';
import { isDecimal, } from '../../lib/utils';
import 'antd/lib/slider/style';
import './style.styl';

const propTypes = {
	value: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]),
	max: PropTypes.number,
	min: PropTypes.number,
	step: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]),
	suffix: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	className: PropTypes.string,
	disabled: PropTypes.bool,
	onChange: PropTypes.func,
};
const defaultProps = {
	value: 0,
	min: 0,
	max: 100,
	step: 1,
	disabled: false,
	suffix: '单位',
	onChange: () => {},
};

class SliderBar extends Component {
	constructor() {
		super();
		this._handleChange = this._handleChange.bind(this);
	}

	_handleChange(value) {
		const {
			step,
			onChange,
		} = this.props;

		if (isDecimal(step) && isNaN(value)) {
			return;
		}

		onChange(value);
	}

	render() {
		const {
			value,
			min,
			max,
			step,
			disabled,
			className,
			suffix,
		} = this.props;

		return (
			<div className={cx('ljit-slider-bar', className)}>
				<AntdSlider
					min={min}
					max={max}
					value={value}
					step={step}
					disabled={disabled}
					className="ljit-slider-bar__slider"
					onChange={this._handleChange}
				/>
				<InputNumber
					min={min}
					max={max}
					value={value}
					step={step}
					disabled={disabled}
					className="ljit-slider-bar__number"
					onChange={this._handleChange}
				/>
				<div className="ljit-slider-bar__suffix">
					{suffix}
				</div>
			</div>
		);
	}
}

SliderBar.propTypes = propTypes;
SliderBar.defaultProps = defaultProps;

export default SliderBar;
