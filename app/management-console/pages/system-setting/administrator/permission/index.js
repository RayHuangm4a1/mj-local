import React, { useState, useEffect, } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'ljit-react-components';
import PageBlock from '../../../../components/page-block';
import { RouteKeyEnums, } from '../../../../routes';
import './style.styl';

const { Sider, Content, } = Layout;
const { Item: MenuItem, } = Menu;

const {
	SYSTEMSETTING_ADMINISTRATOR_PERMISSION,
} = RouteKeyEnums;

const PREFIX_CLASS = 'administrator-permission';

const propTypes = {
	renderedRoutes: PropTypes.object.isRequired,
	onNavigate: PropTypes.func.isRequired,
};

const SystemSettingAdministratorPermissionPage = ({
	renderedRoutes,
	onNavigate,
}) => {
	const [ roles, setRoles, ] = useState([]);
	const [ selectedKeys, setSelectedKeys, ] = useState([]);

	useEffect(() => {
		// TODO fetch roles data
		const roles = fakeRoles;
		const roleHead = roles.length ? roles.slice().shift() : {};
		const rolePath = buildRolePath(roleHead.id);

		setRoles(roles);
		setSelectedKeys([ rolePath, ]);
		onNavigate(rolePath);

		// TODO 之後在 dependency array 中可能會需要用 array 來比對，要用 usePrevious 的方式來處理
		// ref: https://stackblitz.com/edit/react-ommrhy
	}, [ roles, ]);

	return (
		<PageBlock className={PREFIX_CLASS}>
			<Layout>
				<Sider theme='light'>
					<Menu
						className={`${PREFIX_CLASS}__menu`}
						themeType={Menu.ThemeTypeEnums.LIGHT}
						selectedKeys={selectedKeys}
						onMenuItemSelect={({ key, }) => setSelectedKeys([ key, ])}
					>
						{
							roles.map(({ id, rolename, }) => {
								const rolePath = buildRolePath(id);

								return (
									<MenuItem
										key={rolePath}
										onClick={() => onNavigate(rolePath)}
									>
										{rolename}
									</MenuItem>
								);
							})
						}
					</Menu>
				</Sider>
				<Layout>
					<Content className={`${PREFIX_CLASS}__menu-content`}>
						{renderedRoutes}
					</Content>
				</Layout>
			</Layout>
		</PageBlock>
	);
};

SystemSettingAdministratorPermissionPage.propTypes = propTypes;

function buildRolePath(roleId) {
	return (typeof roleId !== 'undefined') ? `${SYSTEMSETTING_ADMINISTRATOR_PERMISSION}/${roleId}` : '';
}

export default SystemSettingAdministratorPermissionPage;

const fakeRoles = [
	{
		id: 0,
		rolename: '代付公司',
	},
	{
		id: 1,
		rolename: '会计主管',
	},
];
