import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
	// TODO add new menu to ljit-react-components
	Menu,
} from 'antd';
import {
	Layout,
	Icon,
	ClickableTag,
} from 'ljit-react-components';
import './style.styl';

const {
	WHITE_CROWN_2,
	SETTING_FILL,
	WALLET,
	TICKET_STAR,
} = Icon.IconTypeEnums;

const { Sider, } = Layout;

const FAVORITE_REF_NAME = 'favorite';
const SIDER_WIDTH = 220;
const COLLAPSED_SIDER_WIDTH = 52;
const PREFIX_CLASS = 'lottery-sider-menu';
const MENU_PREFIX_CLASS = 'client-sidebar-menu';

const propTypes = {
	className: PropTypes.string,
	// group by lottery class id
	lotteriesData: PropTypes.object.isRequired,
	lotteryClassesData: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		code: PropTypes.string,
	})).isRequired,
	myLotteryCollectionsData: PropTypes.arrayOf(PropTypes.object),
	isFavoriteSettingDisabled: PropTypes.bool,
	onClickFavoriteSetting: PropTypes.func,
	// function(lottery: object[], event)
	onClickMenuItem: PropTypes.func,
};
const defaultProps = {
	isFavoriteSettingDisabled: false,
	onClickFavoriteSetting: () => {},
	onClickMenuItem: () => {},
};

class LotterySiderMenu extends Component  {
	constructor() {
		super();
		this.state = {
			isCollapsed: true,
			openKeys: [],
			selectedKeys: [],
		};
		this.subMenuRefs = {};

		this._handleChangeSubMenuOpen = this._handleChangeSubMenuOpen.bind(this);
		this._handleSelectMenuItem = this._handleSelectMenuItem.bind(this);
		this._handleClickSiderTrigger = this._handleClickSiderTrigger.bind(this);
		this._renderSiderTrigger = this._renderSiderTrigger.bind(this);
		this._handleClickSubMenuTitle = this._handleClickSubMenuTitle.bind(this);
		this._renderFavoriteSubMenu = this._renderFavoriteSubMenu.bind(this);
		this._renderSubMenu = this._renderSubMenu.bind(this);
		this._renderLotterySubMenus = this._renderLotterySubMenus.bind(this);
	}

	_handleChangeSubMenuOpen(openKeys) {
		this.setState({
			openKeys,
		});
	}
	_handleSelectMenuItem({ selectedKeys }) {
		this.setState({ selectedKeys: selectedKeys.slice(), });
	}

	_handleClickSiderTrigger() {
		const isCollapsed = !this.state.isCollapsed;

		this.setState(() => ({ isCollapsed, }));
	}
	_renderSiderTrigger() {
		const {
			isCollapsed,
		} = this.state;
		const collapsedStatus = isCollapsed ? 'caret-right' : 'caret-left';

		return (
			<div
				className={`${PREFIX_CLASS}__trigger`}
				onClick={this._handleClickSiderTrigger}
			>
				<Icon
					style={{ width: 12, height: 12, }}
					type={collapsedStatus}
				/>
			</div>
		);
	}

