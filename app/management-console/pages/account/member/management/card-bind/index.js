import React, { useState, useEffect, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'ljit-store-connecter';
import { userBankCardsActions, notifyHandlingActions, } from '../../../../../controller';
import { notifications, } from '../../../../../../lib/notify-handler';
import { Button, HeaderButtonBar, } from 'ljit-react-components';
import PageModal from '../../../../../components/page-modal';
import PageBlock from '../../../../../components/page-block';
import BankCardFormModal from './bank-card-form-modal';
import { CardIdManagementTable, } from '../../../../../components/table';
import { UserBankCardsDataPropTypes, } from '../../../../../lib/prop-types-utils';
import { LoadingStatusEnum } from '../../../../../lib/enums';
import { usePrevious, } from '../../../../../lib/react-utils';
import './style.styl';

const { NONE, LOADING, SUCCESS, FAILED, } = LoadingStatusEnum;
const { notifyHandlingAction, } = notifyHandlingActions;
const {
	fetchUserBankCardsAction,
	createUserBankCardAction,
	deleteUserBankCardAction,
	enableUserBankCardWithdrawableAction,
	updateUserBankCardNumberAction,
	enableUserBankCardAction,
	disableUserBankCardAction,
} = userBankCardsActions;
const { Message, } = PageModal;
const {
	successNotifications,
} = notifications;
const {
	Success,
} = successNotifications;
const propTypes = {
	userBankCardsData: UserBankCardsDataPropTypes,
	userProfileData: PropTypes.object,
	notifyHandlingAction: PropTypes.func.isRequired,
	fetchUserBankCardsAction: PropTypes.func.isRequired,
	createUserBankCardAction: PropTypes.func.isRequired,
	deleteUserBankCardAction: PropTypes.func.isRequired,
	enableUserBankCardWithdrawableAction: PropTypes.func.isRequired,
	updateUserBankCardNumberAction: PropTypes.func.isRequired,
	enableUserBankCardAction: PropTypes.func.isRequired,
	disableUserBankCardAction: PropTypes.func.isRequired,
	createBankCardLoadingStatus: PropTypes.oneOf([ NONE, LOADING, SUCCESS, FAILED, ]).isRequired,
	deleteBankCardLoadingStatus: PropTypes.oneOf([ NONE, LOADING, SUCCESS, FAILED, ]).isRequired,
	updateBankCardLoadingStatus: PropTypes.oneOf([ NONE, LOADING, SUCCESS, FAILED, ]).isRequired,
};
const defaultProps = {
	userProfileData: {},
	userBankCardsData: [],
};

function AccountMemberManagementCardBindPage({
	userBankCardsData,
	userProfileData,
	notifyHandlingAction,
	fetchUserBankCardsAction,
	createUserBankCardAction,
	deleteUserBankCardAction,
	enableUserBankCardWithdrawableAction,
	updateUserBankCardNumberAction,
	enableUserBankCardAction,
	disableUserBankCardAction,
	createBankCardLoadingStatus,
	deleteBankCardLoadingStatus,
	updateBankCardLoadingStatus,
}) {
	const [rowData, setRowData,] = useState({});
	const [idEditingModal, setIsEditingModal, ] = useState(false);
	const [isFormModalVisible, setIsFormModalVisible, ] = useState(false);
	const [isEnableWithdrawableConfirmMessageVisible, setIsEnableWithdrawableConfirmMessageVisible] = useState(false);
	const [isDisableConfirmMessageVisible, setIsDisableConfirmMessageVisible] = useState(false);
	const [isDeleteConfirmModalVisible, setIsDeleteConfirmModalVisible] = useState(false);
	const [isEnable, setIsEnable] = useState(false);
	const { payer, id: userId, } = userProfileData;
	const prevCreateBankCardLoadingStatus = usePrevious(createBankCardLoadingStatus);
	const prevUpdateBankCardLoadingStatus = usePrevious(updateBankCardLoadingStatus);
	const prevDeleteBankCardLoadingStatus = usePrevious(deleteBankCardLoadingStatus);

	useEffect(() => {
		fetchUserBankCardsAction(userId);
	}, [userId]);

	useEffect(() => {
		if (isFormModalVisible
			&& createBankCardLoadingStatus === SUCCESS
			&& prevCreateBankCardLoadingStatus === LOADING) {
			setIsFormModalVisible(false);
			notifyHandlingAction(new Success('新增银行卡成功'));
		}
	}, [createBankCardLoadingStatus]);

	useEffect(() => {
		if (isFormModalVisible
			&& updateBankCardLoadingStatus === SUCCESS
			&& prevUpdateBankCardLoadingStatus === LOADING) {
			setIsFormModalVisible(false);
			notifyHandlingAction(new Success('修改银行卡成功'));
		}
	}, [updateBankCardLoadingStatus]);

	useEffect(() => {
		if (isDeleteConfirmModalVisible
			&& deleteBankCardLoadingStatus === SUCCESS
			&& prevDeleteBankCardLoadingStatus === LOADING) {
			setIsDeleteConfirmModalVisible(false);
			notifyHandlingAction(new Success('成功删除银行卡'));
		}
	}, [deleteBankCardLoadingStatus]);

	function _handleClickCreateBankCard() {
		setRowData({});
		setIsEditingModal(false);
		setIsFormModalVisible(true);
	}
	function _handleClickEditBankCard(record) {
		setRowData(record);
		setIsEditingModal(true);
		setIsFormModalVisible(true);
	}
	function _handleClickDeleteBankCard(record) {
		setRowData(record);
		setIsDeleteConfirmModalVisible(true);
	}
	function _handleSubmitCreate(data) {
		const { number, } = data;

		createUserBankCardAction(userId, number,);
	}
	function _handleSubmitEdit(data) {
		const { number, } = data;
		const { id: cardId, } = rowData;

		updateUserBankCardNumberAction(userId, cardId, number);
	}
	function _handleClickMoveInBlackList(record) {
		setRowData(record);
		setIsDisableConfirmMessageVisible(true);
		setIsEnable(false);
	}
	function _handleClickMoveOutBlackList(record) {
		setRowData(record);
		setIsDisableConfirmMessageVisible(true);
		setIsEnable(true);
	}
	function _handleDelete() {
		const bankCardId = rowData.id;

		deleteUserBankCardAction(userId, bankCardId);
	}
	function _handleEnableUserBankCardWithdrawable(record) {
		setRowData(record);
		setIsEnableWithdrawableConfirmMessageVisible(true);
	}
	function _handleSubmitEnableUserBankCardWithdrawable() {
		const { id: bankCardId, } = rowData;

		enableUserBankCardWithdrawableAction(userId, bankCardId);
		setIsEnableWithdrawableConfirmMessageVisible(false);
	}
	function _handleConfirmIsDisableMessage() {
		const { id: bankCardId, } = rowData;

		if (isEnable) {
			enableUserBankCardAction(userId, bankCardId);
		} else {
			disableUserBankCardAction(userId, bankCardId);
		}
		setIsDisableConfirmMessageVisible(false);
	}
	function _handleChangeTable(pagination, filters, sorter) {
		let { columnKey = '', order = '' } = sorter;

		order = order.replace('end', '');
		fetchUserBankCardsAction(userId, {
			sort: columnKey,
			order,
		});
	}

	return (
		<div className="member-cardbind-page">
			<HeaderButtonBar
				left={
					<PageBlock.Title text="银行卡绑定" />
				}
				right={
					<Button
						onClick={_handleClickCreateBankCard}
						color={Button.ColorEnums.BRIGHTBLUE500}
					>
						新增银行卡
					</Button>
				}
			/>
			<CardIdManagementTable
				className="member-cardbind-page__table"
				bankCards={userBankCardsData}
				onClickEdit={_handleClickEditBankCard}
				onClickDelete={_handleClickDeleteBankCard}
				onClickEnableUserBankCardWithdrawable={_handleEnableUserBankCardWithdrawable}
				onClickMoveInBlackList={_handleClickMoveInBlackList}
				onClickMoveOutBlackList={_handleClickMoveOutBlackList}
				onTableChange={_handleChangeTable}
			/>
			<BankCardFormModal
				className="member-cardbind-page__form-modal"
				title={idEditingModal ? "修改" : "新增银行卡"}
				isVisible={isFormModalVisible}
				payer={payer}
				number={idEditingModal ? rowData.number : null}
				onCancel={() => setIsFormModalVisible(false)}
				onSubmit={idEditingModal ? _handleSubmitEdit : _handleSubmitCreate}
			/>
			<Message
				visible={isEnableWithdrawableConfirmMessageVisible}
				title="确认提示"
				message="确定解除可提现时间限制？"
				onClickOk={_handleSubmitEnableUserBankCardWithdrawable}
				onClickCancel={() => setIsEnableWithdrawableConfirmMessageVisible(false)}
			/>
			<Message
				visible={isDisableConfirmMessageVisible}
				title="确认提示"
				message={`确定移${isEnable ? "出" : "入"}黑名单？`}
				onClickOk={_handleConfirmIsDisableMessage}
				onClickCancel={() => setIsDisableConfirmMessageVisible(false)}
			/>
			<Message
				title="提示"
				visible={isDeleteConfirmModalVisible}
				message="确定删除？"
				onClickOk={_handleDelete}
				onClickCancel={() => setIsDeleteConfirmModalVisible(false)}
			/>
		</div>
	);
}

AccountMemberManagementCardBindPage.propTypes = propTypes;
AccountMemberManagementCardBindPage.defaultProps = defaultProps;

function mapStateToProps(state) {
	const userBankCards = state.userData.bankCards;

	return {
		userBankCardsData: userBankCards.get('data').toArray(),
		userProfileData: state.userData.profile.get('data').toObject(),
		createBankCardLoadingStatus: userBankCards.get('createBankCardLoadingStatus'),
		deleteBankCardLoadingStatus: userBankCards.get('deleteBankCardLoadingStatus'),
		updateBankCardLoadingStatus: userBankCards.get('updateBankCardLoadingStatus'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		notifyHandlingAction: (notification) => dispatch(notifyHandlingAction(notification)),
		fetchUserBankCardsAction: (userId, queries) => dispatch(fetchUserBankCardsAction(userId, queries)),
		createUserBankCardAction: (userId, number) => dispatch(createUserBankCardAction(userId, number)),
		deleteUserBankCardAction: (userId, bankCardId) => dispatch(deleteUserBankCardAction(userId, bankCardId)),
		enableUserBankCardWithdrawableAction: (userId, bankCardId) => dispatch(enableUserBankCardWithdrawableAction(userId, bankCardId)),
		updateUserBankCardNumberAction: (userId, bankCardId, number) => dispatch(updateUserBankCardNumberAction(userId, bankCardId, number)),
		enableUserBankCardAction: (userId, bankCardId) => dispatch(enableUserBankCardAction(userId, bankCardId)),
		disableUserBankCardAction: (userId, bankCardId) => dispatch(disableUserBankCardAction(userId, bankCardId)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountMemberManagementCardBindPage);
