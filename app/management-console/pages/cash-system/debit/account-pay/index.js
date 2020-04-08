//TODO update UI
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Card,
	Statistic,
	Button,
	Row,
	Col,
	Icon,
} from 'ljit-react-components';
import AccountPaySearchForm from './account-pay-searchform';
import AccountPayModal from './account-pay-modal';
import PageBlock from '../../../../components/page-block';
import { WithdrawalHandleTable } from '../../../../components/table';
import { DebitAccountPayStatusEnums } from '../../../../lib/enums';
import { ModalStateEnums, } from './utils';

const { LARGE, } = Statistic.SizeTypeEnums;
const {
	IconTypeEnums,
	ColorEnums,
} = Icon;
const {
	MANUAL,
	AUTO,
	DETAIL,
	REJECT,
} = ModalStateEnums;

const propTypes = {};
const defaultProps = {};

const { StatusEnums } = AccountPaySearchForm;
const {
	CONFIRM,
	THIRD_PART_UNCONFIRM,
} = DebitAccountPayStatusEnums;

class CashSystemDebitAccountPayPage extends Component {
	constructor() {
		super();

		this.state = {
			accountPayList: AccountPayList,
			StatisticDatas: StatisticDatas,
			modalState: DETAIL,
			isModalVisible: false,
			isNoteModalVisible: false,
			note: '',
			recordDetail: {
				member: '',
				account: '',
				bankAccount: '',
				userName: '',
				bank: '',
				bankBranch: '',
				status: '',
				level: '',
				todayLotteryNet: null,
				todayPersonalNet: null,
				systemNote: '',
				amount: null,
				fee: null,
				bankFee: null,
				debitSource: '',
				limitAmount: null,
				dama: null,
				confirmAmount: null,
				unconfirmAmount: null,
				betDoneAmount: null,
				betNeededAmount: null,
				registrationAt: '',
				customerServiceNote: '',
				financialNote: '',
				statusTimeline: [],
				forbidAutoPayReasons: [],
				ancestors: [],
				administrator: '',
				applyAt: '',
				confirmAt: '',
				note: '',
			},
		};

		this._showModal = this._showModal.bind(this);
		this._handleSearchClick = this._handleSearchClick.bind(this);
		this._handleDetailModalCancel = this._handleDetailModalCancel.bind(this);
		this._handleDetailModalSubmit = this._handleDetailModalSubmit.bind(this);
	}

	_handleSearchClick(data) {
		//TODO search api
	}
	_handleDetailModalCancel() {
		const { isModalVisible, } = this.state;

		this.setState({ isModalVisible: !isModalVisible, });
	}
	_handleDetailModalSubmit() {
		// TODO pay action api
		this.setState({ isModalVisible: false, });
	}
	_showModal(record, modalState = '') {
		this.setState({
			isModalVisible: true,
			modalState,
			recordDetail: {
				member: record.member,
				account: record.account,
				bankAccount: record.bankAccount,
				userName: record.userName,
				bank: record.bank,
				bankBranch: record.bankBranch,
				status: getStateText(record.status),
				level: record.level,
				todayLotteryNet: record.todayLotteryNet,
				todayPersonalNet: record.todayPersonalNet,
				systemNote: record.systemNote,
				amount: record.amount,
				fee: record.fee,
				bankFee: record.bankFee,
				debitSource: '',
				limitAmount: record.limitAmount,
				dama: record.dama,
				confirmAmount: record.confirmAmount,
				unconfirmAmount: record.unconfirmAmount,
				betDoneAmount: record.betDoneAmount,
				betNeededAmount: record.betNeededAmount,
				registrationAt: record.registrationAt,
				customerServiceNote: record.customerServiceNote,
				financialNote: record.financialNote,
				statusTimeline: record.statusTimeline,
				ancestors: record.ancestors,
				administrator: record.administrator,
				applyAt: record.applyAt,
				confirmAt: record.confirmAt,
				forbidAutoPayReasons: record.forbidAutoPayReasons,
				note: record.note,
			}
		});
	}

