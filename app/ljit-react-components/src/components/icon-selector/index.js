import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Icon from '../icon';
import SelectorItem from './selector-item';
import './style.styl';

const {
	SizeEnums,
	IconTypeEnums,
} = Icon;

const {
	IconPlacementEnums,
} = SelectorItem;

const {
	LEFT_SIDE,
} = IconPlacementEnums;

const propTypes = {
	className: PropTypes.string,
	selectedId: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]),
	onClickItem: PropTypes.func,
	items: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string,
		]),
		name: PropTypes.string,
		iconType: PropTypes.oneOf(Object.values(IconTypeEnums)),
		selectedIconType: PropTypes.oneOf(Object.values(IconTypeEnums)),
	})).isRequired,
	isVertical: PropTypes.bool,
	iconPlacement: PropTypes.oneOf(Object.values(IconPlacementEnums)),
	iconSize: PropTypes.oneOf(Object.values(SizeEnums)),
};

const defaultProps = {
	className: '',
	selectedId: '',
	items: [],
	isVertical: false,
	iconPlacement: LEFT_SIDE,
};

const prefixClass = 'ljit-icon-selector';

class IconSelector extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hoveredId: '',
		};
		this._handleMouseEnter = this._handleMouseEnter.bind(this);
		this._handleMouseLeave = this._handleMouseLeave.bind(this);
		this._renderItems = this._renderItems.bind(this);
	}
	_handleMouseEnter(id) {
		this.setState({ hoveredId: id, });
	}
	_handleMouseLeave() {
		this.setState({ hoveredId: '', });
	}
	_renderItems() {
		const { props, state, _handleMouseEnter, _handleMouseLeave, } = this;
		const { items, selectedId, onClickItem, iconPlacement, iconSize, } = props;

		return items.map(item => {
			const { name, id, iconType, selectedIconType, } = item;
			const isActive = id === selectedId;
			const isHover = id === state.hoveredId;
			const currentType = (isHover || isActive) && selectedIconType ? selectedIconType : iconType;

			return (
				<SelectorItem
					key={`icon-selector__item-${id}`}
					id={id}
					name={name}
					iconPlacement={iconPlacement}
					onMouseEnter={_handleMouseEnter}
					onMouseLeave={_handleMouseLeave}
					onClickItem={onClickItem}
					currentType={currentType}
					isActive={isActive}
					iconSize={iconSize}
				/>
			);
		});
	}
	render() {
		const { props, _renderItems, } = this;
		const { isVertical, className, } = props;

		return (
			<div
				className={cx(prefixClass,
					{ [`${prefixClass}--vertical-direction`] :isVertical, },
					className)}
			>
				{_renderItems()}
			</div>
		);
	}
}

IconSelector.propTypes = propTypes;
IconSelector.defaultProps = defaultProps;
IconSelector.IconPlacementEnums = IconPlacementEnums;

export default IconSelector;
