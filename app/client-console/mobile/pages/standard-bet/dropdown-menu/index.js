import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { DropdownMenuBar, ScrollSelector } from 'ljit-react-components';
import LotterySelector from './lottery-selector';
import PlaySelector from './play-selector';
import OpeningDrawingSelector from './opening-drawing-selector';
import { get } from './utils';
import { connect, } from 'ljit-store-connecter';
import { selectedLotteryActions } from '../../../../controller';

const propTypes = {
	setSelectedLotteryAction: PropTypes.func.isRequired,
};
const { setSelectedLotteryAction } = selectedLotteryActions;
const MAX_RECENTLY_VISITED_COUNT = 5;

class DropdownMenu extends Component {
	constructor() {
		super();
		this.state = {
			selectedMenuId: null,
			selectedLotteryGroup: {}, //{lotteryClassId, lotteryId}
			selectedLotteryName: null,
			selectedPlayGroup: {}, //{playConditionId, subConditionId, playId}
			selectedPlayName: null,
			recentlyVisitedPlayGroups: [], // [{playConditionId, subConditionId, playId}, ...]
			recentlyVisitedPlayIndex: 0,
		};
		this._handleClickMenu = this._handleClickMenu.bind(this);
		this._handleCloseMenu = this._handleCloseMenu.bind(this);
		this._handleChangeLottery = this._handleChangeLottery.bind(this);
		this._handleChangePlay = this._handleChangePlay.bind(this);
		this._handleRecentlyVisitedPlays = this._handleRecentlyVisitedPlays.bind(this);
		this._handleClickPlayTag = this._handleClickPlayTag.bind(this);
		this._handleConversionName = this._handleConversionName.bind(this);
	}

	_handleClickMenu(selectedMenuId) {
		if (selectedMenuId === this.state.selectedMenuId) {
			this._handleCloseMenu();
		} else {
			this.setState({ selectedMenuId, });
		}
	}

	_handleCloseMenu() {
		this.setState({ selectedMenuId: null, });
	}

	_handleChangeLottery(selectedLotteryGroup, selectedLotteryName) {
		// TODO 確認儲存最近造訪的彩種的方式，然後在選擇 lottery Id 時，要重新 init
		const { setSelectedLotteryAction } = this.props; 
		const { lotteryClassId, lotteryId } = selectedLotteryGroup;
		const lottery = get(fakeLotteries[lotteryClassId], lotteryId);

		setSelectedLotteryAction(lottery);
		this.setState({ 
			selectedLotteryGroup,
			selectedLotteryName,
		});
		this._handleCloseMenu();
	}

	_handleChangePlay(selectedPlayGroup, selectedPlayName) {
		this._handleRecentlyVisitedPlays(selectedPlayGroup);
		this.setState({
			selectedPlayGroup,
			selectedPlayName,
		});
		this._handleCloseMenu();
	}

	_handleRecentlyVisitedPlays(visitedPlayGroup) {
		const recentlyVisitedPlayGroups = [...this.state.recentlyVisitedPlayGroups];

		if (recentlyVisitedPlayGroups.length === MAX_RECENTLY_VISITED_COUNT) {
			recentlyVisitedPlayGroups.pop();
		}
		const recentlyVisitedPlayIndex = recentlyVisitedPlayGroups.findIndex(recentlyVisitedPlayGroup => recentlyVisitedPlayGroup.playId === visitedPlayGroup.playId);

		if (recentlyVisitedPlayIndex == -1) {
			recentlyVisitedPlayGroups.unshift(visitedPlayGroup);

			this.setState({
				recentlyVisitedPlayGroups,
				recentlyVisitedPlayIndex: 0,
			});
			
		} else {
			this.setState({
				recentlyVisitedPlayIndex,
			});
		}
	}

	_handleClickPlayTag(index) {
		const { recentlyVisitedPlayGroups } = this.state;
		const recentlyVisitedPlay = recentlyVisitedPlayGroups[index];
		const { playConditionId, subConditionId, playId } = recentlyVisitedPlay;
		const selectedPlayGroup = { 
			playConditionId,
			subConditionId,
			playId,
		};

		this.setState({
			recentlyVisitedPlayIndex: index,
			selectedPlayGroup,
		});
	}

	_handleConversionName(recentlyVisitedPlayGroup) {
		// TODO 確認名稱顯示的規則
		const { playConditionId, subConditionId, playId } = recentlyVisitedPlayGroup;
		const selectedPlayCondition = get(fakeStandardPlay, playConditionId, { subconditions: [] });
		const selectedSubCondition = get(selectedPlayCondition.subconditions, subConditionId, { plays: [] });
		const selectedPlay = get(selectedSubCondition.plays, playId); 
		
		return `${selectedSubCondition.name}${selectedPlay.name}`;
	}

