import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'ljit-store-connecter';
import { walletsActions, } from '../../controller';
import { connectObservable } from 'ljit-observable/react-observable';
import { withLoadingStatusNotification } from '../../../lib/notify-handler';
import { EventEnum, LoadingStatusEnum, } from '../../lib/enums';
import { Layout, Menu, UserAvatar, Dropdown, Icon, IconButton, } from 'ljit-react-components';
import { Link, withRouter, } from 'react-router-dom';
import { withTheme, } from './../../lib/theme-provider';
import { RouteKeyEnums, } from '../../route';
import { RouteKeyEnums as RouteModalKeyEnums, } from '../../route-modals/member-center/routes';
import Wallets from '../wallets';
import LotteryMegaMenu from '../lottery-mega-menu';
import UserDropdownMenu from '../user-dropdown-menu';
import LogoIcon from '../../components/logo-icon';
import { default as compose } from 'lodash/flowRight';
import './style.styl';

const { fetchWalletsAction, } = walletsActions;
const {
	HOME,
	THIRDPARTY,
} = RouteKeyEnums;
const { Header, } = Layout;
const PREFIX_CLASS = 'client-header';
const {
	RECHARGE,
	WITHDRAW,
	TRANSFER,
} = RouteModalKeyEnums;
const { NONE, SUCCESS, FAILED, LOADING, } = LoadingStatusEnum;

const propTypes = {
	userData: PropTypes.shape({
		username: PropTypes.string,
		avatar: PropTypes.string,
		balance:  PropTypes.number,
	}).isRequired,
	walletsData: PropTypes.shape({
		supervision: PropTypes.array,
		primary: PropTypes.array
	}).isRequired,
	history: PropTypes.object,
	theme: PropTypes.shape({
		onSwitchTheme: PropTypes.func,
		style: PropTypes.object,
	}),
	fetchWalletsAction: PropTypes.func.isRequired,
	notifyShowMemberCenter: PropTypes.func.isRequired,
	walletsLoadingStatus: PropTypes.oneOf([ NONE, SUCCESS, FAILED, LOADING,]).isRequired,
	walletsLoadingStatusMessage: PropTypes.string,
};

class ClientHeader extends Component {
	constructor() {
		super();
		this.state = {
			openKeys: null,
			isShowBalance: true
		};
		this._handleNavigate = this._handleNavigate.bind(this);
		this._handleToggleBalance = this._handleToggleBalance.bind(this);
		this._renderBalance = this._renderBalance.bind(this);
	}

	_handleToggleBalance() {
		this.setState({
			isShowBalance: !this.state.isShowBalance
		});
	}

	_handleNavigate(uri, options = { passProps: {} }) {
		const {
			history,
		} = this.props;

		history.push({
			pathname: uri,
			passProps: options.passProps,
		});
	}
	_renderBalance() {
		const { walletsData, fetchWalletsAction, } = this.props;
		const { isShowBalance, } = this.state;
		const walletBalance = Object.keys(walletsData).length > 0 ? walletsData.primary[0].balance : 0;

		if (isShowBalance) {
			return (
				<>
					<span>$ {walletBalance}</span>
					<IconButton
						className={`${PREFIX_CLASS}-content__personal-icon`}
						type={IconButton.IconTypeEnums.RELOAD_OUTLINED}
						size={IconButton.SizeEnums.X_SMALL}
						onClick={fetchWalletsAction}
					/>
				</>
			);
		}
	}

