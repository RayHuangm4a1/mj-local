import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Input,
	RemindText,
	Button,
} from 'ljit-react-components';
import SubmitFormModal from '../submit-form-modal';
import './style.styl';

const propTypes = {
	isModalVisible: PropTypes.bool,
	onClickSubmit: PropTypes.func,
	onClickCancel: PropTypes.func,
};
const defaultProps = {};

const PREFIX_CLASS = 'verify-betting-password-modal';

class VerifyBettingPasswordModal extends Component {
	constructor() {
		super();

		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleCancel = this._handleCancel.bind(this);
	}

	_handleSubmit(event) {
		event.preventDefault();
		const {
			onClickSubmit,
		} = this.props;
		const form = this.formInstance.getForm();

		form.validateFields((err, values) => {
			if (!err) {
				const { password, } = values;

				// TODO verify password
				onClickSubmit(password);
				form.resetFields();
			}
		});
	}

	_handleCancel(event) {
		event.preventDefault();
		const { onClickCancel } = this.props;
		const form = this.formInstance.getForm();

		form.resetFields();
		onClickCancel();
	}

	render() {
		const { isModalVisible, } = this.props;
		const {
			_handleSubmit,
			_handleCancel,
		} = this;

		return (
			<SubmitFormModal
				className={PREFIX_CLASS}
				isVisible={isModalVisible}
				title="投注密码"
				width={440}
				onClickCancel={_handleCancel}
				footer={
					<Fragment>
						<Button
							className={`${PREFIX_CLASS}__cancel-button`}
							outline={Button.OutlineEnums.HOLLOW}
							onClick={_handleCancel}
						>
							取消
						</Button>
						<Button
							className={`${PREFIX_CLASS}__bet-button`}
							outline={Button.OutlineEnums.SOLID}
							onClick={_handleSubmit}
						>
							确认下注
						</Button>
					</Fragment>
				}
			>
				<Form
					ref={(refForm) => this.formInstance = refForm}
					cancelButtonDisabled
					submitButtonDisabled
				>
					<FormItem
						className={`${PREFIX_CLASS}__verify-password`}
						label="投注密码"
						labelColon={false}
						itemName="password"
						itemConfig={{
							initialValue: null,
							rules: [{
								required: true,
							},],
						}}
					>
						<Input
							className={`${PREFIX_CLASS}__password-input`}
							type="password"
							placeholder="请输入投注密码"
						/>
					</FormItem>
				</Form>
				<RemindText
					text="提示：仅有初次登入下单时才需输入投注密码"
				/>
			</SubmitFormModal>
		);
	}
}

VerifyBettingPasswordModal.propTypes = propTypes;
VerifyBettingPasswordModal.defaultProps = defaultProps;

export default VerifyBettingPasswordModal;
