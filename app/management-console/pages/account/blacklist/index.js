import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'ljit-react-components';
import PageBlock from '../../../components/page-block';
import { RouteKeyEnums, } from '../../../routes';
import './style.styl';

const { Sider, Content, } = Layout;

const {
	ACCOUNT_BLACKLIST_BANKBANNED,
	ACCOUNT_BLACKLIST_IPBANNED,
	ACCOUNT_BLACKLIST_FRONTSTAGE_WHITE_LIST,
} = RouteKeyEnums;

const propTypes = {
	onNavigate: PropTypes.func,
	renderedRoutes: PropTypes.object,
	pathName: PropTypes.string,
};

const defaultProps = {
	onNavigate: () => {},
};

class AccountBlacklistPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedKeys: [props.pathName],
		};
		this._handleMenuSelect = this._handleMenuSelect.bind(this);
		this._renderSideMenu = this._renderSideMenu.bind(this);
	}
	_handleMenuSelect({ key, }) {
		this.setState({ selectedKeys: [key], });
	}
	_renderSideMenu() {
		const { selectedKeys } = this.state;
		const { onNavigate } = this.props;
		const { _handleMenuSelect } = this;

		return (
			<Sider theme='light'>
				<Menu
					themeType={Menu.ThemeTypeEnums.LIGHT}
					selectedKeys={selectedKeys}
					onMenuItemSelect={_handleMenuSelect}
				>
					<Menu.Item key={ACCOUNT_BLACKLIST_IPBANNED} onClick={() => onNavigate(ACCOUNT_BLACKLIST_IPBANNED)}>
						<span>IP黑名单</span>
					</Menu.Item>
					<Menu.Item key={ACCOUNT_BLACKLIST_BANKBANNED} onClick={() => onNavigate(ACCOUNT_BLACKLIST_BANKBANNED)}>
						<span>银行卡黑名单</span>
					</Menu.Item>
					<Menu.Item key={ACCOUNT_BLACKLIST_FRONTSTAGE_WHITE_LIST} onClick={() => onNavigate(ACCOUNT_BLACKLIST_FRONTSTAGE_WHITE_LIST)}>
						<span>前台IP白名单</span>
					</Menu.Item>
				</Menu>
			</Sider>
		);
	}
	render() {
		const { _renderSideMenu } = this;
		const { renderedRoutes, } = this.props;

		return (
			<PageBlock className="ljit-blacklist-page">
				<Layout>
					{_renderSideMenu()}
					<Layout>
						<Content className="member-menu-content">
							{renderedRoutes}
						</Content>
					</Layout>
				</Layout>
			</PageBlock>
		);
	}
}

AccountBlacklistPage.propTypes = propTypes;
AccountBlacklistPage.defaultProps = defaultProps;

export default AccountBlacklistPage;
