import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './style.styl';

const prefixClass = 'ljit-table-ellipsis-text';
const TooltipPositionEnums = {
	TOP: 'top',
	BOTTOM: 'bottom',
	LEFT: 'left',
	RIGHT: 'right',
};
const {
	TOP,
	BOTTOM,
	LEFT,
	RIGHT,
} = TooltipPositionEnums;
const propTypes = {
	text: PropTypes.string,
	className: PropTypes.string,
	positionToRight: PropTypes.number,
	positionToTop: PropTypes.number,
	tooltipWidth: PropTypes.number,
	tooltipPosition: PropTypes.oneOf([
		TOP,
		BOTTOM,
		LEFT,
		RIGHT,
	]),
};
const defaultProps = {
	tooltipWidth: 350,
	tooltipPosition: TooltipPositionEnums.BOTTOM,
};

const TableEllipsisText = ({
	text,
	className,
	positionToRight,
	positionToTop,
	tooltipWidth,
	tooltipPosition,
}) => {
	const { TOP, BOTTOM, RIGHT, LEFT, } = TooltipPositionEnums;

	return (
		<div className={cx(prefixClass, className)}>
			<div className={cx(`${prefixClass}__text`)}>{text}</div>
			<span
				className={cx(`${prefixClass}__tooltips`,{
					[`${prefixClass}__tooltips--${TOP}`]: tooltipPosition === TOP,
					[`${prefixClass}__tooltips--${BOTTOM}`]: tooltipPosition === BOTTOM,
					[`${prefixClass}__tooltips--${LEFT}`]: tooltipPosition === LEFT,
					[`${prefixClass}__tooltips--${RIGHT}`]: tooltipPosition === RIGHT,
				})}
				style={{
					right: `${positionToRight}px`,
					top: `${positionToTop}px`,
					width: `${tooltipWidth}px`,
				}}
			>{text}</span>
		</div>
	);
};

TableEllipsisText.propTypes = propTypes;
TableEllipsisText.defaultProps = defaultProps;

TableEllipsisText.TooltipPositionEnums = TooltipPositionEnums;

export default TableEllipsisText;
