import React, { Component } from 'react';
import {
	Form,
	FormItem,
	Input,
	Select,
	InputNumber
} from 'ljit-react-components';
import PropTypes from 'prop-types';
import { PREFIX, FormItemEnums, } from '../utils';

const {
	ITEM,
	AMOUNT,
	BETTING,
	COMMENT,
	GOOGLE_PASSWORD,
	TRANSFER_OUT_ACCOUNT,
	TRANSFER_IN_ACCOUNT,
} = FormItemEnums;

const TypeEnums = {
	DEPOSIT:'deposit',
	PATCH: 'patch',
	WITHDRAWAL: 'withdrawal',
	TRANSFER: 'transfer',
};
const {
	DEPOSIT,
	PATCH,
	WITHDRAWAL,
	TRANSFER,
} = TypeEnums;
const ItemLabelNameMap = {
	[TypeEnums.DEPOSIT]: "存入项目",
	[TypeEnums.WITHDRAWAL]: "提出项目",
	[TypeEnums.TRANSFER]: "存入项目",
};
const AmountLabelNameMap = {
	[TypeEnums.DEPOSIT]: "存入金额",
	[TypeEnums.WITHDRAWAL]: "提出金额",
	[TypeEnums.TRANSFER]: "提出金额",
	[TypeEnums.PATCH]: "存入金额"
};
const BettingLabelNameMap ={
	[TypeEnums.DEPOSIT]: "所需投注量",
	[TypeEnums.WITHDRAWAL]: "投注量扣除额",
};
const propTypes = {
	transferOutAccount: PropTypes.string,
	transferInAccount: PropTypes.string,
	type: PropTypes.oneOf([
		DEPOSIT,
		PATCH,
		WITHDRAWAL,
		TRANSFER,
	]).isRequired
};
const defaultPropType = {
	transferOutAccount: "",
	transferInAccount: "",
};

const PREFIX_CLASS = `${PREFIX}-confirm-transaction`;

class ConfirmTransactionForm extends Component {
	constructor(props) {
		super(props);

		this._handleFormChange = this._handleFormChange.bind(this);
		this._renderFormItems = this._renderFormItems.bind(this);
	}
	_handleFormChange() {
		const { refForm: { validateFields } } = this;

		validateFields((err, values) => {});
	}
	_renderFormItems() {
		const {
			transferOutAccount,
			transferInAccount,
			type,
		} = this.props;
		const { ColumnTypeEnums: { MEDIUM, } } = FormItem;
		const transferOutInput = (
			<FormItem
				className={`${PREFIX_CLASS}__form-item`}
				key={TRANSFER_OUT_ACCOUNT}
				label={"转出帐号"}
				columnType={MEDIUM}
				itemName={TRANSFER_OUT_ACCOUNT}
				itemConfig={{ initialValue: transferOutAccount }}
			>
				<Input
					className={`${PREFIX_CLASS}__form-input`}
					disabled={true}
				/>
			</FormItem>
		);
		const transferInInput = (
			<FormItem
				className={`${PREFIX_CLASS}__form-item`}
				key={TRANSFER_IN_ACCOUNT}
				label={"转入帐号"}
				columnType={MEDIUM}
				itemName={TRANSFER_IN_ACCOUNT}
				itemConfig={{ initialValue: transferInAccount }}
			>
				<Input
					className={`${PREFIX_CLASS}__form-input`}
					disabled={true}
				/>
			</FormItem>
		);
		const amountInput = (
			<FormItem
				className={`${PREFIX_CLASS}__form-item`}
				key={AMOUNT}
				label={AmountLabelNameMap[type]}
				columnType={MEDIUM}
				itemName={AMOUNT}
			>
				<InputNumber
					className={`${PREFIX_CLASS}__form-input`}
				/>
			</FormItem>
		);
		const bettingInput = (
			<FormItem
				className={`${PREFIX_CLASS}__form-item`}
				key={BETTING}
				label={BettingLabelNameMap[type]}
				columnType={MEDIUM}
				itemName={'betting'}
			>
				<InputNumber
					className={`${PREFIX_CLASS}__form-input`}
				/>
			</FormItem>
		);
		const itemInput = (
			<FormItem
				className={`${PREFIX_CLASS}__form-item`}
				key={ITEM}
				label={ItemLabelNameMap[type]}
				columnType={MEDIUM}
				itemName={ITEM}
			>
				<Select
					className={`${PREFIX_CLASS}__form-input`}
					// TODO add options
					options={undefined}
					placeholder={"请选择类型"}
				/>
			</FormItem>
		);
		const commentInput = (
			<FormItem
				className={`${PREFIX_CLASS}__form-item`}
				key={COMMENT}
				label={'备注'}
				columnType={MEDIUM}
				itemName={COMMENT}
			>
				<Input
					className={`${PREFIX_CLASS}__form-input`}
				/>
			</FormItem>
		);
		const googlePasswordInput = (
			<FormItem
				className={`${PREFIX_CLASS}__form-item`}
				key={GOOGLE_PASSWORD}
				label={'系统谷歌动态密码'}
				columnType={MEDIUM}
				itemName={GOOGLE_PASSWORD}
			>
				<Input
					className={`${PREFIX_CLASS}__form-input`}
				/>
			</FormItem>
		);

		let formItems;

		if (type === DEPOSIT) {
			formItems = [itemInput, amountInput, bettingInput, commentInput, googlePasswordInput,];
		} else if (type === TRANSFER) {
			formItems = [transferOutInput, transferInInput, amountInput, itemInput, commentInput,];
		} else if (type === PATCH) {
			formItems = [amountInput, commentInput];
		} else if (type === WITHDRAWAL) {
			formItems = [itemInput, amountInput, bettingInput, commentInput];
		}
		return formItems;
	}

	render() {
		const { _handleFormChange, _renderFormItems } = this;

		return (
			<div className={PREFIX_CLASS}>
				<Form
					submitButtonDisabled={true}
					cancelButtonDisabled={true}
					onChange={_handleFormChange}
					ref={(refForm) => this.refForm = refForm }
				>
					{_renderFormItems()}
				</Form>
			</div>
		);
	}
}

ConfirmTransactionForm.propTypes = propTypes;
ConfirmTransactionForm.defaultPropType = defaultPropType;
ConfirmTransactionForm.TypeEnums = TypeEnums;

export default ConfirmTransactionForm;
