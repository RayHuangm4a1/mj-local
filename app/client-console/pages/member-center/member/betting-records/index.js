import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import SelectDropdown from '../../../../components/select-dropdown';
import SelectDropdownInputFormItem from '../../../../components/select-dropdown-input-form-item';
import TraceRecordDetailModalFeature from '../../../../features/trace-record-detail-modal';
import BettingRecordDetailModalFeature from '../../../../features/betting-record-detail-modal';
import {
	Form,
	FormItem,
	Button,
} from 'ljit-react-components';
import LotteryBettingTable from './lottery-betting-table';
import LotteryTraceTable from './lottery-trace-table';
import ClientDateRangePicker from '../../../../features/client-date-range-picker';
import { bettingRecordActions, traceRecordActions, } from '../../../../controller';
import { LoadingStatusEnum } from '../../../../lib/enums';
import { DATE_TIME, convertDateStringToTimestamp, } from '../../../../../lib/moment-utils';
import { bettingRecordsDataPropTypes, traceRecordDataPropType, } from '../../../../lib/betting-utils';
import { connect, } from 'ljit-store-connecter';
import {
	PREFIX_CLASS,
	LOTTERY_BETTING,
	LOTTERY_TRACE,
	BettingTypeOptionsConfig,
} from './utils';
import { MAX_SELECTION_DAYS } from '../../../../../lib/constants';
import './style.styl';

const { RangesEnums } = ClientDateRangePicker;

const {
	TODAY,
	YESTERDAY,
	THIS_WEEK,
} = RangesEnums;
const {
	NONE,
	LOADING,
	SUCCESS,
	FAILED,
} = LoadingStatusEnum;
const {
	fetchBettingRecordsAction,
} = bettingRecordActions;
const {
	fetchTraceRecordsAction,
	setSelectedTraceRecordAction,
} = traceRecordActions;

const propTypes = {
	bettingRecordsData: bettingRecordsDataPropTypes,
	lotteriesMapData: PropTypes.object,
	fetchBettingRecordsAction: PropTypes.func.isRequired,
	bettingRecordsLoadingStatus: PropTypes.oneOf([
		NONE,
		LOADING,
		SUCCESS,
		FAILED,
	]),
	traceRecordsData: PropTypes.shape({
		traceRecords: PropTypes.arrayOf(traceRecordDataPropType),
		page: PropTypes.number,
		numOfItems: PropTypes.number,
		numOfPages: PropTypes.number,
	}),
	fetchTraceRecordsAction: PropTypes.func.isRequired,
	setSelectedTraceRecordAction: PropTypes.func.isRequired,
	traceRecordsLoadingStatus: PropTypes.oneOf([
		NONE,
		LOADING,
		SUCCESS,
		FAILED,
	]),
};

const defaultProps = {
	bettingRecordsData: {},
	lotteriesMapData: {},
};

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE = 1;

const getIssueOptions = (bettingType) => {
	if (bettingType === LOTTERY_TRACE) {
		return [{ label: '方案号', value: 'id', },];
	} else {
		return [
			{ label: '方案号', value: 'id', },
			{ label: '期号', value: 'issue', },
		];
	}
};

