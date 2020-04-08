import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import { connect, } from 'ljit-store-connecter';
import { connectObservable, } from 'ljit-observable/react-observable';
import { default as compose, } from 'lodash/flowRight';
import {
	Form,
	FormItem,
	Input,
	Select,
	Button,
	RemindText,
	DecimalNumber,
} from 'ljit-react-components';
import { RouteKeyEnums, } from '../../../../route-modals/member-center/routes';
import { EventEnum, } from '../../../../lib/enums';
import ClientMessageModal from '../../../../components/client-message-modal';
import QuickInputNumberBlock from '../../../../components/quick-input-number-block';

const propTypes = {
	userData: PropTypes.shape({
		username: PropTypes.string,
		userProfile: PropTypes.string,
		balance: PropTypes.number,
	}),
	usedWalletData: PropTypes.shape({
		id: PropTypes.number,
		userId: PropTypes.number,
		name: PropTypes.string,
		type: PropTypes.number,
		code: PropTypes.number,
		balance: PropTypes.number,
		isUsed: PropTypes.bool,
		createdAt: PropTypes.instanceOf(Date),
		updatedAt: PropTypes.instanceOf(Date),
	}),
	notifyToChangeModalRoute: PropTypes.func,
};

const defaultProps = {
	userData: {},
	usedWalletData: {},
	notifyToChangeModalRoute: () => {},
};

const quickInputOptions = [
	{ label: '100', value: 100, },
	{ label: '500', value: 500, },
	{ label: '1000', value: 1000, },
	{ label: '5000', value: 5000, },
	{ label: '10000', value: 10000, },
];

const fakeBankCardOptions = [
	{ label: '中国工商银行', value: 'ICBC', },
	{ label: '台湾银行', value: 'BKTW', },
];

const PREFIX_CLASS = 'withdraw-page';

class WithdrawInfoWithFormPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowMessageModal: false,
		};
		this._handleChangeMultiple = this._handleChangeMultiple.bind(this);
		this._handleClickGoBack = this._handleClickGoBack.bind(this);
		this._handleClickApplyWithdraw = this._handleClickApplyWithdraw.bind(this);
		this._handleClickModalOk = this._handleClickModalOk.bind(this);
		this._renderWarningMessage = this._renderWarningMessage.bind(this);
	}
	_handleChangeMultiple(value) {
		const form = this.formInstance.getForm();

		form.setFieldsValue({ amount: value, });
	}
	_handleClickGoBack() {
		this.props.notifyToChangeModalRoute(RouteKeyEnums.WITHDRAW);
	}
	_handleClickApplyWithdraw() {
		const form = this.formInstance.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				this.setState({ isShowMessageModal: true, });
			}
		});
	}
	_handleClickModalOk() {
		this.setState({ isShowMessageModal: false, });
	}
	_renderWarningMessage() {
		const shouldShowWarningMessage = true;

		let content = null;

		if (shouldShowWarningMessage) {
			content = (
				<RemindText
					className="message-block"
					styleType={RemindText.StyleTypeEnums.ERROR}
					text="您目前已被禁止提现，如有问题请洽客服处理"
				/>
			);
		}
		return content;
	}
	render() {
		const {
			_handleClickGoBack,
			_handleClickModalOk,
			_handleClickApplyWithdraw,
			_handleChangeMultiple,
			_renderWarningMessage,
		} = this;
		const bankCardOptions = fakeBankCardOptions;
		const timesOfWithdraw = 2;
		const isApplySuccess = true;
		const message = isApplySuccess ? '提现申请成功！' : '您还有未处理的款项，请稍后再提！';

		return (
			<Fragment>
				<div className={`${PREFIX_CLASS}__form-block`}>
					<Form
						submitButtonDisabled
						cancelButtonDisabled
						ref={refForm => this.formInstance = refForm}
					>
						<FormItem
							colon={false}
							label="提款金额"
							key="amount"
							itemName="amount"
							className="input-amount"
							itemConfig={{
								rules: [{
									required: true,
									message: '提款金额 为必填',
								},],
							}}
						>
							<QuickInputNumberBlock
								options={quickInputOptions}
								onChange={_handleChangeMultiple}
								placeholder="请输入金额"
								minValue={100}
								maxValue={50000}
							/>
						</FormItem>
						<FormItem
							colon={false}
							label="资金密码"
							key="finPassword"
							itemName="finPassword"
							className="fin-password"
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
						<FormItem
							colon={false}
							label="选择银行卡"
							key="bankCard"
							itemName="bankCard"
							itemConfig={{
								rules: [{
									required: true,
									message: '选择银行卡 为必填',
								},],
							}}
						>
							<Select
								className="bank-card"
								options={bankCardOptions}
								placeholder="选择银行卡"
							/>
						</FormItem>
					</Form>
				</div>
				<RemindText
					className="message-block"
					text={(
						<Fragment>
							<div>提款信息 :</div>
							<div>
								提款时间：从 <span>03:00:00</span> 至第二天 <span>02:59:59</span><br/>
								每天限制提款 <span>88</span> 次，您今天已提款 <span>{timesOfWithdraw}</span> 次。<br/>
								最小提款额：<span>100</span> 元，最大提款额： <DecimalNumber data={500000} hasSeparator/> 元<br/>
							</div>
						</Fragment>
					)}
				/>
				{_renderWarningMessage()}
				<div className={`${PREFIX_CLASS}__submit-button`}>
					<Button
						outline={Button.OutlineEnums.HOLLOW}
						color={Button.ColorEnums.GREY30}
						onClick={_handleClickGoBack}
					>
						返回
					</Button>
					<Button
						color={Button.ColorEnums.ORANGE}
						onClick={_handleClickApplyWithdraw}
					>
						申請提现
					</Button>
				</div>
				<ClientMessageModal
					message={message}
					isHideCancelButton
					isVisible={this.state.isShowMessageModal}
					onClickOk={_handleClickModalOk}
				/>
			</Fragment>
		);
	}
}

WithdrawInfoWithFormPage.propTypes = propTypes;
WithdrawInfoWithFormPage.defaultProps = defaultProps;

function mapNotifyToProps(notify) {
	return {
		notifyToChangeModalRoute: (data) => {
			return notify(
				EventEnum.CHANGE_MEMBER_CENTER_ROUTE,
				data,
			);
		}
	};
}

function mapStateToProps(state) {
	return {
		userData: state.user.get('data').toObject(),
		usedWalletData: state.wallets.get('usedWalletData').toObject(),
	};
}
// TODO: 串接API來申請提款與是否顯示警示
function mapDispatchToProps(dispatch) {
	return {};
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	connectObservable(mapNotifyToProps),
)(WithdrawInfoWithFormPage);
