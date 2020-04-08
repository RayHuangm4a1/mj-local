import React, { useState, } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'ljit-react-components';
import BindPasswordModal from '../bind-password-modal';
import FundsPasswordChecker from '../../../../../features/funds-password-checker';

const propTypes = {
	onSubmit: PropTypes.func,
};

const defaultProps = {
	onSubmit: () => {},
};

function WechatButton({ onSubmit }) {
	const [ isVisible, setVisible ] = useState(false);

	function _handleSubmit(value) {
		// TODO Post API
		console.log(value);
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
			>綁定</Button>
			<FundsPasswordChecker
				isVisible={isVisible}
				onClose={_handleCloseModal}
			>
				<BindPasswordModal
					title={'微信綁定'}
					inputLabel={'资金密码'}
					placeholder={'请输入资金密码'}
					isVisible={isVisible}
					onSubmit={_handleSubmit}
					onClose={_handleCloseModal}
				/>
			</FundsPasswordChecker>
		</React.Fragment>
	);
}

WechatButton.propTypes = propTypes;
WechatButton.defaultProps = defaultProps;

export default WechatButton;
