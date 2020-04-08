import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'ljit-store-connecter';
import { convertDateStringToTimestamp, formatDate, } from '../../../../lib/moment-utils';
import {
	bettingRecordsActions,
} from '../../../../controller';
import { withLoadingStatusNotification, } from '../../../../../lib/notify-handler';
import {
	Table,
	InputTextarea,
	StatusTag,
	Row,
	Col,
	DecimalNumber,
	TextButton,
} from 'ljit-react-components';
import PageBlock from '../../../../components/page-block';
import PageModal from '../../../../components/page-modal';
import SearchForm from './search-form';
import { LoadingStatusEnum,  GameTypeEnums, BettingRecordStatusEnum } from '../../../../lib/enums';
import { ColumnsEnums, } from './enums';
import { omit, } from 'lodash';
import './style.styl';

const { fetchBettingRecordsAction, } = bettingRecordsActions;

const { NONE, LOADING, SUCCESS, FAILED, } = LoadingStatusEnum;
const {
	USERNAME, TIME, REPORTTIME, GAMENAME, TOTAL, REWARD, ACCUMULATEPRIZE, TRANSACTION_ID,
	PLAY, CREATED_AT, STATUS, OPERATION, VALID, DETAIL, NOTE,
} = ColumnsEnums;
const {
	SAELECTRIC, EBETELECTRIC, PTELECTRIC, OPENCHESS, ASLIVE, GAMMACHESS, BINARYOPTION,
	CQNINE, GDELECTRIC, VRELECTRIC, LOTTERY, VRLIVELOTTERY, UGSPORT, AGELECTRIC, TREASURE,
} = GameTypeEnums;
const TagStatusEnums = StatusTag.StatusEnums;
const {
	WIN,
	LOSE,
	DRAW,
	CANCELED,
	NEW,
	OPENING
} = BettingRecordStatusEnum;
const StatusMap = {
	[WIN]: { text: '中奖', statusTag: TagStatusEnums.WIN, },
	[LOSE]: { text: '未中奖', statusTag: TagStatusEnums.LOSE, },
	// TODO change to NOT-OPENED after api fix
	[NEW]: { text: '未开奖', statusTag: TagStatusEnums.PENDING, },
	[OPENING]: { text: '开奖中', statusTag: TagStatusEnums.WARNING, },
	[DRAW]: { text: '平局', statusTag: TagStatusEnums.DRAW, },
	[CANCELED]: { text: '已撤单', statusTag: TagStatusEnums.ERROR, },
};
const DEFAULT_PAGE = 1;

function getTableConfig(type) {
	switch (type) {
		case SAELECTRIC:
		case EBETELECTRIC:
		case PTELECTRIC:
		case OPENCHESS:
		case ASLIVE:
		case GAMMACHESS:
		case BINARYOPTION:
		case CQNINE:
		case GDELECTRIC:
		case VRELECTRIC:
			return {
				columnConfig: [
					USERNAME, TIME, REPORTTIME, GAMENAME, TOTAL, REWARD, ACCUMULATEPRIZE,
				],
				hasExpandRow: false,
			};
		case LOTTERY:
		case VRLIVELOTTERY:
			return {
				columnConfig: [
					TRANSACTION_ID, USERNAME, LOTTERY, PLAY, CREATED_AT, REWARD, STATUS, OPERATION,
				],
				hasExpandRow: true,
			};
		case UGSPORT:
			return {
				columnConfig: [
					USERNAME, TIME, REPORTTIME, GAMENAME, TOTAL, VALID, REWARD, DETAIL, NOTE,
				],
				hasExpandRow: false,
			};
		case AGELECTRIC:
			return {
				columnConfig: [
					USERNAME, TIME, REPORTTIME, GAMENAME, TOTAL, VALID, REWARD, ACCUMULATEPRIZE,
				],
				hasExpandRow: false,
			};
		case TREASURE:
			return {
				columnConfig: [
					USERNAME, TIME, TOTAL, REWARD, ACCUMULATEPRIZE,
				],
				hasExpandRow: false,
			};
		default:
			return {
				columnConfig: [],
				hasExpandRow: false,
			};
	}
}

const propTypes = {
	fetchBettingRecordsAction: PropTypes.func.isRequired,
	bettingRecordsData: PropTypes.array,
	page: PropTypes.number,
	numOfItems: PropTypes.number,
	numOfPages: PropTypes.number,
	loadingStatus: PropTypes.oneOf([
		NONE,
		LOADING,
		SUCCESS,
		FAILED,
	])
};
const defaultProps = {

};

