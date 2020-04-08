import React, { useState, } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'ljit-react-components';
import { connect } from 'ljit-store-connecter';
import {
	withLoadingStatusNotification,
} from '../../../../../../lib/notify-handler';
import { LoadingStatusEnum, } from '../../../../../lib/enums';
import FundsPasswordChecker from '../../../../../features/funds-password-checker';
import { userSecurityActions, } from '../../../../../controller';
import BindGooglePasswordModal from '../bind-google-password-modal';

const {
	NONE,
	LOADING,
	SUCCESS,
	FAILED,
} = LoadingStatusEnum;

const {
	bindGoogleAuthenticationAction,
} = userSecurityActions;

const loadingStatuses = [
	{
		loadingStatus: 'bindGoogleAuthenticationLoadingStatus',
		loadingStatusMessage: 'bindGoogleAuthenticationLoadingStatusMessage',
	},
];

const propTypes = {
	userData: PropTypes.object.isRequired,
	platformData: PropTypes.object.isRequired,
	bindGoogleAuthenticationLoadingStatus: PropTypes.oneOf([NONE, LOADING, SUCCESS, FAILED]).isRequired,
	bindGoogleAuthenticationLoadingStatusMessage: PropTypes.string.isRequired,
	bindGoogleAuthenticationAction: PropTypes.func.isRequired,
};

function BindGoogleButton({
	userData,
	platformData,
	bindGoogleAuthenticationAction,
}) {
	const {
		username,
	} = userData;
	const {
		code,
	} = platformData;
	const [ isVisible, setVisible ] = useState(false);

	function _handleSubmit(formData) {
		bindGoogleAuthenticationAction(formData);
		_handleCloseModal();
	}
	function _handleClickButton() {
		setVisible(true);
	}
	function _handleCloseModal() {
		setVisible(false);
	}

	return (
		<React.Fragment>
			<Button
				outline={Button.OutlineEnums.HOLLOW}
				onClick={_handleClickButton}
			>
				綁定
			</Button>
			<FundsPasswordChecker
				isVisible={isVisible}
				onClose={_handleCloseModal}
			>
				<BindGooglePasswordModal
					username={username}
					platformCode={code}
					title="谷歌密码验证"
					isVisible={isVisible}
					onSubmit={_handleSubmit}
					onClose={_handleCloseModal}
				/>
			</FundsPasswordChecker>
		</React.Fragment>
	);
}

BindGoogleButton.propTypes = propTypes;

function mapStateToProps(state) {
	const {
		user: userReducer,
		platform: platformReducer,
	} = state;

	return {
		userData: userReducer.get('data').toObject(),
		platformData: platformReducer.get('data').toObject(),
		bindGoogleAuthenticationLoadingStatus: state.userSecurity.get('bindGoogleAuthenticationLoadingStatus'),
		bindGoogleAuthenticationLoadingStatusMessage: state.userSecurity.get('bindGoogleAuthenticationLoadingStatusMessage'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		bindGoogleAuthenticationAction: (...args) => dispatch(bindGoogleAuthenticationAction(...args)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(
	withLoadingStatusNotification(
		loadingStatuses,
		BindGoogleButton
	)
);
