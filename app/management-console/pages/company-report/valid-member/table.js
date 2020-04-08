import React, { Component } from 'react';
import QueryForm from './form';
import {
	Table,
	HeaderButtonBar,
	RemindText,
	StatusTag,
} from 'ljit-react-components';
import PageBlock from '../../../components/page-block';

const propTypes = {};
const defaultProps = {};

const fakeData = [
	{
		key: '1',
		_id: '1',
		username: 'facai9865',
		registerType: '代理',
		rewards: 10000,
		totalBet: '21280',
		status: 'active',
	},
	{
		key: '2',
		_id: '2',
		username: 'yj980326',
		registerType: '会员',
		rewards: 1423000,
		totalBet: '14000',
		status: 'bet',
	},
	{
		key: '3',
		_id: '3',
		username: 'mzc004',
		registerType: '代理',
		rewards: 100000,
		totalBet: '2470524.336',
		status: 'banned',
	},
];

class TablePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isShowingTable: false,
		};

		this._handlSubmit = this._handlSubmit.bind(this);
		this._handleTableChange = this._handleTableChange.bind(this);
		this._renderTable = this._renderTable.bind(this);
	}

	_handlSubmit(queryDatas) {
		if (queryDatas) {
			this.setState({ isShowingTable: true });
		}
	}

	_handleTableChange(pagination, filters, sorter) {}

	_renderStatusTag(recordStatus) {
		const translatedTag = translateStatusTag(recordStatus);
		const { status, text, } = translatedTag;

		return (
			<StatusTag
				status={status}
				text={text}
			/>
		);
	}

	_renderTable(tableData) {
		return (
			<PageBlock>
				<HeaderButtonBar
					className="block-header"
					left={
						<RemindText
							text={"1. 当无输入代理帐号，将查询条件时间内(公司)所有投注金额达到要求的代理、会员。2. 结算资料为当日凌晨3点到隔日凌晨3点，当目前时间未超过凌晨3点将无昨日结算资料。3. 输入的达投注量至少需大于0以上。"}
						/>
					}
					right={
						<div className="action">
							<a href="#">匯出 Excel</a>
						</div>
					}
				/>
				<Table
					dataSource={tableData}
					onTableChange={this._handleTableChange}
					columns={[
						{
							title: '帐号',
							key: 'username',
							dataIndex: 'username',
							align: 'center',
						},
						{
							title: '注册类型',
							key: 'registerType',
							dataIndex: 'registerType',
							align: 'center',
						},
						{
							title: '时时彩奖金',
							key: 'rewards',
							dataIndex: 'rewards',
							align: 'center',
							render: (text, record) => (
								'$' + record.rewards.toLocaleString()
							),
						},
						{
							title: '总投注量',
							key: 'totalBet',
							dataIndex: 'totalBet',
							align: 'center',
						},
						{
							title: '状态',
							key: 'status',
							dataIndex: 'status',
							align: 'center',
							width: '20%',
							className: "status-with-filter",
							render: (text, record) => (
								this._renderStatusTag(record.status)
							),
						},
					]}
				/>
			</PageBlock>
		);
	}

	render() {
		const { isShowingTable, } = this.state;
		const {
			_handlSubmit,
			_renderTable,
		} = this;

		return (
			<div className="valid-member">
				<QueryForm onHandleSubmit={_handlSubmit} />
				{ isShowingTable ? _renderTable(fakeData) : null }
			</div>
		);
	}
}

TablePage.propTypes = propTypes;
TablePage.defaultProps = defaultProps;

export default TablePage;

function translateStatusTag(recordStatus) {
	let status = '';
	let text = '';

	switch (recordStatus) {
		case 'active': {
			status = StatusTag.StatusEnums.SUCCESS;
			text = "启用";
			break;
		}
		case 'bet': {
			status = StatusTag.StatusEnums.WARNING;
			text = "投注禁用";
			break;
		}
		case 'banned': {
			status = StatusTag.StatusEnums.ERROR;
			text = "禁用";
			break;
		}
		default:
			break;
	}

	return {
		status,
		text,
	};
}
