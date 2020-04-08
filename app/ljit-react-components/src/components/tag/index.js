import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import AntdTag from 'antd/lib/tag';
import {
	ColorEnums,
	ShapeEnums,
	SizeEnum,
	FontSizeEnum,
	BorderRadiusEnum,
} from './utils';
import './style.styl';

const propTypes = {
	className: PropTypes.string,
	text: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	color: PropTypes.oneOf(Object.values(ColorEnums).concat('')),
	shape: PropTypes.oneOf(Object.values(ShapeEnums).concat('')),
	size: PropTypes.oneOf(Object.values(SizeEnum).concat('')),
	fontSize: PropTypes.oneOf(Object.values(FontSizeEnum).concat('')),
	borderRadius: PropTypes.oneOf(Object.values(BorderRadiusEnum).concat('')),
	hasBorder: PropTypes.bool,
	isClosable: PropTypes.bool,
	onClose: PropTypes.func,
};

const defaultProps = {
	shape: ShapeEnums.RECTANGLE,
	text: '',
	hasBorder: false,
	isClosable: false,
	onClose: () => {},
};

const Tag = ({
	className,
	text,
	color,
	shape,
	size,
	fontSize,
	borderRadius,
	hasBorder,
	isClosable,
	onClose,
} = {}) => {
	return (
		<AntdTag
			className={cx('ljit-tag',
				color ? `ljit-tag-color--${color}` : '',
				shape ? `ljit-tag-shape--${shape}` : '',
				size ? `ljit-tag-size--${size}` : '',
				fontSize ? `ljit-tag-font-size--${fontSize}` : '',
				borderRadius ? `ljit-tag-border-radius--${borderRadius}` : '',
				{
					['ljit-tag--border']: shape === ShapeEnums.ROUND || hasBorder,
				}, className
			)}
			closable={isClosable}
			onClose={onClose}
		>
			<span className="ljit-tag__text">
				{text}
			</span>
		</AntdTag>
	);
};

Tag.propTypes = propTypes;
Tag.defaultProps = defaultProps;

Tag.ColorEnums = ColorEnums;
Tag.ShapeEnums = ShapeEnums;
Tag.SizeEnum = SizeEnum;
Tag.FontSizeEnum = FontSizeEnum;
Tag.BorderRadiusEnum = BorderRadiusEnum;

export default Tag;
