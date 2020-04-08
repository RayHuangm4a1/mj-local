import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Input,
	Button,
	Row,
	Col,
} from 'ljit-react-components';
import { connect, } from 'ljit-store-connecter';
import { withLoadingStatusNotification, } from '../../../../../lib/notify-handler';
import { DATE_TIME, convertDateStringToTimestamp, } from '../../../../../lib/moment-utils';
import BettingRecordDetailModal from '../../../../components/betting-record-detail-modal';
import ClientCascaderSelect from '../../../../components/client-cascader-select';
import ClientDateRangePicker from '../../../../features/client-date-range-picker';
import PagerTable from '../../../../components/pager-table';
import SelectDropdown from '../../../../components/select-dropdown';
import SelectDropdownInputFormItem from '../../../../components/select-dropdown-input-form-item';
import ClientMessageModal from '../../../../components/client-message-modal';
import { teamBettingRecordActions, teamTraceRecordsActions, } from '../../../../controller';
import { LoadingStatusEnum } from '../../../../lib/enums';
import { MAX_SELECTION_DAYS } from '../../../../../lib/constants';
import TeamTraceRecordDetailModal from './team-trace-record-detail-modal';
import {
	BettingTypeEnum,
	TableColumnItemsListMap,
	TableColumnItemsConfig,
	TableColumnItemsEnum,
	teamTraceRecordDetailBettingsPropTypes,
	teamTraceRecordDetailPropTypes,
} from './utils';
import './style.styl';

const {
	TEAM_BETTING,
	TEAM_TRACE,
	TEAM_VR,
} = BettingTypeEnum;

const { fetchTeamBettingRecordsAction, } = teamBettingRecordActions;
const {
	fetchTeamTraceRecordsAction,
	fetchTeamTraceRecordDetailAction,
	fetchTeamTraceRecordDetailBettingsAction,
} = teamTraceRecordsActions;
const { NONE, LOADING, SUCCESS, FAILED } = LoadingStatusEnum;
const { RangesEnums, getTodayDateRange, } = ClientDateRangePicker;
const { TODAY, YESTERDAY, } = RangesEnums;

const BettingTypeOptionsConfig = [
	{ label: '团队投注', value: TEAM_BETTING, },
	{ label: '团队追号', value: TEAM_TRACE, },
	{ label: '团队VR', value: TEAM_VR, },
];

const DistanceTypeEnums = {
	ALL: -1,
	DIRECT: 1,
};

const ChildrenOptionConfigs = [
	{ label: '直属下级', value: DistanceTypeEnums.DIRECT, },
	{ label: '所有下级', value: DistanceTypeEnums.ALL, },
];

const OrderEnums = {
	ascend: 'asc',
	descend: 'desc',
};

const SelectDropdownOptionMap = {
	[TEAM_BETTING]: [
		{ label: '方案号', value: 'id', },
		{ label: '期号', value: 'issue', },
	],
	[TEAM_VR]: [
		{ label: '方案号', value: 'id', },
		{ label: '期号', value: 'issue', },
	],
	[TEAM_TRACE]: [
		{ label: '方案号', value: 'id', },
	]
};

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE = 1;
const PREFIX_CLASS = 'agent-team-betting-page';
const USERNAME_ERROR_MESSAGE = '查询所有下级时，必须输入会员名！';

