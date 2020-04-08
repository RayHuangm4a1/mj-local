import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PageBlock from '../../../components/page-block';
import { RouteKeyEnums, } from '../../../routes';
import { Layout, Menu } from 'ljit-react-components';
import { PREFIX, } from './utils';
import './style.styl';

const { Sider, Content, } = Layout;

const {
	CASHSYSTEM_MANUALWITHDRAWAL_ROOT,
} = RouteKeyEnums;

const propTypes = {
	onNavigate: PropTypes.func,
	renderedRoutes: PropTypes.object,
	pathName: PropTypes.string,
	departmentId: PropTypes.string,
};

const defaultProps = {
	onNavigate: () => {},
};

class CasySystemManualWithdrawalPage extends Component {
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
		const { onNavigate, departmentId, } = this.props;
		const { _handleMenuSelect } = this;
		const rootPath = `${CASHSYSTEM_MANUALWITHDRAWAL_ROOT}/${departmentId}`;

		return (
			<Sider theme='light'>
				<Menu
					themeType={Menu.ThemeTypeEnums.LIGHT}
					selectedKeys={selectedKeys}
					onMenuItemSelect={_handleMenuSelect}
				>
					<Menu.Item key={`${rootPath}/deposit`} onClick={() => onNavigate(`${rootPath}/deposit`)}>
						<span>人工入款</span>
					</Menu.Item>
					<Menu.Item key={`${rootPath}/withdrawal`} onClick={() => onNavigate(`${rootPath}/withdrawal`)}>
						<span>人工出款</span>
					</Menu.Item>
					<Menu.Item key={`${rootPath}/transfer`} onClick={() => onNavigate(`${rootPath}/transfer`)}>
						<span>人工转点</span>
					</Menu.Item>
				</Menu>
			</Sider>
		);
	}
	render() {
		const { _renderSideMenu } = this;
		const { renderedRoutes, } = this.props;

		return (
			<PageBlock className={`${PREFIX}__page-block`}>
				<Layout>
					{_renderSideMenu()}
					<Layout>
						<Content>
							{renderedRoutes}
						</Content>
					</Layout>
				</Layout>
			</PageBlock>
		);
	}
}

CasySystemManualWithdrawalPage.propTypes = propTypes;
CasySystemManualWithdrawalPage.onNavigate = defaultProps;

export default CasySystemManualWithdrawalPage;
