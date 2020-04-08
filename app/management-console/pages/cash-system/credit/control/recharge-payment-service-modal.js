import React, { useState, useEffect, useRef, Fragment, } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Modal,
	Input,
	Select,
	InputNumber,
	CheckBoxGroup,
	RadioGroup,
} from 'ljit-react-components';
import PageModal from '../../../../components/page-modal';
import {
	CollectionTypeEnums,
	HiddenDeviceTypeEnums,
	CashierCounterTypeEnums,
} from './utils';

const { FIXED, RANGE, } = CollectionTypeEnums;
const { PC, MOBILE, } = HiddenDeviceTypeEnums;
const { CASHIER, BANK_LINK, } = CashierCounterTypeEnums;

const propTypes = {
	initialValues: PropTypes.shape({
		rechargeName: PropTypes.string,
		thirdPartyPay: PropTypes.string,
		rechargeType: PropTypes.string,
		tradeName: PropTypes.string,
		smartPayPublicKey: PropTypes.string,
		vendorKey: PropTypes.string,
		shoppingRedirection: PropTypes.string,
		deactivationAmount: PropTypes.string,
		level: PropTypes.arrayOf(PropTypes.string),
		hiddenDevice: PropTypes.string,
		collectionType: PropTypes.string,
		fixedCollections: PropTypes.string,
		minCollection: PropTypes.number,
		maxCollection: PropTypes.number,
	}),
	isVisible: PropTypes.bool,
	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	thirdPartyOptions: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string,
		value: PropTypes.string,
	})),
	rechargeTypeOptions: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string,
		value: PropTypes.string,
	})),
	levelOptions: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string,
		value: PropTypes.string,
	})),
	onCancel: PropTypes.func,
	onSubmit: PropTypes.func,
	className: PropTypes.string,
};
const defaultProps = {
	initialValues: {},
	isVisible: false,
	rechargeTypeOptions: [],
	levelOptions: [
		{ label: '新人层', value: '1', },
		{ label: '第二层', value: '2', },
		{ label: '第三层', value: '3', },
		{ label: '第四层', value: '4', },
		{ label: '第五层', value: '5', },
		{ label: '第六层', value: '6', },
		{ label: '第七层', value: '7', },
		{ label: '第八层', value: '8', },
		{ label: '第九层', value: '9', },
		{ label: '第十层', value: '10', },
		{ label: '自动加入层', value: '11', },
		{ label: '特殊层A', value: '12', },
		{ label: '特殊层B', value: '13', },
		{ label: '特殊层C', value: '14', },
		{ label: '特殊层D', value: '15', },
		{ label: '特殊层E', value: '16', },
		{ label: '特殊层F', value: '17', },
		{ label: '特殊层G', value: '18', },
		{ label: '特殊层H', value: '19', },
		{ label: '特殊层I', value: '20', },
	],
	onCancel: () => {},
	onSubmit: () => {},
	className: '',
};

const fieldStyle = {
	width: 397,
};

