import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import { sampleSize, } from 'lodash';
import {
	Form,
	FormItem,
	RadioGroup,
	Input,
	Button,
} from 'ljit-react-components';
import SubmitFormModal from '../../../../components/submit-form-modal';
import { ResetTypeEnums, } from '../utils';
import './style.styl';

const propTypes = {
	passwordResetMethods: PropTypes.shape({
		SECURITY_QUESTIONS: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.number,
			question: PropTypes.string,
		})),
		GOOGLE_TOTP: PropTypes.bool,
	}).isRequired,
	loginType: PropTypes.string,
	isModalVisible: PropTypes.bool,
	onCancel: PropTypes.func,
	onClickOk: PropTypes.func,
};
const defaultProps = {
	isModalVisible: false,
	passwordResetMethods: {},
	onCancel: () => {},
	onClickOk: () => {},
};

const {
	SECURITY_QUESTIONS,
	GOOGLE_TOTP,
} = ResetTypeEnums;

const OptionsMap = {
	[SECURITY_QUESTIONS]: {
		key: 'security-questions',
		label: '安全问题',
		value: SECURITY_QUESTIONS,
	},
	[GOOGLE_TOTP]: {
		key: 'google-totp',
		label: '谷歌认证',
		value: GOOGLE_TOTP,
	},
};
const PREFIX_CLASS = 'reset-password-modal';
const DEFAULT_METHODS_MESSAGE = '未设置安全问题及谷歌认证，请洽客服进行密码重置。';
const AT_LEAST_ANSWER_LIMIT = 2;

class ResetPasswordModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loginType: props.loginType,
			resetType: '',
		};

		this._handleSubmitForm = this._handleSubmitForm.bind(this);
		this._handleClickCancel = this._handleClickCancel.bind(this);
		this._renderQuestionResetFormItems = this._renderQuestionResetFormItems.bind(this);
		this._renderFormContent = this._renderFormContent.bind(this);
		this._renderOptions = this._renderOptions.bind(this);
		this._renderFooterContent = this._renderFooterContent.bind(this);
	}

	_handleSubmitForm(e) {
		e.preventDefault();

		const { onClickOk, } = this.props;
		const form = this.formInstance.getForm();

		form.validateFields((err, values) => {
			if (!err) {
				onClickOk(values);
				form.resetFields();
			}
		});
	}

	_handleClickCancel() {
		const { onCancel, } = this.props;
		const form = this.formInstance.getForm();

		onCancel();

		form.resetFields();
	}

	_renderQuestionResetFormItems() {
		const { passwordResetMethods, } = this.props;
		const fields = sampleSize(passwordResetMethods[SECURITY_QUESTIONS], AT_LEAST_ANSWER_LIMIT);
		const itemConfig = {
			rules: [{
				required: true,
				message: '答案不能为空',
			},],
		};

		if (fields.length > 0) {
			return (
				<React.Fragment>
					{fields.map((field, index) => (
						<FormItem
							label={`安全问题${index + 1}：${field.question}`}
							key={`question${field.id}`}
							itemName={`question${field.id}`}
							itemConfig={itemConfig}
						>
							<Input placeholder="请输入答案"/>
						</FormItem>
					))}
					<FormItem
						label="重置密码"
						key="newPassword"
						itemName="newPassword"
						itemConfig={{
							rules: [ {
								required: true,
								message: '密码不能为空',
							},],
						}}
					>
						<Input type="password" placeholder="请输入密码"/>
					</FormItem>
				</React.Fragment>
			);
		}
	}

	_renderGoogleResetFormItems() {
		return (
			<Fragment>
				<FormItem
					label="谷歌6位动态密码"
					key="totp"
					itemName="totp"
					itemConfig={{
						rules: [{
							required: true,
							message: '动态密码不能为空',
						},],
					}}
				>
					<Input placeholder="请输入动态密码"/>
				</FormItem>
				<FormItem
					style={{ marginBottom: '40px', }}
					label="重置密码"
					key="newPassword"
					itemName="newPassword"
					itemConfig={{
						rules: [{
							required: true,
							message: '密码不能为空',
						},],
					}}
				>
					<Input type="password" placeholder="请输入密码"/>
				</FormItem>
			</Fragment>
		);
	}

	_renderFormContent() {
		const { resetType, } = this.state;
		const {
			_renderQuestionResetFormItems,
			_renderGoogleResetFormItems,
			_renderOptions,
		} = this;
		const options = _renderOptions();
		const optionsField = (
			<FormItem
				label="重置方式"
				key="type"
				itemName="type"
				itemConfig={{
					initialValue: options[0] ? options[0].key : null,
					rules: [{
						required: true,
						message: '重置方式不能为空',
					},],
				}}
			>
				<RadioGroup
					options={options}
					onChange={e => this.setState({ resetType: e.target.value, })}
				/>
			</FormItem>
		);

		switch (resetType) {
			case SECURITY_QUESTIONS:
				return (
					<Fragment>
						{optionsField}
						{_renderQuestionResetFormItems()}
					</Fragment>
				);
			case GOOGLE_TOTP:
				return (
					<Fragment>
						{optionsField}
						{_renderGoogleResetFormItems()}
					</Fragment>
				);
			default:
				return (
					<div className={`${PREFIX_CLASS}__methods-message`}>{DEFAULT_METHODS_MESSAGE}</div>
				);
		}
	}

	_renderOptions() {
		const { passwordResetMethods, } = this.props;
		let options = [];

		if (passwordResetMethods[SECURITY_QUESTIONS]
			&& passwordResetMethods[SECURITY_QUESTIONS].length > 0
		) {
			options.push(OptionsMap[SECURITY_QUESTIONS]);
		}
		if (passwordResetMethods[GOOGLE_TOTP]) {
			options.push(OptionsMap[GOOGLE_TOTP]);
		}

		return options || [];
	}

	_renderFooterContent() {
		const { resetType, } = this.state;
		const {
			_handleClickCancel,
			_handleSubmitForm,
		} = this;

		if (resetType === null) {
			return (
				<Fragment>
					<Button onClick={_handleClickCancel}>
						确定
					</Button>
				</Fragment>
			);
		} else {
			return (
				<Fragment>
					<Button
						onClick={_handleClickCancel}
						outline={Button.OutlineEnums.HOLLOW}
					>
						取消
					</Button>
					<Button
						onClick={_handleSubmitForm}
						outline={Button.OutlineEnums.SOLID}
					>
						确定
					</Button>
				</Fragment>
			);
		}

	}

	render() {
		const { isModalVisible, } = this.props;
		const {
			_handleClickCancel,
			_handleSubmitForm,
			_renderFormContent,
			_renderFooterContent,
		} = this;
		const footerContent = _renderFooterContent();

		return (
			<SubmitFormModal
				title="重置密码"
				className={PREFIX_CLASS}
				width="440px"
				isVisible={isModalVisible}
				onClickCancel={_handleClickCancel}
				onClickOk={_handleSubmitForm}
				footer={footerContent}
			>
				<Form
					ref={(refForm) => this.formInstance = refForm}
					cancelButtonDisabled
					submitButtonDisabled
				>
					{_renderFormContent()}
				</Form>
			</SubmitFormModal>
		);
	}

	componentDidUpdate(prevProps) {
		const {
			loginType,
			passwordResetMethods,
		} = this.props;

		if (prevProps.loginType !== loginType) {
			this.setState({ loginType, });
		}

		if (prevProps.passwordResetMethods !== passwordResetMethods) {	
			const defaultOption = this._renderOptions()[0];
			const type = defaultOption ? defaultOption.key : null;

			this.setState({
				resetType: type,
			});
		}
	}
}

ResetPasswordModal.propTypes = propTypes;
ResetPasswordModal.defaultProps = defaultProps;

export default ResetPasswordModal;
