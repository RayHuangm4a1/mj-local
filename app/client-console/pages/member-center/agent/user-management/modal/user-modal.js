import React, { Component, } from 'react';
import {
	Form,
	FormItem,
	Input,
	RadioGroup,
} from 'ljit-react-components';
import SubmitFormModal from '../../../../../components/submit-form-modal';
import SelectDropdown  from '../../../../../components/select-dropdown';
import { UserTypeEnum, } from '../../../../../lib/enums';
import { calculateRebate, } from '../../../../../lib/betting-utils';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { validatePassword, validateUsername } from '../../../../../../lib/form-validation-utils';

const PREFIX_CLASS = 'agent-user-modal';
const { AGENT, MEMBER, } = UserTypeEnum;

const propTypes = {
	isEditing: PropTypes.bool,
	editingUser: PropTypes.object,
	onEditUser: PropTypes.func,
	onCreateUser: PropTypes.func,
	onCancel: PropTypes.func,
	isVisible: PropTypes.bool,
	bonusOptions: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]),
		value: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		])
	})),
	className: PropTypes.string,
};
const defaultProps = {
	isEditing: false,
	onEditUser: () => {},
	onCreateUser: () => {},
	onCancel: () => {},
	isVisible: false,
	bonusOptions: [],
};

class UserModal extends Component {
	constructor() {
		super();

		this._handleCreateUser = this._handleCreateUser.bind(this);
		this._handleEditUser = this._handleEditUser.bind(this);
		this._handleCancel = this._handleCancel.bind(this);
		this._renderPasswordInput = this._renderPasswordInput.bind(this);
		this._renderRadioGroupOptions = this._renderRadioGroupOptions.bind(this);
	}

	resetFields() {
		const form = this.formInstance.getForm();

		form.resetFields();
	}

	_handleCreateUser() {
		const { onCreateUser, } = this.props;
		const form = this.formInstance.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				onCreateUser(values);
			}
		});
	}

	_handleEditUser() {
		const {
			onEditUser,
			onCancel,
			editingUser,
		} = this.props;
		const {
			type: prevType,
			bonus: prevBonus,
			id: childrenId,
		} = editingUser;
		const form = this.formInstance.getForm();

		form.validateFields((error, { bonus, type }) => {
			if (!error) {
				if (prevType === type && prevBonus === bonus) {
					onCancel();
				} else {
					onEditUser({
						childrenId,
						isAgent: type === AGENT,
						bonus,
					});
				}
				form.resetFields();
			}
		});
	}
	_handleCancel() {
		const { onCancel, } = this.props;
		const form = this.formInstance.getForm();

		onCancel();
		form.resetFields();
	}
	_renderPasswordInput() {
		return (
			<FormItem
				label="会员密码"
				itemName="password"
				itemConfig={{
					initialValue: 'a123456',
					rules: [{
						validator: validatePassword('会员密码')
					},],
				}}
			>
				<Input
					placeholder="会员密码"
				/>
			</FormItem>
		);
	}
	_renderRadioGroupOptions() {
		const {
			editingUser = {}
		} = this.props;

		if (editingUser.type === AGENT) {
			return [
				{ label: '代理', value: AGENT, },
			];
		} else {
			return [
				{ label: '代理', value: AGENT, },
				{ label: '会员', value: MEMBER, },
			];
		}
	}
	render() {
		const {
			_handleCreateUser,
			_handleEditUser,
			_handleCancel,
			_renderPasswordInput,
			_renderRadioGroupOptions,
		} = this;
		const {
			isEditing,
			editingUser,
			isVisible,
			bonusOptions,
			className,
		} = this.props;
		const title = isEditing ? "修改会员" : "新增会员";
		const username = isEditing ? editingUser.username : undefined;
		const type = isEditing ? editingUser.type : AGENT;
		const bonus = isEditing ? editingUser.bonus : undefined;
		const onClickOk = isEditing ? _handleEditUser : _handleCreateUser;
		const options = bonusOptions.map(option => ({
			label: `返点：${calculateRebate(option.value)}%、奖金：${option.value}`,
			value: option.value,
		}));

		return (
			<SubmitFormModal
				title={title}
				width="440px"
				isVisible={isVisible}
				onClickCancel={_handleCancel}
				onClickOk={onClickOk}
				className={cx(PREFIX_CLASS, className)}
			>
				<Form
					cancelButtonDisabled
					submitButtonDisabled
					ref={(refForm) => this.formInstance = refForm}
				>
					<FormItem
						label="会员名称"
						itemName="username"
						itemConfig={{
							initialValue: username,
							rules: [{
								required: true,
								validator: validateUsername('会员名称')
							},],
						}}
					>
						<Input
							placeholder="会员名称"
							disabled={isEditing}
						/>
					</FormItem>
					{isEditing ?  null : _renderPasswordInput()}
					<FormItem
						label="会员类型"
						itemName="type"
						itemConfig={{
							initialValue: type,
						}}
					>
						<RadioGroup
							options={_renderRadioGroupOptions()}
						/>
					</FormItem>
					<FormItem
						label="彩票奖金/返点"
						itemName="bonus"
						itemConfig={{
							initialValue: bonus,
							rules: [{
								required: true,
								message: '彩票奖金/返点爲必填'
							},],
						}}
					>
						<SelectDropdown
							options={options}
							placeholder="请选择彩票奖金/返点"
						/>
					</FormItem>
				</Form>
			</SubmitFormModal>
		);
	}
}

UserModal.propTypes = propTypes;
UserModal.defaultProps = defaultProps;

export default UserModal;
