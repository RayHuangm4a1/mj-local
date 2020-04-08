import React, { useRef, } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Input,
} from 'ljit-react-components';
import { ipv4Rule, } from '../../../../lib/utils';
import PageModal from '../../../../components/page-modal';

const { ColumnTypeEnums, } = FormItem;
const inputStyle = {
	maxWidth: 150,
};

const propTypes = {
	isVisible: PropTypes.bool,
	onClose: PropTypes.func,
	onSubmit: PropTypes.func,
};
const defaultProps = {
	isVisible: false,
	onClose: () => {},
	onSubmit: () => {},
};

const IpFormModal = ({
	isVisible,
	onClose,
	onSubmit,
}) => {
	const formInstance = useRef(null);

	function _handleSubmit(event) {
		const form = formInstance.current.getForm();

		event.preventDefault();
		form.validateFields((error, values) => {
			if (error) {
				return;
			}

			onSubmit(values);
			form.resetFields();
		});
	}

	function _handleClose() {
		const form = formInstance.current.getForm();

		onClose();
		form.resetFields();
	}

	return (
		<PageModal
			title="新增 IP"
			visible={isVisible}
			modalSize={PageModal.ModalSizeEnum.SMALL}
			onClickOk={_handleSubmit}
			onClickCancel={_handleClose}
		>
			<Form
				ref={formInstance}
				submitButtonDisabled
				cancelButtonDisabled
			>
				<FormItem
					label="IP"
					itemName="ip"
					itemConfig={{
						rules: [
							{
								validator: (rule, value, callback) => {
									if (value && !ipv4Rule.test(value)) {
										callback('格式不正确');
									} else {
										callback();
									}
								},
							},
						]
					}}
					columnType={ColumnTypeEnums.SMALL}
				>
					<Input
						placeholder="请输入IP"
						style={inputStyle}
					/>
				</FormItem>
			</Form>
		</PageModal>
	);
};

IpFormModal.propTypes = propTypes;
IpFormModal.defaultProps = defaultProps;

export default IpFormModal;
