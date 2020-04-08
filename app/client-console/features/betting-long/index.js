import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import curryRight from 'lodash/curryRight';
import { connect } from 'ljit-store-connecter';
import {
	Row,
	Icon,
	LabelSelector,
	CheckBoxGroup,
	Tooltip,
} from 'ljit-react-components';
import BettingLongItem from '../betting-long-item';
import DashboardBlock from '../../components/dashboard-block';
import BettingLongCheckoutFeature from './betting-long-checkout-feature';
import './style.styl';

const OPTION_ALL = 'all';

const ContinuousKeysEnum = {
	ALL: 0,
	THREE: 1,
	FOUR: 2,
	SEVEN: 3,
	NINE: 4,
};
const continuousOptions = [
	{ id: ContinuousKeysEnum.ALL, name: '全部', },
	{ id: ContinuousKeysEnum.THREE, name: '连3', },
	{ id: ContinuousKeysEnum.FOUR, name: '连4', },
	{ id: ContinuousKeysEnum.SEVEN, name: '连7', },
	{ id: ContinuousKeysEnum.NINE, name: '连9', },
];

// TODO check filter action is done by api or page
// if by api, dispatch get data by filter action

const propTypes = {
	lotteryClassesOptions: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string,
		value: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string,
		]),
	})),
	// TODO when schema is done, update prop type
	bettingLongData: PropTypes.arrayOf(PropTypes.object),
};
const defaultProps = {};

const PREFIX_CLASS = 'betting-long';

const playExample = '投注方案：重庆时时彩-万位大，重庆时时彩开奖号码为5、6、7、8、9，即为中奖。';

class BettingLong extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// TODO 再確認資料結構
			bettingLongFilterId: ContinuousKeysEnum.ALL,
			lotteryCodes: props.lotteryClassesOptions.map(_option => _option.value),
		};

		this._handleChangeBettingLongFilterID = this._handleChangeBettingLongFilterID.bind(this);
		this._handleChangeLotteryCodes = this._handleChangeLotteryCodes.bind(this);
		this._handleUpdateCombination = this._handleUpdateCombination.bind(this);
		this._filterBettingLongList = this._filterBettingLongList.bind(this);
		this._renderBettingLongList = this._renderBettingLongList.bind(this);
	}

	_handleChangeBettingLongFilterID(item) {
		this.setState({ bettingLongFilterId: item.id, });
	}

	_handleChangeLotteryCodes(list) {
		const {
			lotteryClassesOptions,
		} = this.props;
		const selectableLotteryCodes = lotteryClassesOptions.map(_option => _option.value);

		// 由於 CheckBoxGroup onChange 回傳時的資料為 array
		// 故使用 checkIsAllOptionExist 先檢查 "全部" 的點擊狀況
		// 再藉由不同的判斷結果影響應該回傳的資料
		// TODO 若其他地方還有相似情形，則考慮將操作邏輯抽出
		this.setState((prevState) => {
			const {
				lotteryCodes: prevLotteryCodes,
			} = prevState;
			const isPreviousAllOptionSelected = checkIsAllOptionExist(prevLotteryCodes);
			const isAllOptionSelected = checkIsAllOptionExist(list);

			// all option changed
			if (!isPreviousAllOptionSelected && isAllOptionSelected) {
				return {
					lotteryCodes: lotteryClassesOptions.map(_option => _option.value),
				};
			}
			if (isPreviousAllOptionSelected && !isAllOptionSelected) {
				return {
					lotteryCodes: [],
				};
			}

			// lottery class options changed
			if (
				isAllOptionSelected
				&& (prevLotteryCodes.length !== list.length)
			) {
				return {
					lotteryCodes: list.filter(value => value !== OPTION_ALL),
				};
			}
			if (
				!isAllOptionSelected
				&& (selectableLotteryCodes.length - 1 === list.length)
			) {
				return {
					lotteryCodes: [OPTION_ALL].concat(list),
				};
			}

			return { lotteryCodes: list, };
		});
	}

	_handleUpdateCombination(playCondition, codesList) {
		// TODO do add or update or clear betting action
	}

	_filterBettingLongList({
		continuousIssue,
		lotteryClass = {},
	}) {
		const {
			bettingLongFilterId,
			lotteryCodes,
		} = this.state;
		const checkIsGreaterThanEqualIssue = getContinuousIssueFilter(bettingLongFilterId);
		const isContainedLotteryCodes = lotteryCodes.indexOf(lotteryClass.code) > -1;
		let condition = true;

		condition = condition && checkIsGreaterThanEqualIssue(continuousIssue);
		condition = condition && isContainedLotteryCodes;

		return condition;
	}

	_renderBettingLongList() {
		const { bettingLongData, } = this.props;
		const { _handleUpdateCombination, } = this;

		return bettingLongData
			.filter(this._filterBettingLongList)
			.map(bettingLong => {
				const { playCondition, play, lotteryId, playId, } = bettingLong;

				return (
					<BettingLongItem
						key={play.id}
						playCondition={playCondition}
						play={play.name}
						lotteryId={lotteryId}
						// TODO fetch code list to pass playId
						playId={playId}
						onUpdateCombination={_handleUpdateCombination}
					/>
				);
			});
	}

	render() {
		const {
			lotteryClassesOptions,
		} = this.props;
		const {
			bettingLongFilterId,
			lotteryCodes,
		} = this.state;

		return (
			<DashboardBlock
				icon={(
					<Icon
						type={Icon.IconTypeEnums.MONEY}
						size={Icon.SizeEnums.XX_LARGE}
					/>
				)}
				size={DashboardBlock.SizeEnum.LARGE}
				headerOutline={DashboardBlock.OutlineEnum.STRING}
				items={[{
					id: 'betting-long',
					name: '長龍投注',
					content: (
						<div className={`${PREFIX_CLASS}__container`}>
							<Row
								className={`${PREFIX_CLASS}__play-explanation-row`}
								type={Row.TypeEnums.FLEX}
								flexLayout={Row.FlexJustifyEnums.SPACE_BETWEEN}
							>
								<div className={`${PREFIX_CLASS}__play-explanation`}>
									<Icon
										type={Icon.IconTypeEnums.INFO_FILL}
										color={Icon.ColorEnums.PRIMARY}
										size={Icon.SizeEnums.LARGE}
									/>
									<span>
										玩法说明：挑选所有相同奖号连续开出3期以上的双面盘游戏，您可以在投注页面上方自由筛选连续期数或彩种进行投注。
									</span>
								</div>
								<Tooltip
									className={`${PREFIX_CLASS}__play-example-tooltip`}
									arrowPointAtCenter
									placement={Tooltip.PlacementEnums.BOTTOM}
									overlayClassName={`${PREFIX_CLASS}__tooltip-overlay`}
									title={playExample}
								>
									<label className={`${PREFIX_CLASS}__tag`}>
										玩法范例
									</label>
								</Tooltip>
							</Row>
							<Row
								className={`${PREFIX_CLASS}__filter-selection-row`}
							>
								<LabelSelector
									label=''
									items={continuousOptions}
									selectedId={bettingLongFilterId}
									onClickItem={this._handleChangeBettingLongFilterID}
								/>
								<CheckBoxGroup
									className={`${PREFIX_CLASS}__lottery-filter`}
									value={lotteryCodes}
									options={lotteryClassesOptions}
									onChange={this._handleChangeLotteryCodes}
								/>
							</Row>
							<Row
								className={`${PREFIX_CLASS}__lists--wrapper`}
							>
								{this._renderBettingLongList()}
							</Row>
							{/* TODO use general checkout feature */}
							<BettingLongCheckoutFeature
								className={`${PREFIX_CLASS}__betting-checkout`}
							/>
						</div>
					),
				}]}
			/>
		);
	}
}

