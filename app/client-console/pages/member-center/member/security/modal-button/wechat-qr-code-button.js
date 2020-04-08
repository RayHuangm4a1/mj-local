import React, { useState, } from 'react';
import { Button } from 'ljit-react-components';
import QRCodeModal from '../qr-code-modal';

function WechatQRCodeButton() {
	const [ isVisible, setVisible ] = useState(false);

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
			>扫码验证</Button>
			<QRCodeModal
				title={'微信綁定'}
				isVisible={isVisible}
				onClose={_handleCloseModal}
			/>
		</React.Fragment>
	);
}

export default WechatQRCodeButton;