	render() {
		const {
			isModalVisible,
			recordDetail,
			modalState,
			StatisticDatas,
		} = this.state;
		const {
			_handleDetailModalSubmit,
			_handleDetailModalCancel
		} = this;

		return (
			<div>
				<PageBlock>
					<AccountPayModal
						record={recordDetail}
						isVisible={isModalVisible}
						modalState={modalState}
						onSubmit={_handleDetailModalSubmit}
						onCancel={_handleDetailModalCancel}
						timelineDatas={TimelineDatas}
					/>
					<AccountPaySearchForm onSearch={this._handleSearchClick} />
					<Row className="account-pay__statistics_padding" type="flex" justify="space-between" gutter={10}>
						<Col span={6} >
							<Card className="account-pay__card_shadow">
								<Statistic
									title="本页取款金额总计"
									value={StatisticDatas.amount}
									sizeType={LARGE}
									prefix={(
										<Icon
											type={IconTypeEnums.PAYCIRCLE_FILL}
											color={ColorEnums.PRIMARY}
										/>
									)}
								/>
							</Card>
						</Col >
						<Col span={6} >
							<Card className="account-pay__card_shadow">
								<Statistic
									title="本页手续费总计"
									value={StatisticDatas.fee}
									sizeType={LARGE}
									prefix={(
										<Icon
											type={IconTypeEnums.PAYCIRCLE_FILL}
											color={ColorEnums.PRIMARY}
										/>
									)}
								/>
							</Card>
						</Col>
						<Col span={6} >
							<Card className="account-pay__card_shadow">
								<Statistic
									title="本页银行手续费总计"
									value={StatisticDatas.bankFee}
									sizeType={LARGE}
									prefix={(
										<Icon
											type={IconTypeEnums.PAYCIRCLE_FILL}
											color={ColorEnums.PRIMARY}
										/>
									)}
								/>
							</Card>
						</Col>
					</Row>
					<div style={{ textAlign: 'right', padding: '12px', }}>
						<Button outline={Button.OutlineEnums.TEXT} color={Button.ColorEnums.BRIGHTBLUE500}>汇出 Excel</Button>
					</div>
					<WithdrawalHandleTable
						className="account-pay-table"
						dataSource={AccountPayList}
						hasPagination
						onClickPayInfo={(record) => this._showModal(record, DETAIL)}
						onClickAutoRemittance={(record) => this._showModal(record, AUTO)}
						onClickManualRemittance={(record) => this._showModal(record, MANUAL)}
						onClickRejectHandle={(record) => this._showModal(record, REJECT)}
					/>
				</PageBlock>
			</div>
		);
	}
}

CashSystemDebitAccountPayPage.propTypes = propTypes;
CashSystemDebitAccountPayPage.defaultProps = defaultProps;

export default CashSystemDebitAccountPayPage;

function getStateText(state = '') {
	switch (state) {
		case StatusEnums.UNCONFIRM:
			return '待确认';
		case StatusEnums.CONFIRM:
			return '已出款';
		case StatusEnums.CANCEL:
			return '取消';
		case StatusEnums.FAIL:
			return '自动出款失败/代付公司出款失败';
		case StatusEnums.PROCESS:
			return '自动出款结果未知/代付公司出款处理中';
		case StatusEnums.THIRD_PART_UNCONFIRM:
			return '待第三方出款处理';
		case StatusEnums.THIRD_PART_PAY_FAIL:
			return '第三方出款失败';
		default:
			return '';
	}
}

const StatisticDatas = {
	amount: 58000,
	fee: 0,
	bankFee: 3800,
};

