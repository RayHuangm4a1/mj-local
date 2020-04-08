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

const Round = ({
	text,
	size,
	fontSize,
	borderRadius,
	type,
	className,
} = {}) => {
	return (
		<div className={cx('ljit-code-ball ljit-code-ball--round',
			type ? `ljit-code-ball--${type}` : '',
			className)}
		>
			<Tag
				text={text}
				shape={ShapeEnums.ROUND}
				size={size}
				fontSize={fontSize}
				borderRadius={borderRadius}
			/>
		</div>
	);
};

Round.propTypes = propTypes;
Round.defaultProps = defaultProps;

Round.SizeEnum = SizeEnum;
Round.FontSizeEnum = FontSizeEnum;
Round.StatusTypeEnum = StatusTypeEnum;
Round.BorderRadiusEnum = BorderRadiusEnum;

export default Round;