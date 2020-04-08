import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'ljit-store-connecter';
import { connectObservable } from 'ljit-observable/react-observable';
import { RouteKeyEnums } from '../../../route-modals/member-center/routes';
import { EventEnum } from '../../../lib/enums';
import {
	Form,
	FormItem,
	InputNumber,
	Input,
	Button,
	LabelContent,
	Divider,
} from 'ljit-react-components';
import MessageModal from '../../../components/client-message-modal';

const PREFIX_CLASS = 'recharge-confirm';

const propTypes = {
	// TODO:  接 store 並確認資料格式
	paymentValue: PropTypes.number,
	rechargeValue: PropTypes.number,
	notifyToChangeModalRoute: PropTypes.func.isRequired,
};
const defaultProps = {};

class RechargeConfirmPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			// TODO: 接 store 並確認資料格式
			paymentValue: props.paymentValue || 10,
			rechargeValue: props.rechargeValue || 9.33,
			isShowModal: false,
		};

		this._handleSubmit = this._handleSubmit.bind(this);
		this._renderHintContent = this._renderHintContent.bind(this);
	}

	_handleSubmit(values) {
		const { validateFields } = this.formInstance.getForm();
		const { notifyToChangeModalRoute, } = this.props;

		validateFields((err, values) => {
			if (!err) {
				// TODO 接 api
				notifyToChangeModalRoute(RouteKeyEnums.RECHARGE_APPLY_RESULT);
			}
		});
	}
	_renderHintContent() {
		// TODO show different content base on recharge type
		return (
			<div>
				<div>请确保达到以下要求，否则无法自动到账：</div>
				<div>1、请务必 <span className={`${PREFIX_CLASS}__highlight`}>先发起提交后</span> 再登录微信进行付款！</div>
				<div>2、可以直接使用  <span className={`${PREFIX_CLASS}__highlight`}>手机微信</span> 进行转账付款。</div>
				<div>3、请务必在 <span className={`${PREFIX_CLASS}__highlight`}>付款微信认证姓名</span> 正确填写您在微信实名认证的 <span className={`${PREFIX_CLASS}__highlight`}>身份证姓名。</span></div>
				<div>4、请务必 <span className={`${PREFIX_CLASS}__highlight`}>2小时内</span> 完成付款操作。</div>
				<div>5、请务必在转账前仔细确认 <span className={`${PREFIX_CLASS}__highlight`}>金额小数点</span> 是否正确。</div>
			</div>
		);
	}

	render() {
		const { paymentValue, isShowModal, rechargeValue } = this.state;
		const { notifyToChangeModalRoute } = this.props;
		const {
			_handleSubmit,
			_renderHintContent,
		} = this;
		const message = (
			<div>
				<p>当前充值金额为【{paymentValue}】元，平台已自动帮您分配为有小数点的数值，请务必按照平台所提供的充值金额<span className={`${PREFIX_CLASS}__highlight`}>【{rechargeValue}】</span>元，进行精确转账才能快速实时到账！</p>
				<p><span className={`${PREFIX_CLASS}__highlight`}>提示：会员充值银行卡姓名跟会员在平台绑定姓名不一致，将会涨时冻结资金，提供完整资料才可冻结。（支付宝、微信、快捷支付不限制）</span></p>
			</div>
		);

		return (
			<React.Fragment>
				<div className={PREFIX_CLASS}>
					<div className={`${PREFIX_CLASS}__title`}>充值确认</div>
					<Form
						ref={form => this.formInstance = form}
						cancelButtonDisabled
						submitButtonDisabled
					>
						<FormItem
							itemName="paymentValue"
							label="充值金额"
							labelColon={false}
							itemConfig={{
								initialValue: paymentValue,
								rules: [
									{
										required: true,
										message: '充值金额不能为空',
									},
								],
							}}
						>
							<InputNumber
								className={`${PREFIX_CLASS}__input`}
								placeholder="请输入金额"
								formatType={InputNumber.FormatTypeEnums.YUAN}
								step={0.01}
								disabled
							/>
						</FormItem>
						<FormItem
							itemName="payerName"
							// TODO show different label base on recharge type
							label={"银行卡姓名"}
							labelColon={false}
							extraMessage='填写姓名与您付款姓名不一致，无法自动到帐。'
							itemConfig={{
								rules: [
									{
										required: true,
										message: '银行卡的姓名不能为空',
									},
								],
							}}
						>
							<Input
								placeholder="请输入姓名"
								className={`${PREFIX_CLASS}__input`}
							/>
						</FormItem>
					</Form>
					<Divider/>
					<LabelContent
						label="温馨提示"
						className={`${PREFIX_CLASS}__warm-hint`}
					>
						{_renderHintContent()}
					</LabelContent>
					<div className={`${PREFIX_CLASS}__buttons`}>
						<Button
							outline={Button.OutlineEnums.HOLLOW}
							color={Button.ColorEnums.GREY30}
							onClick={() => notifyToChangeModalRoute(RouteKeyEnums.RECHARGE_INFORMATION)}
						>返回</Button>
						<Button
							outline={Button.OutlineEnums.SOLID}
							color={Button.ColorEnums.ORANGE}
							onClick={_handleSubmit}
						>发起申请</Button>
					</div>
				</div>

				<MessageModal
					title='通知'
					message={message}
					isVisible={isShowModal}
					onClickOk={() => this.setState({ isShowModal: false })}
					isHideCancelButton
					isCentered
				/>
			</React.Fragment>
		);
	}

	componentDidMount() {
		this.setState({ isShowModal: true });
	}
}

RechargeConfirmPage.propTypes = propTypes;
RechargeConfirmPage.defaultProps = defaultProps;

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

export default connect(mapPropsToState, mapDispatchToProps)((connectObservable(mapNotifyToProps)(RechargeConfirmPage)));

