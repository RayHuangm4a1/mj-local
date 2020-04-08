import React from 'react';
import {
	DecimalNumber,
	StatusTag,
} from 'ljit-react-components';
import { DepositStatusEnum, } from '../../../lib/enums';

export function checkIsNewStatus(data) {
	return data.status === DepositStatusEnum.NEW;
}

export function checkIsInconsistentStatus(data) {
	return data.status === DepositStatusEnum.INCONSISTENT;
}

export const DEPOSIT_MODAL_PREFIX_CLASS = 'cash-system-credit-deposit-confirm-modal';

const {
	CONFIRMED,
	NEW,
	CANCELED,
	EXPIRED,
	INCONSISTENT,
} = DepositStatusEnum;

const {
	SUCCESS,
	ERROR,
	WARNING,
	LOSE,
	PENDING,
} = StatusTag.StatusEnums;

export const ConfirmStatusesMap = {
	[CONFIRMED]: {
		status: SUCCESS,
		text: '已确认',
	},
	[NEW]: {
		status: PENDING,
		text: '待确认',
	},
	[CANCELED]: {
		status: ERROR,
		text: '已取消',
	},
	[EXPIRED]: {
		status: LOSE,
		text: '已过期',
	},
	[INCONSISTENT]: {
		status: WARNING,
		text: '残留',
	},
};
