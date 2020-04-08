import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
	Icon,
	Input,
	Form,
	FormItem,
} from 'ljit-react-components';
import { RouteKeyEnums, } from '../../../route';
import LoginLogo from '../login-logo';

const { LOGIN, } = RouteKeyEnums;
const {
	IconTypeEnums,
	SizeEnums,
} = Icon;

const propTypes = {
	onNavigate: PropTypes.func,
};

const PREFIX_CLASS = 'client-account-freeze';

class LoginAccountFreezePage extends Component {
	constructor(props) {
		super(props);

		this._handleFormSubmit = this._handleFormSubmit.bind(this);
	}

	_handleFormSubmit() {
		const form = this.formInstance.getForm();

		form.validateFields((err, values) => {
			// TODO: send api
			if (!err) {
				console.log('submit', values);
			}
		});
	}

	render() {
		const {
			onNavigate,
		} = this.props;
		const {
			_handleFormSubmit,
		} = this;

		return (
			<div className={cx(PREFIX_CLASS, 'login-page__container')}>
				<LoginLogo title="用户冻结" />
				<Form
					ref={(refForm) => this.formInstance = refForm }
					submitText="确认冻结"
					cancelButtonDisabled
					onSubmit={_handleFormSubmit}
				>
					<FormItem
						itemName="username"
						itemConfig={{
							rules: [
								{
									required: true,
									message: '用户名不能为空',
								},
							],
						}}
					>
						<Input
							prefix={<Icon type={IconTypeEnums.USER_OUTLINE} size={SizeEnums.X_SMALL} />}
							placeholder="请输入用户名"
						/>
					</FormItem>
					<FormItem
						itemName="payerName"
						itemConfig={{
							rules: [
								{
									required: true,
									message: '持卡人姓名不能为空',
								},
							],
						}}
					>
						<Input
							prefix={<Icon type={IconTypeEnums.BANK_CARD} size={SizeEnums.X_SMALL} />}
							placeholder="持卡人姓名"
						/>
					</FormItem>
					<FormItem
						itemName="previousPassword"
						itemConfig={{
							rules: [
								{
									required: true,
									message: '最近使用过的密码不能为空',
								},
							],
						}}
					>
						<Input
							prefix={<Icon type={IconTypeEnums.LOCK_OUTLINE} size={SizeEnums.X_SMALL} />}
							type="password"
							placeholder="最近使用过的密码"
						/>
					</FormItem>
				</Form>
				<p 
					className="account-freeze"
					onClick={() => onNavigate(LOGIN)}
				>
					<Icon type={IconTypeEnums.QUESTION_CIRCLE_OUTLINE} size={SizeEnums.X_SMALL} />
					取消用户冻结返回登录
				</p>
			</div>
		);
	}
}

LoginAccountFreezePage.propTypes = propTypes;

export default LoginAccountFreezePage;
