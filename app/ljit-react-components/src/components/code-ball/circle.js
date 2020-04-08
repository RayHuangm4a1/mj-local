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
	ColorEnums,
} = Tag;

const propTypes = {
	className: PropTypes.string,
	size: PropTypes.oneOf(Object.values(SizeEnum)),
	fontSize: PropTypes.oneOf(Object.values(FontSizeEnum)),
	type: PropTypes.oneOf(Object.values(StatusTypeEnum)),
	color: PropTypes.oneOf(Object.values(ColorEnums)),
	text: PropTypes.string,
};

const defaultProps = {
	size: SizeEnum.MIDDLE,
	fontSize: FontSizeEnum.MIDDLE,
	type: StatusTypeEnum.PRIMARY,
};

const Circle = ({
	className,
	size,
	fontSize,
	text,
	type,
} = {}) => {
	return (
		<div className={cx('ljit-code-ball ljit-code-ball--circle', 
			type ? `ljit-code-ball--${type}` : '',
			className)}
		>
			<Tag
				text={text}
				shape={ShapeEnums.CIRCLE}
				fontSize={fontSize}
				size={size}
			/>
		</div>
	);
};

Circle.propTypes = propTypes;
Circle.defaultProps = defaultProps;

Circle.SizeEnum = SizeEnum;
Circle.FontSizeEnum = FontSizeEnum;
Circle.StatusTypeEnum = StatusTypeEnum;

export default Circle;