const propTypes = {
	teamBettingRecordsData: PropTypes.shape({
		teamBettingRecords: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.number,
			userId: PropTypes.number,
			username: PropTypes.string,
			walletCode: PropTypes.number,
			type: PropTypes.number,
			traceId: PropTypes.number,
			lotteryClassId: PropTypes.number,
			lotteryId: PropTypes.number,
			lotteryName: PropTypes.string,
			playId: PropTypes.number,
			unit: PropTypes.number,
			awards: PropTypes.objectOf(PropTypes.shape({
				deltaBonus: PropTypes.number,
				numerator: PropTypes.number,
				denominator: PropTypes.number,
				pk: PropTypes.shape({
					count: PropTypes.number,
					isEnabled: PropTypes.bool,
				}),
			})),
			name: PropTypes.string,
			bonus: PropTypes.number,
			rebate: PropTypes.number,
			issue: PropTypes.number,
			opencode: PropTypes.string,
			reward: PropTypes.number,
			amountPerBet: PropTypes.number,
			multiple: PropTypes.number,
			count: PropTypes.number,
			amount: PropTypes.number,
			betcontent: PropTypes.string,
			weizhi: PropTypes.string,
			isPK: PropTypes.bool,
			status: PropTypes.number,
			details: PropTypes.arrayOf(PropTypes.shape({
				name: PropTypes.string,
				count: PropTypes.number,
				reward: PropTypes.number,
			})),
			device: PropTypes.string,
			error: PropTypes.object,
			oid: PropTypes.number,
			pid: PropTypes.number,
			openedAt: PropTypes.string,
			createdAt: PropTypes.string,
			updatedAt: PropTypes.string,
		})),
		page: PropTypes.number,
		numOfItems: PropTypes.number,
		numOfPages: PropTypes.number,
	}),
	teamTraceRecordsData: PropTypes.shape({
		traceRecords: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.number,
			username: PropTypes.string,
			lotteryName: PropTypes.string,
			name: PropTypes.string,
			isTerminatedIfWin: PropTypes.oneOfType([
				PropTypes.boolean,
				PropTypes.number,
			]),
			numOfIssues: PropTypes.number,
			numOfFinishedIssues: PropTypes.number,
			count: PropTypes.number,
			amount: PropTypes.number,
			status: PropTypes.number,
			createdAt: PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.instanceOf(Date),
			]),
		})),
		numOfItems: PropTypes.number,
		numOfPages: PropTypes.number,
	}),
	teamTraceRecordDetailData: teamTraceRecordDetailPropTypes,
	teamTraceRecordDetailBettingsData: teamTraceRecordDetailBettingsPropTypes,
	childrenUsersData: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		username: PropTypes.string,
		deltaBonus: PropTypes.number,
		wallets: PropTypes.arrayOf(
			PropTypes.shape({
				code: PropTypes.number,
				balance: PropTypes.number,
			}),
		),
		teamStats: PropTypes.shape({
			numOfUsers: PropTypes.number,
			balance: PropTypes.number,
		}),
		loginAt: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.instanceOf(Date),
		]),
		bonus: PropTypes.number,
	})),
	fetchTeamBettingRecordsAction: PropTypes.func.isRequired,
	fetchTeamTraceRecordsAction: PropTypes.func.isRequired,
	fetchTeamTraceRecordDetailAction: PropTypes.func.isRequired,
	fetchTeamTraceRecordDetailBettingsAction: PropTypes.func.isRequired,
	lotteriesData: PropTypes.object,
	lotteryClassesData: PropTypes.array.isRequired,
	teamBettingRecordsLoadingStatus: PropTypes.oneOf([NONE, LOADING, SUCCESS, FAILED]).isRequired,
	teamBettingRecordsLoadingStatusMessage: PropTypes.string.isRequired,
	teamTraceRecordsLoadingStatus: PropTypes.oneOf([NONE, LOADING, SUCCESS, FAILED]).isRequired,
	teamTraceRecordsLoadingStatusMessage: PropTypes.string.isRequired,
	notifyErrorMessage: PropTypes.func.isRequired,
};

const defaultProps = {
	teamBettingRecordsData: {},
	lotteriesMapData: {},
	notifyErrorMessage: () => {},
};

class AgentTeamBettingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pagination: {},
			bettingType: TEAM_BETTING,
			selectedTeamBettingRecord: {},
			selectedTeamTraceRecord: {},
			selectDropdownOption: SelectDropdownOptionMap[TEAM_BETTING],
			isBettingRecordDetailModalVisible: false,
			isTraceRecordDetailModalVisible: false,
			isUsernameMessageVisible: false,
			fromTo: getTodayDateRange(),
			queryParameters: {
				id: null,
				status: null,
				distance: null,
				limit: DEFAULT_PAGE_SIZE,
				username: null,
				sort: null,
				order: 'desc',
				lotteryId: null,
				issue: null,
				from: null,
				to: null,
				page: DEFAULT_PAGE,
			},
		};
		this._handleSearch = this._handleSearch.bind(this);
		this._handleChangeTablePage = this._handleChangeTablePage.bind(this);
		this._handleClickTeamBettingRecord = this._handleClickTeamBettingRecord.bind(this);
		this._handleClickTeamTraceRecord = this._handleClickTeamTraceRecord.bind(this);
		this._handleCloseTeamTraceRecordDetailModal = this._handleCloseTeamTraceRecordDetailModal.bind(this);
		this._handleChangeDistance = this._handleChangeDistance.bind(this);
		this._handleShowUsernameMessage = this._handleShowUsernameMessage.bind(this);
		this._handleCloseUsernameMessage = this._handleCloseUsernameMessage.bind(this);
		this._handleTeamTraceBettingTableChange = this._handleTeamTraceBettingTableChange.bind(this);
		this._handleChangeBettingType = this._handleChangeBettingType.bind(this);
		this._renderTeamBettingAndTeamVRTableIdItem = this._renderTeamBettingAndTeamVRTableIdItem.bind(this);
		this._renderTeamTraceTableIdItem = this._renderTeamTraceTableIdItem.bind(this);
		this._getTableColumn = this._getTableColumn.bind(this);
	}
	_handleSearch() {
		const {
			fetchTeamBettingRecordsAction,
			fetchTeamTraceRecordsAction,
		} = this.props;
		const { _handleShowUsernameMessage, } = this;
		const form = this.formInstance.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				// TODO dispatch LOTTERY_FOLLOW, VR_BETTING action.
				// 1. base on bettingType, dispatch different action.
				// 2. if lottery === '全部' (value === ''), send query without lottery item.
				const {
					bettingType,
					id,
					username,
					lottery,
					issue,
					distance,
					fromTo = [],
				} = values;

				const [ from, to ] = fromTo;
				const queryParameters = Object.assign({}, this.state.queryParameters , {
					id,
					distance,
					limit: 10,
					username,
					lotteryId: lottery[0] !== '' ? lottery.slice(-1)[0] : null,
					issue: bettingType === TEAM_TRACE ? undefined : issue,
					from: from ? convertDateStringToTimestamp(from) : undefined,
					to: to ? convertDateStringToTimestamp(to) : undefined,
					page: DEFAULT_PAGE,
				});

				if (bettingType === TEAM_BETTING) {
					fetchTeamBettingRecordsAction(queryParameters);
				} else if (bettingType === TEAM_TRACE) {
					fetchTeamTraceRecordsAction(queryParameters);
				}
				this.setState({
					bettingType,
					queryParameters,
					pagination: Object.assign({}, this.state.pagination, { current: DEFAULT_PAGE }),
				});
			} else {
				if (error.username) {
					_handleShowUsernameMessage();
				}
			}
		});
	}
	_handleChangeTablePage(pagination, filters, sorter) {
		const {
			fetchTeamBettingRecordsAction,
			fetchTeamTraceRecordsAction,
		} = this.props;
		const { current, } = pagination;
		const { status, } = filters;
		const { field, order, } = sorter;
		const {
			queryParameters: prevQueryParameters,
			status: prevStatus,
			page: prevPage,
			bettingType,
		} = this.state;

		const queryParameters = Object.assign({}, prevQueryParameters, {
			sort: field,
			order: OrderEnums[order],
			status: status && status.length ? status.slice(-1)[0] : prevStatus,
			page: current || prevPage,
		});

		if (bettingType === TEAM_BETTING) {
			fetchTeamBettingRecordsAction(queryParameters);
		} else if (bettingType === TEAM_TRACE) {
			fetchTeamTraceRecordsAction(queryParameters);
		}
		this.setState({ pagination, queryParameters, });
	}
	_handleClickTeamBettingRecord(selectedTeamBettingRecord) {
		this.setState({
			selectedTeamBettingRecord,
			isBettingRecordDetailModalVisible: true,
		});
	}
	_handleClickTeamTraceRecord(selectedTeamTraceRecord = {}) {
		const { childrenUsersData, fetchTeamTraceRecordDetailAction, fetchTeamTraceRecordDetailBettingsAction } = this.props;
		const memberId = getMemberId(childrenUsersData, selectedTeamTraceRecord.username);

		this.setState({
			selectedTeamTraceRecord,
			isTraceRecordDetailModalVisible: true,
		});
		fetchTeamTraceRecordDetailAction(memberId, selectedTeamTraceRecord.id);
		fetchTeamTraceRecordDetailBettingsAction(memberId, selectedTeamTraceRecord.id);
	}
	_handleTeamTraceBettingTableChange(pagination = {}) {
		const { childrenUsersData, fetchTeamTraceRecordDetailBettingsAction, } = this.props;
		const { selectedTeamTraceRecord: { username, id: traceId, } = {}, } = this.state;
		const memberId = getMemberId(childrenUsersData, username);
		const { current = DEFAULT_PAGE, } = pagination;
		const queryParameters = {
			page: current,
			limit: DEFAULT_PAGE_SIZE,
		};

		fetchTeamTraceRecordDetailBettingsAction(memberId, traceId, queryParameters);
	}
	_handleCloseTeamTraceRecordDetailModal() {
		this.setState({ isTraceRecordDetailModalVisible: false, });
	}
	_handleShowUsernameMessage() {
		this.setState({ isUsernameMessageVisible: true, });
	}
	_handleCloseUsernameMessage() {
		this.setState({ isUsernameMessageVisible: false, });
	}
	_handleChangeDistance(distance) {
		const { queryParameters, } = this.state;

		this.setState({
			queryParameters: {
				...queryParameters,
				distance,
			}
		});
	}
	_handleChangeBettingType(bettingType) {
		this.setState({ selectDropdownOption: SelectDropdownOptionMap[bettingType], });
	}
	_renderTeamBettingAndTeamVRTableIdItem(value, record) {
		return (
			<div
				className={`${PREFIX_CLASS}__table-item`}
				onClick={() => this._handleClickTeamBettingRecord(record)}
			>
				<div className={`${PREFIX_CLASS}__table-item--issue`}>
					{record.id}
				</div>
				<div className={`${PREFIX_CLASS}__table-item--id`}>
					({record.issue})
				</div>
			</div>
		);
	}
	_renderTeamTraceTableIdItem(value, record) {
		return (
			<div
				className={`${PREFIX_CLASS}__table-item`}
				onClick={() => this._handleClickTeamTraceRecord(record)}
			>
				<div className={`${PREFIX_CLASS}__table-item--issue`}>
					{record.id}
				</div>
			</div>
		);
	}
	_getTableColumn(bettingType) {
		const {
			_renderTeamTraceTableIdItem,
			_renderTeamBettingAndTeamVRTableIdItem,
		} = this;
		const matchedItemsList = TableColumnItemsListMap[bettingType];
		const OverrideIdRenderMap = {
			[TEAM_BETTING]: _renderTeamBettingAndTeamVRTableIdItem,
			[TEAM_TRACE]: _renderTeamTraceTableIdItem,
			[TEAM_VR]: _renderTeamBettingAndTeamVRTableIdItem,
		};

		return matchedItemsList.map(item => {
			if (item === TableColumnItemsEnum.ID) {
				return {
					...TableColumnItemsConfig[item],
					render: OverrideIdRenderMap[bettingType],
				};
			}
			return TableColumnItemsConfig[item];
		});
	}

	render() {
		const {
			props,
			state,
			_handleSearch,
			_handleChangeTablePage,
			_handleChangeDistance,
			_handleCloseUsernameMessage,
			_handleChangeBettingType,
			_handleTeamTraceBettingTableChange,
			_handleCloseTeamTraceRecordDetailModal,
			_getTableColumn,
		} = this;
		const {
			teamBettingRecordsData,
			teamTraceRecordsData,
			teamTraceRecordDetailData,
			teamTraceRecordDetailBettingsData,
			lotteriesData,
			lotteryClassesData,
			teamBettingRecordsLoadingStatus,
			teamTraceRecordsLoadingStatus,
		} = props;
		const {
			pagination,
			bettingType,
			selectedTeamBettingRecord,
			isBettingRecordDetailModalVisible,
			isTraceRecordDetailModalVisible,
			isUsernameMessageVisible,
			fromTo,
			queryParameters: { distance, },
			selectDropdownOption,
		} = state;
		const {
			teamBettingRecords = [],
			numOfItems: numOfTeamBettingRecords,
		} = teamBettingRecordsData;
		const {
			traceRecords = [],
			numOfItems: numOfTeamTraceRecords,
		} = teamTraceRecordsData;
		const lotteryOptions = getLotteryOptions(lotteryClassesData, lotteriesData);
		const DataSourceMap = {
			[TEAM_BETTING]: teamBettingRecords,
			[TEAM_TRACE]: traceRecords,
		};
		const TotalPageMap = {
			[TEAM_BETTING]: numOfTeamBettingRecords,
			[TEAM_TRACE]: numOfTeamTraceRecords,
		};

		return (
			<div className={PREFIX_CLASS}>
				<Form
					cancelButtonDisabled
					submitButtonDisabled
					ref={(refForm) => this.formInstance = refForm}
				>
					<Row className={`${PREFIX_CLASS}__form-row`}>
						<Col>
							<FormItem
								label="游戏"
								itemName="bettingType"
								labelColon={false}
								itemConfig={{
									initialValue: TEAM_BETTING,
								}}
							>
								<SelectDropdown
									options={BettingTypeOptionsConfig}
									onChange={_handleChangeBettingType}
								/>
							</FormItem>
							<FormItem
								label="彩种"
								itemName="lottery"
								labelColon={false}
								itemConfig={{
									initialValue: [lotteryOptions[0].value],
								}}
							>
								<ClientCascaderSelect
									options={lotteryOptions}
									isAllowClear={false}
								/>
							</FormItem>
							<FormItem
								label="下级"
								itemName="distance"
								labelColon={false}
								itemConfig={{
									initialValue: ChildrenOptionConfigs[0].value,
								}}
							>
								<SelectDropdown
									options={ChildrenOptionConfigs}
									onChange={_handleChangeDistance}
								/>
							</FormItem>
							<FormItem
								label="时间"
								itemName="fromTo"
								labelColon={false}
								itemConfig={{
									initialValue: fromTo,
								}}
							>
								<ClientDateRangePicker
									inputStyle={{ width: '310px', }}
									ranges={[TODAY, YESTERDAY]}
									showTime
									format={DATE_TIME}
									limitDays={MAX_SELECTION_DAYS}
								/>
							</FormItem>
							<Button
								outline={Button.OutlineEnums.SOLID}
								color={Button.ColorEnums.ORANGE}
								onClick={_handleSearch}
							>
								查询
							</Button>
						</Col>
					</Row>
					<Row className={`${PREFIX_CLASS}__form-row`}>
						<Col>
							<FormItem
								label="会员名"
								itemName="username"
								labelColon={false}
								itemConfig={{
									rules: [{
										validator: (rule, value, callback) => {
											if (distance === DistanceTypeEnums.ALL && !value) {
												callback(USERNAME_ERROR_MESSAGE);
											}
											callback();
										},
									}],
								}}
							>
								<Input
									placeholder="输入会员名"
								/>
							</FormItem>
							<SelectDropdownInputFormItem
								options={selectDropdownOption}
							/>
						</Col>
					</Row>
				</Form>
				<PagerTable
					rowKey="id"
					dataSource={DataSourceMap[bettingType]}
					size={PagerTable.SizeEnums.SMALL}
					columns={_getTableColumn(bettingType)}
					paginationProps={{
						...pagination,
						showSizeChanger: false,
						total: TotalPageMap[bettingType],
					}}
					isLoading={teamBettingRecordsLoadingStatus === LOADING || teamTraceRecordsLoadingStatus === LOADING}
					onTableChange={_handleChangeTablePage}
				/>
				<BettingRecordDetailModal
					isModalVisible={isBettingRecordDetailModalVisible}
					isShowingDiscardButton={false}
					bettingRecord={selectedTeamBettingRecord}
					onClose={() => this.setState({ isBettingRecordDetailModalVisible: false, })}
				/>
				<TeamTraceRecordDetailModal
					isModalVisible={isTraceRecordDetailModalVisible}
					data={teamTraceRecordDetailData}
					bettingsData={teamTraceRecordDetailBettingsData}
					onBettingTableChange={_handleTeamTraceBettingTableChange}
					onClose={_handleCloseTeamTraceRecordDetailModal}
				/>
				<ClientMessageModal
					className={`${PREFIX_CLASS}__username-message-modal`}
					isVisible={isUsernameMessageVisible}
					message={USERNAME_ERROR_MESSAGE}
					okText="关闭"
					onClickCancel={_handleCloseUsernameMessage}
					onClickOk={_handleCloseUsernameMessage}
					isHideCancelButton
				/>
			</div>
		);
	}
	componentDidMount() {
		const { fetchTeamBettingRecordsAction, } = this.props;
		const { queryParameters, fromTo, } = this.state;
		const [ from, to ] = fromTo;

		const defaultParameters = Object.assign({}, queryParameters, {
			from: convertDateStringToTimestamp(from),
			to: convertDateStringToTimestamp(to),
			page: DEFAULT_PAGE,
		});

		fetchTeamBettingRecordsAction(defaultParameters);
	}
}

