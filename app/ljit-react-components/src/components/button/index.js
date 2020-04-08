import React, { Component, } from 'react';
import { Button as AntdButton, } from 'antd';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './style.styl';

const ColorEnums = {
	BRIGHTBLUE500: 'brightBlue500',
	BRIGHTBLUE300: 'brightBlue300',
	GRASSGREEN900: 'grassGreen900',
	GRASSGREEN700: 'grassGreen700',
	GRASSGREEN500: 'grassGreen500',
	LIGHTRED500: 'lightRed500',
	WARMORANGE900: 'warmOrange900',
	WARMORANGE700: 'warmOrange700',
	WARMORANGE500: 'warmOrange500',
	LIGHTPURPLE500: 'lightPurple500',
	TIFFANYGREEN500: 'tiffanyGreen500',
	SALMONRED500: 'salmonRed500',
	ORANGE: 'orange',
	PINKISH: 'pinkish',
	CORAL: 'coral',
	BLOODORANGE: 'bloodOrange',
	BUTTERSCOTCH: 'butterscotch',
	TOPAZ: 'topaz',
	GREY30: 'grey30',
	GREY20: 'grey20',
	GREY12: 'grey12',
	GREY9: 'grey9',
	GREY5: 'grey5',
	GREYISHBROWN: 'greyishBrown',
	PALE: 'pale',
	PALETWO: 'paleTwo',
	BLUE100: 'blue100',
	BLUE50: 'blue50',
};

const OutlineEnums = {
	SOLID: 'solid',
	HOLLOW: 'hollow',
	TEXT: 'text',
	DASHED: 'dashed',
};

const IconEnums = {
	PLUS: 'plus',
	DOWN: 'down',
	UP: 'up',
	LEFT: 'left',
	RIGHT: 'right',
};

const propTypes = {
	disabled: PropTypes.bool,
	outline: PropTypes.oneOf(Object.values(OutlineEnums).concat('')),
	color: PropTypes.oneOf(Object.values(ColorEnums).concat('')),
	className: PropTypes.string,
	style: PropTypes.object,
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	icon: PropTypes.oneOf(Object.values(IconEnums).concat('')),
	isFullWidth: PropTypes.bool,
	onClick: PropTypes.func,
};
const defaultProps = {
	color: '',
	outline: OutlineEnums.SOLID,
	disabled: false,
	onClick: () => {},
};

class Button extends Component {
	render() {
		const {
			disabled,
			className,
			style,
			children,
			isFullWidth,
			icon,
			onClick,
			outline,
			color,
		} = this.props;

		return (
			<AntdButton
				disabled={disabled}
				className={cx('ljit-btn', `ljit-button--${outline}`,
					color ? `ljit-button-color--${color}` : '' , className)}
				style={style}
				block={isFullWidth}
				icon={icon}
				onClick={onClick}
			>
				{children}
			</AntdButton>
		);
	}
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
Button.ColorEnums = ColorEnums;
Button.OutlineEnums = OutlineEnums;
Button.IconEnums = IconEnums;

export default Button;
