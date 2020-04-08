import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	FormItem,
	Input,
	Select,
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

class BetChangeSearchForm extends Component {
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
					key="memberNumber"
					label="编号："
					itemName="memberNumber"
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
				>
					<Input
						placeholder="请输入编号"
					/>
				</FormItem>
			),
			(
				<FormItem
					key="username"
					label="会员名稱："
					itemName="username"
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
				>
					<Input
						placeholder="请输入会员名称"
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
					key="operatingType"
					label="操作类型："
					itemName="operatingType"
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
				>
					<Select
						placeholder="请输入操作类型"
						options={[
							{ label: '提现', value: '1', },
							{ label: '人工操作', value: '2', },
							{ label: '充值', value: '3', },
						]}
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
						style={{ width: '100%', }}
						placeholder="请选择日期"
						format="YYYY/M/DD hh:mm"
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

BetChangeSearchForm.propTypes = propTypes;
BetChangeSearchForm.defaultProps = defaultProps;

export default BetChangeSearchForm;
