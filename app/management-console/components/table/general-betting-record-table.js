import React, { Component, } from 'react';
import { ColumnEnums, StatusMap, } from './constants';
import moment from 'moment';
import {
	Table,
	StatusTag,
	Row,
	Col,
	InputTextarea,
	TextButton,
	DecimalNumber,
} from 'ljit-react-components';
import { formatDate, } from '../../../lib/moment-utils';
import { GameTypeEnums, } from '../../lib/enums';
import { BettingRecordTablePropTypes, } from './constants/betting-record';

const {
	SA_ELECTRIC, EBET_ELECTRIC, PT_ELECTRIC, OPEN_CHESS, AS_LIVE, GAMMA_CHESS, BINARY_OPTION,
	CQ_NINE, GD_ELECTRIC, VR_ELECTRIC, LOTTERY, VR_LIVE_LOTTERY, UG_SPORT, AG_ELECTRIC, TREASURE,
} = GameTypeEnums;
const {
	USERNAME, GAME_TIME, REPORT_TIME, GAME_NAME, AMOUNT, REWORD, ACCUMULATE_PRIZE, TRANSACTION_ID,
	PLAY, LOTTERY_TYPE, TIME, STATUS, OPERATION, VALID, DETAIL, NOTE,
} = ColumnEnums;

function getTableConfig(type) {
	switch (type) {
		case SA_ELECTRIC:
		case EBET_ELECTRIC:
		case PT_ELECTRIC:
		case OPEN_CHESS:
		case AS_LIVE:
		case GAMMA_CHESS:
		case BINARY_OPTION:
		case CQ_NINE:
		case GD_ELECTRIC:
		case VR_ELECTRIC:
			return {
				columnNameList: [
					USERNAME, GAME_TIME, REPORT_TIME, GAME_NAME, AMOUNT, REWORD, ACCUMULATE_PRIZE,
				],
				hasExpandRow: false,
			};
		case LOTTERY:
		case VR_LIVE_LOTTERY:
			return {
				columnNameList: [
					TRANSACTION_ID, USERNAME, LOTTERY_TYPE, PLAY, TIME, REWORD, STATUS, OPERATION,
				],
				hasExpandRow: true,
			};
		case UG_SPORT:
			return {
				columnNameList: [
					USERNAME, GAME_TIME, REPORT_TIME, GAME_NAME, AMOUNT, VALID, REWORD, DETAIL, NOTE,
				],
				hasExpandRow: false,
			};
		case AG_ELECTRIC:
			return {
				columnNameList: [
					USERNAME, GAME_TIME, REPORT_TIME, GAME_NAME, AMOUNT, VALID, REWORD, ACCUMULATE_PRIZE,
				],
				hasExpandRow: false,
			};
		case TREASURE:
			return {
				columnNameList: [
					USERNAME, GAME_TIME, AMOUNT, REWORD, ACCUMULATE_PRIZE,
				],
				hasExpandRow: false,
			};
		default:
			return {
				columnNameList: [],
				hasExpandRow: false,
			};
	}
}

function renderPrize(record) {
	return <div style={{ minWidth: '76px' }}><DecimalNumber data={record} hasSeparator isCurrency/></div>;
}

const defaultProps = {
	bettingRecords: [],
	hasAccountField: true,
	hasOperationField: true,
	hasPagination: false,
	onDiscard: () => {},
};

class GeneralBettingRecordTable extends Component {
	constructor() {
		super();
		this._getColumn = this._getColumn.bind(this);
		this._getTableColumns = this._getTableColumns.bind(this);
		this._renderExpandRow = this._renderExpandRow.bind(this);
		this._renderTable = this._renderTable.bind(this);
	}

