import React from 'react';
import {
	DecimalNumber,
	StatusTag,
} from 'ljit-react-components';
import {
	isDateValid,
	formatDate,
} from '../../../../lib/moment-utils';
import { ConfirmStatusesMap, } from '../utils';

export const PREFIX_CLASS = 'cash-system-credit-bank-page';

export const ColumnDefinitionEnums = {
	BANK_NAME: 'bankName',
	OPERATION: 'operation',
	STATUS: 'status',
	AMOUNT: 'amount',
	FEE: 'fee',
	USERNAME: 'username',
	USER_LEVEL_ID: 'userLevelId',
	ORDER_ID: 'id',
	PAYEE: 'payee',
	POSTSCRIPT: 'postscript',
	PAYER: 'payer',
	OPERATOR_UESRNAME: 'operatorUsername',
	CREATED_AT: 'createdAt',
	CONFIRMED_AT: 'confirmedAt',
	DESCRIPTION: 'description',
};

const {
	BANK_NAME,
	OPERATION,
	STATUS,
	AMOUNT,
	FEE,
	USERNAME,
	USER_LEVEL_ID,
	ORDER_ID,
	PAYEE,
	POSTSCRIPT,
	PAYER,
	OPERATOR_UESRNAME,
	CREATED_AT,
	CONFIRMED_AT,
	DESCRIPTION,
} = ColumnDefinitionEnums;

export const ColumnDefinitionMap = {
	[BANK_NAME]: {
		title: '存入银行',
		dataIndex: BANK_NAME,
	},
	[USER_LEVEL_ID]: {
		tableColumnLocation: 0,
		checkBoxElementLocation: 6,
		title: '层级',
		dataIndex: USER_LEVEL_ID,
	},
	[ORDER_ID]: {
		tableColumnLocation: 1,
		checkBoxElementLocation: 7,
		title: '订单编号',
		dataIndex: ORDER_ID,
	},
	[USERNAME]: {
		tableColumnLocation: 2,
		checkBoxElementLocation: 5,
		title: '会员',
		dataIndex: USERNAME,
	},
	[AMOUNT]: {
		tableColumnLocation: 3,
		checkBoxElementLocation: 3,
		title: '订单金额',
		dataIndex: AMOUNT,
		sorter: () => 0,
		render: function render(amount) {
			return <DecimalNumber data={amount} hasSeparator/>;
		},
	},
	[FEE]: {
		tableColumnLocation: 4,
		checkBoxElementLocation: 4,
		title: '手续费',
		dataIndex: FEE,
		sorter: () => 0,
		render: function render(fee) {
			return <DecimalNumber data={Number(fee)} hasSeparator/>;
		},
	},
	[PAYEE]: {
		tableColumnLocation: 6,
		checkBoxElementLocation: 8,
		title: '存入帐户',
		dataIndex: PAYEE,
	},
	[POSTSCRIPT]: {
		tableColumnLocation: 7,
		checkBoxElementLocation: 9,
		title: '附言',
		dataIndex: POSTSCRIPT,
	},
	[PAYER]: {
		tableColumnLocation: 8,
		checkBoxElementLocation: 10,
		title: '存款人姓名',
		dataIndex: PAYER,
	},
	[OPERATOR_UESRNAME]: {
		tableColumnLocation: 9,
		checkBoxElementLocation: 11,
		title: '操作员',
		dataIndex: OPERATOR_UESRNAME,
	},
	[CREATED_AT]: {
		tableColumnLocation: 10,
		checkBoxElementLocation: 12,
		title: '申请日期',
		dataIndex: CREATED_AT,
		sorter: () => 0,
		render: (value) => {
			const formatedDate = isDateValid(value) ? formatDate(value) : '';

			return formatedDate;
		},
	},
	[CONFIRMED_AT]: {
		tableColumnLocation: 11,
		checkBoxElementLocation: 13,
		title: '确认日期',
		dataIndex: CONFIRMED_AT,
		sorter: () => 0,
		render: (value) => {
			const formatedDate = isDateValid(value) ? formatDate(value) : '';

			return formatedDate;
		},
	},
	[DESCRIPTION]: {
		tableColumnLocation: 12,
		checkBoxElementLocation: 14,
		title: '备注',
		dataIndex: DESCRIPTION,
	},
	[STATUS]: {
		tableColumnLocation: 13,
		checkBoxElementLocation: 2,
		title: '状态',
		dataIndex: STATUS,
		render: function renderStatus(value) {
			const matchedStatus = ConfirmStatusesMap[value] ? ConfirmStatusesMap[value] : {};
			const {
				status,
				text,
			} = matchedStatus;

			return (
				<StatusTag
					status={status}
					text={text}
				/>
			);
		},
	},
	[OPERATION]: {
		tableColumnLocation: 14,
		checkBoxElementLocation: 1,
		title: '操作选项',
		dataIndex: OPERATION,
	},
};

export const defaultEnabledColumns = [
	USER_LEVEL_ID,
	ORDER_ID,
	PAYEE,
	POSTSCRIPT,
	PAYER,
	OPERATOR_UESRNAME,
];

export const depositOrderTableColumns = [
	{
		title: '订单编号',
		dataIndex: ORDER_ID,
		key: ORDER_ID,
	},
	{
		title: '会员',
		dataIndex: USERNAME,
		key: USERNAME,
	},
	{
		title: '订单金额',
		dataIndex: AMOUNT,
		key: AMOUNT,
		render: function render(amount) {
			return <DecimalNumber data={amount} hasSeparator/>;
		},
	},
	{
		title: '存入银行',
		dataIndex: BANK_NAME,
		key: BANK_NAME,
	},
	{
		title: '存入帐户',
		dataIndex: PAYEE,
		key: PAYEE,
	},
	{
		title: '存款人姓名',
		dataIndex: PAYER,
		key: PAYER,
	},
];

export const DepartmentIdEnums = {
	A: 1,
	B: 2,
	C: 3,
};

export const DepositClassIdEnums = {
	ONLINE_BANK: 1,
};
