import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Input,
} from 'ljit-react-components';
import SubmitFormModal from '../../../../components/submit-form-modal';

const propTypes = {
	isVisible: PropTypes.bool,
	onSubmit: PropTypes.func,
	onCancel: PropTypes.func,
};

const defaultProps = {
	isVisible: false,
	onSubmit: () => {},
	onCancel: () => {},
};

const PREFIX_CLASS = 'ljit-member-bank-info';

class DeleteBankCardModal extends Component {
	constructor() {
		super();

		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleCancel = this._handleCancel.bind(this);
	}
	_handleSubmit() {
		const form = this.FormInstance.getForm();

		form.validateFields((error, { password, }) => {
			if (!error) {
				this.props.onSubmit(password);
				form.resetFields();
			}
		});
	}

	_handleCancel() {
		const form = this.FormInstance.getForm();

		this.props.onCancel();
		form.resetFields();
	}

	render() {
		const { isVisible, } = this.props;
		const { _handleSubmit, _handleCancel, } = this;

		return (
			<SubmitFormModal
				isVisible={isVisible}
				title='解除银行卡绑定'
				onClickCancel={_handleCancel}
				onClickOk={_handleSubmit}
				width='440px'
				className={`${PREFIX_CLASS}__modal`}
			>
				<Form
					ref={formInstance => this.FormInstance = formInstance}
					submitButtonDisabled
					cancelButtonDisabled
				>
					<div className={`${PREFIX_CLASS}__modal-content`}>
						<FormItem
							className={`${PREFIX_CLASS}__form-item`}
							label='资金密码'
							labelColon={false}
							itemName='password'
							itemConfig={{
								rules: [
									{
										required: true,
										message: '资金密码不能为空',
									},
								],
							}}
						>
							<Input
								type='password'
								placeholder='请输入资金密码'
							/>
						</FormItem>
					</div>
				</Form>
			</SubmitFormModal>
		);
	}
}

DeleteBankCardModal.propTypes = propTypes;
DeleteBankCardModal.defaultProps = defaultProps;

export default DeleteBankCardModal;
