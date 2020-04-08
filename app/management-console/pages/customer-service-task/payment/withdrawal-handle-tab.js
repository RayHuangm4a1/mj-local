import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Input,
	DateRangePicker,
	Select,
} from 'ljit-react-components';
import { WithdrawalHandleTable } from '../../../components/table';
import WithdrawalInfoModal from './modal/withdrawal-info';
import { formatDate } from '../../../lib/moment-utils';
// TODO move this componet to shared component
import CommentModal from '../../../components/comments-modal';
import uuid from 'uuid';

const propTypes = {
	dataSource: PropTypes.arrayOf(PropTypes.shape({
		member: PropTypes.string,
		cardId: PropTypes.string,
		name: PropTypes.string,
		bank: PropTypes.string,
		bankBranch: PropTypes.string,
		status: PropTypes.string,
		level: PropTypes.string,
		todayLotteryNet: PropTypes.number,
		todayPersonalNet: PropTypes.number,
		limitAmount: PropTypes.number,
		fee: PropTypes.number,
		bankFee: PropTypes.number,
		feePoint: PropTypes.number,
		confirmAmount: PropTypes.number,
		unconfirmAmount: PropTypes.number,
		betDoneAmount: PropTypes.number,
		betNeededAmount: PropTypes.number,
		registrationAt: PropTypes.string,
		statusTimeline: PropTypes.array,
		comments: PropTypes.arrayOf(PropTypes.shape({
			_id: PropTypes.string,
			createdBy: PropTypes.shape({
				_id: PropTypes.string,
				username: PropTypes.string,
				type: PropTypes.number
			}),
			content: PropTypes.string,
			createAt: PropTypes.string,
			updateAt: PropTypes.string,
		})),
		pinnedCommentIds: PropTypes.arrayOf(PropTypes.string),
		lastComment: PropTypes.shape({
			_id: PropTypes.string,
			createdBy: PropTypes.shape({
				_id: PropTypes.string,
				username: PropTypes.string,
				type: PropTypes.number
			}),
			content: PropTypes.string,
			createAt: PropTypes.string,
		}),
	})),
};
const initialState = {
	isPayInfoModalVisible: false,
	isAddCommentModalVisible: false,
	selectedData: {},
};

class WithdrawalHandleTab extends Component {
	constructor() {
		super();
		this.state = {
			blackList:[],
			dataSource: [],
			...initialState,
		};

		this._handleClickSearch = this._handleClickSearch.bind(this);
		this._handleClickReset = this._handleClickReset.bind(this);
		this._handleClickPayInfo = this._handleClickPayInfo.bind(this);
		this._handleClickAddComment = this._handleClickAddComment.bind(this);
		this._handleSubmitAddComment = this._handleSubmitAddComment.bind(this);
		this._handleSubmitAddPinnedComment = this._handleSubmitAddPinnedComment.bind(this);
		this._handleCancelPinnedComment = this._handleCancelPinnedComment.bind(this);
		this._handleCancel = this._handleCancel.bind(this);
	}

