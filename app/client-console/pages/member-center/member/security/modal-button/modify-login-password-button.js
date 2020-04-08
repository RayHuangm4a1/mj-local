import React, { useState, } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'ljit-react-components';
import ModifyPasswordModal from '../modify-password-modal';
import { connect } from 'ljit-store-connecter';
import { userSecurityActions, } from '../../../../../controller';

const {
	updateUserLoginPasswordAction,
} = userSecurityActions;

const propTypes = {
	updateUserLoginPasswordAction: PropTypes.func,
};

function ModifyLoginPasswordButton({
	updateUserLoginPasswordAction = () => {},
}) {
	const [ isVisible, setVisible ] = useState(false);

	function _handleSubmit(value) {
		const { password, newPassword, confirmedPassword, } = value;

		updateUserLoginPasswordAction(password, newPassword, confirmedPassword);
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
			>设定</Button>
			<ModifyPasswordModal
				title={'登录密码'}
				isVisible={isVisible}
				isPasswordRequired
				onClose={_handleCloseModal}
				onSubmit={_handleSubmit}
			/>
		</React.Fragment>
	);
}

ModifyLoginPasswordButton.propTypes = propTypes;

function mapStateToProps(state) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {
		updateUserLoginPasswordAction: (...args) => dispatch(updateUserLoginPasswordAction(...args)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ModifyLoginPasswordButton);
