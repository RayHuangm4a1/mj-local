import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { convertDateStringToTimestamp, } from '../../lib/moment-utils';
import { Table, TextButton, } from 'ljit-react-components';
const ColumnDefinitionEnums = {
	CARD_ID: 'cardId',
	AMOUNT: 'amount',
	FEE_AND_BANKFEE: 'feeAndBankfee',
	APPLY_AT: 'applyAt',
	CONFIRM_AT: 'confirmAt',
	STATUS: 'status',
	ADMINISTRATOR: 'administrator',
};
const {
	CARD_ID,
	AMOUNT,
	FEE_AND_BANKFEE,
	APPLY_AT,
	CONFIRM_AT,
	STATUS,
	ADMINISTRATOR,
} = ColumnDefinitionEnums;

const columnsDefinitionMap = {
	[CARD_ID]: {
		title: '银行卡号',
		dataIndex: 'cardId',
		sorter: (prev, next) => prev.cardId.localeCompare(next.cardId),
	},
	[AMOUNT]: {
		title: '取款金额',
		dataIndex: 'amount',
		sorter: (prev, next) => prev.amount - next.amount,
	},
	[FEE_AND_BANKFEE]: {
		title: '手续费/银行手续费',
		render: (record) => `${record.fee}/${record.bankFee}`,
	},
	[APPLY_AT]: {
		title: '申请日期',
		dataIndex: 'applyAt',
		sorter: (prev, next) => convertDateStringToTimestamp(prev.applyAt) - convertDateStringToTimestamp(next.applyAt),
	},
	[CONFIRM_AT]: {
		title: '确认日期',
		dataIndex: 'confirmAt',
		sorter: (prev, next) => convertDateStringToTimestamp(prev.confirmAt) - convertDateStringToTimestamp(next.confirmAt),
	},
	[STATUS]: {
		title: '状态',
		dataIndex: 'status',
	},
	[ADMINISTRATOR]: {
		title: '操作者',
		dataIndex: 'administrator',
	}
};

const propTypes = {
	dataSource: PropTypes.arrayOf(PropTypes.shape({
		bankAccount: PropTypes.string,
		cardId: PropTypes.string,
		name: PropTypes.string,
		bank: PropTypes.string,
		bankBranch: PropTypes.string,
		amount: PropTypes.number,
		fee: PropTypes.number,
		feePoint: PropTypes.number,
		bankFee: PropTypes.number,
		confirmAmount: PropTypes.number,
		unConfirmAmount: PropTypes.number,
		applyAt: PropTypes.string,
		confirmAt: PropTypes.string,
		status: PropTypes.string,
		comments: PropTypes.string,
		administrator: PropTypes.string,
		iconFileList: PropTypes.array,
	})),
	onClickDetails: PropTypes.func,
	onClickConfirmDeposit: PropTypes.func,
	onClickCancelDeposit: PropTypes.func,
	className: PropTypes.string,
	hasPagination: PropTypes.bool,
	isDepositOperationDisabled: PropTypes.bool,
};
const defaultProps = {
	dataSource: [],
	onClickDetails: () => {},
	onClickConfirmDeposit: () => {},
	onClickCancelDeposit: () => {},
	hasPagination: false,
	isDepositOperationDisabled: false,
};
// TODO get correct StatusEnums
const UNCONFIRMED = "待确认";

class PayCompanyTable extends Component {
	constructor() {
		super();

		this._renderOperationElements = this._renderOperationElements.bind(this);
		this._renderColumns = this._renderColumns.bind(this);
		this._renderOperations = this._renderOperations.bind(this);
	}
	_renderOperationElements(record, index) {
		const { onClickConfirmDeposit, onClickCancelDeposit } = this.props;

		return (
			<React.Fragment>
				<TextButton
					text="确认出款"
					onClick={() => onClickConfirmDeposit(record, index)}
				/>
				<TextButton
					text="取消出款"
					onClick={() => onClickCancelDeposit(record, index)}
				/>
			</React.Fragment>
		);
	}
	_renderColumns(columnList) {
		return columnList.map((column) => {
			const columnDefinition = columnsDefinitionMap[column];
			
			return columnDefinition;
		});
	}
	_renderOperations() {
		const { onClickDetails, isDepositOperationDisabled, } = this.props;
		const { _renderOperationElements } = this;

		return {
			title: '操作',
			render: (record, index) => {
				if (isDepositOperationDisabled) {
					return (
						<TextButton
							text="詳情"
							onClick={() => onClickDetails(record, index)}
						/>
					);
				} else {
					// TODO get correct status
					const isShowingDepositAction = (record.status === UNCONFIRMED);

					return (
						<div style={{ display: 'flex', flexDirection: 'column', }}>
							<TextButton
								text="詳情"
								onClick={() => onClickDetails(record, index)}
							/>
							{isShowingDepositAction ? _renderOperationElements(record, index) : null }
						</div>
					);
				}
			}
		};
	}
	render() {
		const {
			className,
			dataSource,
			hasPagination,
			isDepositOperationDisabled,
		} = this.props;
		const { _renderColumns, _renderOperations, } = this;
		const columnList = getRenderColumnList(isDepositOperationDisabled);
		const mainColumns = _renderColumns(columnList);
		const actions = _renderOperations();
		const columns = [].concat(mainColumns, actions);

		return (
			<Table
				className={className}
				rowKey="_id"
				columns={columns}
				dataSource={dataSource}
				hasPagination={hasPagination}
			/>
		);
	}
}

PayCompanyTable.propTypes = propTypes;
PayCompanyTable.defaultProps = defaultProps;

export default PayCompanyTable;

function getRenderColumnList(isDepositOperationDisabled) {
	const defaultColumn = [
		CARD_ID,
		AMOUNT,
		FEE_AND_BANKFEE,
		APPLY_AT,
		CONFIRM_AT,
		STATUS,
	];

	if (isDepositOperationDisabled) {
		return defaultColumn;
	} else {
		return [ ...defaultColumn, ADMINISTRATOR ];
	}
}
