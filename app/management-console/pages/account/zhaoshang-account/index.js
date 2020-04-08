import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'ljit-react-components';
import PageBlock from '../../../components/page-block';
import { RouteKeyEnums, } from '../../../routes';
import './style.styl';

const { Sider, Content, } = Layout;
const {
	ACCOUNT_ZHAOSHANGACCOUNT_SETTING,
	ACCOUNT_ZHAOSHANGACCOUNT_DIVIDEND_RULE,
	ACCOUNT_ZHAOSHANGACCOUNT_WAGE_RULE,
} = RouteKeyEnums;

const propTypes = {
	onNavigate: PropTypes.func,
	renderedRoutes: PropTypes.object,
	pathName: PropTypes.string,
};

const defaultProps = {
	onNavigate: () => {},
};

// TODO fix css style, modify namespace
class AccountZhaoShangAccountPage extends Component {
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
					<Menu.Item key={ACCOUNT_ZHAOSHANGACCOUNT_SETTING} onClick={() => onNavigate(ACCOUNT_ZHAOSHANGACCOUNT_SETTING)}>
						<span>招商帐户设定</span>
					</Menu.Item>
					<Menu.Item key={ACCOUNT_ZHAOSHANGACCOUNT_DIVIDEND_RULE} onClick={() => onNavigate(ACCOUNT_ZHAOSHANGACCOUNT_DIVIDEND_RULE)}>
						<span>招商分紅规则管理</span>
					</Menu.Item>
					<Menu.Item key={ACCOUNT_ZHAOSHANGACCOUNT_WAGE_RULE} onClick={() => onNavigate(ACCOUNT_ZHAOSHANGACCOUNT_WAGE_RULE)}>
						<span>招商工資规则管理</span>
					</Menu.Item>
				</Menu>
			</Sider>
		);
	}
	render() {
		const { _renderSideMenu } = this;
		const { renderedRoutes, } = this.props;

		return (
			<PageBlock className="zhaoshang-account">
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

AccountZhaoShangAccountPage.propTypes = propTypes;
AccountZhaoShangAccountPage.defaultProps = defaultProps;

export default AccountZhaoShangAccountPage;
