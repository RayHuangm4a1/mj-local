import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect, } from 'ljit-store-connecter';
import {
	userProfileActions,
	teamMemberActions,
	teamActions,
} from '../../../controller';
import TeamUserStatusManagementModalButton from '../modal-buttons/team-user-status-management-modal-button';

const { enableUserFundsAction, disableUserFundsAction, } = userProfileActions;
const { enableTeamFundsAction, disableTeamFundsAction, } = teamActions;
const { enableTeamMemberFundsAction, } = teamMemberActions;

const propTypes = {
	userId: PropTypes.number,
	isFundsable: PropTypes.bool,
	isTeamFundsable: PropTypes.bool,
	enableUserFundsAction: PropTypes.func.isRequired,
	disableUserFundsAction: PropTypes.func.isRequired,
	enableTeamFundsAction: PropTypes.func.isRequired,
	disableTeamFundsAction: PropTypes.func.isRequired,
	enableTeamMemberFundsAction: PropTypes.func.isRequired,
};
const defaultProps = {};

class BlockFundsEditButton extends Component {
	constructor() {
		super();

		this._handleChangeUserStatus = this._handleChangeUserStatus.bind(this);
		this._handleChangeTeamStatus = this._handleChangeTeamStatus.bind(this);
		this._handleChangeUserOfTeamStatus = this._handleChangeUserOfTeamStatus.bind(this);
	}
	_handleChangeUserStatus(isUserFundsEnable) {
		const {
			userId,
			enableUserFundsAction,
			disableUserFundsAction,
		} = this.props;

		isUserFundsEnable ? enableUserFundsAction(userId) : disableUserFundsAction(userId);
	}
	_handleChangeTeamStatus(isTeamFundsEnable) {
		const {
			userId,
			enableTeamFundsAction,
			disableTeamFundsAction,
		} = this.props;

		isTeamFundsEnable ? enableTeamFundsAction(userId) : disableTeamFundsAction(userId);
	}
	_handleChangeUserOfTeamStatus() {
		const {
			userId,
			enableTeamMemberFundsAction,
		} = this.props;

		enableTeamMemberFundsAction(userId);
	}

	render() {
		const { isFundsable, isTeamFundsable, } = this.props;
		const {
			_handleChangeUserStatus,
			_handleChangeTeamStatus,
			_handleChangeUserOfTeamStatus,
		} = this;

		return (
			<TeamUserStatusManagementModalButton
				modalTitle="资金冻结"
				operationText="冻结"
				extraText="资金"
				isUserEnable={isFundsable}
				isTeamEnable={isTeamFundsable}
				onChangeUserStatus={_handleChangeUserStatus}
				onChangeTeamStatus={_handleChangeTeamStatus}
				onChangeUserOfTeamStatus={_handleChangeUserOfTeamStatus}
			/>
		);
	}
}

BlockFundsEditButton.propTypes = propTypes;
BlockFundsEditButton.defaultProps = defaultProps;

function mapStateToProps(state) {
	const userProfileData = state.userData.profile.get('data').toObject();
	const { id: userId, statuses = {}, } = userProfileData;
	const { isFundsable, isTeamFundsable, } = statuses;

	return {
		userId,
		isFundsable,
		isTeamFundsable,
	};
}
function mapDispatchToProps(dispatch) {
	return {
		enableUserFundsAction: (userId) => dispatch(enableUserFundsAction(userId)),
		disableUserFundsAction: (userId) => dispatch(disableUserFundsAction(userId)),
		enableTeamFundsAction: (leaderId) => dispatch(enableTeamFundsAction(leaderId)),
		disableTeamFundsAction: (leaderId) => dispatch(disableTeamFundsAction(leaderId)),
		enableTeamMemberFundsAction: (memberId) => dispatch(enableTeamMemberFundsAction(memberId)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(BlockFundsEditButton);
