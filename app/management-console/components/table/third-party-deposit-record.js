import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Table,
	TextButton,
	Divider,
	CheckBox,
} from 'ljit-react-components';
import {
	checkIsNewStatus
} from './utils';
import { StatusCell }  from './cells';
import { ConfirmStatuses, } from './constants';

const { Confirm } = StatusCell;

const propTypes = {
	dataSource: PropTypes.arrayOf(PropTypes.shape({
		orderId: PropTypes.string,
		paymentMethod: PropTypes.string,
		memberAccount: PropTypes.string,
		amount: PropTypes.number,
		bank: PropTypes.string,
		rechangeDate: PropTypes.string,
		verifyDate: PropTypes.string,
		status: PropTypes.oneOf(ConfirmStatuses.map(item => item.value)),
		serialNumber: PropTypes.string,
		fee: PropTypes.number,
		thirdPartyAccount: PropTypes.string,
		errorMessage: PropTypes.string,
		recivedCard: PropTypes.string,
		operator: PropTypes.string,
	})),
	className: PropTypes.string,
	hasPagination: PropTypes.bool,
	isShowingCheckbox: PropTypes.bool,
	isShowingOperations: PropTypes.bool,
	onClickConfirm: PropTypes.func,
	onClickCancel: PropTypes.func,
	onClickTitleCheckBox: PropTypes.func,
	onClickContentCheckBox: PropTypes.func,
	rowKey: PropTypes.string,
};
const defaultProps = {
	dataSource: [],
	hasPagination: true,
	isShowingCheckbox: false,
	isShowingOperations: false,
	onClickConfirm: () => {},
	onClickCancel: () => {},
	onClickTitleCheckBox: () => {},
	onClickContentCheckBox: () => {},
	rowKey: '_id'
};

class ThirdPartyDepositRecordTable extends Component {
	constructor() {
		super();
		this.state = {
			selectedTableRows: [],
			isSelectedAll: false,
		};

		this._getAllSelectedTableRows = this._getAllSelectedTableRows.bind(this);
		this._checkIsSelectAll = this._checkIsSelectAll.bind(this);
		this._handleClickTitleCheckBox = this._handleClickTitleCheckBox.bind(this);
		this._handleClickContentCheckBox = this._handleClickContentCheckBox.bind(this);
		this._renderExpandRow = this._renderExpandRow.bind(this);
		this._renderTitleCheckBox = this._renderTitleCheckBox.bind(this);
		this._renderSelectionColumn = this._renderSelectionColumn.bind(this);
		this._renderOperationColumn = this._renderOperationColumn.bind(this);
	}

