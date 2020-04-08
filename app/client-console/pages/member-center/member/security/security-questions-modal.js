import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {
	Input,
	Form,
	FormItem
} from 'ljit-react-components';
import SelectDropdown from '../../../../components/select-dropdown';
import SubmitFormModal from '../../../../components/submit-form-modal';

const propTypes = {
	isVisible: PropTypes.bool,
	onClose: PropTypes.func,
	onSubmit: PropTypes.func,
	securityQuestionData: ImmutablePropTypes.list.isRequired,
	isPasswordError: PropTypes.bool,
	onChangePassword: PropTypes.func,
};

const defaultProps = {
	onClose: () => {},
	onSubmit: () => {},
	onChangePassword: () => {},
};

function SecurityQuestionsModal({
	isVisible,
	onClose,
	onSubmit,
	securityQuestionData,
	isPasswordError,
	onChangePassword,
}) {
	const formInstance = useRef(null);

	useEffect(() => {
		if (formInstance.current && isVisible) {
			const form = formInstance.current.getForm();

			form.validateFields(['password'], { force: true, });
		}
	}, [isPasswordError]);

	const securityQuestionsOptions = securityQuestionData.map(item => {
		return {
			label: item.name,
			value: item.id
		};
	}).toArray();

	const [ option1 = {} , option2 = {}, option3 = {} ] = securityQuestionsOptions;

	const passwordVerificationRules = [{
		required: true,
		message: '资金密码不能为空'
	},{
		validator: (rule, value, callback) => {
			if (isPasswordError) {
				callback('资金密码输入错误');
			}
			callback();
		}
	}];

	const selectedVerificationRules = [{
		required: true,
		message: '安全问题不能为空'
	},{
		validator: (rule, value, callback) => {
			if (_handleCheckRepeatSecurityQuestion()) {
				callback('安全问题不能重复');
			}
			callback();
		},
	}];

	const inputVerificationRules = [
		{
			required: true,
			message: '安全问题答案不能为空',
		},
		{
			max: 32,
			message: '安全问题答案不能超過 32 個字',
		}
	];

	const _handleCheckRepeatSecurityQuestion = () => { 
		const form = formInstance.current.getForm();

		const securityQuestion1 = form.getFieldValue('securityQuestion1');
		const securityQuestion2 = form.getFieldValue('securityQuestion2');
		const securityQuestion3 = form.getFieldValue('securityQuestion3');
		const isRepeat = (
			securityQuestion1 === securityQuestion2 ||
			securityQuestion2 === securityQuestion3 ||
			securityQuestion3 === securityQuestion1
		);

		return isRepeat;
	};

	const _handleSubmit = (event) => {
		event.preventDefault();
		const form = formInstance.current.getForm();

		form.validateFields((err, value) => {
			if (!err) {
				const data = {
					password: value.password,
					data: [{
						id: value.securityQuestion1,
						answer: value.securityAnswer1,
					},{
						id: value.securityQuestion2,
						answer: value.securityAnswer2,
					},{
						id: value.securityQuestion3,
						answer: value.securityAnswer3,
					},],
				};

				onSubmit(data);
			}
		});
	};
	const _handleClose = () => {
		const form = formInstance.current.getForm();

		form.resetFields();
		onClose();
	};


	return (
		<SubmitFormModal
			title="安全問題"
			width="440px"
			isVisible={isVisible}
			onClickCancel={_handleClose}
			onClickOk={_handleSubmit}
		>
			<div className="security-questions-modal__content">
				<Form
					ref={formInstance}
					cancelButtonDisabled
					submitButtonDisabled
				>
					<FormItem
						label="资金密码"
						labelColon={false}
						itemName="password"
						itemConfig={{
							initialValue: null,
							rules: passwordVerificationRules,
						}}
					>
						<Input
							type="password"
							placeholder="请输入资金密码"
							onChange={onChangePassword}
						/>
					</FormItem>
					<FormItem
						label="安全问题1"
						labelColon={false}
						itemName="securityQuestion1"
						itemConfig={{
							initialValue: option1.value,
							rules: selectedVerificationRules,
						}}
					>
						<SelectDropdown
							options={securityQuestionsOptions}
						/>
					</FormItem>
					<FormItem
						label="安全问题答案1"
						labelColon={false}
						itemName="securityAnswer1"
						itemConfig={{
							rules: inputVerificationRules,
						}}
					>
						<Input
							placeholder="请输入安全问题答案"
						/>
					</FormItem>
					<FormItem
						label="安全问题2"
						labelColon={false}
						itemName="securityQuestion2"
						itemConfig={{
							initialValue: option2.value,
							rules: selectedVerificationRules,
						}}
					>
						<SelectDropdown
							options={securityQuestionsOptions}
						/>
					</FormItem>
					<FormItem
						label="安全问题答案2"
						labelColon={false}
						itemName="securityAnswer2"
						itemConfig={{
							initialValue: null,
							rules: inputVerificationRules
						}}
					>
						<Input
							placeholder="请输入安全问题答案"
						/>
					</FormItem>
					<FormItem
						label="安全问题3"
						labelColon={false}
						itemName="securityQuestion3"
						itemConfig={{
							initialValue: option3.value,
							rules: selectedVerificationRules,
						}}
					>
						<SelectDropdown
							options={securityQuestionsOptions}
						/>
					</FormItem>
					<FormItem
						label="安全问题答案3"
						labelColon={false}
						itemName="securityAnswer3"
						itemConfig={{
							initialValue: null,
							rules: inputVerificationRules
						}}
					>
						<Input
							placeholder="请输入安全问题答案"
						/>
					</FormItem>
					
				</Form>
			</div>
		</SubmitFormModal>
	);
}

SecurityQuestionsModal.propTypes = propTypes;
SecurityQuestionsModal.defaultProps = defaultProps;

export default SecurityQuestionsModal;
