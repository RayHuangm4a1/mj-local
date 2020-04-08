import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Input,
	DateRangePicker,
} from 'ljit-react-components';
import { connect, } from 'ljit-store-connecter';
import {
	notifyHandlingActions,
} from '../../../controller';
import PageModal from '../../../components/page-modal';
import { notifications, } from '../../../../lib/notify-handler';
import { formatDate } from '../../../lib/moment-utils';
import { CardIdManagementTable, } from '../../../components/table';
import CardIdManagementEditModal from './modal/card-id-management-edit';

const {
	notifyHandlingAction,
} = notifyHandlingActions;
const {
	errorNotifications,
} = notifications;
const {
	GeneralError,
} = errorNotifications;

const { Message, } = PageModal;
const ActionTypes = {
	DELETE: 'delete',
	MOVE_IN_BLACK_LIST: 'moveInBlackList',
	MOVE_OUT_BLACK_LIST: 'moveOutBlackList',
};
const {
	DELETE,
	MOVE_IN_BLACK_LIST,
	MOVE_OUT_BLACK_LIST,
} = ActionTypes;
const ActionConfirmMessage = {
	[DELETE]: '确定刪除？',
	[MOVE_IN_BLACK_LIST]: '确定移入黑名單？',
	[MOVE_OUT_BLACK_LIST]: '确定移出黑名單？',
};

const propTypes = {
	dataSource: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string,
		bank: PropTypes.string,
		cardId: PropTypes.string,
		bindedAt: PropTypes.string,
		confirmAccount: PropTypes.string,
	})),
	blackList: PropTypes.arrayOf(PropTypes.string),
	notifyHandlingAction: PropTypes.func.isRequired,
};
const initialState = {
	isEditingModalVisible: false,
	isConfirmModalVisible: false,
	selectedData: {},
};

