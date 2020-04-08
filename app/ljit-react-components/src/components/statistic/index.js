import React, { Component, } from 'react';
import { Statistic as AntdStatistic, } from 'antd';
import cx from 'classnames';
import PropTypes from 'prop-types';
import './style.styl';

export const PREFIX_CLASS = 'ljit-statistic';
const SizeTypeEnums = {
	MEDIUM: 'medium',
	LARGE: 'large',
};
const {
	MEDIUM,
	LARGE,
} = SizeTypeEnums;

const propTypes = {
	title: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.string,
	]),
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	prefix: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.string,
	]),
	suffix: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.string,
	]),
	precision: PropTypes.number,
	className: PropTypes.string,
	sizeType: PropTypes.oneOf([
		MEDIUM,
		LARGE,
	]),
};
const defaultProps = {
	title: '',
	value: '',
	prefix: '',
	suffix: '',
	className: '',
	precision: 0,
	sizeType: MEDIUM,
};

class Statistic extends Component {
	render() {
		const {
			title,
			value,
			prefix,
			suffix,
			precision,
			className,
			sizeType,
		} = this.props;

		return (
			<AntdStatistic
				title={title}
				value={value}
				prefix={prefix}
				suffix={suffix}
				precision={precision}
				className={cx(PREFIX_CLASS, {
					[`${PREFIX_CLASS}--size-medium`]: sizeType === MEDIUM,
					[`${PREFIX_CLASS}--size-large`]: sizeType === LARGE,
				}, className)}
			/>
		);
	}
}

Statistic.propTypes = propTypes;
Statistic.defaultProps = defaultProps;

Statistic.SizeTypeEnums = SizeTypeEnums;

export default Statistic;
