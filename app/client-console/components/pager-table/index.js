import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Table, } from 'ljit-react-components';
import './style.styl';

const PREFIX_CLASS = 'pager-table';
const SizeEnums = {
	NORMAL: 'normal',
	SMALL: 'small',
	X_SMALL: 'x-small',
};
const {
	NORMAL,
	SMALL,
	X_SMALL,
} = SizeEnums;
const SizeMap = {
	[NORMAL]: 398,
	[SMALL]: 379,
	[X_SMALL]: 356,
};

const propTypes = {
	className: PropTypes.string,
	dataSource: PropTypes.arrayOf(PropTypes.object),
	columns: PropTypes.arrayOf(PropTypes.shape({
		dataIndex: PropTypes.string,
		title: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.node,
		]),
		render: PropTypes.func,
	})).isRequired,
	rowKey: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.func,
	]),
	isLoading: PropTypes.bool,
	hasPagination: PropTypes.bool,
	paginationProps: PropTypes.shape({
		current: PropTypes.number,
		pageSize: PropTypes.number,
		total: PropTypes.number,
		totalRenderer: PropTypes.func,
		pageSizeOptions: PropTypes.arrayOf(PropTypes.string),
		pageSizeOptionText: PropTypes.string,
		showQuickJumper: PropTypes.bool,
		showSizeChanger: PropTypes.bool,
	}),
	onTableChange: PropTypes.func,
	size: PropTypes.oneOf(Object.values(SizeEnums).concat('')),
	rowSelection: PropTypes.object,
};

const defaultProps = {
	size: NORMAL,
	hasPagination: true,
};

const PagerTable = ({
	className,
	dataSource,
	columns,
	rowKey,
	isLoading,
	hasPagination,
	paginationProps,
	onTableChange,
	size,
	rowSelection,
}) => {
	const scrollY = SizeMap[size];

	return (
		<Table
			className={cx(PREFIX_CLASS, className, `${PREFIX_CLASS}__${size}`)}
			dataSource={dataSource}
			columns={columns}
			rowKey={rowKey}
			isLoading={isLoading}
			hasPagination={hasPagination}
			paginationProps={{
				...{
					showQuickJumper: true,
					showSizeChanger: false,
				},
				... paginationProps,
			}}
			onTableChange={onTableChange}
			scroll={{ y: scrollY }}
			rowSelection={rowSelection}
		/>
	);
};


PagerTable.propTypes = propTypes;
PagerTable.defaultProps = defaultProps;
PagerTable.SizeEnums = SizeEnums;

export default PagerTable;
