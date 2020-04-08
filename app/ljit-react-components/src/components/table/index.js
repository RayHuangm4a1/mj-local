import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Table as AntdTable, } from 'antd';
import cloneDeep from 'lodash/cloneDeep';
import cx from 'classnames';
import './style.styl';

export const prefixClass = 'ljit-table';
export const DEFAULT_FIXED_COLUMN_WIDTH = 150;
export const DEFAULT_FIXED_SCROLL = 2000;
export const DEFAULT_PAGE_SIZE_OPTIONS = ['10', '20', '30', '40',];

const AlignTypeEnums = {
	LEFT: 'left',
	CENTER: 'center',
	RIGHT: 'right',
};
const { LEFT, CENTER, RIGHT, } = AlignTypeEnums;
const TableSizeEnums = {
	LARGE: 'default',
	MIDDLE: 'middle',
	SMALL: 'small',
};
const { LARGE, MIDDLE, SMALL, } = TableSizeEnums;

const propTypes = {
	dataSource: PropTypes.arrayOf(PropTypes.object),
	columns: PropTypes.arrayOf(PropTypes.shape({
		dataIndex: PropTypes.string.isRequired,
		title: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.node,
		]),
		render: PropTypes.func,
		width: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string,
		]),
		onCell: PropTypes.func,
		// cell-primary: blue text color
		// cell-danger: red text color
		className: PropTypes.oneOf([
			'cell-primary',
			'cell-danger',
		]),
	})).isRequired,
	alignType: PropTypes.oneOf([
		LEFT,
		CENTER,
		RIGHT,
	]),
	// string|Function(record):string
	rowKey: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.func,
	]),
	rowSelection: PropTypes.shape({
		columnTitle: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.node,
		]),
		getCheckboxProps: PropTypes.func,
		selectedRowKeys: PropTypes.arrayOf(PropTypes.string),
		type: PropTypes.oneOf([
			'checkbox',
			'radio',
		]),
		onChange: PropTypes.func,
		onSelect: PropTypes.func,
		onSelectAll: PropTypes.func,
	}),
	isShowingHeader: PropTypes.bool,
	className: PropTypes.string,
	isBordered: PropTypes.bool,
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
	fixedLeftColumnIndices: PropTypes.arrayOf(PropTypes.number),
	fixedRightColumnIndices: PropTypes.arrayOf(PropTypes.number),
	// Function(pagination, filters, sorter)
	onTableChange: PropTypes.func,
	scroll: PropTypes.shape({
		x: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string,
		]),
		y: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string,
		]),
	}),
	sorters: PropTypes.arrayOf(PropTypes.shape({
		dataIndex: PropTypes.string.isRequired,
		defaultSortOrder: PropTypes.oneOf([
			'ascend',
			'descend',
		]),
		sorter: PropTypes.func.isRequired,
		sortOrder: PropTypes.oneOf([
			'ascend',
			'descend',
			false,
		]),
	})),
	filters: PropTypes.arrayOf(PropTypes.shape({
		dataIndex: PropTypes.string.isRequired,
		onFilter: PropTypes.func,
		filteredValue: PropTypes.arrayOf(PropTypes.string),
		filters: PropTypes.arrayOf(PropTypes.shape({
			text: PropTypes.string,
			value: PropTypes.string,
			children: PropTypes.arrayOf(PropTypes.object),
		})).isRequired,
	})),
	// expend row like accordion or collapse
	isRowExpendAccordion: PropTypes.bool,
	// Function(record, index, indent, expanded):ReactNode
	expandedRowRender: PropTypes.func,
	size: PropTypes.oneOf([
		LARGE,
		MIDDLE,
		SMALL,
	]),
	/*
		customFilters 會接受一個陣列資料
		而資料中會傳入 [ <目前輸入的過濾資料>, <過濾的方法> ]
		目前輸入的過濾資料來源可能是 input, datepicker 等等
		在過濾的方法中接收，並對 record 完成過濾
		[
			[ filterValue, Function(filterValue, record):Boolean ],
			...
		]
	*/
	customFilters: PropTypes.arrayOf((propValue, key, componentName, location, propFullName) => {
		if (propValue[key]) {
			const [
				filterValue,
				customFilter,
			] = propValue[key];

			if (typeof customFilter !== 'function') {
				return new Error(
					'Invalid prop `' + propFullName + '.customFilter` supplied to' +
					' `' + componentName + '`. expected function.'
				);
			}
		}
	}),
};
const defaultProps = {
	alignType: CENTER,
	dataSource: [],
	columns: [],
	isShowingHeader: true,
	isBordered: false,
	hasPagination: false,
	paginationProps: {},
	isLoading: false,
	fixedLeftColumnIndices: [],
	fixedRightColumnIndices: [],
	onTableChange: () => {},
	isRowExpendAccordion: true,
	rowKey: 'key',
	rowSelection: null,
	size: SMALL,
};

class Table extends Component {
	static getDerivedStateFromProps(props, state) {
		const {
			paginationProps = {},
		} = props;

		if (paginationProps.current !== state.current) {
			return {
				...state,
				current: paginationProps.current,
			};
		}

		if (paginationProps.pageSize !== state.pageSize) {
			return {
				...state,
				pageSize: paginationProps.pageSize,
			};
		}
		return null;
	}

	constructor(props) {
		super(props);
		const {
			paginationProps = {},
		} = props;

		this.state = {
			current: paginationProps.current,
			pageSize: paginationProps.pageSize,
			expandedRowKeys: [],
		};

		this._getKey = this._getKey.bind(this);
		this._getPaginationProps = this._getPaginationProps.bind(this);
		this._handleShowPaginationTotal = this._handleShowPaginationTotal.bind(this);
		this._handleRowExpend = this._handleRowExpend.bind(this);
		this._handleChangeTable = this._handleChangeTable.bind(this);
	}

