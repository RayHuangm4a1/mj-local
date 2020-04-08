import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	LabelContent,
	FormItemDivider,
	InputNumber,
	Select,
} from 'ljit-react-components';
import PageModal from '../../../components/page-modal';

const propTypes = {
	wrappedComponentRef: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.func,
	]),
	initialValues: PropTypes.shape({
		lotteryCategoryID: PropTypes.string,
		lotteryGameID: PropTypes.string,
		betTypeCode: PropTypes.string,
		missMin: PropTypes.number,
		missMax: PropTypes.number,
		prizeDiscount: PropTypes.number,
		maxBet: PropTypes.number,
		maxReceipt: PropTypes.number,
	}),
	lotteryCategoryOptions: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string,
		value: PropTypes.string,
	})),
	lotteryGameOptions: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string,
		value: PropTypes.string,
	})),
	betTypeOptions: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string,
		value: PropTypes.string,
	})),
	awardOptions: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string,
		value: PropTypes.string,
	})),
	form: PropTypes.object,
	onCancel: PropTypes.func,
	onSubmit: PropTypes.func,
	isVisible: PropTypes.bool,
};
const defaultProps = {
	initialValues: {},
	lotteryCategoryOptions: [],
	lotteryGameOptions: [],
	betTypeOptions: [],
	awardOptions: [{
		label: '1', value: '1',
	}],
	onCancel: () => {},
	onSubmit: () => {},
	isVisible: false,
};

class MultiperiodBettingForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			missMin: this.props.initialValues.missMin || 0,
			missMax: this.props.initialValues.missMax || 0,
		};

		this._handleNumberChange = this._handleNumberChange.bind(this);
		this._handleFormSubmitClick = this._handleFormSubmitClick.bind(this);
		this._handleFormCancelClick = this._handleFormCancelClick.bind(this);
		this._handleFormChange = this._handleFormChange.bind(this);
	}

	_handleNumberChange(key, value) {
		console.log(key, value);
		this.setState({
			[key]: value,
		});
		//add validate if need...
	}
	_handleFormSubmitClick() {
		const form = this.formInstance.getForm();

		form.validateFields((err, values) => {
			console.log(values);

		});
		//validate inputnumber if need...
	}
	_handleFormCancelClick() {
		const form = this.formInstance.getForm();

		form.resetFields();
		this.setState({
			missMin: this.props.initialValues.missMin,
			missMax: this.props.initialValues.missMax,
		});
	}
	_handleFormChange(allValues) {
		const form = this.formInstance.getForm();

		form.validateFields((err, values) => {
			console.log(allValues);
		});
	}

	render() {
		const {
			isVisible,
			onCancel,
			onSubmit,
			initialValues,
			lotteryCategoryOptions,
			lotteryGameOptions,
			betTypeOptions,
			awardOptions,
		} = this.props;

		return (
			<PageModal
				visible={isVisible}
				title="新增投注限制条件"
				onClickCancel={onCancel}
				onClickOk={onSubmit}
				bodyStyle={{ padding: 32, }}
			>
				<Form
					onChange={this._handleFormChange}
					ref={(refForm) => this.formInstance = refForm }
					submitButtonDisabled={true}
					cancelButtonDisabled={true}
				>
					<FormItem
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
						label="彩類"
						itemName="lotteryCategoryID"
						itemConfig={{
							initialValue: initialValues.lotteryCategoryID,
						}}
					>
						<Select
							style={{ width: 120, }}
							options={lotteryCategoryOptions}
						/>
					</FormItem>
					<FormItem
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
						label="分类"
						itemName="lotteryGameID"
						itemConfig={{
							initialValue: initialValues.lotteryGameID,
						}}
					>
						<Select
							style={{ width: 120, }}
							options={lotteryGameOptions}
						/>
					</FormItem>
					<FormItem
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
						label="玩法"
						itemName="betTypeCode"
						itemConfig={{
							initialValue: initialValues.betTypeCode,
						}}
					>
						<Select
							style={{ width: 160, }}
							options={betTypeOptions}
						/>
					</FormItem>
					<FormItem
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
						label="奖项"
						itemName="awardID"
						itemConfig={{
							initialValue: initialValues.awardID,
						}}
					>
						<Select
							style={{ width: 160, }}
							options={awardOptions}
						/>
					</FormItem>
					<LabelContent
						columnType={LabelContent.ColumnTypeEnums.MEDIUM}
						label="限制期数"
					>
						<InputNumber
							style={{ width: 120, }}
							placeholder="起始期数"
							min={0}
							defaultValue={initialValues.missMin}
							value={this.state.missMin}
							onChange={(value) => this._handleNumberChange('missMin', value)}
						/>
						<FormItemDivider />
						<InputNumber
							style={{ width: 120, }}
							placeholder="结束期数"
							min={0}
							defaultValue={initialValues.missMax}
							value={this.state.missMax}
							onChange={(value) => this._handleNumberChange('missMax', value)}
						/>
					</LabelContent>
					<FormItem
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
						label="奖金折扣"
						itemName="prizeDiscount"
						itemConfig={{
							initialValue: initialValues.prizeDiscount,
						}}
					>
						<InputNumber
							style={{ width: 120, }}
							min={0}
							formatType={InputNumber.FormatTypeEnums.PERCENTAGE}
						/>
					</FormItem>
					<FormItem
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
						label="单一帐号最大下注："
						itemName="maxBet"
						itemConfig={{
							initialValue: initialValues.maxBet,
						}}
					>
						<InputNumber
							style={{ width: 120, }}
							min={0}
						/>
					</FormItem>
					<FormItem
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
						label="单期最大收单量："
						itemName="maxReceipt"
						itemConfig={{
							initialValue: initialValues.maxReceipt,
						}}
					>
						<InputNumber
							style={{ width: 120, }}
							min={0}
						/>
					</FormItem>
				</Form>
			</PageModal>
		);
	}
}

MultiperiodBettingForm.propTypes = propTypes;
MultiperiodBettingForm.defaultProps = defaultProps;

export default MultiperiodBettingForm;
