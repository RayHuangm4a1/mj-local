import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormItem, Input, CollapsableForm, Select, } from 'ljit-react-components';
import { UserTypeEnum, } from '../../../../lib/enums';

const { ColumnSizeEnums, CollapseTypeEnum, } = CollapsableForm;
const {
	ZHAOSHANG,
	AGENT,
	MEMBER,
} = UserTypeEnum;
const TypeTextMap = {
	[ZHAOSHANG]: '招商',
	[AGENT]: '代理',
	[MEMBER]: '会员',
};
const TypeValueEnum = {
	[ZHAOSHANG]: 1,
	[AGENT]: 2,
	[MEMBER]: 3,
};
const typeOptions = [
	{ label: '全部', value: null, },
	{ label: TypeTextMap[ZHAOSHANG], value: TypeValueEnum[ZHAOSHANG], },
	{ label: TypeTextMap[AGENT], value: TypeValueEnum[AGENT], },
	{ label: TypeTextMap[MEMBER], value: TypeValueEnum[MEMBER], },
];

const StatusEnum = {
	NORMAL: 1,
	ABNORMAL: 0,
};
const { NORMAL, ABNORMAL, } = StatusEnum;
const statusOptions = [
	{ label: '全部', value: null, },
	{ label: '正常', value: NORMAL, },
	{ label: '异常', value: ABNORMAL, },
];
const OnlineEnum = {
	ONLINE: 1,
	OFFLINE: 2,
};
const { ONLINE, OFFLINE, } = OnlineEnum;
const onlineOptions = [
	{ label: '全部', value: null, },
	{ label: '上线', value: ONLINE, },
	{ label: '下线', value: OFFLINE, },
];

const propTypes = {
	onSearch: PropTypes.func,
	isButtonDisabled: PropTypes.bool,
};
const defaultProps = {
	isButtonDisabled: false,
};

class SearchForm extends Component {
	constructor() {
		super();
		this.state= {
			expand: true,
		};
		this.collapseLimit = 2;

		this._getFormFields = this._getFormFields.bind(this);
		this._renderFields = this._renderFields.bind(this);
		this._handleSubmitClick = this._handleSubmitClick.bind(this);
		this._handleCancelClick = this._handleCancelClick.bind(this);
	}

	_getFormFields() {
		const Config = {
			rules: [{ type: 'string' }],
		};

		return [
			(
				<FormItem
					key="username"
					label="帐号"
					className="member-form-item"
					itemName="username"
					itemConfig={Config}
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
				>
					<Input
						placeholder="请输入帐号"
					/>
				</FormItem>
			),
			(
				<FormItem
					key="type"
					label="类型"
					className="member-form-item"
					itemName="type"
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
				>
					<Select
						placeholder="请选择"
						options={typeOptions}
					/>
				</FormItem>
			),
			(
				<FormItem
					key="status"
					label="状态"
					className="member-form-item"
					itemName="status"
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
				>
					<Select
						placeholder="请选择"
						options={statusOptions}
					/>
				</FormItem>
			),
			(
				<FormItem
					key="online"
					label="登录"
					className="member-form-item"
					itemName="online"
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
				>
					<Select
						placeholder="请选择"
						options={onlineOptions}
					/>
				</FormItem>
			),
			(
				<FormItem
					key="payer"
					label="银行卡姓名"
					className="member-form-item"
					itemName="payer"
					itemConfig={Config}
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
				>
					<Input
						placeholder="请输入银行卡姓名"
					/>
				</FormItem>
			),
			(
				<FormItem
					key="bankCardNumber"
					label="银行卡号"
					className="member-form-item"
					itemName="bankCardNumber"
					itemConfig={Config}
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
				>
					<Input
						placeholder="请输入银行卡号"
					/>
				</FormItem>
			),
		];
	}

	_renderFields(limit = 0) {
		const formFields = this._getFormFields();

		if (limit > 0) {
			return formFields.slice(0, limit);
		}
		return formFields;
	}

	_handleSubmitClick() {
		event.preventDefault();
		const { onSearch, } = this.props;
		const form = this.collapsableFormInstance.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				onSearch(values);
			}
		});
	}

	_handleCancelClick() {
		const form = this.collapsableFormInstance.getForm();

		form.resetFields();
	}

	render() {
		const {
			props,
			state,
			_handleSubmitClick,
			_handleCancelClick,
			_renderFields,
			collapseLimit,
		} = this;

		return (
			<CollapsableForm
				expand={state.expand}
				onSubmit={_handleSubmitClick}
				onCancel={_handleCancelClick}
				submitText="查询"
				cancelText="重置"
				collapseType={CollapseTypeEnum.INSERTROW}
				columnSize={ColumnSizeEnums.SMALL}
				expandChildren={_renderFields()}
				collapseChildren={_renderFields(collapseLimit)}
				ref={(refForm) => this.collapsableFormInstance = refForm}
				isButtonDisabled={props.isButtonDisabled}
			/>
		);
	}
}

SearchForm.propTypes = propTypes;
SearchForm.defaultProps = defaultProps;

export default SearchForm;
