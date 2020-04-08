import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
	Card,
	DecimalNumber,
	Button,
} from 'ljit-react-components';
import ConfirmBettingModal from '../../components/standard-betting-confirm-modal';
import TraceBettingModal from '../../components/trace-betting-modal';
import { connect } from 'ljit-store-connecter';
import { withFeatureToggle, layoutConfigsPropTypes, } from '../../../lib/feature-toggle-provider';
import { traceActions, bettingActions } from '../../controller';
import { default as compose } from 'lodash/flowRight';
import { FeatureCodeEnum } from '../../lib/enums';
import {
	withLoadingStatusNotification,
	notifications,
} from '../../../lib/notify-handler';
import { LoadingStatusEnum, } from '../../../lib/enums';
import './style.styl';

const {
	NONE,
	LOADING,
	SUCCESS,
	FAILED,
} = LoadingStatusEnum;
const { successNotifications } = notifications;
const { Success, } = successNotifications;
const {
	startTraceAction,
} = traceActions;
const {
	startBetAction,
	setBettingsAction,
} = bettingActions;

const propTypes = {
	className: PropTypes.string,
	bettingsData: PropTypes.arrayOf(PropTypes.shape({
		play: PropTypes.shape({
			_id: PropTypes.string,
			id: PropTypes.number,
			name: PropTypes.string,
			bonus: PropTypes.number,
		}),
		name: PropTypes.string,
		lotteryName: PropTypes.string,
		betcontent: PropTypes.string,
		weizhi: PropTypes.string,
		multiple: PropTypes.number,
		amountPerBet: PropTypes.number,
		rebate: PropTypes.number,
		amount: PropTypes.number,
	})),
	userData: PropTypes.shape({
		bonus: PropTypes.string,
		platform: PropTypes.object,
		role: PropTypes.object,
		parent: PropTypes.object,
		ancestors: PropTypes.array,
		numberOfChildren: PropTypes.number,
		username: PropTypes.string,
		secrets: PropTypes.object,
		credentials: PropTypes.object,
		type: PropTypes.number,
		status: PropTypes.string,
		isOnline: PropTypes.bool,
		createdBy: PropTypes.string,
		nickname: PropTypes.string,
		greeting: PropTypes.string,
		qq: PropTypes.string,
		wechat: PropTypes.string,
		phone: PropTypes.string,
		ip: PropTypes.string,
		geo: PropTypes.string,
		loginAt: PropTypes.instanceOf(Date),
		numOfFailedLogin: PropTypes.number,
		details: PropTypes.shape({
			bonus: PropTypes.shape({
				delta: PropTypes.number,
			}),
		}),
		createdAt: PropTypes.instanceOf(Date),
		updatedAt: PropTypes.instanceOf(Date),
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
	selectedLottery: PropTypes.shape({
		_id: PropTypes.string,
		status: PropTypes.string,
		lotteryClass: PropTypes.shape({
			status: PropTypes.string,
			_id: PropTypes.string,
			id: PropTypes.number,
			name: PropTypes.string,
			code: PropTypes.string,
		}),
		playClasses: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string,
			code: PropTypes.string,
		})),
		id: PropTypes.number,
		name: PropTypes.string,
		code: PropTypes.string,
		numOfIssues: PropTypes.number,
		createdAt: PropTypes.instanceOf(Date),
		updatedAt: PropTypes.instanceOf(Date),
	}),
	startTraceAction: PropTypes.func,
	startBetAction: PropTypes.func.isRequired,
	setBettingsAction: PropTypes.func.isRequired,
	layoutConfigs: layoutConfigsPropTypes,
	traceLoadingStatus: PropTypes.oneOf([NONE, LOADING, SUCCESS, FAILED,]),
	traceLoadingStatusMessage: PropTypes.string,
	notifyHandlingAction: PropTypes.func.isRequired,
};

const defaultProps = {
	bettingsData: [],
	walletData: { balance: 1000, },
	startTraceAction: () => {},
};

const PREFIX_CLASS = 'standard-betting-checkout-feature';

function calculateDataSum(bettings, propName) {
	let sum = 0;

	if (bettings.length) {
		sum = bettings
			.map(item => item[propName])
			.reduce((accumulator, value) => accumulator + value);
	}
	return sum;
}

class StandardBettingCheckoutFeature extends Component {
	constructor() {
		super();
		this.state = {
			isTraceModalVisible: false,
			isBettingModalVisible: false,
		};

		this._handleClickTrace = this._handleClickTrace.bind(this);
		this._handleSubmitTraces = this._handleSubmitTraces.bind(this);
		this._handleStartBet = this._handleStartBet.bind(this);
	}

	_handleClickTrace() {
		this.setState({ isTraceModalVisible: true, });
	}

