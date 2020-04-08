import React from 'react';
import {
	DecimalNumber,
	StatusTag,
} from 'ljit-react-components';
import {
	convertDateStringToTimestamp,
	isDateValid,
	formatDate,
} from '../../../../../lib/moment-utils';
import { ConfirmStatusesMap, } from '../../utils';

export const PREFIX_CLASS = 'cash-system-credit-third-party-platform-page';

export const ColumnDefinitionEnums = {
	DEPOSITED_THIRD_PARTY: 'depositedThirdParty',
	THIRD_PARTY_ACCOUNT: 'thirdPartyAccount',
	DEBIT_CARD_NUMBER: 'debitCardNumber',
	OPERATION: 'operation',
	STATUS: 'status',
	AMOUNT: 'amount',
	FEE: 'fee',
	USERNAME: 'username',
	LEVEL: 'level',
	ORDER_ID: 'orderId',
	DEPOSITED_ACCOUNT: 'depositedAccount',
	POSTSCRIPT: 'postscript',
	PAYER: 'payer',
	OPERATOR: 'operator',
	DEPOSITS_AT: 'depositsAt',
	CONFIRMED_AT: 'confirmedAt',
	COMMENT: 'comment',
};

const {
	DEPOSITED_THIRD_PARTY,
	THIRD_PARTY_ACCOUNT,
	DEBIT_CARD_NUMBER,
	OPERATION,
	STATUS,
	AMOUNT,
	FEE,
	USERNAME,
	LEVEL,
	ORDER_ID,
	OPERATOR,
	DEPOSITS_AT,
	CONFIRMED_AT,
	COMMENT,
} = ColumnDefinitionEnums;

export const ColumnDefinitionMap = {
	[LEVEL]: {
		tableColumnLocation: 0,
		checkBoxElementLocation: 6,
		title: '层级',
		dataIndex: LEVEL,
		render: (levels) => levels.map((level, index) => {
			return <div key={index} className="level">{level}</div>;
		}),
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
		title: '会员帐号',
		dataIndex: USERNAME,
	},
	[AMOUNT]: {
		tableColumnLocation: 3,
		checkBoxElementLocation: 3,
		title: '充值金额',
		dataIndex: AMOUNT,
		sorter: (prev, next) => prev[AMOUNT] - next[AMOUNT],
		render: function render(amount) {
			return <DecimalNumber data={amount} hasSeparator/>;
		},
	},
	[FEE]: {
		tableColumnLocation: 4,
		checkBoxElementLocation: 4,
		title: '手续费',
		dataIndex: FEE,
		sorter: (prev, next) => prev[FEE] - next[FEE],
		render: function render(fee) {
			return <DecimalNumber data={fee} hasSeparator/>;
		},
	},
	[DEPOSITED_THIRD_PARTY]: {
		tableColumnLocation: 5,
		checkBoxElementLocation: 0,
		title: '存入第三方',
		dataIndex: DEPOSITED_THIRD_PARTY,
	},
	[DEPOSITS_AT]: {
		tableColumnLocation: 6,
		checkBoxElementLocation: 12,
		title: '充值日期',
		dataIndex: DEPOSITS_AT,
		sorter: (prev, next) => convertDateStringToTimestamp(prev[DEPOSITS_AT]) - convertDateStringToTimestamp(next[DEPOSITS_AT]),
		render: (value) => {
			const formatedDate = isDateValid(value) ? formatDate(value) : '';

			return formatedDate;
		},
	},
	[CONFIRMED_AT]: {
		tableColumnLocation: 7,
		checkBoxElementLocation: 13,
		title: '确认日期',
		dataIndex: CONFIRMED_AT,
		sorter: (prev, next) => convertDateStringToTimestamp(prev[CONFIRMED_AT]) - convertDateStringToTimestamp(next[CONFIRMED_AT]),
		render: (value) => {
			const formatedDate = isDateValid(value) ? formatDate(value) : '';

			return formatedDate;
		},
	},
	[COMMENT]: {
		tableColumnLocation: 8,
		checkBoxElementLocation: 10,
		title: '备注',
		dataIndex: COMMENT,
	},
	[OPERATOR]: {
		tableColumnLocation: 9,
		checkBoxElementLocation: 11,
		title: '操作者',
		dataIndex: OPERATOR,
	},
	[THIRD_PARTY_ACCOUNT]: {
		tableColumnLocation: 10,
		checkBoxElementLocation: 8,
		title: '第三方帐户',
		dataIndex: THIRD_PARTY_ACCOUNT,
	},
	[DEBIT_CARD_NUMBER]: {
		tableColumnLocation: 11,
		checkBoxElementLocation: 9,
		title: '收款卡号',
		dataIndex: DEBIT_CARD_NUMBER,
	},
	[STATUS]: {
		tableColumnLocation: 12,
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
		tableColumnLocation: 13,
		checkBoxElementLocation: 1,
		title: '操作选项',
		dataIndex: OPERATION,
	},
};

export const defaultEnabledColumns = [
	LEVEL,
	ORDER_ID,
	THIRD_PARTY_ACCOUNT,
	USERNAME,
	DEPOSITS_AT,
	CONFIRMED_AT,
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
		title: '存入第三方',
		dataIndex: DEPOSITED_THIRD_PARTY,
		key: DEPOSITED_THIRD_PARTY,
	},
	{
		title: '第三方帐户',
		dataIndex: THIRD_PARTY_ACCOUNT,
		key: THIRD_PARTY_ACCOUNT,
	},
	{
		title: '收款卡号',
		dataIndex: DEBIT_CARD_NUMBER,
		key: DEBIT_CARD_NUMBER,
	},
];