import React from 'react';
import PropTypes from 'prop-types';
import SubmitFormModal from '../../../../components/submit-form-modal';

const propTypes = {
	isVisible: PropTypes.bool,
	onClose: PropTypes.func,
	title: PropTypes.string,
};

const defaultProps = {
	onClose: () => {},
};

function QRCodeModal({ isVisible, onClose, title, }) {
	return (
		<SubmitFormModal
			width="440px"
			title={title}
			isVisible={isVisible}
			onClickCancel={onClose}
			cancelText="关 闭"
			className="qr-code-modal"
		>
			<div className="qr-code-modal__content">
				<p>TODO UES QR Code</p>
			</div>
		</SubmitFormModal>
	);
}

QRCodeModal.propTypes = propTypes;
QRCodeModal.defaultProps = defaultProps;

export default QRCodeModal;
