import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { PREFIX_CLASS } from './';
import {
	HeaderButtonBar,
	LabelContent,
	SidebarTabs,
	Select,
	Button,
} from 'ljit-react-components';
import { connect } from '../../../../../ljit-store-connecter';
import {
	notifyHandlingActions,
	lotteryPlayBonusStandardManagementPageActions,
	lotteryPlaysActions
} from '../../../../controller';
import { LoadingStatusEnum } from '../../../../../lib/enums';
import { PlayClassIdEnums } from '../../../../lib/enums';
import { RouteKeyEnums } from '../../../../routes';
import PageBlock from '../../../../components/page-block';
import { getFilteredPlaysData, } from './utils';
import LotteryTable from './lottery-table';
import { 
	withLoadingStatusNotification,
	notifications,
} from '../../../../../lib/notify-handler';
import SearchForm from './search-form';
import './style.styl';

const {
	updateLotteryPlaysBonusAction
} = lotteryPlaysActions;
const { NONE, SUCCESS, FAILED, LOADING, } = LoadingStatusEnum;
const { STANDARD, } = PlayClassIdEnums;
const {
	LOTTERY_ODDS_STANDARD,
} = RouteKeyEnums;
const {
	initLotteryPlayBonusStandardManagementPageAction,
	setLotteryPlayBonusStandardManagementPageLotteryClassIdAction: setLotteryClassIdAction,
	fetchLotteryPlayBonusStandardManagementPagePlaysAction: fetchPlaysAction,
	// TODO: 之後改用 url 帶 query 的方法完成後，要刪掉 resetLotteryClassIdAction
	resetLotteryClassIdAction,
} = lotteryPlayBonusStandardManagementPageActions;

const {
	notifyHandlingAction,
} = notifyHandlingActions;
const {
	errorNotifications,
	successNotifications,
} = notifications;
const {
	GeneralError,
} = errorNotifications;
const {
	Success,
} = successNotifications;

const propTypes = {
	onNavigate: PropTypes.func,
	selectedLotteryClassId: PropTypes.number,
	lotteriesMapData: PropTypes.objectOf(
		PropTypes.arrayOf(PropTypes.shape({
			code: PropTypes.string,
			createdAt: PropTypes.string,
			id: PropTypes.number,
			lotteryClass: PropTypes.shape({
				status: PropTypes.string,
				id: PropTypes.number,
				name: PropTypes.string,
				code: PropTypes.string,
			}),
			name: PropTypes.string,
			numOfIssues: PropTypes.number,
			ordering: PropTypes.number,
			platform: PropTypes.shape({
				_id: PropTypes.string,
			}),
			playClasses: PropTypes.arrayOf(
				PropTypes.shape({
					id: PropTypes.number,
					name: PropTypes.string,
					code: PropTypes.string,
				}),
			),
			status: PropTypes.string,
			tags: PropTypes.arrayOf(
				PropTypes.shape({
					_id: PropTypes.string,
					name: PropTypes.string,
					code: PropTypes.string,
				}),
			),
			updatedAt: PropTypes.string,
			_id: PropTypes.string,
		}))
	),
	lotteryTabsData: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		key: PropTypes.string,
		tab: PropTypes.string,
	})),
	lotteryClassOptions: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string,
		value: PropTypes.number,
	})),
	playsData: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		status: PropTypes.string,
		platform: PropTypes.object,
		updatedAt: PropTypes.string,
		bonus: PropTypes.number,
		lottery: PropTypes.shape({
			id: PropTypes.number,
		}),
		award: PropTypes.shape({
			deltaBonus: PropTypes.numer,
			numerator: PropTypes.number,
			denominator: PropTypes.number,
			name: PropTypes.string,
		}),
	})).isRequired,
	playConditionOptions: PropTypes.array.isRequired,
	awardOptions: PropTypes.array.isRequired,
	platformData: PropTypes.shape({
		bonus: PropTypes.object.isRequired,
	}).isRequired,
	loadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING]).isRequired,
	playLoadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING]).isRequired,
	updateLotteryPlaysBonusLoadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING]).isRequired,
	updateLotteryPlaysBonusLoadingStatusMessage: PropTypes.string.isRequired,
	notifyHandlingAction: PropTypes.func.isRequired,
	initLotteryPlayBonusStandardManagementPageAction: PropTypes.func.isRequired,
	setLotteryClassIdAction: PropTypes.func.isRequired,
	fetchPlaysAction: PropTypes.func.isRequired,
	updateLotteryPlaysBonusAction: PropTypes.func.isRequired,
	filterQuery: PropTypes.object,
	passedLotteryClassId: PropTypes.number,
	passedLotteryId: PropTypes.number,
	resetLotteryClassIdAction: PropTypes.func.isRequired,
};
const INIT_FILTER_QUERY = {
	playConditionId: null,
	award: null,
	keyword: '',
};

class LotteryOddsStandardInfoPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedLotteryId: null,
			loadingSelectedLotteryId: null,
			filterQuery: props.filterQuery || INIT_FILTER_QUERY,
		};

		this._handleChangeLotteryClass = this._handleChangeLotteryClass.bind(this);
		this._handleChangeTab = this._handleChangeTab.bind(this);
		this._handleSearch = this._handleSearch.bind(this);
		this._handleNavigate = this._handleNavigate.bind(this);
		this._renderTabs = this._renderTabs.bind(this);
		this._renderTable = this._renderTable.bind(this);
		this._handleEditPkCount = this._handleEditPkCount.bind(this);
		this._handleFetchPlays = this._handleFetchPlays.bind(this);
		this._resetFilterQuery = this._resetFilterQuery.bind(this);
	}

	_handleChangeLotteryClass(nextLotteryClassId) {
		const {
			lotteryClassOptions,
			lotteriesMapData,
			notifyHandlingAction,
			setLotteryClassIdAction,
			passedLotteryClassId,
			selectedLotteryClassId,
		} = this.props;
		const lotteries = lotteriesMapData[nextLotteryClassId];
		const hasLottery = lotteries && lotteries.length > 0;

		if (nextLotteryClassId !== passedLotteryClassId || selectedLotteryClassId) {
			this._resetFilterQuery();
		}

		if (!hasLottery) {
			const [lotteryClass = { label: '', }] = lotteryClassOptions.filter(
				lotteryClass => lotteryClass.value === nextLotteryClassId
			);

			notifyHandlingAction(new GeneralError(`${lotteryClass.label}没有彩种`));
		} else {
			setLotteryClassIdAction(nextLotteryClassId, lotteries);
		}
	}
	_renderTabs() {
		const {
			_renderTable
		} = this;
		const {
			lotteryTabsData,
			platformData,
		} = this.props;
		const platFormMaxBonus = platformData.bonus.max;

		return lotteryTabsData.map((item, index) => (
			<div key={index}>
				{_renderTable(platFormMaxBonus)}
			</div>
		));
	}
	_handleChangeTab(loadingSelectedLotteryId) {
		const {
			_handleFetchPlays,
			_resetFilterQuery,
		} = this;

		_handleFetchPlays(loadingSelectedLotteryId);
		_resetFilterQuery();
	}
	_handleSearch(filters) {
		this.setState({ 
			filterQuery: filters, 
		});
	}
	_renderTable(platformBonus) {
		const { filterQuery, } = this.state;
		const {
			selectedLotteryId
		} = this.state;
		const {
			playLoadingStatus,
			playsData,
			playConditionOptions,
			awardOptions,
		} = this.props;
		const {
			_renderSearchForm,
			_handleEditPkCount,
			_handleNavigate,
			_handleSearch
		} = this;
		const plays = getFilteredPlaysData(filterQuery, playsData);

		return (
			<React.Fragment>
				<SearchForm
					filters={filterQuery}
					playConditionOptions={playConditionOptions}
					awardOptions={awardOptions}
					onSearch={_handleSearch}
				/>
				<div className={`${PREFIX_CLASS}__edit-button`}>
					<Button
						color={Button.ColorEnums.BRIGHTBLUE500}
						onClick={_handleNavigate}
					>
						奖金号修改
					</Button>
				</div>
				<LotteryTable
					isLoading={playLoadingStatus === LOADING}
					data={plays}
					platformBonus={platformBonus}
					onEditPKCount={_handleEditPkCount}
				/>
			</React.Fragment>
		);
	}

	_handleNavigate() {
		const { onNavigate, selectedLotteryClassId } = this.props;
		const {
			selectedLotteryId,
			filterQuery
		} = this.state;

		onNavigate(`${LOTTERY_ODDS_STANDARD}/${selectedLotteryClassId}/${selectedLotteryId}/edit`, {
			passProps: {
				filterQuery,
			}
		});
	}

	_handleFetchPlays(loadingSelectedLotteryId) {
		const {
			fetchPlaysAction,
		} = this.props;

		fetchPlaysAction(loadingSelectedLotteryId, STANDARD);
	}

	_resetFilterQuery() {
		this.setState({
			filterQuery: INIT_FILTER_QUERY,
		});
	}

	_handleEditPkCount(updatedPlays) {
		const {
			updateLotteryPlaysBonusAction,
		} = this.props;
		const { selectedLotteryId } = this.state;

		updateLotteryPlaysBonusAction(selectedLotteryId, updatedPlays);
	}

	render() {
		const {
			_handleChangeLotteryClass,
			_handleChangeTab,
			_renderTabs
		} = this;
		const {
			lotteryClassOptions,
			selectedLotteryClassId,
			lotteryTabsData,
		} = this.props;
		const { selectedLotteryId, } = this.state;

		return (
			<PageBlock className={`${PREFIX_CLASS}__info`}>
				<HeaderButtonBar
					left={(
						<LabelContent
							label="彩类"
							noMargin
							className={`${PREFIX_CLASS}__info-select`}
						>
							<Select
								value={selectedLotteryClassId}
								options={lotteryClassOptions}
								onChange={_handleChangeLotteryClass}
							/>
						</LabelContent>
					)}
				/>
				<SidebarTabs
					className={`${PREFIX_CLASS}__info-tab`}
					tabData={lotteryTabsData}
					activeKey={selectedLotteryId + ''}
					onChange={_handleChangeTab}
				>
					{_renderTabs()}
				</SidebarTabs>
			</PageBlock>
		);
	}

	componentDidMount() {
		const {
			passedLotteryClassId,
			setLotteryClassIdAction,
			initLotteryPlayBonusStandardManagementPageAction,
		} = this.props;

		if (passedLotteryClassId) {
			setLotteryClassIdAction(passedLotteryClassId, []);
		}

		initLotteryPlayBonusStandardManagementPageAction();
	}

	componentDidUpdate(prevProps) {
		const { selectedLotteryId, } = this.state;
		const {
			lotteryTabsData,
			selectedLotteryClassId,
			loadingStatus,
			playLoadingStatus,
			playsData,
			updateLotteryPlaysBonusLoadingStatus,
			notifyHandlingAction,
			passedLotteryId,
		} = this.props;
		const {
			_handleFetchPlays,
		} = this;
		const isLotteryClassesAndLotteriesLoaded = loadingStatus === SUCCESS && prevProps.loadingStatus === LOADING;
		const isSelectedLotteryClassIdChanged = prevProps.selectedLotteryClassId !== selectedLotteryClassId;

		if ((isLotteryClassesAndLotteriesLoaded || isSelectedLotteryClassIdChanged) && lotteryTabsData[0]) {
			const lotteryId = passedLotteryId && !selectedLotteryId ? passedLotteryId : lotteryTabsData[0].id;

			_handleFetchPlays(lotteryId);
		}

		if (playLoadingStatus === SUCCESS && prevProps.playLoadingStatus === LOADING && playsData[0]) {
			const lotteryId = passedLotteryId && !selectedLotteryId ? passedLotteryId : playsData[0].lottery.id;

			this.setState({
				selectedLotteryId: lotteryId,
			});
		}

		if (prevProps.updateLotteryPlaysBonusLoadingStatus === LOADING
		&& updateLotteryPlaysBonusLoadingStatus === SUCCESS) {
			const selectedLotteryId = '' + lotteryTabsData[0].id;

			fetchPlaysAction(selectedLotteryId, STANDARD);
			notifyHandlingAction(new Success('单挑注数修改成功'));
		}
	}

	// TODO: 之後改用 url 帶 query 的方法完成後，要刪掉 resetLotteryClassIdAction
	componentWillUnmount() {
		const { resetLotteryClassIdAction, } = this.props;

		resetLotteryClassIdAction();
	}
}

