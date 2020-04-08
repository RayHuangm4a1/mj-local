import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SidebarTabs, } from 'ljit-react-components';
import LotteryDrawingSetting from './setting';
import PageBlock from '../../../../components/page-block';
import { connect } from '../../../../../ljit-store-connecter';
import {
	lotteryDrawingsActions,
	lotteryDrawingManagementPageActions,
} from '../../../../controller';
import {
	withLoadingStatusNotification,
	notifications,
} from '../../../../../lib/notify-handler';
import { LoadingStatusEnum, GameTypeEnums } from '../../../../lib/enums';
import { convertToNumber, } from '../../../../lib/general-utils';
import { RouteKeyEnums, } from '../../../../routes';

const { LOTTERY, } = GameTypeEnums;

const {
	fetchLotteryDrawingsAction,
	stopLotteryDrawingAction,
} = lotteryDrawingsActions;

const {
	errorNotifications,
} = notifications;
const {
	GeneralError,
} = errorNotifications;

const {
	setLotteryDrawingClassOptionsAction,
	setLotteryDrawingTabsAction,
	setLotteryDrawingIntervalAction,
	startUpdateLotteryDrawingsIntervalAction,
	stopUpdateLotteryDrawingsIntervalAction,
	setSelectedLotteryDrawingAction,
	initLotteryDrawingManagementPageAction,
} = lotteryDrawingManagementPageActions;
const { NONE, SUCCESS, FAILED, LOADING, } = LoadingStatusEnum;
const { LOTTERY_GENERAL_DRAWING, } = RouteKeyEnums;

const propTypes = {
	lotteryClassesData: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.string,
		id: PropTypes.number,
		name: PropTypes.string,
		code: PropTypes.string,
		createdAt: PropTypes.string,
		updateAt: PropTypes.string,
		platform: PropTypes.shape({
			_id: PropTypes.string,
			name: PropTypes.string,
			code: PropTypes.string,
		}),
	})),
	lotteriesMapData: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		code: PropTypes.string,
		name: PropTypes.string,
	}))),
	lotteryClassOptions: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string,
		value: PropTypes.number,
	})),
	lotteryTabsData: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		key: PropTypes.string,
		tab: PropTypes.string,
		platformBonus: PropTypes.number,
	})),
	drawingsData: PropTypes.array,
	selectedLotteryClassId: PropTypes.number,
	loadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING]).isRequired,
	notifyHandlingAction: PropTypes.func.isRequired,
	initLotteryDrawingManagementPageAction: PropTypes.func.isRequired,
	fetchLotteryDrawingsAction: PropTypes.func.isRequired,
	setLotteryDrawingClassOptionsAction: PropTypes.func.isRequired,
	setLotteryDrawingTabsAction: PropTypes.func.isRequired,
	setLotteryDrawingIntervalAction: PropTypes.func.isRequired,
	lotteryInterval: PropTypes.object.isRequired,
	startUpdateLotteryDrawingsIntervalAction: PropTypes.func.isRequired,
	stopUpdateLotteryDrawingsIntervalAction: PropTypes.func.isRequired,
	onNavigate: PropTypes.func.isRequired,
	setSelectedLotteryDrawingAction: PropTypes.func.isRequired,
	lotteryDrawingsLoadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING]).isRequired,
	stopLotteryDrawingAction: PropTypes.func.isRequired,
};

const PREFIX_CLASS = 'lottery-drawing-main-page';

class LotteryGeneralDrawingMainPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loadingTabKey: '',
			tabKey: '',
			data: [],
		};
		this._handleFetchLotteryDrawings = this._handleFetchLotteryDrawings.bind(this);
		this._handleChangeTab = this._handleChangeTab.bind(this);
		this._handleChangeLottery = this._handleChangeLottery.bind(this);
		this._handleChangeLotteryClass = this._handleChangeLotteryClass.bind(this);
		this._handleClickStop = this._handleClickStop.bind(this);
		this._handleClickModify = this._handleClickModify.bind(this);
		this._handleClickRecords = this._handleClickRecords.bind(this);
		this._renderTabs = this._renderTabs.bind(this);
		this._handleChangeTimer = this._handleChangeTimer.bind(this);
		this._handleFetchDrawingsWithLimit = this._handleFetchDrawingsWithLimit.bind(this);
	}

	_handleFetchLotteryDrawings(lotteryId, loadingTabKey) {
		const {
			fetchLotteryDrawingsAction
		} = this.props;

		fetchLotteryDrawingsAction(lotteryId);

		this.setState({
			loadingTabKey,
		});
	}
	_handleChangeTab(tabKey) {
		const { lotteryTabsData, } = this.props;
		const { _handleChangeLottery, } = this;
		const lottery = lotteryTabsData.filter(lottery => {
			if (lottery.key === tabKey) {
				return lottery;
			}
		})[0];

		_handleChangeLottery(lottery.id, tabKey);
	}
	_handleChangeLottery(lotteryId, loadingTabKey) {
		const {
			_handleFetchLotteryDrawings,
			_handleChangeTimer,
		} = this;

		_handleFetchLotteryDrawings(lotteryId, loadingTabKey);
		_handleChangeTimer(lotteryId);
	}
	_handleChangeLotteryClass(selectedLotteryClassId) {
		const {
			lotteriesMapData,
			lotteryClassOptions,
			notifyHandlingAction,
			setLotteryDrawingTabsAction,
		} = this.props;

		// 選擇彩種沒有 lottery 的話，select 不會有變化
		if (!lotteriesMapData[selectedLotteryClassId]) {
			const [lotteryClass = { label: '', }] = lotteryClassOptions.filter(
				lotteryClass => lotteryClass.value === selectedLotteryClassId
			);

			notifyHandlingAction(new GeneralError(`${lotteryClass.label}没有彩种`));
			return;
		}

		setLotteryDrawingTabsAction(lotteriesMapData, selectedLotteryClassId);
	}
	_handleClickStop(record) {
		const { lotteryId, issue, } = record;

		this.props.stopLotteryDrawingAction(convertToNumber(lotteryId), issue);
	}
	_handleClickModify(record = {}) {
		const { selectedLotteryClassId, } = this.props;
		const {
			issue = '',
			lotteryId,
		} = record;

		this.props.setSelectedLotteryDrawingAction(record);
		this.props.onNavigate(`${LOTTERY_GENERAL_DRAWING}/${selectedLotteryClassId}/${lotteryId}/${issue}/modify`);
	}
	_handleClickRecords(record = {}) {
		const { selectedLotteryClassId, } = this.props;
		const {
			issue = '',
			key: lotteryId,
		} = record;
		// TODO: 等彩票跟遊戲確認後再來設置 gameType 要帶入得默認值，目前預設為彩票
		const gameType = LOTTERY;
		const data = {
			passProps: {
				gameType,
				issue,
				lotteryId,
			},
		};

		this.props.onNavigate(`${LOTTERY_GENERAL_DRAWING}/${selectedLotteryClassId}/${lotteryId}/${issue}/record`, data);
	}
	_handleChangeTimer(lotteryId, timeInterval) {
		const {
			lotteryInterval,
			setLotteryDrawingIntervalAction,
			startUpdateLotteryDrawingsIntervalAction,
			stopUpdateLotteryDrawingsIntervalAction,
		} = this.props;
		const interval = timeInterval ? timeInterval : lotteryInterval.interval;

		stopUpdateLotteryDrawingsIntervalAction();
		if (interval !== 'no') {
			startUpdateLotteryDrawingsIntervalAction(interval, lotteryId);
		}
		setLotteryDrawingIntervalAction(interval);
	}
	_handleFetchDrawingsWithLimit() {
		const { fetchLotteryDrawingsAction, drawingsData, } = this.props;
		const drawing = drawingsData[drawingsData.length - 1];
		const lotteryId = convertToNumber(drawing.lotteryId);
		const issue = drawing.issue;

		fetchLotteryDrawingsAction(lotteryId, issue);
	}
	_renderTabs() {
		const {
			lotteryTabsData,
			lotteryClassOptions,
			selectedLotteryClassId,
		} = this.props;
		const {
			_handleChangeLotteryClass,
			_handleClickStop,
			_handleClickModify,
			_handleClickRecords,
			_handleFetchDrawingsWithLimit,
			_handleChangeTimer,
		} = this;

		return lotteryTabsData.map(item => {
			const activeLottery = {
				id: item.id,
				code: item.key,
				name: item.tab,
			};

			return (
				<LotteryDrawingSetting
					key={item.id}
					activeLottery={activeLottery}
					activeLotteryClassId={selectedLotteryClassId}
					lotteryClassOptions={lotteryClassOptions}
					onLotteryClassChange={_handleChangeLotteryClass}
					onClickStop={_handleClickStop}
					onClickModify={_handleClickModify}
					onClickRecords={_handleClickRecords}
					onChangeTimer={_handleChangeTimer}
					onClickLoadMore={_handleFetchDrawingsWithLimit}
				/>
			);
		});
	}

	render() {
		const { lotteryTabsData, } = this.props;
		const { tabKey, } = this.state;
		const {
			_renderTabs,
			_handleChangeTab,
		} = this;

		return (
			<PageBlock className={PREFIX_CLASS}>
				<div>
					<SidebarTabs
						tabData={lotteryTabsData}
						activeKey={tabKey}
						onChange={_handleChangeTab}
					>
						{_renderTabs()}
					</SidebarTabs>
				</div>
			</PageBlock>
		);
	}

	componentDidMount() {
		this.props.initLotteryDrawingManagementPageAction();
	}
	componentDidUpdate(prevProps) {
		const {
			setLotteryDrawingClassOptionsAction,
			setLotteryDrawingTabsAction,
			lotteriesMapData,
			lotteryClassesData,
			lotteryTabsData,
			selectedLotteryClassId,
			loadingStatus,
			lotteryDrawingsLoadingStatus,
		} = this.props;
		const { loadingTabKey, } = this.state;
		const { _handleChangeLottery } = this;
		const isLotteryDrawingPageInitCompleted = loadingStatus === SUCCESS && prevProps.loadingStatus === LOADING;
		const isSelectedLotteryClassIdChanged = prevProps.selectedLotteryClassId !== selectedLotteryClassId;
		const isFetchLotteryDrawingsCompleted = lotteryDrawingsLoadingStatus === SUCCESS && prevProps.lotteryDrawingsLoadingStatus !== SUCCESS;

		if (isLotteryDrawingPageInitCompleted) {
			// TODO: 目前資料第一筆沒有lotteries，此會導致頁面錯誤，先寫取第一筆有lotteries id的功能，等資料整後移除
			const firstLotteryClassId = getFirstLotteryClassIdHasLotteries(lotteryClassesData);

			setLotteryDrawingClassOptionsAction(lotteryClassesData);

			if (firstLotteryClassId !== null) {
				setLotteryDrawingTabsAction(lotteriesMapData, firstLotteryClassId);
			}

			if (lotteryTabsData.length) {
				this.setState({
					tabKey: lotteryTabsData[0].key,
				});
			}
		}
		if (isSelectedLotteryClassIdChanged && lotteryTabsData.length) {
			const { id, key, } = lotteryTabsData[0];

			_handleChangeLottery(id, key);
		}
		if (isFetchLotteryDrawingsCompleted) {
			this.setState({
				tabKey: loadingTabKey,
			});
		}
	}
}

