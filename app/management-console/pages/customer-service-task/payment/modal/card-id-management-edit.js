import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Input,
	Select,
} from 'ljit-react-components';
import PageModal from '../../../../components/page-modal';

const propTypes = {
	isVisible: PropTypes.bool,
	onSubmit: PropTypes.func,
	onCancel: PropTypes.func,
	selectedData: PropTypes.shape({
		username: PropTypes.string,
		bank: PropTypes.string,
		cardId: PropTypes.string,
	})
};
const defaultProps = {
	isVisible: false,
	onSubmit: () => {},
	onCancel: () => {},
	selectedData: {},
};

class CardIdManagementEditModal extends Component {
	constructor() {
		super();

		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleCancel = this._handleCancel.bind(this);
	}

	_handleSubmit() {
		const { onSubmit, } = this.props;
		const form = this.formInstance.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				onSubmit(values);
			}
		});
	}
	_handleCancel() {
		const { onCancel, } = this.props;
		const form = this.formInstance.getForm();

		onCancel();
		form.resetFields();
	}
	render() {
		const { isVisible, selectedData, } = this.props;
		const { _handleSubmit, _handleCancel, } = this;
		const { username, bank, cardId } = selectedData;

		return (
			<PageModal
				visible={isVisible}
				title="修改"
				onClickCancel={_handleCancel}
				onClickOk={_handleSubmit}
			>
				<Form
					ref={(refForm) => this.formInstance = refForm}
					submitButtonDisabled
					cancelButtonDisabled
				>
					<FormItem
						label="姓名"
						itemName="username"
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
						itemConfig={{ initialValue: username, }}
					>
						<Input placeholder="未设定" style={{ width: 293 }} />
					</FormItem>
					<FormItem
						label="银行名称"
						itemName="bank"
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
						itemConfig={{ initialValue: bank, }}
					>
						<Select
							// TODO get options
							options={[
								{ label: '中国农业银行', value: '中国农业银行', }
							]}
							style={{ width: 293 }}
						/>
					</FormItem>
					<FormItem
						label="卡号"
						itemName="cardId"
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
						itemConfig={{ initialValue: cardId, }}
					>
						<Input style={{ width: 293 }} />
					</FormItem>
				</Form>

			</PageModal>
		);
	}
}

CardIdManagementEditModal.propTypes = propTypes;
CardIdManagementEditModal.defaultProps = defaultProps;

export default CardIdManagementEditModal;
