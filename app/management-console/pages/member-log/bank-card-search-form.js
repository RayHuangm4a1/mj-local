import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	FormItem,
	Input,
	CollapsableForm,
	DatePicker,
} from 'ljit-react-components';

const { ColumnSizeEnums, CollapseTypeEnum, } = CollapsableForm;
const propTypes = {
	onSearch: PropTypes.func,
};
const defaultProps = {
	onSearch: () => {},
};

class BankCardSearchForm extends Component {
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
					key="memberName"
					label="会员姓名："
					itemName="memberName"
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
				>
					<Input
						placeholder="请输入会员姓名"
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
					key="bankCardNumber"
					label="卡号："
					itemName="bankCardNumber"
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
				>
					<Input
						placeholder="请输入卡号"
					/>
				</FormItem>
			),
			(
				<FormItem
					key="searchTime"
					label="時間："
					itemName="searchTime"
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
				>
					<DatePicker
						placeholder="请选择日期"
						format="YYYY/M/DD hh:mm"
						style={{ width: '100%', }}
						isShowToday
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

BankCardSearchForm.propTypes = propTypes;
BankCardSearchForm.defaultProps = defaultProps;

export default BankCardSearchForm;
