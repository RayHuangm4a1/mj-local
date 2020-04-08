import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
	Table,
} from 'ljit-react-components';
import InputNumberCell from './input-number-cell';
import NumberCell from './number-cell';
import './style.styl';

const propTypes = {
	className: PropTypes.string,
	traceBettings: PropTypes.arrayOf(PropTypes.shape({
		index: PropTypes.number,
		multiple: PropTypes.number,
		amount: PropTypes.number,
		reward: PropTypes.number,
		accumulation: PropTypes.number,
		profit: PropTypes.number,
		profitRate: PropTypes.number,
	})),
	hasProfitColumn: PropTypes.bool,
	onChangeMultiple: PropTypes.func,
};

const defaultProps = {
	traceBettings: [],
	hasProfitColumn: false,
	onChangeMultiple: () => {},
};

const PREFIX_CLASS = 'trace-table';

class TraceTable extends Component {
	constructor() {
		super();

		this._getColumns = this._getColumns.bind(this);
	}

	_getColumns() {
		const { hasProfitColumn, onChangeMultiple, } = this.props;

		let columns = [{
			title: '期号',
			dataIndex: 'index',
			render: (index) => <div>第［<span>{index}</span>］期</div>,
		},{
			title: '倍数',
			dataIndex: 'multiple',
			render: (value, record, index) => {
				return (
					<InputNumberCell
						className={`${PREFIX_CLASS}__input-number-cell`}
						data={value}
						index={index}
						onChangeCell={onChangeMultiple}
					/>
				);
			},
		},{
			title: '金额',
			dataIndex: 'amount',
			render: (index) => <NumberCell data={index} className={`${PREFIX_CLASS}__number-cell`} />,
		},{
			title: '奖金',
			dataIndex: 'reward',
			render: (index) => <NumberCell data={index} className={`${PREFIX_CLASS}__number-cell`} />,
		},{
			title: '当前投注金额',
			dataIndex: 'accumulation',
			render: (index) => <NumberCell data={index} className={`${PREFIX_CLASS}__number-cell`} />,
		}];

		if (hasProfitColumn) {
			columns.push({
				title: '预期盈利金额',
				dataIndex: 'profit',
				render: (index) => <NumberCell data={index} className={`${PREFIX_CLASS}__number-cell`}/>,
			});
			columns.push({
				title: '预期盈利率',
				dataIndex: 'profitRate',
				render: (index) => <NumberCell data={index} className={`${PREFIX_CLASS}__number-cell`} isPercent/>,
			});
		}
		return columns;
	}

	render() {
		const {
			className,
			traceBettings,
		} = this.props;
		const { _getColumns, } = this;

		return (
			<Table
				rowKey="index"
				className={cx(className, `${PREFIX_CLASS}`)}
				dataSource={traceBettings}
				columns={_getColumns()}
			/>
		);
	}
}

TraceTable.propTypes = propTypes;
TraceTable.defaultProps = defaultProps;

export default TraceTable;
