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
	enableUserBettingAction,
	disableUserBettingAction,
} = userProfileActions;
const {
	enableTeamBettingAction,
	disableTeamBettingAction,
} = teamActions;
const {
	enableTeamMemberBettingAction,
} = teamMemberActions;

const propTypes = {
	userId: PropTypes.number.isRequired,
	buttonText: PropTypes.string,
	isBetable: PropTypes.bool,
	isTeamBetable: PropTypes.bool,
	enableUserBettingAction: PropTypes.func.isRequired,
	disableUserBettingAction: PropTypes.func.isRequired,
	enableTeamBettingAction: PropTypes.func.isRequired,
	disableTeamBettingAction: PropTypes.func.isRequired,
	enableTeamMemberBettingAction: PropTypes.func.isRequired,
};
const defaultProps = {
	buttonText: '修改',
};

class BetableEditButton extends Component {
	constructor() {
		super();

		this._handleChangeUserStatus = this._handleChangeUserStatus.bind(this);
		this._handleChangeTeamStatus = this._handleChangeTeamStatus.bind(this);
		this._handleChangeTeamMemberStatus = this._handleChangeTeamMemberStatus.bind(this);
	}
	_handleChangeUserStatus(isBetable) {
		const {
			userId,
			enableUserBettingAction,
			disableUserBettingAction,
		} = this.props;
		const handler = isBetable ? enableUserBettingAction : disableUserBettingAction;

		handler(userId);
	}
	_handleChangeTeamStatus(isTeamBetable) {
		const {
			userId,
			enableTeamBettingAction,
			disableTeamBettingAction,
		} = this.props;
		const handler = isTeamBetable ? enableTeamBettingAction : disableTeamBettingAction;

		handler(userId);
	}
	_handleChangeTeamMemberStatus() {
		const {
			userId,
			enableTeamMemberBettingAction,
		} = this.props;

		enableTeamMemberBettingAction(userId);
	}

	render() {
		const {
			buttonText,
			isBetable,
			isTeamBetable,
		} = this.props;
		const {
			_handleChangeUserStatus,
			_handleChangeTeamStatus,
			_handleChangeTeamMemberStatus,
		} = this;

		return (
			<TeamUserStatusManagementModalButton
				buttonText={buttonText}
				modalTitle="投注"
				extraText="投注"
				isUserEnable={isBetable}
				isTeamEnable={isTeamBetable}
				onChangeUserStatus={_handleChangeUserStatus}
				onChangeTeamStatus={_handleChangeTeamStatus}
				onChangeUserOfTeamStatus={_handleChangeTeamMemberStatus}
			/>
		);
	}
}

BetableEditButton.propTypes = propTypes;
BetableEditButton.defaultProps = defaultProps;

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
		isBetable: statuses.isBetable,
		isTeamBetable: statuses.isTeamBetable,
	};
}
function mapDispatchToProps(dispatch) {
	return {
		enableUserBettingAction: (...args) => dispatch(enableUserBettingAction(...args)),
		disableUserBettingAction: (...args) => dispatch(disableUserBettingAction(...args)),
		enableTeamBettingAction: (...args) => dispatch(enableTeamBettingAction(...args)),
		disableTeamBettingAction: (...args) => dispatch(disableTeamBettingAction(...args)),
		enableTeamMemberBettingAction: (...args) => dispatch(enableTeamMemberBettingAction(...args)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(BetableEditButton);
