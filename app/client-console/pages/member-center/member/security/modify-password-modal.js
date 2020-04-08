import React, { useRef, } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Input,
} from 'ljit-react-components';
import SubmitFormModal from '../../../../components/submit-form-modal';
import { validatePassword, } from '../../../../../lib/form-validation-utils';

const propTypes = {
	isVisible: PropTypes.bool,
	isPasswordRequired: PropTypes.bool,
	onClose: PropTypes.func,
	onSubmit: PropTypes.func,
	title: PropTypes.string,
};

const defaultProps = {
	isPasswordRequired: false,
	onClose: () => {},
	onSubmit: () => {},
};

function ModifyPasswordModal({ isVisible, isPasswordRequired, onClose, onSubmit, title }) {
	const formInstance = useRef(null);

	function _handleSubmit(event) {
		event.preventDefault();
		const form = formInstance.current.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				onSubmit(values);
				_handleInitValue();
			}
		});
	}
	function _handleInitValue() {
		const form = formInstance.current.getForm();

		form.resetFields();
	}
	function _handleCloseModal() {
		_handleInitValue();
		onClose();
	}

	return (
		<SubmitFormModal
			title={`修改${title}`}
			width="440px"
			isVisible={isVisible}
			onClickCancel={_handleCloseModal}
			onClickOk={_handleSubmit}
		>
			<Form
				cancelButtonDisabled
				submitButtonDisabled
				ref={formInstance}
			>
				<div className="modify-password-modal__content">
					<FormItem
						label="原始密码（未设置时请保留为空）"
						itemName="password"
						labelColon={false}
						itemConfig={{
							initialValue: '',
							rules: [
								{
									required: isPasswordRequired,
									validator: validatePassword(title),
								},
							],
						}}
					>
						<Input type="password"/>
					</FormItem>
					<FormItem
						label="新的密码"
						itemName="newPassword"
						labelColon={false}
						itemConfig={{
							initialValue: '',
							rules: [
								{
									required: true,
									validator: validatePassword(title)
								},
							],
						}}
					>
						<Input type="password" placeholder="请输入密码"/>
					</FormItem>
					<FormItem
						label="重复密码"
						itemName="confirmedPassword"
						labelColon={false}
						itemConfig={{
							initialValue: '',
							rules: [
								{
									required: true,
									validator: (rule, value, callback) => {
										const form = formInstance.current.getForm();

										if (value && value !== form.getFieldValue('newPassword')) {
											callback('请重复新的密码');
										} else {
											callback();
										}
									}
								},
							],
						}}
					>
						<Input type="password" placeholder="请输入密码"/>
					</FormItem>
				</div>
			</Form>
		</SubmitFormModal>
	);
}

ModifyPasswordModal.propTypes = propTypes;
ModifyPasswordModal.defaultProps = defaultProps;

export default ModifyPasswordModal;
