import React from 'react';
import { StatusTag, } from 'ljit-react-components';
import { getRandom, } from '../../../../lib/utils';

export function levelElement(level = '') {
	return <div key={level} >{`第${level}层`}</div>;
}

export function levelTexting(level = '') {
	return `第${level}层`;
}

export function getLevelsElementList(levels = []) {
	return levels.map(levelElement);
}

export function getLevelsString(levels = []) {
	return levels.map(levelTexting).join('、');
}

export const StatusEnums = {
	ARCHIVED: '0',
	ACTIVE: '1',
	RECOMMEND: '4',
	AUTOPAY_ON: '6',
};

const {
	ARCHIVED,
	ACTIVE,
	RECOMMEND,
	AUTOPAY_ON,
} = StatusEnums;

export const fakeData = Array.from(Array(20).keys()).map((index) => ({
	_id: index + 1,
	rechargeName: `rechargeName - ${index + 1}`,
	name: '銀行二',
	bank: '上海銀行',
	rechargeType: '银行汇款',
	tradeName: '11050163980000000752',
	level: ['1', '3', '7'],
	minCollection: 500,
	maxCollection: 3462,
	status: getRandom(0, 1) + '',
	recommendation: getRandom(3, 1) + '',
	thirdPartyPay: 'thirdPartyPay',
	smartPayPublicKey: 'smartPayPublicKey',
	vendorKey: 'venderKey',
	shoppingRedirection: 'shoppingRedirection',
	collectionType: index % 2 ? 'range' : 'fixed',
	singleDispensing: `${index + 500}`,
	deactivationAmount: `${index + 1000}`,
	redirectAddress: `dadas${index + 1}.com`,
	hiddenDevice: index % 2 ? 'PC' : 'mobile',
	deposit: `${index + 10}%`,
	depositProfit: `${index + 10}%`,
	remark: `remark - ${index + 1}`,
	payee: `payee - ${index + 1}`,
	netPoint: `netPoint - ${index + 1}`,
	lastUpdateTime: `lastUpdateTime - ${index + 1}`,
	clientAccount: `clientAccount - ${index + 1}`,
	handlingFeePercent: 12902,
	hintAccount: `hintAccount - ${index + 1}`,
	bankAccount: '11050163980000000752',
	fixedCollections: '100,200,300,500,1000,2000',
	paymentNumber: `paymentNumber - ${index + 1}`,
	merchantName: `merchantName - ${index + 1}`,
	paymentPlatform: `paymentPlatform - ${index + 1}`,
	minDispensing: 500,
	maxDispensing: 3462,
	autoPayment: getRandom(5, 1) + '',
}));

export function getStatus(status) {
	let statusValue = '';
	let statusText = '';

	switch (status) {
		case ACTIVE:
			statusValue = StatusTag.StatusEnums.SUCCESS;
			statusText = '启用';
			break;
		case ARCHIVED:
			statusValue = StatusTag.StatusEnums.ERROR;
			statusText = '停用';
			break;
		default:
	}

	return { statusValue, statusText };
}

export function getPaymentStatus(status) {
	let statusValue = '';

	let statusText = '';

	switch (status) {
		case RECOMMEND:
			statusValue = StatusTag.StatusEnums.LOSE;
			statusText = '推荐中';
			break;
		case AUTOPAY_ON:
			statusValue = StatusTag.StatusEnums.LOSE;
			statusText = '自动出款';
			break;
		case ACTIVE:
			statusValue = StatusTag.StatusEnums.SUCCESS;
			statusText = '启用';
			break;
		case ARCHIVED:
			statusValue = StatusTag.StatusEnums.ERROR;
			statusText = '停用';
			break;
		default:
	}

	return { statusValue, statusText };
}

export function checkStatusIsArchived(status) {
	if (status !== ARCHIVED) {
		return false;
	}
	return true;
}

export const CollectionTypeEnums = {
	FIXED: 'fixed',
	RANGE: 'range',
};

export const HiddenDeviceTypeEnums = {
	PC: 'PC',
	MOBILE: 'mobile',
};

export const CashierCounterTypeEnums = {
	CASHIER: 'cashier',
	BANK_LINK: 'bankLink'
};
