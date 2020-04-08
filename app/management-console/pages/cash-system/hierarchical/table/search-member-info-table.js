import React from 'react';
import PropTypes from 'prop-types';
import {
	UserFinanceLevelDataPropTypes,
} from '../../../../lib/prop-types-utils';
import { Table, } from 'ljit-react-components';

const propTypes = {
	users: PropTypes.arrayOf(UserFinanceLevelDataPropTypes),
};

const defaultProps = {
	users: [],
};

function SearchMemberInfoTable({ users, }) {
	const columns = [
		{
			title: '帐号',
			dataIndex: 'username',
			width: '15%',
		},
		{
			title: '昵称',
			dataIndex: 'nickname',
			width: '15%',
		},
		{
			title: '存款总额累计',
			dataIndex: 'userStats.depositAmount',
		},
		{
			title: '提款总额累计',
			dataIndex: 'userStats.withdrawalAmount',
		},
		{
			title: '投注总量',
			dataIndex: 'userStats.bettingAmount',
		},
		{
			title: '总奖金',
			dataIndex: 'userStats.bettingReward',
		},
		{
			title: '余额',
			dataIndex: 'wallets[0].balance',
		},
	];

	return (
		<Table
			rowKey="id"
			dataSource={users}
			pagination={false}
			columns={columns}
		/>
	);
}

SearchMemberInfoTable.propTypes = propTypes;
SearchMemberInfoTable.defaultProps = defaultProps;

export default SearchMemberInfoTable;