const TimelineDatas = [
	{
		dataIndex: 'applyAt',
		timeLineTitle: '申請時間：',
		timeLineContent: [
			'2019/02/20 12:03:22 待确认',
		],
	},
	{
		dataIndex: 'detail',
		timeLineTitle: '操作详请：',
		timeLineContent: [
			'2019/02/20 12:03:22 第三方自動出款 (aaa123123)',
			'2019/02/20 12:03:22 已鎖定',
			'2019/02/20 12:03:22 第三方自動出款 (aaa123123)',
			'2019/02/20 12:03:22 已鎖定',
			'2019/02/20 12:03:22 第三方自動出款 (aaa123123)',
			'2019/02/20 12:03:22 已鎖定',
			'2019/02/20 12:03:22 第三方自動出款 (aaa123123)',
		],
	},
	{
		dataIndex: 'result',
		timeLineTitle: '代付結果：',
		timeLineContent: [
			'2019/02/20 12:03:22 第三方自動出款成功',
		],
	},
	{
		dataIndex: 'handleAt',
		timeLineTitle: '处理时间：',
		timeLineContent: [
			'05:00 (aaa123123)',
		],
	},
];
const comments = [
	{
		_id: '0',
		createdBy: {
			_id: '0',
			username: 'Admin',
			type: 5
		},
		content: '态度很好',
		createAt: '2019/06/03 12:03:22',
		updateAt: '2019/06/03 12:03:22',
	},
	{
		_id: '1',
		createdBy: {
			_id: '1',
			username: 'Admin',
			type: 5
		},
		content: '态度不佳',
		createAt: '2019/06/03 12:03:23',
		updateAt: '2019/06/03 12:03:23',
	},
	{
		_id: '2',
		createdBy: {
			_id: '2',
			username: 'Admin',
			type: 4
		},
		content: '这位会员信用有问题',
		createAt: '2019/06/03 12:03:24',
		updateAt: '2019/06/03 12:03:24',
	},
	{
		_id: '3',
		createdBy: {
			_id: '3',
			username: 'Admin',
			type: 4
		},
		content: '这位会员信用超級好',
		createAt: '2019/06/03 12:03:25',
		updateAt: '2019/06/03 12:03:25',
	},
];
const AccountPayList =  [{
	_id: 1,
	level:'第一层',
	member: 'codtest111',
	cardId: '1231293995955',
	amount: 13000,
	userName: '馬采風',
	bank: '中國浦發銀行',
	bankBranch: '龍崗支行',
	todayLotteryNet: 4255.92,
	todayPersonalNet: 0,
	systemNote: '2019-02-20T06:23:58.000Z',
	limitAmount: 14000,
	dama: 500,
	fee: 30,
	bankFee: 30,
	status: CONFIRM,
	betDoneAmount: 300,
	betNeededAmount: 4000,
	confirmAmount: 2000,
	unconfirmAmount: 14500,
	registrationAt: '2019-02-20T06:23:58.000Z',
	applyAt: '2019-12-23T04:23:07.000Z',
	confirmAt: '2019-12-23T04:23:07.000Z',
	administrator: 'aaa12568',
	handleAt: '10:43',
	statusTimeline: TimelineDatas,
	comments: comments,
	pinnedCommentIds: ['1', '2'],
	lastComment: comments[comments.length -1],
	forbidAutoPayReasons: [ '第一次出款', '警示帐号', '未打码量', '注册未满天数', '银行黑名单', ],
	ancestors: [
		{ 'id': 3, 'username': 'codtest000' },
		{ 'id': 1, 'username': 'codtest001' },
		{ 'id': 6, 'username': 'codtest002' },
	],
	note: '',
},{
	_id: 2,
	level:'第一层',
	member: 'xiaoyu88',
	cardId: '23110493995955',
	amount: 3000,
	userName: '馬采風',
	bank: '中國浦發銀行',
	bankBranch: '龍崗支行',
	todayLotteryNet: 4255.92,
	todayPersonalNet: 0,
	systemNote: '2019-02-20T06:23:58.000Z',
	limitAmount: 3000,
	dama: 500,
	fee: 30,
	bankFee: 30,
	status: THIRD_PART_UNCONFIRM,
	betDoneAmount: 500,
	betNeededAmount: 5000,
	confirmAmount: 3000,
	unconfirmAmount: 4500,
	registrationAt: '2019-02-20T06:23:58.000Z',
	applyAt: '2019-12-23T04:23:07.000Z',
	confirmAt: '',
	administrator: 'aaa12568',
	handleAt: '11:23',
	statusTimeline: [],
	comments: comments,
	pinnedCommentIds: ['1', '2'],
	lastComment: comments[comments.length -1],
	forbidAutoPayReasons: [ '第一次出款', ],
	ancestors: [
		{ 'id': 3, 'username': 'codtest000' },
		{ 'id': 1, 'username': 'codtest001' },
		{ 'id': 6, 'username': 'codtest002' },
	],
	note: '2019/3/13 6217003810010317368與正確卡號：6217003810080317368合併（已移除黑名單- 客 bonnie0914',
	debitSource: '',
},{
	_id: 3,
	level:'第一层',
	member: 'xiaoyu88',
	cardId: '62331293995955',
	amount: 300000,
	userName: '馬采風',
	bank: '中國浦發銀行',
	bankBranch: '龍崗支行',
	todayLotteryNet: 4255.92,
	todayPersonalNet: 0,
	systemNote: '2019-02-20T06:23:58.000Z',
	limitAmount: 3000,
	dama: 500,
	fee: 10,
	bankFee: 10,
	status: CONFIRM,
	betDoneAmount: 500,
	betNeededAmount: 5000,
	confirmAmount: 3000,
	unconfirmAmount: 4500,
	registrationAt: '2019-02-20T06:23:58.000Z',
	applyAt: '2019-12-23T04:23:07.000Z',
	confirmAt: '2019-12-23T04:23:07.000Z',
	administrator: 'aaa12568',
	handleAt: '12:23',
	statusTimeline: TimelineDatas,
	comments: comments,
	pinnedCommentIds: ['1', '2'],
	lastComment: comments[comments.length -1],
	forbidAutoPayReasons: [ '未打码量', '注册未满天数', ],
	ancestors: [
		{ 'id': 3, 'username': 'codtest000' },
		{ 'id': 1, 'username': 'codtest001' },
		{ 'id': 6, 'username': 'codtest002' },
	],
	note: '',
},{
	_id: 4,
	level:'第一层',
	member: 'xiaoyu88',
	cardId: '64532493995955',
	amount: 150000,
	userName: '馬采風',
	bank: '中國浦發銀行',
	bankBranch: '龍崗支行',
	todayLotteryNet: 4255.92,
	todayPersonalNet: 0,
	systemNote: '2019-02-20T06:23:58.000Z',
	limitAmount: 3000,
	dama: 500,
	fee: 20,
	bankFee: 20,
	status: CONFIRM,
	betDoneAmount: 500,
	betNeededAmount: 5000,
	confirmAmount: 3000,
	unconfirmAmount: 4500,
	registrationAt: '2019-02-20T06:23:58.000Z',
	applyAt: '2019-12-23T04:23:07.000Z',
	confirmAt: '2019-12-23T04:23:07.000Z',
	administrator: 'caa12568',
	handleAt: '12:33',
	statusTimeline: TimelineDatas,
	comments: comments,
	pinnedCommentIds: ['1', '2'],
	lastComment: comments[comments.length -1],
	forbidAutoPayReasons: [ '第一次出款', '警示帐号', '未打码量', '注册未满天数', '银行黑名单', ],
	ancestors: [
		{ 'id': 3, 'username': 'codtest000' },
		{ 'id': 1, 'username': 'codtest001' },
		{ 'id': 6, 'username': 'codtest002' },
	],
	note: '',
},{
	_id: 5,
	level:'第一层',
	member: 'xiaoyu88',
	cardId: '90383193995955',
	amount: 3000,
	userName: '馬采風',
	bank: '中國浦發銀行',
	bankBranch: '龍崗支行',
	todayLotteryNet: 4255.92,
	todayPersonalNet: 0,
	systemNote: '2019-02-20T06:23:58.000Z',
	limitAmount: 3000,
	dama: 500,
	fee: 30,
	bankFee: 30,
	status: CONFIRM,
	betDoneAmount: 500,
	betNeededAmount: 5000,
	confirmAmount: 3000,
	unconfirmAmount: 4500,
	host: 'system_admin',
	registrationAt: '2019-02-20T06:23:58.000Z',
	applyAt: '2019-12-23T04:23:07.000Z',
	confirmAt: '',
	administrator: 'bba12568',
	handleAt: '12:43',
	statusTimeline: TimelineDatas,
	comments: comments,
	pinnedCommentIds: ['1', '2'],
	lastComment: comments[comments.length -1],
	forbidAutoPayReasons: [ '第一次出款', '警示帐号', '未打码量', '注册未满天数', '银行黑名单', ],
	ancestors: [
		{ 'id': 3, 'username': 'codtest000' },
		{ 'id': 1, 'username': 'codtest001' },
		{ 'id': 6, 'username': 'codtest002' },
	],
	note: '',
},];
