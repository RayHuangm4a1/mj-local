import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Tag from '../tag';
import { StatusTypeEnum, } from './utils';
import './style.styl';

const {
	ShapeEnums,
	SizeEnum,
	FontSizeEnum,
	BorderRadiusEnum,
} = Tag;

const propTypes = {
	text: PropTypes.string,
	className: PropTypes.string,
	size: PropTypes.oneOf(Object.values(SizeEnum)),
	fontSize: PropTypes.oneOf(Object.values(FontSizeEnum)),
	type: PropTypes.oneOf(Object.values(StatusTypeEnum).concat('')),
	borderRadius: PropTypes.oneOf(Object.values(BorderRadiusEnum).concat('')),
};

const defaultProps = {
	size: SizeEnum.MIDDLE,
	fontSize: FontSizeEnum.MIDDLE,
};

const Rectangle = ({
	text,
	className,
	size,
	fontSize,
	borderRadius,
	type,
} = {}) => {
	return (
		<div className={cx('ljit-code-ball ljit-code-ball--rectangle',
			type ? `ljit-code-ball--${type}` : '',
			className)}
		>
			<Tag
				text={text}
				shape={ShapeEnums.RECTANGLE}
				size={size}
				fontSize={fontSize}
				borderRadius={borderRadius}
			/>
		</div>
	);
};

Rectangle.propTypes = propTypes;
Rectangle.defaultProps = defaultProps;

Rectangle.SizeEnum = SizeEnum;
Rectangle.FontSizeEnum = FontSizeEnum;
Rectangle.StatusTypeEnum = StatusTypeEnum;
Rectangle.BorderRadiusEnum = BorderRadiusEnum;

export default Rectangle;