	_handleClickSearch() {
		const form = this.formInstance.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				// Send search api
			}
		});
	}
	_handleClickReset() {
		const form = this.formInstance.getForm();

		form.resetFields();
	}
	_handleClickPayInfo(selectedData) {
		this.setState({
			isPayInfoModalVisible: true,
			selectedData,
		});
	}
	_handleClickAddComment(selectedData) {
		this.setState({
			isAddCommentModalVisible: true,
			selectedData,
		});
	}
	_handleSubmitAddComment(comment) {
		// TODO send add comment api
		const { dataSource, selectedData } = this.state;
		const { content, type, } = comment;
		const newComment = {
			_id: uuid(),
			content,
			createdBy: {
				username: "defaultAuthor",
				type,
			},
			createAt: formatDate(),
		};
		const updatedSelectedData = Object.assign({}, selectedData, {
			comments: [...selectedData.comments, newComment],
		});
		const updateData = dataSource.map(item => {
			if (item._id === selectedData._id) {
				return updatedSelectedData;
			} else {
				return Object.assign({}, item);
			}
		});

		this.setState({
			dataSource: updateData,
			selectedData: updatedSelectedData,
		});
	}
	_handleSubmitAddPinnedComment(comment) {
		// TODO send add Pinned comment api
		const { dataSource, selectedData } = this.state;
		const { pinnedCommentIds } = selectedData;
		const { content, type, } = comment;
		const _id = uuid();
		const newComment = {
			_id,
			content,
			createdBy: {
				username: "defaultAuthor",
				type,
			},
			createAt: formatDate(),
		};
		const updatedSelectedData = Object.assign({}, selectedData, {
			comments: [...selectedData.comments, newComment],
			pinnedCommentIds: [...pinnedCommentIds, _id]
		});
		const updateData = dataSource.map(item => {
			if (item._id === selectedData._id) {
				return updatedSelectedData;
			} else {
				return Object.assign({}, item);
			}
		});

		this.setState({
			dataSource: updateData,
			selectedData: updatedSelectedData,
		});
	}
	_handleCancelPinnedComment(comment) {
		// TODO send remove pinned comment api
		const { dataSource, selectedData } = this.state;
		const { pinnedCommentIds } = selectedData;
		const updatedPinnedCommentIds = pinnedCommentIds.filter(_id => {
			return _id !== comment._id;
		});
		const updatedSelectedData = Object.assign({}, selectedData, {
			pinnedCommentIds: updatedPinnedCommentIds
		});
		const updateData = dataSource.map(item => {
			if (item._id === selectedData._id) {
				return updatedSelectedData;
			} else {
				return Object.assign({}, item);
			}
		});

		this.setState({
			dataSource: updateData,
			selectedData: updatedSelectedData,
		});
	}
	_handleCancel() {
		this.setState(initialState);
	}

	render() {
		const {
			dataSource,
			isPayInfoModalVisible,
			isAddCommentModalVisible,
			selectedData,
		} = this.state;
		const {
			_handleClickSearch,
			_handleClickReset,
			_handleClickPayInfo,
			_handleClickAddComment,
			_handleSubmitAddComment,
			_handleSubmitAddPinnedComment,
			_handleCancelPinnedComment,
			_handleCancel,
		} = this;

		return (
			<React.Fragment>
				<Form
					ref={formRef => this.formInstance = formRef}
					submitText="查询"
					cancelText="重置"
					onSubmit={_handleClickSearch}
					onCancel={_handleClickReset}
				>
					<div style={{ display: 'flex', justifyContent: 'space-between', }}>
						<FormItem
							itemName="cardId"
							label="銀行卡号"
						>
							<Input
								style={{ width: '264px', }}
								placeholder="请输入銀行卡号"
							/>
						</FormItem>
						<FormItem
							itemName="betAt"
							label="下注时间"
						>
							<DateRangePicker style={{ width: '264px', }}/>
						</FormItem>
						<FormItem
							itemName="status"
							label="状态"
						>
							<Select
								style={{ width: '264px', }}
								// TODO get options
								options={[]}
								placeholder="请选择状态"
							/>
						</FormItem>
					</div>
				</Form>
				<WithdrawalHandleTable
					dataSource={dataSource}
					onClickPayInfo={_handleClickPayInfo}
					onClickAddComment={_handleClickAddComment}
					isRemittanceOperationDisabled
					hasPagination
				/>
				<WithdrawalInfoModal
					selectedData={selectedData}
					isVisible={isPayInfoModalVisible}
					modalState={"detail"}
					onCancel={_handleCancel}
				/>
				<CommentModal
					isVisible={isAddCommentModalVisible}
					onCancelCreatingComment={_handleCancel}
					comments={selectedData.comments}
					pinnedCommentIds={selectedData.pinnedCommentIds}
					onCreateComment={_handleSubmitAddComment}
					onCreatePinnedComment={_handleSubmitAddPinnedComment}
					onCancelPinnedComment={_handleCancelPinnedComment}
				/>
			</React.Fragment>
		);
	}
	componentDidMount() {
		// TODO fetch data
		this.setState({
			dataSource: fakeData,
		});
	}
}

WithdrawalHandleTab.propTypes = propTypes;

export default WithdrawalHandleTab;