BettingLong.propTypes = propTypes;
BettingLong.defaultProps = defaultProps;

function mapStateToProps(state) {
	// TODO generate options in reducer
	const lotteryClassesData = state.lotteryClasses.get('data').toArray();

	return {
		// TODO get betting long data
		bettingLongData: fakeBettingLongData,
		lotteryClassesOptions: generateLotteryClassesOptions(lotteryClassesData),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		// TODO map get bettinglong data by filter action
	};
}

const checkIsGreaterThanEqual = curryRight((value, other) => (value >= other));

function getContinuousIssueFilter(key = ContinuousKeysEnum.ALL) {
	const method = {
		[ContinuousKeysEnum.ALL]: checkIsGreaterThanEqual(0),
		[ContinuousKeysEnum.THREE]: checkIsGreaterThanEqual(3),
		[ContinuousKeysEnum.FOUR]: checkIsGreaterThanEqual(4),
		[ContinuousKeysEnum.SEVEN]: checkIsGreaterThanEqual(7),
		[ContinuousKeysEnum.NINE]: checkIsGreaterThanEqual(9),
	}[key];

	if (!method) {
		throw new Error(`[getContinuousIssueFilter]: do not support key [${key}]`);
	}

	return method;
}

function generateLotteryClassesOptions(lotteryClassesData = []) {
	const lotteryClassesOptions = lotteryClassesData.map(_class => ({ label: _class.name, value: _class.code, }));
	const options = [
		{ label: '全部', value: OPTION_ALL, },
	];

	return options.concat(lotteryClassesOptions);
}

function checkIsAllOptionExist(lotteryCodes = []) {
	return lotteryCodes.indexOf(OPTION_ALL) > -1;
}

export default connect(mapStateToProps, mapDispatchToProps)(BettingLong);

const fakeBettingLongData = [{
	playCondition: '個位',
	play: {
		_id: '20190409033',
		bonus: 7.2370370370370365,
		id: 53112,
		name: '总和大',
		odds: 3.6185185185185182,
	},
	lotteryId: 12,
	playId: 1,
	continuousIssue: 3,
	lotteryClass: {
		code: 'ssc',
	},
}, {
	playCondition: '千位',
	play: {
		_id: '20190409034',
		bonus: 7.2370370370370365,
		id: 53113,
		name: '总和小',
		odds: 3.6185185185185182,
	},
	lotteryId: 12,
	playId: 1,
	continuousIssue: 1,
	lotteryClass: {
		code: 'pk10',
	},
}, {
	playCondition: '万位',
	play: {
		_id: '20190409035',
		bonus: 7.2370370370370365,
		id: 53114,
		name: '总和单',
		odds: 3.6185185185185182,
	},
	lotteryId: 12,
	playId: 1,
	continuousIssue: 7,
	lotteryClass: {
		code: '3d',
	},
}, {
	playCondition: '百位',
	play: {
		_id: '20190409036',
		bonus: 7.2370370370370365,
		id: 53115,
		name: '总和双',
		odds: 3.6185185185185182,
	},
	lotteryId: 16,
	playId: 1,
	continuousIssue: 9,
	lotteryClass: {
		code: 'pcdd',
	},
}, {
	playCondition: '冠軍',
	play: {
		_id: '20190409037',
		bonus: 7.2370370370370365,
		id: 53156,
		name: '龍',
		odds: 3.6185185185185182,
	},
	lotteryId: 16,
	playId: 1,
	continuousIssue: 11,
	lotteryClass: {
		code: '11x5',
	},
}];
