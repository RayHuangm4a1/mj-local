import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
	Form,
	FormItem,
	Input,
	Icon,
} from 'ljit-react-components';

const {
	USER_OUTLINE,
	LOCK_OUTLINE,
} = Icon.IconTypeEnums;
const {
	X_SMALL,
} = Icon.SizeEnums;
const {
	WHITE,
} = Icon.ColorEnums;

const PREFIX_CLASS = 'confirmed-form';

const propTypes = {
	className: PropTypes.string,
	disabled: PropTypes.bool,
	onClickSubmit: PropTypes.func,
};
const defaultProps = {
	className: '',
	disabled: false,
	onClickSubmit: () => {},
};

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this._handleSubmit = this._handleSubmit.bind(this);
	}

	_handleSubmit() {
		const {
			formInstance,
			props: {
				onClickSubmit,
			},
		} = this;

		const form = formInstance.getForm();

		form.validateFields((error, values) => {
			if (error) {
				return;
			}

			onClickSubmit(values);
		});
	}

	render() {
		const {
			className,
			disabled,
		} = this.props;

		return (
			<div className={cx(PREFIX_CLASS, className)}>
				<Form
					ref={formRef => (this.formInstance = formRef)}
					submitText="登录"
					cancelButtonDisabled
					isSubmitDisabled={disabled}
					onSubmit={this._handleSubmit}
				>
					<FormItem
						label=""
						labelColon={false}
						itemName="username"
						itemConfig={{
							initialValue: '',
							rules: [
								{
									required: true,
									message: '用户名不能为空',
								},
							],
						}}
					>
						<Input
							className={`${PREFIX_CLASS}__input`}
							prefix={(
								<Icon
									type={USER_OUTLINE}
									size={X_SMALL}
									color={WHITE}
								/>
							)}
							placeholder="用户名"
							disabled={disabled}
						/>
					</FormItem>
					<FormItem
						label=""
						labelColon={false}
						itemName="password"
						itemConfig={{
							initialValue: '',
							rules: [
								{
									required: true,
									message: '密码不能为空',
								},
							],
						}}
					>
						<Input
							className={`${PREFIX_CLASS}__input`}
							prefix={(
								<Icon
									type={LOCK_OUTLINE}
									size={X_SMALL}
									color={WHITE}
								/>
							)}
							placeholder="密码"
							type="password"
							disabled={disabled}
						/>
					</FormItem>
				</Form>
			</div>
		);
	}
}

LoginForm.propTypes = propTypes;
LoginForm.defaultProps = defaultProps;

export default LoginForm;