function RechargePaymentServiceModal({
	initialValues: {
		collectionType: initCollectionType = RANGE,
		thirdPartyPay,
		vendorKey,
		rechargeName,
		rechargeType,
		tradeName,
		fixedCollections,
		smartPayPublicKey,
		shoppingRedirection,
		deactivationAmount,
		level,
		hiddenDevice = PC,
		minCollection,
		maxCollection,
	},
	isVisible,
	title,
	rechargeTypeOptions,
	levelOptions,
	thirdPartyOptions,
	onSubmit,
	onCancel,
	className,
}) {
	const [collectionType, setCollectionType] = useState(initCollectionType);
	const formInstance = useRef(null);

	useEffect(() => {
		let nextCollectionType = RANGE;

		if (isVisible && initCollectionType) {
			nextCollectionType = initCollectionType;
		}
		setCollectionType(nextCollectionType);
	}, [isVisible]);

	function _handleSubmit(event) {
		const form = formInstance.current.getForm();

		event.preventDefault();
		form.validateFields((error, values) => {
			if (!error) {
				onSubmit(values, form);
				form.resetFields();
			}
		});
	}

	function _handleCancel(event) {
		const form = formInstance.current.getForm();

		onCancel(event, form);
		form.resetFields();
	}

	function _handleChangeCollection(value) {
		setCollectionType(value);
	}

	function _renderVendorKeyField() {
		let extraMessage = '';

		if (vendorKey) {
			extraMessage = '金钥已设定，若不异动请空白';
		}
		return (
			<FormItem
				label="商家密钥"
				itemName="vendorKey"
				labelColon
				columnType={FormItem.ColumnTypeEnums.MEDIUM}
			>
				<Input
					placeholder={extraMessage}
					style={fieldStyle}
				/>
			</FormItem>
		);
	}

	function _renderCollectionForm() {
		if (collectionType === FIXED) {
			return (
				<Fragment>
					<FormItem
						itemName="fixedCollections"
						itemConfig={{
							initialValue: fixedCollections,
						}}
						label={
							<div style={{ lineHeight: '22px' }}>
								<div>固定收款金额：</div>
								<div>（请用逗号分隔）</div>
							</div>
						}
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
						className="collection-type-form-item"
						noMargin
					>
						<Input
							style={fieldStyle}
						/>
					</FormItem>
					<FormItem
						itemName="cashierCounter"
						label="收银柜台"
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
						labelColon
						itemConfig={{
							initialValue: CASHIER,
						}}
						noMargin
					>
						<RadioGroup
							options={[
								{ label: '收银台', value: CASHIER, },
								{ label: '银行直连', value: BANK_LINK, },
							]}
						/>
					</FormItem>
				</Fragment>
			);
		}
		if (collectionType === RANGE) {
			return (
				<Fragment>
					<FormItem
						label="最小收款金额"
						itemName="minCollection"
						labelColon
						itemConfig={{
							initialValue: minCollection,
						}}
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
					>
						<InputNumber
							style={fieldStyle}
						/>
					</FormItem>
					<FormItem
						label="最大收款金额"
						itemName="maxCollection"
						labelColon
						itemConfig={{
							initialValue: maxCollection,
						}}
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
					>
						<InputNumber
							style={fieldStyle}
						/>
					</FormItem>
				</Fragment>
			);
		}
	}

	return (
		<PageModal
			modalSize={Modal.ModalSizeEnum.NORMAL}
			visible={isVisible}
			title={title}
			onClickCancel={_handleCancel}
			onClickOk={_handleSubmit}
			className={className}
		>
			<Form
				ref={formInstance}
				submitButtonDisabled
				cancelButtonDisabled
			>
				<FormItem
					label="名称"
					itemName="rechargeName"
					labelColon
					itemConfig={{
						initialValue: rechargeName,
					}}
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
				>
					<Input
						placeholder="请输入名称"
						style={fieldStyle}
					/>
				</FormItem>
				<FormItem
					label="充值类型"
					itemName="rechargeType"
					labelColon
					itemConfig={{
						initialValue: rechargeType,
					}}
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
				>
					<Select
						placeholder="请选择充值类型"
						style={fieldStyle}
						options={rechargeTypeOptions}
						disabled={rechargeType}
					/>
				</FormItem>
				<FormItem
					label="支付平台"
					itemName="thirdPartyPay"
					labelColon
					itemConfig={{
						initialValue: thirdPartyPay,
					}}
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
				>
					<Select
						placeholder="请选择支付平台"
						options={thirdPartyOptions}
						style={fieldStyle}
						disabled={thirdPartyPay}
					/>
				</FormItem>
				<FormItem
					label="商号"
					itemName="tradeName"
					labelColon
					itemConfig={{
						initialValue: tradeName,
					}}
					columnType={FormItem.ColumnTypeEnums.MEDIUM}>
					<Input
						placeholder="请输入商号"
						style={fieldStyle}
					/>
				</FormItem>
				<FormItem
					label="智付公钥"
					itemName="smartPayPublicKey"
					labelColon
					itemConfig={{
						initialValue: smartPayPublicKey,
					}}
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
				>
					<Input
						placeholder=""
						style={fieldStyle}
					/>
				</FormItem>
				{_renderVendorKeyField()}
				<FormItem
					label="购物网跳转网址"
					itemName="shoppingRedirection"
					labelColon
					itemConfig={{
						initialValue: shoppingRedirection,
					}}
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
				>
					<Input
						placeholder="请输入"
						style={fieldStyle}
					/>
				</FormItem>
				<FormItem
					label="停用金额"
					itemName="deactivationAmount"
					labelColon
					itemConfig={{
						initialValue: deactivationAmount,
					}}
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
					noMargin
				>
					<InputNumber
						min={0}
						placeholder="请输入停用金额"
						style={fieldStyle}
					/>
				</FormItem>
				<FormItem
					label="层级"
					itemName="level"
					labelColon
					itemConfig={{
						initialValue: level,
					}}
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
					noMargin
				>
					<CheckBoxGroup
						options={levelOptions}
					/>
				</FormItem>
				<FormItem
					label="隐藏装置"
					itemName="hiddenDevice"
					labelColon
					itemConfig={{
						initialValue: hiddenDevice,
					}}
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
					noMargin
				>
					<RadioGroup
						options={[
							{ label: 'PC', value: PC },
							{ label: '手机', value: MOBILE },
						]}
					/>
				</FormItem>
				<FormItem
					label="收款金额"
					itemName="collectionType"
					labelColon
					itemConfig={{
						initialValue: collectionType,
					}}
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
					noMargin
				>
					<RadioGroup
						options={[
							{ label: '范围', value: RANGE },
							{ label: '固定', value: FIXED },
						]}
						onChange={(event) => _handleChangeCollection(event.target.value)}
					/>
				</FormItem>
				{_renderCollectionForm()}
				<FormItem
					label="手续费百分比"
					itemName="feePercent"
					labelColon
					itemConfig={{
						initialValue: 15,
					}}
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
				>
					<InputNumber
						style={fieldStyle}
						className="with-percent-input-number"
					/>
				</FormItem>
				<FormItem
					label="存款盈利百分比"
					itemName="profitPercent"
					labelColon
					itemConfig={{
						initialValue: 15,
					}}
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
				>
					<InputNumber
						style={fieldStyle}
						className="with-percent-input-number"
					/>
				</FormItem>
				{/* TODO add 充值說明 */}
			</Form>
		</PageModal>
	);
}

RechargePaymentServiceModal.propTypes = propTypes;
RechargePaymentServiceModal.defaultProps = defaultProps;

export default RechargePaymentServiceModal;
