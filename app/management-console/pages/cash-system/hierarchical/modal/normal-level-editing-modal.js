import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import {
	Form,
	FormItem,
	LabelContent,
	Input,
	InputNumber,
	RadioGroup,
	DatePicker,
	CheckBox,
} from 'ljit-react-components';
import { isDateValid, } from '../../../../lib/moment-utils';
import PageModal from '../../../../components/page-modal';
import { FinanceLevelDataPropTypes, } from '../../../../lib/prop-types-utils';
import { FinanceLevelStatusEnum, } from '../../../../lib/enums';

const NUM_2147483647 = 2147483647;
const NUM_999999999 = 999999999;

const {
	ENABLE,
	DISABLE,
} = FinanceLevelStatusEnum;

const propTypes = {
	data: FinanceLevelDataPropTypes,
	className: PropTypes.string,
	isVisible: PropTypes.bool,
	onSubmit: PropTypes.func,
	onClose: PropTypes.func,
};
const defaultProps = {
	isVisible: false,
	data: {},
	onSubmit: () => {},
	onClose: () => {},
};

class NormalLevelEditingModal extends Component {
	constructor() {
		super();
		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleCancel = this._handleCancel.bind(this);
		this._handleValidateRegisteredAfterDate = this._handleValidateRegisteredAfterDate.bind(this);
		this._handleValidateRegisteredBeforeDate = this._handleValidateRegisteredBeforeDate.bind(this);
	}

	_handleSubmit(event) {
		const { onSubmit, } = this.props;
		const form = this.formInstance.getForm();

		event.preventDefault();
		form.validateFields((error, values) => {
			if (!error) {
				onSubmit(values);
				form.resetFields();
			}
		});
	}

	_handleCancel(event) {
		const { onClose, } = this.props;
		const form = this.formInstance.getForm();

		onClose(event, form);
		form.resetFields();
	}

	_handleValidateRegisteredBeforeDate(rule, value, callback) {
		const form = this.formInstance.getForm();
		const compareBase = form.getFieldValue('registeredAfter');

		if (rule.required) {
			if (!value) {
				callback('加入截止日不能為空');
			}
			else if (Moment(value).isBefore(compareBase)) {
				callback('加入截止日不得早于加入起始日');
			}
		}
		callback();
	}

	_handleValidateRegisteredAfterDate(rule, value, callback) {
		const form = this.formInstance.getForm();
		const compareBase = form.getFieldValue('registeredBefore');

		if (rule.required) {
			if (!value) {
				callback('加入起始日不能為空');
			}
			else if (Moment(value).isAfter(compareBase)) {
				callback('加入起始日不得晚于加入截止日');
			}
		}
		callback();
	}