AgentTeamBettingPage.propTypes = propTypes;
AgentTeamBettingPage.defaultProps = defaultProps;

function getMemberId(childrenUsersData = [], username) {
	const childData = childrenUsersData.filter((childData = {}) => childData.username === username);
	
	return childData.length ? childData[0].id : null; 
}

function getLotteryOptions(lotteryClassData, lotteriesData) {
	return [
		{ label: '全部', value: '', },
		...lotteryClassData.map(lotteryClass => {
			const lotteryOption = {
				label: lotteryClass.name,
				value: lotteryClass.id,
			};

			if (lotteriesData[lotteryClass.id]) {
				lotteryOption['children'] = lotteriesData[lotteryClass.id].map(lottery => ({
					label: lottery.name,
					value: lottery.id,
				}));
			}
			return lotteryOption;
		}),
	];
}

function mapStateToProps(state) {
	const teamBettingRecords = state.myTeam.bettingRecords;
	const teamTraceRecords = state.myTeam.traceRecords.get('data').toObject();
	const teamTraceRecordDetail = state.myTeam.traceRecordDetail.get('data');
	const teamTraceRecordDetailBettings = state.myTeam.traceRecordDetail.get('bettings');
	const childrenUsers = state.childrenUsers.get('data').toObject();

	return {
		teamBettingRecordsData: teamBettingRecords.get('data').toObject(),
		teamTraceRecordsData: {
			traceRecords: teamTraceRecords.traceRecords.toArray(),
			numOfItems: teamTraceRecords.numOfItems,
			numOfPages: teamTraceRecords.numOfPages,
		},
		teamTraceRecordDetailData: teamTraceRecordDetail.toObject(),
		teamTraceRecordDetailBettingsData: teamTraceRecordDetailBettings.toObject(),
		childrenUsersData: childrenUsers.children.toArray(),
		lotteryClassesData: state.lotteryClasses.get('data').toArray(),
		lotteriesData: state.lotteries.get('lotteriesData').toObject(),
		teamBettingRecordsLoadingStatus: teamBettingRecords.get('loadingStatus'),
		teamBettingRecordsLoadingStatusMessage: teamBettingRecords.get('loadingStatusMessage'),
		teamTraceRecordsLoadingStatus: state.myTeam.traceRecords.get('teamTraceRecordsLoadingStatus'),
		teamTraceRecordsLoadingStatusMessage: state.myTeam.traceRecords.get('teamTraceRecordsLoadingStatusMessage'),
		teamTraceRecordDetailLoadingStatus: state.myTeam.traceRecords.get('teamTraceRecordDetailLoadingStatus'),
		teamTraceRecordDetailLoadingStatusMessage: state.myTeam.traceRecords.get('teamTraceRecordDetailLoadingStatusMessage'),
		teamTraceRecordDetailBettingsLoadingStatus: state.myTeam.traceRecords.get('teamTraceRecordDetailBettingsLoadingStatus'),
		teamTraceRecordDetailBettingsLoadingStatusMessage: state.myTeam.traceRecords.get('teamTraceRecordDetailBettingsLoadingStatusMessage'),
	};
}
function mapDispatchToProps(dispatch) {
	return {
		fetchTeamBettingRecordsAction: (query) => dispatch(fetchTeamBettingRecordsAction(query)),
		fetchTeamTraceRecordsAction: (queries) => dispatch(fetchTeamTraceRecordsAction(queries)),
		fetchTeamTraceRecordDetailAction: (memberId, traceId) => dispatch(fetchTeamTraceRecordDetailAction(memberId, traceId)),
		fetchTeamTraceRecordDetailBettingsAction: (memberId, traceId, query) => dispatch(fetchTeamTraceRecordDetailBettingsAction(memberId, traceId, query)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(
	withLoadingStatusNotification([
		{
			loadingStatus: 'teamBettingRecordsLoadingStatus',
			loadingStatusMessage: 'teamBettingRecordsLoadingStatusMessage',
		},
		{
			loadingStatus: 'teamTraceRecordsLoadingStatus',
			loadingStatusMessage: 'teamTraceRecordsLoadingStatusMessage',
		},
		{
			loadingStatus: 'teamTraceRecordDetailLoadingStatus',
			loadingStatusMessage: 'teamTraceRecordDetailLoadingStatusMessage',
		},
		{
			loadingStatus: 'teamTraceRecordDetailBettingsLoadingStatus',
			loadingStatusMessage: 'teamTraceRecordDetailBettingsLoadingStatusMessage',
		},
	],
	AgentTeamBettingPage)
);
