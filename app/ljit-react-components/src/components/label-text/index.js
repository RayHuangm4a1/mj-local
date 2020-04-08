import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './style.styl';

const PREFIX_CLASS = 'ljit-label-text';
const SizeEnums = {
	LARGE: 'large',
	MEDIUM: 'medium',
	SMALL: 'small',
};
const {
	LARGE,
	MEDIUM,
	SMALL,
} = SizeEnums;
const ColorEnums = {
	GREY: 'grey',
	BLACK: 'black',
	LIGHT_BLACK: 'light-black',
};
const {
	GREY,
	BLACK,
	LIGHT_BLACK,
} = ColorEnums;
const propTypes = {
	label: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	text: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	labelColType: PropTypes.oneOf([
		LARGE,
		MEDIUM,
		SMALL,
	]),
	fontSize: PropTypes.oneOf([
		LARGE,
		MEDIUM,
		SMALL,
	]),
	className: PropTypes.string,
	isFixedWidth: PropTypes.bool,
	isSpaceBetween: PropTypes.bool,
	labelColor: PropTypes.oneOf([GREY, BLACK, LIGHT_BLACK, ]),
	textColor: PropTypes.oneOf([GREY, BLACK, LIGHT_BLACK, ]),
};
const defaultProps = {
	label: '',
	text: '',
	labelColType: MEDIUM,
	fontSize: MEDIUM,
	isFixedWidth: true,
	isSpaceBetween: false,
	labelColor: GREY,
	textColor: BLACK,
};

const LabelText = ({
	label,
	text,
	labelColType,
	fontSize,
	className,
	isFixedWidth,
	isSpaceBetween,
	labelColor,
	textColor,
}) => {
	return (
		<div
			className={cx(`${PREFIX_CLASS}`, className,{
				[`${PREFIX_CLASS}--col-large`]: labelColType === LARGE && isFixedWidth,
				[`${PREFIX_CLASS}--col-medium`]: labelColType === MEDIUM && isFixedWidth,
				[`${PREFIX_CLASS}--col-small`]: labelColType === SMALL && isFixedWidth,
				[`${PREFIX_CLASS}--font-large`]: fontSize === LARGE,
				[`${PREFIX_CLASS}--font-medium`]: fontSize === MEDIUM,
				[`${PREFIX_CLASS}--font-small`]: fontSize === SMALL,
				[`${PREFIX_CLASS}--col-auto`]: !isFixedWidth,
				[`${PREFIX_CLASS}--space-between`]: isSpaceBetween,
			})}
		>
			<label
				className={cx(`${PREFIX_CLASS}__label`, `${PREFIX_CLASS}__label--${labelColor}`)}
			>
				{label}
			</label>
			<div
				className={cx(`${PREFIX_CLASS}__text`, `${PREFIX_CLASS}__text--${textColor}`)}
			>
				{text}
			</div>
		</div>
	);
};

LabelText.propTypes = propTypes;
LabelText.defaultProps = defaultProps;
LabelText.ColorEnums = ColorEnums;
LabelText.SizeEnums = SizeEnums;

export default LabelText;
