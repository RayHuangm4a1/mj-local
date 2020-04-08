import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Table,
	TableEllipsisText,
} from 'ljit-react-components';
import { convertDateStringToTimestamp, } from '../../lib/moment-utils';

const ModeEnums = {
	SHOWING_USER_NUMBER: 'showingUserNumber',
	SHOWING_OPERATOR: 'showingOperator',
};

const {
	SHOWING_USER_NUMBER,
	SHOWING_OPERATOR,
} = ModeEnums;

const ColumnDefinitionEnums = {
	USER_NUMBER: 'userNumber',
	ACTION_TYPE: 'actionType',
	APPLIED_IP: 'appliedIp',
	SERVER: 'server',
	LOG_AT: 'logAt',
	OPERATOR: 'operator',
	COMMENT: 'comment',
};

const {
	USER_NUMBER,
	ACTION_TYPE,
	APPLIED_IP,
	SERVER,
	LOG_AT,
	OPERATOR,
	COMMENT,
} = ColumnDefinitionEnums;

const columnDefinitionMap = {
	[USER_NUMBER]: {
		title: '会员编号',
		dataIndex: 'userNumber',
	},
	[ACTION_TYPE]: {
		title: '操作类型',
		dataIndex: 'actionType',
	},
	[APPLIED_IP]: {
		title: '登录IP位址',
		dataIndex: 'appliedIp',
	},
	[SERVER]: {
		title: '服务器信息',
		dataIndex: 'server',
	},
	[LOG_AT]: {
		title: '时间',
		dataIndex: 'logAt',
		sorter: (prev, next) => convertDateStringToTimestamp(prev.logAt) - convertDateStringToTimestamp(next.logAt),
	},
	[OPERATOR]: {
		title: '操作者',
		dataIndex: 'operator',
	},
	[COMMENT]: {
		title: '描述',
		dataIndex: 'comment',
		width: '250px',
		render: (record) => (
			<TableEllipsisText
				text={record}
				positionToRight={-70}
				tooltipPosition={TableEllipsisText.TooltipPositionEnums.TOP}
			/>
		),
	},
};

const propTypes = {
	dataSource: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.string,
		userNumber: PropTypes.string,
		actionType: PropTypes.string,
		appliedIp: PropTypes.string,
		server: PropTypes.string,
		logAt: PropTypes.string,
		operator: PropTypes.string,
		comment: PropTypes.string,
	})),
	className: PropTypes.string,
	onTableChange: PropTypes.func,
	hasPagination: PropTypes.bool,
	mode: PropTypes.oneOf([
		SHOWING_OPERATOR,
		SHOWING_USER_NUMBER,
	])
};
const defaultProps = {
	mode: SHOWING_OPERATOR,
	hasPagination: true,
	dataSource: [],
	onTableChange: () => {}
};

class OperationLogTable extends Component {
	constructor() {
		super();

		this._handleTableChange = this._handleTableChange.bind(this);
		this._renderColumns = this._renderColumns.bind(this);
	}
	_handleTableChange() {
		this.props.onTableChange();
	}
	_renderColumns(config) {
		return config.columns.map((column) => {
			const columnDefinition = columnDefinitionMap[column];
			
			return columnDefinition;
		});
	}
	render() {
		const {
			dataSource,
			className,
			hasPagination,
			mode,
		} = this.props;
		const config = getColumnConfig(mode);
		const columns = this._renderColumns(config);

		return (
			<Table
				className={className}
				rowKey="_id"
				columns={columns}
				dataSource={dataSource}
				onChange={this._handleTableChange}
				alignType={Table.AlignTypeEnums.CENTER}
				hasPagination={hasPagination}
			/>
		);
	}
}

OperationLogTable.propTypes = propTypes;
OperationLogTable.defaultProps = defaultProps;

OperationLogTable.ModeEnums = ModeEnums;

export default OperationLogTable;


function getColumnConfig(mode = '') {
	if (mode === SHOWING_OPERATOR) {
		return {
			columns: [
				ACTION_TYPE,
				APPLIED_IP,
				SERVER,
				LOG_AT,
				OPERATOR,
				COMMENT,
			]
		};
	} else if (mode === SHOWING_USER_NUMBER) {
		return {
			columns: [
				USER_NUMBER,
				ACTION_TYPE,
				APPLIED_IP,
				SERVER,
				LOG_AT,
				COMMENT,
			]
		};
	}
}