class UserReportMemberBettingRecordsPage extends Component {
	constructor() {
		super();
		this.state = {
			isVisible: false,
			isShowTable: false,
			betting: {},
			pagination: {},
			queryParameters: {},
			gameType: LOTTERY,
		};

		this._handleSearch = this._handleSearch.bind(this);
		this._handleChangeGameType = this._handleChangeGameType.bind(this);
		this._handleReset = this._handleReset.bind(this);
		this._handleClickDiscardBetting = this._handleClickDiscardBetting.bind(this);
		this._handleSubmitDiscardBetting = this._handleSubmitDiscardBetting.bind(this);
		this._handleCancel = this._handleCancel.bind(this);
		this._handleChangeTable = this._handleChangeTable.bind(this);
		this._renderExpandRow = this._renderExpandRow.bind(this);
		this._getColumn = this._getColumn.bind(this);
		this._getTableColumns = this._getTableColumns.bind(this);
		this._renderTable = this._renderTable.bind(this);
	}

	_handleSearch(values) {
		const { fetchBettingRecordsAction, } = this.props;
		const { gameType, } = this.state;

		if (gameType === LOTTERY) {
			const queries = omit(values, [ 'fromTo', ]);
			const { fromTo = [] } = values;
			const [ from, to ] = fromTo;
			const queryParameters = {
				...queries,
				from: convertDateStringToTimestamp(from),
				to: convertDateStringToTimestamp(to),
				order: 'desc'
			};

			fetchBettingRecordsAction(queryParameters);
			this.setState({ queryParameters, });
		}

		this.setState({ isShowTable: true, });
	}

	_handleChangeGameType(gameType) {
		this.setState({
			gameType,
			queryParameters: {},
			isShowTable: false,
		});
	}

	_handleReset() {
		this.setState({ isShowTable: false, });
	}

	_handleClickDiscardBetting(record) {
		this.setState({
			betting: record,
			isVisible: true,
		});
	}

	_handleSubmitDiscardBetting() {
		// TODO dispatch cancel betting action
		this.setState({
			isVisible: false,
		});
	}

	_handleCancel() {
		this.setState({
			isVisible: false,
		});
	}
	_handleChangeTable(pagination, filters, sorter) {
		const { gameType, queryParameters, } = this.state;
		const { fetchBettingRecordsAction, } = this.props;

		let { columnKey, order = 'desc', } = sorter;

		order = order.replace('end', '');

		if (order !== queryParameters.order) {
			pagination.current = DEFAULT_PAGE;
		}

		let newQueryParameters;

		const { current, pageSize, } = pagination;

		if (gameType === LOTTERY) {
			newQueryParameters = Object.assign({}, queryParameters , {
				limit: pageSize,
				page: current,
				sort: columnKey,
				order,
			});
			fetchBettingRecordsAction(newQueryParameters);
		}

		this.setState({
			pagination,
			queryParameters: newQueryParameters,
		});
	}

	_renderExpandRow(record) {
		return (
			<Row className="betting-expandrow">
				<Col span={8}>
					<p>帐号： {record.username}</p>
					<p>彩种： {record.lotteryName}</p>
					<p>玩法： {record.name}</p>
					<p>位置： {record.weizhi}</p>
					<p>方案號： {record.id}</p>
					<p>倍數： {record.multiple}</p>
					<p>总金额： <DecimalNumber data={record.amount} hasSeparator/></p>
				</Col>
				<Col span={8}>
					<p>下注時間： {formatDate(record.createdAt)}</p>
					<p>期号： {record.issue}</p>
					<p>奖金： <DecimalNumber data={record.reward} hasSeparator/></p>
					<p>奖金返点： {record.rebate}</p>
					<p>投注来源： {record.device}</p>
					{/* TODO wait for PM confirm */}
					<p>中奖类型： 正常</p>
					<p>注数： {record.count}</p>
					<p>状态： {StatusMap[record.status].text}</p>
				</Col>
				<Col span={8}>
					<p>投注号码：</p>
					<InputTextarea minRows={7} value={record.betcontent} disabled></InputTextarea>
				</Col>
			</Row>
		);
	}

