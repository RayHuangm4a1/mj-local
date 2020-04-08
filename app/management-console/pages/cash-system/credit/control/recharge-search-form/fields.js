import React from 'react';
import PropTypes from 'prop-types';
import {
	Input,
	InputNumber,
	Select,
	RadioGroup,
	FormItem,
	InputGroup,
} from 'ljit-react-components';
import { StatusEnums, } from '../utils';

const { ARCHIVED, ACTIVE, } = StatusEnums;

const propTypes = {
	form: PropTypes.object,
};

const dividerStyle = {
	width: 30,
	padding: 0,
	borderLeft: 0,
	pointerEvents: 'none',
	backgroundColor: '#fff',
	textAlign: 'center',
};

export function BankName() {
	return (
		<FormItem
			key="bankName"
			label="银行："
			itemName="bankName"
			columnType={FormItem.ColumnTypeEnums.MEDIUM}
		>
			<Input
				placeholder="请输入银行名称"
			/>
		</FormItem>
	);
}
BankName.propTypes = propTypes;

export function BankAccount() {
	return (
		<FormItem
			key="bankAccount"
			label="银行帐号："
			itemName="bankAccount"
			columnType={FormItem.ColumnTypeEnums.MEDIUM}
		>
			<Input
				placeholder="请输入银行帐号"
			/>
		</FormItem>
	);
}
BankAccount.propTypes = propTypes;

export function DepositBank() {
	return (
		<FormItem
			key="depositBank"
			label="网点："
			itemName="depositBank"
			columnType={FormItem.ColumnTypeEnums.MEDIUM}
		>
			<Input
				placeholder="请输入网点"
			/>
		</FormItem>
	);
}
DepositBank.propTypes = propTypes;

export function RemindAccount() {
	return (
		<FormItem
			key="remindAccount"
			label="提示帐号："
			itemName="remindAccount"
			columnType={FormItem.ColumnTypeEnums.MEDIUM}
		>
			<Input
				placeholder="请输入提示帐号"
			/>
		</FormItem>
	);
}
RemindAccount.propTypes = propTypes;

export function RechargeName() {
	return (
		<FormItem
			key="rechargeName"
			label="名称："
			itemName="rechargeName"
			columnType={FormItem.ColumnTypeEnums.MEDIUM}
		>
			<Input
				placeholder="请输入名称"
			/>
		</FormItem>
	);
}
RechargeName.propTypes = propTypes;

export function RechargeType({ rechargeTypeOptions, }) {
	return (
		<FormItem
			key="rechargeType"
			label="充值类型："
			itemName="rechargeType"
			columnType={FormItem.ColumnTypeEnums.MEDIUM}
		>
			<Select
				placeholder="请选择"
				options={rechargeTypeOptions}
			/>
		</FormItem>
	);
}
RechargeType.propTypes = {
	...propTypes,
	rechargeTypeOptions: PropTypes.array,
};

export function TradeName() {
	return (
		<FormItem
			key="tradeName"
			label="商号："
			itemName="tradeName"
			columnType={FormItem.ColumnTypeEnums.MEDIUM}>
			<Input
				placeholder="请输入商号"
			/>
		</FormItem>
	);
}
TradeName.propTypes = propTypes;

export function DeactivationAmount() {
	return (
		<FormItem
			key="deactivationAmount"
			label="停用金额："
			itemName="deactivationAmount"
			columnType={FormItem.ColumnTypeEnums.MEDIUM}
		>
			<InputNumber
				style={{ width: '100%' }}
				min={0}
				placeholder="请输入停用金额"
			/>
		</FormItem>
	);
}
DeactivationAmount.propTypes = propTypes;

export function Payee() {
	return (
		<FormItem
			key="payee"
			label="收款人："
			itemName="payee"
			columnType={FormItem.ColumnTypeEnums.MEDIUM}
		>
			<Input
				placeholder="请输入收款人"
			/>
		</FormItem>
	);
}
Payee.propTypes = propTypes;

