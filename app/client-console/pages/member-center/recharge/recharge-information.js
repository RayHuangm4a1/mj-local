import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'ljit-store-connecter';
import { connectObservable } from 'ljit-observable/react-observable';
import { Button, Divider, LabelContent, UserAvatar, } from 'ljit-react-components';
import MessageModal from '../../../components/client-message-modal';
import RechargeForm from './recharge-form';
import { RouteKeyEnums } from '../../../route-modals/member-center/routes';
import { EventEnum } from '../../../lib/enums';
import { TWO_HOURS, } from './utils';
import './style.styl';

const PREFIX_CLASS = 'recharge';

const propTypes = {
	userData: PropTypes.object.isRequired,
	// TODO: 充值記錄 api, 確認資料格式
	rechargesData: PropTypes.array,
	lastApplyAt: PropTypes.string,
	notifyToChangeModalRoute: PropTypes.func.isRequired,
};
const defaultProps = {
	rechargesData: [],
	// TODO remove this after api is ok
	lastApplyAt: '2020/11/18 00:00:00'
};

class RechargeInformationPage extends Component {
	constructor() {
		super();
		this.state = {
			isShowingMessage: false,
		};

		this._handleUpdateWallet = this._handleUpdateWallet.bind(this);
		this._handleRecharge = this._handleRecharge.bind(this);
	}

	_handleUpdateWallet() {
		// TODO: update wallet action
	}

	_handleRecharge(values) {
		const {
			notifyToChangeModalRoute,
			lastApplyAt,
			userData,
		} = this.props;

		// TODO check if user user have set bank card, replace condition with api response.
		if (userData.username) {
			// TODO if "2小时内已经有一笔充值申请" show message

			if (isApplyTimeLessThanTwoHours(lastApplyAt)) {
				this.setState({ isShowingMessage: true, });
			} else {
				notifyToChangeModalRoute(RouteKeyEnums.RECHARGE_CONFIRM);
			}
		} else {
			notifyToChangeModalRoute(RouteKeyEnums.MEMBER_BANK_INFORMATION);
		}
	}

	render() {
		const { isShowingMessage, } = this.state;
		const { userData, notifyToChangeModalRoute } = this.props;
		const { _handleUpdateWallet, _handleRecharge } = this;
		const { username, avatar, } = userData;
		// TODO: 待接余额，確認格式
		const description = `余额 ${884.64} 元`;

		return (
			<div className={PREFIX_CLASS}>
				<div className={`${PREFIX_CLASS}__user-info`}>
					<UserAvatar
						size={56}
						src={avatar}
						description={description}
						userName={username}
					/>
					<div>
						<Button
							outline={Button.OutlineEnums.HOLLOW}
							color={Button.ColorEnums.ORANGE}
							onClick={() => notifyToChangeModalRoute(RouteKeyEnums.MEMBER_RECHARGE_WITHDRAWAL_LOG)}
						>
							充提记录
						</Button>
						<Button
							outline={Button.OutlineEnums.HOLLOW}
							color={Button.ColorEnums.ORANGE}
							onClick={_handleUpdateWallet}
						>
							更新余额
						</Button>
					</div>
				</div>
				<Divider/>
				<LabelContent
					label="温馨提示"
					className={`${PREFIX_CLASS}__warm-hint`}
					labelColon={false}
				>
					<div>
						<div>1、 充值账户均在第三方支付平台托管，请仔细阅读第三方支付平台的法律声明和服务协议，<br/>&emsp;&emsp;使用该第三方支付平台的服务即视为您已同意其法律声明和服务协议的全部内容。</div>
						<div>2、 充值费用暂免，如收取将另行通知。</div>
						<div>3、 充值<span className={`${PREFIX_CLASS}__highlight`}> （7x24小时）</span> 实时到账。</div>
						<div>4、 如果充值金额没有及时到账，可以与我公司或第三方支付平台联系。</div>
						<div>5、 网银转账可以使用任何银行跨行转账进行充值。</div>
					</div>
				</LabelContent>
				<Divider/>
				{/* TODO: 之後改成用 RechargeWithdrawFormBlock 共用元件 */}
				<RechargeForm
					onSubmit={_handleRecharge}
				/>
				<MessageModal
					title="通知"
					isVisible={isShowingMessage}
					message="您2小时内已经有一笔充值申请，是否继续使用上一笔申请信息？"
					okText="再次充值"
					footer={(
						<React.Fragment>
							<Button
								outline={Button.OutlineEnums.HOLLOW}
								color={Button.ColorEnums.GREY30}
								onClick={() => notifyToChangeModalRoute(RouteKeyEnums.RECHARGE_APPLY_RESULT)}
							>
								取 消
							</Button>
							<Button
								color={Button.ColorEnums.ORANGE}
								onClick={() => notifyToChangeModalRoute(RouteKeyEnums.RECHARGE_CONFIRM)}
							>
								再次充值
							</Button>
						</React.Fragment>
					)}
				/>
			</div>
		);
	}
}

RechargeInformationPage.propTypes = propTypes;
RechargeInformationPage.defaultProps = defaultProps;

function mapPropsToState(state) {
	return {
		userData: state.user.get('data').toObject(),
	};
}

function mapPropsToDispatch(dispatch) {
	return {};
}

function mapNotifyToProps(notify) {
	return {
		notifyToChangeModalRoute: (data) => notify(EventEnum.CHANGE_MEMBER_CENTER_ROUTE, data),
	};
}

export default connect(mapPropsToState, mapPropsToDispatch)((connectObservable(mapNotifyToProps)(RechargeInformationPage)));

function isApplyTimeLessThanTwoHours(lastApplyAt) {
	const now = new Date().getTime();
	const lastApplyTime = new Date(lastApplyAt).getTime();

	return (now - lastApplyTime < TWO_HOURS);
}
