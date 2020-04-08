import React from 'react';
import {
	Form,
	FormItem,
	InputNumber,
	Row,
	Col,
} from 'ljit-react-components';
import { PREFIX_CLASS, } from '../utils';

const propTypes = {};

const defaultProps = {};

function DepositsAndWithdrawalsControlWithdrawals() {
	const formInstanceForSettings = React.useRef(null);
	const formInstanceForFeeSettings = React.useRef(null);
	const _handleSaveSettings = () => {
		const form = formInstanceForSettings.current.getForm();

		form.validateFields((err, values) => {
			if (!err) {
				form.resetFields();
			}
		});
	};
	const _handleSaveFeeSettings = () => {
		const form = formInstanceForFeeSettings.current.getForm();

		form.validateFields((err, values) => {
			if (!err) {
				form.resetFields();
			}
		});
	};

	return (
		<div className={`${PREFIX_CLASS}__withdrawals`}>
			<div className={`${PREFIX_CLASS}__settings`}>
				<Form
					ref={formInstanceForSettings}
					cancelButtonDisabled
					onSubmit={_handleSaveSettings}
					submitText="储存设置"
				>
					<div>
						<FormItem
							label="每日出款上限"
							itemName="withdrawalLimitPerDay"
							itemConfig={{
								rules: [
									{
										required: true,
										message: '每日出款上限不能为空',
									},
								],
							}}
						>
							<InputNumber
								min={0}
							/>
						</FormItem>
					</div>
					<div>
						<FormItem
							label="每日可提现次数"
							itemName="timesOfWithdrawalLimitPerTime"
							itemConfig={{
								rules: [
									{
										required: true,
										message: '每日可提现次数不能为空',
									},
								],
							}}
						>
							<InputNumber
								min={0}
							/>
						</FormItem>
					</div>
					<div>
						<FormItem
							label="每次最小出款金额"
							itemName="minWithdrawalPerTime"
							itemConfig={{
								rules: [
									{
										required: true,
										message: '每次最小出款金额不能为空',
									},
								],
							}}
						>
							<InputNumber
								min={0}
							/>
						</FormItem>
					</div>
					<div>
						<FormItem
							label="每次最大出款金额"
							itemName="maxWithdrawalPerTime"
							itemConfig={{
								rules: [
									{
										required: true,
										message: '每次最大出款金额不能为空',
									},
								],
							}}
						>
							<InputNumber
								min={0}
							/>
						</FormItem>
					</div>
				</Form>
			</div>
			<div className={`${PREFIX_CLASS}__fee-settings`}>
				<h2>提款手续费设定</h2>
				<Form
					ref={formInstanceForFeeSettings}
					cancelButtonDisabled
					onSubmit={_handleSaveFeeSettings}
					submitText="储存设置"
				>
					<Row className="title">
						<Col span={8}>项目</Col>
						<Col span={8}>已达码量手续费</Col>
						<Col span={8}>未达码量手续费</Col>
					</Row>
					<Row>
						<Col span={8}>当天初次提款</Col>
						<Col span={8}>
							<FormItem
								itemName="feeOfFirstTimeWithdrawal.ReachToStandard"
								itemConfig={{
									rules: [
										{
											required: true,
											message: '当天初次提款已达码量手续费不能为空',
										},
									],
								}}
							>
								<InputNumber
									max={100}
									min={0}
									formatType={InputNumber.FormatTypeEnums.PERCENTAGE}
								/>
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem
								itemName="feeOfFirstTimeWithdrawal.UnReachToStandard"
								itemConfig={{
									rules: [
										{
											required: true,
											message: '当天初次提款未达码量手续费不能为空',
										},
									],
								}}
							>
								<InputNumber
									max={100}
									min={0}
									formatType={InputNumber.FormatTypeEnums.PERCENTAGE}
								/>
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span={8}>当天第二次提款</Col>
						<Col span={8}>
							<FormItem
								itemName="feeOfSecondTimeWithdrawal.ReachToStandard"
								itemConfig={{
									rules: [
										{
											required: true,
											message: '当天第二次提款已达码量手续费不能为空',
										},
									],
								}}
							>
								<InputNumber
									max={100}
									min={0}
									formatType={InputNumber.FormatTypeEnums.PERCENTAGE}
								/>
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem
								itemName="feeOfSecondTimeWithdrawal.UnReachToStandard"
								itemConfig={{
									rules: [
										{
											required: true,
											message: '当天第二次提款未达码量手续费不能为空',
										},
									],
								}}
							>
								<InputNumber
									max={100}
									min={0}
									formatType={InputNumber.FormatTypeEnums.PERCENTAGE}
								/>
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span={8}>当天第三次提款</Col>
						<Col span={8}>
							<FormItem
								itemName="feeOfThirdTimeWithdrawal.ReachToStandard"
								itemConfig={{
									rules: [
										{
											required: true,
											message: '当天第三次提款已达码量手续费不能为空',
										},
									],
								}}
							>
								<InputNumber
									max={100}
									min={0}
									formatType={InputNumber.FormatTypeEnums.PERCENTAGE}
								/>
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem
								itemName="feeOfThirdTimeWithdrawal.UnReachToStandard"
								itemConfig={{
									rules: [
										{
											required: true,
											message: '当天第三次提款未达码量手续费不能为空',
										},
									],
								}}
							>
								<InputNumber
									max={100}
									min={0}
									formatType={InputNumber.FormatTypeEnums.PERCENTAGE}
								/>
							</FormItem>
						</Col>
					</Row>
				</Form>
			</div>
		</div>
	);
}

// TODO 串接 API 來完成 出款 與 手續費 設置
DepositsAndWithdrawalsControlWithdrawals.propTypes = propTypes;
DepositsAndWithdrawalsControlWithdrawals.defaultProps = defaultProps;

export default DepositsAndWithdrawalsControlWithdrawals;