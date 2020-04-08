import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import AntdMenu from 'antd/lib/menu';
import cx from 'classnames';
import SubMenu from './sub-menu';
import MenuItem from './menu-item';
import MenuItemGroup from './menu-item-group';
import 'antd/lib/menu/style';
import './style.styl';

export const PREFIX_CLASS = 'ljit-menu';

const ThemeTypeEnums = {
	LIGHT: 'light',
	DARK: 'dark',
};
const ModeTypeEnums ={
	INLINE: 'inline',
	HORIZONTAL: 'horizontal',
	VERTICAL: 'vertical',
};
const { LIGHT, DARK, } = ThemeTypeEnums;
const { INLINE, HORIZONTAL, VERTICAL, } = ModeTypeEnums;

const propTypes = {
	openKeys: PropTypes.arrayOf(PropTypes.string),
	selectedKeys: PropTypes.arrayOf(PropTypes.string),
	onSubMenuOpenChange: PropTypes.func,
	onMenuItemSelect: PropTypes.func,
	children: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.array,
	]),
	className: PropTypes.string,
	themeType: PropTypes.oneOf([
		LIGHT,
		DARK,
	]),
	modeType: PropTypes.oneOf([
		INLINE,
		HORIZONTAL,
		VERTICAL,
	]),
};
const defaultProps = {
	themeType: LIGHT,
	modeType: INLINE,
	onSubMenuOpenChange: () => {},
	onMenuItemSelect: () => {},
};

class Menu extends Component {
	render() {
		const {
			openKeys,
			selectedKeys,
			onSubMenuOpenChange,
			onMenuItemSelect,
			children,
			className,
			themeType,
			modeType,
		} = this.props;

		return (
			<AntdMenu
				className={cx(PREFIX_CLASS, {
					[`${PREFIX_CLASS}--light`]: themeType === LIGHT,
					[`${PREFIX_CLASS}--dark`]: themeType === DARK,
				}, className)}
				theme={themeType}
				mode={modeType}
				openKeys={openKeys}
				selectedKeys={selectedKeys}
				onOpenChange={onSubMenuOpenChange}
				onSelect={onMenuItemSelect}
			>
				{children}
			</AntdMenu>
		);
	}
}

Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

Menu.SubMenu = SubMenu;
Menu.Item = MenuItem;
Menu.ItemGroup = MenuItemGroup;
Menu.ThemeTypeEnums = ThemeTypeEnums;
Menu.ModeTypeEnums = ModeTypeEnums;

export default Menu;
