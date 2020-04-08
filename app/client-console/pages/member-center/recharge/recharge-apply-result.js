import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'ljit-store-connecter';
import { connectObservable } from 'ljit-observable/react-observable';
import { RouteKeyEnums } from '../../../route-modals/member-center/routes';
import { EventEnum } from '../../../lib/enums';
import { TWO_HOURS, } from './utils';
import {
	Countdown,
	Row,
	Col,
	Button,
	LabelContent,
	Divider,
} from 'ljit-react-components';

const PREFIX_CLASS = 'recharge-apply-result';

const propTypes = {
	notifyToChangeModalRoute: PropTypes.func.isRequired,
};
const defaultProps = {};

const RechargeApplyResultPage = ({
	notifyToChangeModalRoute
}) => {
	// TODO get endTime from api.
	const endTime = new Date().getTime() + TWO_HOURS;
	const _renderDescription = () => {
		//TODO show different Explanation base on recharge type
		return (
			<div>
				<div>请确保达到以下要求，否则无法自动到账：</div>
				<div>1、请务必 <span className={`${PREFIX_CLASS}__highlight`}>先发起提交后</span> 再登录微信进行付款！</div>
				<div>2、可以直接使用  <span className={`${PREFIX_CLASS}__highlight`}>手机微信</span> 进行转账付款。</div>
				<div>3、请务必在 <span className={`${PREFIX_CLASS}__highlight`}>付款微信认证姓名</span> 正确填写您在微信实名认证的 <span className={`${PREFIX_CLASS}__highlight`}>身份证姓名。</span></div>
				<div>4、请务必 <span className={`${PREFIX_CLASS}__highlight`}>2小时内</span> 完成付款操作。</div>
				<div>5、<span className={`${PREFIX_CLASS}__highlight`}>民生充值可以使用任何银行跨行转账进行充值。</span></div>
				<div>6、请务必在转账前仔细确认 <span className={`${PREFIX_CLASS}__highlight`}>金额小数点</span> 是否正确。</div>
			</div>
		);
	};

	return (
		<React.Fragment>
			<div className={PREFIX_CLASS}>
				<div className={`${PREFIX_CLASS}__title-block`}>
					<div>申请结果</div>
					<Countdown
						title="倒计时"
						endDate={new Date(endTime)}
					/>
				</div>
				<Divider/>
				<Row>
					{/* TODO get data from api response */}
					<Col span={13}>
						<LabelContent label="充值金额">
							<div>{19.29}</div>
						</LabelContent>
						<LabelContent label="收款银行">
							<div>{"微信转建设"}</div>
						</LabelContent>
						{/* TODO show different label base on recharge type */}
						<LabelContent label="收款姓名">
							<div>{"张嘉佳"} &emsp;<span className={`${PREFIX_CLASS}__highlight`}>因客户充值错误所导致的损失由客户自己承担，与平台无关</span></div>
						</LabelContent>
					</Col>
					<Col span={11}>
						<LabelContent label="銀行卡姓名">
							<div>{"陳大發"}</div>
						</LabelContent>
						<LabelContent label="收款开户行">
							<div>{"-"}</div>
						</LabelContent>
						<LabelContent label="银行账号">
							<div>{6236682050000797781} &emsp;<span className={`${PREFIX_CLASS}__highlight`}>充值账号随机更换</span></div>
						</LabelContent>
					</Col>
				</Row>
				<Divider/>
				<LabelContent label="付款说明">
					{_renderDescription()}
				</LabelContent>
				<Button
					outline={Button.OutlineEnums.HOLLOW}
					color={Button.ColorEnums.GREY30}
					onClick={() => notifyToChangeModalRoute(RouteKeyEnums.RECHARGE_INFORMATION)}
				>
					返回
				</Button>
			</div>
		</React.Fragment>
	);
};

RechargeApplyResultPage.propTypes = propTypes;
RechargeApplyResultPage.defaultProps = defaultProps;

function mapPropsToState(state) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {};
}


function mapNotifyToProps(notify) {
	return {
		notifyToChangeModalRoute: (data) => notify(EventEnum.CHANGE_MEMBER_CENTER_ROUTE, data),
	};
}

export default connect(mapPropsToState, mapDispatchToProps)((connectObservable(mapNotifyToProps)(RechargeApplyResultPage)));

