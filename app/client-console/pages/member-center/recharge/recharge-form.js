import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	RadioGroup,
	LabelContent,
	Button,
	Divider,
} from 'ljit-react-components';
import QuickInputNumberBlock from '../../../components/quick-input-number-block';

const PREFIX_CLASS = 'recharge';
const propTypes = {
	onSubmit: PropTypes.func,
};
const defaultProps = {
	onSubmit: () => {},
};

const RechargeType = {
	BANK: 'bank',
	ONLINE: 'online',
	QRCODE: 'qrCode',
};
const {
	BANK,
	ONLINE,
	QRCODE,
} = RechargeType;

const PaymentType = {
	BANK_BUILD: 'bankBuild',
	BANK_FARM: 'bankFarm',
};
const {
	BANK_BUILD,
	BANK_FARM,
} = PaymentType;

// TODO get options from api, change when rechargeType changed.
const quickInputOptions = [
	{ label: '10', value: 10 },
	{ label: '50', value: 50 },
	{ label: '100', value: 100 },
	{ label: '500', value: 500 },
	{ label: '1000', value: 1000 },
];

class RechargeForm extends Component {
	constructor(props) {
		super(props);

		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleChangeValue = this._handleChangeValue.bind(this);
	}

	_handleSubmit() {
		const { onSubmit } = this.props;
		const { validateFields } = this.rechargeForm.getForm();

		validateFields((err, values) => {
			if (!err) {
				onSubmit(values);
			}
		});
	}

	_handleChangeValue(value) {
		const { setFieldsValue } = this.rechargeForm.getForm();

		if (typeof value === 'number') {
			setFieldsValue({ value: parseFloat(value), });
		}
	}

	render() {
		const { _handleSubmit, _handleChangeValue } = this;
		const minValue = quickInputOptions[0].value;
		const maxValue = quickInputOptions[quickInputOptions.length - 1].value;

		return (
			<div className={`${PREFIX_CLASS}__recharge-form`}>
				<Form
					ref={form => this.rechargeForm = form}
					cancelButtonDisabled
					submitButtonDisabled
				>
					<FormItem
						itemName="rechargeType"
						label="充值类型"
						labelColon={false}
						itemConfig={{ initialValue: BANK, }}
					>
						<RadioGroup
							options={[
								{ label: '网银转帐', value: BANK, },
								{ label: '在线充值', value: ONLINE, },
								{ label: '扫码充值', value: QRCODE, },
							]}
						/>
					</FormItem>
					<FormItem
						itemName="paymentType"
						label="支付方式"
						labelColon={false}
						itemConfig={{ initialValue: BANK_BUILD, }}
					>
						<RadioGroup
							options={[
								// TODO get options from api, change when rechargeType changed.
								{ label: '网银转帐【建设】', value: BANK_BUILD, },
								{ label: '网银转帐【农业】', value: BANK_FARM, },
							]}
						/>
					</FormItem>
					<FormItem
						itemName="value"
						label="充值金额"
						labelColon={false}
						itemConfig={{
							rules: [{
								required: true,
								message: '充值金额为必填',
							}],
						}}
					>
						<QuickInputNumberBlock
							// TODO get options from api, change when rechargeType changed.
							options={quickInputOptions}
							onChange={_handleChangeValue}
							placeholder="请输入金额"
							remindText={`單次最少${minValue}元，最多${maxValue}元。`}
							minValue={minValue}
							maxValue={maxValue}
						/>
					</FormItem>
				</Form>
				<Divider/>
				<LabelContent
					label="注意事项"
					className={`${PREFIX_CLASS}__recharge-form-notice`}
					labelColon={false}
				>
					<div>
						<div>1.充值时平台如果自动帮您分配为有小数点的数值，请务必按照平台所提供的充值金额，进行精确转账才能快速实时到账！</div>
						<div>2.例如：您提单100元会自动转换成 <span className={`${PREFIX_CLASS}__highlight`}>99.01 - 99.99 </span>之间的随机数字。</div>
					</div>
				</LabelContent>
				<Button
					outline={Button.OutlineEnums.SOLID}
					color={Button.ColorEnums.ORANGE}
					onClick={_handleSubmit}
					className={`${PREFIX_CLASS}-button`}
				>
					充值
				</Button>
			</div>
		);
	}
}

RechargeForm.propTypes = propTypes;
RechargeForm.defaultProps = defaultProps;

export default RechargeForm;
