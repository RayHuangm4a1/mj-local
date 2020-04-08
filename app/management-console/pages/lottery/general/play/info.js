import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	SidebarTabs,
	HeaderButtonBar,
	LabelContent,
	Select,
	Button,
} from 'ljit-react-components';
import PageBlock from '../../../../components/page-block';
import LotteryPlayTable from './lottery-play-table';
import LotteryPlaySearchFrom from './lottery-play-search-form';
import { connect } from '../../../../../ljit-store-connecter';
import {
	lotteryPlayManagementPageActions,
} from '../../../../controller';
import { LoadingStatusEnum } from '../../../../../lib/enums';
import { PlayClassIdEnums } from '../../../../lib/enums';
import { RouteKeyEnums } from '../../../../routes';
import { PREFIX_CLASS } from './index';
import {
	withLoadingStatusNotification,
	notifications,
} from '../../../../../lib/notify-handler';
import {
	playsPropType,
	playConditionsPropType,
	filtersPropType,
	optionsPropType,
	getConditionOptions,
	getSubconditions,
	searchPlays,
} from './utils';

const { STANDARD, } = PlayClassIdEnums;
const {
	LOTTERY_GENERAL_PLAY,
} = RouteKeyEnums;
const {
	initLotteryPlayManagementPageAction,
	setLotteryPlayManagementPageLotteryClassIdAction,
	fetchLotteryPlayManagementPagePlaysAction,
} = lotteryPlayManagementPageActions;

const {
	errorNotifications,
} = notifications;
const {
	GeneralError,
} = errorNotifications;

const { NONE, SUCCESS, FAILED, LOADING, } = LoadingStatusEnum;

const propTypes = {
	selectedLotteryClassId: PropTypes.number,
	lotteryClassId: PropTypes.string,
	lotteryId: PropTypes.string,
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
	lotteryClassOptions: optionsPropType,
	playsData: playsPropType,
	playConditionsData: playConditionsPropType,
	filters: filtersPropType,
	loadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING]).isRequired,
	playLoadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING]).isRequired,
	notifyHandlingAction: PropTypes.func.isRequired,
	updateLotteryPlaysStatusLoadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING]).isRequired,
	initLotteryPlayManagementPageAction: PropTypes.func.isRequired,
	setLotteryPlayManagementPageLotteryClassIdAction: PropTypes.func.isRequired,
	fetchLotteryPlayManagementPagePlaysAction: PropTypes.func.isRequired,
	onNavigate: PropTypes.func.isRequired,
};
const defaultProps = {};

const defaultFilters = {
	playConditionId: null,
	subconditionId: null,
	status: null,
	keyword: null,
};

class LotteryGeneralPlayInfoPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedLotteryId: null,
			loadingSelectedLotteryId: null,
			selectedPlayConditionId: null,
			filters: props.filters || defaultFilters,
		};

		this._handleFetchPlays = this._handleFetchPlays.bind(this);
		this._handleChangeTab = this._handleChangeTab.bind(this);
		this._handleChangeLotteryClass = this._handleChangeLotteryClass.bind(this);
		this._handleSearch = this._handleSearch.bind(this);
		this._handleClickEditButton = this._handleClickEditButton.bind(this);
		this._renderTable = this._renderTable.bind(this);
	}

	_handleFetchPlays(loadingSelectedLotteryId) {
		const {
			fetchLotteryPlayManagementPagePlaysAction,
		} = this.props;

		this.setState({ loadingSelectedLotteryId, });
		fetchLotteryPlayManagementPagePlaysAction(loadingSelectedLotteryId, STANDARD);
	}

	_handleChangeTab(selectedTabKey) {
		const { _handleFetchPlays, } = this;
		const loadingSelectedLotteryId = parseInt(selectedTabKey);

		_handleFetchPlays(loadingSelectedLotteryId);
		this.setState({ filters: defaultFilters, });
	}

	_handleChangeLotteryClass(nextLotteryClassId) {
		const {
			lotteryClassOptions,
			lotteriesMapData,
			notifyHandlingAction,
			setLotteryPlayManagementPageLotteryClassIdAction,
		} = this.props;
		const lotteries = lotteriesMapData[nextLotteryClassId];
		const hasLottery = lotteries && lotteries.length > 0;

		if (!hasLottery) {
			const [lotteryClass = { label: '', }] = lotteryClassOptions.filter(
				lotteryClass => lotteryClass.value === nextLotteryClassId
			);

			notifyHandlingAction(new GeneralError(`${lotteryClass.label}没有彩种`));
			return;
		} else {
			setLotteryPlayManagementPageLotteryClassIdAction(nextLotteryClassId);
			this.setState({ filters: defaultFilters, });
		}
	}

	_handleSearch(filters) {
		this.setState({ filters, });
	}

	_handleClickEditButton() {
		const { onNavigate, selectedLotteryClassId, } = this.props;
		const { selectedLotteryId, filters, } = this.state;

		onNavigate(
			`${LOTTERY_GENERAL_PLAY}/${selectedLotteryClassId}/${selectedLotteryId}/edit`,
			{
				passProps: { filters, },
			}
		);
	}

	_renderTable() {
		const {
			playsData,
			playConditionsData,
			playLoadingStatus,
		} = this.props;
		const {
			selectedTableRows,
			selectedPlayConditionId,
			filters,
		} = this.state;
		const {
			_handleSearch,
			_handleClickEditButton,
		} = this;
		const tableData = searchPlays(playsData, filters);
		const playConditionOptions = getConditionOptions(playConditionsData);
		const subconditions = getSubconditions(playConditionsData, selectedPlayConditionId);
		const subconditionOptions = getConditionOptions(subconditions);

		return (
			<React.Fragment>
				<LotteryPlaySearchFrom
					filters={filters}
					playConditionOptions={playConditionOptions}
					subconditionOptions={subconditionOptions}
					onChangePlayConditionId={(selectedPlayConditionId) => this.setState({ selectedPlayConditionId, })}
					onSearch={_handleSearch}
				/>
				<div className={`${PREFIX_CLASS}__edit-button`}>
					<Button
						color={Button.ColorEnums.BRIGHTBLUE500}
						onClick={_handleClickEditButton}
					>
						编辑
					</Button>
				</div>
				<LotteryPlayTable
					isLoading={playLoadingStatus === LOADING}
					data={tableData}
					isEditing={false}
					onClickEdit={_handleClickEditButton}
					selectedTableRows={selectedTableRows}
				/>
			</React.Fragment>
		);
	}

	render() {
		const {
			lotteryTabsData,
			selectedLotteryClassId,
			lotteryClassOptions,
		} = this.props;
		const { _handleChangeLotteryClass } = this;
		const {
			_renderTable,
			_handleChangeTab,
		} = this;
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
					tabData={lotteryTabsData}
					activeKey={selectedLotteryId + ''}
					className={`${PREFIX_CLASS}__info-tab`}
					onChange={_handleChangeTab}
				>
					{
						lotteryTabsData.map((item, index) => (
							<div key={index}>
								{_renderTable()}
							</div>
						))
					}
				</SidebarTabs>
			</PageBlock>
		);
	}

	componentDidMount() {
		const {
			lotteryClassId,
			initLotteryPlayManagementPageAction,
			setLotteryPlayManagementPageLotteryClassIdAction,
		} = this.props;

		if (lotteryClassId) {
			setLotteryPlayManagementPageLotteryClassIdAction(parseInt(lotteryClassId));
		}
		initLotteryPlayManagementPageAction();
	}

	componentDidUpdate(prevProps, prevState) {
		const {
			fetchLotteryPlayManagementPagePlaysAction,
			lotteryTabsData,
			selectedLotteryClassId,
			lotteryId,
			loadingStatus,
			updateLotteryPlaysStatusLoadingStatus,
			playLoadingStatus,
		} = this.props;
		const { selectedLotteryId, loadingSelectedLotteryId, } = this.state;
		const { _handleFetchPlays, } = this;
		const isLotteryClassesAndLotteriesLoaded = loadingStatus === SUCCESS && prevProps.loadingStatus === LOADING;
		const isSelectedLotteryClassIdChanged = prevProps.selectedLotteryClassId !== selectedLotteryClassId;
		const isLotteryPlaysStatusUpdated = (
			updateLotteryPlaysStatusLoadingStatus === SUCCESS &&
			prevProps.updateLotteryPlaysStatusLoadingStatus === LOADING
		);
		const isLotteryPlayManagementPagePlaysFetched = playLoadingStatus == SUCCESS && prevProps.playLoadingStatus === LOADING;

		if ((isLotteryClassesAndLotteriesLoaded || isSelectedLotteryClassIdChanged) && lotteryTabsData[0]) {
			const loadingSelectedLotteryId = lotteryId && !selectedLotteryId ? parseInt(lotteryId) : lotteryTabsData[0].id;

			_handleFetchPlays(loadingSelectedLotteryId);
		}
		if (isLotteryPlaysStatusUpdated) {
			fetchLotteryPlayManagementPagePlaysAction(loadingSelectedLotteryId, STANDARD);
		}
		if (isLotteryPlayManagementPagePlaysFetched) {
			this.setState({ selectedLotteryId: loadingSelectedLotteryId, });
		}
	}

	componentWillUnmount() {
		const { setLotteryPlayManagementPageLotteryClassIdAction, } = this.props;

		setLotteryPlayManagementPageLotteryClassIdAction(null);
	}
}