	render() {
		const {
			_handleClickMenu,
			_handleCloseMenu,
			_handleChangeLottery,
			_handleChangePlay,
			_handleClickPlayTag,
			_handleConversionName
		} = this;
		const {
			selectedLotteryGroup,
			selectedLotteryName,
			selectedPlayGroup,
			selectedPlayName,
			selectedMenuId,
			recentlyVisitedPlayGroups,
			recentlyVisitedPlayIndex
		} = this.state;
		const menuItems = [
			{
				title: selectedLotteryName,
				id: 1,
				dropdownContent: <LotterySelector
					lotteryClasses={fakeLotteryClasses}
					lotteries={fakeLotteries}
					selectedLotteryGroup={selectedLotteryGroup}
					onChangeLottery={_handleChangeLottery}
				/>
			},
			{
				title: selectedPlayName,
				id: 2,
				dropdownContent: <PlaySelector
					plays={fakeStandardPlay}
					selectedPlayGroup={selectedPlayGroup}
					onChangePlay={_handleChangePlay}
				/>,
			},
			{
				title:'最近开奖',
				id: 3,
				dropdownContent: <OpeningDrawingSelector/>,
			},
		];
		const names = recentlyVisitedPlayGroups.map(recentlyVisitedPlayGroup => _handleConversionName(recentlyVisitedPlayGroup));

		return (
			<React.Fragment>
				<DropdownMenuBar
					menuItems={menuItems}
					selectedId={selectedMenuId}
					onClickMenu={_handleClickMenu}
					onClickMask={_handleCloseMenu}
				/>
				<ScrollSelector
					options={names}
					selectedIndex={recentlyVisitedPlayIndex}
					onClick={_handleClickPlayTag}
				/>
			</React.Fragment>
		);
	}
	componentDidMount() {
		const defaultLotteryClassId = fakeLotteryClasses[0].id;
		const defaultLottery = fakeLotteries[defaultLotteryClassId][0];
		const defaultLotteryId = defaultLottery.id;
		const selectedLotteryGroup = { 
			lotteryClassId: defaultLotteryClassId,
			lotteryId: defaultLotteryId,
		};

		const defaultPlayCondition = fakeStandardPlay[0];
		const defaultPlayConditionId = defaultPlayCondition.id;
		const defaultSubCondition = defaultPlayCondition.subconditions[0];
		const defaultSubConditionId = defaultSubCondition.id;
		const defaultPlay = defaultSubCondition.plays[0];
		const defaultPlayId = defaultPlay.id;
		const selectedPlayGroup = {
			playConditionId: defaultPlayConditionId,
			subConditionId: defaultSubConditionId,
			playId: defaultPlayId,
		};

		// TODO 如果信用換彩種，官方的彩種也要跟著改變
		this.setState({
			selectedLotteryGroup,
			selectedLotteryName: defaultLottery.name,
			selectedPlayGroup,
			selectedPlayName: defaultPlay.name,
			recentlyVisitedPlayGroups: [selectedPlayGroup],
		});
	}
}

DropdownMenu.propTypes = propTypes;

function mapStateToProps(state) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {
		// TODO 這邊先儲存假資料，等串接 API 時要再確認資料的結構是否正確
		setSelectedLotteryAction: (lottery) => dispatch(setSelectedLotteryAction(lottery)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(DropdownMenu);

// TODO get data from API
const fakeLotteryClasses = [
	{
		_id: "5dd23c9e8fa4450032819642",
		status: "online",
		id: 0,
		name: "时时彩",
		code: "ssc",
	},
	{
		_id: "5dd23c9e8fa4450032819643",
		status: "online",
		id: 2,
		name: "11选5",
		code: "11x5",
	},
	{
		_id: "5dd23c9e8fa4450032819644",
		status: "online",
		id: 3,
		name: "快乐彩",
		code: "pk10",
	},
	{
		_id: "5dd23c9e8fa4450032819645",
		status: "online",
		id: 4,
		name: "PC蛋蛋",
		code: "pcdd",
	},
	{
		_id: "5dd23c9e8fa4450032819646",
		status: "online",
		id: 6,
		name: "数字3D",
		code: "3d",
	}
];

const fakeLotteries = {
	0: [
		{
			id: 12,
			name: "东京1.5分彩",
			code: "dj1.5fc",
		},
		{
			id: 16,
			name: "腾讯分分彩",
			code: "txffc",
		}
	],
	2: [
		{
			id: 101,
			name: "山东11选5",
			code: "sd11x5",
		}
	],
	3: [
		{
			id: 306,
			name: "幸运飞艇",
			code: "syft",
		}
	],
};

const fakeStandardPlay = [
	{
		id: 1,
		name: "五星",
		subconditions: [
			{
				id: 1001,
				name: "五星直选",
				plays: [
					{ id: 1, name: "直选复式" },
					{ id: 2, name: "直选单式" },
					{ id: 3, name: "直选组合" },
					
				]
			},
			{
				id: 1002,
				name: "五星组选",
				plays: [
					{ id:4, name: "组选120" },
					{ id:5, name: "组选60" },
					{ id:6, name: "组选30" },
					{ id:7, name: "组选20" },
					{ id:8, name: "组选10" },
					{ id:9, name: "组选5" },
				],
			}
		]
	},
	{
		id: 2,
		name: '四星',
		subconditions: [
			{
				id: 2001,
				name: "四星直选",
				plays: [
					{ id: 14, name: "直选复式" },
					{ id: 15, name: "直选单式" },
					{ id: 16, name: "直选组合" },
				]
			}
		]
	}
];
