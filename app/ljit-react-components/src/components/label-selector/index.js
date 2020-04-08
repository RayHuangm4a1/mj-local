import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import LabelContent from '../label-content';
import ClickableTag from '../clickable-tag';
import cx from 'classnames';
import './style.styl';

const OrientationTypeEnums ={
	HORIZONTAL: 'horizontal',
	VERTICAL: 'vertical',
};
const { HORIZONTAL, VERTICAL, } = OrientationTypeEnums;

const prefixClass = 'ljit-label-selector';

const propTypes = {
	label: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	items: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string,
		]),
		name: PropTypes.string,
	})).isRequired,
	selectedId: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]),
	onClickItem: PropTypes.func,
	isSelectedShowBorder: PropTypes.bool,
	orientation: PropTypes.oneOf([
		HORIZONTAL,
		VERTICAL,
	]),
};

const defaultProps = {
	orientation: HORIZONTAL,
	onClickItem: () => {},
	isSelectedShowBorder: true,
};

class LabelSelector extends Component {
	constructor() {
		super();

		this._renderItems = this._renderItems.bind(this);
	}
	// TODO add selector componet and replace this
	_renderItems(items = []) {
		const { selectedId, onClickItem, isSelectedShowBorder, orientation, } = this.props;
		const itemList = items.map((item) => {
			const isActive = (selectedId === item.id);

			return (
				<ClickableTag
					key={`item-key-${item.id}`}
					text={item.name}
					onClick={() => onClickItem(item)}
					className={cx(`${prefixClass}__item`, {
						[`${prefixClass}__item--active`]: isActive,
						[`${prefixClass}__item--active-border`]: isActive && isSelectedShowBorder,
						[`${prefixClass}__item--vertical`]: orientation === VERTICAL,
					})}
				/>
			);
		});

		return itemList;
	}

	render() {
		const { label, items, } = this.props;
		const { _renderItems, } = this;

		return (
			<LabelContent
				label={label}
				className={prefixClass}
			>
				{_renderItems(items)}
			</LabelContent>
		);
	}
}

LabelSelector.propTypes = propTypes;
LabelSelector.defaultProps = defaultProps;
LabelSelector.OrientationTypeEnums = OrientationTypeEnums;

export default LabelSelector;
