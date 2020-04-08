import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
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
import { TraceRecordsPropTypes, } from '../../lib/prop-types-utils';

const TagStatusEnums = StatusTag.StatusEnums;

const TraceRecordStatusEnums = {
	NEW: 'new',
	DONE: 'done',
};

const {
	NEW,
	DONE,
} = TraceRecordStatusEnums;

const TraceStatusMap = {
	[NEW]: { tagStatus: TagStatusEnums.ERROR, text: '进行中' },
	[DONE]: { tagStatus: TagStatusEnums.SUCCESS, text: '已完成' },
};

const propTypes = {
	traceRecords: TraceRecordsPropTypes,
	isLoading: PropTypes.bool,
	hasAccountField: PropTypes.bool,
	hasPagination: PropTypes.bool,
	onShowTraceList: PropTypes.func,
	onDiscardTraceList: PropTypes.func,
};

const defaultProps = {
	traceRecords: [],
	isLoading: false,
	hasAccountField: true,
	hasPagination: false,
	onShowTraceList: () => {},
	onDiscardTraceList: () => {},
};

//public
const ColumnDefinitionEnums = {
	USERNAME: 'username',
	TIME: 'time',
	LOTTERY_NAME: 'lotteryName',
	PLAY: 'play',
	TRACE_TERM: 'traceIssue',
	AUTO_END: 'autoEnd',
	MODE: 'mode',
	STATUS: 'status',
	OPERATION: 'operation',
};

const { USERNAME, TIME, LOTTERY_NAME, PLAY, TRACE_TERM, AUTO_END, STATUS, OPERATION, } = ColumnDefinitionEnums;

function getRenderConfig(hasAccountField) {
	if (hasAccountField) {
		return {
			columns: [USERNAME, TIME, LOTTERY_NAME, PLAY, TRACE_TERM, AUTO_END, STATUS, OPERATION,]
		};
	}
	else {
		return {
			columns: [TIME, LOTTERY_NAME, PLAY, TRACE_TERM, AUTO_END, STATUS, OPERATION,]
		};
	}
}

class GeneralTraceRecordTable extends Component {
	constructor() {
		super();
		this._renderExpandRow = this._renderExpandRow.bind(this);
		this._renderColumns = this._renderColumns.bind(this);
	}

	_renderExpandRow(record = {}) {
		const {
			createdAt,
			username,
			lotteryName,
			name,
			weizhi,
			traceId,
			device,
			status,
			isTerminatedIfWin,
			amountPerBet = '-',
			amount = '-',
			totalIssues = '-',
			totalFinishedIssues = '-',
			rebate = '-',
		} = record;
		const displayCreateAt = formatDate(createdAt);
		const statusText = TraceStatusMap[status] ? TraceStatusMap[status].text : '-';
		const terminatedIfWinType = isTerminatedIfWin ? '中奖后停止' : '中奖后继续';

		return (
			<Row className="trace-expandrow">
				<Col span={8}>
					<p>帐号：{username ? username : '-'}</p>
					<p>彩种：{lotteryName ? lotteryName : '-'}</p>
					<p>玩法：{name ? name : '-'}</p>
					<p>位置： {weizhi ? weizhi : '-'}</p>
					<p>方案號：{traceId ? traceId : '-'}</p>
					<p>单注金额：<DecimalNumber data={amountPerBet} hasSeparator/></p>
					<p>总金额：<DecimalNumber data={amount} hasSeparator/></p>
					<p>追号期数：{totalIssues}</p>
					<p>下注时间：{displayCreateAt}</p>
				</Col>
				<Col span={8}>
					<p>完成期数：{totalFinishedIssues}</p>
					<p>奖金返点：{rebate}</p>
					<p>投注来源：{device ? device : '-'}</p>
					<p>追号类型：{terminatedIfWinType}</p>
					<p>状态：{statusText}</p>
				</Col>
				<Col span={8}>
					<p>投注号码：</p>
					<InputTextarea minRows={7} value={record.opencode} disabled/>
				</Col>
				<Col span={8}>
				</Col>
			</Row>
		);
	}

	_renderColumns(config) {
		const {
			onShowTraceList,
			onDiscardTraceList,
		} = this.props;

		const columnsDefinitionMap = {
			[USERNAME]: {
				title: '帐号',
				dataIndex: 'username',
				key: 'username',
			},
			[TIME]: {
				title: '下注时间',
				dataIndex: 'createdAt',
				key: 'createdAt',
			},
			[LOTTERY_NAME]: {
				title: '彩种',
				dataIndex: 'lotteryName',
				key: 'lotteryName',
			},
			[PLAY]: {
				title: '玩法',
				dataIndex: 'name',
				key: 'name',
			},
			[TRACE_TERM]: {
				title: '开始追号期数',
				dataIndex: 'traceIssue',
				key: 'traceIssue',
				render: (traceIssue) => (
					<div className="trace-issue">
						<Row><Col span={22}>{traceIssue[0]}</Col><Col span={2}>~</Col></Row>
						<Row><Col span={22}>{traceIssue[1]}</Col><Col span={2}></Col></Row>
					</div>
				),
			},
			[AUTO_END]: {
				title: '追号类型',
				dataIndex: 'isTerminatedIfWin',
				key: 'isTerminatedIfWin',
				render: (isTerminatedIfWin) => {
					const text = isTerminatedIfWin ? '中奖后停止' : '中奖后继续' ;

					return <span>{text}</span>;
				},
			},
			[STATUS]: {
				title: '状态',
				dataIndex: 'status',
				key: 'status',
				render: (status) => {
					const matchStatus = TraceStatusMap[status] ? TraceStatusMap[status] : {};
					const { tagStatus = '', text = '', } = matchStatus;

					return <StatusTag status={tagStatus} text={text} />;
				},
			},
			[OPERATION]: {
				title: '操作',
				dataIndex: '',
				key: '',
				render: (record) => {
					const shouldShowCancelButton = record.status === NEW;
					const renderButtons = [];

					if (shouldShowCancelButton) {
						renderButtons.push(
							<div key="cancel">
								<TextButton text="撤单" color={TextButton.TYPE_DANGER} onClick={() => onDiscardTraceList(record)}/>
							</div>
						);
					}
					renderButtons.push(
						<div style={{ minWidth: '56px' }} key="record">
							<TextButton text="追号列表" color={TextButton.TYPE_DEFAULT} onClick={() => onShowTraceList(record)}/>
						</div>
					);
					return renderButtons;
				},
			},
		};

		return config.columns.map((column) => {
			return columnsDefinitionMap[column];
		});
	}

	render() {
		const { hasAccountField , hasPagination, traceRecords, isLoading, } = this.props;
		const { _renderColumns, } = this;
		const columnConfig = getRenderConfig(hasAccountField);
		const dataSource = covertToFakeDataSource(traceRecords);

		return (
			<Fragment>
				<Table
					rowKey="id"
					isLoading={isLoading}
					dataSource={dataSource}
					columns={_renderColumns(columnConfig)}
					hasPagination={hasPagination}
					expandedRowRender={this._renderExpandRow}
				/>
			</Fragment>
		);
	}
}

// TODO: 先做此假資料轉換，等資料結構完整與串接API後就可以移除
function covertToFakeDataSource(traceRecords) {
	return traceRecords.map(function(traceRecord) {
		return ({
			...traceRecord,
			traceIssue: ['0163980000000752', '0163980000000758'],
		});
	});
}

GeneralTraceRecordTable.propTypes = propTypes;
GeneralTraceRecordTable.defaultProps = defaultProps;

export default GeneralTraceRecordTable;