class BettingRecordsPage extends Component {
	constructor() {
		super();
		this.state = {
			issueOptions: getIssueOptions(LOTTERY_BETTING),
			bettingType: LOTTERY_BETTING,
			isMessageVisible: false,
			bettingRecord: {},
			isBettingRecordDetailModalVisible: false,
			isTraceRecordDetailModalVisible: false,
			pagination: {
				pageSize: DEFAULT_PAGE_SIZE
			},
			queryParameters: {
				id: null,
				limit: DEFAULT_PAGE_SIZE,
				sort: null,
				order: 'desc',
				lotteryId: null,
				issue: null,
				from: null,
				to: null,
				page: DEFAULT_PAGE,
			},
			loadingStatus: NONE,
		};

		this._handleChangeBettingType = this._handleChangeBettingType.bind(this);
		this._handleSearch = this._handleSearch.bind(this);
		this._handleShowDiscardMessage = this._handleShowDiscardMessage.bind(this);
		this._handleHideDiscardMessage = this._handleHideDiscardMessage.bind(this);
		this._renderLotteryBettingTable = this._renderLotteryBettingTable.bind(this);
		this._handleClickBettingRecord = this._handleClickBettingRecord.bind(this);
		this._handleClickTraceRecord = this._handleClickTraceRecord.bind(this);
		this._renderLotteryTraceTable = this._renderLotteryTraceTable.bind(this);
		this._handleChangeTablePage = this._handleChangeTablePage.bind(this);
		this._renderTable = this._renderTable.bind(this);
	}
	_handleChangeBettingType(bettingType) {
		const issueOptions = getIssueOptions(bettingType);

		this.setState({ issueOptions, });
	}
	_handleSearch() {
		const { fetchBettingRecordsAction, fetchTraceRecordsAction, } = this.props;
		const form = this.formInstance.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				const {
					id,
					bettingType,
					issue,
					lotteryId,
					fromTo = [],
				} = values;
				const [ from, to ] = fromTo;
				const queryParameters = Object.assign({}, this.state.queryParameters , {
					id,
					lotteryId,
					issue,
					from: convertDateStringToTimestamp(from),
					to: convertDateStringToTimestamp(to),
					page: DEFAULT_PAGE,
				});

				if (bettingType === LOTTERY_BETTING) {
					fetchBettingRecordsAction(queryParameters);
				} else if (bettingType === LOTTERY_TRACE) {
					fetchTraceRecordsAction(queryParameters);
				}
				this.setState({
					bettingType,
					queryParameters,
					pagination: Object.assign({}, this.state.pagination, { current: DEFAULT_PAGE }),
				});
			}
		});
	}
	_handleShowDiscardMessage(bettingRecord) {
		this.setState({
			isMessageVisible: true,
			bettingRecord,
		});
	}
	_handleHideDiscardMessage() {
		this.setState({ isMessageVisible: false, });
	}
	_handleClickBettingRecord(bettingRecord) {
		this.setState({
			bettingRecord,
			isBettingRecordDetailModalVisible: true,
		});
	}
	_handleClickTraceRecord(traceRecord) {
		const { setSelectedTraceRecordAction, } = this.props;

		this.setState({
			isTraceRecordDetailModalVisible: true,
		});
		setSelectedTraceRecordAction(traceRecord);
	}
	_renderLotteryBettingTable() {
		const {
			_handleClickBettingRecord,
			_handleChangeTablePage,
		} = this;
		const {
			bettingRecordsData,
			bettingRecordsLoadingStatus,
		} = this.props;
		const {
			pagination,
		} = this.state;

		return (
			<LotteryBettingTable
				isLoading={bettingRecordsLoadingStatus === LOADING}
				bettingRecords={bettingRecordsData.bettingRecords}
				paginationProps={{
					...pagination,
					total: bettingRecordsData.numOfItems,
				}}
				onClickRecord={_handleClickBettingRecord}
				onTableChange={_handleChangeTablePage}
			/>
		);
	}
	_renderLotteryTraceTable() {
		const {
			_handleClickTraceRecord,
			_handleChangeTablePage,
		} = this;
		const {
			traceRecordsData,
			traceRecordsLoadingStatus,
		} = this.props;
		const {
			pagination,
		} = this.state;

		return (
			<LotteryTraceTable
				isLoading={traceRecordsLoadingStatus === LOADING}
				traceRecords={traceRecordsData.traceRecords}
				paginationProps={{
					...pagination,
					total: traceRecordsData.numOfItems,
				}}
				onClickRecord={_handleClickTraceRecord}
				onTableChange={_handleChangeTablePage}
			/>
		);
	}
	_handleChangeTablePage(pagination, filters, sorter) {
		const {
			fetchBettingRecordsAction,
			fetchTraceRecordsAction,
		} = this.props;
		const {
			bettingType,
			queryParameters: prevQueryParameters,
			status: prevStatus,
			page: prevPage,
		} = this.state;
		const { status, } = filters;

		let { columnKey, order = 'desc' } = sorter;

		order = order.replace('end', '');

		if (order !== prevQueryParameters.order) {
			pagination.current = DEFAULT_PAGE;
		}
		const { current, } = pagination;
		
		const queryParameters = Object.assign({}, prevQueryParameters, {
			page: current || prevPage,
			sort: columnKey,
			order,
			status: status && status.length ? status.slice(-1)[0] : prevStatus,
		});

		if (bettingType === LOTTERY_BETTING) {
			fetchBettingRecordsAction(queryParameters);
		} else if (bettingType === LOTTERY_TRACE) {
			// TODO status filter api not done yet
			fetchTraceRecordsAction(queryParameters);
		}

		this.setState({
			pagination,
			queryParameters,
		});
	}

	_renderTable() {
		const {
			_renderLotteryBettingTable,
			_renderLotteryTraceTable,
		} = this;
		const {
			bettingType,
		} = this.state;

		// TODO add VR_BETTING, ENTERTAINMENT_BETTING table
		const recordTable = bettingType === LOTTERY_BETTING ? _renderLotteryBettingTable() : _renderLotteryTraceTable();

		return recordTable;
	}

	render() {
		const {
			_handleChangeBettingType,
			_handleSearch,
			_handleShowDiscardMessage,
			_handleHideDiscardMessage,
			_renderTable,
		} = this;
		const {
			lotteriesMapData,
		} = this.props;
		const {
			issueOptions,
			bettingRecord,
			isBettingRecordDetailModalVisible,
			isTraceRecordDetailModalVisible,
			isMessageVisible,
		} = this.state;
		const lotteryOptions = getLotteryOptions(lotteriesMapData);

		return (
			<div className={PREFIX_CLASS}>
				<Form
					cancelButtonDisabled
					submitButtonDisabled
					ref={(refForm) => this.formInstance = refForm}
				>
					<SelectDropdownInputFormItem
						options={issueOptions}
					/>
					<FormItem
						label="游戏"
						itemName="bettingType"
						labelColon={false}
						itemConfig={{
							initialValue: LOTTERY_BETTING,
						}}
					>
						<SelectDropdown
							options={BettingTypeOptionsConfig}
							onChange={_handleChangeBettingType}
						/>
					</FormItem>
					<FormItem
						label="彩种"
						itemName="lotteryId"
						labelColon={false}
						itemConfig={{
							initialValue: lotteryOptions[0].value
						}}
					>
						<SelectDropdown
							options={lotteryOptions}
						/>
					</FormItem>
					<FormItem
						label="时间"
						itemName="fromTo"
						labelColon={false}
					>
						<ClientDateRangePicker
							inputStyle={{ width: '310px', }}
							ranges={[TODAY, YESTERDAY, THIS_WEEK]}
							showTime
							format={DATE_TIME}
							limitDays={MAX_SELECTION_DAYS}
						/>
					</FormItem>
					<Button
						outline={Button.OutlineEnums.SOLID}
						onClick={_handleSearch}
						color={Button.ColorEnums.ORANGE}
					>
						查询
					</Button>
				</Form>
				{_renderTable()}
				<BettingRecordDetailModalFeature
					isModalVisible={isBettingRecordDetailModalVisible}
					messageTitle="投注撤单"
					bettingRecordId={bettingRecord.id}
					onClose={() => this.setState({ isBettingRecordDetailModalVisible: false, })}
				/>
				<TraceRecordDetailModalFeature
					isModalVisible={isTraceRecordDetailModalVisible}
					onClose={() => this.setState({ isTraceRecordDetailModalVisible: false, })}
				/>
			</div>
		);
	}

	componentDidMount() {
		this.props.fetchBettingRecordsAction({
			limit: DEFAULT_PAGE_SIZE,
		});
	}
}