class CardIdManagementTab extends Component {
	constructor() {
		super();
		this.state = {
			blackList:[],
			dataSource: [],
			actionType: null,
			...initialState
		};

		this._handleClickSearch = this._handleClickSearch.bind(this);
		this._handleClickReset = this._handleClickReset.bind(this);
		this._handleClickEdit = this._handleClickEdit.bind(this);
		this._handleClickDelete = this._handleClickDelete.bind(this);
		this._handleClickMoveInBlackList = this._handleClickMoveInBlackList.bind(this);
		this._handleClickMoveOutBlackList = this._handleClickMoveOutBlackList.bind(this);
		this._handleSubmitEdit = this._handleSubmitEdit.bind(this);
		this._handleSubmitDelete = this._handleSubmitDelete.bind(this);
		this._handleSubmitAddBlackListItem = this._handleSubmitAddBlackListItem.bind(this);
		this._handleSubmitRemoveBlackListItem = this._handleSubmitRemoveBlackListItem.bind(this);
		this._handleCancel = this._handleCancel.bind(this);

		this.ConfirmMethodsMap = {
			[DELETE]: this._handleSubmitDelete,
			[MOVE_IN_BLACK_LIST]: this._handleSubmitAddBlackListItem,
			[MOVE_OUT_BLACK_LIST]: this._handleSubmitRemoveBlackListItem,
		};
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

	_handleClickEdit(selectedData) {
		this.setState({
			selectedData,
			isEditingModalVisible: true,
		});
	}
	_handleClickDelete(selectedData) {
		this.setState({
			selectedData,
			isConfirmModalVisible: true,
			actionType: DELETE,
		});
	}
	_handleClickMoveInBlackList(selectedData) {
		this.setState({
			selectedData,
			isConfirmModalVisible: true,
			actionType: MOVE_IN_BLACK_LIST,
		});
	}
	_handleClickMoveOutBlackList(selectedData) {
		this.setState({
			selectedData,
			isConfirmModalVisible: true,
			actionType: MOVE_OUT_BLACK_LIST,
		});
	}
	_handleSubmitEdit(data = {}) {
		const { notifyHandlingAction, } = this.props;
		const { blackList, dataSource, selectedData } = this.state;
		const { username, bank, cardId, } = data;
		const { _id } = selectedData;
		// TODO check if selectedData in black list
		const isCardIdInBlackList = blackList.indexOf(cardId) !== -1;
		const cardIdList = dataSource
			.filter(item => (item._id !== _id))
			.map(item => item.cardId);
		const isCardIdExist = cardIdList.indexOf(cardId) !== -1;

		if (isCardIdExist) {
			notifyHandlingAction(new GeneralError('银行卡号已存在'));
		} else {
			if (isCardIdInBlackList) {
				notifyHandlingAction(new GeneralError('修改失败！新卡号不能为黑名单！'));
				this.setState(initialState);
			} else {
				// TODO send edit api
				const updatedDataSource = dataSource.map(item => {
					if (item._id === _id) {
						return Object.assign({}, item, {
							username,
							bank,
							cardId,
							bindedAt: formatDate(new Date(), 'YYYY/MM/DD HH:mm'),
						});
					} else {
						return Object.assign({}, item);
					}
				});

				this.setState({
					dataSource: updatedDataSource,
					...initialState,
				});
			}
		}
	}
	_handleSubmitDelete() {
		// TODO send delete api
		const { dataSource, selectedData } = this.state;
		const { _id } = selectedData;
		const updatedDataSource = dataSource.filter(item => item._id !== _id);

		this.setState({
			dataSource: updatedDataSource,
			...initialState,
		});
	}
	_handleSubmitAddBlackListItem() {
		// TODO send add black list api
		const { blackList, selectedData, } = this.state;
		const { cardId } = selectedData;
		const updatedBlackList = [...blackList, cardId];

		this.setState({
			blackList: updatedBlackList,
			isConfirmModalVisible: false,
		});
	}
	_handleSubmitRemoveBlackListItem() {
		// TODO send remove black list api
		const { blackList, selectedData, } = this.state;
		const { cardId } = selectedData;
		const updatedBlackList = blackList.filter(value => value !== cardId);

		this.setState({
			blackList: updatedBlackList,
			isConfirmModalVisible: false,
		});
	}
	_handleCancel() {
		this.setState(initialState);
	}

	render() {
		const {
			dataSource,
			isEditingModalVisible,
			isConfirmModalVisible,
			selectedData,
			blackList,
			actionType,
		} = this.state;
		const {
			_handleClickSearch,
			_handleClickReset,
			_handleClickEdit,
			_handleClickDelete,
			_handleClickMoveInBlackList,
			_handleClickMoveOutBlackList,
			_handleSubmitEdit,
			_handleCancel,
			ConfirmMethodsMap,
		} = this;

		return (
			<React.Fragment>
				<Form
					ref={formRef => this.formInstance = formRef}
					onSubmit={_handleClickSearch}
					onCancel={_handleClickReset}
					submitText="查询"
					cancelText="重置"
				>
					<div style={{ display: 'flex', justifyContent: 'space-between', }}>
						<FormItem
							itemName="username"
							label="姓名"
						>
							<Input placeholder="请输入姓名" style={{ width: '264px' }}/>
						</FormItem>
						<FormItem
							itemName="cardId"
							label="卡号"
						>
							<Input placeholder="请输入卡号" style={{ width: '264px', }}/>
						</FormItem>
						<FormItem
							itemName="bindedAt"
							label="綁定时间"
						>
							<DateRangePicker style={{ width: '264px', }}/>
						</FormItem>
					</div>
				</Form>
				<CardIdManagementTable
					dataSource={dataSource}
					blackList={blackList}
					onClickEdit={_handleClickEdit}
					onClickDelete={_handleClickDelete}
					onClickMoveInBlackList={_handleClickMoveInBlackList}
					onClickMoveOutBlackList={_handleClickMoveOutBlackList}
					hasPagination
				/>
				<CardIdManagementEditModal
					selectedData={selectedData}
					isVisible={isEditingModalVisible}
					onSubmit={_handleSubmitEdit}
					onCancel={_handleCancel}
				/>
				<Message
					title="提示"
					visible={isConfirmModalVisible}
					message={ActionConfirmMessage[actionType]}
					onClickOk={ConfirmMethodsMap[actionType]}
					onClickCancel={_handleCancel}
				/>
			</React.Fragment>
		);
	}
	componentDidMount() {
		// TODO fetch data
		this.setState({
			dataSource: fakeData,
			blackList: fakeBlackList,
		});
	}
}

CardIdManagementTab.propTypes = propTypes;

function mapStateToProps(state) {
	// TODO add data
	return {

	};
}
function mapDispatchToProps(dispatch) {
	// TODO add action
	return {
		notifyHandlingAction: (notification) => dispatch(notifyHandlingAction(notification)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CardIdManagementTab);

const fakeData = [
	{
		_id: 1,
		username: undefined,
		bank:'中国农业银行',
		cardId:'12345667389',
		bindedAt:'2019/02/20 14:22',
	},
	{
		_id: 2,
		username:'Tom',
		bank:'花旗银行',
		cardId:'12345667889',
		bindedAt:'2019/02/20 15:52',
	},
	{
		_id: 3,
		username:'Tom',
		bank:'中国银行',
		cardId:'12345267889',
		bindedAt:'2019/02/20 14:12',
	},
	{
		_id: 4,
		username:'Tom',
		bank:'中国农业银行',
		cardId:'12341967889',
		bindedAt:'2019/02/20 14:52',
	},
];

const fakeBlackList = ['12345667389', '12345678910'];
