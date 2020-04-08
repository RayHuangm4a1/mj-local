import React, { Component, } from 'react';
import SubmitFormModal from '../submit-form-modal';
import { Form, FormItem, InputNumber, Input, Button } from 'ljit-react-components';
import PropTypes from 'prop-types';
import './style.styl';

const PREDIX_CLASS = 'ljit-third-party-wallet-modal';

const propTypes = {
	isVisible: PropTypes.bool,
	title: PropTypes.string,
	fromWallet: PropTypes.string,
	fromWalletBalance: PropTypes.number,
	intoWallet: PropTypes.string,
	intoWalletBalance: PropTypes.number,
	okText: PropTypes.string,
	cancelText: PropTypes.string,
	hasEntryGameButton: PropTypes.bool,
	onClickOk: PropTypes.func,
	onClickCancel: PropTypes.func,
	onClickEntryGame: PropTypes.func,
};

const defaultProps = {
	okText: '确 定',
	cancelText: '取 消',
	hasEntryGameButton: false,
	onClickOk: () => {},
	onClickCancel: () => {},
	onClickEntryGame: () => {},
};

const AmountValues = [10, 50, 100, 500, 1000];

class ThirdPartyWalletModal extends Component {
	constructor() {
		super();
		this._renderChangeValueButton = this._renderChangeValueButton.bind(this);
		this._handleChangeAmount = this._handleChangeAmount.bind(this);
		this._handleSubmitForm = this._handleSubmitForm.bind(this);
		this._handleClickCancel = this._handleClickCancel.bind(this);
		this._handleClickEntryGame = this._handleClickEntryGame.bind(this);
		this._renderFooter = this._renderFooter.bind(this);
	}

	_handleChangeAmount(amount) {
		const form = this.formInstance.getForm();

		form.setFieldsValue({ amount });
	}

	_renderChangeValueButton() {
		const { _handleChangeAmount } = this;

		return (
			<div className={`${PREDIX_CLASS}__button-group`}>
				{
					AmountValues.map(value => (
						<Button
							key={value}
							outline={Button.OutlineEnums.HOLLOW}
							color={Button.ColorEnums.GREY30}
							onClick={() => {_handleChangeAmount(value);}}
						>
							{value}
						</Button>
					))
				}
			</div>
		);
	}

	_handleSubmitForm(event) {
		event.preventDefault();
		const form = this.formInstance.getForm();
		const { onClickOk, fromWallet, intoWallet } = this.props;

		form.validateFields((err, values) => {
			if (!err) {
				// TODO 驗證投注密碼
				const data = Object.assign(
					{},
					values,
					{
						from: fromWallet,
						to: intoWallet,
					}
				);

				form.resetFields();
				onClickOk(data);
			}
		});
	}

	_handleClickCancel(event) {
		event.preventDefault();
		const form = this.formInstance.getForm();

		form.resetFields();
		this.props.onClickCancel();
	}

	_handleClickEntryGame() {
		const form = this.formInstance.getForm();

		form.resetFields();
		this.props.onClickEntryGame();
	}
	_renderFooter() {
		const {
			hasEntryGameButton,
			okText,
			cancelText,
		} = this.props;
		const {
			_handleSubmitForm,
			_handleClickCancel,
			_handleClickEntryGame,
		} = this;

		if (hasEntryGameButton) {
			return (
				<React.Fragment>
					<Button
						outline={Button.OutlineEnums.HOLLOW}
						color={Button.ColorEnums.GREY30}
						onClick={_handleClickCancel}
					>
						{cancelText}
					</Button>
					<Button
						outline={Button.OutlineEnums.SOLID}
						color={Button.ColorEnums.ORANGE}
						onClick={_handleClickEntryGame}
					>
						进入游戏
					</Button>
					<Button
						outline={Button.OutlineEnums.SOLID}
						color={Button.ColorEnums.ORANGE}
						onClick={_handleSubmitForm}
					>
						{okText}
					</Button>
				</React.Fragment>
			);
		}
	}

	render() {
		const {
			isVisible,
			title,
			fromWallet,
			fromWalletBalance,
			intoWallet,
			intoWalletBalance,
			okText,
			cancelText,
		} = this.props;
		const {
			_renderChangeValueButton,
			_handleClickCancel,
			_handleSubmitForm,
			_renderFooter,
		} = this;

		return (
			<SubmitFormModal
				className={PREDIX_CLASS}
				isVisible={isVisible}
				title={title}
				onClickCancel={_handleClickCancel}
				onClickOk={_handleSubmitForm}
				okText={okText}
				cancelText={cancelText}
				footer={_renderFooter()}
				zIndex={1500}
			>
				<Form
					ref={(refForm) => this.formInstance = refForm}
					cancelButtonDisabled
					submitButtonDisabled
				>
					<FormItem
						label="從"
						itemName="from"
						labelColon={false}
						itemConfig={{
							initialValue: `${fromWallet} 餘額： ${fromWalletBalance}`
						}}
					>
						<Input disabled />
					</FormItem>
					<FormItem
						label="存入"
						itemName="to"
						labelColon={false}
						itemConfig={{
							initialValue: `${intoWallet} 餘額： ${intoWalletBalance}`
						}}
					>
						<Input disabled />
					</FormItem>
					<FormItem
						label="金額"
						key="amount"
						itemName="amount"
						labelColon={false}
						itemConfig={{
							rules: [
								{
									required: true,
									message: '金額不能为空',
								},
							],
						}}
					>
						<InputNumber placeholder="请输入金额"/>
					</FormItem>
					{_renderChangeValueButton()}
					<FormItem
						label="资金密码"
						key="fundsPassword"
						itemName="fundsPassword"
						labelColon={false}
						itemConfig={{
							rules: [
								{
									required: true,
									message: '资金密码不能为空',
								},
							],
						}}
					>
						<Input placeholder="请输入资金密码" type="password" />
					</FormItem>
				</Form>
			</SubmitFormModal>
		);
	}
}

ThirdPartyWalletModal.propTypes = propTypes;
ThirdPartyWalletModal.defaultProps = defaultProps;

export default ThirdPartyWalletModal;
