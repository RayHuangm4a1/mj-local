import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Icon from '../icon';

const {
	SizeEnums,
	IconTypeEnums,
} = Icon;

const IconPlacementEnums = {
	RIGHT_SIDE: 'right-side',
	LEFT_SIDE: 'left-side',
	UP_SIDE: 'up-side',
	DOWN_SIDE: 'down-side',
};

const {
	RIGHT_SIDE,
	UP_SIDE,
	DOWN_SIDE,
} = IconPlacementEnums;

const propTypes = {
	id: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]),
	name: PropTypes.string,
	onClickItem: PropTypes.func,
	onMouseEnter: PropTypes.func,
	onMouseLeave: PropTypes.func,
	isActive: PropTypes.bool,
	iconPlacement: PropTypes.oneOf(Object.values(IconPlacementEnums)),
	currentType: PropTypes.oneOf(Object.values(IconTypeEnums)),
	iconSize: PropTypes.oneOf(Object.values(SizeEnums)),
};

const defaultProps = {
	id: '',
	name: '',
	onClickItem: () => {},
	onMouseEnter: () => {},
	onMouseLeave: () => {},
	isActive: false,
	iconPlacement: IconPlacementEnums.LEFT_SIDE,
};

const prefixClass = 'ljit-icon-selector__item';

const SelectorItem = ({
	id,
	name,
	onMouseEnter,
	onMouseLeave,
	onClickItem,
	isActive,
	iconPlacement,
	currentType,
	iconSize,
}) => (
	<div
		className={cx(prefixClass, {
			[`${prefixClass}--active`]: isActive,
			[`${prefixClass}--icon-up-side`]: iconPlacement === UP_SIDE,
			[`${prefixClass}--icon-down-side`]: iconPlacement === DOWN_SIDE,
			[`${prefixClass}--right-side`]: iconPlacement === RIGHT_SIDE,
		})}
		onMouseEnter={() => onMouseEnter(id)}
		onMouseLeave={onMouseLeave}
		onClick={() => onClickItem(id)}
	>
		<div><Icon type={currentType} size={iconSize} /></div>
		<div>{name}</div>
	</div>
);

SelectorItem.propTypes = propTypes;
SelectorItem.defaultProps = defaultProps;
SelectorItem.IconPlacementEnums = IconPlacementEnums;

export default SelectorItem;
