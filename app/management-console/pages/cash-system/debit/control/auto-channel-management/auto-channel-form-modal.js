import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Select,
	InputNumber,
} from 'ljit-react-components';
import PageModal from '../../../../../components/page-modal';

const fieldStyle = { width: '397px', };

const propTypes = {
	initialValues: PropTypes.shape({
		channel: PropTypes.string,
		minValue: PropTypes.number,
		maxValue: PropTypes.number,
		blackList: PropTypes.arrayOf(PropTypes.string),
	}),
	isVisible: PropTypes.bool,
	isEditing: PropTypes.bool,
	onSubmit: PropTypes.func,
	onCancel: PropTypes.func,
};
const defaultProps = {
	initialValues: {},
	isVisible: false,
	isEditing: false,
	onSubmit: () => {},
	onCancel: () => {},
};

const PREFIX_CLASS = 'auto-channel-modal';
const initialState = {
	minValueError: false,
	maxValueError: false,
	notice: '',
};

class AutoChannelFormModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			...initialState,
		};

		this._handleClickSubmit = this._handleClickSubmit.bind(this);
		this._handleClickCancel = this._handleClickCancel.bind(this);
		this._handleValidateMinValue = this._handleValidateMinValue.bind(this);
		this._handleValidateMaxValue = this._handleValidateMaxValue.bind(this);
	}

	_handleClickSubmit() {
		// TODO: 重疊區間的檢查會請後端協助處理，之後需再跟 PM 討論訊息呈現方式
		const { onSubmit } = this.props;
		const form = this.formInstance.getForm();
		const { validateFields, resetFields, } = form;

		validateFields((err, values) => {
			if (!err) {
				onSubmit(values);
				resetFields();
			}
		});
	}

	_handleClickCancel() {
		const { onCancel } = this.props;
		const form = this.formInstance.getForm();

		form.resetFields();

		onCancel();
	}

	_handleValidateMinValue(value) {
		const form = this.formInstance.getForm();
		const currentMaxValue = form.getFieldValue('maxValue');
		const warningText = '最小限制金額不得大于(或等于)最大限制金额';

		if (currentMaxValue && value >= currentMaxValue) {
			this.setState({
				minValueError: true,
				notice: warningText,
			});
		} else {
			this.setState(initialState);
		}
	}

	_handleValidateMaxValue(value) {
		const form = this.formInstance.getForm();
		const currentMinValue = form.getFieldValue('minValue');
		const warningText = '最大限制金額不得小于(或等于)最小限制金额';

		if (currentMinValue && value <= currentMinValue) {
			this.setState({
				maxValueError: true,
				notice: warningText,
			});
		} else {
			this.setState(initialState);
		}
	}

	render() {
		const {
			notice,
			minValueError,
			maxValueError,
		} = this.state;
		const {
			initialValues,
			isVisible,
			isEditing,
		} = this.props;
		const {
			_handleClickSubmit,
			_handleClickCancel,
			_handleValidateMinValue,
			_handleValidateMaxValue,
		} = this;

		const prefix = isEditing ? "修改" : "新增";

		return (
			<PageModal
				title={`${prefix}出款通道`}
				visible={isVisible}
				onClickOk={_handleClickSubmit}
				onClickCancel={_handleClickCancel}
				className={PREFIX_CLASS}
				isOkButtonDisabled={minValueError || maxValueError}
			>
				<Form
					ref={formRef => this.formInstance = formRef}
					onChange={() => {}}
					submitButtonDisabled
					cancelButtonDisabled
				>
					<FormItem
						itemName="channel"
						itemConfig={{
							initialValue: initialValues.channel,
							rules: [{
								required: true,
								message: '请选择出款通道'
							},],
						}}
						label="通道："
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
					>
						<Select
							placeholder="请选择出款通道"
							style={fieldStyle}
							// TODO: get option value
							options={[
								{ label: '智付（代付公司）', value: '智付（代付公司）', },
								{ label: '上海銀行（銀行代付）', value: '上海銀行（銀行代付）', },
								{ label: '支付宝（第三方代付', value: '支付宝（第三方代付', },
							]}
						/>
					</FormItem>
					<FormItem
						itemName="minValue"
						itemConfig={{
							initialValue: initialValues.minValue,
						}}
						label="最小限制金額："
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
					>
						<InputNumber
							min={0}
							step={1}
							style={fieldStyle}
							placeholder="请输入最小限制金额"
							onChange={_handleValidateMinValue}
							className={minValueError ? 'has-error' : null}
						/>
					</FormItem>
					<FormItem
						itemName="maxValue"
						itemConfig={{
							initialValue: initialValues.maxValue,
						}}
						label="最大限制金額："
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
					>
						<InputNumber
							min={0}
							step={1}
							style={fieldStyle}
							placeholder="请输入最大限制金额"
							onChange={_handleValidateMaxValue}
							className={maxValueError ? 'has-error' : null}
						/>
					</FormItem>
					<FormItem
						itemName="blackList"
						itemConfig={{
							initialValue: initialValues.blackList,
						}}
						label="銀行黑名單："
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
					>
						<Select
							placeholder="请选择銀行黑名單"
							style={fieldStyle}
							mode={Select.ModeEnums.MULTIPLE}
							// TODO: get option value
							options={[
								{ label: '中央银行', value: '中央银行', },
								{ label:'农民银行', value: '农民银行', },
								{ label: '工商银行', value: '工商银行', },
							]}
						/>
					</FormItem>
					<p className={`${PREFIX_CLASS}__notice-text`}>{notice}</p>
				</Form>
			</PageModal>
		);
	}
}

AutoChannelFormModal.propTypes = propTypes;
AutoChannelFormModal.defaultProps = defaultProps;

export default AutoChannelFormModal;
