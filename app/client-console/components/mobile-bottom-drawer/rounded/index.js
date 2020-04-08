import React from 'react';
import PropTypes from 'prop-types';
import { Drawer, } from 'ljit-react-components';
import cx from 'classnames';
import './style.styl';

const propTypes = {
	isVisible: PropTypes.bool,
	className: PropTypes.string,
	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	],),
	height: PropTypes.number,
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	],),
	onClose: PropTypes.func,
};

const defaultProps = {
	isVisible: false,
	title: '',
	className: '',
	height: 365,
	onClose: () => {},
};

function MobileBottomDrawerRounded({
	isVisible,
	title,
	className,
	height,
	children,
	onClose,
}) {
	return (
		<Drawer
			title={title}
			className={cx("ljit-mobile-bottom-drawer", className)}
			placement={Drawer.PlacementEnums.BOTTOM}
			isShowCloseIcon={false}
			onClose={onClose}
			isVisible={isVisible}
			isShowMask={true}
			height={height}
		>
			{children}
		</Drawer>
	);
}

MobileBottomDrawerRounded.propTypes = propTypes;
MobileBottomDrawerRounded.defaultProps = defaultProps;

export default MobileBottomDrawerRounded;