	_handleSubmitTraces(traces) {
		const { startTraceAction, selectedLottery, } = this.props;
		const lotteryId = selectedLottery.id;

		// TODO 驗證投注密碼
		startTraceAction(lotteryId, traces);
		this.setState({ isTraceModalVisible: false, });
	}

	_handleStartBet(bettings) {
		const {
			selectedLottery,
			startBetAction,
			setBettingsAction,
		} = this.props;

		const lotteryId = selectedLottery.id;

		if (bettings.length > 0) {
			setBettingsAction(bettings);
			startBetAction(lotteryId, { bettings });
		}

		this.setState({ isBettingModalVisible: false, });
	}

	render() {
		const {
			className,
			bettingsData,
			usedWalletData,
			layoutConfigs,
		} = this.props;
		const {
			_handleClickTrace,
			_handleSubmitTraces,
			_handleStartBet,
		} = this;
		const {
			isTraceModalVisible,
			isBettingModalVisible,
		} = this.state;
		const countNumber = <DecimalNumber className={`${PREFIX_CLASS}--count`} data={calculateDataSum(bettingsData, 'count')}/>;
		const amount = calculateDataSum(bettingsData, 'amount');
		const amountNumber = <DecimalNumber className={`${PREFIX_CLASS}--amount`} data={amount} hasSeparator/>;
		const balanceNumber = <DecimalNumber className={`${PREFIX_CLASS}--balance`} data={usedWalletData.balance - amount} hasSeparator/>;
		// TODO get real prize
		const prize = 124000;
		const prizeNumber = <DecimalNumber className={`${PREFIX_CLASS}--prize`} data={prize} hasSeparator/>;
		const {
			toggles: {
				is_ESTIMATED_PRIZE_Active
			},
		} = layoutConfigs;

		return (
			<React.Fragment>
				<Card className={cx(`${PREFIX_CLASS}`, className)}>
					<div>
						共 {countNumber} 注，共 {amountNumber} 元
					</div>
					<div>余额 {balanceNumber} 元</div>
					{is_ESTIMATED_PRIZE_Active ? <div>预估奖金 {prizeNumber} 元</div> : null}
					<div className={`${PREFIX_CLASS}__button-row`}>
						<Button
							className={`${PREFIX_CLASS}__trace-button`}
							outline={Button.OutlineEnums.HOLLOW}
							color={Button.ColorEnums.ORANGE}
							onClick={_handleClickTrace}
						>
							制作追号
						</Button>
						<Button
							className={`${PREFIX_CLASS}__bet-button`}
							color={Button.ColorEnums.ORANGE}
							onClick={() => this.setState({ isBettingModalVisible: true, })}
						>
							立即下注
						</Button>
					</div>
				</Card>
				{/* TODO Verify Password Modal */}
				<TraceBettingModal
					isModalVisible={isTraceModalVisible}
					bettingsData={bettingsData}
					onClickSubmit={_handleSubmitTraces}
					onClickCancel={() => this.setState({ isTraceModalVisible: false, })}
				/>
				<ConfirmBettingModal
					isModalVisible={isBettingModalVisible}
					onCancel={() => this.setState({ isBettingModalVisible: false, })}
					onBetting={_handleStartBet}
					bettings={bettingsData}
					isEstimatedPrizeActive={is_ESTIMATED_PRIZE_Active}
				/>
			</React.Fragment>
		);
	}
	componentDidUpdate(prevProps) {
		const {
			traceLoadingStatus,
			notifyHandlingAction,
		} = this.props;

		if (prevProps.traceLoadingStatus === LOADING && traceLoadingStatus === SUCCESS) {
			notifyHandlingAction(new Success('追号建立成功'));
		}
	}
}

StandardBettingCheckoutFeature.propTypes = propTypes;
StandardBettingCheckoutFeature.defaultProps = defaultProps;

function mapStateToProps(state) {
	return {
		// TODO add state to props
		bettingsData: state.bettings.get('data').toArray(),
		usedWalletData: state.wallets.get('usedWalletData').toObject(),
		selectedLottery: state.selectedLottery.toObject(),
		traceLoadingStatus: state.traces.get('loadingStatus'),
		traceLoadingStatusMessage: state.traces.get('loadingStatusMessage'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		startTraceAction: (...args) => dispatch(startTraceAction(...args)),
		startBetAction: (lotteryId, data) => dispatch(startBetAction(lotteryId, data)),
		setBettingsAction: (bettings) => dispatch(setBettingsAction(bettings)),
	};
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withFeatureToggle(FeatureCodeEnum.LOTTERY)
)(
	withLoadingStatusNotification([
		{
			loadingStatus: 'traceLoadingStatus',
			loadingStatusMessage: 'traceLoadingStatusMessage',
		}
	],
	StandardBettingCheckoutFeature)
);
