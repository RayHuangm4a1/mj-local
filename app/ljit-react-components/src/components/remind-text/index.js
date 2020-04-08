import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './style.styl';

export const prefixClass = 'remind-text';

const StyleTypeEnums = {
	DEFAULT: 'default',
	ERROR: 'error',
};
const { DEFAULT, ERROR, } = StyleTypeEnums;

const propTypes = {
	styleType: PropTypes.oneOf([
		DEFAULT,
		ERROR,
	]),
	text: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	className: PropTypes.string,
};
const defaultProps = {
	styleType: DEFAULT,
	text: '',
};

const RemindText = ({ text, className, styleType, }) => (
	<div
		className={cx(prefixClass, {
			[`${prefixClass}--${DEFAULT}`]: styleType === DEFAULT,
			[`${prefixClass}--${ERROR}`]: styleType === ERROR,
		}, className)}
	>
		{text}
	</div>
);

RemindText.propTypes = propTypes;
RemindText.defaultProps = defaultProps;

RemindText.StyleTypeEnums = StyleTypeEnums;

export default RemindText;
