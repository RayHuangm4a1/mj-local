import PropTypes from 'prop-types';

export const PlacementEnums = {
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
export const TriggerTypeEnums = {
	HOVER: 'hover',
	FOCUS: 'focus',
	CLICK: 'click',
	CONTEXT_MENU: 'contextMenu',
};
export const ColorEnums = {
	DEFAULT: 'default',
	WHITE: 'white',
};

export const TooltipPropTypes = {
	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	placement: PropTypes.oneOf(Object.values(PlacementEnums)),
	trigger: PropTypes.oneOf(Object.values(TriggerTypeEnums)),
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	className: PropTypes.string,
	isArrowPointAtCenter: PropTypes.bool,
	overlayColor: PropTypes.oneOf(Object.values(ColorEnums).concat('')),
	overlayClassName: PropTypes.string,
	overlayStyle: PropTypes.object,
};
