import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, LabelContent, InputNumber, } from 'ljit-react-components';
import { GameClassMap, } from '../utils';

const propTypes = {
	value: PropTypes.arrayOf(PropTypes.shape({
		gameClass: PropTypes.string,
		highestRebate: PropTypes.number,
		highestSalary: PropTypes.number,
		highestDividend: PropTypes.number,
	})),
	onChange: PropTypes.func,
};

const defaultProps = {
	onChange: () => {},
};

const inputNumberStyle = {
	width: '98px',
};

class SalaryEditInputTable extends Component {
	constructor() {
		super();
		this._handleChangeCellValue = this._handleChangeCellValue.bind(this);
	}

	_handleChangeCellValue(cellValue, record, prop) {
		const { value, onChange, } = this.props;
		const newRecord = Object.assign({}, record, { [prop]: cellValue });
		const newData = value.map(item => {
			if (item.key === record.key) {
				return newRecord;
			}
			return item;
		});

		onChange(newData);
	}

	render() {
		const { value, } = this.props;
		const { _handleChangeCellValue, } = this;

		return (
			<Table
				className="info-table"
				dataSource={value}
				columns={[{
					title: '分类',
					dataIndex: 'gameClass',
					key: 'gameClass',
					render: (gameClass) => <div>{GameClassMap[gameClass]}</div>,
				},{
					title: '最高工资',
					dataIndex: 'highestSalary',
					key: 'highestSalary',
					render: (highest, record) => (
						<LabelContent>
							<InputNumber
								formatType={InputNumber.FormatTypeEnums.PERCENTAGE}
								value={highest}
								step={0.1}
								style={inputNumberStyle}
								onChange={(event) => _handleChangeCellValue(event, record, 'highestSalary')}
							/>
						</LabelContent>
					),
				}]}
			/>
		);
	}
}

SalaryEditInputTable.propTypes = propTypes;
SalaryEditInputTable.defaultProps = defaultProps;

export default SalaryEditInputTable;
