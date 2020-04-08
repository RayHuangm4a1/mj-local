import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	DecimalNumber,
	RemindText,
} from 'ljit-react-components';
import { connectObservable, } from 'ljit-observable/react-observable';
import { RouteKeyEnums, } from '../../../../route-modals/member-center/routes';
import { EventEnum, } from '../../../../lib/enums';
import ClientMessageModal from '../../../../components/client-message-modal';

const propTypes = {
	notifyToChangeModalRoute: PropTypes.func,
};

const defaultProps = {
	userData: {},
	usedWalletData: {},
	notifyToChangeModalRoute: () => {},
};

const fakeBankCardOptions = [
	{ label: '中国工商银行', value: 'ICBC', },
	{ label: '台湾银行', value: 'BKTW', },
];

const PREFIX_CLASS = 'withdraw-page';

class WithdrawPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowMessageModal: false,
		};
		this._handleClickWithdraw = this._handleClickWithdraw.bind(this);
		this._handleClickModalCancel = this._handleClickModalCancel.bind(this);
		this._handleClickModalOk = this._handleClickModalOk.bind(this);
		this._renderWarningMessage = this._renderWarningMessage.bind(this);
	}
	_handleClickWithdraw() {
		const {
			notifyToChangeModalRoute,
		} = this.props;
		const bankCardOptions = fakeBankCardOptions;
		const bankCardList = bankCardOptions.map(item => item.label);
		const hasBindBankCard = bankCardList.length > 0;
		const finPassword = 'finPassword';
		const isFinPasswordExist = !!finPassword;

		if (!hasBindBankCard) {
			notifyToChangeModalRoute(RouteKeyEnums.MEMBER_BANK_INFORMATION);
		} else if (!isFinPasswordExist) {
			this.setState({ isShowMessageModal: true, });
		} else {
			notifyToChangeModalRoute(RouteKeyEnums.WITHDRAW_FORM);
		}
	}
	_handleClickModalCancel() {
		this.setState({ isShowMessageModal: false, });
	}
	_handleClickModalOk() {
		this.props.notifyToChangeModalRoute(RouteKeyEnums.MEMBER_SECURITY);
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
			_handleClickWithdraw,
			_handleClickModalCancel,
			_handleClickModalOk,
			_renderWarningMessage,
		} = this;
		const timesOfWithdraw = 2;

		return (
			<Fragment>
				<RemindText
					className="message-block"
					text={(
						<Fragment>
							<div>重要提示 :</div>
							<div>
								绑定银行卡后 <span>6</span> 小时后才能进行提款。<br/>
								同一张银行卡若绑定第二次需要等候 <span>48</span> 小时后才能进行提款。<br/>
								同一张银行卡若绑定第三次需要等候 <span>120</span> 小时后才能进行提款。<br/>
								本平台从 <span>当天凌晨3点</span> 至 <span>第二天凌晨3点</span> 为一天。<br/>
								例如：2016-01-01 03:00 至 2016-01-02 03:00 为报表的 2016-01-01 一天<br/>
							</div>
						</Fragment>
					)}
				/>
				<RemindText
					className="message-block"
					text={(
						<Fragment>
							<div>规则更新 :</div>
							<div>
								提款手續費為 <span>每天第一次0.5%，第二次1%，第三次及以后2%。</span><br/>
								虚拟货币提款不收手续费<br/>
							</div>
						</Fragment>
					)}
				/>
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
						color={Button.ColorEnums.ORANGE}
						onClick={_handleClickWithdraw}
					>
						提现
					</Button>
				</div>
				<ClientMessageModal
					message="请先绑定资金密码，谢谢！"
					isVisible={this.state.isShowMessageModal}
					onClickCancel={_handleClickModalCancel}
					onClickOk={_handleClickModalOk}
					okText="前往绑定"
				/>
			</Fragment>
		);
	}
}

WithdrawPage.propTypes = propTypes;
WithdrawPage.defaultProps = defaultProps;

// TODO: 串接API來取得銀行卡訊息、提款次數、密碼設置與是否顯示警示
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

export default connectObservable(mapNotifyToProps)(WithdrawPage);
