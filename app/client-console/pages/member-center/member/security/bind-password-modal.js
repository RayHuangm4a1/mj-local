import React, { useState, } from 'react';
import PropTypes from 'prop-types';
import SubmitFormModal from '../../../../components/submit-form-modal';
import { Input } from 'ljit-react-components';

const propTypes = {
	isVisible: PropTypes.bool,
	onClose: PropTypes.func,
	onSubmit: PropTypes.func,
	title: PropTypes.string,
	inputLabel: PropTypes.string,
	placeholder: PropTypes.string,
};

const defaultProps = {
	onClose: () => {},
	onSubmit: () => {},
};

function BindPasswordModal({ isVisible, onClose, onSubmit, title, inputLabel, placeholder }) {
	const [inputValue, setInputValue] = useState('');

	function _handleClickOk() {
		onSubmit(inputValue);
	}
	return (
		<SubmitFormModal
			width="440px"
			title={title}
			isVisible={isVisible}
			onClickCancel={onClose}
			onClickOk={_handleClickOk}
		>
			<div className="bind-password-modal__content">
				<p>{inputLabel}</p>
				<Input
					value={inputValue}
					onChange={(event) => {setInputValue(event.target.value);}}
					placeholder={placeholder}
				/>
			</div>
		</SubmitFormModal>
	);
}

BindPasswordModal.propTypes = propTypes;
BindPasswordModal.defaultProps = defaultProps;

export default BindPasswordModal;
