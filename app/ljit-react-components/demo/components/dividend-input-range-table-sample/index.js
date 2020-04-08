import React, { useState, } from 'react';
import DividendInputRangeTable from '../../../src/components/dividend-input-range-table';
import Button from '../../../src/components/button';

const { checkIsLastRowSelected, } = DividendInputRangeTable;

const DividendInputRangeTableComponent = () => {
	const [ tableData, setTableData, ] = useState([]);
	const [ isSaveable, setIsSaveable, ] = useState(false);

	const _handleSubmit = () => {
		if (isSaveable) {
			console.log(tableData);
		}
	};

	const _handleChangeTable = (tableData) => {
		setTableData(tableData);
		setIsSaveable(checkIsLastRowSelected(tableData));
	};

	return (
		<div>
			<DividendInputRangeTable
				tableData={tableData}
				onChange={_handleChangeTable}
			/>
			<Button
				onClick={_handleSubmit}
				disabled={!isSaveable}
			>
				Submit
			</Button>
		</div>
	);
};

export default DividendInputRangeTableComponent;
