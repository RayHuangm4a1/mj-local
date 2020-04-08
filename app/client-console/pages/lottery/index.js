import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { default as compose, } from 'lodash/flowRight';
import { connect, } from 'ljit-store-connecter';
import { Layout, LabelSelector, } from 'ljit-react-components';
import LotteryInfoHeader from './layout/lottery-info-header';
import LotterySiderMenu from './lottery-sider-menu';
import {
	withLoadingStatusNotification,
	notifications,
} from '../../../lib/notify-handler';
import MyCollectionPanel from '../../features/my-collection-panel';
import ClientTabLabelSelector from '../../components/client-tab-label-selecter';
import MyCollectionModal from '../../components/my-collection-modal';
import { RouteKeyEnums, } from '../../route';
import {
	lotteryDrawingActions,
	playConditionActions,
	playActions,
	bettingRecordActions,
	traceRecordActions,
	selectedLotteryActions,
	lotteryDrawingRecordActions,
	myLotteryCollectionsActions,
} from '../../controller';
import {
	PlayClassesEnum,
	LoadingStatusEnum,
	FeatureCodeEnum,
} from '../../lib/enums';
import {
	LotteryDataPropTypes,
	MyLotteryCollectionIdsDataPropTypes,
	MyLotteryCollectionsDataPropTypes,
} from '../../lib/prop-types-utils';
import { withTheme, } from '../../lib/theme-provider';
import { withFeatureToggle, layoutConfigsPropTypes, } from '../../../lib/feature-toggle-provider';
import './style.styl';

const { successNotifications, } = notifications;
const { Success, } = successNotifications;
const { STANDARD, XINYONG, KILL_NUMBER, PLANNING } = PlayClassesEnum;
const { NONE, LOADING, SUCCESS, FAILED, } = LoadingStatusEnum;

const {
	fetchLatestBettingRecordsAction,
} = bettingRecordActions;
const {
	fetchLatestTraceRecordsAction,
} = traceRecordActions;
const { fetchPlayConditionsAction } = playConditionActions;
//TODO replace lottery drawing record data to feature
const { fetchLotteryDrawingRecordsAction, } = lotteryDrawingRecordActions;
const {
	startUpdateLotteryDrawingsIntervalAction,
	stopUpdateLotteryDrawingsIntervalAction,
} = lotteryDrawingActions;
const { fetchPlaysAction, } = playActions;
const { setSelectedLotteryAction, clearSelectedLotteryAction, } = selectedLotteryActions;
const {
	fetchMyLotteryCollectionsAction,
	updateMyLotteryCollectionsAction,
} = myLotteryCollectionsActions;
const {
	LOTTERY_HOME,
} = RouteKeyEnums;

const failedLoadingStatuses = [
	{
		loadingStatus: 'myLotteryCollectionsLoadingStatus',
		loadingStatusMessage: 'myLotteryCollectionsLoadingStatusMessage',
	},
	{
		loadingStatus: 'myLotteryCollectionsUpdateLoadingStatus',
		loadingStatusMessage: 'myLotteryCollectionsUpdateLoadingStatusMessage',
	},
	{
		loadingStatus: 'bettingLoadingStatus',
		loadingStatusMessage: 'bettingLoadingStatusMessage',
	},
	{
		loadingStatus: 'discardLoadingStatus',
		loadingStatusMessage: 'discardLoadingStatusMessage',
	},
];