	_getAllSelectedTableRows() {
		const { dataSource, rowKey } = this.props;
		const allSelectedTableRows = dataSource
			.filter(checkIsNewStatus)
			.map(item => item[rowKey]);

		return allSelectedTableRows;
	}
	_checkIsSelectAll() {
		const { selectedTableRows, } = this.state;
		const { _getAllSelectedTableRows } = this;
		const allSelectedTableRows = _getAllSelectedTableRows();
		const numberOfData = allSelectedTableRows.length;
		const numberOfSelected = selectedTableRows.length;
		const isSelectedAll = (numberOfSelected === numberOfData);

		return isSelectedAll;
	}
	_handleClickTitleCheckBox() {
		const { onClickTitleCheckBox } = this.props;
		const { selectedTableRows, } = this.state;
		const { _getAllSelectedTableRows, _checkIsSelectAll } = this;
		const allSelectedTableRows = _getAllSelectedTableRows();
		const isSelectedAll = _checkIsSelectAll();
		const updatedSelectTableRows = isSelectedAll ? [] : allSelectedTableRows;

		onClickTitleCheckBox(selectedTableRows);
		this.setState({ selectedTableRows: updatedSelectTableRows, });
	}
	_handleClickContentCheckBox(record) {
		const { onClickTitleCheckBox, rowKey } = this.props;
		const { selectedTableRows, } = this.state;
		const selectedRowKey = record[rowKey];

		let updatedSelectTableRows = [];

		if (selectedTableRows.indexOf(selectedRowKey) !== -1) {
			updatedSelectTableRows = selectedTableRows.filter(item => item !== selectedRowKey);
		} else {
			updatedSelectTableRows = [...selectedTableRows, selectedRowKey];
		}

		onClickTitleCheckBox(updatedSelectTableRows);
		this.setState({ selectedTableRows: updatedSelectTableRows, });
	}
	_renderExpandRow(record) {
		return (
			<div>
				<p>流水号：{record.serialNumber}</p>
				<p>手续费：{record.fee}</p>
				<p>第三方帐号：{record.thirdPartyAccount}</p>
				<p>錯誤訊息：{record.errorMessage}</p>
				<p>收款卡：{record.reciveCard}</p>
				<p>操作者：{record.operator}</p>
			</div>
		);
	}
	_renderTitleCheckBox() {
		const { _handleClickTitleCheckBox, _checkIsSelectAll, } = this;

		return (
			<CheckBox
				checked={_checkIsSelectAll()}
				onChange={_handleClickTitleCheckBox}
			/>
		);
	}
	_renderSelectionColumn() {
		const { _renderTitleCheckBox, _handleClickContentCheckBox, } = this;
		const { selectedTableRows, } = this.state;
		const { rowKey, } = this.props;

		return {
			title: _renderTitleCheckBox,
			dataIndex: 'selectedRowKey',
			render: (value, record) => {
				if (checkIsNewStatus(record)) {
					const selectedRowKey = record[rowKey];
					const isSelected = selectedTableRows.indexOf(selectedRowKey) !== -1;

					return (
						<CheckBox
							checked={isSelected}
							onChange={() => _handleClickContentCheckBox(record)}
						/>
					);
				}
			}
		};
	}
	_renderOperationColumn() {
		const { onClickConfirm, onClickCancel, } = this.props;

		return {
			title: '操作',
			render: (record, index) => {
				if (checkIsNewStatus(record)) {
					return (
						<div style={{ whiteSpace: 'nowrap', }}>
							<TextButton
								text="确认"
								onClick={() => onClickConfirm(record, index)}
							/>
							<Divider type="vertical"/>
							<TextButton
								text="取消"
								onClick={() => onClickCancel(record, index)}
							/>
						</div>
					);
				}
			}
		};
	}

	render() {
		const {
			dataSource,
			className,
			hasPagination,
			isShowingCheckbox,
			isShowingOperations,
			rowKey,
		} = this.props;
		const {
			_renderExpandRow,
			_renderSelectionColumn,
			_renderOperationColumn,
		} = this;

		const columns = [
			{
				title: '订单号',
				dataIndex: 'orderId',
			},{
				title: '支付方式',
				dataIndex: 'paymentMethod',
			},{
				title: '会员帐号',
				dataIndex: 'memberAccount',
			},{
				title: '充值金額',
				dataIndex: 'amount',
				sorter: (a, b) => a.amount - b.amount,
			},{
				title: '存入银行',
				dataIndex: 'bank',
			},{
				title: '充值日期',
				dataIndex: 'rechangeDate',
				sorter: (a, b) => a.rechangeDate - b.rechangeDate,
			},{
				title: '确认日期',
				dataIndex: 'verifyDate',
				sorter: (a, b) => a.verifyDate - b.verifyDate,
			},{
				title: '状态',
				dataIndex: 'status',
				render: (status) => <Confirm data={status}/>,
			},
		];

		if (isShowingCheckbox) {
			columns.unshift(_renderSelectionColumn());
		}
		if (isShowingOperations) {
			columns.push(_renderOperationColumn());
		}


		return (
			<Table
				// TODO use correct data key
				rowKey={rowKey}
				columns={columns}
				expandedRowRender={_renderExpandRow}
				dataSource={dataSource}
				className={className}
				hasPagination={hasPagination}
			/>
		);
	}
}

ThirdPartyDepositRecordTable.propTypes = propTypes;
ThirdPartyDepositRecordTable.defaultProps = defaultProps;

export default ThirdPartyDepositRecordTable;