	render() {
		const { userData, walletsData, theme, notifyShowMemberCenter, } = this.props;
		const { _handleToggleBalance, _handleNavigate, _renderBalance, } = this;
		const { style } = theme;
		const walletName = Object.keys(walletsData).length > 0 ? walletsData.primary[0].name : '';

		return (
			<Header className={`${style.themeHeader} ${PREFIX_CLASS}`}>
				<div className={`${PREFIX_CLASS}-content`}>
					<div className={`${PREFIX_CLASS}-content__left`}>
						<div className={`${PREFIX_CLASS}-content__logo`}>
							<Link to={HOME}>
								<LogoIcon/>
								<span  className={`${style.themeHeaderLogoText} ${PREFIX_CLASS}-content__logo--text`}>
									BETTING
								</span>
							</Link>
						</div>
						<Menu
							className={`${style.themeHeaderMenu} ${PREFIX_CLASS}-content__menu`}
							themeType={Menu.ThemeTypeEnums.LIGHT}
							modeType={Menu.ModeTypeEnums.HORIZONTAL}
							openKeys={this.state.openKeys}
							onSubMenuOpenChange={(openKeys) => this.setState({ openKeys, })}
						>
							{/* TODO: change Menu layout or dropdown */}
							<Menu.Item >
								<Link to={HOME} />
								首页
							</Menu.Item>
							<Menu.Item>
								<LotteryMegaMenu onNavigate={_handleNavigate}>
									<span>彩票大厅</span>
								</LotteryMegaMenu>
							</Menu.Item>
							<Menu.Item>
								<Link to={THIRDPARTY} />
								遊戲大厅
							</Menu.Item>
						</Menu>
					</div>
					{/* //TODO: add icon  */}
					<div className={`${style.themeHeaderPersonal} ${PREFIX_CLASS}-content__personal ${PREFIX_CLASS}-content__right`}>
						<div className={`${PREFIX_CLASS}-content__personal--wallet`}>
							<Dropdown
								className={`${PREFIX_CLASS}-content__personal--dropdown-wallet`}
								dropdownContent={
									<Wallets/>
								}
								placement={Dropdown.PlacementEnums.BOTTOM_CENTER}
								isKeepMenuOpen
							>
								<div className={`${PREFIX_CLASS}-content__personal--wallet-name`}>
									<Icon
										className={`${PREFIX_CLASS}-content__personal-icon`}
										type={Icon.IconTypeEnums.WALLET_LINE}
										size={Icon.SizeEnums.SMALL}
									/>
									{walletName}
								</div>
							</Dropdown>
							{_renderBalance()}
							<IconButton
								className={`${PREFIX_CLASS}-content__personal-icon`}
								type={IconButton.IconTypeEnums.EYE}
								size={IconButton.SizeEnums.SMALL}
								onClick={_handleToggleBalance}
							/>
						</div>
						<Menu
							className={`${style.themeHeaderPersonalMenu} ${PREFIX_CLASS}-content__personal--menu`}
							themeType={Menu.ThemeTypeEnums.LIGHT}
							modeType={Menu.ModeTypeEnums.HORIZONTAL}
						>
							<Menu.Item
								onClick={() => notifyShowMemberCenter(RECHARGE)}
							>
								充值
							</Menu.Item>
							<Menu.Item
								onClick={() => notifyShowMemberCenter(WITHDRAW)}
							>
								提现
							</Menu.Item>
							<Menu.Item
								onClick={() => notifyShowMemberCenter(TRANSFER)}
							>
								转帐
							</Menu.Item>
						</Menu>
						<UserDropdownMenu onNavigate={_handleNavigate}>
							<div>
								<UserAvatar
									className={`${style.themeHeaderPersonalAvatarName}`}
									src={userData.avatar}
									userName={userData.username}
								/>
							</div>
						</UserDropdownMenu>
					</div>
				</div>
			</Header>
		);
	}
}

ClientHeader.propTypes = propTypes;

function mapStateToProps(state) {
	return {
		walletsData: state.wallets.get('data').toObject(),
		userData: state.user.get('data').toObject(),
		walletsLoadingStatus: state.wallets.get('loadingStatus'),
		walletsLoadingStatusMessage: state.wallets.get('loadingStatusMessage')
	};
}
function mapDispatchToProps(dispatch) {
	return {
		fetchWalletsAction: () => dispatch(fetchWalletsAction()),
	};
}

function mapNotifyToProps(notify) {
	return {
		notifyShowMemberCenter: (data) => notify(EventEnum.SHOW_MEMBER_CENTER, data),
	};
}

export default compose(
	withRouter,
	withTheme,
	connect(mapStateToProps, mapDispatchToProps),
	connectObservable(mapNotifyToProps),
)(withLoadingStatusNotification(
	[
		{
			loadingStatus: 'walletsLoadingStatus',
			loadingStatusMessage: 'walletsLoadingStatusMessage',
		},
	],
	ClientHeader)
);
