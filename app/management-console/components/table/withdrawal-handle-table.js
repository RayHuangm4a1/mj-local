import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import {
	Table,
	TextButton,
	StatusTag,
} from 'ljit-react-components';
import { DebitAccountPayStatusEnums, } from '../../lib/enums';
import {
	DATE_TIME_SECONDS,
	isDateValid,
	formatDate,
} from '../../lib/moment-utils';

const ColumnDefinitionEnums = {
	LEVEL: 'level',
	AMOUNT: 'amount',
	FEE: 'fee',
	STATUS: 'status',
	ADMINISTRATOR: 'administrator',
	HANDLE_AT: 'handleAt',
	MEMBER: 'member',
	APPLY_AT: 'applyAt',
	CONFIRMED_AT: 'confirmedAt',
};
const {
	LEVEL,
	AMOUNT,
	FEE,
	STATUS,
	ADMINISTRATOR,
	MEMBER,
	APPLY_AT,
	CONFIRMED_AT,
} = ColumnDefinitionEnums;
const {
	SUCCESS,
	ERROR,
	WARNING,
	PENDING,
} = StatusTag.StatusEnums;
const {
	UNCONFIRM,
	CONFIRM,
	CANCEL,
	FAIL,
	PROCESS,
	THIRD_PART_UNCONFIRM,
	THIRD_PART_PAY_FAIL,
} = DebitAccountPayStatusEnums;

const ConfirmStatusesMap = {
	[UNCONFIRM]: {
		status: PENDING,
		text: '待确认',
	},
	[CONFIRM]: {
		status: SUCCESS,
		text: '已出款',
	},
	[CANCEL]: {
		status: ERROR,
		text: '取消',
	},
	[FAIL]: {
		status: FAIL,
		text: '自动出款失败/代付公司出款失败',
	},
	[PROCESS]: {
		status: WARNING,
		text: '自动出款结果未知/代付公司出款处理中',
	},
	[THIRD_PART_UNCONFIRM]: {
		status: WARNING,
		text: '待第三方出款处理',
	},
	[THIRD_PART_PAY_FAIL]: {
		status: FAIL,
		text: '第三方出款失败',
	},
};
const columnsDefinitionMap = {
	[LEVEL]: {
		title: '层级',
		dataIndex: 'level',
	},
	[AMOUNT]: {
		title: '取款金额',
		dataIndex: 'amount',
		sorter: (a, b) => a.amount - b.amount,
	},
	[FEE]: {
		title: '手续费',
		dataIndex: 'fee',
		sorter: (a, b) => a.fee - b.fee,
	},
	[STATUS]: {
		title: '状态',
		dataIndex: 'status',
		render: function renderStatus(value) {
			const matchedStatus = ConfirmStatusesMap[value] ? ConfirmStatusesMap[value] : {};
			const {
				status,
				text,
			} = matchedStatus;

			return (
				<StatusTag
					status={status}
					text={text}
				/>
			);
		},
	},
	[ADMINISTRATOR]: {
		title: '操作者',
		dataIndex: 'administrator',
	},
	[APPLY_AT]: {
		title: '申请日',
		dataIndex: 'applyAt',
		sorter: (a, b) => a.applyAt - b.applyAt,
		render: value => (
			isDateValid(value) ? formatDate(value, DATE_TIME_SECONDS) : ''
		),
	},
	[CONFIRMED_AT]: {
		title: '确认日',
		dataIndex: 'confirmAt',
		sorter: (a, b) => a.confirmAt - b.confirmAt,
		render: value => (
			isDateValid(value) ? formatDate(value, DATE_TIME_SECONDS) : ''
		),
	},
	[MEMBER]: {
		title: '用户名',
		dataIndex: 'member',
	}
};

