import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { connect } from 'ljit-store-connecter';
import BetContentHelperFactory from 'ljit-betcontent-helper';
import { StandardBettingElement, Tooltip, } from 'ljit-react-components';
import StandardRightSidebar from './right-sidebar';
import StandardBettingBlock from '../../../components/standard-betting-block';
import PlaySelectionGroup from '../../../components/play-selection-group';
import {
	playActions,
	bettingActions,
} from '../../../controller';
import { withFeatureToggle, layoutConfigsPropTypes, } from '../../../../lib/feature-toggle-provider';
import { default as compose } from 'lodash/flowRight';
import { FeatureCodeEnum, LoadingStatusEnum, } from '../../../lib/enums';
import './style.styl';

const {
	NONE,
	LOADING,
} = LoadingStatusEnum;
const { resetPlayIdAction, } = playActions;
const {
	addBettingAction,
	startBetAction,
	resetStandardBettingElementAction,
	clearBettingsAction,
} = bettingActions;

const TextPropTypes = PropTypes.oneOfType([
	PropTypes.string,
	PropTypes.element,
]);
const propTypes = {
	playConditionId: PropTypes.string,
	playConditionsData: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.string,
		lottery: PropTypes.shape({
			_id: PropTypes.string,
			id: PropTypes.number,
			name: PropTypes.string,
			code: PropTypes.string,
		}),
		playClass: PropTypes.shape({
			_id: PropTypes.string,
			name: PropTypes.string,
			code: PropTypes.string,
		}),
		id: PropTypes.number,
		name: PropTypes.string,
		subconditions: PropTypes.arrayOf(PropTypes.shape({
			_id: PropTypes.string,
			id: PropTypes.number,
			name: PropTypes.string,
			plays: PropTypes.arrayOf(PropTypes.shape({
				_id: PropTypes.string,
				id: PropTypes.number,
				name: PropTypes.string,
			})),
		}))
	})).isRequired,
	playsData: PropTypes.shape({
		_id: PropTypes.string,
		id: PropTypes.number,
		name: PropTypes.string,
		bonus: PropTypes.number,
	}),
	platformBonus: PropTypes.shape({
		max: PropTypes.number,
		min: PropTypes.number,
		list: PropTypes.arrayOf(PropTypes.number),
	}),
	userBonus: PropTypes.number,
	playText: TextPropTypes,
	pathName: PropTypes.string,
	onNavigate: PropTypes.func,
	lotteryId: PropTypes.string,
	lotteriesMapData: PropTypes.object,
	bettingsData: PropTypes.array,
	betId: PropTypes.string,
	selectedLottery: PropTypes.object,
	playConditionsLoadingStatus: PropTypes.number.isRequired,
	resetPlayIdAction: PropTypes.func.isRequired,
	addBettingAction: PropTypes.func.isRequired,
	startBetAction: PropTypes.func.isRequired,
	resetStandardBettingElementAction: PropTypes.func.isRequired,
	clearBettingsAction: PropTypes.func.isRequired,
	layoutConfigs: layoutConfigsPropTypes,
};

const defaultProps = {
	playConditionsData: [],
	bettingsData: [],
	playsData: {},
	lotteriesMapData: {},
	selectedLottery: {},
	lotteryId: '',
	betId: '',
	playText: '玩法说明',
};

const PREFIX_CLASS = 'ljit-standard';
const INITIAL_BETTING = {
	betcontent: '',
	weizhi: '',
};

