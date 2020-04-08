import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Input,
	InputTextarea,
	Modal,
} from 'ljit-react-components';
import PageModal from '../../../../components/page-modal';
import { PREFIX_CLASS } from './';

const propTypes = {
	onSubmit: PropTypes.func,
	onCancel: PropTypes.func,
	isVisible: PropTypes.bool,
	initialValues: PropTypes.shape({
		name: PropTypes.string,
		description: PropTypes.string,
	}),
};
const defaultProps = {
	onSubmit: () => {},
	onCancel: () => {},
	isVisible: false,
	initialValues: {
		name: '',
		description: '',
	},
};

class SettingFormModal extends Component {
	constructor() {
		super();

		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleReset = this._handleReset.bind(this);
	}

	_handleSubmit(event) {
		event.preventDefault();
		const form = this.formInstance.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				this.props.onSubmit(values);
			}
		});
	}

	_handleReset(event) {
		event.preventDefault();
		const form = this.formInstance.getForm();

		form.resetFields();
		this.props.onCancel();
	}

	render() {
		const { isVisible, initialValues, } = this.props;
		const { _handleSubmit, _handleReset, } = this;

		return (
			<PageModal
				visible={isVisible}
				title="修改玩法"
				modalSize={Modal.ModalSizeEnum.NORMAL}
				onClickCancel={_handleReset}
				onClickOk={_handleSubmit}
				className={`${PREFIX_CLASS}__setting-form`}
			>
				<Form
					submitButtonDisabled
					cancelButtonDisabled
					onChange={() => {}}
					ref={(refForm) => this.formInstance = refForm }
				>
					<FormItem
						label="玩法名称"
						itemName="name"
						itemConfig={{
							initialValue: initialValues.name,
						}}
						className="game-description-setting-modal-form-item"
					>
						<Input
							placeholder=""
							readOnly={true}
							disabled={true}
						/>
					</FormItem>
					<FormItem
						label="玩法说明"
						itemName="description"
						itemConfig={{
							initialValue: initialValues.description,
						}}
						className="game-description-setting-modal-form-item"
					>
						<InputTextarea
							minRows={4}
						/>
					</FormItem>
				</Form>
			</PageModal>
		);
	}
}

SettingFormModal.propTypes = propTypes;
SettingFormModal.defaultProps = defaultProps;

export default SettingFormModal;