const propTypes = {
	dataSource: PropTypes.arrayOf(PropTypes.shape({
		level: PropTypes.string,
		member: PropTypes.string,
		cardId: PropTypes.string,
		amount: PropTypes.number,
		status: PropTypes.string,
		dama: PropTypes.number,
		fee: PropTypes.number,
		bankFee: PropTypes.number,
		administrator: PropTypes.string,
		handleAt: PropTypes.string,
		betDoneAmount: PropTypes.number,
		betNeededAmount: PropTypes.number,
		applyAt: PropTypes.string,
		confirmAt: PropTypes.string,
		forbidAutoPayReasons: PropTypes.arrayOf(PropTypes.string),
		comments: PropTypes.arrayOf(PropTypes.shape({
			_id: PropTypes.string,
			createdBy: PropTypes.shape({
				_id: PropTypes.string,
				username: PropTypes.string,
				type: PropTypes.number
			}),
			content: PropTypes.string,
			createAt: PropTypes.string,
			updateAt: PropTypes.string,
		})),
		lastComment: PropTypes.shape({
			_id: PropTypes.string,
			createdBy: PropTypes.shape({
				_id: PropTypes.string,
				username: PropTypes.string,
				type: PropTypes.number
			}),
			content: PropTypes.string,
			createAt: PropTypes.string,
		})
	})),
	onClickPayInfo: PropTypes.func,
	onClickAutoRemittance: PropTypes.func,
	onClickManualRemittance: PropTypes.func,
	onClickRejectHandle: PropTypes.func,
	className: PropTypes.string,
	hasPagination: PropTypes.bool,
	isRemittanceOperationDisabled: PropTypes.bool,
};
const defaultProps = {
	dataSource: [],
	hasPagination: true,
	isRemittanceOperationDisabled: false,
	onClickPayInfo: () => {},
	onClickAutoRemittance: () => {},
	onClickManualRemittance: () => {},
	onClickRejectHandle: () => {},
};

class WithdrawalHandleTable extends Component {
	constructor() {
		super();

		this._renderGridExpandDescription = this._renderGridExpandDescription.bind(this);
		this._renderOperationElements = this._renderOperationElements.bind(this);
		this._renderColumns = this._renderColumns.bind(this);
		this._renderOperations = this._renderOperations.bind(this);	
	}

	_renderGridExpandDescription(record) {
		const {
			dama,
			bankFee,
			bank,
			bankBranch,
			forbidAutoPayReasons,
		} = record;

		return (
			<div>
				<p>{`用户打码量：${dama}`}</p>
				<p>{`银行手续量：${bankFee}`}</p>
				<p>{`银行名称：${bank}`}</p>
				<p>{`支行名称：${bankBranch}`}</p>
				<p>{`禁止自动出款原因：${forbidAutoPayReasons.join('/')}`}</p>
			</div>
		);
	}

	_renderOperationElements(record, index) {
		const {
			onClickAutoRemittance,
			onClickManualRemittance,
			onClickRejectHandle,
		} = this.props;

		return (
			<div style={{ display: 'flex', flexDirection: 'column', }}>
				<TextButton
					text="自动汇款"
					onClick={() => onClickAutoRemittance(record, index)}
				/>
				<TextButton
					text="手动汇款"
					onClick={() => onClickManualRemittance(record, index)}
				/>
				<TextButton
					text="拒绝"
					color="danger"
					onClick={() => onClickRejectHandle(record, index)}
				/>
			</div>
		);
	}
	_renderColumns(columnList) {
		return columnList.map((column) => {
			const columnDefinition = columnsDefinitionMap[column];
			
			return columnDefinition;
		});
	}
	_renderOperations() {
		const { onClickPayInfo, } = this.props;
		const { _renderOperationElements, } = this;

		return {
			title: '操作',
			render: (record, index) => {
				const { status } = record;

				// TODO get correct status
				return (
					<Fragment>
						{status === CONFIRM ? null : _renderOperationElements(record, index)}
						<TextButton
							text="详情"
							onClick={() => onClickPayInfo(record, index)}
						/>
					</Fragment>
				);
			},
		};
	}
	render() {
		const {
			dataSource,
			className,
			hasPagination,
		} = this.props;
		const {
			_renderGridExpandDescription,
			_renderColumns,
			_renderOperations,
		} = this;
		const fixedColumns = [
			LEVEL,
			MEMBER,
			AMOUNT,
			FEE,
			STATUS,
			ADMINISTRATOR,
			APPLY_AT,
			CONFIRMED_AT,
		];

		const mainColumns = _renderColumns(fixedColumns);
		const actions = _renderOperations();
		const columns = [].concat(mainColumns, actions);

		return (
			<Table
				rowKey="_id"
				className={className}
				columns={columns}
				dataSource={dataSource}
				hasPagination={hasPagination}
				paginationProps={{
					showSizeChanger: false,
					totalRenderer: () => {},
				}}
				expandedRowRender={(record) => _renderGridExpandDescription(record)}
			/>
		);
	}
}

WithdrawalHandleTable.propTypes = propTypes;
WithdrawalHandleTable.defaultProps = defaultProps;

export default WithdrawalHandleTable;
