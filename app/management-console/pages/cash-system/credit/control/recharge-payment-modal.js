import React, { Component, Fragment, } from 'react';
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
import { CollectionTypeEnums, } from './utils';

const { FIXED, RANGE, } = CollectionTypeEnums;

const propTypes = {
	initialValues: PropTypes.shape({
		vendorName: PropTypes.string,
		thirdPartyPay: PropTypes.stirng,
		rechargeType: PropTypes.string,
		tradeName: PropTypes.string,
		smartPayPublicKey: PropTypes.string,
		level: PropTypes.arrayOf(PropTypes.string),
		hiddenDevice: PropTypes.string,
		fixedCollections: PropTypes.string,
		minCollection: PropTypes.number,
		maxCollection: PropTypes.number,
		cashDesk: PropTypes.string,
		handlingFeePercent: PropTypes.number,
		depositProfit: PropTypes.number,
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
	levelOptions: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string,
		value: PropTypes.string,
	})),
	onCancel: PropTypes.func,
	onSubmit: PropTypes.func,
};
const defaultProps = {
	initialValues: {},
	isVisible: false,
	levelOptions: [
		{ label: '第一层', value: '1', },
		{ label: '第二层', value: '2', },
		{ label: '第三层', value: '3', },
		{ label: '第四层', value: '4', },
		{ label: '第五层', value: '5', },
		{ label: '第六层', value: '6', },
		{ label: '第七层', value: '7', },
		{ label: '第八层', value: '8', },
		{ label: '第九层', value: '9', },
		{ label: '第十层', value: '10', },
	],
	onCancel: () => {},
	onSubmit: () => {},
};

const fieldStyle = {
	width: 397,
};

class RechargePaymentModal extends Component {
	constructor() {
		super();
		this.state = {
			collectionType: CollectionTypeEnums.RANGE,
		};
		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleCancel = this._handleCancel.bind(this);
		this._handleChangeCollection = this._handleChangeCollection.bind(this);
		this._renderCollectionForm = this._renderCollectionForm.bind(this);
	}

	_handleSubmit(event) {
		const { onSubmit, } = this.props;
		const form = this.formInstance.getForm();

		event.preventDefault();
		form.validateFields((error, values) => {
			if (!error) {
				onSubmit(values, form);
			}
		});
	}

	_handleCancel(event) {
		const { onCancel, } = this.props;
		const form = this.formInstance.getForm();

		onCancel(event, form);
		form.resetFields();
	}

	_handleChangeCollection(value) {
		this.setState({
			collectionType: value,
		});
	}

	_renderCollectionForm() {
		const { initialValues, } = this.props;
		const { collectionType, } = this.state;

		if (collectionType === FIXED) {
			return (
				<Fragment>
					<FormItem
						itemName="fixedCollections"
						itemConfig={{
							initialValue: initialValues.fixedCollections,
						}}
						label={
							<div style={{ lineHeight: '22px' }}>
								<div>固定收款金额：</div>
								<div>（请用逗号分隔）</div>
							</div>
						}
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
						className="collection-type-form-item"
					>
						<Input
							style={fieldStyle}
						/>
					</FormItem>
				</Fragment>
			);
		}
		if (collectionType === RANGE) {
			return (
				<Fragment>
					<FormItem
						itemName="minCollection"
						itemConfig={{
							initialValue: initialValues.minCollection,
						}}
						label="最小收款金额："
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
					>
						<InputNumber
							style={fieldStyle}
						/>
					</FormItem>
					<FormItem
						itemName="maxCollection"
						itemConfig={{
							initialValue: initialValues.maxCollection,
						}}
						label="最大收款金额："
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

	render() {
		const {
			initialValues,
			isVisible,
			title,
			levelOptions,
			thirdPartyOptions,
		} = this.props;

		const { _renderCollectionForm, _handleChangeCollection, } = this;

		return (
			<PageModal
				modalSize={Modal.ModalSizeEnum.NORMAL}
				visible={isVisible}
				title={title}
				onClickCancel={this._handleCancel}
				onClickOk={this._handleSubmit}
			>
				<Form
					ref={formRef => this.formInstance = formRef}
					onChange={() => {}}
					submitButtonDisabled
					cancelButtonDisabled
				>
					<FormItem
						label="商家名称："
						itemName="vendorName"
						itemConfig={{
							initialValue: initialValues.vendorName,
						}}
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
					>
						<Input
							placeholder="请输入商家名称"
							style={fieldStyle}
						/>
					</FormItem>
					<FormItem
						label="第三方支付："
						itemName="thirdPartyPay"
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
					>
						<Select
							placeholder=""
							options={thirdPartyOptions}
							style={fieldStyle}
						/>
					</FormItem>
					<FormItem
						label="商号："
						itemName="tradeName"
						itemConfig={{
							initialValue: initialValues.tradeName,
						}}
						columnType={FormItem.ColumnTypeEnums.MEDIUM}>
						<Input
							placeholder="请输入商号"
							style={fieldStyle}
						/>
					</FormItem>
					<FormItem
						label="智付公钥："
						itemName="smartPayPublicKey"
						itemConfig={{
							initialValue: initialValues.smartPayPublicKey,
						}}
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
					>
						<Input
							placeholder=""
							style={fieldStyle}
						/>
					</FormItem>
					<FormItem
						itemName="level"
						itemConfig={{
							initialValue: initialValues.level,
						}}
						label="层级："
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
						noMargin
					>
						<CheckBoxGroup
							className="level-group"
							style={{ width: '100%' }}
							options={levelOptions}
						/>
					</FormItem>
					<FormItem
						label="隐藏装置："
						itemName="hiddenDevice"
						itemConfig={{
							initialValue: initialValues.hiddenDevice,
						}}
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
					>
						<RadioGroup
							options={[
								{ label: 'PC', value: '1', },
								{ label: '手机', value: '2', },
							]}
						/>
					</FormItem>
					<FormItem
						itemName="collectionType"
						itemConfig={{
							initialValue: initialValues.collectionType,
						}}
						label="收款金额："
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
					>
						<RadioGroup
							options={[
								{ label: '范围', value: CollectionTypeEnums.RANGE },
								{ label: '固定', value: CollectionTypeEnums.FIXED },
							]}
							onChange={(event) => _handleChangeCollection(event.target.value)}
						/>
					</FormItem>
					{_renderCollectionForm()}
					<FormItem
						label="收银柜台："
						itemName="cashDesk"
						itemConfig={{
							initialValue: initialValues.cashDesk,
						}}
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
					>
						<RadioGroup
							options={[
								{ label: '收银台', value: '1', },
								{ label: '银行直连', value: '2', },
							]}
						/>
					</FormItem>
					<FormItem
						itemName="handlingFeePercent"
						itemConfig={{
							initialValue: initialValues.handlingFeePercent,
						}}
						label="手续费百分比："
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
					>
						<InputNumber
							formatType="percentage"
							style={fieldStyle}
						/>
					</FormItem>
					<FormItem
						label="存款盈利百分比："
						itemName="depositProfit"
						itemConfig={{
							initialValue: initialValues.depositProfit,
						}}
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
					>
						<InputNumber
							formatType="percentage"
							style={fieldStyle}
						/>
					</FormItem>
				</Form>
			</PageModal>
		);
	}
}

RechargePaymentModal.propTypes = propTypes;
RechargePaymentModal.defaultProps = defaultProps;

export default RechargePaymentModal;
