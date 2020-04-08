import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Drawer as AntdDrawer, } from 'antd';
import cx from 'classnames';

const PlacementEnums = {
	TOP: 'top',
	RIGHT: 'right',
	BOTTOM: 'bottom',
	LEFT: 'left',
};
const {
	TOP,
	RIGHT,
	BOTTOM,
	LEFT,
} = PlacementEnums;

const propTypes = {
	className: PropTypes.string,
	isVisible: PropTypes.bool,
	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	placement: PropTypes.oneOf([
		TOP,
		RIGHT,
		BOTTOM,
		LEFT,
	]),
	width: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	height: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	style: PropTypes.object,
	isShowCloseIcon: PropTypes.bool,
	isMaskClosable: PropTypes.bool,
	isShowMask: PropTypes.bool,
	onClose: PropTypes.func,
};

const defaultProps = {
	isVisible: false,
	placement: RIGHT,
	width: '256px',
	height: '256px',
	isShowCloseIcon: true,
	isMaskClosable: true,
	isShowMask: false,
	onClose: () => {},
};

class Drawer extends Component {
	constructor() {
		super();
	}

	render() {
		const {
			className,
			isVisible,
			placement,
			title,
			width,
			height,
			style,
			onClose,
			children,
			isShowCloseIcon,
			isMaskClosable,
			isShowMask,
		} = this.props;

		return (
			<AntdDrawer
				className={cx('ljit-drawer', className)}
				title={title}
				visible={isVisible}
				placement={placement}
				width={width}
				height={height}
				style={style}
				onClose={onClose}
				closable={isShowCloseIcon}
				maskClosable={isMaskClosable}
				mask={isShowMask}
			>
				{children}
			</AntdDrawer>
		);
	}
}

Drawer.propTypes = propTypes;
Drawer.defaultProps = defaultProps;

Drawer.PlacementEnums = PlacementEnums;

export default Drawer;
