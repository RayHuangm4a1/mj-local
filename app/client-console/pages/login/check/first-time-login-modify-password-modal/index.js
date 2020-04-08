import React, { useRef, } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Input,
} from 'ljit-react-components';
import SubmitFormModal from '../../../../components/submit-form-modal';

const propTypes = {
	isVisible: PropTypes.bool,
	onClickCancel: PropTypes.func,
	onClickOk: PropTypes.func,
};
const defaultProps = {
	isVisible: false,
	onClickCancel: () => {},
	onClickOk: () => {},
};

function FirstTimeLoginModifyPasswordModal({
	isVisible,
	onClickCancel,
	onClickOk,
}) {
	const formInstance = useRef(null);
	const _handleClickOk = () => {
		const form = formInstance.current.getForm();

		form.validateFields((err, values) => {
			if (!err) {
				onClickOk(values);
				form.resetFields();
			}
		});
	};

	return (
		<SubmitFormModal
			title="初次登录请先修改登录密码"
			className="first-time-login-modify-password-modal"
			isVisible={isVisible}
			onClickCancel={onClickCancel}
			onClickOk={_handleClickOk}
		>
			<Form
				ref={formInstance}
				cancelButtonDisabled
				submitButtonDisabled
			>
				<FormItem
					label="原始密码"
					itemName="password"
					className="original-password"
					labelColon={false}
				>
					<Input type="password" />
				</FormItem>
				<FormItem
					label="新的密码"
					itemName="newPassword"
					className="new-password"
					labelColon={false}
					itemConfig={{
						rules: [
							{
								required: true,
								message: '新的密码不能为空',
							},
						],
					}}
				>
					<Input
						placeholder="请输入密码"
						type="password"
					/>
				</FormItem>
				<FormItem
					label="重复密码"
					itemName="confirmedPassword"
					className="confirm-password"
					labelColon={false}
					itemConfig={{
						validateTrigger: 'onSubmit',
						rules: [
							{
								required: true,
								message: '重复密码不能为空',
							},
							{
								validator: (rule, value, callback) => {
									const form = formInstance.current.getForm();

									if (value && value !== form.getFieldValue('newPassword')) {
										callback('重复密码與新的密码不一致');
									}
									callback();
								},
							},
						],
					}}
				>
					<Input
						placeholder="请输入密码"
						type="password"
					/>
				</FormItem>
			</Form>
		</SubmitFormModal>
	);
}

FirstTimeLoginModifyPasswordModal.propTypes = propTypes;
FirstTimeLoginModifyPasswordModal.defaultProps = defaultProps;

export default FirstTimeLoginModifyPasswordModal;
