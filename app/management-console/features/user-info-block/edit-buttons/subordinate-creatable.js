import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect, } from 'ljit-store-connecter';
import {
	teamActions,
} from '../../../controller';
import TeamUserStatusManagementModalButton from '../modal-buttons/team-user-status-management-modal-button';

const {
	enableTeamSubordinateCreationAction,
	disableTeamSubordinateCreationAction,
} = teamActions;

const propTypes = {
	userId: PropTypes.number,
	isChildrenCreatable: PropTypes.bool,
	enableTeamSubordinateCreationAction: PropTypes.func.isRequired,
	disableTeamSubordinateCreationAction: PropTypes.func.isRequired,
};
const defaultProps = {
	isChildrenCreatable: false,
};

class SubordinateCreatableEditButton extends Component {
	constructor() {
		super();
		this._handleChangeTeamStatus = this._handleChangeTeamStatus.bind(this);
	}

	_handleChangeTeamStatus(isChildrenCreatable) {
		const {
			userId,
			enableTeamSubordinateCreationAction,
			disableTeamSubordinateCreationAction,
		} = this.props;

		let handler = disableTeamSubordinateCreationAction;

		if (isChildrenCreatable) {
			handler = enableTeamSubordinateCreationAction;
		}

		handler(userId);
	}

	render() {
		const { isChildrenCreatable, } = this.props;
		const {
			_handleChangeTeamStatus,
		} = this;

		return (
			<TeamUserStatusManagementModalButton
				modalTitle="开下级"
				extraText="开下级"
				isShowUserTable={false}
				isShowUserOfTeam={false}
				isTeamEnable={isChildrenCreatable}
				onChangeTeamStatus={_handleChangeTeamStatus}
			/>
		);
	}
}

SubordinateCreatableEditButton.propTypes = propTypes;
SubordinateCreatableEditButton.defaultProps = defaultProps;

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
		isChildrenCreatable: statuses.isChildrenCreatable,
	};
}
function mapDispatchToProps(dispatch) {
	return {
		enableTeamSubordinateCreationAction: (...args) => dispatch(enableTeamSubordinateCreationAction(...args)),
		disableTeamSubordinateCreationAction: (...args) => dispatch(disableTeamSubordinateCreationAction(...args)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SubordinateCreatableEditButton);
