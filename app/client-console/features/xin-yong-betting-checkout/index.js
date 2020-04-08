import React, { Component } from 'react';
import PropTypes from 'prop-types';
import XinYongBettingDetailsModal from '../../components/xin-yong-betting-details-modal';
import {
	XinYongBettingCheckout,
} from 'ljit-react-components';
import { connect } from 'ljit-store-connecter';
import { xinYongQuickSelectAmountPerBetActions, bettingActions, } from '../../controller';

const { setXinYongQuickSelectAmountPerBetAction, } = xinYongQuickSelectAmountPerBetActions;
const {
	startBetAction,
	clearBettingsAction,
	updateAllBettingsAmountPerBetAction,
	setBettingsAction,
} = bettingActions;

const propTypes = {
	isSquare: PropTypes.bool,
	bettingsData: PropTypes.arrayOf(PropTypes.shape({
		play: PropTypes.shape({
			_id: PropTypes.string,
			id: PropTypes.number,
			name: PropTypes.string,
			bonus: PropTypes.number,
			odds: PropTypes.number,
			lottery: PropTypes.shape({
				_id: PropTypes.string,
			}),
		}),
		name: PropTypes.string,
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
	xinYongQuickSelectAmountPerBet: PropTypes.number,
	setXinYongQuickSelectAmountPerBetAction: PropTypes.func,
	updateAllBettingsAmountPerBetAction: PropTypes.func,
	startBetAction: PropTypes.func,
	clearBettingsAction: PropTypes.func,
	setBettingsAction: PropTypes.func.isRequired,
};

const defaultProps = {
	isSquare: false,
	bettingsData: [],
	usedWalletData: {},
	xinYongQuickSelectAmountPerBet: 1,
	setXinYongQuickSelectAmountPerBetAction: () => {},
	updateAllBettingsAmountPerBetAction: () => {},
	startBetAction: () => {},
	clearBettingsAction: () => {},
};

const MIN_AMOUNT_PER_BET = 0.001;

class XinYongBettingCheckoutFeature extends Component {
	constructor() {
		super();
		this.state = {
			isModalVisible: false,
			isShowValidateBattingModal: false,
		};

		this._handleChangeXinYongQuickSelectAmountPerBet = this._handleChangeXinYongQuickSelectAmountPerBet.bind(this);
		this._handleStartBet = this._handleStartBet.bind(this);
	}

	_handleChangeXinYongQuickSelectAmountPerBet(amountPerBet) {
		const {
			setXinYongQuickSelectAmountPerBetAction,
			updateAllBettingsAmountPerBetAction,
		} = this.props;
		const floatAmountPerBet = parseFloat(amountPerBet);
		const isFloatAmountPerBetNaN = isNaN(floatAmountPerBet);
		const updatedAmountPerBet = !isFloatAmountPerBetNaN ? floatAmountPerBet : MIN_AMOUNT_PER_BET;

		updateAllBettingsAmountPerBetAction(updatedAmountPerBet);
		setXinYongQuickSelectAmountPerBetAction(updatedAmountPerBet);
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

		this.setState({ isModalVisible: false, });
	}

	render() {
		const {
			isSquare,
			bettingsData,
			usedWalletData,
			xinYongQuickSelectAmountPerBet,
			clearBettingsAction,
		} = this.props;
		const {
			_handleChangeXinYongQuickSelectAmountPerBet,
			_handleStartBet,
		} = this;
		const {
			isModalVisible,
		} = this.state;
		const betCount = bettingsData.length;
		const balance = usedWalletData.balance;
		const amount = bettingsData.reduce((acc, betting) => {
			return acc + betting.amount;
		}, 0);

		return (
			<React.Fragment>
				<XinYongBettingCheckout
					isSquare={isSquare}
					betCount={betCount}
					balance={balance - amount}
					betAmount={amount}
					inputValue={xinYongQuickSelectAmountPerBet}
					onChangeInputValue={_handleChangeXinYongQuickSelectAmountPerBet}
					onSubmit={() => this.setState({ isModalVisible: true, })}
					onReset={clearBettingsAction}
				/>
				<XinYongBettingDetailsModal
					isModalVisible={isModalVisible}
					onCancel={() => this.setState({ isModalVisible: false, })}
					onBetting={_handleStartBet}
					balance={balance}
					bettings={bettingsData}
					defaultBatchAmountPerBet={xinYongQuickSelectAmountPerBet}
				/>
			</React.Fragment>
		);
	}
}

XinYongBettingCheckoutFeature.propTypes = propTypes;
XinYongBettingCheckoutFeature.defaultProps = defaultProps;

function mapStateToProps(state) {
	return {
		// TODO add state to props
		bettingsData: state.bettings.get('data').toArray(),
		// userData: state.user.get('data').toJS(),
		usedWalletData: state.wallets.get('usedWalletData').toObject(),
		selectedLottery: state.selectedLottery.toObject(),
		xinYongQuickSelectAmountPerBet: state.xinYongQuickSelectAmountPerBet,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		startBetAction: (lotteryId, data) => dispatch(startBetAction(lotteryId, data)),
		clearBettingsAction: () => dispatch(clearBettingsAction()),
		setXinYongQuickSelectAmountPerBetAction: (amountPerBet) => dispatch(setXinYongQuickSelectAmountPerBetAction(amountPerBet)),
		updateAllBettingsAmountPerBetAction: (amountPerBet) => dispatch(updateAllBettingsAmountPerBetAction(amountPerBet)),
		setBettingsAction: (bettings) => dispatch(setBettingsAction(bettings)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(XinYongBettingCheckoutFeature);