const propTypes = {
	theme: PropTypes.shape({
		style: PropTypes.object,
	}),
	layoutConfigs: layoutConfigsPropTypes,
	renderedRoutes: PropTypes.object,
	platformData: PropTypes.shape({
		_id: PropTypes.string,
		status: PropTypes.oneOf(["online",]),
		name: PropTypes.string,
		code: PropTypes.string,
		bonus: PropTypes.shape({
			max: PropTypes.number,
			min: PropTypes.number,
		}),
		policy: PropTypes.shape({
			reward: PropTypes.shape({
				mode: PropTypes.shape({
					_id: PropTypes.string,
					name: PropTypes.string,
					code: PropTypes.string,
				}),
				pk: PropTypes.shape({
					benefit: PropTypes.shape({
						max: PropTypes.number,
					}),
				}),
				nonPk: PropTypes.shape({
					benefit: PropTypes.shape({
						max: PropTypes.number,
					}),
				}),
			}),
		}),
		createdAt: PropTypes.string,
		updatedAt: PropTypes.string,
	}),
	lotteryId: PropTypes.string,
	lotteryClassId: PropTypes.string,
	lotteryClassesData: PropTypes.array.isRequired,
	lotteriesData: PropTypes.objectOf(
		PropTypes.arrayOf(LotteryDataPropTypes),
	).isRequired,
	lotteriesMapData: PropTypes.objectOf(LotteryDataPropTypes).isRequired,
	myLotteryCollectionIdsData: MyLotteryCollectionIdsDataPropTypes,
	myLotteryCollectionsData: MyLotteryCollectionsDataPropTypes,
	playConditionsLoadingStatus: PropTypes.number.isRequired,
	lotteryDrawingsLoadingStatus: PropTypes.number.isRequired,
	myLotteryCollectionsLoadingStatus: PropTypes.number.isRequired,
	myLotteryCollectionsLoadingStatusMessage: PropTypes.string.isRequired,
	myLotteryCollectionsUpdateLoadingStatus: PropTypes.number.isRequired,
	myLotteryCollectionsUpdateLoadingStatusMessage: PropTypes.string.isRequired,
	bettingLoadingStatus: PropTypes.oneOf([ NONE, SUCCESS, FAILED, LOADING,]).isRequired,
	bettingLoadingStatusMessage: PropTypes.string,
	discardLoadingStatus: PropTypes.oneOf([ NONE, SUCCESS, FAILED, LOADING,]).isRequired,
	discardLoadingStatusMessage: PropTypes.string,
	onNavigate: PropTypes.func.isRequired,
	pathName: PropTypes.string.isRequired,
	startUpdateLotteryDrawingsIntervalAction: PropTypes.func.isRequired,
	stopUpdateLotteryDrawingsIntervalAction: PropTypes.func.isRequired,
	fetchPlayConditionsAction: PropTypes.func.isRequired,
	playConditionsData: PropTypes.object.isRequired,
	fetchPlaysAction: PropTypes.func.isRequired,
	fetchLatestBettingRecordsAction: PropTypes.func.isRequired,
	fetchLatestTraceRecordsAction: PropTypes.func.isRequired,
	setSelectedLotteryAction: PropTypes.func.isRequired,
	clearSelectedLotteryAction: PropTypes.func.isRequired,
	fetchLotteryDrawingRecordsAction: PropTypes.func.isRequired,
	fetchMyLotteryCollectionsAction: PropTypes.func.isRequired,
	updateMyLotteryCollectionsAction: PropTypes.func.isRequired,
	notifyHandlingAction: PropTypes.func.isRequired,
};

class LotteryHomePage extends Component {
	constructor() {
		super();

		this.state = {
			playClassSelectedKey: null,
			playConditionSelectedKey: null,
			lotteryId: null,
			isMyCollectionModalVisible: false,
		};

		this._handleToggleMyCollectionModalVisible = this._handleToggleMyCollectionModalVisible.bind(this);
		this._handleUpdateMyCollections = this._handleUpdateMyCollections.bind(this);
		this._renderLabelSelectorItems = this._renderLabelSelectorItems.bind(this);
		this._handleNavigateToLottery = this._handleNavigateToLottery.bind(this);
		this._handleNavigateToPlay = this._handleNavigateToPlay.bind(this);
		this._handleNavigateToPage = this._handleNavigateToPage.bind(this);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const {
			lotteryId,
			playConditionsData,
			playConditionsLoadingStatus,
			playClassCode,
			playConditionId,
		} = nextProps;
		const shouldUpdateLotteryId = nextProps.lotteryId !== prevState.lotteryId;
		const shouldUpdatePlayConditionSelectedId = Number(playConditionId) !== prevState.playConditionSelectedKey;

		if (playConditionsLoadingStatus === SUCCESS
			&& (shouldUpdateLotteryId || shouldUpdatePlayConditionSelectedId)
		) {
			if (playClassCode === STANDARD) {
				return {
					lotteryId,
					playConditionSelectedKey: Number(playConditionId) || playConditionsData.standard[0].id,
					playClassSelectedKey: playClassCode,
				};
			} else {
				return {
					lotteryId,
					playConditionSelectedKey: XINYONG,
					playClassSelectedKey: playClassCode,
				};
			}
		}

		return null;
	}