class StandardPlay extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedPlayId: null,
			selectedPlayCondition: {},
			__prevProps__playConditionId: null,
			currentBetting: INITIAL_BETTING,
			isShowValidateBattingModal: false,
		};

		this._handleClickPlay = this._handleClickPlay.bind(this);
		this._handleUpdateCombination = this._handleUpdateCombination.bind(this);
		this._handleUpdatePosition = this._handleUpdatePosition.bind(this);
		this._handleAddBetting = this._handleAddBetting.bind(this);
		this._handleStartBet = this._handleStartBet.bind(this);
		this._handleCreateBetting = this._handleCreateBetting.bind(this);
		this._handleAddBettingToBasket = this._handleAddBettingToBasket.bind(this);
		this._renderStandardBettingTable = this._renderStandardBettingTable.bind(this);
	}

	static getDerivedStateFromProps(props, state) {
		const {
			playConditionsData,
			playConditionId,
		} = props;
		const _playConditionId = parseInt(playConditionId, 10);
		const shouldUpdateState = _playConditionId !== state.__prevProps__playConditionId && playConditionsData.length;

		if (shouldUpdateState) {
			const index = playConditionsData.findIndex(condition => {
				return condition.id === _playConditionId;
			});

			if (index > -1) {
				const selectedPlayCondition = playConditionsData[index];
				const selectedPlayId = selectedPlayCondition.subconditions[0].plays[0].id;

				return {
					selectedPlayCondition: selectedPlayCondition,
					selectedPlayId: selectedPlayId,
					__prevProps__playConditionId: _playConditionId,
				};
			}
		}

		return null;
	}

	_handleClickPlay(play = {}) {
		const { id, } = play;

		this.setState({ selectedPlayId: id, });
	}

	_handleUpdateCombination(combination) {
		const { currentBetting, } = this.state;

		let betting = {
			...currentBetting,
			betcontent: combination,
		};

		this.setState({ currentBetting: betting, });
	}

	_handleUpdatePosition(weizhi) {
		const { currentBetting, } = this.state;

		let betting = {
			...currentBetting,
			weizhi,
		};

		this.setState({ currentBetting: betting, });
	}

	_handleAddBetting({
		amount,
		amountPerBet,
		count,
		multiple,
		rebate,
	}) {

		const {
			_handleCreateBetting,
			_handleAddBettingToBasket,
		} = this;

		const newBetting = _handleCreateBetting({
			amount,
			amountPerBet,
			count,
			multiple,
			rebate,
		});

		_handleAddBettingToBasket(newBetting);
	}

	_handleAddBettingToBasket(betting) {
		const {
			addBettingAction,
			resetStandardBettingElementAction,
		} = this.props;

		addBettingAction(betting);

		this.setState({ currentBetting: INITIAL_BETTING, });

		resetStandardBettingElementAction();
	}

	_handleCreateBetting(bettingAmountData) {
		const { selectedPlayCondition, selectedPlayId, currentBetting, } = this.state;
		const { playsData, selectedLottery, } = this.props;
		const play = playsData[selectedPlayId];
		const lotteryName = selectedLottery.name;

		return {
			...currentBetting,
			...bettingAmountData,
			lotteryName,
			name: `${selectedPlayCondition.name + play.name}`,
			play: {
				_id: play._id,
				id: play.id,
				name: play.name,
				bonus: play.bonus,
				odds: play.odds,
			},
		};
	}

	_handleStartBet({
		amount,
		amountPerBet,
		count,
		multiple,
		rebate,
	}) {
		const {
			bettingsData,
			selectedLottery,
			startBetAction,
		} = this.props;
		const {
			_handleCreateBetting,
			_handleAddBettingToBasket,
		} = this;

		const lotteryId = selectedLottery.id;
		const newBetting = _handleCreateBetting({
			amount,
			amountPerBet,
			count,
			multiple,
			rebate,
		});

		_handleAddBettingToBasket(newBetting);

		const bettings = [newBetting, ...bettingsData];

		startBetAction(lotteryId, { bettings });
	}

	_renderStandardBettingTable() {
		const {
			selectedPlayId,
			selectedPlayCondition,
			currentBetting,
		} = this.state;
		const {
			betId,
			selectedLottery,
			playsData,
			playText,
			platformBonus,
			userBonus,
			layoutConfigs,
		} = this.props;
		const {
			_handleClickPlay,
			_handleUpdateCombination,
			_handleUpdatePosition,
			_handleAddBetting,
			_handleStartBet,
		} = this;
		const lotteryClassId = selectedLottery.lotteryClass.id;
		const lotteryId = selectedLottery.id;
		const subconditions = selectedPlayCondition.subconditions;
		const betContentHelper = BetContentHelperFactory.getHelper(lotteryClassId, lotteryId, selectedPlayId);
		const isValidBetting = betContentHelper.isValidFormat(currentBetting.betcontent);
		const StandardBettingElementComponent = StandardBettingElement.get(lotteryClassId, lotteryId, selectedPlayId);
		const playData = getPlayData(selectedPlayId, playsData);
		const {
			toggles: {
				is_AMOUNT_Active,
				is_ALL_IN_Active,
			}
		} = layoutConfigs;

		return (
			<React.Fragment>
				<div className="content-column__main-top">
					<PlaySelectionGroup
						subconditions={subconditions}
						selectedPlayId={selectedPlayId}
						onClickPlay={_handleClickPlay}
					/>
					<Tooltip
						className={`lottery-betting-tooltip ${PREFIX_CLASS}__play-description-tooltip`}
						arrowPointAtCenter
						placement={Tooltip.PlacementEnums.BOTTOM}
						overlayClassName={`lottery-betting-tooltip__overlay ${PREFIX_CLASS}__tooltip-overlay`}
						title={playData.description}
					>
						<label className={`${PREFIX_CLASS}__tag`}>
							{playText}
						</label>
					</Tooltip>
				</div>
				<StandardBettingElementComponent
					key={'StandardBettingElementComponent' + betId}
					onUpdateCombination={_handleUpdateCombination}
					onUpdatePosition={_handleUpdatePosition}
					codeBallAwards={playData.awards}
				/>
				<StandardBettingBlock
					bettingData={currentBetting}
					classId={lotteryClassId}
					lotteryId={lotteryId}
					playId={selectedPlayId}
					platformBonus={platformBonus}
					userBonus={userBonus}
					onClickAllIn={() => console.log('梭哈')}
					onClickAddBasket={_handleAddBetting}
					onClickBetting={_handleStartBet}
					isValidBetting={isValidBetting}
					isAmountActive={is_AMOUNT_Active}
					isAllInActive={is_ALL_IN_Active}
				/>
			</React.Fragment>
		);
	}

	render() {
		const {
			playConditionsLoadingStatus,
		} = this.props;
		const { _renderStandardBettingTable } = this;
		const isPageLoading = playConditionsLoadingStatus === NONE || playConditionsLoadingStatus === LOADING;

		return (
			<div className={`${PREFIX_CLASS}-page`}>
				<div className={cx('content-column__main',
					`${PREFIX_CLASS}__bet-table`
				)}>
					{isPageLoading ? null : _renderStandardBettingTable()}
				</div>
				<div className={cx('content-column__right',`${PREFIX_CLASS}__right`)}>
					<StandardRightSidebar/>
				</div>
			</div>
		);
	}

	componentWillUnmount() {
		const { resetPlayIdAction, clearBettingsAction, } = this.props;

		resetPlayIdAction();
		clearBettingsAction();
	}
}

