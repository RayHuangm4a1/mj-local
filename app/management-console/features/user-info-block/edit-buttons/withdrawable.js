import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect, } from 'ljit-store-connecter';
import TeamUserStatusManagementModalButton from '../modal-buttons/team-user-status-management-modal-button';
import {
	userProfileActions,
	teamActions,
	teamMemberActions,
} from '../../../controller';

const {
	enableUserWithdrawableAction,
	disableUserWithdrawableAction,
} = userProfileActions;
const {
	enableTeamWithdrawAction,
	disableTeamWithdrawAction,
} = teamActions;
const {
	enableTeamMemberWithdrawAction,
} = teamMemberActions;


const propTypes = {
	isWithdrawable: PropTypes.bool,
	isTeamWithdrawable: PropTypes.bool,
	userId: PropTypes.number,
	enableUserWithdrawableAction: PropTypes.func.isRequired,
	disableUserWithdrawableAction: PropTypes.func.isRequired,
	enableTeamWithdrawAction: PropTypes.func.isRequired,
	disableTeamWithdrawAction: PropTypes.func.isRequired,
	enableTeamMemberWithdrawAction: PropTypes.func.isRequired,
};
const defaultProps = {};

// TODO 統一處理 API 回傳結果的 Notify
// TODO 統一處理 API 完成後的頁面更新
class WithdrawableEditButton extends Component {
	constructor() {
		super();
		this._handleChangeUserStatus = this._handleChangeUserStatus.bind(this);
		this._handleChangeTeamStatus = this._handleChangeTeamStatus.bind(this);
		this._handleChangeUserOfTeamStatus = this._handleChangeUserOfTeamStatus.bind(this);
	}
	_handleChangeUserStatus(isWithdrawable) {
		const {
			userId,
			enableUserWithdrawableAction,
			disableUserWithdrawableAction
		} = this.props;

		if (isWithdrawable) {
			enableUserWithdrawableAction(userId);
		} else {
			disableUserWithdrawableAction(userId);
		}
	}
	_handleChangeTeamStatus(isTeamWithdrawable) {
		const {
			userId,
			enableTeamWithdrawAction,
			disableTeamWithdrawAction,
		} = this.props;

		if (isTeamWithdrawable) {
			enableTeamWithdrawAction(userId);
		} else {
			disableTeamWithdrawAction(userId);
		}
	}
	_handleChangeUserOfTeamStatus() {
		const {
			userId,
			enableTeamMemberWithdrawAction,
		} = this.props;

		enableTeamMemberWithdrawAction(userId);
	}

	render() {
		const { isWithdrawable, isTeamWithdrawable, } = this.props;
		const {
			_handleChangeUserStatus,
			_handleChangeTeamStatus,
			_handleChangeUserOfTeamStatus,
		} = this;

		return (
			<TeamUserStatusManagementModalButton
				modalTitle="提现"
				extraText="提现"
				isUserEnable={isWithdrawable}
				isTeamEnable={isTeamWithdrawable}
				onChangeUserStatus={_handleChangeUserStatus}
				onChangeTeamStatus={_handleChangeTeamStatus}
				onChangeUserOfTeamStatus={_handleChangeUserOfTeamStatus}
			/>
		);
	}
}

WithdrawableEditButton.propTypes = propTypes;
WithdrawableEditButton.defaultProps = defaultProps;

function mapStateToProps(state) {
	const userData = state.userData.profile.get('data').toObject();
	const { statuses = {} } = userData;

	return {
		userId: userData.id,
		isWithdrawable: statuses.isWithdrawable,
		isTeamWithdrawable: statuses.isTeamWithdrawable,
	};
}
function mapDispatchToProps(dispatch) {
	return {
		enableUserWithdrawableAction: (userId) => dispatch(enableUserWithdrawableAction(userId)),
		disableUserWithdrawableAction: (userId) => dispatch(disableUserWithdrawableAction(userId)),
		enableTeamWithdrawAction: (userId) => dispatch(enableTeamWithdrawAction(userId)),
		disableTeamWithdrawAction: (userId) => dispatch(disableTeamWithdrawAction(userId)),
		enableTeamMemberWithdrawAction: (userId) => dispatch(enableTeamMemberWithdrawAction(userId)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(WithdrawableEditButton);
