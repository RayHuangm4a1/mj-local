import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CollapsableForm, Input, InputNumber, CheckBoxGroup, FormItem, DatePicker, } from 'ljit-react-components';

const inputStyle = {
	width: '264px',
	height: '32px',
};

const StatusEnums = {
	UNCONFIRM: 'unconfirm',
	CONFIRM: 'confirm',
	CANCEL: 'cancel',
	FAIL: 'fail',
	PROCESS: 'process',
};

const { ColumnSizeEnums, CollapseTypeEnum, } = CollapsableForm;

const propTypes = {
	onSearch: PropTypes.func,
};
const defaultProps = {
	onSearch: () => {},
};

const PinnedFormItems = [
	<FormItem label="帐号" key={1} itemName="account" className="pay-company-search-form__item" columnType={FormItem.ColumnTypeEnums.SMALL}>
		<Input
			placeholder="请输入帐号"
			style={inputStyle}
		/>
	</FormItem>,
	<FormItem label="申请日期" key={2} itemName="applydate" className="pay-company-search-form__item input-date" columnType={FormItem.ColumnTypeEnums.SMALL}>
		<DatePicker
			placeholder="请输入申请日期"
			style={inputStyle}
		/>
	</FormItem>,
];

class SearchForm extends Component {
	constructor() {
		super();
		this.state = {
			isExpand: true,
			inputAccount: '',
			inputApplyDate: null,
			inputConfirmDate: null,
			inputAmount: '',
			inputStatus: [],
		};

		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleCancel = this._handleCancel.bind(this);
		this._renderExpandFields = this._renderExpandFields.bind(this);
	}

	_handleSubmit(event) {
		const { onSearch, } = this.props;
		const form = this.collapsableFormInstance.getForm();

		event.preventDefault();
		form.validateFields((err, values) => {
			onSearch(values);
		});
	}
	_handleCancel() {
		const form = this.collapsableFormInstance.getForm();

		form.resetFields();
	}
	_renderExpandFields() {
		return ([
			...PinnedFormItems,

			<FormItem label="确认日期" key={3} itemName="confirmdate" className="pay-company-search-form__item input-date" columnType={FormItem.ColumnTypeEnums.SMALL}>
				<DatePicker
					placeholder="请输入确认日期"
					style={inputStyle}
				/>
			</FormItem>,
			<FormItem label="金额" key={4} itemName="amount" className="pay-company-search-form__item" columnType={FormItem.ColumnTypeEnums.SMALL}>
				<InputNumber
					placeholder="请输入金额"
					style={inputStyle}
				/>
			</FormItem>,
			<FormItem label="状态" key={5} itemName="status" className="pay-company-search-form__status" columnType={FormItem.ColumnTypeEnums.SMALL}>
				<CheckBoxGroup className="pay-company_search-form_status"
					key={5}
					options={[
						{ label: '待确认', value: StatusEnums.UNCONFIRM, },
						{ label: '已出款', value: StatusEnums.CONFIRM, },
						{ label: '取消', value: StatusEnums.CANCEL, },
						{ label: '出款失败', value: StatusEnums.FAIL, },
						{ label: '银行处理中', value: StatusEnums.PROCESS, },
					]}
					style={{ width: '200px', }}
				/>
			</FormItem>
		]);
	}

	render() {
		const { isExpand, } = this.state;
		const {
			_handleSubmit,
			_handleCancel,
			_renderExpandFields,
		} = this;

		return (
			<div>
				<CollapsableForm
					expand={isExpand}
					onSubmit={_handleSubmit}
					onCancel={_handleCancel}
					submitText="查询"
					cancelText="重置"
					collapseType={CollapseTypeEnum.INSERTROW}
					columnSize={ColumnSizeEnums.SMALL}
					expandChildren={_renderExpandFields()}
					collapseChildren={PinnedFormItems}
					ref={(refForm) => this.collapsableFormInstance = refForm}
				>
				</CollapsableForm>
			</div>
		);
	}
}

SearchForm.propTypes = propTypes;
SearchForm.defaultProps = defaultProps;
SearchForm.StatusEnums = StatusEnums;

export default SearchForm;