	_handleToggleMyCollectionModalVisible() {
		this.setState(({ isMyCollectionModalVisible: prevIsModalVisible, }) => ({
			isMyCollectionModalVisible: !prevIsModalVisible,
		}));
	}
	_handleUpdateMyCollections(selectedLotteryIds) {
		const {
			updateMyLotteryCollectionsAction,
		} = this.props;

		updateMyLotteryCollectionsAction(selectedLotteryIds);

		this._handleToggleMyCollectionModalVisible();
	}

	_handleNavigateToLottery(lottery) {
		const {
			lotteryClass = {},
		} = lottery;
		const path = `${LOTTERY_HOME}/${lotteryClass.id}/${lottery.id}/${STANDARD}`;

		this.props.onNavigate(path);
	}

	_handleNavigateToPlay(data) {
		const {
			lotteriesMapData,
			onNavigate,
			lotteryId,
		} = this.props;
		const lottery = lotteriesMapData[lotteryId];
		const {
			lotteryClass = {},
		} = lottery;

		let playClassSelectedKey;

		if (data.playClass && data.playClass.code === STANDARD) {
			playClassSelectedKey = STANDARD;
			onNavigate(`${LOTTERY_HOME}/${lotteryClass.id}/${lottery.id}/${STANDARD}/${data.id}`);
		} else {
			playClassSelectedKey = XINYONG;
			onNavigate(`${LOTTERY_HOME}/${lotteryClass.id}/${lottery.id}/${data.id}`);
		}

		this.setState({
			playConditionSelectedKey: data.id,
			playClassSelectedKey,
		});
	}
	_handleNavigateToPage(tab) {
		const {
			playConditionsData,
			lotteriesMapData,
			onNavigate,
			lotteryId,
		} = this.props;
		const lottery = lotteriesMapData[lotteryId];
		const {
			lotteryClass = {},
		} = lottery;

		const playConditionSelectedKey = tab.id === XINYONG ? XINYONG : playConditionsData[STANDARD][0].id;

		this.setState({
			playConditionSelectedKey,
			playClassSelectedKey: tab.id,
		});

		onNavigate(`${LOTTERY_HOME}/${lotteryClass.id}/${lottery.id}/${tab.id}`);
	}

	_renderLabelSelectorItems() {
		const {
			layoutConfigs
		} = this.props;
		const {
			toggles: {
				is_KILL_NUMBER_Active,
				is_PLANNING_Active,
			}
		} = layoutConfigs;
		const labelSelectorItems = [
			{
				id: XINYONG,
				name: '信用',
			},
			{
				id: STANDARD,
				name: '官方',
			},
		];

		if (is_KILL_NUMBER_Active) {
			labelSelectorItems.push({
				id: KILL_NUMBER,
				name: '缩水'
			});
		}

		if (is_PLANNING_Active) {
			labelSelectorItems.push({
				id: PLANNING,
				name: '计画'
			});
		}

		return labelSelectorItems;
	}

	render() {
		const {
			renderedRoutes,
			lotteryId,
			lotteryClassId,
			lotteryClassesData,
			lotteriesData,
			lotteriesMapData,
			playConditionsData,
			theme,
			myLotteryCollectionIdsData,
			myLotteryCollectionsData,
		} = this.props;
		const {
			playConditionSelectedKey,
			playClassSelectedKey,
			isMyCollectionModalVisible,
		} = this.state;
		const {
			_handleNavigateToLottery,
			_handleNavigateToPage,
			_renderLabelSelectorItems,
			_handleToggleMyCollectionModalVisible,
			_handleUpdateMyCollections,
		} = this;
		const { style, } = theme;

		return (
			<React.Fragment>
				<LotteryInfoHeader
					lotteryId={lotteryId}
					lotteryClassId={lotteryClassId}
				/>
				<Layout className="lottery-layout">
					<LotterySiderMenu
						className="lottery-layout__sider"
						lotteriesData={lotteriesData}
						lotteryClassesData={lotteryClassesData}
						myLotteryCollectionsData={myLotteryCollectionsData}
						onClickFavoriteSetting={_handleToggleMyCollectionModalVisible}
						onClickMenuItem={_handleNavigateToLottery}
					/>
					<div className="content-column__left">
						<MyCollectionPanel
							className="lottery-layout__my-favorite"
							onClickLottery={_handleNavigateToLottery}
						/>
						<ClientTabLabelSelector
							items={_renderLabelSelectorItems()}
							selectedId={playClassSelectedKey}
							onClickItem={_handleNavigateToPage}
						/>
					</div>
					<div className={`${style.themeLotteryIndex} lottery-layout__content`}>
						{/* TODO 等之後頁面出來判斷要不要將上方選玩法的 selector 移進頁面 */}
						<LabelSelector
							items={prependXinYongData(playConditionsData.standard)}
							selectedId={playConditionSelectedKey}
							onClickItem={this._handleNavigateToPlay}
							isSelectedShowBorder={false}
						/>
						{renderedRoutes}
					</div>
					<MyCollectionModal
						isVisible={isMyCollectionModalVisible}
						selectedLotteryIds={myLotteryCollectionIdsData}
						lotteryClasses={lotteryClassesData}
						lotteries={lotteriesData}
						lotteriesMapData={lotteriesMapData}
						onSubmitModal={_handleUpdateMyCollections}
						onCloseModal={_handleToggleMyCollectionModalVisible}
					/>
				</Layout>
			</React.Fragment>
		);
	}

