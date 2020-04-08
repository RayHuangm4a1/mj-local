import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './style.styl';

export const PREFIX_CLASS = 'ljit-text-button';
export const TYPE_DEFAULT = 'default';
export const TYPE_DANGER = 'danger';
const SizeEnums = {
	SMALL: 'small',
	MEDIUM: 'medium',
};
const WeightEnums = {
	NORMAL: 'normal',
	HEAVY: 'heavy',
};
const { SMALL, MEDIUM, } = SizeEnums;
const { NORMAL, HEAVY, } = WeightEnums;
const propTypes = {
	className: PropTypes.string,
	text: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	color: PropTypes.oneOf([
		TYPE_DEFAULT,
		TYPE_DANGER,
	]),
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
};
const defaultProps = {
	color: 'default',
	disabled: false,
	onClick: () => {},
	fontSize: MEDIUM,
	fontWeight: NORMAL,
};

const TextButton = ({
	className,
	text,
	color,
	disabled,
	onClick,
	fontSize,
	fontWeight,
} = {}) => (
	<button
		className={cx(PREFIX_CLASS, {
			[`${PREFIX_CLASS}--${TYPE_DEFAULT}`]: color === TYPE_DEFAULT,
			[`${PREFIX_CLASS}--${TYPE_DANGER}`]: color === TYPE_DANGER,
			[`${PREFIX_CLASS}--text-small`]: fontSize === SMALL,
			[`${PREFIX_CLASS}--text-medium`]: fontSize === MEDIUM,
			[`${PREFIX_CLASS}--weight-normal`]: fontWeight === NORMAL,
			[`${PREFIX_CLASS}--weight-heavy`]: fontWeight === HEAVY,
		}, className)}
		type="button"
		disabled={disabled}
		onClick={onClick}
	>
		{text}
	</button>
);

TextButton.propTypes = propTypes;
TextButton.defaultProps = defaultProps;

TextButton.SizeEnums = SizeEnums;
TextButton.WeightEnums = WeightEnums;

export default TextButton;
