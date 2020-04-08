import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import { matchRoutes, } from 'react-router-config';
import { connect } from 'ljit-store-connecter';
import { Link, withRouter, NavLink, } from 'react-router-dom';
import {
	Breadcrumb,
	HeaderBanner,
	Layout,
	Icon,
	UserAvatar,
	IconButton,
	Menu,
	Dropdown,
} from 'ljit-react-components';
import {
	RoleRulesProvider,
	RoleRuleActionEnum,
} from '../../lib/role-rules-provider';
import routes, { RouteKeyEnums, } from '../routes';
import { LoadingStatusEnum, } from '../lib/enums';
import SidebarMenu from '../components/sidebar-menu';
import { renderSwitches, } from './render-routes';
import { applicationActions, } from '../controller';
const {
	initializeApplicationAction,
} = applicationActions;
const { Item: MenuItem, } = Menu;
const { Header, Content } = Layout;
const {
	SEARCH,
	MENU_FOLD,
	MENU_UNFOLD,
	BELL,
} = Icon.IconTypeEnums;
const {
	ANNOUNCEMENT,
	LOTTERY,
	EXTERNALGAME,
	ACCOUNT,
	CASHSYSTEM,
	USERREPORT,
	COMPANYREPORT,
	SYSTEMSETTING,
	LOGOUT,
} = RouteKeyEnums;
const {
	VISIT: ROLE_RULE_VISIT,
} = RoleRuleActionEnum;

const sidebarMenuFirstLevelKeys = [
	ANNOUNCEMENT,
	LOTTERY,
	EXTERNALGAME,
	ACCOUNT,
	CASHSYSTEM,
	USERREPORT,
	COMPANYREPORT,
	SYSTEMSETTING,
];

const {
	LOADING,
	SUCCESS,
	FAILED,
	NONE,
} = LoadingStatusEnum;

const propTypes = {
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired,
	}).isRequired,
	me: PropTypes.shape({
		id: PropTypes.number,
		username: PropTypes.string,
		type: PropTypes.number,
	}),
	auth: PropTypes.shape({
		isAuthed: PropTypes.bool.isRequired,
	}).isRequired,
	initializeApplicationAction: PropTypes.func.isRequired,
	appLoadingStatus: PropTypes.oneOf([LOADING, SUCCESS, FAILED, NONE,]).isRequired,
};

class LayoutRoute extends Component {
	constructor(props) {
		super(props);
		const {
			location: {
				pathname,
			},
		} = props;
		// set default menu open when page loaded
		const matchedRoutes = matchRoutes(routes, pathname)
			.map(matchedRoute => matchedRoute.route.path);

		this.state = {
			isMenuCollapsed: false,
			openKeys: matchedRoutes,
			selectedKeys: [pathname],
		};
		this._renderPublicLayout = this._renderPublicLayout.bind(this);
		this._handleToggle = this._handleToggle.bind(this);
		this._handleSubMenuOpenChange = this._handleSubMenuOpenChange.bind(this);
		this._handleMenuItemSelect = this._handleMenuItemSelect.bind(this);
		this._renderPrivateLayout = this._renderPrivateLayout.bind(this);
	}

	_renderPublicLayout() {
		return (
			<Content>
				{renderSwitches(routes)}
			</Content>
		);
	}

