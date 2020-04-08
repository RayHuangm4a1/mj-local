import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, } from 'ljit-react-components';
import PageBlock from '../../../components/page-block';
import { RouteKeyEnums, } from '../../../routes';
import './style.styl';

const {
	SYSTEMSETTING_GLOBAL,
	SYSTEMSETTING_GLOBAL_EXTERNAL_GAME,
	SYSTEMSETTING_GLOBAL_LEVEL_SALARY,
	SYSTEMSETTING_GLOBAL_PERIOD,
	SYSTEMSETTING_GLOBAL_STORAGE,
	SYSTEMSETTING_GLOBAL_URL,
	SYSTEMSETTING_GLOBAL_SWITCH,
} = RouteKeyEnums;

const { Sider, Content, } = Layout;

const propTypes = {
	pathName: PropTypes.string.isRequired,
	onNavigate: PropTypes.func,
	renderedRoutes: PropTypes.object,
};

const defaultProps = {};

class SystemSettingGlobalPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedKeys: [props.pathName],
		};
		this._handleMenuSelect = this._handleMenuSelect.bind(this);
	}

	componentDidMount() {
		const {
			pathName,
		} = this.props;

		if (pathName === `${SYSTEMSETTING_GLOBAL}`) {
			this._handleMenuSelect({ key: `${SYSTEMSETTING_GLOBAL}/external-game` });
		}
	}

	_handleMenuSelect({ key, }) {
		this.setState({ selectedKeys: [key], });
	}

	render() {
		const {
			onNavigate,
			renderedRoutes,
		} = this.props;
		const externalGamePath = `${SYSTEMSETTING_GLOBAL_EXTERNAL_GAME}`;
		const levelSalaryPath = `${SYSTEMSETTING_GLOBAL_LEVEL_SALARY}`;
		const periodPath = `${SYSTEMSETTING_GLOBAL_PERIOD}`;
		const storagePath = `${SYSTEMSETTING_GLOBAL_STORAGE}`;
		const urlPath = `${SYSTEMSETTING_GLOBAL_URL}`;
		const switchPath = `${SYSTEMSETTING_GLOBAL_SWITCH}`;

		return (
			<PageBlock className="system-setting-global-menu-wrapper" noMinHeight>
				<Layout className="system-setting-global-layout">
					<Sider theme="light">
						<Menu
							className="system-setting-global-menu"
							themeType={Menu.ThemeTypeEnums.LIGHT}
							selectedKeys={this.state.selectedKeys}
							onMenuItemSelect={this._handleMenuSelect}
						>
							<Menu.Item
								key={externalGamePath}
								onClick={() => onNavigate(externalGamePath)}
							>
								<span>外接游戏设置</span>
							</Menu.Item>
							<Menu.Item
								key={levelSalaryPath}
								onClick={() => onNavigate(levelSalaryPath)}
							>
								<span>层级与工资</span>
							</Menu.Item>
							<Menu.Item
								key={periodPath}
								onClick={() => onNavigate(periodPath)}
							>
								<span>时间与周期设置</span>
							</Menu.Item>
							<Menu.Item
								key={storagePath}
								onClick={() => onNavigate(storagePath)}
							>
								<span>资料保存设置</span>
							</Menu.Item>
							<Menu.Item
								key={urlPath}
								onClick={() => onNavigate(urlPath)}
							>
								<span>网址设置</span>
							</Menu.Item>
							<Menu.Item
								key={switchPath}
								onClick={() => onNavigate(switchPath)}
							>
								<span>启用与关闭</span>
							</Menu.Item>
						</Menu>
					</Sider>
					<Layout className="system-setting-global-layout">
						<Content className="member-menu-content">
							{renderedRoutes}
						</Content>
					</Layout>
				</Layout>
			</PageBlock>
		);
	}
}

SystemSettingGlobalPage.propTypes = propTypes;
SystemSettingGlobalPage.defaultProps = defaultProps;

export default SystemSettingGlobalPage;