LotteryGeneralPlayInfoPage.propTypes = propTypes;
LotteryGeneralPlayInfoPage.defaultProps = defaultProps;

function mapStateToProp(state) {
	const lotteriesMapData = state.lotteryClassesAndLotteries.get('lotteriesMap').toObject();
	const selectedLotteryClassId = state.lotteryPlayManagementPage.get('selectedLotteryClassId');

	return {
		lotteryClassOptions: state.lotteryPlayManagementPage.get('lotteryClassOptions').toArray(),
		lotteriesMapData,
		lotteryTabsData: mapLotteriesToTabs(lotteriesMapData[selectedLotteryClassId + '']),
		selectedLotteryClassId,
		loadingStatus: state.lotteryPlayManagementPage.get('loadingStatus'),
		loadingStatusMessage: state.lotteryPlayManagementPage.get('loadingStatusMessage'),
		playLoadingStatus: state.lotteryPlayManagementPage.get('playsLoadingStatus'),
		playsLoadingStatusMessage: state.lotteryPlayManagementPage.get('playsLoadingStatusMessage'),
		updateLotteryPlaysStatusLoadingStatus: state.lotteryPlays.get('updateLotteryPlaysStatusLoadingStatus'),
		updateLotteryPlaysStatusLoadingStatusMessage: state.lotteryPlays.get('updateLotteryPlaysStatusLoadingStatusMessage'),
		playsData: state.lotteryPlays.get('plays').toArray(),
		playConditionsData: state.lotteryPlayConditions.get('data').toArray(),
	};
}

function mapDispatchToProp(dispatch) {
	return {
		initLotteryPlayManagementPageAction: () => dispatch(initLotteryPlayManagementPageAction()),
		setLotteryPlayManagementPageLotteryClassIdAction: (selectedLotteryClassId) => dispatch(setLotteryPlayManagementPageLotteryClassIdAction(selectedLotteryClassId)),
		fetchLotteryPlayManagementPagePlaysAction: (lotteryId, playClassId) => dispatch(fetchLotteryPlayManagementPagePlaysAction(lotteryId, playClassId)),
	};
}

export default connect(mapStateToProp, mapDispatchToProp)(withLoadingStatusNotification(
	[
		{
			loadingStatus: 'loadingStatus',
			loadingStatusMessage: 'loadingStatusMessage',
		},
		{
			loadingStatus: 'playLoadingStatus',
			loadingStatusMessage: 'playsLoadingStatusMessage',
		},
		{
			loadingStatus: 'updateLotteryPlaysStatusLoadingStatus',
			loadingStatusMessage: 'updateLotteryPlaysStatusLoadingStatusMessage',
		},
	],
	LotteryGeneralPlayInfoPage
));

function mapLotteriesToTabs(lotteries = []) {
	return lotteries.map(lottery => ({
		id: lottery.id,
		key: '' + lottery.id,
		tab: lottery.name,
	}));
}
