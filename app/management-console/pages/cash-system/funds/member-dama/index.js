import React from 'react';
import {
	Table,
	DecimalNumber,
	TextButton,
} from 'ljit-react-components';
import { PREFIX_CLASS, } from '../utils';
import StatusCell from '../status-cell';
import SearchForm from '../search-form';
import AdjustmentModal from '../adjustment-modal';

const propTypes = {};
const defaultProps = {};

function CashSystemFundsMemberDamaPage() {
	const [isAdjustmentVisible, setIsAdjustmentVisible] = React.useState(false);
	const [searchData, setSearchData] = React.useState({});
	const _handleSearch = (data) => {
		setSearchData(data);
	};
	const _handleAdjustmentModalShow = (record) => {
		setIsAdjustmentVisible(true);
	};
	const _handleAdjustmentModalHide = () => {
		setIsAdjustmentVisible(false);
	};
	const _handleAdjustmentModalSubmit = (data) => {
		_handleAdjustmentModalHide();
	};
	const columns = [
		{
			title: '帐号',
			dataIndex: 'username',
		},
		{
			title: '玩家余额',
			dataIndex: 'balance',
			render: function render(balance) {
				return <DecimalNumber data={balance} hasSeparator/>;
			},
		},
		{
			title: '玩家打码量',
			dataIndex: 'memberDamaBet',
		},
		{
			title: '目前所需打码量',
			dataIndex: 'currentDamaBet',
		},
		{
			title: '转点需求',
			dataIndex: 'transfer',
			render: function render(transfer) {
				return <StatusCell status={transfer} />;
			},
		},
		{
			title: '操作',
			dataIndex: 'operation',
			render: function render(record) {
				return (
					<TextButton
						onClick={() => _handleAdjustmentModalShow(record)}
						text="修改"
					/>
				);
			},
		},
	];

	let tableContent = null;

	if (searchData.username) {
		tableContent = (
			<Table
				rowKey={record => record._id}
				dataSource={fakeAccounts}
				columns={columns}
			/>
		);
	}
	return (
		<div className={`${PREFIX_CLASS}__member-dama`}>
			<div className="fund-search">
				<SearchForm
					initialValues={{
						username: '',
					}}
					onSearch={_handleSearch}
				/>
			</div>
			{tableContent}
			<AdjustmentModal
				isVisible={isAdjustmentVisible}
				onSubmit={_handleAdjustmentModalSubmit}
				onCancel={_handleAdjustmentModalHide}
			/>
		</div>
	);
}

const fakeAccounts = [
	{
		_id: 1,
		username: 'test001',
		balance: 1234567,
		memberDamaBet: 1111000111,
		currentDamaBet: 9090909090,
		transfer: '1',
	},
	{
		_id: 2,
		username: 'test002',
		balance: 7654321,
		memberDamaBet: 222999222,
		currentDamaBet: 8181818181,
		transfer: '0',
	},
];

// TODO 串接 API 來完成 (1) search 跟 (2) 修改打碼量
CashSystemFundsMemberDamaPage.propTypes = propTypes;
CashSystemFundsMemberDamaPage.defaultProps = defaultProps;

export default CashSystemFundsMemberDamaPage;
