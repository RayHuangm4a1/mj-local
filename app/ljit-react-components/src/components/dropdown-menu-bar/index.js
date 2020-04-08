import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Icon from '../icon';
import { find, } from 'lodash';
import './style.styl';

const {
	IconTypeEnums,
	SizeEnums,
} = Icon;

const propTypes = {
	menuItems: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.string,
		id: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string,
		]),
		dropdownContent: PropTypes.node,
	})),
	selectedId: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]),
	onClickMenu: PropTypes.func,
	onClickMask: PropTypes.func,
};

const defaultProps = {
	menuItems: [],
	onClickMenu: () => {},
	onClickMask: () => {},
};

function DowndownMenuBar({
	menuItems,
	selectedId,
	onClickMenu,
	onClickMask,
}) {
	const _renderMenuItem = (id, title,) => {
		return (
			<div
				onClick={() => onClickMenu(id)}
				key={id}
				className={cx('ljit-dropdown-menu-bar__menu-item', {
					'ljit-dropdown-menu-bar__menu-item--active': id === selectedId,
				})}
			>
				<span>{title}</span>
				<Icon type={IconTypeEnums.CARET_DOWN} size={SizeEnums.X_SMALL}/>
			</div>
		);
	};

	const isVisible = !!selectedId;
	const selectedMenuItem = find(menuItems, { id: selectedId, }) || {};
	const { dropdownContent, } = selectedMenuItem;

	return (
		<React.Fragment>
			<div className='ljit-dropdown-menu-bar__menu'>
				{menuItems.map(data => {
					const { id, title, } = data;

					return _renderMenuItem(id, title);
				})}
			</div>
			<div
				className={cx('ljit-dropdown-menu-bar__dropdown', {
					'ljit-dropdown-menu-bar__dropdown--visible': isVisible,
				})}
				onClick={onClickMask}
			>
				<div
					className='ljit-dropdown-menu-bar__dropdown-content'
					onClick={(e) => e.stopPropagation()}
				>
					{dropdownContent ? dropdownContent : null}
				</div>
			</div>
		</React.Fragment>
	);
}

DowndownMenuBar.propTypes = propTypes;
DowndownMenuBar.defaultProps = defaultProps;

export default DowndownMenuBar;
