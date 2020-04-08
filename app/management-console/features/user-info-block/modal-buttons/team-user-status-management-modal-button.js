import React, { useState, useEffect, } from 'react';
import PropTypes from 'prop-types';
import { connect, } from 'ljit-store-connecter';
import { TextButton, } from 'ljit-react-components';
import ConfirmMessageButton from '../../../components/modal-buttons/confirm-message-button';
import TeamUserStatusManagementModal from '../../../components/team-user-status-management-modal';
import { TeamUserSettingTextEnum, } from '../utils';
import cx from 'classnames';
import { notifications, } from '../../../../lib/notify-handler';
import { LoadingStatusEnum } from '../../../../lib/enums';
import { usePrevious, } from '../../../lib/react-utils';
import { notifyHandlingActions, } from '../../../controller';

const {
	LOADING,
	SUCCESS,
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

const { TEAM, USER, USER_OF_TEAM, } = TeamUserSettingTextEnum;
const PREFIX_CLASS = 'team-user-status-management-modal';

const loadingStatusPropType = PropTypes.oneOf(Object.values(LoadingStatusEnum)).isRequired;

const propTypes = {
	buttonText: PropTypes.string,
	modalTitle: PropTypes.string,
	isDisabled: PropTypes.bool,
	operationText: PropTypes.string,
	extraText: PropTypes.string,
	isUserEnable: PropTypes.bool,
	isTeamEnable: PropTypes.bool,
	updateLoadingStatus: loadingStatusPropType,
	enableTeamLoadingStatus: loadingStatusPropType,
	disableTeamLoadingStatus: loadingStatusPropType,
	enableTeamMemberLoadingStatus: loadingStatusPropType,
	onChangeUserStatus: PropTypes.func,
	onChangeTeamStatus: PropTypes.func,
	onChangeUserOfTeamStatus: PropTypes.func,
	notifyHandlingAction: PropTypes.func.isRequired,
	isShowUserTable: PropTypes.bool,
	isShowTeamTable: PropTypes.bool,
	isShowUserOfTeam: PropTypes.bool,
};
const defaultProps = {
	buttonText: '修改',
	modalTitle: '',
	isDisabled: false,
	operationText: '禁止',
	extraText: '',
	isUserEnable: false,
	isTeamEnable: false,
	onChangeUserStatus: () => {},
	onChangeTeamStatus: () => {},
	onChangeUserOfTeamStatus: () => {},
	isShowUserTable: true,
	isShowTeamTable: true,
	isShowUserOfTeam: true,
};

const TeamUserStatusManagementModalButton = ({
	buttonText,
	modalTitle,
	isDisabled,
	operationText,
	extraText,
	isUserEnable,
	isTeamEnable,
	onChangeUserStatus,
	onChangeTeamStatus,
	onChangeUserOfTeamStatus,
	isShowUserTable,
	isShowTeamTable,
	isShowUserOfTeam,
	updateLoadingStatus,
	enableTeamLoadingStatus,
	disableTeamLoadingStatus,
	enableTeamMemberLoadingStatus,
	notifyHandlingAction,
}) => {
	const prevUpdateLoadingStatus = usePrevious(updateLoadingStatus);
	const prevEnableTeamLoadingStatus = usePrevious(enableTeamLoadingStatus);
	const prevDisableTeamLoadingStatus = usePrevious(disableTeamLoadingStatus);
	const prevEnableTeamMemberLoadingStatus = usePrevious(enableTeamMemberLoadingStatus);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isTeamWillEnable, setIsTeamWillEnable] = useState(false);

	useEffect(() => {
		if (isModalVisible) {
			if (updateLoadingStatus === SUCCESS && prevUpdateLoadingStatus === LOADING) {
				notifyHandlingAction(new Success(`${USER}已${isUserEnable ? `${operationText}` : `解除${operationText}`}`));
			}
		}
	}, [updateLoadingStatus]);

	useEffect(() => {
		if (isModalVisible) {
			if (enableTeamLoadingStatus === SUCCESS && prevEnableTeamLoadingStatus === LOADING ||
				disableTeamLoadingStatus === SUCCESS && prevDisableTeamLoadingStatus === LOADING) {
				notifyHandlingAction(new Success(`${TEAM}已${isTeamWillEnable ? `解除${operationText}` : `${operationText}`}`));
			}
		}
	}, [enableTeamLoadingStatus, disableTeamLoadingStatus]);

	useEffect(() => {
		if (isModalVisible) {
			if (enableTeamMemberLoadingStatus === SUCCESS && prevEnableTeamMemberLoadingStatus === LOADING) {
				notifyHandlingAction(new Success(`${USER_OF_TEAM}已解除${operationText}`));
			}
		}
	}, [enableTeamMemberLoadingStatus]);

	const _handleConfirm = (confirmType, isStatus) => {
		if (confirmType === USER) {
			onChangeUserStatus(!isStatus);
		} else if (confirmType === TEAM) {
			onChangeTeamStatus(!isStatus);
			setIsTeamWillEnable(!isStatus);
		} else if (confirmType === USER_OF_TEAM) {
			onChangeUserOfTeamStatus(!isStatus);
		}
	};
	const _renderConfirmMessageButton = (confirmType, isStatus, actionText) => {
		return (
			<ConfirmMessageButton
				buttonText={actionText}
				title="通知"
				message={`确定${actionText}`}
				onConfirm={() => _handleConfirm(confirmType, isStatus,)}
			/>
		);
	};
	const _renderTeamOperations = () => {
		return (
			<div
				className={cx(`${PREFIX_CLASS}__team-operations-layout`, {
					[`${PREFIX_CLASS}__team-operations-layout--reverse`]: isTeamEnable
				})}
			>
				{_renderConfirmMessageButton(TEAM, false, `解除团队${operationText}${extraText}`)}
				{_renderConfirmMessageButton(TEAM, true, `${operationText}团队${extraText}`)}
				{(!isShowUserOfTeam || isTeamEnable) ? null : _renderConfirmMessageButton(USER_OF_TEAM, false, `解除团队中的个人${operationText}${extraText}`)}
			</div>
		);
	};
	const userOperationText = isUserEnable ? `${operationText}${extraText}` : `解除${operationText}`;

	return (
		<React.Fragment>
			<TextButton
				text={buttonText}
				onClick={() => setIsModalVisible(true)}
				isDisabled={isDisabled}
			/>
			<TeamUserStatusManagementModal
				title={modalTitle}
				isVisible={isModalVisible}
				onClickCancel={() => setIsModalVisible(false)}
				modalTitle={modalTitle}
				userData={{
					statusText: isUserEnable ? `未${operationText}` : <span className={`${PREFIX_CLASS}__text--red`}>{operationText}中</span> ,
					operation: _renderConfirmMessageButton(USER, isUserEnable, userOperationText)
				}}
				teamData={{
					statusText: isTeamEnable ? `未${operationText}` : <span className={`${PREFIX_CLASS}__text--red`}>{operationText}中</span>,
					operation: _renderTeamOperations()
				}}
				isShowTeamTable={isShowTeamTable}
				isShowUserTable={isShowUserTable}
			/>
		</React.Fragment>
	);
};

function mapStateToProps(state) {
	const {
		userData,
		team: teamReducer,
		teamMember: teamMemberReducer,
	} = state;
	const {
		profile: userProfileReducer,
	} = userData;

	return {
		updateLoadingStatus: userProfileReducer.get('updateLoadingStatus'),
		enableTeamLoadingStatus: teamReducer.get('enableLoadingStatus'),
		disableTeamLoadingStatus: teamReducer.get('disableLoadingStatus'),
		enableTeamMemberLoadingStatus: teamMemberReducer.get('enableLoadingStatus'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		notifyHandlingAction: (notification) => dispatch(notifyHandlingAction(notification)),
	};
}

TeamUserStatusManagementModalButton.propTypes = propTypes;
TeamUserStatusManagementModalButton.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(TeamUserStatusManagementModalButton);