LotteryOddsStandardInfoPage.propTypes = propTypes;

function mapStateToProp(state) {
	return {
		platformData: state.platform.get('data').toObject(),
		playConditionOptions: state.lotteryPlayConditions.get('playConditionOptions').toArray(),
		lotteryClassOptions: state.lotteryPlayBonusStandardManagementPage.get('lotteryClassOptions').toArray(),
		lotteriesMapData: state.lotteryClassesAndLotteries.get('lotteriesMap').toObject(),
		lotteryTabsData: state.lotteryPlayBonusStandardManagementPage.get('lotteryTabsData').toArray(),
		selectedLotteryClassId: state.lotteryPlayBonusStandardManagementPage.get('selectedLotteryClassId'),
		loadingStatus: state.lotteryPlayBonusStandardManagementPage.get('loadingStatus'),
		playLoadingStatus: state.lotteryPlayBonusStandardManagementPage.get('playsLoadingStatus'),
		playsData: state.lotteryPlayBonusStandardManagementPage.get('plays').toArray(),
		awardOptions: state.lotteryPlayBonusStandardManagementPage.get('awardOptions').toArray(),
		loadingStatusMessage: state.lotteryPlayBonusStandardManagementPage.get('loadingStatusMessage'),
		updateLotteryPlaysBonusLoadingStatus: state.lotteryPlays.get('updateLotteryPlaysBonusLoadingStatus'),
		updateLotteryPlaysBonusLoadingStatusMessage: state.lotteryPlays.get('updateLotteryPlaysBonusLoadingStatusMessage'),
	};
}