	_getKey(record) {
		const {
			rowKey,
		} = this.props;

		if (typeof rowKey === 'function') {
			return rowKey(record);
		}

		return record[rowKey];
	}

	_customFilter(dataSource = []) {
		const {
			customFilters,
		} = this.props;

		return dataSource.filter((record) => {
			let result = true;

			customFilters.forEach(([ value, customFilter, ]) => {
				if (result && value) {
					result = customFilter(value, record);
				}
			});

			return result;
		});
	}

	_handleShowPaginationTotal(total) {
		const {
			paginationProps = {},
		} = this.props;
		const {
			totalRenderer,
		} = paginationProps;

		if (typeof totalRenderer === 'function') {
			return totalRenderer(total);
		}

		return `共 ${total} 条`;
	}
	_getPaginationProps() {
		const {
			paginationProps = {},
		} = this.props;
		const {
			current,
			pageSize,
		} = this.state;
		const {
			pageSizeOptions,
			pageSizeOptionText,
		} = paginationProps;

		return {
			showSizeChanger: true,
			...paginationProps,
			current,
			pageSize,
			showTotal: this._handleShowPaginationTotal,
			pageSizeOptions: pageSizeOptions || DEFAULT_PAGE_SIZE_OPTIONS,
			locale: {
				//https://github.com/react-component/pagination/blob/master/src/locale/zh_CN.js
				items_per_page: pageSizeOptionText || '条/页',
				jump_to: '跳至',
				page: '頁',
			},
		};
	}

	_handleRowExpend(expanded, record) {
		const {
			isRowExpendAccordion,
		} = this.props;
		const key = this._getKey(record);

		let expandedRowKeys = (isRowExpendAccordion)
			? []
			: this.state.expandedRowKeys.slice();

		if (expanded) {
			expandedRowKeys.push(key);
		} else {
			expandedRowKeys = expandedRowKeys.filter(_key => _key !== key);
		}
		this.setState({ expandedRowKeys, });
	}

	_handleChangeTable(...args) {
		const {
			onTableChange,
		} = this.props;
		const [
			pagination,
		] = args;

		this.setState({
			current: pagination.current,
			pageSize: pagination.pageSize,
		});

		onTableChange(...args);
	}

	render() {
		const {
			rowKey,
			alignType,
			className,
			isShowingHeader,
			dataSource,
			isBordered,
			isLoading,
			scroll,
			hasPagination,
			fixedLeftColumnIndices,
			fixedRightColumnIndices,
			sorters,
			filters,
			expandedRowRender,
			rowSelection,
			size,
			customFilters,
		} = this.props;
		const {
			expandedRowKeys,
		} = this.state;

		let columns = cloneDeep(this.props.columns);
		let isScrollable = false;
		let fixedScrollX;

		// fixed list
		if (fixedLeftColumnIndices && fixedLeftColumnIndices.length) {
			fixedLeftColumnIndices.forEach((i) => {
				columns[i] = Object.assign({}, {
					fixed: 'left',
					width: DEFAULT_FIXED_COLUMN_WIDTH,
				}, columns[i]);
			});
			fixedScrollX = DEFAULT_FIXED_SCROLL;
			isScrollable = true;
		}
		if (fixedRightColumnIndices && fixedRightColumnIndices.length) {
			fixedRightColumnIndices.forEach((i) => {
				columns[i] = Object.assign({}, {
					fixed: 'right',
					width: DEFAULT_FIXED_COLUMN_WIDTH,
				}, columns[i]);
			});
			fixedScrollX = DEFAULT_FIXED_SCROLL;
			isScrollable = true;
		}

		if (typeof scroll !== 'undefined') {
			isScrollable = true;
		}

		// sorter
		if (sorters && sorters.length) {
			sorters.forEach((item) => {
				let index = columns.findIndex(x => x.dataIndex === item.dataIndex);

				if (columns[index]) {
					columns[index] = Object.assign({}, columns[index], item);
				}
			});
		}

		// filter
		if (filters && filters.length) {
			filters.forEach((item) => {
				let index = columns.findIndex(x => x.dataIndex === item.dataIndex);

				if (columns[index]) {
					columns[index] = Object.assign({}, columns[index], item);
				}
			});
		}

		const _dataSource = Array.isArray(customFilters) ? this._customFilter(dataSource) : dataSource;

		return (
			<AntdTable
				rowKey={rowKey}
				showHeader={isShowingHeader}
				dataSource={_dataSource}
				columns={columns}
				bordered={isBordered}
				loading={isLoading}
				pagination={hasPagination ? this._getPaginationProps() : false}
				className={cx(prefixClass, {
					[`${prefixClass}--bordered`]: isBordered === true,
					[`${prefixClass}--align-left`]: alignType === LEFT,
					[`${prefixClass}--align-center`]: alignType === CENTER,
					[`${prefixClass}--align-right`]: alignType === RIGHT,
				}, className)}
				onChange={this._handleChangeTable}
				scroll={(() => {
					if (isScrollable) {
						return Object.assign({}, {
							x: fixedScrollX,
						}, scroll);
					}
				})()}
				rowSelection={rowSelection}
				expandedRowKeys={expandedRowKeys}
				expandedRowRender={expandedRowRender}
				onExpand={this._handleRowExpend}
				locale={{ filterConfirm: '确定', filterReset: '重置', emptyText: '暂无数据', }}
				size={size}
			/>
		);
	}
}

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;
Table.AlignTypeEnums = AlignTypeEnums;
Table.TableSizeEnums = TableSizeEnums;

export default Table;
