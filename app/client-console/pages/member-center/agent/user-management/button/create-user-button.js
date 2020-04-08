import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserModal from '../modal/user-modal';
import CreatedUserDetailsModal from '../modal/created-user-details-modal';
import { Button } from 'ljit-react-components';
import { connect } from 'ljit-store-connecter';
import { userActions } from '../../../../../controller';
import { LoadingStatusEnum } from '../../../../../lib/enums';
import { withLoadingStatusNotification, } from '../../../../../../lib/notify-handler';

const {
	NONE,
	SUCCESS,
	FAILED,
	LOADING,
} = LoadingStatusEnum;

const propTypes = {
	bonusOptions: PropTypes.array,
	startCreateChildrenUserAction: PropTypes.func.isRequired,
	createLoadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING]),
	createLoadingStatusMessage: PropTypes.string,
};
const {
	startCreateChildrenUserAction,
} = userActions;

class CreateUserButton extends Component {
	constructor() {
		super();
		this.state = {
			isUserModalVisible: false,
			isCreatedUserDetailsModalVisible: false,
			userData: {},
		};
		this._handleOpenUserModal = this._handleOpenUserModal.bind(this);
		this._handleCloseUserModal = this._handleCloseUserModal.bind(this);
		this._handleCreateUser = this._handleCreateUser.bind(this);
		this._handleCloseCreatedUserDetailsModal = this._handleCloseCreatedUserDetailsModal.bind(this);
	}
	_handleOpenUserModal() {
		this.setState({
			isUserModalVisible: true, 
		});
	}
	_handleCloseUserModal() {
		this.setState({ 
			isUserModalVisible: false, 
		});
	}

	_handleCreateUser(user) {
		const { startCreateChildrenUserAction, } = this.props;

		startCreateChildrenUserAction(user);

		this.setState({ userData: Object.assign(user, { link: window.location.origin, }), });
	}
	_handleCloseCreatedUserDetailsModal() {
		this.setState({
			isCreatedUserDetailsModalVisible: false,
		});
	}
	render() {
		const {
			bonusOptions,
		} = this.props;
		const {
			isUserModalVisible,
			isCreatedUserDetailsModalVisible,
			userData
		} = this.state;
		const {
			_handleCloseUserModal,
			_handleCreateUser,
			_handleOpenUserModal,
			_handleCloseCreatedUserDetailsModal
		} = this;

		return (
			<React.Fragment>
				<Button
					outline={Button.OutlineEnums.HOLLOW}
					onClick={_handleOpenUserModal}
					color={Button.ColorEnums.ORANGE}
				>新增会员</Button>
				<UserModal
					ref={(instance) => this.userModalInstance = instance}
					className="agent-user-management__modal"
					isVisible={isUserModalVisible}
					onCreateUser={_handleCreateUser}
					onCancel={_handleCloseUserModal}
					bonusOptions={bonusOptions}
				/>
				<CreatedUserDetailsModal
					isVisible={isCreatedUserDetailsModalVisible}
					className="agent-user-management__modal"
					onClose={_handleCloseCreatedUserDetailsModal}
					userData={userData}
				/>
			</React.Fragment>
		);
	}
	componentDidUpdate(prevProps) {
		const { createLoadingStatus } = this.props;

		if (prevProps.createLoadingStatus === LOADING && createLoadingStatus === SUCCESS) {
			this.userModalInstance.resetFields();
			this._handleCloseUserModal();
			this.setState({ isCreatedUserDetailsModalVisible: true });
		}
	}
}

CreateUserButton.propTypes = propTypes;

function mapStateToProps(state) {
	return {
		createLoadingStatus: state.childrenUsers.get('createLoadingStatus'),
		createLoadingStatusMessage: state.childrenUsers.get('createLoadingStatusMessage'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		startCreateChildrenUserAction: (user) => dispatch(startCreateChildrenUserAction(user)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(
	withLoadingStatusNotification(
		[
			{
				loadingStatus: 'createLoadingStatus',
				loadingStatusMessage: 'createLoadingStatusMessage',
			},
		],
		CreateUserButton)
);
