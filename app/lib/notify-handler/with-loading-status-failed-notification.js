import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect, } from 'ljit-store-connecter';

import {
	notifyHandlingAction,
} from './notify-handling-actions';
import { AjaxError, } from './notifications/error';
import {
	LoadingStatusEnum,
} from '../enums';

const {
	FAILED,
	LOADING,
} = LoadingStatusEnum;

function withLoadingStatusNotification(loadingStatusProps = [], WrappedComponent) {
	class LoadingStatusNotificationWrapper extends Component {
		render() {
			return (
				<WrappedComponent
					{...this.props}
				/>
			);
		}
		componentDidUpdate(prevProps) {
			loadingStatusProps.forEach((item) => {
				const {
					notifyHandlingAction
				} = this.props;

				const status = item.loadingStatus || '';
				const message = item.loadingStatusMessage || '';
				const prevLoadingStatus = prevProps[status];
				const nextLoadingStatus = this.props[status];


				if (prevLoadingStatus === LOADING) {
					if (nextLoadingStatus === FAILED) {
						notifyHandlingAction(new AjaxError(getErrorMessage(this.props[message])));
					}
				}
			});
		}
	}

	LoadingStatusNotificationWrapper.displayName = `WithLoadingStatusNotification(${getDisplayName(WrappedComponent)})`;
	LoadingStatusNotificationWrapper.propTypes = {
		notifyHandlingAction: PropTypes.func,
	};

	return connect(undefined, mapDispatchToProps)(LoadingStatusNotificationWrapper);
}

function getDisplayName(WrappedComponent) {
	return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function getErrorMessage(message) {
	const defaultErrorMessage = '请稍后再试';
	const isShowMessage = !!message;

	return isShowMessage ? message : defaultErrorMessage;
}

function mapDispatchToProps(dispatch) {
	return {
		notifyHandlingAction: (...args) => dispatch(notifyHandlingAction(...args)),
	};
}

export default withLoadingStatusNotification;
