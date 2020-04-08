import React from 'react';
import { Link, } from 'react-router-dom';
import { Menu, } from 'antd';
import { RouteKeyEnums, } from '../../routes';

const {
	Item: MenuItem,
} = Menu;
const { CASHSYSTEM_MANUALWITHDRAWAL_ROOT, } = RouteKeyEnums;

function generateCashSystemManualWithdrawal(departmentId, departmentName = '') {
	const departmentPath = departmentId ? `/${departmentId}` : '';
	const rootPath = `${CASHSYSTEM_MANUALWITHDRAWAL_ROOT}${departmentPath}`;

	return (
		<MenuItem key={rootPath}>
			<Link to={rootPath}>{departmentName}</Link>
		</MenuItem>
	);
}

export default generateCashSystemManualWithdrawal;
