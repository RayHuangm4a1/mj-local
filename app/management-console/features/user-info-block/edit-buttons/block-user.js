import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect, } from 'ljit-store-connecter';
import {
	userProfileActions,
	teamActions,
	teamMemberActions,
} from '../../../controller';
import TeamUserStatusManagementModalButton from '../modal-buttons/team-user-status-management-modal-button';

const { enableUserAction, disableUserAction, } = userProfileActions;
const { enableTeamAccountAction, disableTeamAccountAction, } = teamActions;
const { enableTeamMemberAccountAction, } = teamMemberActions;

const propTypes = {
	userId: PropTypes.number,
	isBlocked: PropTypes.bool,
	isTeamBlocked: PropTypes.bool,
	enableUserAction: PropTypes.func.isRequired,
	disableUserAction: PropTypes.func.isRequired,
	enableTeamAccountAction: PropTypes.func.isRequired,
	disableTeamAccountAction: PropTypes.func.isRequired,
	enableTeamMemberAccountAction: PropTypes.func.isRequired,
};
const defaultProps = {};

class BlockUserEditButton extends Component {
	constructor() {
		super();
		this._handleChangeUserStatus = this._handleChangeUserStatus.bind(this);
		this._handleChangeTeamStatus = this._handleChangeTeamStatus.bind(this);
		this._handleChangeUserOfTeamStatus = this._handleChangeUserOfTeamStatus.bind(this);
	}
	_handleChangeUserStatus(isEnable) {
		const {
			userId,
			enableUserAction,
			disableUserAction,
		} = this.props;

		isEnable ? enableUserAction(userId) : disableUserAction(userId);
	}
	_handleChangeTeamStatus(isTeamEnable) {
		const {
			userId,
			enableTeamAccountAction,
			disableTeamAccountAction,
		} = this.props;

		isTeamEnable ? enableTeamAccountAction(userId) : disableTeamAccountAction(userId);
	}
	_handleChangeUserOfTeamStatus() {
		const {
			userId,
			enableTeamMemberAccountAction,
		} = this.props;

		enableTeamMemberAccountAction(userId);
	}

	render() {
		const { isBlocked, isTeamBlocked, } = this.props;
		const {
			_handleChangeUserStatus,
			_handleChangeTeamStatus,
			_handleChangeUserOfTeamStatus,
		} = this;

		return (
			<TeamUserStatusManagementModalButton
				modalTitle="帐号冻结"
				operationText="冻结"
				isUserEnable={!isBlocked}
				isTeamEnable={!isTeamBlocked}
				onChangeUserStatus={_handleChangeUserStatus}
				onChangeTeamStatus={_handleChangeTeamStatus}
				onChangeUserOfTeamStatus={_handleChangeUserOfTeamStatus}
			/>
		);
	}
}

BlockUserEditButton.propTypes = propTypes;
BlockUserEditButton.defaultProps = defaultProps;

function mapStateToProps(state) {
	const userProfile = state.userData.profile.get('data').toObject();
	const { id: userId, statuses = {}, } = userProfile;
	const { isBlocked, isTeamBlocked, } = statuses;

	return {
		userId,
		isBlocked,
		isTeamBlocked,
	};
}
function mapDispatchToProps(dispatch) {
	return {
		enableUserAction: (userId) => dispatch(enableUserAction(userId)),
		disableUserAction: (userId) => dispatch(disableUserAction(userId)),
		enableTeamAccountAction: (leaderId) => dispatch(enableTeamAccountAction(leaderId)),
		disableTeamAccountAction: (leaderId) => dispatch(disableTeamAccountAction(leaderId)),
		enableTeamMemberAccountAction: (memberId) => dispatch(enableTeamMemberAccountAction(memberId))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(BlockUserEditButton);
