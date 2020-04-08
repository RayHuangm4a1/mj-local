import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Table,
	RemindText,
	HeaderButtonBar,
} from 'ljit-react-components';
import PageBlock from '../../../components/page-block';
import QueryForm from './form';
import { RouteKeyEnums, } from '../../../routes';
import './style.styl';

const { COMPANYREPORT_LOTTERY_PLAYS, } = RouteKeyEnums;

const propTypes = {
	onNavigate: PropTypes.func,
};
const defaultProps = {};

const fakeData = [
	{
		key: '1',
		_id: '1',
		totalLottery: '时时彩',
		totalPlays: '五星组选组选60',
		totalPersonNumber: '15',
		totalBetNumber: '4',
		totalBetAmount: '325',
		totalBonus: '32101',
		totalProfitAndLoss: '2131.8',
		totalRebate: '325',
		totalRtp: '4.23',
		manipulateId: 'detail-1',
	},
	{
		key: '2',
		_id: '2',
		totalLottery: '北京赛车',
		totalPlays: '龙虎冠军',
		totalPersonNumber: '3',
		totalBetNumber: '2',
		totalBetAmount: '24',
		totalBonus: '9302',
		totalProfitAndLoss: '-103',
		totalRebate: '24',
		totalRtp: '2',
		manipulateId: 'detail-2',
	},
	{
		key: '3',
		_id: '3',
		totalLottery: '福体彩',
		totalPlays: '三星组选组三复式',
		totalPersonNumber: '1',
		totalBetNumber: '0',
		totalBetAmount: '5646',
		totalBonus: '33332',
		totalProfitAndLoss: '234.9',
		totalRebate: '5646',
		totalRtp: '0',
		manipulateId: 'detail-3',
	}
];

class TablePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isShowingTable: false,
		};

		this._handleSubmitForm = this._handleSubmitForm.bind(this);
		this._renderTable = this._renderTable.bind(this);
	}

	_handleSubmitForm(queryDatas) {
		if (queryDatas) {
			this.setState({ isShowingTable: true });
		}
	}

	_renderTable(tableData) {
		const { onNavigate, } = this.props;

		return (
			<PageBlock>
				<HeaderButtonBar
					className="block-header"
					left={<RemindText
						text={
							<div>人数：每天的各个彩种玩法的人数统计<br/>盈亏：投注金额 - 奖金 - 返点</div>
						}/>
					}
					right={<div className="action">
						<a href="#">匯出 Excel</a></div>
					}
				/>
				<Table
					dataSource={tableData}
					columns={[
						{
							title: '彩类',
							dataIndex: 'totalLottery',
							key: 'totalLottery',
							align: 'center',
							sorter: (a,b) => a.totalLottery.length - b.totalLottery.length,
						},
						{
							title: '玩法',
							dataIndex: 'totalPlays',
							key: 'totalPlays',
							align: 'center',
							sorter: (a,b) => a.pltotalPlaysays.length - b.totalPlays.length,
						},
						{
							title: '人数',
							dataIndex: 'totalPersonNumber',
							key: 'totalPersonNumber',
							align: 'center',
							sorter: (a,b) => a.totalPersonNumber - b.totalPersonNumber,
						},
						{
							title: '投注笔数',
							dataIndex: 'totalBetNumber',
							key: 'totalBetNumber',
							align: 'center',
							sorter: (a,b) => a.totalBetNumber - b.totalBetNumber,
						},
						{
							title: '投注金額',
							dataIndex: 'totalBetAmount',
							key: 'totalBetAmount',
							align: 'center',
							sorter: (a,b) => a.totalBetAmount - b.totalBetAmount,
						},
						{
							title: '奖金',
							dataIndex: 'totalBonus',
							key: 'totalBonus',
							align: 'center',
							sorter: (a,b) => a.totalBonus - b.totalBonus,
						},
						{
							title: '盈亏',
							dataIndex: 'totalProfitAndLoss',
							key: 'totalProfitAndLoss',
							align: 'center',
							sorter: (a,b) => a.totalProfitAndLoss - b.totalProfitAndLoss,
						},
						{
							title: '返點',
							dataIndex: 'totalRebate',
							key: 'totalRebate',
							align: 'center',
							sorter: (a,b) => a.totalRebate - b.totalRebate,
						},
						{
							title: 'RTP',
							dataIndex: 'totalRtp',
							key: 'totalRtp',
							align: 'center',
							sorter: (a,b) => a.totalRtp - b.totalRtp,
						},
						{
							title: '操作',
							dataIndex: 'manipulate',
							key: 'manipulate',
							render: (text, record) => {
								return (
									<span style={{ color: '#1890ff', cursor: 'pointer', }} onClick={() => onNavigate(`${COMPANYREPORT_LOTTERY_PLAYS}/${record._id}`)}>详细</span>
								);
							},
						}
					]}
				/>
			</PageBlock>
		);
	}

	render() {
		const { isShowingTable } = this.state;
		const {
			_handleSubmitForm,
			_renderTable,
		} = this;

		return (
			<div className="lottery-plays">
				<QueryForm onHandleSubmit={_handleSubmitForm} />
				{ isShowingTable ? _renderTable(fakeData) : null }
			</div>
		);
	}
}

TablePage.propTypes = propTypes;
TablePage.defaultProps = defaultProps;

export default TablePage;
