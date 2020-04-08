import React from 'react';
import {
	Form,
	FormItem,
	InputNumber,
} from 'ljit-react-components';
import { PREFIX_CLASS, } from '../utils';

const propTypes = {};

const defaultProps = {};

function DepositsAndWithdrawalsControlDepositsPage() {
	const formInstance = React.useRef(null);
	const _handleSaveSetting = () => {
		const form = formInstance.current.getForm();

		form.validateFields((err, values) => {
			if (!err) {
				form.resetFields();
			}
		});
	};

	return (
		<div className={`${PREFIX_CLASS}__deposits`}>
			<Form
				submitText="储存设置"
				ref={formInstance}
				cancelButtonDisabled
				onSubmit={_handleSaveSetting}
			>
				<div>
					<FormItem
						label="充值通道预设填写打码量"
						itemName="defaultDepositsRatio"
						itemConfig={{
							rules: [
								{
									required: true,
									message: '充值通道预设填写打码量不能为空',
								},
							],
						}}
					>
						<InputNumber
							max={100}
							min={0}
						/>
					</FormItem>
					<div className="unit">%</div>
				</div>
				<div>
					<FormItem
						label="转点打码量"
						itemName="transferRatio"
						itemConfig={{
							rules: [
								{
									required: true,
									message: '转点打码量不能为空',
								},
							],
						}}
					>
						<InputNumber
							max={100}
							min={0}
						/>
					</FormItem>
					<div className="unit">%</div>
				</div>
			</Form>
		</div>
	);
}

// TODO 串接 API 來完成 打碼量 設置
DepositsAndWithdrawalsControlDepositsPage.propTypes = propTypes;
DepositsAndWithdrawalsControlDepositsPage.defaultProps = defaultProps;

export default DepositsAndWithdrawalsControlDepositsPage;
