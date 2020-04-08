import React, { useState, } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'ljit-react-components';
import ModifyPasswordModal from '../modify-password-modal';
import { connect } from 'ljit-store-connecter';
import { userSecurityActions, } from '../../../../../controller';

const {
	updateUserBetPasswordAction,
} = userSecurityActions;

const propTypes = {
	updateUserBetPasswordAction: PropTypes.func,
};

function ModifyBettingPasswordButton({
	updateUserBetPasswordAction = () => {},
}) {
	const [ isVisible, setVisible ] = useState(false);

	function _handleSubmit(value) {
		const { password, newPassword, confirmedPassword, } = value;

		updateUserBetPasswordAction(password, newPassword, confirmedPassword);
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
				title={'投注密码'}
				isVisible={isVisible}
				onClose={_handleCloseModal}
				onSubmit={_handleSubmit}
			/>
		</React.Fragment>
	);
}

ModifyBettingPasswordButton.propTypes = propTypes;

function mapStateToProps(state) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {
		updateUserBetPasswordAction: (...args) => dispatch(updateUserBetPasswordAction(...args)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ModifyBettingPasswordButton);
