import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Input,
	Select,
	InputTextarea,
	Modal,
	RadioGroup,
	TextButton,
	LabelContent,
} from 'ljit-react-components';
import PageModal from '../../../../components/page-modal';
import { UserStatusEnum, userStaffPropTypes, staffRolesPropTypes, } from './utils';
import { validatePassword, validateUsername, } from '../../../../../lib/form-validation-utils';

const {
	BLOCKED,
	ACTIVE,
} = UserStatusEnum;

const propTypes = {
	isModalVisible: PropTypes.bool,
	isEditing: PropTypes.bool,
	onSubmit: PropTypes.func,
	onCancel: PropTypes.func,
	accountData: userStaffPropTypes,
	staffRoles: staffRolesPropTypes,
};

const defaultProps = {
	isModalVisible: false,
	isEditing: false,
	onSubmit: () => {},
	onCancel: () => {},
	accountData: {},
	staffRoles: [],
};

class AdminAccountFormModal extends Component {
	constructor () {
		super();

		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleCancelConfirm = this._handleCancelConfirm.bind(this);
		this._handleUnBindGoogleValidation = this._handleUnBindGoogleValidation.bind(this);
		this._renderPasswordItem = this._renderPasswordItem.bind(this);
		this._renderBlockedUsernameItem = this._renderBlockedUsernameItem.bind(this);
		this._renderGoogleVerificationItem = this._renderGoogleVerificationItem.bind(this);
	}

	_handleSubmit() {
		const form = this.formInstance.getForm();
		const { onSubmit, } = this.props;

		form.validateFields((error, values) => {
			if (!error) {
				onSubmit(values);
				form.resetFields();
			}
		});
	}
	_handleCancelConfirm() {
		const form = this.formInstance.getForm();
		const { onCancel, } = this.props;

		onCancel();
		form.resetFields();
	}
	_renderPasswordItem() {
		const { isEditing, } = this.props;

		if (isEditing) {
			return null;
		}
		return (
			<FormItem
				itemName="password"
				label="密码"
				columnType={FormItem.ColumnTypeEnums.MEDIUM}
				itemConfig={{
					rules: [
						{
							required: true,
							validator: validatePassword('密码')
						},
					],
				}}
			>
				<Input />
			</FormItem>
		);
	}
	_renderBlockedUsernameItem() {
		const { accountData } = this.props;
		const { status } = accountData;

		return (
			<FormItem
				itemName="status"
				label="状态"
				columnType={FormItem.ColumnTypeEnums.MEDIUM}
				itemConfig={{
					initialValue: status,
				}}
			>
				<RadioGroup
					options={[
						{ label: '启用', value: ACTIVE },
						{ label: '禁用', value: BLOCKED },
					]}
				/>
			</FormItem>
		);
	}
	_handleUnBindGoogleValidation() {
		// TODO: send un bind google validation api
	}
	_renderGoogleVerificationItem() {
		const { accountData } = this.props;
		const { account: { totp: { isEnabled, } = {} } = {}, } = accountData;
		const { _handleUnBindGoogleValidation, } = this;
		let field;

		if (isEnabled) {
			field = (
				<TextButton
					text="解除綁定"
					onClick={_handleUnBindGoogleValidation}
				/>
			);
		} else {
			field = (
				<div>无绑定谷歌身份验证</div>
			);
		}

		return (
			<LabelContent
				label="谷歌验证"
				columnType={LabelContent.ColumnTypeEnums.MEDIUM}
			>
				{field}
			</LabelContent>
		);
	}
	render() {
		const {
			isModalVisible,
			isEditing,
			accountData,
			staffRoles,
		} = this.props;
		const {
			_handleSubmit,
			_handleCancelConfirm,
			_renderPasswordItem,
			_renderBlockedUsernameItem,
			_renderGoogleVerificationItem,
		} = this;
		const { username, description, role = {} } = accountData;

		const modalTitle = isEditing ? "修改管理员资料" : "新增管理员";
		const usernameInitialValue = isEditing ? username : null;
		const authGroupNameInitialValue = isEditing ? role.id : null;
		const commentInitialValue = isEditing ? description : null;
		const blockedUsernameItem = isEditing ? _renderBlockedUsernameItem() : null;
		const googleVerificationItem = isEditing ? _renderGoogleVerificationItem() : null;
		const codeOption = staffRoles.map(role => ({ label: role.name, value: role.id }));

		return (
			<PageModal
				visible={isModalVisible}
				title={modalTitle}
				onClickOk={_handleSubmit}
				onClickCancel={_handleCancelConfirm}
				modalSize={Modal.ModalSizeEnum.MEDIUM}
				className="admin-form-modal"
			>
				<Form
					ref={formRef => this.formInstance = formRef}
					submitButtonDisabled
					cancelButtonDisabled
				>
					<FormItem
						itemName="username"
						label="帐号"
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
						itemConfig={{
							initialValue: usernameInitialValue,
							rules: [
								{
									required: true,
									validator: validateUsername('帐号')
								},
							],
						}}
					>
						<Input readOnly={isEditing}/>
					</FormItem>
					{_renderPasswordItem()}
					{blockedUsernameItem}
					<FormItem
						itemName="role.id"
						label="角色名称"
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
						itemConfig={{
							initialValue: authGroupNameInitialValue,
							rules: [
								{
									required: true,
									message: '角色名称不能为空',
								},
							],
						}}
					>
						<Select
							options={codeOption}
						/>
					</FormItem>
					<FormItem
						itemName="description"
						label="备注"
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
						itemConfig={{ initialValue: commentInitialValue }}
					>
						<InputTextarea
							minRows={4}
							maxRows={4}
						/>
					</FormItem>
					{googleVerificationItem}
				</Form>
			</PageModal>
		);
	}
}

AdminAccountFormModal.propTypes = propTypes;
AdminAccountFormModal.defaultProps = defaultProps;

export default AdminAccountFormModal;
