import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	RadioGroup,
	Input,
	Button,
	Divider,
} from 'ljit-react-components';
import ClientMessageModal from '../../../components/client-message-modal';
import QuickInputNumberBlock from '../../../components/quick-input-number-block';
import WalletSelector from './wallet-selector';
import {
	walletPropType,
	SelectorTypeEnums,
	walletAccumulator,
} from './utils';

const { OUT, IN, ALL, NONE, } = SelectorTypeEnums;

const propTypes = {
	primaryWallets: PropTypes.arrayOf(walletPropType).isRequired,
	thirdPartyWallets: PropTypes.arrayOf(walletPropType).isRequired,
	onSubmit: PropTypes.func,
};

const defaultProps = {
	onSubmit: () => {},
};

const getQuickInputOptions = (allAmount) => [
	{ label: '全部', value: allAmount, },
	{ label: '100', value: 100, },
	{ label: '500', value: 500, },
	{ label: '1000', value: 1000, },
	{ label: '5000', value: 5000, },
	{ label: '10000', value: 10000, },
];

const PREFIX_CLASS = 'transfer-form';

function getAllAmountFromWallet(wallet) {
	if (wallet.balance) {
		return wallet.balance;
	} else {
		return 0;
	}
}

class TransferForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowMessageModal: false,
			type: OUT,
			selectedWallets: {
				primary: {},
				thirdParty: {},
			},
			amount: 0,
			allAmount: 0,
		};
		this._updateAllAmount = this._updateAllAmount.bind(this);
		this._handleChangeType = this._handleChangeType.bind(this);
		this._handleChangeSelectedWallet = this._handleChangeSelectedWallet.bind(this);
		this._handleChangeAmount = this._handleChangeAmount.bind(this);
		this._handleClickTransfer = this._handleClickTransfer.bind(this);
		this._handleClickModalOk = this._handleClickModalOk.bind(this);
	}
	_updateAllAmount() {
		let allAmount = 0;
		const { thirdPartyWallets, } = this.props;
		const { type, selectedWallets, } = this.state;

		switch (type) {
			case OUT: {
				allAmount = getAllAmountFromWallet(selectedWallets.primary);
				break;
			}
			case IN: {
				allAmount = getAllAmountFromWallet(selectedWallets.thirdParty);
				break;
			}
			case ALL: {
				if (thirdPartyWallets.length) {
					allAmount = thirdPartyWallets.reduce(walletAccumulator, 0);
				}
				break;
			}
			case NONE:
				break;
			default:
				break;
		}
		this.setState({ allAmount, });
	}
	_handleChangeType(event) {
		this.setState({ type: event.target.value, });
	}
	_handleChangeSelectedWallet(selectedWallets) {
		this.setState({ selectedWallets, });
	}
	_handleChangeAmount(amount) {
		this.setState({ amount, });
	}
	_handleClickTransfer() {
		const { onSubmit, } = this.props;
		const form = this.formInstance.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				onSubmit(values);
				form.resetFields();
				this.setState({ isShowMessageModal: true, });
			}
		});
	}
	_handleClickModalOk() {
		this.setState({ isShowMessageModal: false, });
	}
	render() {
		const {
			primaryWallets,
			thirdPartyWallets,
		} = this.props;
		const {
			type,
			selectedWallets,
			amount,
			allAmount,
		} = this.state;
		const {
			_handleChangeType,
			_handleChangeSelectedWallet,
			_handleChangeAmount,
			_handleClickTransfer,
			_handleClickModalOk,
		} = this;
		const isTransferable =
			selectedWallets.primary.id !== undefined &&
			selectedWallets.thirdParty.id !== undefined &&
			amount !== 0;

		return (
			<div className={PREFIX_CLASS}>
				<div className={`${PREFIX_CLASS}__form-block`}>
					<Form
						submitButtonDisabled
						cancelButtonDisabled
						ref={refForm => this.formInstance = refForm}
					>
						<FormItem
							labelColon={false}
							label="类型"
							key="type"
							itemName="type"
							className="type-form-item"
							itemConfig={{
								initialValue: type,
							}}
						>
							<RadioGroup
								// TODO use api accept value
								options={[
									{ label: '转出彩票錢包', value: OUT, },
									{ label: '转入彩票钱包', value: IN, },
									{ label: '全部转回彩票', value: ALL, },
								]}
								onChange={_handleChangeType}
							/>
						</FormItem>
						<FormItem
							label="请点击选取钱包"
							key="selectedWallets"
							itemName="selectedWallets"
							className="selected-wallets-form-item"
							itemConfig={{
								valuePropName: 'selectedWallets',
								initialValue: selectedWallets,
							}}
						>
							<WalletSelector
								type={type}
								primaryWallets={primaryWallets}
								thirdPartyWallets={thirdPartyWallets}
								onChange={_handleChangeSelectedWallet}
							/>
						</FormItem>
						<FormItem
							labelColon={false}
							label="金额"
							key="amount"
							itemName="amount"
							className="amount-form-item"
							itemConfig={{
								rules: [{
									required: true,
									message: '金额 为必填',
								},],
								initialValue: amount,
							}}
						>
							<QuickInputNumberBlock
								options={getQuickInputOptions(allAmount)}
								onChange={_handleChangeAmount}
								placeholder="请输入金额"
								minValue={0}
								maxValue={allAmount}
								disabled={type === ALL}
							/>
						</FormItem>
						<Divider className={`${PREFIX_CLASS}__divider`}/>
						<FormItem
							labelColon={false}
							label="资金密码"
							key="finPassword"
							itemName="finPassword"
							className="fin-password-form-item"
							itemConfig={{
								rules: [{
									required: true,
									message: '资金密码 为必填',
								},],
							}}
						>
							<Input
								className="fin-password"
								placeholder="请输入密码"
								type="password"
							/>
						</FormItem>
					</Form>
				</div>
				<div className={`${PREFIX_CLASS}__submit-button`}>
					<Button
						color={Button.ColorEnums.ORANGE}
						onClick={_handleClickTransfer}
						disabled={!isTransferable}
					>
						转帐
					</Button>
				</div>
				<ClientMessageModal
					message="转帐成功！"
					isHideCancelButton
					isVisible={this.state.isShowMessageModal}
					onClickOk={_handleClickModalOk}
				/>
			</div>
		);
	}

	componentDidUpdate(prevProps, prevState) {
		const { type, selectedWallets, allAmount, } = this.state;
		const { _updateAllAmount, } = this;

		if (prevState.type !== type || prevState.selectedWallets !== selectedWallets) {
			_updateAllAmount(selectedWallets);
		}
		if (type === ALL) {
			const form = this.formInstance.getForm();

			form.setFieldsValue({ amount: allAmount, });
		}
	}
}

TransferForm.propTypes = propTypes;
TransferForm.defaultProps = defaultProps;

export default TransferForm;
