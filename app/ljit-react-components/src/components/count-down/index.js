import React ,{ Component, } from 'react';
import PropTypes from 'prop-types';
import { Statistic, } from 'antd';
import cx from 'classnames';
import './style.styl';

export const PREFIX_CLASS = 'ljit-countdown';
const AntdCountdown = Statistic.Countdown;

const FormatEnums = {
	HH_MM_SS: 'HH:mm:ss',
	HH_MM_SS_SSS: 'HH:mm:ss:SSS',
	SS: 'ss',
};

const SizeEnums = {
	SMALL: 'small',
	MEDIUM: 'medium',
	LARGE: 'large',
};

const ColorEnums = {
	RED: '#fd3e3e',
	BLUE: '#19c5cc',
	ORANGE: '#ff8113',
};

const propTypes = {
	title: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.string,
	]),
	endDate: PropTypes.instanceOf(Date),
	prefix: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.string,
	]),
	suffix: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.string,
	]),
	format: PropTypes.oneOf(Object.values(FormatEnums).concat('')),
	size: PropTypes.oneOf(Object.values(SizeEnums).concat('')),
	color: PropTypes.oneOf(Object.values(ColorEnums).concat('')),
	onFinish: PropTypes.func,
	className: PropTypes.string,
	offset: PropTypes.number,
};

const defaultProps = {
	title: '',
	endDate: new Date(),
	prefix: '',
	suffix: '',
	format: FormatEnums.HH_MM_SS,
	size: SizeEnums.SMALL,
	color: '',
	onFinish: () => {},
	className: '',
	offset: 0,
};

class Countdown extends Component {
	render() {
		const {
			title,
			endDate,
			prefix,
			suffix,
			format,
			onFinish,
			className,
			offset,
			color,
			size,
		} = this.props;
		const value = endDate.getTime() + offset;

		return (
			<AntdCountdown
				title={title}
				value={value}
				prefix={prefix}
				suffix={suffix}
				format={format}
				onFinish={onFinish}
				className={cx(PREFIX_CLASS, `${PREFIX_CLASS}--size--${size}`, className)}
				valueStyle={{ color: color, }}
			/>
		);
	}
}
Countdown.propTypes = propTypes;
Countdown.defaultProps = defaultProps;
Countdown.FormatEnums = FormatEnums;
Countdown.SizeEnums = SizeEnums;
Countdown.ColorEnums = ColorEnums;

export default Countdown;