	_handleToggle() {
		const {
			location: {
				pathname,
			},
		} = this.props;
		const { isMenuCollapsed, } = this.state;
		const matchedRoutes = matchRoutes(routes, pathname)
			.map(matchedRoute => matchedRoute.route.path);

		this.setState({
			isMenuCollapsed: !isMenuCollapsed,
			openKeys: isMenuCollapsed ? matchedRoutes : [],
		});
	}
	_handleSubMenuOpenChange(openKeys) {
		const latestOpenKey = openKeys.slice().pop();

		if (sidebarMenuFirstLevelKeys.indexOf(latestOpenKey) === -1) {
			this.setState({ openKeys });
		} else {
			this.setState({
				openKeys: latestOpenKey ? [latestOpenKey] : [],
			});
		}
	}
	_handleMenuItemSelect({ selectedKeys }) {
		this.setState({ selectedKeys: selectedKeys.slice() });
	}
	_renderPrivateLayout() {
		const { username, } = this.props.me;
		const { appLoadingStatus, } = this.props;
		const {
			isMenuCollapsed,
			openKeys,
			selectedKeys,
		} = this.state;

		if (appLoadingStatus !== LoadingStatusEnum.SUCCESS) {
			return null;
		}

		return (
			<RoleRulesProvider
				roleRules={[
					{
						key: 'lottery',
						actions: [ ROLE_RULE_VISIT, ],
						children: [
							{
								key: 'lottery-setting',
								actions: [ ROLE_RULE_VISIT, ],
							},
						],
					},
					{
						key: 'external-game',
						actions: [ ROLE_RULE_VISIT, ],
					},
				]}
			>
				<Fragment>
					<SidebarMenu
						collapsed={isMenuCollapsed}
						title={isMenuCollapsed ? "YY" : "YY平台后台"}
						openKeys={openKeys}
						selectedKeys={selectedKeys}
						onSubMenuOpenChange={this._handleSubMenuOpenChange}
						onMenuItemSelect={this._handleMenuItemSelect}
					/>
					<Layout>
						<Header className="layout__header">
							<IconButton
								className="trigger"
								type={isMenuCollapsed ? MENU_UNFOLD : MENU_FOLD}
								style={{ color: 'rgba(0, 0, 0, 0.65)' }}
								size={IconButton.SizeEnums.LARGE}
								onClick={this._handleToggle}
							/>
							<Dropdown
								dropdownContent={(
									<Menu>
										<MenuItem key="0">
											<Link to="/user">
												个人帐号设定
											</Link>
										</MenuItem>
										<MenuItem key="1">
											<Link to={LOGOUT}>
												登出
											</Link>
										</MenuItem>
									</Menu>
								)}
								trigger={['click']}
							>
								<div style={{ float: 'right', marginLeft: 26, cursor: 'pointer', }}>
									<UserAvatar
										src="https://i.pravatar.cc/100"
										userName={username}
									/>
								</div>
							</Dropdown>
							<div style={{ float: 'right', fontSize: 16 }}>
								<Icon type={SEARCH} size="large" />
								<Icon type={BELL} size="large" style={{ marginLeft: 27 }} />
							</div>
						</Header>
						<HeaderBanner
							breadcrumb={<Breadcrumb Item={NavLink} />}
						/>
						<Content className="layout__content">
							{renderSwitches(routes)}
						</Content>
					</Layout>
				</Fragment>
			</RoleRulesProvider>
		);
	}

	render() {
		const {
			auth = {},
		} = this.props;
		const {
			isAuthed,
		} = auth;

		return (
			<Layout className="layout">
				{isAuthed ? this._renderPrivateLayout() : this._renderPublicLayout()}
			</Layout>
		);
	}

	componentDidMount() {
		const {
			auth = {},
			initializeApplicationAction,
		} = this.props;
		const { isAuthed, } = auth;

		if (isAuthed) {
			initializeApplicationAction();
		}
	}

	componentDidUpdate(prevProps) {
		const {
			auth = {},
			initializeApplicationAction,
		} = this.props;
		const { isAuthed, } = auth;

		if (prevProps.appLoadingStatus === NONE) {
			if (isAuthed) {
				initializeApplicationAction();
			}
		}
	}
}

LayoutRoute.propTypes = propTypes;

function mapStateToProps(state) {
	return {
		appLoadingStatus: state.application.get('loadingStatus'),
		me: state.me.get('data').toObject(),
	};
}
function mapDispathToProps(dispatch) {
	return {
		initializeApplicationAction: () => dispatch(initializeApplicationAction()),
	};
}

export default connect(mapStateToProps, mapDispathToProps)(withRouter(LayoutRoute));
