import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Button,
	Input,
	DecimalNumber,
} from 'ljit-react-components';
import SelectDropdown from '../../../../components/select-dropdown';
import ClientDateRangePicker from '../../../../features/client-date-range-picker';
import PagerTable from '../../../../components/pager-table';
import { formatDate, DATE_TIME } from '../../../../../lib/moment-utils';
import { connect, } from 'ljit-store-connecter';
import { MAX_SELECTION_DAYS } from '../../../../../lib/constants';
import './style.styl';

const propTypes = {};
const PREFIX_CLASS = 'ljit-transfer-third-party-log';
const { RangesEnums } = ClientDateRangePicker;
const {
	TODAY,
	YESTERDAY,
	THIS_WEEK,
} = RangesEnums;
const SelectTypeEnums = {
	ALL: 'all',
	TRANSFER_IN: 'transfer-in',
	TRANSFER_OUT: 'transfer-out',
};
const {
	ALL,
	TRANSFER_IN,
	TRANSFER_OUT,
} = SelectTypeEnums;
const transferMethodOptions = [
	{
		value: ALL,
		label: '全部',
	},
	{
		value: TRANSFER_IN,
		label: '转入',
	},
	{
		value: TRANSFER_OUT,
		label: '转出',
	},
];

class MemberTransferThirdPartyLogPage extends Component {
	constructor() {
		super();
		this.state = {
			pagination: {},
		};
		this._handleSearch = this._handleSearch.bind(this);
		this._handleChangeTablePage = this._handleChangeTablePage.bind(this);
	}

	_handleSearch() {
		const form = this.formInstance.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				// TODO dispatch search action.
			}
		});
	}

	_handleChangeTablePage(pagination, filters, sorter) {
		// TODO dispatch action to update transactionLog data

		this.setState({ pagination, });
	}

	render() {
		const {
			_handleSearch,
			_handleChangeTablePage,
		} = this;
		const {
			pagination,
		} = this.state;

		return (
			<div className={PREFIX_CLASS}>
				<Form
					cancelButtonDisabled
					submitButtonDisabled
					ref={(refForm) => this.formInstance = refForm}
				>
					<FormItem
						label="方案号"
						itemName="id"
						labelColon={false}
					>
						<Input
							placeholder="输入方案号"
						/>
					</FormItem>
					<FormItem
						label="转帐类型"
						itemName="transferType"
						labelColon={false}
						itemConfig={{
							initialValue: ALL
						}}
					>
						<SelectDropdown
							options={transferTypeOptions(fakeThirdParty)}
						/>
					</FormItem>
					<FormItem
						label="转帐方式"
						itemName="transferInOrOut"
						labelColon={false}
						itemConfig={{
							initialValue: ALL
						}}
					>
						<SelectDropdown
							options={transferMethodOptions}
						/>
					</FormItem>
					<FormItem
						label="时间"
						itemName="fromTo"
						labelColon={false}
					>
						<ClientDateRangePicker
							inputStyle={{ width: '310px', }}
							ranges={[TODAY, YESTERDAY, THIS_WEEK]}
							showTime
							format={DATE_TIME}
							limitDays={MAX_SELECTION_DAYS}
						/>
					</FormItem>
					<Button
						outline={Button.OutlineEnums.SOLID}
						onClick={_handleSearch}
						color={Button.ColorEnums.ORANGE}
					>
						查询
					</Button>
				</Form>
				<PagerTable
					rowKey="id"
					dataSource={fakeDataSource}
					columns={[
						{
							title: '方案号',
							dataIndex: 'id',
							width: 168,
						},
						{
							title: '转帐类型',
							dataIndex: 'type',
							width: 114,
						},
						{
							title: '转出转入',
							dataIndex: 'inOrOut',
							width: 114,
						},
						{
							title: '金额',
							dataIndex: 'amount',
							width: 100,
							render: (amount) => <DecimalNumber data={amount} hasSeparator/>,
						},
						{
							title: '状态',
							dataIndex: 'status',
							width: 100,
						},
						{
							title: '充值时间',
							dataIndex: 'createdAt',
							// TODO GET data from API
							sorter: () => 0,
							render: (value) => formatDate(value),
							width: 204,
						},
						{
							title: '备注',
							dataIndex: 'description',
							width: 192,
						},
					]}
					paginationProps={{
						...pagination,
						// TODO get totoal data length form api response
						total: 200,
					}}
					onTableChange={_handleChangeTablePage}
				/>
			</div>
		);
	}
}

MemberTransferThirdPartyLogPage.propTypes = propTypes;

function mapStateToProps(state) {
	return {
		// TODO GET data from redux
	};
}
function mapDispatchToProps(dispatch) {
	return {
		// TODO GET data from API
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberTransferThirdPartyLogPage);

// GET third party list from API
const fakeThirdParty = [
	'AG','CQ','LV',"WM"
];

function transferTypeOptions(array) {
	const options = array.map(item => {
		return {
			value: item,
			label: `${item}转帐`
		};
	});

	return [...[{ value: 'all', label: '全部' }], ...options];
}

const fakeDataSource = [
	{
		id: 4197849285,
		type: 'AG',
		inOrOut: '转出',
		amount: 99.2,
		status: '成功',
		createdAt: new Date(),
		description: '从平台转出到AG',
	},
	{
		id: 4197849286,
		type: 'CQ9',
		inOrOut: '转入',
		amount: 99.2,
		status: '失敗',
		createdAt: new Date(),
		description: '从CQ9转入到平台',
	}
];
