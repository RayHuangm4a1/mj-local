// TODO: 正式上線的時候找 PM 確認下級狀態頁面的檔案還需不需要保留
import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Input,
	Form,
	FormItem,
	Button,
	DecimalNumber
} from 'ljit-react-components';
import PagerTable from '../../../../components/pager-table';
import ClientDateRangePicker from '../../../../features/client-date-range-picker';
import { connect, } from 'ljit-store-connecter';
import { DATE } from '../../../../../lib/moment-utils';
import './style.styl';

const { RangesEnums } = ClientDateRangePicker;
const {
	TODAY,
	YESTERDAY,
	THIS_WEEK,
} = RangesEnums;

const PREFIX_CLASS = 'ljit-children-status-page';
const propTypes = {};

class AgentChildrenStatusPage extends Component {
	constructor() {
		super();
		this.state = {
			pagination: [],
		};
		this._handleSearch = this._handleSearch.bind(this);
		this._handleChangeTablePage = this._handleChangeTablePage.bind(this);
	}

	_handleSearch() {
		const form = this.formInstance.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				// TODO dispatch search action.
				console.log(values);
			}
		});
	}

	_handleChangeTablePage(pagination, filters, sorter) {
		// TODO dispatch action to update transactionLog data

		this.setState({ pagination, });
	}

	_renderUserStatus(value) {
		if (value) {
			return <div className={`${PREFIX_CLASS}__status--limit`}>冻结</div>;
		} else {
			return <div> 正常 </div>;
		}
	}

	render() {
		const { pagination } = this.state;
		const { _handleSearch, _handleChangeTablePage, _renderUserStatus } = this;

		return (
			<div className={PREFIX_CLASS}>
				<Form
					cancelButtonDisabled
					submitButtonDisabled
					ref={(refForm) => this.formInstance = refForm}
				>
					<FormItem
						label="会员名"
						itemName="id"
						labelColon={false}
					>
						<Input
							placeholder="输入会员名"
						/>
					</FormItem>
					<FormItem
						label="时间"
						itemName="fromTo"
						labelColon={false}
					>
						<ClientDateRangePicker
							inputStyle={{ width: '230px', }}
							ranges={[TODAY, YESTERDAY, THIS_WEEK]}
							format={DATE}
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
					rowKey="username"
					dataSource={fakeData}
					columns={[
						{
							title: '会员名',
							dataIndex: 'username',
							width: 101,
							sorter: () => 0,
						},
						{
							title: '银行卡',
							dataIndex: 'bankCard',
							width: 101,
							sorter: () => 0,
						},
						{
							title: '彩票资金',
							dataIndex: 'lotteryWallets',
							width: 120,
							sorter: () => 0,
							render: (value) => <DecimalNumber data={value} hasSeparator/>,
						},
						{
							title: '外接资金',
							dataIndex: 'thirdPartyWallets',
							width: 120,
							sorter: () => 0,
							render: (value) => <DecimalNumber data={value} hasSeparator/>,
						},
						{
							title: '大户资金',
							dataIndex: 'largeHouseholdFunds',
							width: 120,
							sorter: () => 0,
							render: (value) => <DecimalNumber data={value} hasSeparator/>,
						},
						{
							title: '会员状态',
							dataIndex: 'isLimit',
							width: 94,
							render: (value) => _renderUserStatus(value)
						},
						{
							title: '注册人数',
							dataIndex: 'numOfRegister',
							width: 120,
							sorter: () => 0,
						},
						{
							title: '累积盈亏',
							dataIndex: 'cumulativeProfitAndLoss',
							width: 120,
							sorter: () => 0,
							render: (value) => <DecimalNumber data={value} hasSeparator/>,
						},
						{
							title: '开通转帐',
							dataIndex: 'isTransfer',
							width: 95,
							render: (value) => value ? '已设置' : '未设置'
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

AgentChildrenStatusPage.propTypes = propTypes;

function mapStateToProps(state) {
	return {
		// TODO get data from redux
	};
}

function mapDispatchToProps(dispatch) {
	return {
		// TODO post data by action
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AgentChildrenStatusPage);

// TODO 確認資料格式
const fakeData = [
	{
		username: 'testhd01',
		bankCard: 0,
		lotteryWallets: 99999.99,
		thirdPartyWallets: 99999.99,
		largeHouseholdFunds: 99999.99,
		isLimit: false,
		numOfRegister: 0,
		cumulativeProfitAndLoss: 999999.99,
		isTransfer: false,
	},
	{
		username: 'testhd02',
		bankCard: 1,
		lotteryWallets: 0,
		thirdPartyWallets: 99999.99,
		largeHouseholdFunds: 99999.99,
		isLimit: true,
		numOfRegister: 4,
		cumulativeProfitAndLoss: 9,
		isTransfer: true,
	}
];
