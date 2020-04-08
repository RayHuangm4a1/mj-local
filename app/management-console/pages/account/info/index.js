import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PageBlock from '../../../components/page-block';
import { RouteKeyEnums, } from '../../../routes';
import { Layout, Menu } from 'ljit-react-components';
import './style.styl';

const { Sider, Content, } = Layout;

const {
	ACCOUNT_INFO_IPSEARCH,
	ACCOUNT_INFO_LINK,
	ACCOUNT_INFO_LINKWECHAT,
} = RouteKeyEnums;

const propTypes = {
	onNavigate: () => {},
	renderedRoutes: PropTypes.object,
	pathName: PropTypes.string,
};

class AccountInfoPage extends Component {
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
					<Menu.Item key={ACCOUNT_INFO_IPSEARCH} onClick={() => onNavigate(ACCOUNT_INFO_IPSEARCH)}>
						<span>登入IP查詢</span>
					</Menu.Item>
					<Menu.Item key={ACCOUNT_INFO_LINK} onClick={() => onNavigate(ACCOUNT_INFO_LINK)}>
						<span>推广连结查询</span>
					</Menu.Item>
					<Menu.Item key={ACCOUNT_INFO_LINKWECHAT} onClick={() => onNavigate(ACCOUNT_INFO_LINKWECHAT)}>
						<span>微信推广连结查询</span>
					</Menu.Item>
				</Menu>
			</Sider>
		);
	}
	render() {
		const { _renderSideMenu } = this;
		const { renderedRoutes, } = this.props;

		return (
			<PageBlock className="ljit-info-page">
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

AccountInfoPage.propTypes = propTypes;

export default AccountInfoPage;
