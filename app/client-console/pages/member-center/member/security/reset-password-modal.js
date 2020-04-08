import React, { useState, useRef, useEffect, } from 'react';
import PropTypes from 'prop-types';
import SubmitFormModal from '../../../../components/submit-form-modal';
import {
	Input,
	RadioGroup,
	Form,
	FormItem,
	LabelContent,
} from 'ljit-react-components';
import { validatePassword, } from '../../../../../lib/form-validation-utils';
import { sampleSize, } from 'lodash';

const PasswordTypesEnum = {
	LOGIN: 0,
	FUNDS: 1,
	BET: 2,
};
const ResetMethodsEnum = {
	SECURITY_QUESTIONS: 0,
	GOOGLE_TOTP: 1
};
const { LOGIN, FUNDS, BET, } = PasswordTypesEnum;
const { SECURITY_QUESTIONS, GOOGLE_TOTP, } = ResetMethodsEnum;
const AT_LEAST_ANSWER_LIMIT = 2;

const propTypes = {
	isVisible: PropTypes.bool,
	onClose: PropTypes.func,
	onSubmit: PropTypes.func,
	securityQuestions: PropTypes.array,
	isSecurityQuestionEnable: PropTypes.bool,
	isGoogleTotpEnable: PropTypes.bool,
};

const defaultProps = {
	onClose: () => {},
	onSubmit: () => {},
	securityQuestions: [],
};

function ResetPasswordModal({
	isVisible,
	onClose,
	onSubmit,
	securityQuestions,
	isSecurityQuestionEnable,
	isGoogleTotpEnable,
}) {
	const formInstance = useRef(null);
	const [resetMethod, setResetMethod] = useState(SECURITY_QUESTIONS);

	useEffect(() => {
		if (!isSecurityQuestionEnable) {
			setResetMethod(GOOGLE_TOTP);
		} else if (!isGoogleTotpEnable) {
			setResetMethod(SECURITY_QUESTIONS);
		}
	}, [isSecurityQuestionEnable, isGoogleTotpEnable]);

	function _handleSubmit() {
		const form = formInstance.current.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				onSubmit({ ...values, resetMethod, });
				form.resetFields();
			}
		});
	}
	function _handleClose() {
		const form = formInstance.current.getForm();

		form.resetFields();
		onClose();
	}

	function _renderSecurityQuestions() {
		return sampleSize(securityQuestions, AT_LEAST_ANSWER_LIMIT)
			.map(({ id, name, }, index) => {
				return (
					<FormItem
						key={id}
						label={`安全问题${index+1}: ${name}`}
						itemName={`${id}`}
						labelColon={false}
						itemConfig={{
							rules: [
								{
									required: true,
									message: '请输入安全问题答案',
								}, {
									max: 32,
									message: '安全问题最多32码'
								},
							],
						}}
					>
						<Input
							placeholder="请输入答案"
						/>
					</FormItem>
				);
			});
	}
	function _renderGoogleAuth() {
		return (
			<FormItem
				label="谷歌6位动态密码"
				itemName="totp"
				labelColon={false}
			>
				<Input
					placeholder="请输入动态密码"
				/>
			</FormItem>
		);
	}
	function _getResetMethodOptions() {
		const securityQuestionsOption = { label: '安全问题', value: SECURITY_QUESTIONS, };
		const googleTotpOption = { label: '谷歌認證', value: GOOGLE_TOTP, };
		const resetMethodOption = [];

		if (isSecurityQuestionEnable) {
			resetMethodOption.push(securityQuestionsOption);
		}
		if (isGoogleTotpEnable) {
			resetMethodOption.push(googleTotpOption);
		}

		return resetMethodOption;
	}

	return (
		<SubmitFormModal
			title="重置密碼"
			width="440px"
			isVisible={isVisible}
			onClickCancel={_handleClose}
			onClickOk={_handleSubmit}
		>
			<Form
				cancelButtonDisabled
				submitButtonDisabled
				ref={formInstance}
			>
				<div className="reset-password-modal__content">
					<LabelContent
						label="重置方式"
						labelColon={false}
					>
						<RadioGroup
							value={resetMethod}
							options={_getResetMethodOptions()}
							onChange={(event) => {setResetMethod(event.target.value);}}
						/>
					</LabelContent>
					<FormItem
						label="密码类型"
						itemName="passwordType"
						labelColon={false}
						itemConfig={{
							initialValue: LOGIN,
						}}
					>
						<RadioGroup
							options={[
								{ label: '登录密码', value: LOGIN, },
								{ label: '資金密码', value: FUNDS, },
								{ label: '投注密码', value: BET, },
							]}
						/>
					</FormItem>
					{
						resetMethod === SECURITY_QUESTIONS ? _renderSecurityQuestions() : _renderGoogleAuth()
					}
					<FormItem
						label="重置密码"
						itemName="newPassword"
						labelColon={false}
						itemConfig={{
							initialValue: '',
							rules: [
								{
									required: true,
									validator: validatePassword('密码')
								},
							],
						}}
					>
						<Input
							type="password"
							placeholder="请输入密码"
						/>
					</FormItem>
					<FormItem
						label="确认密码"
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
						<Input
							type="password"
							placeholder="请输入密码"
						/>
					</FormItem>
				</div>
			</Form>
		</SubmitFormModal>
	);
}

ResetPasswordModal.propTypes = propTypes;
ResetPasswordModal.defaultProps = defaultProps;
ResetPasswordModal.PasswordTypesEnum = PasswordTypesEnum;
ResetPasswordModal.ResetMethodsEnum = ResetMethodsEnum;

export default ResetPasswordModal;
