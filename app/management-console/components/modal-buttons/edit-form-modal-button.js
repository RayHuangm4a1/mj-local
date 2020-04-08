import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { TextButton, Form, } from 'ljit-react-components';
import PageModal from '../page-modal';
import './style.styl';
const { ModalSizeEnum } = PageModal;

const propTypes = {
	buttonText: PropTypes.string,
	isDisabled: PropTypes.bool,
	formTitle: PropTypes.string,
	onSubmitForm: PropTypes.func,
	formBody: PropTypes.any,
	modalSize: PropTypes.oneOf([
		ModalSizeEnum.SMALL,
		ModalSizeEnum.NORMAL,
		ModalSizeEnum.LARGE,
		'',
	]),
	okText: PropTypes.string,
	cancelText: PropTypes.string,
};
const defaultProps = {
	buttonText: '修改',
	okText: '确 定',
	cancelText: '取 消',
	isDisabled: false,
	onSubmitForm: () => {},
	modalSize: ModalSizeEnum.SMALL
};

class EditFormModalButton extends Component {
	constructor() {
		super();
		this.state = {
			isEditModalVisible: false,
		};

		this._handleSubmitForm = this._handleSubmitForm.bind(this);
		this._handleCancel = this._handleCancel.bind(this);
	}

	_handleSubmitForm() {
		// TODO send edit api
		const form = this.FormInstance.getForm();


		form.validateFields((error, values) => {
			if (!error) {
				const { onSubmitForm, } = this.props;

				onSubmitForm(values);
				form.resetFields();
				this.setState({ isEditModalVisible: false, });
			}
		});
	}
	_handleCancel() {
		const form = this.FormInstance.getForm();

		form.resetFields();
		this.setState({ isEditModalVisible: false, });
	}
	render() {
		const {
			buttonText,
			isDisabled,
			formTitle,
			formBody,
			modalSize,
			okText,
			cancelText,
		} = this.props;
		const { isEditModalVisible, } = this.state;
		const { _handleSubmitForm, _handleCancel, } = this;

		return (
			<div>
				<TextButton
					text={buttonText}
					onClick={() => this.setState({ isEditModalVisible: true, })}
					disabled={isDisabled}
				/>
				<Form
					ref={formInstance => this.FormInstance = formInstance}
					submitButtonDisabled
					cancelButtonDisabled
				>
					<PageModal
						title={formTitle}
						visible={isEditModalVisible}
						okText={okText}
						cancelText={cancelText}
						onClickOk={_handleSubmitForm}
						onClickCancel={_handleCancel}
						modalSize={modalSize}
						className="edit-element-modal"
					>
						{formBody}
					</PageModal>
				</Form>
			</div>
		);
	}
}

EditFormModalButton.propTypes = propTypes;
EditFormModalButton.defaultProps = defaultProps;

export default EditFormModalButton;
