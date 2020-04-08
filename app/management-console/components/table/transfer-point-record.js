import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Table, StatusTag } from "ljit-react-components";
const ON_HOLD = 0;
const SUCCESS = 1;
const FAIL = 2;
const statusTextMap = {
	[ON_HOLD]: "待处理",
	[SUCCESS]: "成功",
	[FAIL]: "失败",
};
const StatusTagMap ={
	[ON_HOLD]: "warning",
	[SUCCESS]: "success",
	[FAIL]: "error",
};

const propTypes = {
	dataSource: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.string,
		username: PropTypes.string,
		time: PropTypes.string,
		platform: PropTypes.string,
		type: PropTypes.string,
		changeAmount: PropTypes.number,
		afterChangeAmount: PropTypes.number,
		tradeId: PropTypes.string,
		status: PropTypes.number,
		operator: PropTypes.string,
		comment: PropTypes.string,
	})),
	hasPagination: PropTypes.bool,
	hasUsername: PropTypes.bool,
};
const defaultProps = {
	hasPagination: false,
	hasUsername: true
};

class TransferPointRecordTable extends Component {
	constructor() {
		super();
	}

	render() {
		const {
			dataSource,
			hasPagination,
			hasUsername,
		} = this.props;
		const columns = [
			{
				title: '时间',
				dataIndex: 'time',
			}, {
				title: '平台',
				dataIndex: 'platform',
			}, {
				title: '类型',
				dataIndex: 'type',
			}, {
				title: '变动金额',
				dataIndex: 'changeAmount',
			}, {
				title: '变动后金额',
				dataIndex: 'afterChangeAmount',
			}, {
				title: '交易ID',
				dataIndex: 'tradeId',
			}, {
				title: '状态',
				dataIndex: 'status',
				render: (value) => (
					<StatusTag
						status={StatusTagMap[value]}
						text={statusTextMap[value]}
					/>
				)
			}, {
				title: '操作者',
				dataIndex: 'operator',
			}, {
				title: '备注',
				dataIndex: 'comment',
			}];

		if (hasUsername) {
			columns.unshift({
				title: '帐号',
				dataIndex: 'username',
			});
		}

		return (
			<Table
				rowKey="_id"
				columns={columns}
				dataSource={dataSource}
				hasPagination={hasPagination}
			/>
		);
	}
}

TransferPointRecordTable.propTypes = propTypes;
TransferPointRecordTable.defaultProps = defaultProps;

export default TransferPointRecordTable;