BettingRecordsPage.propTypes = propTypes;
BettingRecordsPage.defaultProps = defaultProps;

function mapStateToProps(state) {
	const bettingRecordsData = state.bettingRecords.get('data').toObject();
	const traceRecordsData = state.traceRecords.get('data').toObject();

	return {
		bettingRecordsData: {
			bettingRecords: bettingRecordsData.bettingRecords.toArray(),
			page: bettingRecordsData.page,
			numOfItems: bettingRecordsData.numOfItems,
			numOfPages: bettingRecordsData.numOfPages,
		},
		bettingRecordsLoadingStatus: state.bettingRecords.get('loadingStatus'),
		traceRecordsData: {
			traceRecords: traceRecordsData.traceRecords.toArray(),
			page: traceRecordsData.page,
			numOfItems: traceRecordsData.numOfItems,
			numOfPages: traceRecordsData.numOfPages,
		},
		traceRecordsLoadingStatus: state.traceRecords.get('loadingStatus'),
		lotteriesMapData: state.lotteries.get('lotteriesMapData').toObject(),
	};
}
function mapDispatchToProps(dispatch) {
	return {
		fetchBettingRecordsAction: (...args) => dispatch(fetchBettingRecordsAction(...args)),
		setSelectedTraceRecordAction: (...args) => dispatch(setSelectedTraceRecordAction(...args)),
		fetchTraceRecordsAction: (...args) => dispatch(fetchTraceRecordsAction(...args)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(BettingRecordsPage);

function getLotteryOptions(lotteriesMapData) {
	const lotteryOptions = [
		{ label: '全部', value: null, },
		...Object.keys(lotteriesMapData).map(key => {
			const lottery = lotteriesMapData[key];

			return {
				label: lottery.name,
				value: lottery.id,
			};
		}),
	];

	return lotteryOptions;
}
