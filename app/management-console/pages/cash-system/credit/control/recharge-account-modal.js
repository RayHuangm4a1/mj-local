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
		name: PropTypes.string,
		bank: PropTypes.string,
		rechargeType: PropTypes.string,
		bankAccount: PropTypes.string,
		level: PropTypes.arrayOf(PropTypes.string),
		payee: PropTypes.string,
		netPoint: PropTypes.string,
		clientAccount: PropTypes.string,
		collectionType: PropTypes.string,
		fixedCollections: PropTypes.string,
		minCollection: PropTypes.number,
		maxCollection: PropTypes.number,
		handlingFeePercent: PropTypes.number,
		effectiveBetPercent: PropTypes.number,
		remark: PropTypes.string,
		lastUpdateTime: PropTypes.string,
	}),
	isEditStatus: PropTypes.bool,
	isVisible: PropTypes.bool,
	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	bankOptions: PropTypes.arrayOf(PropTypes.shape({
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
	isEditStatus: false,
	isVisible: false,
	bankOptions: [],
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
const CLIENT_ACCOUNT_TEXT = '完成提交入款后，请向在线客服索取银行';

class RechargeAccountModal extends Component {
	constructor() {
		super();
		this.state = {
			collectionType: CollectionTypeEnums.RANGE,
		};
		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleCancel = this._handleCancel.bind(this);
		this._handleChangeCollection = this._handleChangeCollection.bind(this);
		this._handleShowInputValue = this._handleShowInputValue.bind(this);
		this._renderLastModifyTimeField = this._renderLastModifyTimeField.bind(this);
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

	_handleShowInputValue(type) {
		const form = this.formInstance.getForm();
		const {
			getFieldValue,
			setFieldsValue,
			resetFields,
		} = form;
		const account = getFieldValue('bankAccount');

		if (type === 'service') {
			setFieldsValue({ clientAccount: CLIENT_ACCOUNT_TEXT });
		} else if (type === 'account' && !!account) {
			setFieldsValue({ clientAccount: account });
		} else {
			resetFields('clientAccount');
		}
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
						columnType={FormItem.ColumnTypeEnums.SMALL}
						className="collection-type-form-item"
						labelColon={false}
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
						columnType={FormItem.ColumnTypeEnums.SMALL}
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
						columnType={FormItem.ColumnTypeEnums.SMALL}
					>
						<InputNumber
							style={fieldStyle}
						/>
					</FormItem>
				</Fragment>
			);
		}
	}

	_renderLastModifyTimeField() {
		const { isEditStatus, initialValues, } = this.props;

		if (isEditStatus) {
			return (
				<FormItem
					itemName="lastUpdateTime"
					itemConfig={{
						initialValue: initialValues.lastUpdateTime,
					}}
					label="最后异动时间："
					columnType={FormItem.ColumnTypeEnums.SMALL}
				>
					<Input
						readOnly
						style={fieldStyle}
					/>
				</FormItem>
			);
		}
		return null;
	}

	render() {
		const {
			initialValues,
			isVisible,
			title,
			isEditStatus,
			levelOptions,
			bankOptions,
		} = this.props;

		const {
			_renderCollectionForm,
			_handleChangeCollection,
			_renderLastModifyTimeField,
			_handleShowInputValue,
		} = this;

		return (
			<PageModal
				modalSize={Modal.ModalSizeEnum.NORMAL}
				visible={isVisible}
				title={title}
				onClickCancel={this._handleCancel}
				onClickOk={this._handleSubmit}
				className="recharge-account-modal"
			>
				<Form
					ref={formRef => this.formInstance = formRef}
					onChange={() => {}}
					submitButtonDisabled
					cancelButtonDisabled
				>
					<FormItem
						itemName="name"
						itemConfig={{
							initialValue: initialValues.name,
						}}
						label="名称："
						columnType={FormItem.ColumnTypeEnums.SMALL}
					>
						<Input
							placeholder="请输入名称"
							style={fieldStyle}
						/>
					</FormItem>
					<FormItem
						itemName="bank"
						itemConfig={{
							initialValue: initialValues.bank,
						}}
						label="银行："
						columnType={FormItem.ColumnTypeEnums.SMALL}
					>
						<Select
							placeholder="请选择银行"
							disabled={isEditStatus}
							style={fieldStyle}
							options={bankOptions}
						/>
					</FormItem>
					<FormItem
						itemName="rechargeType"
						itemConfig={{
							initialValue: initialValues.rechargeType,
						}}
						label="充值类型："
						columnType={FormItem.ColumnTypeEnums.SMALL}
					>
						<Input
							readOnly
							style={fieldStyle}
						/>
					</FormItem>
					<FormItem
						itemName="bankAccount"
						itemConfig={{
							initialValue: initialValues.bankAccount,
						}}
						label="银行帐号："
						columnType={FormItem.ColumnTypeEnums.SMALL}
					>
						<Input
							readOnly={isEditStatus}
							style={fieldStyle}
						/>
					</FormItem>
					<FormItem
						itemName="level"
						itemConfig={{
							initialValue: initialValues.level,
						}}
						label="层级："
						columnType={FormItem.ColumnTypeEnums.SMALL}
						noMargin
					>
						<CheckBoxGroup
							className="level-group"
							style={{ width: '100%' }}
							options={levelOptions}
						/>
					</FormItem>
					<FormItem
						itemName="payee"
						itemConfig={{
							initialValue: initialValues.payee,
						}}
						label="收款人："
						columnType={FormItem.ColumnTypeEnums.SMALL}
					>
						<Input
							style={fieldStyle}
						/>
					</FormItem>
					<FormItem
						itemName="netPoint"
						itemConfig={{
							initialValue: initialValues.netPoint,
						}}
						label="开户银行网点："
						columnType={FormItem.ColumnTypeEnums.SMALL}
					>
						<Input
							style={fieldStyle}
						/>
					</FormItem>
					<FormItem
						itemName="clientAccount"
						itemConfig={{
							initialValue: initialValues.clientAccount,
						}}
						label="会员端显示帐号："
						columnType={FormItem.ColumnTypeEnums.SMALL}
						extraMessage={
							<React.Fragment>
								<a onClick={() => _handleShowInputValue('account')}>银行帐号</a>
								<a onClick={() => _handleShowInputValue('service')}>詢問客服</a>
							</React.Fragment>
						}
						className="client-account"
					>
						<Input
							readOnly
							className="client-account-input"
						/>
					</FormItem>
					<FormItem
						itemName="collectionType"
						itemConfig={{
							initialValue: initialValues.collectionType,
						}}
						label="收款金额："
						columnType={FormItem.ColumnTypeEnums.SMALL}
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
						itemName="handlingFeePercent"
						itemConfig={{
							initialValue: initialValues.handlingFeePercent,
						}}
						label="手续费百分比："
						columnType={FormItem.ColumnTypeEnums.SMALL}
					>
						<InputNumber
							formatType="percentage"
							style={fieldStyle}
						/>
					</FormItem>
					<FormItem
						itemName="effectiveBetPercent"
						itemConfig={{
							initialValue: initialValues.effectiveBetPercent,
						}}
						label="打码量百分比："
						columnType={FormItem.ColumnTypeEnums.SMALL}
					>
						<InputNumber
							formatType="percentage"
							style={fieldStyle}
						/>
					</FormItem>
					<FormItem
						itemName="remark"
						itemConfig={{
							initialValue: initialValues.remark,
						}}
						label="备注："
						columnType={FormItem.ColumnTypeEnums.SMALL}
					>
						<Input
							style={fieldStyle}
						/>
					</FormItem>
					{_renderLastModifyTimeField()}
				</Form>
			</PageModal>
		);
	}
}

RechargeAccountModal.propTypes = propTypes;
RechargeAccountModal.defaultProps = defaultProps;

export default RechargeAccountModal;
