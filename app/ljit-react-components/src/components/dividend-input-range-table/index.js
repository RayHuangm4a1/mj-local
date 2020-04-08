import React, { useEffect, } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import LabelContent from '../label-content';
import InputNumber from '../input-number';
import InputDynamicTable from '../input-dynamic-table';
import CheckBox from '../checkbox';
import cx from 'classnames';
import './style.styl';

const PREFIX_CLASS = 'ljit-dividend-table-form';
const TABLE_NAME= 'dividend-table';
const DEFAULT_MAX_ROW = 15;
const DEFAULT_MAX_AMOUNT = 10000;

const getDefaultRowData = (rowKey, uuid) => ({ [rowKey]: uuid, ratio: 0, amount: 0, });

export const getDefaultData = (rowKey) => [
	getDefaultRowData(rowKey, uuid()),
	getDefaultRowData(rowKey, uuid()),
];

const propTypes = {
	tableData: PropTypes.arrayOf(PropTypes.shape({
		amount: PropTypes.number,
		ratio: PropTypes.number,
	})),
	maxRow: PropTypes.number,
	maxAmount: PropTypes.number,
	className: PropTypes.string,
	onChange: PropTypes.func,
	rowKey: PropTypes.string,
};
const defaultProps = {
	tableData: getDefaultData('id'),
	className: '',
	maxRow: DEFAULT_MAX_ROW,
	maxAmount: DEFAULT_MAX_AMOUNT,
	// Function(tabData: array)
	onChange: () => {},
	rowKey: 'id',
};

const DividendInputRangeTable = ({
	tableData,
	className,
	maxAmount,
	maxRow,
	rowKey,
	onChange,
}) => {
	const dataLength = tableData.length;
	const isLastRowSelected = checkIsLastRowSelected(tableData, maxAmount, maxRow);

	useEffect(() => {
		if (dataLength === 0) {
			_handleChangeTable(getDefaultData(rowKey));
		} else if (dataLength === 1) {
			let newTableData = tableData.slice();

			newTableData.unshift(getDefaultRowData);
			_handleChangeTable(newTableData);
		}
	}, [dataLength,]);

	function _handleChangeTable(tableData) {
		let updatedTableData = [];

		tableData.forEach((rowdata, index, array) => {
			const currentMaxAmount = maxAmount - array.length + index + 1;
			const showingAmount = rowdata.amount >= currentMaxAmount ? currentMaxAmount : rowdata.amount;
			const previousRow = updatedTableData[index - 1];
			const previousAmount = previousRow ? previousRow.amount : 0;

			updatedTableData.push({
				[rowKey]: rowdata.key || rowdata[rowKey] || index,
				ratio: rowdata.ratio ? rowdata.ratio : 0,
				amount: showingAmount && showingAmount > previousAmount ? showingAmount : previousAmount + 1,
			});
		});

		onChange(updatedTableData);
	}

	const _renderIdField = (record, rowIndex, onChange) => {
		if (rowIndex < dataLength - 1) {
			return <div>{rowIndex + 1}</div>;
		} else {
			return (
				<LabelContent
					validateStatus={isLastRowSelected ? LabelContent.ValidateStatusEnums.SUCCESS : LabelContent.ValidateStatusEnums.ERROR}
					helpMessage={isLastRowSelected ? null : '分红上限为必填'}
				>
					<CheckBox
						value={isLastRowSelected}
						onChange={() => {
							onChange('amount', isLastRowSelected ? 0 : maxAmount, rowIndex);
						}}
					>分红上限</CheckBox>
				</LabelContent>
			);
		}
	};
	const _renderAmountField = (record, rowIndex, onChange) => {
		const isLatestData = dataLength === rowIndex + 1;
		const isShowMaxText = isLastRowSelected && isLatestData;
		const minAmount = tableData[rowIndex - 1] ? tableData[rowIndex - 1].amount: 0;

		const inputNumber = (
			<InputNumber
				value={record.amount}
				min={minAmount + 1}
				onChange={value => {
					onChange('amount', value, rowIndex);
				}}
			/>
		);
		const maxText = <div>以上</div>;

		return (
			<div className={`${PREFIX_CLASS}__range-input-wrapper`}>
				<div>{minAmount}</div>
				<div>{isShowMaxText ? null: '-'}</div>
				{ isShowMaxText ? maxText : inputNumber }
			</div>
		);
	};
	const _renderRatioField = (record, rowIndex, onChange) => (
		<InputNumber
			value={record.ratio}
			min={0}
			onChange={value => onChange('ratio', value, rowIndex)}
		/>
	);

	return (
		<InputDynamicTable
			className={cx(PREFIX_CLASS, className)}
			tableName={TABLE_NAME}
			rowKey={rowKey}
			columns={[
				{
					title: '序号',
					width: '30%',
					dataIndex: 'id',
					renderField: _renderIdField,
				},
				{
					title: '周期总量(万)',
					width: '30%',
					dataIndex: 'amount',
					renderField: _renderAmountField,
				},
				{
					title: '分红比率(％)',
					dataIndex: 'ratio',
					renderField: _renderRatioField,
				},
			]}
			onChange={_handleChangeTable}
			value={tableData}
			hasRemoveButton={dataLength > 2}
			isShowOnlyLastRemovingButton={true}
			isAddingRowButtonDisabled={isLastRowSelected}
		/>
	);
};

DividendInputRangeTable.propTypes = propTypes;
DividendInputRangeTable.defaultProps = defaultProps;
DividendInputRangeTable.checkIsLastRowSelected = checkIsLastRowSelected;

export default DividendInputRangeTable;

function checkIsLastRowSelected(tableData, maxAmount = DEFAULT_MAX_AMOUNT, maxRow = DEFAULT_MAX_ROW) {
	const lastRowDataIndex = tableData.length - 1;
	const lastRowData = tableData[lastRowDataIndex];
	const isLastRowMaxDataLimit = lastRowDataIndex >= maxRow - 1;
	const isLastRowMaxAmount = lastRowData ? lastRowData.amount >= maxAmount : false;

	return (isLastRowMaxDataLimit || isLastRowMaxAmount);
}
