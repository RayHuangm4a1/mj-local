import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './style.styl';

const propTypes = {
	mainList: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
	})),
	subList: PropTypes.objectOf(PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string,
		}),
	)),
	selectedIds: PropTypes.arrayOf(PropTypes.number),
	className: PropTypes.string,
	style: PropTypes.object,
	onChange: PropTypes.func,
};

const defaultProps = {
	mainList: [],
	subList: {},
	selectedIds: [],
	onChange: () => {},
};

export const PREFIX_CLASS = 'ljit-collection-box';

class CollectionBox extends Component {
	constructor(props) {
		super(props);

		this.state = {
			mainList: props.mainList || [],
			subList: props.subList[0] || [],
			selectedMainListItem: props.mainList[0] || { id: '', },
		};

		this._handleClickMainListItem = this._handleClickMainListItem.bind(this);
		this._handleClickSubListItem = this._handleClickSubListItem.bind(this);
		this._renderMainList = this._renderMainList.bind(this);
		this._renderSubList = this._renderSubList.bind(this);
	}

	_handleClickMainListItem(item) {
		let subList = this.props.subList[item.id];

		subList = subList ? subList : [];

		this.setState({
			selectedMainListItem: item,
			subList: subList,
		});
	}

	_handleClickSubListItem(item) {
		const { onChange, selectedIds, } = this.props;

		let updatedSelectedIds = [...selectedIds, ];
		const index = updatedSelectedIds.findIndex(id => id === item.id);

		if (index > -1) {
			updatedSelectedIds.splice(index, 1);
		} else {
			updatedSelectedIds = [...updatedSelectedIds, item.id,];
		}

		onChange(updatedSelectedIds);
	}

	_renderMainList() {
		const { mainList, selectedMainListItem, } = this.state;
		const { _handleClickMainListItem, } = this;
		const items = mainList.map(_item => {
			const isSelected = _item === selectedMainListItem;

			return (
				<li
					key={`${PREFIX_CLASS}-${_item.name + _item.id}`}
					className={cx(`${PREFIX_CLASS}__menu-item`,
						`${PREFIX_CLASS}__menu-item--main`,
						{ [`${PREFIX_CLASS}__menu-item--selected`]: isSelected, },
					)}
					onClick={() => _handleClickMainListItem(_item)}
				>
					{_item.name}
				</li>
			);
		});

		return items;
	}

	_renderSubList() {
		const { subList, } = this.state;
		const { selectedIds, } = this.props;
		const { _handleClickSubListItem, } = this;
		const items = subList.map(_item => {
			const index = selectedIds.findIndex(item => item === _item.id) ;

			return (
				<li
					key={`${PREFIX_CLASS}-${_item.name + _item.id}`}
					className={cx(`${PREFIX_CLASS}__menu-item`,
						`${PREFIX_CLASS}__menu-item--sub`,
						{ [`${PREFIX_CLASS}__menu-item--selected`] : index > -1, }
					)}
					onClick={() => _handleClickSubListItem(_item)}
				>
					{_item.name}
				</li>
			);
		});

		return items;
	}

	render() {
		const { className, style, } = this.props;
		const {
			_renderMainList,
			_renderSubList,
		} = this;

		return (
			<div className={cx(`${PREFIX_CLASS}`, className)} style={style}>
				<div className={`${PREFIX_CLASS}__menus`}>
					<ul className={`${PREFIX_CLASS}__menu`}>
						{_renderMainList()}
					</ul>
					<ul className={`${PREFIX_CLASS}__menu`}>
						{_renderSubList()}
					</ul>
				</div>
			</div>
		);
	}
}

CollectionBox.propTypes = propTypes;
CollectionBox.defaultProps = defaultProps;

export default CollectionBox;