StandardPlay.propTypes = propTypes;
StandardPlay.defaultProps = defaultProps;

function getPlayData(playId, playsData) {
	return playsData[playId] || {};
}

function mapStateToProps(state) {
	const {
		playConditions: playConditionsReducer,
	} = state;

	return {
		playConditionsData: playConditionsReducer.get('data').toObject().standard,
		playConditionsLoadingStatus: playConditionsReducer.get('loadingStatus'),
		lotteriesMapData: state.lotteries.get('lotteriesMapData').toObject(),
		bettingsData: state.bettings.get('data').toArray(),
		betId: state.bettings.get('betId'),
		playsData: state.plays.get("data").toObject(),
		selectedLottery: state.selectedLottery.toObject(),
		platformBonus: state.platform.get('data').toObject().bonus,
		userBonus: state.user.get('data').toObject().bonus
	};
}
function mapDispatchToProps(dispatch) {
	return {
		resetPlayIdAction: () => dispatch(resetPlayIdAction()),
		addBettingAction: (data) => dispatch(addBettingAction(data)),
		resetStandardBettingElementAction: () => dispatch(resetStandardBettingElementAction()),
		startBetAction: (lotteryId, data) => dispatch(startBetAction(lotteryId, data)),
		clearBettingsAction: () => dispatch(clearBettingsAction()),
	};
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withFeatureToggle(FeatureCodeEnum.STANDARD_BETTING_BLOCK)
)(StandardPlay);
