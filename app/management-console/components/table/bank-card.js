import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Table, } from 'ljit-react-components';
import { convertDateStringToTimestamp, } from '../../lib/moment-utils';

const ModeEnums = {
	DEFAULT: 'default',
	SHOWING_OPERATOR: 'showingOperator',
};
const {
	DEFAULT,
	SHOWING_OPERATOR,
} = ModeEnums;

const ColumnDefinitionEnums = {
	USERNAME: 'username',
	BANK_NAME: 'bankName',
	BANK_CARD_NUMBER: 'bankCardNumber',
	OPERATING_TYPE: 'operatingType',
	CREATED_AT: 'createdAt',
	OPERATOR: 'operator',
	COMMENT: 'comment',
};

const {
	USERNAME,
	BANK_NAME,
	BANK_CARD_NUMBER,
	OPERATING_TYPE,
	CREATED_AT,
	OPERATOR,
	COMMENT,
} = ColumnDefinitionEnums;

const columnDefinitionMap = {
	[USERNAME]: {
		title: '姓名',
		dataIndex: 'username',
	},
	[BANK_NAME]: {
		title: '银行名称',
		dataIndex: 'bankName',
	},
	[BANK_CARD_NUMBER]: {
		title: '卡号',
		dataIndex: 'bankCardNumber',
	},
	[OPERATING_TYPE]: {
		title: '类型',
		dataIndex: 'operatingType',
		render: type => getOperatingTypeString(type),
	},
	[CREATED_AT]: {
		title: '时间',
		dataIndex: 'createdAt',
		sorter: (prev, next) => {
			return convertDateStringToTimestamp(prev.createdAt) - convertDateStringToTimestamp(next.createdAt);
		},
		sortDirections: ['descend', 'ascend'],
	},
	[OPERATOR]: {
		title: '操作者',
		dataIndex: 'operator',
	},
	[COMMENT]: {
		title: '备注',
		dataIndex: 'comment',
	},
};

const propTypes = {
	dataSource: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.string,
		logNumber: PropTypes.string,
		username: PropTypes.string,
		bankName: PropTypes.string,
		bankCardNumber: PropTypes.string,
		createdAt: PropTypes.string,
		operatingType: PropTypes.string,
		operator: PropTypes.string,
		comment: PropTypes.string,
	})),
	className: PropTypes.string,
	onTableChange: PropTypes.func,
	hasPagination: PropTypes.bool,
	mode: PropTypes.oneOf([
		DEFAULT,
		SHOWING_OPERATOR,
	]),
};

const defaultProps = {
	mode: DEFAULT,
	dataSource: [],
	onTableChange: () => {},
	hasPagination: false,
};

class BankCardTable extends Component {
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
			mode
		} = this.props;
		const config = getColumnConfig(mode);
		const columns = this._renderColumns(config);

		return (
			<Table
				rowKey="_id"
				alignType={Table.AlignTypeEnums.CENTER}
				onChange={this._handleTableChange}
				dataSource={dataSource}
				columns={columns}
				className={cx('bank-card-table', className)}
				hasPagination={hasPagination}
			/>
		);
	}
}

BankCardTable.propTypes = propTypes;
BankCardTable.defaultProps = defaultProps;

BankCardTable.ModeEnums = ModeEnums;

function getColumnConfig(mode) {
	if (mode === SHOWING_OPERATOR) {
		return {
			columns: [
				USERNAME,
				BANK_NAME,
				BANK_CARD_NUMBER,
				OPERATING_TYPE,
				CREATED_AT,
				OPERATOR,
				COMMENT,
			]
		};
	} else if (mode === DEFAULT) {
		return {
			columns: [
				USERNAME,
				BANK_NAME,
				BANK_CARD_NUMBER,
				OPERATING_TYPE,
				CREATED_AT,
				COMMENT,
			]
		};
	}
}

function getOperatingTypeString(operatingType) {
	let result;

	if (operatingType === '1') {
		result = (<div style={{ color: '#52c41a', }}>新增</div>);
	}
	if (operatingType === '0') {
		result = (<div style={{ color: '#f5222d', }}>删除</div>);
	}
	return result;
}

export default BankCardTable;
