import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { connect } from 'ljit-store-connecter';
import {
	getXinYongBettingData,
} from '../../../lib/betting-utils';
import XinYongRightSidebar from './right-sidebar';
import {
	XinYongBettingElement,
	LabelSelector,
} from 'ljit-react-components';
import XinYongBettingCheckout from '../../../features/xin-yong-betting-checkout';
import {
	bettingActions,
} from '../../../controller';
import { find, } from 'lodash';
import './style.styl';

const {
	addBettingAction,
	updateBettingAction,
	clearBettingAction,
	clearBettingsAction,
	startBetAction,
} = bettingActions;

const propTypes = {
	lotteryId: PropTypes.string,
	onNavigate: PropTypes.func,
	pathName: PropTypes.string,
	xinYongQuickSelectAmountPerBet: PropTypes.number,
	setXinYongQuickSelectAmountAction: PropTypes.func,
	playsData: PropTypes.shape({
		_id: PropTypes.string,
		id: PropTypes.number,
		name: PropTypes.string,
		bonus: PropTypes.number,
		odds: PropTypes.number,
	}),
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
	playConditions: PropTypes.array,
	lotteriesMapData: PropTypes.object,
	bettingsMapData: PropTypes.object,
	addBettingAction: PropTypes.func.isRequired,
	updateBettingAction: PropTypes.func.isRequired,
	clearBettingAction: PropTypes.func.isRequired,
	clearBettingsAction: PropTypes.func.isRequired,
	startBetAction: PropTypes.func.isRequired,
};

const defaultProps = {
	bettings: [],
	bettingsMapData: {},
	playsData: {},
	playConditions: [],
	addBettingAction: () => {},
	updateBettingAction: () => {},
};

const PREFIX_CLASS = 'ljit-xin-yong';

class XinYongBetTable extends Component {
	constructor(props) {
		super(props);
		const selectedPlayConditionId = props.playConditions ? props.playConditions[0].id : 0;
		const lottery = props.lotteriesMapData[props.lotteryId];

		this.state = {
			selectedPlayConditionId: selectedPlayConditionId,
			lotteryClass: { id: lottery.lotteryClass.id },
			lottery: { id: lottery.id, name: lottery.name },
			isShowValidateBattingModal: false,
		};

		this._handleChangeAmountPerBet = this._handleChangeAmountPerBet.bind(this);
		this._handleClickPlayCondition = this._handleClickPlayCondition.bind(this);
		this._renderXinYongBettingElementComponent = this._renderXinYongBettingElementComponent.bind(this);
	}

	_handleChangeAmountPerBet(lotteryClass, lottery, playSubcondition, play, amountPerBet) {
		const {
			addBettingAction,
			updateBettingAction,
			clearBettingAction,
			bettingsData,
		} = this.props;
		const index = bettingsData.findIndex(_betting => _betting.play.id === play.id);

		if (amountPerBet > 0) {
			if (index > -1) {
				updateBettingAction(index, { amountPerBet, });
			} else {
				const newBettingsData = getXinYongBettingData({
					play,
					amountPerBet,
					name: `${playSubcondition.name} ${play.name}`,
				});

				addBettingAction(newBettingsData);
			}
		} else {
			clearBettingAction(index);
		}
	}

	_handleClickPlayCondition(playCondition = {}) {
		const { clearBettingsAction, } = this.props;
		const { id, } = playCondition;

		clearBettingsAction();

		this.setState({ selectedPlayConditionId: id, });
	}

	_renderXinYongBettingElementComponent() {
		const { _handleChangeAmountPerBet, } = this;
		const { lotteryClass, lottery, selectedPlayConditionId } = this.state;
		const {
			playsData,
			bettingsMapData,
			playConditions,
			xinYongQuickSelectAmountPerBet,
		} = this.props;
		const playSubcondition = find(playConditions, (playCondition) => playCondition.id === selectedPlayConditionId);
		const playSubconditionsMap = playSubcondition.subconditions
			.reduce(function (reduced, subcondition = {}) {
				reduced[subcondition.id] = subcondition;

				return reduced;
			}, {});
		const XinYongBettingElementComponent = XinYongBettingElement.get(lotteryClass.id, lottery.id, selectedPlayConditionId);

		return (
			<XinYongBettingElementComponent
				lotteryClass={lotteryClass}
				lottery={lottery}
				playSubconditionsMap={playSubconditionsMap}
				playsMap={playsData}
				bettingsMap={bettingsMapData}
				defaultAmount={xinYongQuickSelectAmountPerBet}
				onChange={_handleChangeAmountPerBet}
			/>
		);
	}

	render() {
		const { playConditions, } = this.props;
		const {
			selectedPlayConditionId,
		} = this.state;
		const {
			_handleClickPlayCondition,
			_renderXinYongBettingElementComponent,
		} = this;

		return (
			<div className={`${PREFIX_CLASS}-page`}>

				<div className={cx('content-column__main',
					`${PREFIX_CLASS}__bet-table`
				)}
				>
					<div className="content-column__main-top">
						<div className={`${PREFIX_CLASS}__play-condition-list`}>
							<LabelSelector
								label="信用"
								items={playConditions}
								selectedId={selectedPlayConditionId}
								onClickItem={_handleClickPlayCondition}
							/>
						</div>
					</div>
					{_renderXinYongBettingElementComponent()}
					<XinYongBettingCheckout/>
				</div>
				<div className={cx('content-column__right',`${PREFIX_CLASS}__right`)}>
					<XinYongRightSidebar/>
				</div>
			</div>
		);
	}

	componentWillUnmount() {
		this.props.clearBettingsAction();
	}
}

XinYongBetTable.propTypes = propTypes;
XinYongBetTable.defaultProps = defaultProps;

function mapStateToProps(state) {
	const bettingsData = state.bettings.get('data').toArray();

	return {
		bettingsData,
		bettingsMapData: getBettingsMapData(bettingsData),
		lotteriesMapData: state.lotteries.get('lotteriesMapData').toJSON(),
		playConditions: state.playConditions.get('data').toJSON().xinyong,
		playsData: state.plays.get('data').toJS(),
		xinYongQuickSelectAmountPerBet: state.xinYongQuickSelectAmountPerBet,
		selectedLottery: state.selectedLottery.toObject(),
	};
}

function mapDispatchToProps(dispatch)  {
	return {
		addBettingAction: (data) => dispatch(addBettingAction(data)),
		updateBettingAction: (index, data) => dispatch(updateBettingAction(index, data)),
		clearBettingAction: (index) => dispatch(clearBettingAction(index)),
		clearBettingsAction: () => dispatch(clearBettingsAction()),
		startBetAction: (lotteryId, data) => dispatch(startBetAction(lotteryId, data)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(XinYongBetTable);

function getBettingsMapData(bettings = [],) {
	if (bettings.length === 0) {
		return {};
	}

	let bettingsMapData = {};

	bettings.forEach(_betting => {
		bettingsMapData[_betting.play.id] = _betting;
	});

	return bettingsMapData;
}
