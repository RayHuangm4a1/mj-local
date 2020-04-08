import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from '../../../src/components/form';
import Input from '../../../src/components/input';
import FormItem from '../../../src/components/form-item';
import DraggableTableInput from '../../../src/components/draggable-table-input';

const ORDER_FIELD_NAME = 'orders';

const propTypes = {
	initialValues: PropTypes.shape({
		username: PropTypes.string,
		orders: PropTypes.array,
	}),
	onSubmit: PropTypes.func,
};
const defaultProps = {
	initialValues: {},
};

class DraggableTableForm extends Component {
	constructor() {
		super();
		this._handleSubmit = this._handleSubmit.bind(this);
	}

	_handleSubmit(event) {
		event.preventDefault();
		const form = this.formInstance.getForm();

		form.validateFields((error, data) => {
			if (!error) {
				this.props.onSubmit(data);
			}
		});
	}

	render() {
		const {
			initialValues,
		} = this.props;

		return (
			<Form
				onSubmit={this._handleSubmit}
				ref={formRef => this.formInstance = formRef}
				cancelButtonDisabled
			>
				<FormItem
					label="帳號"
					itemName="username"
					itemConfig={{
						initialValue: initialValues.username,
					}}
				>
					<Input
						style={{ width: 200 }}
						placeholder=""
					/>
				</FormItem>
				<FormItem
					itemName={ORDER_FIELD_NAME}
					itemConfig={{
						initialValue: initialValues[ORDER_FIELD_NAME],
					}}
				>
					<DraggableTableInput
						rowKey="_id"
						tableName={ORDER_FIELD_NAME}
						columns={[
							{
								title: 'Title',
								dataIndex: 'title',
							},
							{
								title: 'Order',
								dataIndex: 'order',
								render: (data, record, index) => (index + 1),
							},
						]}
					/>
				</FormItem>
			</Form>
		);
	}
}

DraggableTableForm.propTypes = propTypes;
DraggableTableForm.defaultProps = defaultProps;

export default DraggableTableForm;