	componentDidMount() {
		const {
			lotteryId,
			lotteriesMapData,
			startUpdateLotteryDrawingsIntervalAction,
			fetchPlayConditionsAction,
			fetchPlaysAction,
			fetchLatestBettingRecordsAction,
			fetchLatestTraceRecordsAction,
			setSelectedLotteryAction,
			//當每期開獎後, 需抓當期開獎資料, 加入reducer中
			fetchLotteryDrawingRecordsAction,
			fetchMyLotteryCollectionsAction,
		} = this.props;

		fetchLatestBettingRecordsAction();
		fetchLatestTraceRecordsAction();
		fetchMyLotteryCollectionsAction();

		if (lotteryId) {
			const lottery = lotteriesMapData[lotteryId] || {};
			const { id, } = lottery;

			startUpdateLotteryDrawingsIntervalAction(id);
			fetchPlayConditionsAction(id);
			setSelectedLotteryAction(lottery);
			fetchPlaysAction(id);
			fetchLotteryDrawingRecordsAction(id);
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		const {
			lotteryId,
			lotteryDrawingsLoadingStatus,
			playConditionsLoadingStatus,
			myLotteryCollectionsLoadingStatus,
			myLotteryCollectionsUpdateLoadingStatus,
			bettingLoadingStatus,
			discardLoadingStatus,
		} = this.props;
		const {
			isMyCollectionModalVisible,
		} = this.state;

		return (nextProps.lotteryId !== lotteryId)
			|| (nextProps.lotteryDrawingsLoadingStatus !== lotteryDrawingsLoadingStatus)
			|| (nextProps.playConditionsLoadingStatus !== playConditionsLoadingStatus)
			|| (nextProps.pathName !== this.props.pathName)
			|| (nextProps.myLotteryCollectionsLoadingStatus !== myLotteryCollectionsLoadingStatus)
			|| (nextProps.myLotteryCollectionsUpdateLoadingStatus !== myLotteryCollectionsUpdateLoadingStatus)
			|| (nextState.isMyCollectionModalVisible !== isMyCollectionModalVisible)
			|| (nextProps.bettingLoadingStatus !== bettingLoadingStatus)
			|| (nextProps.discardLoadingStatus !== discardLoadingStatus);
	}

	componentDidUpdate(prevProps) {
		const {
			lotteriesMapData,
			lotteryId,
			myLotteryCollectionsUpdateLoadingStatus,
			stopUpdateLotteryDrawingsIntervalAction,
			startUpdateLotteryDrawingsIntervalAction,
			fetchPlayConditionsAction,
			fetchPlaysAction,
			setSelectedLotteryAction,
			notifyHandlingAction,
			bettingLoadingStatus,
			discardLoadingStatus,
		} = this.props;

		if (prevProps.bettingLoadingStatus === LOADING && bettingLoadingStatus === SUCCESS) {
			notifyHandlingAction(new Success('投注成功'));
		}

		if (prevProps.discardLoadingStatus === LOADING && discardLoadingStatus === SUCCESS) {
			notifyHandlingAction(new Success('撤单成功'));
		}

		if (prevProps.lotteryId !== lotteryId) {
			const lottery = lotteriesMapData[lotteryId] || {};
			const { id, } = lottery;

			stopUpdateLotteryDrawingsIntervalAction();
			startUpdateLotteryDrawingsIntervalAction(id);
			fetchPlayConditionsAction(id);
			fetchPlaysAction(id);
			setSelectedLotteryAction(lottery);
			fetchLotteryDrawingRecordsAction(id);
		}

		if (
			prevProps.myLotteryCollectionsUpdateLoadingStatus === LOADING
			&& myLotteryCollectionsUpdateLoadingStatus === SUCCESS
		) {
			notifyHandlingAction(new Success('彩种收藏成功'));
		}
	}

	componentWillUnmount() {
		const { stopUpdateLotteryDrawingsIntervalAction, clearSelectedLotteryAction, } = this.props;

		stopUpdateLotteryDrawingsIntervalAction();
		clearSelectedLotteryAction();
	}
}

function mapStateToProps(state) {
	const {
		lotteries: lotteriesReducer,
		playConditions: playConditionsReducer,
		myLotteryCollections: myLotteryCollectionsReducer,
	} = state;

	return {
		platformData: state.platform.get('data').toObject(),
		lotteryClassesData: state.lotteryClasses.get('data').toArray(),
		lotteriesData: lotteriesReducer.get('lotteriesData').toObject(),
		lotteriesMapData: lotteriesReducer.get('lotteriesMapData').toObject(),
		lotteryDrawingsLoadingStatus: state.lotteryDrawings.get('loadingStatus'),
		playConditionsLoadingStatus: playConditionsReducer.get('loadingStatus'),
		playConditionsData: playConditionsReducer.get('data').toObject(),
		lotteryDrawingRecordsData: state.lotteryDrawingRecords.get('data'),
		myLotteryCollectionIdsData: myLotteryCollectionsReducer.get('collectionIdsData').toArray(),
		myLotteryCollectionsData: myLotteryCollectionsReducer.get('collectionsData').toArray(),
		myLotteryCollectionsLoadingStatus: myLotteryCollectionsReducer.get('loadingStatus'),
		myLotteryCollectionsLoadingStatusMessage: myLotteryCollectionsReducer.get('loadingStatusMessage'),
		myLotteryCollectionsUpdateLoadingStatus: myLotteryCollectionsReducer.get('updateLoadingStatus'),
		myLotteryCollectionsUpdateLoadingStatusMessage: myLotteryCollectionsReducer.get('updateLoadingStatusMessage'),
		bettingLoadingStatus: state.bettings.get('loadingStatus'),
		bettingLoadingStatusMessage: state.bettings.get('loadingStatusMessage'),
		discardLoadingStatus: state.bettingRecords.get('discardLoadingStatus'),
		discardLoadingStatusMessage: state.bettingRecords.get('discardLoadingStatusMessage'),
	};
}
function mapDispatchToProps(dispatch) {
	return {
		startUpdateLotteryDrawingsIntervalAction: (...args) => dispatch(startUpdateLotteryDrawingsIntervalAction(...args)),
		stopUpdateLotteryDrawingsIntervalAction: () => dispatch(stopUpdateLotteryDrawingsIntervalAction()),
		fetchPlayConditionsAction: (...args) => dispatch(fetchPlayConditionsAction(...args)),
		fetchPlaysAction: (id) => dispatch(fetchPlaysAction(id)),
		fetchLatestBettingRecordsAction: () => dispatch(fetchLatestBettingRecordsAction()),
		fetchLatestTraceRecordsAction: () => dispatch(fetchLatestTraceRecordsAction()),
		fetchLotteryDrawingRecordsAction: (...args) => dispatch(fetchLotteryDrawingRecordsAction(...args)),
		setSelectedLotteryAction: (lottery) => dispatch(setSelectedLotteryAction(lottery)),
		clearSelectedLotteryAction: () => dispatch(clearSelectedLotteryAction()),
		fetchMyLotteryCollectionsAction: () => dispatch(fetchMyLotteryCollectionsAction()),
		updateMyLotteryCollectionsAction: (...args) => dispatch(updateMyLotteryCollectionsAction(...args)),
	};
}

LotteryHomePage.propTypes = propTypes;

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withFeatureToggle(FeatureCodeEnum.LOTTERY),
	withTheme,
)(
	withLoadingStatusNotification(
		failedLoadingStatuses,
		LotteryHomePage
	)
);

function prependXinYongData(dataSource = []) {
	const updateDataSource = dataSource.slice();

	updateDataSource.unshift({
		id: XINYONG,
		name: '信用'
	});

	return updateDataSource;
}
