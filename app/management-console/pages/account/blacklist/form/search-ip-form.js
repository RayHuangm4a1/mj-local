import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Row,
	Col,
	Input,
	DatePicker,
} from 'ljit-react-components';

const propTypes = {
	onSubmit: PropTypes.func,
	onCancel: PropTypes.func,
};

const defaultProps = {
	onSubmit: () => {},
	onCancel: () => {},
};

class SearchIpForm extends Component {
	constructor() {
		super();

		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleReset = this._handleReset.bind(this);
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
	_handleReset() {
		const { onCancel, } = this.props;
		const form = this.formInstance.getForm();

		onCancel();
		form.resetFields();
	}

	render() {
		const {
			_handleSubmit,
			_handleReset,
		} = this;

		return (
			<Form
				ref={formRef => this.formInstance = formRef }
				onSubmit={_handleSubmit}
				onCancel={_handleReset}
				submitText="查询"
				cancelText="重置"
			>
				<Row>
					<Col span={12}>
						<FormItem
							label="登陆 IP "
							itemName="ip"
							columnType={FormItem.ColumnTypeEnums.SMALL}
						>
							<Input placeholder="请输入IP" />
						</FormItem>
					</Col>
					<Col span={12}>
						<FormItem
							label="日期"
							itemName="date"
							columnType={FormItem.ColumnTypeEnums.SMALL}
						>
							<DatePicker
								placeholder="请选择日期"
								style={{ width: "100%" }}
							/>
						</FormItem>
					</Col>
				</Row>
			</Form>
		);
	}
}

SearchIpForm.propTypes = propTypes;
SearchIpForm.defaultProps = defaultProps;

export default SearchIpForm;