const TimelineDatas = [
	{
		timeLineTitle: '申請時間：',
		timeLineContent: [
			'2019/02/20 12:03:22 待确认',
		],
	},
	{
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
		timeLineTitle: '代付結果：',
		timeLineContent: [
			'2019/02/20 12:03:22 第三方自動出款成功',
		],
	},
	{
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
const fakeData =  [{
	_id: 1,
	level:'第一層',
	member: 'codtest111',
	cardId: '1231293995955',
	amount: 13000,
	userName: '馬采風',
	bank: '中國浦發銀行',
	bankBranch: '龍崗支行',
	todayLotteryNet: 4255.92,
	todayPersonalNet: 0,
	systemNote: '2019/02/20',
	limitAmount: 14000,
	feePoint: 0,
	fee: 30,
	bankFee: 30,
	status: '已出款',
	betDoneAmount: 300,
	betNeededAmount: 4000,
	confirmAmount: 2000,
	unconfirmAmount: 14500,
	registrationAt: '2019/02/20',
	applyAt: '2019/02/12',
	confirmAt: '2019/02/12',
	administrator: 'aaa12568',
	handleAt: '10:43',
	statusTimeline: TimelineDatas,
	comments: comments,
	pinnedCommentIds: ['1', '2'],
	lastComment: comments[comments.length -1],
},{
	_id: 2,
	level:'第一層',
	member: 'xiaoyu88',
	cardId: '23110493995955',
	amount: 3000,
	userName: '馬采風',
	bank: '中國浦發銀行',
	bankBranch: '龍崗支行',
	todayLotteryNet: 4255.92,
	todayPersonalNet: 0,
	systemNote: '2019/02/20',
	limitAmount: 3000,
	feePoint: 0,
	fee: 30,
	bankFee: 30,
	status: '待第三方出款處理',
	betDoneAmount: 500,
	betNeededAmount: 5000,
	confirmAmount: 3000,
	unconfirmAmount: 4500,
	registrationAt: '2019/02/20',
	applyAt: '2019/02/12',
	confirmAt: '2019/02/12',
	administrator: 'aaa12568',
	handleAt: '11:23',
	statusTimeline: [],
	comments: comments,
	pinnedCommentIds: ['1', '2'],
	lastComment: comments[comments.length -1],
},{
	_id: 3,
	level:'第一層',
	member: 'xiaoyu88',
	cardId: '62331293995955',
	amount: 300000,
	userName: '馬采風',
	bank: '中國浦發銀行',
	bankBranch: '龍崗支行',
	todayLotteryNet: 4255.92,
	todayPersonalNet: 0,
	systemNote: '2019/02/20',
	limitAmount: 3000,
	feePoint: 0,
	fee: 10,
	bankFee: 10,
	status: '待第三方出款處理',
	betDoneAmount: 500,
	betNeededAmount: 5000,
	confirmAmount: 3000,
	unconfirmAmount: 4500,
	registrationAt: '2019/02/20',
	applyAt: '2019/02/12',
	confirmAt: '2019/02/12',
	administrator: 'aaa12568',
	handleAt: '12:23',
	statusTimeline: TimelineDatas,
	comments: comments,
	pinnedCommentIds: ['1', '2'],
	lastComment: comments[comments.length -1],
},{
	_id: 4,
	level:'第一層',
	member: 'xiaoyu88',
	cardId: '64532493995955',
	amount: 150000,
	userName: '馬采風',
	bank: '中國浦發銀行',
	bankBranch: '龍崗支行',
	todayLotteryNet: 4255.92,
	todayPersonalNet: 0,
	systemNote: '2019/02/20',
	limitAmount: 3000,
	feePoint: 0,
	fee: 20,
	bankFee: 20,
	status: '已出款',
	betDoneAmount: 500,
	betNeededAmount: 5000,
	confirmAmount: 3000,
	unconfirmAmount: 4500,
	registrationAt: '2019/02/20',
	applyAt: '2019/02/12',
	confirmAt: '2019/02/12',
	administrator: 'caa12568',
	handleAt: '12:33',
	statusTimeline: TimelineDatas,
	comments: comments,
	pinnedCommentIds: ['1', '2'],
	lastComment: comments[comments.length -1],
},{
	_id: 5,
	level:'第一層',
	member: 'xiaoyu88',
	cardId: '90383193995955',
	amount: 3000,
	userName: '馬采風',
	bank: '中國浦發銀行',
	bankBranch: '龍崗支行',
	todayLotteryNet: 4255.92,
	todayPersonalNet: 0,
	systemNote: '2019/02/20',
	limitAmount: 3000,
	feePoint: 0,
	fee: 30,
	bankFee: 30,
	status: '待第三方出款處理',
	betDoneAmount: 500,
	betNeededAmount: 5000,
	confirmAmount: 3000,
	unconfirmAmount: 4500,
	host: 'system_admin',
	registrationAt: '2019/02/20',
	applyAt: '2019/02/12',
	confirmAt: '2019/02/12',
	administrator: 'bba12568',
	handleAt: '12:43',
	statusTimeline: TimelineDatas,
	comments: comments,
	pinnedCommentIds: ['1', '2'],
	lastComment: comments[comments.length -1],
},];
