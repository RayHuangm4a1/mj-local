import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect, } from 'ljit-store-connecter';
import {
	userProfileActions,
	teamActions,
	teamMemberActions,
} from '../../../controller';
import TeamUserStatusManagementModalButton from '../modal-buttons/team-user-status-management-modal-button';

const {
	enableUserDepositAction,
	disableUserDepositAction,
} = userProfileActions;
const {
	enableTeamDepositAction,
	disableTeamDepositAction,
} = teamActions;
const {
	enableTeamMemberDepositAction,
} = teamMemberActions;

const propTypes = {
	userId: PropTypes.number,
	isDepositable: PropTypes.bool,
	isTeamDepositable: PropTypes.bool,
	enableUserDepositAction: PropTypes.func.isRequired,
	disableUserDepositAction: PropTypes.func.isRequired,
	enableTeamDepositAction: PropTypes.func.isRequired,
	disableTeamDepositAction: PropTypes.func.isRequired,
	enableTeamMemberDepositAction: PropTypes.func.isRequired,
};

class DepositableEditButton extends Component {
	constructor() {
		super();
		this._handleChangeUserStatus = this._handleChangeUserStatus.bind(this);
		this._handleChangeTeamStatus = this._handleChangeTeamStatus.bind(this);
		this._handleChangeTeamMemberStatus = this._handleChangeTeamMemberStatus.bind(this);
	}

	_handleChangeUserStatus(isDepositable) {
		const {
			userId,
			enableUserDepositAction,
			disableUserDepositAction,
		} = this.props;

		let handler = disableUserDepositAction;

		if (isDepositable) {
			handler = enableUserDepositAction;
		}

		handler(userId);
	}
	_handleChangeTeamStatus(isTeamDepositable) {
		const {
			userId,
			enableTeamDepositAction,
			disableTeamDepositAction,
		} = this.props;

		let handler = disableTeamDepositAction;

		if (isTeamDepositable) {
			handler = enableTeamDepositAction;
		}

		handler(userId);
	}
	_handleChangeTeamMemberStatus() {
		const {
			userId,
			enableTeamMemberDepositAction,
		} = this.props;

		enableTeamMemberDepositAction(userId);
	}

	render() {
		const {
			isDepositable,
			isTeamDepositable,
		} = this.props;
		const {
			_handleChangeUserStatus,
			_handleChangeTeamStatus,
			_handleChangeTeamMemberStatus,
		} = this;

		return (
			<TeamUserStatusManagementModalButton
				modalTitle="充值"
				extraText="充值"
				isUserEnable={isDepositable}
				isTeamEnable={isTeamDepositable}
				onChangeUserStatus={_handleChangeUserStatus}
				onChangeTeamStatus={_handleChangeTeamStatus}
				onChangeUserOfTeamStatus={_handleChangeTeamMemberStatus}
			/>
		);
	}
}

DepositableEditButton.propTypes = propTypes;

function mapStateToProps(state) {
	const {
		profile: userProfileReducer,
	} = state.userData;
	const userProfileData = userProfileReducer.get('data').toObject();
	const {
		id,
		statuses = {},
	} = userProfileData;

	return {
		userId: id,
		isDepositable: statuses.isDepositable,
		isTeamDepositable: statuses.isTeamDepositable,
	};
}
function mapDispatchToProps(dispatch) {
	return {
		enableUserDepositAction: (...args) => dispatch(enableUserDepositAction(...args)),
		disableUserDepositAction: (...args) => dispatch(disableUserDepositAction(...args)),
		enableTeamDepositAction: (...args) => dispatch(enableTeamDepositAction(...args)),
		disableTeamDepositAction: (...args) => dispatch(disableTeamDepositAction(...args)),
		enableTeamMemberDepositAction: (...args) => dispatch(enableTeamMemberDepositAction(...args)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(DepositableEditButton);
