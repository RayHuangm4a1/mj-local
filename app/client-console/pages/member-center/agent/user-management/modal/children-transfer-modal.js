import React, { Component, } from 'react';
import {
	Form,
	FormItem,
	Input,
	InputNumber,
	Icon,
} from 'ljit-react-components';
import SelectDropdown from '../../../../../components/select-dropdown';
import SubmitFormModal from '../../../../../components/submit-form-modal';
import { formatDate } from '../../../../../../lib/moment-utils';
import PropTypes from 'prop-types';
import cx from 'classnames';

const PREFIX_CLASS = 'children-transfer-modal';

const propTypes = {
	className: PropTypes.string,
	title: PropTypes.string,
	isVisible: PropTypes.bool,
	transferTime: PropTypes.string,
	username: PropTypes.string,
	onClickOk: PropTypes.func,
	onClickCancel: PropTypes.func,
	onDisableTransfer: PropTypes.func,
};
const defaultProps = {
	onClickOk: () => {},
	onClickCancel: () => {},
	onDisableTransfer: () => {},
	isVisible: false,
};

// TODO 確認列舉的格式
const TransferTypeEnums = {
	TRANSFER: 'transfer',
	REWARD: 'reward',
	THIRD_PARTY: 'third-party',
	PC_EGG: 'pc-egg',
};

const {
	TRANSFER,
	REWARD,
	THIRD_PARTY,
	PC_EGG,
} = TransferTypeEnums;

// TODO get options from API
const transferTypeOptions = [
	{
		label: '充值',
		value: TRANSFER,
	},
	{
		label: '獎勵',
		value: REWARD,
	},
	{
		label: '娛樂工資',
		value: THIRD_PARTY,
	},
	{
		label: 'PC蛋獎勵',
		value: PC_EGG,
	},
];
// TODO get data from API
const TipsMessages = {
	[TRANSFER]: '下级需要消费后提现，不影响下级盈利报表。',
	[REWARD]: '下级不需要消费后提现，会影响下级盈利报表。',
	[THIRD_PARTY]: '下级不需要消费即可提现，不影响下级盈利报表。',
	[PC_EGG]: '下级不需要消费后提现，会影响下级盈利报表。',
};

class ChildrenTransferModal extends Component {
	constructor() {
		super();
		this.state = {
			tipsMessage: TipsMessages[transferTypeOptions[0].value],
		};
		this._handleClickOK = this._handleClickOK.bind(this);
		this._handleClickCancel = this._handleClickCancel.bind(this);
		this._handleChangeTipsMessage = this._handleChangeTipsMessage.bind(this);
	}

	_handleClickOK() {
		const { onClickOk, } = this.props;
		const form = this.formInstance.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				// TODO verification password
				onClickOk(values);
				form.resetFields();
			}
		});
	}

	_handleClickCancel() {
		const { onClickCancel, } = this.props;
		const form = this.formInstance.getForm();

		onClickCancel();
		form.resetFields();
	}

	_handleChangeTipsMessage(value) {
		this.setState({
			tipsMessage: TipsMessages[value],
		});
	}
	render() {
		const {
			_handleClickOK,
			_handleClickCancel,
			_handleChangeTipsMessage,
		} = this;
		const {
			isVisible,
			title,
			className,
			transferTime,
			username,
			onDisableTransfer,
		} = this.props;
		const {
			tipsMessage,
		} = this.state;

		return (
			<SubmitFormModal
				title={title}
				width="440px"
				isVisible={isVisible}
				onClickCancel={_handleClickCancel}
				onClickOk={_handleClickOK}
				className={cx(PREFIX_CLASS, className)}
			>
				<div className="transfer-message">
					开通到 {formatDate(transferTime)} 自动关闭，<span onClick={onDisableTransfer}>立即关闭</span> ？
				</div>
				<Form
					cancelButtonDisabled
					submitButtonDisabled
					ref={(refForm) => this.formInstance = refForm}
				>
					<FormItem
						label="会员名"
						itemName="username"
						labelColon={false}
						itemConfig={{
							initialValue: username
						}}
					>
						<Input
							placeholder="请输入会员名"
							disabled={Boolean(username)}
						/>
					</FormItem>
					<FormItem
						label="转帐类型"
						itemName="transferType"
						labelColon={false}
						itemConfig={{
							initialValue: transferTypeOptions[0].value,
						}}
					>
						<SelectDropdown
							options={transferTypeOptions}
							onChange={_handleChangeTipsMessage}
							placeholder="请选择转帐类型"
						/>
					</FormItem>
					<FormItem
						label="转帐金额"
						itemName="transgerAmount"
						labelColon={false}
					>
						<InputNumber
							placeholder="请输入转帐金额"
						/>
					</FormItem>
					<FormItem
						label="资金密码"
						itemName="fundsPassword"
						labelColon={false}
					>
						<Input
							placeholder="请输入资金密码"
							type="password"
						/>
					</FormItem>
					<FormItem
						label="谷歌动态密码"
						itemName="goolePassword"
						labelColon={false}
					>
						<Input
							placeholder="请输入谷歌动态密码"
							type="password"
						/>
					</FormItem>
					<div className="prompt-message">
						<Icon
							type={Icon.IconTypeEnums.INFO_FILL}
							size={Icon.SizeEnums.X_SMALL}
						/>
						{tipsMessage}
					</div>
				</Form>
			</SubmitFormModal>
		);
	}
}

ChildrenTransferModal.propTypes = propTypes;
ChildrenTransferModal.defaultProps = defaultProps;

export default ChildrenTransferModal;