LotteryGeneralDrawingMainPage.propTypes = propTypes;

function getFirstLotteryClassIdHasLotteries(lotteryClassesData = []) {
	const lotteryClass = lotteryClassesData.filter(lotteryClass => lotteryClass.lotteries.length > 0);

	if (lotteryClass.length > 0) {
		return lotteryClass[0].id;
	}
	return null;
}

function mapStateToProp(state) {
	return {
		lotteryClassesData: state.lotteryClassesAndLotteries.get('lotteryClasses').toArray(),
		lotteriesMapData: state.lotteryClassesAndLotteries.get('lotteriesMap').toObject(),
		lotteryClassOptions: state.lotteryDrawingManagementPage.get('lotteryClassOptions').toArray(),
		lotteryTabsData: state.lotteryDrawingManagementPage.get('lotteryTabsData').toArray(),
		selectedLotteryClassId: state.lotteryDrawingManagementPage.get('selectedLotteryClassId'),
		loadingStatus: state.lotteryDrawingManagementPage.get('loadingStatus'),
		loadingStatusMessage: state.lotteryDrawingManagementPage.get('loadingStatusMessage'),
		lotteryInterval: state.lotteryDrawingManagementPage.get('lotteryInterval').toObject(),
		lotteryDrawingsLoadingStatus: state.lotteryDrawings.get('loadingStatus'),
		lotteryDrawingsLoadingStatusMessage: state.lotteryDrawings.get('loadingStatusMessage'),
		drawingsData: state.lotteryDrawings.get('drawings').toArray(),
	};
}

function mapDispatchToProp(dispatch) {
	return {
		setSelectedLotteryDrawingAction: (data) => dispatch(setSelectedLotteryDrawingAction(data)),
		initLotteryDrawingManagementPageAction: () => dispatch(initLotteryDrawingManagementPageAction()),
		setLotteryDrawingClassOptionsAction: (lotteryClasses) => dispatch(setLotteryDrawingClassOptionsAction(lotteryClasses)),
		setLotteryDrawingTabsAction: (lotteriesMap, lotteryClassId) => dispatch(setLotteryDrawingTabsAction(lotteriesMap, lotteryClassId)),
		fetchLotteryDrawingsAction: (lotteryId, issue) => dispatch(fetchLotteryDrawingsAction(lotteryId, issue)),
		setLotteryDrawingIntervalAction: (interval) => dispatch(setLotteryDrawingIntervalAction(interval)),
		startUpdateLotteryDrawingsIntervalAction: (interval, lotteryId) => dispatch(startUpdateLotteryDrawingsIntervalAction(interval, lotteryId)),
		stopUpdateLotteryDrawingsIntervalAction: () => dispatch(stopUpdateLotteryDrawingsIntervalAction()),
		stopLotteryDrawingAction: (lotteryId, issue) => dispatch(stopLotteryDrawingAction(lotteryId, issue)),
	};
}

export default connect(mapStateToProp, mapDispatchToProp)(
	withLoadingStatusNotification(
		[
			{
				loadingStatus: 'loadingStatus',
				loadingStatusMessage: 'loadingStatusMessage',
			},
			{
				loadingStatus: 'lotteryDrawingsLoadingStatus',
				loadingStatusMessage: 'lotteryDrawingsLoadingStatusMessage',
			}
		],
		LotteryGeneralDrawingMainPage)
);
