import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	CollapsableForm,
	Input,
	InputNumber,
	FormItem,
	Select,
	DatePicker,
	CheckBoxGroup,
	CheckBox,
} from 'ljit-react-components';
import { DATE, } from '../../../../lib/moment-utils';
import { DebitAccountPayStatusEnums, } from '../../../../lib/enums';

const inputStyle = {
	width: '264px',
	height: '32px',
};
const { ColumnSizeEnums, CollapseTypeEnum, } = CollapsableForm;
const {
	UNCONFIRM,
	CONFIRM,
	CANCEL,
	FAIL,
	PROCESS,
	THIRD_PART_UNCONFIRM,
	THIRD_PART_PAY_FAIL,
	UN_AUTO_PAY,
} = DebitAccountPayStatusEnums;

const StatusCheckBoxOptions = [
	{ label: '待确认', value: UNCONFIRM, },
	{ label: '已出款', value: CONFIRM, },
	{ label: '取消', value: CANCEL, },
	{ label: '待自動出款', value: UN_AUTO_PAY, },
	{ label: '自动出款失败 / 代付公司出款失败', value: FAIL, },
	{ label: '自动出款结果未知 / 代付公司出款处理中', value: PROCESS, },
	{ label: '待第三方出款处理', value: THIRD_PART_UNCONFIRM, },
	{ label: '第三方出款失败', value: THIRD_PART_PAY_FAIL, },
];

const propTypes = {
	form: PropTypes.object,
	onSearch: PropTypes.func,
};
const defaultProps = {
	onSearch: () => {},
};

const PREFIX_CLASS = 'account-pay-search-form';
const PINNED_FORM_ITEMS = [
	<FormItem label="层级" key={1} itemName="level" className={`${PREFIX_CLASS}__item`} itemConfig={{ initialValue: null, }}>
		<Select
			style={inputStyle}
			options={[
				{ label: '不指定', value: null, },
				{ label: '新人层', value: 'level-new', },
				{ label: '第一层', value: 'level-1', },
				{ label: '第二层', value: 'level-2', },
				{ label: '第三层', value: 'level-3', },
			]}
		/>
	</FormItem>,
	<FormItem label="用戶名" key={2} itemName="account" className={`${PREFIX_CLASS}__item`}>
		<Input
			placeholder="请输入用戶名"
			style={inputStyle} />
	</FormItem>,
];

class AccountPaySearchForm extends Component {
	constructor() {
		super();
		this.state = {
			isExpand: true,
			isSelectAllStatuses: false,
		};

		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleCancel = this._handleCancel.bind(this);
		this._handleChangeSelectAll = this._handleChangeSelectAll.bind(this);
		this._handleChangeSelectOptions = this._handleChangeSelectOptions.bind(this);
		this._renderExpandFields = this._renderExpandFields.bind(this);
	}
	_handleSubmit(event) {
		const { onSearch, } = this.props;
		const form = this.collapsableFormInstance.getForm();

		event.preventDefault();
		form.validateFields((err, values) => {
			// TODO: send search api
			onSearch(values);
		});
	}
	_handleCancel() {
		const form = this.collapsableFormInstance.getForm();

		form.resetFields();
	}
	_handleChangeSelectAll() {
		const form = this.collapsableFormInstance.getForm();
		const statuses = StatusCheckBoxOptions.map(status => status.value);
		const status = this.state.isSelectAllStatuses ? [] : statuses; 

		form.setFieldsValue({ status, });

		this.setState(prevState => ({
			isSelectAllStatuses: !prevState.isSelectAllStatuses,
		}));
	}
	_handleChangeSelectOptions(values) {
		const isSelectAllStatuses = values.length === StatusCheckBoxOptions.length;

		this.setState({ isSelectAllStatuses, });
	}
	_renderExpandFields() {
		const { isSelectAllStatuses, } = this.state;
		const {
			_handleChangeSelectAll,
			_handleChangeSelectOptions,
		} = this;

		return ([
			...PINNED_FORM_ITEMS,
			<FormItem label="取款金額" key={3} itemName="amount" className={`${PREFIX_CLASS}__item`}>
				<InputNumber
					placeholder="请输入取款金額"
					style={inputStyle} />
			</FormItem>,
			<FormItem label="操作者" key={4} itemName="operator" className={`${PREFIX_CLASS}__item`}>
				<Input
					placeholder="请输入操作者"
					style={inputStyle} />
			</FormItem>,
			<FormItem label="申请日" key={5} itemName="applyDate" className={`${PREFIX_CLASS}__item`}>
				<DatePicker
					placeholder="请输入申请日期"
					style={inputStyle}
					format={DATE}
					showTime
				/>
			</FormItem>,
			<FormItem label="确认日" key={6} itemName="confirmDate" className={`${PREFIX_CLASS}__item`}>
				<DatePicker
					placeholder="请输入确认日期"
					style={inputStyle}
					format={DATE}
					showTime
				/>
			</FormItem>,
			<div key={7} className={`${PREFIX_CLASS}__status-checkbox`}>
				<CheckBox
					onChange={_handleChangeSelectAll}
					value={isSelectAllStatuses}
				>
					全选
				</CheckBox>
				<FormItem label="状态" itemName="status" className={`${PREFIX_CLASS}__item ${PREFIX_CLASS}__status`}>
					<CheckBoxGroup
						mode="multiple"
						options={StatusCheckBoxOptions}
						onChange={_handleChangeSelectOptions}
					>
					</CheckBoxGroup>
				</FormItem>
			</div>,

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
					ref={(refForm) => this.collapsableFormInstance = refForm}
					expand={isExpand}
					onSubmit={_handleSubmit}
					onCancel={_handleCancel}
					submitText="查询"
					cancelText="重置"
					collapseType={CollapseTypeEnum.INSERTROW}
					columnSize={ColumnSizeEnums.SMALL}
					expandChildren={_renderExpandFields()}
					collapseChildren={PINNED_FORM_ITEMS}
					className={PREFIX_CLASS}
				>
				</CollapsableForm>
			</div>
		);
	}
}

AccountPaySearchForm.propTypes = propTypes;
AccountPaySearchForm.defaultProps = defaultProps;
AccountPaySearchForm.StatusEnums = DebitAccountPayStatusEnums;

export default AccountPaySearchForm;
