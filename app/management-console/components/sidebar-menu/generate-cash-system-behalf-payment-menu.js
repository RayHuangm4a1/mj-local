import React from 'react';
import { Link, } from 'react-router-dom';
import { Menu, } from 'antd';
import { RouteKeyEnums, } from '../../routes';

const {
	Item: MenuItem,
} = Menu;

const {
	CASHSYSTEM_BEHALFPAYMENT,
} = RouteKeyEnums;

function generateCashSystemBehalfPaymentMenu(companyId, companyName = '') {
	const companyPath = companyId ? companyId : '';
	const rootPath = `${CASHSYSTEM_BEHALFPAYMENT}/${companyPath}`;
	const company = companyName ? companyName : `代付公司 ${companyId}`;

	return (
		<MenuItem key={rootPath}>
			<Link to={rootPath}>{company}</Link>
		</MenuItem>
	);
}

export default generateCashSystemBehalfPaymentMenu;
