import React from 'react';
import { Link, } from 'react-router-dom';
import { Menu, } from 'ljit-react-components';
import { RouteKeyEnums, } from '../../routes';

const {
	SubMenu,
	Item: MenuItem,
} = Menu;
const { CASHSYSTEM_CREDIT_ROOT, } = RouteKeyEnums;

function generateCashSystemCreditMenu(departmentId, departmentName = '') {
	const departmentPath = departmentId ? `/${departmentId}` : '';
	const rootPath = `${CASHSYSTEM_CREDIT_ROOT}${departmentPath}`;

	return (
		<SubMenu
			key={rootPath}
			title={`入款管理${departmentName}`}
		>
			<MenuItem key={`${rootPath}/bank`}>
				<Link to={`${rootPath}/bank`}>银行入款</Link>
			</MenuItem>
			<MenuItem key={`${rootPath}/third-party-to-bank`}>
				<Link to={`${rootPath}/third-party-to-bank`}>第三方转银行</Link>
			</MenuItem>
			<MenuItem key={`${rootPath}/third-party`}>
				<Link to={`${rootPath}/third-party`}>第三方入款</Link>
			</MenuItem>
			<SubMenu
				key={`${rootPath}/control/bank`}
				title={`入款控制${departmentName}`}
			>
				<MenuItem key={`${rootPath}/control/bank-account`}>
					<Link to={`${rootPath}/control/bank-account`}>银行帐户设定</Link>
				</MenuItem>
				<MenuItem key={`${rootPath}/control/third-party-to-bank-account`}>
					<Link to={`${rootPath}/control/third-party-to-bank-account`}>三方转银行設定</Link>
				</MenuItem>
				<MenuItem key={`${rootPath}/control/third-party-account`}>
					<Link to={`${rootPath}/control/third-party-account`}>第三方帐户设定</Link>
				</MenuItem>
			</SubMenu>
		</SubMenu>
	);
}

export default generateCashSystemCreditMenu;