function mapDispatchToProp(dispatch) {
	return {
		notifyHandlingAction: (notification) => dispatch(notifyHandlingAction(notification)),
		initLotteryPlayBonusStandardManagementPageAction: () => dispatch(initLotteryPlayBonusStandardManagementPageAction()),
		setLotteryClassIdAction: (selectedLotteryClassId, lotteries) => dispatch(setLotteryClassIdAction(selectedLotteryClassId, lotteries)),
		fetchPlaysAction: (lotteryId, playClassId) => dispatch(fetchPlaysAction(lotteryId, playClassId)),
		updateLotteryPlaysBonusAction: (...args) => dispatch(updateLotteryPlaysBonusAction(...args)),
		// TODO: 之後改用 url 帶 query 的方法完成後，要刪掉 resetLotteryClassIdAction
		resetLotteryClassIdAction: () => dispatch(resetLotteryClassIdAction()),
	};
}

export default connect(mapStateToProp, mapDispatchToProp)(withLoadingStatusNotification(
	[
		{
			loadingStatus: 'loadingStatus',
			loadingStatusMessage: 'loadingStatusMessage',
		},
		{
			loadingStatus: 'updateLotteryPlaysBonusLoadingStatus',
			loadingStatusMessage: 'updateLotteryPlaysBonusLoadingStatusMessage',
		},
	],
	LotteryOddsStandardInfoPage
));
