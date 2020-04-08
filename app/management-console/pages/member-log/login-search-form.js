import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	FormItem,
	Input,
	CollapsableForm,
	DateRangePicker,
} from 'ljit-react-components';

const { ColumnSizeEnums, CollapseTypeEnum, } = CollapsableForm;
const propTypes = {
	onSearch: PropTypes.func,
};
const defaultProps = {
	initialValues: {},
	onSearch: () => {},
};

class LoginSearchForm extends Component {
	constructor() {
		super();

		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleReset = this._handleReset.bind(this);
		this._renderExpandFields = this._renderExpandFields.bind(this);
		this._renderCollapseFields = this._renderCollapseFields.bind(this);
	}

	_handleSubmit(event) {
		const { onSearch, } = this.props;
		const form = this.formInstance.getForm();

		event.preventDefault();
		form.validateFields((error, values) => {
			if (!error) {
				onSearch(values);
			}
		});
	}

	_handleReset() {
		const form = this.formInstance.getForm();

		form.resetFields();
	}

	_renderCollapseFields() {
		return [
			(
				<FormItem
					key="username"
					label="帐号："
					itemName="username"
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
				>
					<Input
						placeholder="请输入帐号"
					/>
				</FormItem>
			),
			(
				<FormItem
					key="loginIp"
					label="登入IP："
					itemName="loginIp"
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
				>
					<Input
						placeholder="请输入登录IP"
					/>
				</FormItem>
			),
		];
	}
	_renderExpandFields() {
		const collapseFields = this._renderCollapseFields();
		const fields = [
			(
				<FormItem
					key="searchTime"
					label="查詢時間："
					itemName="searchTime"
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
				>
					<DateRangePicker
						format="YYYY/M/DD hh:mm"
						ranges={['today', 'lastSevenDays', 'lastThirtyDays']}
					/>
				</FormItem>
			),
		];

		return [].concat(collapseFields, fields);
	}

	render() {
		return (
			<CollapsableForm
				expand
				onSubmit={this._handleSubmit}
				onCancel={this._handleReset}
				onChange={() => {}}
				submitText="查询"
				cancelText="重置"
				collapseType={CollapseTypeEnum.INSERTROW}
				columnSize={ColumnSizeEnums.SMALL}
				ref={(formRef) => this.formInstance = formRef}
				collapseChildren={this._renderCollapseFields()}
				expandChildren={this._renderExpandFields()}
			/>
		);
	}
}

LoginSearchForm.propTypes = propTypes;
LoginSearchForm.defaultProps = defaultProps;

export default LoginSearchForm;
