import React from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Input,
	InputNumber,
} from 'ljit-react-components';
import PageModal from '../../../../components/page-modal';
import { PREFIX_CLASS, } from '../utils';

const propTypes = {
	isModalVisible: PropTypes.bool,
	onClickOk: PropTypes.func,
	onClickCancel: PropTypes.func,
	refs: PropTypes.func
};
const defaultProps = {
	isModalVisible: false,
	onClickOk: () => {},
	onClickCancel: () => {},
};

function CreateWithdrawAccountFormModal({
	isModalVisible,
	onClickOk,
	onClickCancel,
}) {
	const formInstance = React.useRef(null);
	const _handleClickOk = () => {
		const form = formInstance.current.getForm();

		form.validateFields((err, values) => {
			if (!err) {
				form.resetFields();
				onClickOk(values);
			}
		});
	};

	return (
		<PageModal
			title="个人出款设定帐号"
			className={`${PREFIX_CLASS}__create-account-modal`}
			visible={isModalVisible}
			onClickOk={_handleClickOk}
			onClickCancel={onClickCancel}
		>
			<Form
				ref={formInstance}
				cancelButtonDisabled
				submitButtonDisabled
			>
				<div>
					<FormItem
						label="帐号"
						itemName="username"
						itemConfig={{
							rules: [
								{
									required: true,
									message: '帐号不能为空',
								},
							],
						}}
					>
						<Input/>
					</FormItem>
				</div>
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
						label="每次出款上限"
						itemName="withdrawalLimitPerTime"
						itemConfig={{
							rules: [
								{
									required: true,
									message: '每次出款上限不能为空',
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
						label="每日提款次数"
						itemName="withdrawalTimesPerDay"
						itemConfig={{
							rules: [
								{
									required: true,
									message: '每日提款次数不能为空',
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
		</PageModal>
	);
}

CreateWithdrawAccountFormModal.propTypes = propTypes;
CreateWithdrawAccountFormModal.defaultProps = defaultProps;

export default CreateWithdrawAccountFormModal;