	_getColumn(item) {
		switch (item) {
			case USERNAME:
				return {
					title: '帐号', dataIndex: 'username', key: 'username'
				};
			case TIME:
				return {
					title: '时间', dataIndex: 'gameTime', key: 'gameTime',
					sorter: () => 0,
					render: (value) => formatDate(value)
				};
			case REPORTTIME:
				return {
					title: '报表日期', dataIndex: 'reportTime', key: 'reportTime',
					sorter: () => 0,
					render: (value) => formatDate(value)
				};
			case GAMENAME:
				return {
					title: '游戏名称', dataIndex: 'gameName', key: 'gameName',
					render: (record) => {
						return <div style={{ minWidth: '76px' }}>{record}</div>;
					},
				};
			case TOTAL:
				return {
					title: '投注金额', dataIndex: 'total', key: 'total',
					sorter: () => 0,
					render: (record) => {
						return <div style={{ minWidth: '76px' }}>
							<DecimalNumber data={record} hasSeparator/>
						</div>;
					},
				};
			case REWARD:
				return {
					title: '中奖金额', dataIndex: 'reward', key: 'reward',
					sorter: () => 0,
					render: (data) => {
						if (data === 0) {
							return '-';
						}

						return (
							<div style={{ minWidth: '76px' }}>
								<DecimalNumber
									data={data}
									isCurrency
									hasSeparator
								/>
							</div>
						);
					},
				};
			case ACCUMULATEPRIZE:
				return {
					title: '累积奖池中奖金额', dataIndex: 'accumulatePrize', key: 'accumulatePrize',
					sorter: () => 0,
					render: (accumulatePrize) => <DecimalNumber data={accumulatePrize} hasSeparator/>,
				};
			case TRANSACTION_ID:
				return {
					title: '交易号', dataIndex: 'id', key: 'id'
				};
			case PLAY:
				return {
					title: '玩法', dataIndex: 'playId', key: 'playId',
					render: (value, record) => record.name,
				};
			case CREATED_AT:
				return {
					title: '下注时间', dataIndex: 'createdAt', key: 'createdAt',
					sorter: () => 0,
					render: (value) => formatDate(value)
				};
			case STATUS:
				return {
					title: '状态', dataIndex: 'status', key: 'status',
					render: (status) => {
						const { statusTag, text, } = StatusMap[status];

						return <StatusTag status={statusTag} text={text}/>;
					},
				};
			case OPERATION:
				return {
					title: '操作', dataIndex: '', key: '',
					render: (record) => {
						// TODO change to NOT-OPENED after api fix
						if (record.status === NEW) {
							return (
								<TextButton
									text="撤單"
									onClick={() => this._handleClickDiscardBetting(record)}
								/>
							);
						}
						return null;
					}
				};
			case VALID:
				return {
					title: '有效投注', dataIndex: 'valid', key: 'valid',
					sorter: () => 0,
					render: (record) => {
						return <div style={{ minWidth: '76px' }}>{record}</div>;
					},
				};
			case DETAIL:
				return {
					title: '详情', dataIndex: 'detail', key: 'detail',
				};
			case NOTE:
				return {
					title: '备注', dataIndex: 'note', key: 'note',
					render: (record) => {
						return <div style={{ minWidth: '28px' }}>{record}</div>;
					},
				};
			case LOTTERY:
				return {
					title: '彩种', dataIndex: 'lotteryName'
				};
			default:
				return null;
		}
	}

	_getTableColumns(columnConfig, type) {
		const { _getColumn, } = this;
		const columns = [];

		columnConfig.forEach((item) => columns.push(_getColumn(item, type)));
		return columns;
	}

	_renderTable(type) {
		const { bettingRecordsData, numOfItems, loadingStatus, } = this.props;
		const { pagination, } = this.state;
		const tableConfig = getTableConfig(type);
		const { columnConfig , hasExpandRow, } = tableConfig;
		const { _getTableColumns, _renderExpandRow, _handleChangeTable, } = this;

		return (
			<Table
				rowKey="id"
				className="betting-table"
				dataSource={bettingRecordsData}
				columns={_getTableColumns(columnConfig, type)}
				expandedRowRender={hasExpandRow ? (record) => _renderExpandRow(record): undefined}
				hasPagination
				paginationProps={{
					showSizeChanger: true,
					... pagination,
					total: numOfItems,
				}}
				onTableChange={_handleChangeTable}
				isLoading={loadingStatus === LOADING}
			/>
		);
	}

	render() {
		const {
			_handleSearch,
			_handleChangeGameType,
			_handleReset,
			_handleCancel,
			_handleSubmitDiscardBetting,
			_renderTable,
		} = this;
		const { gameType, isVisible, isShowTable, } = this.state;

		return (
			<PageBlock noMinHeight className="user-report-betting-records">
				<SearchForm
					onSearch={_handleSearch}
					onReset={_handleReset}
					onChangeGameType={_handleChangeGameType}
					gameType={gameType}
				/>
				{isShowTable ? _renderTable(gameType): null}
				<PageModal
					visible={isVisible}
					title="确认提示"
					onClickCancel={_handleCancel}
					onClickOk={_handleSubmitDiscardBetting}
					modalSize="small"
					isCentered
				>
					<div>是否确定撤單？</div>
				</PageModal>
			</PageBlock>
		);
	}
}

UserReportMemberBettingRecordsPage.propTypes = propTypes;
UserReportMemberBettingRecordsPage.defaultProps = defaultProps;

function mapStateToProps(state) {
	const data = state.bettingRecords.get('data').toObject();

	return {
		bettingRecordsData: data.bettingRecords.toArray(),
		page: data.page,
		numOfItems: data.numOfItems,
		numOfPages: data.numOfPages,
		loadingStatus: state.bettingRecords.get('loadingStatus'),
		loadingStatusMessage: state.bettingRecords.get('loadingStatusMessage'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchBettingRecordsAction: (query) => dispatch(fetchBettingRecordsAction(query)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(withLoadingStatusNotification(
	[
		{
			loadingStatus: 'loadingStatus',
			loadingStatusMessage: 'loadingStatusMessage',
		},
	],
	UserReportMemberBettingRecordsPage
));
