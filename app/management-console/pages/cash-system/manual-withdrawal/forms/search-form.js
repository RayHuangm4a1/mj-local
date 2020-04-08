import React, { Component, } from 'react';
import {
	Form,
	FormItem,
	Input,
	InputNumber,
	Select,
	Button,
	Row,
	Col,
	DatePicker,
} from 'ljit-react-components';
import PropTypes from 'prop-types';
import { PREFIX, FormItemEnums, } from '../utils';

const {
	ACCOUNT,
	USERNAME,
	DATE,
	ITEM,
	AMOUNT,
} = FormItemEnums;

const TypeEnums = {
	DEPOSIT:'deposit',
	PATCH: 'patch',
	WITHDRAWAL: 'withdrawal',
	TRANSFER: 'transfer',
	ADD: 'add',
};
const {
	DEPOSIT,
	PATCH,
	WITHDRAWAL,
	TRANSFER,
	ADD,
} = TypeEnums;
const ItemLabelNameMap = {
	[TypeEnums.DEPOSIT]: "存入项目",
	[TypeEnums.WITHDRAWAL]: "提出项目",
	[TypeEnums.TRANSFER]: "转点项目",
};
const propTypes = {
	onSubmit: PropTypes.func,
	onClickReset: PropTypes.func,
	onClickBatchAdd: PropTypes.func,
	submitText: PropTypes.string,
	resetText: PropTypes.string,
	type: PropTypes.oneOf([
		DEPOSIT,
		PATCH,
		WITHDRAWAL,
		TRANSFER,
		ADD,
	]).isRequired,
	batchAddText: PropTypes.string,
};
const defaultProps = {
	onSubmit: () => {},
	onClickReset: () => {},
	onClickBatchAdd: () => {},
	submitText: "查询",
	resetText: "重置",
	batchAddText: "批量新增",
};

const PREFIX_CLASS = `${PREFIX}-search`;

class SearchForm extends Component {
	constructor(props) {
		super(props);

		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleBatchAdd = this._handleBatchAdd.bind(this);
		this._handleReset = this._handleReset.bind(this);
		this._renderFormItems = this._renderFormItems.bind(this);
	}
	_handleSubmit(e) {
		e.preventDefault();
		const { refForm: { validateFieldsAndScroll, } } = this;
		const { onSubmit } = this.props;

		validateFieldsAndScroll((err, values) => {
			if (!err) {
				onSubmit(values);
			}
		});
	}
	_handleBatchAdd(e) {
		e.preventDefault();
		const { onClickBatchAdd, } = this.props;

		onClickBatchAdd();
	}
	_handleReset() {
		const { refForm: { resetFields, } } = this;
		const { onClickReset } = this.props;

		resetFields();
		onClickReset();
	}
	_renderFormItems() {
		const { submitText, type, batchAddText, } = this.props;
		const { _handleSubmit, _handleBatchAdd, } = this;
		const addAccountInput = (
			<Col className={`${PREFIX_CLASS}__add-account-input`} key={ACCOUNT}>
				<FormItem
					className={`${PREFIX_CLASS}__form-item`}
					label={"帐号"}
					itemName={ACCOUNT}
				>
					<Input
						className={`${PREFIX_CLASS}__add-form-input`}
						placeholder="请输入帐号"
					/>
				</FormItem>
			</Col>
		);
		const accountInput = (
			<Col span={8} key={USERNAME}>
				<FormItem
					className={`${PREFIX_CLASS}__form-item`}
					label={"帐号"}
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
					itemName={USERNAME}
				>
					<Input
						className={`${PREFIX_CLASS}__form-input`}
						placeholder="请输入帐号"
					/>
				</FormItem>
			</Col>
		);
		const dateInput = (
			<Col span={8} key={DATE}>
				<FormItem
					className={`${PREFIX_CLASS}__form-item`}
					label={"申请日期"}
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
					itemName={DATE}
				>
					<DatePicker
						className={`${PREFIX_CLASS}__form-input`}
						placeholder="请输入申请日期"
						isShowingTime={false} format="YYYY/MM/DD"
					/>
				</FormItem>
			</Col>
		);
		const itemInput = (
			<Col span={8} key={ITEM}>
				<FormItem
					className={`${PREFIX_CLASS}__form-item`}
					label={ItemLabelNameMap[type]}
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
					itemName={ITEM}
				>
					<Select
						className={`${PREFIX_CLASS}__form-input`}
						// TODO get options
						options={undefined}
						placeholder={"请选择"}
					/>
				</FormItem>
			</Col>
		);
		const amountInput = (
			<Col span={8} key={AMOUNT}>
				<FormItem
					className={`${PREFIX_CLASS}__form-item`}
					label={"金额"}
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
					itemName={AMOUNT}
				>
					<InputNumber
						className={`${PREFIX_CLASS}__form-input`}
					/>
				</FormItem>
			</Col>
		);
		const button = (
			<Col key={'button'} className={`${PREFIX_CLASS}__button-group`}>
				<Button
					className={`${PREFIX_CLASS}__search-button`}
					color={Button.ColorEnums.BRIGHTBLUE500}
					onClick={_handleSubmit}
				>
					{submitText}
				</Button>
				<Button
					outline={Button.OutlineEnums.HOLLOW}
					icon={Button.IconEnums.PLUS}
					onClick={_handleBatchAdd}
				>
					{batchAddText}
				</Button>
			</Col>
		);

		let formItems;

		if (type === DEPOSIT || type === TRANSFER || type === WITHDRAWAL) {
			formItems = [accountInput, itemInput, amountInput, dateInput,];
		} else if (type === PATCH) {
			formItems = [accountInput, dateInput, amountInput,];
		} else if (type === ADD) {
			formItems = [addAccountInput, button,];
		}
		return formItems;
	}

	render() {
		const { submitText, resetText, type, } = this.props;
		const {
			_handleSubmit,
			_handleReset,
			_renderFormItems,
		} = this;

		let defaultButtonDisabled = (type === ADD) ? true : false;

		return (
			<div className={PREFIX_CLASS}>
				<Form
					submitText={submitText}
					cancelText={resetText}
					onSubmit={_handleSubmit}
					onCancel={_handleReset}
					ref={(refForm) => this.refForm = refForm }
					cancelButtonDisabled={defaultButtonDisabled}
					submitButtonDisabled={defaultButtonDisabled}
				>
					<Row gutter={24} type={Row.TypeEnums.FLEX}>
						{_renderFormItems()}
					</Row>
				</Form>
			</div>
		);
	}
}

SearchForm.propTypes = propTypes;
SearchForm.defaultProps = defaultProps;
SearchForm.TypeEnums = TypeEnums;

export default SearchForm;
