import React, { Component, } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import {
	LabelSelector,
} from 'ljit-react-components';
import './style.styl';

const PREFIX_CLASS = 'dashboard-block';


const OutlineEnum = {
	STRING: 'string',
	LABEL_SELECTOR: 'labelSelector',
};
const {
	STRING,
	LABEL_SELECTOR,
} = OutlineEnum;

const SizeEnum = {
	SMALL: 'small',
	LARGE: 'large',
};
const {
	SMALL,
	LARGE,
} = SizeEnum;

const propTypes = {
	icon: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.string,
	]),
	selectedItemId: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]),
	items: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string,
		]),
		name: PropTypes.string,
		content: PropTypes.node,
	})),
	headerOutline: PropTypes.oneOf(Object.values(OutlineEnum).concat('')),
	size: PropTypes.oneOf(Object.values(SizeEnum).concat('')),
	onClickItem: PropTypes.func,
};

const defaultProps = {
	icon: '',
	items: [],
	headerOutline: STRING,
	size: SMALL,
	onClickItem: () => {},
};

class DashboardBlock extends Component {
	constructor() {
		super();

		this._renderContent = this._renderContent.bind(this);
		this._renderLabelSelectorHeader = this._renderLabelSelectorHeader.bind(this);
		this._renderHeader = this._renderHeader.bind(this);
		this._renderLabelSelectorContent = this._renderLabelSelectorContent.bind(this);
	}

	_renderLabelSelectorHeader() {
		const {
			items,
			selectedItemId,
			onClickItem,
		} = this.props;

		return (
			<LabelSelector
				items={items}
				selectedId={selectedItemId}
				onClickItem={(item) => onClickItem(item.id)}
				isSelectedShowBorder={false}
			/>
		);
	}
	_renderHeader() {
		const {
			headerOutline,
			items,
			icon,
		} = this.props;

		let header = items[0] ? (<span>{items[0].name}</span>) : null;

		if (headerOutline === LABEL_SELECTOR) {
			header = this._renderLabelSelectorHeader();
		}

		return (
			<div className={`${PREFIX_CLASS}__header`}>
				{icon}
				{header}
			</div>
		);
	}
	_renderLabelSelectorContent() {
		const {
			selectedItemId,
			items,
		} = this.props;
		const item = items.filter(item => item.id === selectedItemId);

		return item[0] ? item[0].content : null;
	}
	_renderContent() {
		const {
			headerOutline,
			items,
			size,
		} = this.props;

		let content = items[0] ? items[0].content : null;

		if (headerOutline === LABEL_SELECTOR) {
			content = this._renderLabelSelectorContent();
		}

		return (
			<div className={cx(`${PREFIX_CLASS}__content`, {
				[`${PREFIX_CLASS}__content--small`]: size === SMALL,
				[`${PREFIX_CLASS}__content--large`]: size === LARGE,
			})}>
				{content}
			</div>
		);
	}
	render() {
		return (
			<div className={`${PREFIX_CLASS}`}>
				{this._renderHeader()}
				{this._renderContent()}
			</div>
		);
	}
}

DashboardBlock.propTypes = propTypes;
DashboardBlock.defaultProps = defaultProps;

DashboardBlock.OutlineEnum = OutlineEnum;
DashboardBlock.SizeEnum = SizeEnum;

export default DashboardBlock;
