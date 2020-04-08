import React, { useState, useEffect, } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Button } from 'ljit-react-components';
import { connect } from 'ljit-store-connecter';
import SecurityQuestionsModal from '../security-questions-modal';
import FundsPasswordChecker from '../../../../../features/funds-password-checker';
import {
	userSecurityActions,
	notifyHandlingActions
} from '../../../../../controller';
import {
	notifications,
} from '../../../../../../lib/notify-handler';
import { LoadingStatusEnum } from '../../../../../lib/enums';

const { updateUserSecurityQuestionsAction, } = userSecurityActions;
const { notifyHandlingAction, } = notifyHandlingActions;
const { successNotifications } = notifications;
const { Success, } = successNotifications;
const {
	NONE,
	SUCCESS,
	FAILED,
	LOADING,
} = LoadingStatusEnum;
const propTypes = {
	securityQuestions: PropTypes.array,
	securityQuestionData: ImmutablePropTypes.contains({
		id: PropTypes.number,
		name: PropTypes.string,
	}).isRequired,
	notifyHandlingAction: PropTypes.func.isRequired,
	updateUserSecurityQuestionsAction: PropTypes.func.isRequired,
	isDisabled: PropTypes.bool,
	securityQuestionsLoadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING]),
};

const defaultProps = {
	isDisabled: false,
};

function SecurityQuestionsButton({
	securityQuestionData,
	updateUserSecurityQuestionsAction,
	isDisabled,
	securityQuestionsLoadingStatus,
	notifyHandlingAction,
}) {
	const [ isVisible, setVisible ] = useState(false);
	const [isPasswordError, setIsPasswordError ] = useState(false);

	function _handleSubmit({ password, data }) {
		updateUserSecurityQuestionsAction(password, data);
	}
	function _handleClickButton() {
		setVisible(true);
	}
	function _handleCloseModal() {
		setVisible(false);
	}

	useEffect(() => {
		if (isVisible) {
			switch (securityQuestionsLoadingStatus) {
				case LOADING:
					setIsPasswordError(false);
					break;
				case SUCCESS:
					_handleCloseModal();
					notifyHandlingAction(new Success('安全问题设定成功'));
					break;
				case FAILED:
					setIsPasswordError(true);
					break;
				default:
					setIsPasswordError(false);
			}
		}
	}, [isVisible, securityQuestionsLoadingStatus]);

	return (
		<React.Fragment>
			<Button
				outline={Button.OutlineEnums.HOLLOW}
				onClick={_handleClickButton}
				disabled={isDisabled}
			>設定</Button>
			<FundsPasswordChecker
				isVisible={isVisible}
				onClose={_handleCloseModal}
			>
				<SecurityQuestionsModal
					isVisible={isVisible}
					onClose={_handleCloseModal}
					onSubmit={_handleSubmit}
					securityQuestionData={securityQuestionData}
					isPasswordError={isPasswordError}
					onChangePassword={() => {setIsPasswordError(false);}}
				/>
			</FundsPasswordChecker>
		</React.Fragment>
	);
}

SecurityQuestionsButton.propTypes = propTypes;
SecurityQuestionsButton.defaultProps = defaultProps;

function mapStateToProp(state) {
	return {
		securityQuestionData: state.securityQuestions.get('data'),
		securityQuestionsLoadingStatus: state.userSecurity.get('securityQuestionsLoadingStatus'),
	};
}

function mapDispatchToProp(dispatch) {
	return {
		updateUserSecurityQuestionsAction: (password, data) => dispatch(updateUserSecurityQuestionsAction(password, data)),
		notifyHandlingAction: (success) => dispatch(notifyHandlingAction(success)),
	};
}

export default connect(mapStateToProp, mapDispatchToProp)(SecurityQuestionsButton);
