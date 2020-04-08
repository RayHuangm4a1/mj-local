import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Modal,
	Button,
	DraggableTableInput,
} from 'ljit-react-components';
import PageModal from '../../../components/page-modal';

const propTypes = {
	games: PropTypes.array,
	isVisible: PropTypes.bool,
	onSubmit: PropTypes.func,
};
const defaultProps = {
	games: [],
	isVisible: false,
	onSubmit: () => {},
};
const PREFIX_CLASS = 'game-order-form-modal';
const ORDER_FIELD_NAME = 'orders';

class GameOrderFormModal extends Component {
	constructor() {
		super();

		this._handleFormSubmit = this._handleFormSubmit.bind(this);
	}

	_handleFormSubmit(event) {
		event.preventDefault();

		const { onSubmit, } = this.props;
		const form = this.formInstance.getForm();
		const orders = form.getFieldsValue();

		onSubmit(orders);
		form.resetFields();
	}

	render() {
		const {
			games,
			isVisible,
		} = this.props;
		const {
			_handleFormSubmit,
		} = this;

		return (
			<PageModal
				title="修改顺位"
				className={PREFIX_CLASS}
				visible={isVisible}
				modalSize={Modal.ModalSizeEnum.MEDIUM}
				footer={[
					<Button
						key="submit"
						color={Button.ColorEnums.BRIGHTBLUE500}
						outline={Button.OutlineEnums.SOLID}
						onClick={_handleFormSubmit}
					>
						确定
					</Button>,
				]}
			>
				<Form
					onSubmit={this._handleSubmit}
					ref={formRef => this.formInstance = formRef}
					cancelButtonDisabled
					submitButtonDisabled
				>
					<FormItem
						itemName={ORDER_FIELD_NAME}
						itemConfig={{
							initialValue: games,
						}}
					>
						<DraggableTableInput
							rowKey="key"
							tableName={ORDER_FIELD_NAME}
							columns={[
								{
									title: '名称',
									dataIndex: 'gameName',
								},
								{
									title: '顺位',
									dataIndex: 'gameOrder',
									render: (data, record, index) => (index + 1),
								},
							]}
						/>
					</FormItem>
				</Form>
			</PageModal>
		);
	}
}

GameOrderFormModal.propTypes = propTypes;
GameOrderFormModal.defaultProps = defaultProps;

export default GameOrderFormModal;