export function ReceivedAmount() {
	return (
		<FormItem
			key="ReceivedAmount"
			label="收款金额："
			isInputGroup={true}
			groupItemNames={["minReceivedAmount", "symbol", "maxReceivedAmount" ]}
			columnType={FormItem.ColumnTypeEnums.MEDIUM}
		>
			<InputGroup isCompact>
				<InputNumber
					key="minReceivedAmount"
					style={{ width: 'calc(50% - 15px)' }}
					min={0}
					placeholder="最小收款金额"
				/>
				<Input
					key="symbol"
					style={dividerStyle}
					placeholder="~"
				/>
				<InputNumber
					key="maxReceivedAmount"
					style={{ width: 'calc(50% - 15px)', borderLeft: 0 }}
					min={0}
					placeholder="最大收款金额"
				/>
			</InputGroup>
		</FormItem>
	);
}
ReceivedAmount.propTypes = propTypes;

export function SendAmount() {
	return (
		<FormItem
			key="SendAmount"
			label="出款金额："
			isInputGroup
			groupItemNames={["minSendAmount", "symbol", "maxSendAmount" ]}
			columnType={FormItem.ColumnTypeEnums.MEDIUM}
		>
			<InputGroup isCompact>
				<InputNumber
					key="minSendAmount"
					style={{ width: 'calc(50% - 15px)', }}
					min={0}
					placeholder="最小出款金额"
				/>
				<Input
					key="symbol"
					style={dividerStyle}
					placeholder="~"
					disabled
				/>
				<InputNumber
					key="maxSendAmount"
					style={{ width: 'calc(50% - 15px)', borderLeft: 0 }}
					min={0}
					placeholder="最大出款金额"
				/>
			</InputGroup>
		</FormItem>
	);
}
SendAmount.propTypes = propTypes;

export function SinglePaymentLimit() {
	return (
		<FormItem
			key="singlePaymentLimit"
			label="单笔出款限制："
			itemName="singlePaymentLimit"
			columnType={FormItem.ColumnTypeEnums.MEDIUM}
		>
			<InputNumber
				style={{ width: '100%' }}
				min={0}
				placeholder="请输入停用金额"
			/>
		</FormItem>
	);
}
SinglePaymentLimit.propTypes = propTypes;

export function Level({ levelOptions, }) {
	return (
		<FormItem
			key="level"
			label="层级："
			itemName="level"
			columnType={FormItem.ColumnTypeEnums.MEDIUM}
		>
			<Select
				placeholder="请选择"
				options={levelOptions}
			/>
		</FormItem>
	);
}
Level.propTypes = {
	...propTypes,
	levelOptions: PropTypes.array,
};

export function Status() {
	return (
		<FormItem
			key="status"
			label="状态："
			itemName="status"
			columnType={FormItem.ColumnTypeEnums.MEDIUM}
		>
			<Select
				placeholder="请选择"
				options={[
					{ label: '停用', value: ARCHIVED, },
					{ label: '啟用', value: ACTIVE, },
				]}
			/>
		</FormItem>
	);
}
Status.propTypes = propTypes;

export function ShoppingRedirection() {
	return (
		<FormItem
			key="shoppingRedirection"
			label="购物跳转网址："
			itemName="shoppingRedirection"
			columnType={FormItem.ColumnTypeEnums.MEDIUM}
		>
			<Input
				placeholder="请输入"
			/>
		</FormItem>
	);
}
ShoppingRedirection.propTypes = propTypes;

export function HiddenDevice() {
	return (
		<FormItem
			key="hiddenDevice"
			label="隐藏装置："
			itemName="hiddenDevice"
			columnType={FormItem.ColumnTypeEnums.MEDIUM}
		>
			<RadioGroup
				options={[
					{ label: 'PC', value: '1', },
					{ label: '手机', value: '2', },
				]}
			/>
		</FormItem>
	);
}
HiddenDevice.propTypes = propTypes;

export function PaymentPlatform({ platformOptions, }) {
	return (
		<FormItem
			key="paymentPlatform"
			label="支付平台："
			itemName="paymentPlatform"
			columnType={FormItem.ColumnTypeEnums.MEDIUM}
		>
			<Select
				placeholder="请选择"
				options={platformOptions}
			/>
		</FormItem>
	);
}
PaymentPlatform.propTypes = {
	...propTypes,
	platformOptions: PropTypes.array,
};
