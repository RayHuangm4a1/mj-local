import React, { Component } from 'react';
import {
	Table,
	HeaderButtonBar,
} from 'ljit-react-components';
import PageBlock from '../../../components/page-block';
import QueryForm from './form';
import './style.styl';

const propTypes = {};
const defaultProps = {};

const fakeData =[
	{
		key: '1',
		_id: '1',
		member: '时时彩',
		rewardNumber: '1700',
		chargeAmount: '15',
		withdraw: '1000',
		bet: '100500',
		reward: '32101',
		rebate: '2131.8',
		activity: '325',
		profit: '4.23',
		winRateRatio: '0%',
	},
	{
		key: '2',
		_id: '2',
		member: '北京赛车',
		rewardNumber: '1200',
		chargeAmount: '5000',
		withdraw: '10000',
		bet: '3029.94',
		reward: '9302',
		rebate: '33241.2',
		activity: '24',
		profit: '2',
		winRateRatio: '72.433%',
	},
	{
		key: '3',
		_id: '3',
		member: '福体彩',
		rewardNumber: '1800',
		chargeAmount: '1000',
		withdraw: '100000',
		bet: '1',
		reward: '33332',
		rebate: '234.9',
		activity: '5646',
		profit: '0',
		winRateRatio: '76.688%',
	},
];

class TablePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isShowingTable: false,
		};

		this._handleSubmitForm = this._handleSubmitForm.bind(this);
	}

	_handleSubmitForm(queryDatas) {
		if (queryDatas) {
			this.setState({ isShowingTable: true });
		}
	}

	_renderTable(tableData) {
		return (
			<PageBlock>
				<HeaderButtonBar
					className="block-header"
					right={<div className="action">
						<a href="#">匯出 Excel</a>
					</div>}
				/>
				<Table
					dataSource={tableData}
					columns={[
						{
							title: '会员',
							key: 'member',
							dataIndex: 'member',
							align: 'center',
							sorter: (a,b) => a.member.length - b.member.length,
						},
						{
							title: '奖金号',
							key: 'rewardNumber',
							dataIndex: 'rewardNumber',
							align: 'center',
							sorter: (a,b) => a.rewardNumber - b.rewardNumber,
						},
						{
							title: '充值',
							key: 'chargeAmount',
							dataIndex: 'chargeAmount',
							align: 'center',
							sorter: (a,b) => a.chargeAmount - b.chargeAmount,
						},
						{
							title: '提现',
							key: 'withdraw',
							dataIndex: 'withdraw',
							align: 'center',
							sorter: (a,b) => a.withdraw - b.withdraw,
						},
						{
							title: '投注',
							key: 'bet',
							dataIndex: 'bet',
							align: 'center',
							sorter: (a,b) => a.bet - b.bet,
						},
						{
							title: '奖金',
							key: 'reward',
							dataIndex: 'reward',
							align: 'center',
							sorter: (a,b) => a.reward - b.reward,
						},
						{
							title: '返點',
							dataIndex: 'rebate',
							key: 'rebate',
							align: 'center',
							sorter: (a,b) => a.rebate - b.rebate,
						},
						{
							title: '活动',
							dataIndex: 'activity',
							key: 'activity',
							align: 'center',
							sorter: (a,b) => a.activity - b.activity,
						},
						{
							title: '盈亏',
							key: 'profit',
							dataIndex: 'profit',
							align: 'center',
							sorter: (a,b) => a.profit - b.profit,
						},

						{
							title: '胜率比率',
							key: 'winRateRatio',
							dataIndex: 'winRateRatio',
							align: 'center',
							sorter: (a,b) => a.winRateRatio - b.winRateRatio,
						},
					]}
				/>
			</PageBlock>
		);
	}

	render() {
		const { isShowingTable, } = this.state;
		const {
			_handleSubmitForm,
			_renderTable,
		} = this;
		const tableData = fakeData;

		return (
			<div className="member-benefit">
				<QueryForm
					onHandleSubmit={_handleSubmitForm}
					submitButtonDisabled={true}
					cancelButtonDisabled={true}
				/>
				{ isShowingTable ? _renderTable(tableData) : null }
			</div>
		);
	}
}

TablePage.propTypes = propTypes;
TablePage.defaultProps = defaultProps;

export default TablePage;