	_getColumn(item, type) {
		const { onDiscard, } = this.props;

		switch (item) {
			case USERNAME:
				return {
					title: '帐号', dataIndex: 'username', key: 'username',
				};
			case GAME_TIME:
				return {
					title: '时间', dataIndex: 'gameTime', key: 'gameTime',
					sorter: (prev, next) =>  moment(prev.gameTime, "YYYY-MM-DD HH:mm:ss").diff(moment(next.gameTime, "YYYY-MM-DD HH:mm:ss")),
				};
			case REPORT_TIME:
				return {
					title: '报表日期', dataIndex: 'reportTime', key: 'reportTime',
					sorter: (prev, next) =>  moment(prev.reportTime, "YYYY-MM-DD").diff(moment(next.reportTime, "YYYY-MM-DD")),
				};
			case GAME_NAME:
				return {
					title: '游戏名称', dataIndex: 'gameName', key: 'gameName',
					render: function renderGameName(record) {
						return <div style={{ minWidth: '76px' }}>{record}</div>;
					},
				};
			case AMOUNT:
				return {
					title: '投注金额', dataIndex: 'amount', key: 'amount',
					sorter: (prev, next) => prev.amount - next.amount,
					render: (amount) => <DecimalNumber data={amount} hasSeparator/>,
				};
			case REWORD:
				return {
					title: '中奖金额', dataIndex: 'reward', key: 'reward',
					sorter: (prev, next) => prev.reward - next.reward,
					render: (record) => {
						if (record) {
							if (type === VR_LIVE_LOTTERY || type === LOTTERY) {
								return renderPrize(record.amount);
							}
							return <DecimalNumber data={record} hasSeparator/>;
						}
						return '-';
					},
				};
			case ACCUMULATE_PRIZE:
				return {
					title: '累积奖池中奖金额', dataIndex: 'accumulatePrize', key: 'accumulatePrize',
					sorter: (prev, next) => prev.accumulatePrize - next.accumulatePrize,
					render: renderPrize,
				};
			case TRANSACTION_ID:
				return {
					title: '方案号', dataIndex: 'id', key: 'id',
				};
			case LOTTERY_TYPE:
				return {
					title: '彩种', dataIndex: 'lotteryName', key: 'lotteryName',
				};
			case PLAY:
				return {
					title: '玩法', dataIndex: 'playId', key: 'playId',
					render: (value, record) => record.name,
				};
			case TIME:
				return {
					title: '下注时间', dataIndex: 'createdAt', key: 'createdAt',
					sorter: (prev, next) => moment(prev.createdAt, "YYYY-MM-DD HH:mm:ss").diff(moment(next.createdAt, "YYYY-MM-DD HH:mm:ss")),
					render: (createdAt) => formatDate(createdAt),
				};
			case STATUS:
				return {
					title: '状态', dataIndex: 'status', key: 'status',
					render: function renderStatus(status) {
						const matchStatus = StatusMap[status] ? StatusMap[status] : {};
						const {
							statusTag = '',
							text = '',
						} = matchStatus;

						return (
							<StatusTag
								status={statusTag}
								text={text}
							/>);
					},
				};
			case OPERATION:
				return {
					title: '操作', dataIndex: '', key: '',
					render: function renderOperation(record) {
						if (record.status === 'pending') {
							return (
								<div style={{ minWidth: '28px' }}>
									<TextButton
										text="撤单"
										color={TextButton.TYPE_DEFAULT}
										onClick={() => onDiscard(record)}
									/>
								</div>
							);
						}
						return null;
					}
				};
			case VALID:
				return {
					title: '有效投注', dataIndex: 'valid', key: 'valid',
					sorter: (prev, next) => prev.valid - next.valid,
					render: function renderValid(record) {
						return <div style={{ minWidth: '76px' }}>{record}</div>;
					},
				};
			case DETAIL:
				return {
					title: '详情', dataIndex: 'detail', key: 'detail',
					render: function renderDetail(record) {
						return (
							<div>
								<div>{record[0]}</div>
								<div>{record[1]}</div>
								<div>{record[2]}</div>
								<div>{record[3]}</div>
								<div>{record[4]}</div>
								<div>{record[5]}</div>
								<div>{record[6]}</div>
								<div>{record[7]}</div>
								<div>{record[8]}</div>
								<div>{record[9]}</div>
							</div>
						);
					}
				};
			case NOTE:
				return {
					title: '备注', dataIndex: 'note', key: 'note',
					render: function renderNote(record) {
						return <div style={{ minWidth: '28px' }}>{record}</div>;
					},
				};
			default:
				return null;
		}
	}