	_handleClickSubMenuTitle() {
		const {
			isCollapsed,
		} = this.state;

		if (!isCollapsed) {
			return;
		}

		this.setState(prevState => ({ isCollapsed: !prevState.isCollapsed, }));
	}
	_renderFavoriteSubMenu() {
		const {
			myLotteryCollectionsData,
			isFavoriteSettingDisabled,
			onClickFavoriteSetting,
			onClickMenuItem,
		} = this.props;
		const {
			isCollapsed,
		} = this.state;
		const titleIconType = isCollapsed ? WALLET : WHITE_CROWN_2;
		const titleIconSize = isCollapsed ? Icon.SizeEnums.LARGE : Icon.SizeEnums.X_LARGE;
		const titleContent = isCollapsed ? <div>收藏</div> : <span>我的收藏</span>;

		return (
			<li
				key="favorite-submenu"
				className={cx(
					`${MENU_PREFIX_CLASS}__submenu`,
					`${MENU_PREFIX_CLASS}__submenu--favorite`,
					'ant-menu-submenu',
					'ant-menu-submenu-inline',
					{
						[`${MENU_PREFIX_CLASS}__submenu--collapsed`]: isCollapsed,
					},
				)}
			>
				<div
					ref={_ref => this.subMenuRefs[FAVORITE_REF_NAME] = _ref}
					className="ant-menu-submenu-title"
					onClick={this._handleClickSubMenuTitle}
				>
					<div>
						<Icon
							type={titleIconType}
							size={titleIconSize}
							color={Icon.ColorEnums.WHITE}
						/>
						{titleContent}
					</div>
					<button
						onClick={(event) => {
							event.stopPropagation();
							onClickFavoriteSetting();
						}}
						disabled={isFavoriteSettingDisabled}
						className={cx(`${MENU_PREFIX_CLASS}__setting`, {
							'ant-menu-hidden': isCollapsed,
						})}
					>
						<Icon
							style={{
								width: 12,
								height: 12,
								marginRight: 0,
							}}
							size={Icon.SizeEnums.SMALL}
							type={SETTING_FILL}
						/>
					</button>
				</div>
				<ul
					className={cx('ant-menu ant-menu-sub ant-menu-inline', {
						'ant-menu-hidden': isCollapsed,
					})}
				>
					{myLotteryCollectionsData.map((lottery) => (
						<li
							key={lottery.code}
							className="ant-menu-item"
						>
							<ClickableTag
								onClick={event => onClickMenuItem(lottery, event)}
								text={lottery.name}
							/>
						</li>
					))}
				</ul>
			</li>
		);
	}
	_renderSubMenu(lotteryClass = {}, lotteries = [], index) {
		const {
			onClickMenuItem,
		} = this.props;
		const {
			isCollapsed,
		} = this.state;
		const {
			name: lotteryClassName,
			code: lotteryClassCode,
		} = lotteryClass;
		// TODO: 暫定用 lottery 資料來模擬遊戲的資料，之後再依照遊戲資料來做判定
		const isThirdParty = index > 0;
		const collapsedTitle = isThirdParty ? '游戏' : '彩票';
		const titleIconType = isCollapsed ? TICKET_STAR : WHITE_CROWN_2;
		const titleIconSize = isCollapsed ? Icon.SizeEnums.LARGE : Icon.SizeEnums.X_LARGE;
		const titleContent = isCollapsed ? <div>{collapsedTitle}</div> : <span>{lotteryClassName}</span>;

		return (
			<Menu.SubMenu
				ref={_ref => this.subMenuRefs[lotteryClassCode] = _ref}
				className={cx(
					`${MENU_PREFIX_CLASS}__submenu`,
					{
						[`${MENU_PREFIX_CLASS}__submenu--collapsed`]: isCollapsed,
					},
				)}
				onTitleClick={this._handleClickSubMenuTitle}
				key={`${lotteryClassCode}-submenu`}
				title={(
					<div>
						<Icon
							type={titleIconType}
							size={titleIconSize}
							color={Icon.ColorEnums.WHITE}
						/>
						{titleContent}
					</div>
				)}
			>
				{lotteries.map((lottery) => (
					<Menu.Item
						key={`${lotteryClassCode}-${lottery.code}`}
					>
						<ClickableTag
							onClick={event => onClickMenuItem(lottery, event)}
							text={lottery.name}
						/>
					</Menu.Item>
				))}
			</Menu.SubMenu>
		);
	}
	_renderLotterySubMenus() {
		const {
			lotteriesData,
			lotteryClassesData,
		} = this.props;
		const {
			isCollapsed,
		} = this.state;

		const subMenuRenderData = isCollapsed ? getFakeSubMenuRenderData(lotteryClassesData) : lotteryClassesData;
		const lotteriesAndThirdParties = subMenuRenderData.map((lotteryClass, index) => {
			const {
				id: lotteryClassId,
			} = lotteryClass;
			const mappedLotteries = lotteriesData[lotteryClassId];

			return this._renderSubMenu(lotteryClass, mappedLotteries, index);
		});

		return [
			this._renderFavoriteSubMenu(),
			...lotteriesAndThirdParties,
		];
	}

	render() {
		const {
			className,
		} = this.props;
		const {
			isCollapsed,
			openKeys,
			selectedKeys,
		} = this.state;

		return (
			<Sider
				className={cx(PREFIX_CLASS, className)}
				trigger={null}
				collapsible
				collapsed={isCollapsed}
				collapsedWidth={COLLAPSED_SIDER_WIDTH}
				width={SIDER_WIDTH}
			>
				{this._renderSiderTrigger()}
				<div className={`${PREFIX_CLASS}__menu-wrapper`}>
					<Menu
						ref={this.menuRef}
						className={cx(MENU_PREFIX_CLASS, {
							[`${MENU_PREFIX_CLASS}--collapsed`]: isCollapsed,
						})}
						mode="inline"
						openKeys={openKeys}
						selectedKeys={selectedKeys}
						onOpenChange={this._handleChangeSubMenuOpen}
						onSelect={this._handleSelectMenuItem}
						inlineCollapsed={isCollapsed}
					>
						{this._renderLotterySubMenus()}
					</Menu>
				</div>
			</Sider>
		);
	}
}

// TODO: 等遊戲資料結構確定再來改寫取資料方式
function getFakeSubMenuRenderData(lotteryClassesData = []) {
	return lotteryClassesData.filter((lotteryClass, index) => index < 2);
}

LotterySiderMenu.propTypes = propTypes;
LotterySiderMenu.defaultProps = defaultProps;

export default LotterySiderMenu;
