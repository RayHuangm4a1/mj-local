import React, { useState, } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'ljit-react-components';
import ResetPasswordModal from '../reset-password-modal';
import { connect } from 'ljit-store-connecter';
import { userSecurityActions, } from '../../../../../controller';
import MessageModal from '../../../../../components/client-message-modal';

const {
	updateUserLoginPasswordViaSecurityQuestionsAction,
	updateUserFundsPasswordViaSecurityQuestionsAction,
	updateUserBetPasswordViaSecurityQuestionsAction,
	updateUserLoginPasswordViaGoogleTotpAction,
	updateUserFundsPasswordViaGoogleTotpAction,
	updateUserBetPasswordViaGoogleTotpAction,
} = userSecurityActions;

const { PasswordTypesEnum, ResetMethodsEnum, } = ResetPasswordModal;
const { LOGIN, FUNDS, BET, } = PasswordTypesEnum;
const { SECURITY_QUESTIONS, GOOGLE_TOTP, } = ResetMethodsEnum;

const propTypes = {
	userSecurityQuestionsData: PropTypes.array.isRequired,
	userGoogleTotpDate: PropTypes.shape({
		isEnabled: PropTypes.bool,
	}).isRequired,
	updateUserLoginPasswordViaSecurityQuestionsAction: PropTypes.func.isRequired,
	updateUserFundsPasswordViaSecurityQuestionsAction: PropTypes.func.isRequired,
	updateUserBetPasswordViaSecurityQuestionsAction: PropTypes.func.isRequired,
	updateUserLoginPasswordViaGoogleTotpAction: PropTypes.func.isRequired,
	updateUserFundsPasswordViaGoogleTotpAction: PropTypes.func.isRequired,
	updateUserBetPasswordViaGoogleTotpAction: PropTypes.func.isRequired,
};

function ResetPasswordButton({
	userSecurityQuestionsData,
	userGoogleTotpDate,
	updateUserLoginPasswordViaSecurityQuestionsAction,
	updateUserFundsPasswordViaSecurityQuestionsAction,
	updateUserBetPasswordViaSecurityQuestionsAction,
	updateUserLoginPasswordViaGoogleTotpAction,
	updateUserFundsPasswordViaGoogleTotpAction,
	updateUserBetPasswordViaGoogleTotpAction,
}) {
	const [ isVisible, setVisible ] = useState(false);
	const [ isMessageVisivle, setMessageVisible] = useState(false);
	const isSecurityQuestionEnable = userSecurityQuestionsData.length > 0;
	const isGoogleTotpEnable = userGoogleTotpDate.isEnabled;
	const isBothDisable = !isSecurityQuestionEnable && !isGoogleTotpEnable;

	function _handleSubmit(values) {
		const {
			resetMethod,
			passwordType,
			newPassword,
			confirmedPassword,
		} = values;

		if (resetMethod === SECURITY_QUESTIONS) {
			const securityQuestionAnswers = userSecurityQuestionsData
				.filter(({ id }) => values[id])
				.map(({ id, }) => {
					return {
						id,
						answer: values[id]
					};
				});

			switch (passwordType) {
				case LOGIN:
					updateUserLoginPasswordViaSecurityQuestionsAction(newPassword, confirmedPassword, securityQuestionAnswers);
					break;
				case FUNDS:
					updateUserFundsPasswordViaSecurityQuestionsAction(newPassword, confirmedPassword, securityQuestionAnswers);
					break;
				case BET:
					updateUserBetPasswordViaSecurityQuestionsAction(newPassword, confirmedPassword, securityQuestionAnswers);
					break;

				default:
					break;
			}
		} else if (resetMethod === GOOGLE_TOTP) {
			const { totp, } = values;

			switch (passwordType) {
				case LOGIN:
					updateUserLoginPasswordViaGoogleTotpAction(newPassword, confirmedPassword, totp);
					break;
				case FUNDS:
					updateUserFundsPasswordViaGoogleTotpAction(newPassword, confirmedPassword, totp);
					break;
				case BET:
					updateUserBetPasswordViaGoogleTotpAction(newPassword, confirmedPassword, totp);
					break;

				default:
					break;
			}
		}
		_handleCloseModal();
	}
	function _handleClickButton() {
		if (isBothDisable) {
			setMessageVisible(true);
		} else {
			setVisible(true);
		}
	}
	function _handleCloseModal() {
		setVisible(false);
	}
	return (
		<React.Fragment>
			<Button
				outline={Button.OutlineEnums.HOLLOW}
				onClick={_handleClickButton}
			>重置密碼</Button>
			<ResetPasswordModal
				isVisible={isVisible}
				onClose={_handleCloseModal}
				onSubmit={_handleSubmit}
				securityQuestions={userSecurityQuestionsData}
				isSecurityQuestionEnable={isSecurityQuestionEnable}
				isGoogleTotpEnable={isGoogleTotpEnable}
			/>
			<MessageModal
				title="通知"
				message={<div>请设置安全密码或谷歌认证，<br/>才能使用重置密码</div>}
				isVisible={isMessageVisivle}
				onClickOk={() => setMessageVisible(false)}
				isHideCancelButton
				isCentered
			/>
		</React.Fragment>
	);
}

ResetPasswordButton.propTypes = propTypes;

function mapStateToProps(state) {
	const { userSecurity, } = state;

	return {
		userSecurityQuestionsData: userSecurity.getIn(['data', 'securityQuestions']),
		userGoogleTotpDate: userSecurity.getIn(['data', 'totp']),
	};
}
function mapDispatchToProps(dispatch) {
	return {
		updateUserLoginPasswordViaSecurityQuestionsAction: (newPassword, confirmedPassword, securityQuestionAnswers) => {
			dispatch(updateUserLoginPasswordViaSecurityQuestionsAction(newPassword, confirmedPassword, securityQuestionAnswers));
		},
		updateUserFundsPasswordViaSecurityQuestionsAction: (newPassword, confirmedPassword, securityQuestionAnswers) => {
			dispatch(updateUserFundsPasswordViaSecurityQuestionsAction(newPassword, confirmedPassword, securityQuestionAnswers));
		},
		updateUserBetPasswordViaSecurityQuestionsAction: (newPassword, confirmedPassword, securityQuestionAnswers) => {
			dispatch(updateUserBetPasswordViaSecurityQuestionsAction(newPassword, confirmedPassword, securityQuestionAnswers));
		},
		updateUserLoginPasswordViaGoogleTotpAction: (newPassword, confirmedPassword, totp) => {
			dispatch(updateUserLoginPasswordViaGoogleTotpAction(newPassword, confirmedPassword, totp));
		},
		updateUserFundsPasswordViaGoogleTotpAction: (newPassword, confirmedPassword, totp) => {
			dispatch(updateUserFundsPasswordViaGoogleTotpAction(newPassword, confirmedPassword, totp));
		},
		updateUserBetPasswordViaGoogleTotpAction: (newPassword, confirmedPassword, totp) => {
			dispatch(updateUserBetPasswordViaGoogleTotpAction(newPassword, confirmedPassword, totp));
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordButton);
