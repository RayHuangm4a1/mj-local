import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, } from 'ljit-react-components';
import { convertDateStringToTimestamp, } from '../../lib/moment-utils';

const propTypes = {
	dataSource: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.string,
		numbering: PropTypes.string,
		logAt: PropTypes.string,
		content: PropTypes.string,
		operator: PropTypes.string,
	})),
	className: PropTypes.string,
	onTableChange: PropTypes.func,
	isShowingOperator: PropTypes.bool,
};
const defaultProps = {
	dataSource: [],
	onTableChange: () => {},
	isShowingOperator: true,
};

class BackstageLogTable extends Component {
	constructor() {
		super();

		this._handleTableChange = this._handleTableChange.bind(this);
	}
	_handleTableChange(pagination, filters, sorter, extra) {
		this.props.onTableChange();
	}

	render() {
		const {
			dataSource,
			className,
			isShowingOperator,
		} = this.props;
		const operatorColumn = {
			title:'操作者',
			dataIndex:'operator',
			key:'operator',
		};
		const columns = [{
			title:'编号',
			dataIndex:'numbering',
			key:'numbering',
			sorter: (prev, next) => {
				return prev.numbering - next.numbering;
			},
		},{
			title:'时间',
			dataIndex:'logAt',
			key:'logAt',
			sorter: (prev, next) => {
				return convertDateStringToTimestamp(prev.logAt) - convertDateStringToTimestamp(next.logAt);
			},
		},{
			title:'内容',
			dataIndex:'content',
			key:'content',
		},];

		if (isShowingOperator) {
			columns.push(operatorColumn);
		}

		return (
			<Table
				className={className}
				rowKey="_id"
				columns={columns}
				dataSource={dataSource}
				onTableChange={this._handleTableChange}
				alignType={Table.AlignTypeEnums.CENTER}
				hasPagination
			/>
		);
	}
}

BackstageLogTable.propTypes = propTypes;
BackstageLogTable.defaultProps = defaultProps;

export default BackstageLogTable;