	render() {
		const { data, isVisible, } = this.props;
		const {
			_handleSubmit,
			_handleCancel,
			_handleValidateRegisteredAfterDate,
			_handleValidateRegisteredBeforeDate,
		} = this;
		const {
			displayLevel,
			name,
			registeredAfter,
			registeredBefore,
			numOfRegisteredDays,
			numOfDeposits,
			depositAmount,
			bettingAmount,
			withdrawalAmount,
			numOfWithdraws,
			description,
			status,
			isBettingAmountGreaterThanDepositAmount,
		} = data;

		return (
			<PageModal
				title="修改一般层级規則"
				visible={isVisible}
				onClickOk={_handleSubmit}
				onClickCancel={_handleCancel}
				className="normal-level-editing-modal"
			>
				<Form
					ref={formRef => this.formInstance = formRef}
					submitButtonDisabled
					cancelButtonDisabled
				>
					<LabelContent label="层级">
						{displayLevel}
					</LabelContent>
					<FormItem
						itemName="name"
						itemConfig={{
							initialValue: name,
							rules: [
								{
									required: true,
									min: 3,
									max: 15,
									message: '描述名称最少3码最多15码',
								},
							],
						}}
						label="描述名称"
					>
						<Input/>
					</FormItem>
					<FormItem
						itemName="registeredAfter"
						itemConfig={{
							initialValue: isDateValid(registeredAfter) ? Moment(registeredAfter) : undefined,
							rules: [
								{
									required: true,
									validator: _handleValidateRegisteredAfterDate,
								},
							],
						}}
						label="加入起始日"
					>
						<DatePicker
							format="YYYY/MM/DD"
						/>
					</FormItem>
					<FormItem
						itemName="registeredBefore"
						itemConfig={{
							initialValue: isDateValid(registeredBefore) ? Moment(registeredBefore) : undefined,
							rules: [
								{
									required: true,
									validator: _handleValidateRegisteredBeforeDate,
								},
							],
						}}
						label="加入截止日"
					>
						<DatePicker
							format="YYYY/MM/DD"
						/>
					</FormItem>
					<FormItem
						itemName="numOfRegisteredDays"
						itemConfig={{
							initialValue: numOfRegisteredDays,
							rules: [
								{
									required: true,
									message: '注册天数不能为空',
								},
							],
						}}
						label="注册天数"
					>
						<InputNumber
							min={0}
							max={NUM_2147483647}
						/>
					</FormItem>
					<FormItem
						itemName="numOfDeposits"
						itemConfig={{
							initialValue: numOfDeposits,
							rules: [
								{
									required: true,
									message: '充值次数不能为空',
								},
							],
						}}
						label="充值次数"
					>
						<InputNumber
							min={0}
							max={NUM_2147483647}
						/>
					</FormItem>
					<FormItem
						itemName="depositAmount"
						itemConfig={{
							initialValue: depositAmount,
							rules: [
								{
									required: true,
									message: '充值总额不能为空',
								},
							],
						}}
						label="充值总额"
					>
						<InputNumber
							min={0}
							max={NUM_2147483647}
						/>
					</FormItem>
					<FormItem
						itemName="bettingAmount"
						itemConfig={{
							initialValue: bettingAmount,
							rules: [
								{
									required: true,
									message: '消费金额不能为空',
								},
							],
						}}
						label="消费金额"
					>
						<InputNumber
							min={0}
							max={NUM_999999999}
						/>
					</FormItem>
					<FormItem
						itemName="numOfWithdraws"
						itemConfig={{
							initialValue: numOfWithdraws,
							rules: [
								{
									required: true,
									message: '提款次数不能为空',
								},
							],
						}}
						label="提款次数"
					>
						<InputNumber
							min={0}
							max={NUM_2147483647}
						/>
					</FormItem>
					<FormItem
						itemName="withdrawalAmount"
						itemConfig={{
							initialValue: withdrawalAmount,
							rules: [
								{
									required: true,
									message: '提款总额不能为空',
								},
							],
						}}
						label="提款总额"
					>
						<InputNumber
							min={0}
							max={NUM_999999999}
						/>
					</FormItem>
					<FormItem
						itemName="status"
						itemConfig={{
							initialValue: status,
							rules: [
								{
									required: true,
									message: '状态不能为空',
								},
							],
						}}
						label="状态"
					>
						<RadioGroup
							options={[
								{ label: '启用', value: ENABLE },
								{ label: '停用', value: DISABLE },
							]}
						/>
					</FormItem>
					<FormItem
						itemName="isBettingAmountGreaterThanDepositAmount"
						itemConfig={{
							initialValue: isBettingAmountGreaterThanDepositAmount,
							rules: [
								{
									required: true,
									message: '条件不能为空',
								},
							],
						}}
						label="条件"
					>
						<CheckBox>
							投注金额  &gt; 充值金额
						</CheckBox>
					</FormItem>
					<FormItem
						itemName="description"
						itemConfig={{ initialValue: description, }}
						label="备注"
					>
						<Input
						/>
					</FormItem>
				</Form>
			</PageModal>
		);
	}
}

NormalLevelEditingModal.propTypes = propTypes;
NormalLevelEditingModal.defaultProps = defaultProps;

export default NormalLevelEditingModal;
