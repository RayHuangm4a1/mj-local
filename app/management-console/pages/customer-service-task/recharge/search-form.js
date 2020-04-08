import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Row,
	Col,
	Input,
	Select,
	DateRangePicker,
} from 'ljit-react-components';

const propTypes = {
	onClickSearch: PropTypes.func,
	onClickReset: PropTypes.func,
	isThirdParty: PropTypes.bool,
};
const defaultProps = {
	onClickSearch: () => {},
	onClickReset: () => {},
	isThirdParty: false,
};

class GeneralSearchFrom extends Component {
	constructor() {
		super();

		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleReset = this._handleReset.bind(this);
	}

	_handleSubmit() {
		const { onClickSearch } = this.props;
		const form = this.formInstance.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				onClickSearch(values);
			}
		});
	}

	_handleReset() {
		const { onClickReset } = this.props;
		const form = this.formInstance.getForm();

		onClickReset();
		form.resetFields();
	}

	render() {
		const { isThirdParty, } = this.props;
		const { _handleSubmit, _handleReset, } = this;
		const inputStyle = { width: '100%', maxWidth: 332, };

		return (
			<Form
				ref={formRef => this.formInstance = formRef}
				onSubmit={_handleSubmit}
				onCancel={_handleReset}
				submitText={"查询"}
				cancelText={"重置"}
			>
				<Row>
					<Col span={8}>
						<FormItem
							itemName="amount"
							label="充值金額"
							columnType={FormItem.ColumnTypeEnums.MEDIUM}
						>
							<Input
								style={inputStyle}
								placeholder="请输入充值金额"
							/>
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem
							itemName="status"
							label="狀態"
							columnType={FormItem.ColumnTypeEnums.MEDIUM}
						>
							<Select
								style={inputStyle}
								// TODO get options
								options={[]}
								placeholder="不指定"
							/>
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem
							itemName="cardId"
							label="收款卡"
							columnType={FormItem.ColumnTypeEnums.MEDIUM}
						>
							<Input
								style={inputStyle}
								placeholder="请输入收款卡"
							/>
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem
							itemName="bank"
							label="存入銀行"
							columnType={FormItem.ColumnTypeEnums.MEDIUM}
						>
							<Select
								style={inputStyle}
								// TODO get options
								options={[]}
								placeholder="不指定"
							/>
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem
							itemName={isThirdParty ? 'thirdPartyAccount' : 'payerName'}
							label={isThirdParty ? '第三方帐号' : '付款人姓名'}
							columnType={FormItem.ColumnTypeEnums.MEDIUM}
						>
							<Input
								style={inputStyle}
								placeholder={isThirdParty ? '请输入第三方帐号' : '请输入付款人姓名'}
							/>
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem
							itemName="applyDate"
							label="充值日期"
							columnType={FormItem.ColumnTypeEnums.MEDIUM}
						>
							<DateRangePicker/>
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem
							itemName="verifyDate"
							label="确认日期"
							columnType={FormItem.ColumnTypeEnums.MEDIUM}
						>
							<DateRangePicker/>
						</FormItem>
					</Col>
				</Row>
			</Form>
		);
	}
}

GeneralSearchFrom.propTypes = propTypes;
GeneralSearchFrom.defaultProps = defaultProps;

export default GeneralSearchFrom;