	_getTableColumns(columnNameList, type) {
		const { onDiscard, hasAccountField, hasOperationField, } = this.props;
		const { _getColumn, } = this;
		const columns = [];

		columnNameList.forEach((item) => {
			const notExcludeAccountField = hasAccountField || item !== USERNAME;
			const notExcludeOperationField = hasOperationField || item !== OPERATION;

			if (notExcludeAccountField && notExcludeOperationField) {
				columns.push(_getColumn(item, type, onDiscard));
			}
		});
		return columns;
	}

	_renderExpandRow(record = {}) {
		const {
			username,
			lotteryName,
			createdAt,
			weizhi,
			name,
			id,
			issue,
			device,
			status,
			ip,
			opencode,
			betcontent,
			rebate = '-',
			count = '-',
			amountPerBet = '-',
			multiple = '-',
			amount = '-',
			reward = '-',
		} = record;
		const displayCreateAt = formatDate(createdAt);
		const text = StatusMap[status] ? StatusMap[status].text : '-';

		return (
			<Row className="betting-expandrow">
				<Col span={8}>
					<p>帐号： {username ? username : '-'}</p>
					<p>彩种： {lotteryName ? lotteryName : '-'}</p>
					<p>玩法： {name ? name : '-'}</p>
					<p>位置： {weizhi ? weizhi : '-'}</p>
					<p>方案號： {id ? id : '-'}</p>
					<p>單注金額： <DecimalNumber data={amountPerBet} hasSeparator/></p>
					<p>倍數： {multiple}</p>
					<p>总金额： <DecimalNumber data={amount} hasSeparator/></p>
				</Col>
				<Col span={8}>
					<p>下注時間： {displayCreateAt ? displayCreateAt : '-'}</p>
					<p>期号： {issue ? issue : '-'}</p>
					<p>奖金： <DecimalNumber data={reward} hasSeparator/></p>
					<p>奖金返点： {rebate}</p>
					<p>投注来源： {device ? device : '-'}</p>
					{/* TODO: 中奖类型 等PM卻認 */}
					<p>中奖类型： 正常</p>
					<p>注数： {count}</p>
					<p>状态： {text}</p>
				</Col>
				<Col span={8}>
					<p>IP： {ip ? ip : '-'}</p>
					<p>开奖号码： {opencode ? opencode : '-'}</p>
					<p>投注号码：</p>
					<InputTextarea minRows={7} value={betcontent} disabled />
				</Col>
			</Row>
		);
	}

	_renderTable(type) {
		const {
			_getTableColumns,
			_renderExpandRow,
		} = this;
		const {
			hasPagination,
			isLoading,
			bettingRecords,
			onTableChange,
			paginationProps,
		} = this.props;
		const tableConfig = getTableConfig(type);
		const {
			columnNameList,
			hasExpandRow,
		} = tableConfig;

		let expandedRowRender = null;

		if (hasExpandRow) {
			expandedRowRender = function(record) { return _renderExpandRow(record); };
		}

		return (
			<Table
				rowKey="id"
				className="betting-table"
				isLoading={isLoading}
				dataSource={bettingRecords}
				hasPagination={hasPagination}
				paginationProps={paginationProps}
				columns={_getTableColumns(columnNameList, type)}
				expandedRowRender={expandedRowRender}
				onTableChange={onTableChange}
			/>
		);
	}

	render() {
		return this._renderTable(this.props.gameType);
	}
}

GeneralBettingRecordTable.propTypes = BettingRecordTablePropTypes;
GeneralBettingRecordTable.defaultProps = defaultProps;

export default GeneralBettingRecordTable;
