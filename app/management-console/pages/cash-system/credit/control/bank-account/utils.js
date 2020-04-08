import React from 'react';
import { DecimalNumber, } from 'ljit-react-components';
import LevelCell from '../level-cell';
import StatusCell from '../status-cell';
import { getStatus, } from '../utils';

export const ColumnDefinitionEnums = {
	NAME: 'name',
	BANK: 'bank',
	BANK_ACCOUNT: 'bankAccount',
	DEPOSIT_TYPE: 'depositType',
	USERNAME: 'username',
	CREATED_AT: 'createdAt',
	RECHARGE_TYPE: 'rechargeType',
	LEVEL: 'level',
	MIN_COLLECTION: 'minCollection',
	MAX_COLLECTION: 'maxCollection',
	STATUS: 'status',
	OPERATION: 'operation',
	PAYEE: 'payee',
	NET_POINT: 'netPoint',
	HINT_ACCOUNT: 'hintAccount',
	REMARK: 'remark',
	LAST_UPDATE_TIME: 'lastUpdateTime',
};

const {
	NAME,
	BANK,
	BANK_ACCOUNT,
	RECHARGE_TYPE,
	LEVEL,
	MIN_COLLECTION,
	MAX_COLLECTION,
	STATUS,
	PAYEE,
	NET_POINT,
	HINT_ACCOUNT,
	REMARK,
	LAST_UPDATE_TIME,
} = ColumnDefinitionEnums;

export const ColumnDefinitionMap = {
	[NAME]: {
		title: '名称',
		dataIndex: NAME,
	},
	[BANK]: {
		title: '银行',
		dataIndex: BANK,
	},
	[BANK_ACCOUNT]: {
		title: '银行帐号',
		dataIndex: BANK_ACCOUNT,
	},
	[RECHARGE_TYPE]: {
		title: '充值类型',
		dataIndex: RECHARGE_TYPE,
	},
	[LEVEL]: {
		title: '层级',
		dataIndex: LEVEL,
		render: (level) => <LevelCell levels={level} />,
	},
	[MIN_COLLECTION]: {
		title: '最小收款金额',
		dataIndex: MIN_COLLECTION,
		render: (minCollection) => <DecimalNumber data={minCollection} isCurrency hasSeparator/>,
	},
	[MAX_COLLECTION]: {
		title: '最大收款金额',
		dataIndex: MAX_COLLECTION,
		render: (maxCollection) => <DecimalNumber data={maxCollection} isCurrency hasSeparator/>,
	},
	[STATUS]: {
		title: '状态',
		dataIndex: STATUS,
		render: (status) => <StatusCell {...getStatus(status)} />,
	},
	[PAYEE]: {
		title: '收款人',
		dataIndex: PAYEE,
	},
	[NET_POINT]: {
		title: '开户行网点',
		dataIndex: NET_POINT,
	},
	[HINT_ACCOUNT]: {
		title: '提示帐号',
		dataIndex: HINT_ACCOUNT,
	},
	[REMARK]: {
		title: '备注',
		dataIndex: REMARK,
	},
	[LAST_UPDATE_TIME]: {
		title: '最后更新时间',
		dataIndex: LAST_UPDATE_TIME,
	},
};
