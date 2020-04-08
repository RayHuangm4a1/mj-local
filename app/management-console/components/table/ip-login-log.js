import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, } from 'ljit-react-components';
import { convertDateStringToTimestamp, } from '../../lib/moment-utils';

const propTypes = {
	dataSource: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.string,
		ip: PropTypes.string,
		username: PropTypes.string,
		lastLoginAt: PropTypes.string,
		domain: PropTypes.string,
		nation: PropTypes.string,
		province: PropTypes.string,
		county: PropTypes.string,
	})),
	className: PropTypes.string,
	rowSelection: PropTypes.shape({
		selectedRowKeys: PropTypes.array,
		onChange: PropTypes.func,
	}),
	onTableChange: PropTypes.func,
};
const defaultProps = {
	dataSource: [],
	rowSelection: null,
	onTableChange:() => {},
};

class IpLoginLogTable extends Component {
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
			rowSelection,
		} = this.props;
		const columns = [{
			title:'登录IP位址',
			dataIndex:'ip',
			key:'ip',
		},{
			title:'登录帐号',
			dataIndex:'username',
			key:'username',
		},{
			title:'登录时间',
			dataIndex:'lastLoginAt',
			key:'lastLoginAt',
			sorter: (a, b) => convertDateStringToTimestamp(a.lastLoginAt) - convertDateStringToTimestamp(b.lastLoginAt)
		},{
			title:'来源网址',
			dataIndex:'domain',
			key:'domain',
		},{
			title:'国家',
			dataIndex:'nation',
			key:'nation',
		},{
			title:'省',
			dataIndex:'province',
			key:'province',
		},{
			title:'县市',
			dataIndex:'county',
			key:'county',
		},];

		return (
			<Table
				className={className}
				rowKey="_id"
				columns={columns}
				dataSource={dataSource}
				onTableChange={this._handleTableChange}
				alignType={Table.AlignTypeEnums.CENTER}
				rowSelection={rowSelection}
				hasPagination
			/>
		);
	}
}

IpLoginLogTable.propTypes = propTypes;
IpLoginLogTable.defaultProps = defaultProps;

export default IpLoginLogTable;
