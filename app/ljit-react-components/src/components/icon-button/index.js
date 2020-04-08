import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Icon from '../icon';
import Button from '../button';
import './style.styl';

const { IconTypeEnums, ColorEnums, SizeEnums, } = Icon;
const propTypes = {
	type: PropTypes.oneOf(Object.values(IconTypeEnums).concat('')),
	color: PropTypes.oneOf(Object.values(ColorEnums).concat('')),
	size: PropTypes.oneOf(Object.values(SizeEnums).concat('')),
	className: PropTypes.string,
	style: PropTypes.object,
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
};
const defaultProps = {
	type: IconTypeEnums.LEFT,
	disabled: false,
	onClick: () => {},
};

const IconButton = ({
	color,
	size,
	type,
	className,
	style,
	disabled,
	onClick,
} = {}) => (
	<Button
		disabled={disabled}
		className={cx('ljit-icon-button', className)}
		style={style}
		onClick={onClick}
	>
		<Icon
			type={type}
			color={color}
			size={size}
		/>
	</Button>
);

IconButton.propTypes = propTypes;
IconButton.defaultProps = defaultProps;
IconButton.IconTypeEnums = IconTypeEnums;
IconButton.ColorEnums = ColorEnums;
IconButton.SizeEnums = SizeEnums;

export default IconButton;
