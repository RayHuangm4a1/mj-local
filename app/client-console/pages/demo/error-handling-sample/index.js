import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'ljit-store-connecter';
import { Button, } from 'ljit-react-components';
import {
	demoErrorHandlingActions,
} from '../../../controller';
import {
	withLoadingStatusNotification,
	notifications,
} from '../../../../lib/notify-handler';

const {
	fetchDemoErrorHandlingAction
} = demoErrorHandlingActions;

const propTypes = {
	// withLoadingStatusNotification will map notifyHandlingAction to prop
	notifyHandlingAction: PropTypes.func.isRequired,
	fetchDemoErrorHandlingAction: PropTypes.func.isRequired,
};

const {
	successNotifications,
	infoNotifications,
} = notifications;

const {
	Success,
} = successNotifications;
const {
	Info,
} = infoNotifications;

class ErrorHandlingSample extends Component {
	constructor() {
		super();

		this._handleClickError = this._handleClickError.bind(this);
		this._handleClickSuccess = this._handleClickSuccess.bind(this);
		this._handleClickInfo = this._handleClickInfo.bind(this);
	}
	_handleClickError() {
		const {
			fetchDemoErrorHandlingAction
		} = this.props;

		fetchDemoErrorHandlingAction();
	}
	_handleClickSuccess() {
		this.props.notifyHandlingAction(new Success('成功了'));

	}
	_handleClickInfo() {
		this.props.notifyHandlingAction(new Info('顯示資訊'));
	}
	_handleClickCancel() {
		this.setState({
			isErrorModalVisible: false
		});
	}
	render() {
		const {
			_handleClickError,
			_handleClickSuccess,
			_handleClickInfo,
		} = this;

		return (
			<React.Fragment>
				<Button
					onClick={_handleClickError}
				>
					Error
				</Button>
				<Button
					onClick={_handleClickSuccess}
				>
					Success
				</Button>
				<Button
					onClick={_handleClickInfo}
				>
					Info
				</Button>
			</React.Fragment>
		);
	}
}

ErrorHandlingSample.propTypes = propTypes;

function mapStatToProps(state) {
	return {
		loadingStatus: state.demoErrorHandling.get('loadingStatus'),
		loadingStatusMessage: state.demoErrorHandling.get('loadingStatusMessage'),
		applicationLoadingStatus: state.application.get('loadingStatus'),
		applicationLoadingStatusMessage: state.application.get('loadingStatusMessage'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchDemoErrorHandlingAction: () => dispatch(fetchDemoErrorHandlingAction()),
	};
}

export default connect(mapStatToProps, mapDispatchToProps)(
	withLoadingStatusNotification(
		[
			{
				loadingStatus: 'loadingStatus',
				loadingStatusMessage: 'loadingStatusMessage',
			},
			{
				loadingStatus: 'applicationLoadingStatus',
				loadingStatusMessage: 'applicationLoadingStatusMessage',
			}
		],
		ErrorHandlingSample)
);
