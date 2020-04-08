import React from 'react';
import SubmitFormModal from '../../../../components/submit-form-modal';
import PropTypes from 'prop-types';

const propTypes = {
	isVisable: PropTypes.bool,
	onClickCancel: PropTypes.func,
	onClickOk: PropTypes.func,
};

const defaultProps = {
	onClickCancel: () => {},
	onClickOk: () => {},
};

function QRCodeModal({ isVisable, onClickCancel, onClickOk }) {
	return (
		<SubmitFormModal
			isVisible={isVisable}
			title="微信扫描"
			onClickCancel={onClickCancel}
			onClickOk={onClickOk}
			className="ljit-qr-code-modal"
			okText="关闭"
		>
			<div className="ljit-qr-code-modal__content">
				{/*TODO add QR code */}
				<p>请将二维码发给用户，用户使用微信扫一扫后即可自动注册。</p>
				<p>【 步骤：请在微信中 &gt; 发现 &gt; 扫一扫自动注册 】</p>
			</div>
		</SubmitFormModal>
	);
}

QRCodeModal.propTypes = propTypes;
QRCodeModal.defaultProps =defaultProps;

export default QRCodeModal;
