import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	TextButton,
	HeaderButtonBar,
	Table,
	ListItem,
} from 'ljit-react-components';
import PageModal from '../../../../../components/page-modal';
import { connect } from 'ljit-store-connecter';
import {
	notifyHandlingActions,
	userAccountActions,
} from '../../../../../controller';
import {
	notifications,
} from '../../../../../../lib/notify-handler';
import { LoadingStatusEnum } from '../../../../../../lib/enums';
import { usePrevious } from '../../../../../lib/react-utils';

const { Message, } = PageModal;
const {
	NONE,
	LOADING,
	SUCCESS,
	FAILED,
} = LoadingStatusEnum;

const {
	notifyHandlingAction,
} = notifyHandlingActions;

const {
	successNotifications,
} = notifications;
const {
	Success,
} = successNotifications;

const {
	deleteUserSecurityQuestionsAction,
} = userAccountActions;

const propTypes = {
	securityQuestions: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string,
		id: PropTypes.number,
	})),
	userId: PropTypes.number,
	deleteUserSecurityQuestionsAction: PropTypes.func.isRequired,
	accountUpdateLoadingStatus: PropTypes.oneOf([NONE, LOADING, SUCCESS, FAILED,]),
	notifyHandlingAction: PropTypes.func.isRequired,
};
const defaultProps = {
	securityQuestions: [],
};

function SecurityQuestionsEditElement({
	deleteUserSecurityQuestionsAction,
	userId,
	securityQuestions,
	accountUpdateLoadingStatus,
	notifyHandlingAction,
}) {
	const prevAccountUpdateLoadingStatus = usePrevious(accountUpdateLoadingStatus);
	const [isEditModalVisible, setIsEditModalVisible] = useState(false);
	const [isConfirmMessageVisible, setIsConfirmMessageVisible] = useState(false);
	const [isSecurityQuestionsRemoved, setSecurityQuestionsRemoved] = useState(false);
	const hasSecurityQuestions = securityQuestions.length > 0;
	const securityQuestionsContent = hasSecurityQuestions ? '已设定' : '未设定';

	useEffect(() => {
		if (isSecurityQuestionsRemoved && accountUpdateLoadingStatus === SUCCESS && prevAccountUpdateLoadingStatus === LOADING) {
			notifyHandlingAction(new Success('安全问题解除成功'));
		}
	}, [accountUpdateLoadingStatus]);

	let rightButton;

	if (hasSecurityQuestions) {
		rightButton = (
			<TextButton
				text="解除"
				onClick={() => setIsEditModalVisible(true)}
			/>
		);
	} else {
		rightButton = null;
	}

	function _handleRemoveAllSecurityQuestion() {
		deleteUserSecurityQuestionsAction(userId);
		setSecurityQuestionsRemoved(true);
	}
	function _handleCancelModal() {
		setIsEditModalVisible(false);
	}

	function _handleCancelMessage() {
		setIsConfirmMessageVisible(false);
	}

	useEffect(() => {
		if (accountUpdateLoadingStatus === SUCCESS && isEditModalVisible) {
			_handleCancelModal();
			_handleCancelMessage();
		}
	}, [accountUpdateLoadingStatus]);

	return (
		<Fragment>
			<ListItem
				title="安全问题设定"
				content={securityQuestionsContent}
				right={rightButton}
			/>
			<PageModal
				title="密码安全问题"
				className="security-questions-edit-element"
				visible={isEditModalVisible}
				footer={(
					<Button
						color={Button.ColorEnums.BRIGHTBLUE500}
						onClick={_handleCancelModal}
					>
						关 闭
					</Button>
				)}
				onClickCancel={_handleCancelModal}
			>
				<HeaderButtonBar
					right={[
						(
							<Button
								key="remove-all-items"
								outline={Button.OutlineEnums.HOLLOW}
								color={Button.ColorEnums.LIGHTRED500}
								onClick={() => {setIsConfirmMessageVisible(true);}}
							>
								清除安全问题
							</Button>
						),
					]}
				/>
				<Table
					rowKey="id"
					columns={[
						{
							title: '问题',
							dataIndex: 'name',
							width: '50%',
						},{
							title: '答案',
							dataIndex: 'answer',
							render: () => '********',
							width: '50%',
						},
					]}
					dataSource={securityQuestions}
				/>
			</PageModal>
			<Message
				visible={isConfirmMessageVisible}
				title={'通知'}
				message={'确定清除安全问题'}
				onClickOk={_handleRemoveAllSecurityQuestion}
				onClickCancel={_handleCancelMessage}
			/>
		</Fragment>
	);
}

SecurityQuestionsEditElement.propTypes = propTypes;
SecurityQuestionsEditElement.defaultProps = defaultProps;

function mapStateToProps(state) {
	return {
		userId: state.userData.profile.get('data').toObject().id,
		securityQuestions: state.userData.account.get('data').toObject().securityQuestions,
		accountUpdateLoadingStatus: state.userData.account.get('updateLoadingStatus'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		notifyHandlingAction: (notification) => dispatch(notifyHandlingAction(notification)),
		deleteUserSecurityQuestionsAction: (userId) => dispatch(deleteUserSecurityQuestionsAction(userId))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SecurityQuestionsEditElement);
