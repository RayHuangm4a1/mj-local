import React, { useState, } from 'react';
import PropTypes from 'prop-types';
import { Button, Layout, Menu, } from 'ljit-react-components';
import PageBlock from '../../../../../components/page-block';
import { RouteKeyEnums, } from '../../../../../routes';

const { Sider, Content, } = Layout;
const { Item: MenuItem, } = Menu;
const {
	CASHSYSTEM_HIERARCHICAL_MANAGEMENT,
	CASHSYSTEM_HIERARCHICAL_MANAGEMENT_AUTO_REGION: MANAGEMENT_AUTO_REGION,
	CASHSYSTEM_HIERARCHICAL_MANAGEMENT_AUTO_IP: MANAGEMENT_AUTO_IP,
	CASHSYSTEM_HIERARCHICAL_MANAGEMENT_AUTO_RISKCONTROL: MANAGEMENT_AUTO_RISKCONTROL,
} = RouteKeyEnums;

const PREFIX_CLASS = 'management-auto-page';

const propTypes = {
	pathName: PropTypes.string,
	renderedRoutes: PropTypes.object,
	onNavigate: PropTypes.func.isRequired,
};

const CashSystemHierarchicalManagementAutoPage = ({
	pathName,
	renderedRoutes,
	onNavigate,
}) => {
	const [ selectedKeys, setSelectedKeys, ] = useState(pathName);

	return (
		<div className={PREFIX_CLASS}>
			<div className={`${PREFIX_CLASS}__toolbar`}>
				<Button
					outline={Button.OutlineEnums.HOLLOW}
					onClick={() => onNavigate(CASHSYSTEM_HIERARCHICAL_MANAGEMENT)}
				>
					返回上一层
				</Button>
			</div>
			<PageBlock className={`${PREFIX_CLASS}__block`}>
				<Layout>
					<Sider theme="light">
						<Menu
							className={`${PREFIX_CLASS}__sidemenu`}
							themeType={Menu.ThemeTypeEnums.LIGHT}
							selectedKeys={selectedKeys}
							onMenuItemSelect={({ key, }) => setSelectedKeys([ key, ])}
						>
							<MenuItem
								key={MANAGEMENT_AUTO_REGION}
								onClick={() => onNavigate(MANAGEMENT_AUTO_REGION)}
							>
								地区条件设置
							</MenuItem>
							<MenuItem
								key={MANAGEMENT_AUTO_IP}
								onClick={() => onNavigate(MANAGEMENT_AUTO_IP)}
							>
								IP条件设置
							</MenuItem>
							<MenuItem
								key={MANAGEMENT_AUTO_RISKCONTROL}
								onClick={() => onNavigate(MANAGEMENT_AUTO_RISKCONTROL)}
							>
								风控条件设置
							</MenuItem>
						</Menu>
					</Sider>
					<Layout>
						<Content className={`${PREFIX_CLASS}__content`}>
							{renderedRoutes}
						</Content>
					</Layout>
				</Layout>
			</PageBlock>
		</div>
	);
};

CashSystemHierarchicalManagementAutoPage.propTypes = propTypes;

export default CashSystemHierarchicalManagementAutoPage;
