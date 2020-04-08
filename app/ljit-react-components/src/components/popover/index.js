import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Popover as AntdPopover, } from 'antd';

const PlacementEnums = {
	TOP: 'top',
	LEFT: 'left',
	RIGHT: 'right',
	BOTTOM: 'bottom',
	TOP_LEFT: 'topLeft',
	TOP_RIGHT: 'topRight',
	BOTTOM_LEFT: 'bottomLeft',
	BOTTOM_RIGHT: 'bottomRight',
	LEFT_TOP: 'leftTop',
	LEFT_BOTTOM: 'leftBottom',
	RIGHT_TOP: 'rightTop',
	RIGHT_BOTTOM: 'rightBottom',
};

const TriggerTypeEnums = {
	HOVER: 'hover',
	FOCUS: 'focus',
	CLICK: 'click',
	CONTEXT_MENU: 'contextMenu',
};

const propTypes = {
	className: PropTypes.string,
	overlayClassName: PropTypes.string,
	placement: PropTypes.oneOf(Object.values(PlacementEnums)),
	trigger: PropTypes.oneOf(Object.values(TriggerTypeEnums)),
	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	content: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
};

const defaultProps = {
	title: '',
	content: '',
	trigger: TriggerTypeEnums.HOVER,
	placement: PlacementEnums.TOP,
};

const PREFIX_CLASS = 'ljit-popover';
const PREFIX_OVERLAY_CLASS = 'ljit-popover-overlay';

const Popover = ({
	title,
	content,
	children,
	className,
	trigger,
	placement,
	overlayClassName,
}) => (
	<AntdPopover
		className={cx(PREFIX_CLASS, className)}
		title={title}
		content={content}
		trigger={trigger}
		placement={placement}
		overlayClassName={cx(PREFIX_OVERLAY_CLASS, overlayClassName)}
	>
		{children}
	</AntdPopover>
);

Popover.propTypes = propTypes;
Popover.defaultProps = defaultProps;
Popover.PlacementEnums = PlacementEnums;
Popover.TriggerTypeEnums = TriggerTypeEnums;

export default Popover;
