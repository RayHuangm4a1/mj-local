import React, { Component, } from 'react';
import Pagination from 'antd/lib/pagination';
import { shallow, mount, } from 'enzyme';
import {
	prefixClass,
	DEFAULT_FIXED_COLUMN_WIDTH,
	DEFAULT_FIXED_SCROLL,
	DEFAULT_PAGE_SIZE_OPTIONS,
} from '../components/table';

describe('Table', () => {
	let Table;

	beforeEach(() => {
		jest.doMock('antd/lib/table');
		Table = require('../components/table').default;
	});
	afterEach(() => {
		jest.unmock('antd/lib/table');
		Table = undefined;
	});

	it('handle default props', () => {
		const {
			alignType,
			dataSource,
			columns,
			isShowingHeader,
			isBordered,
			isLoading,
			hasPagination,
			fixedLeftColumnIndices,
			fixedRightColumnIndices,
			onTableChange,
			isRowExpendAccordion,
			rowKey,
			paginationProps,
			size,
		} = Table.defaultProps;

		expect(alignType).toEqual(Table.AlignTypeEnums.CENTER);
		expect(dataSource).toMatchObject([]);
		expect(columns).toMatchObject([]);
		expect(isShowingHeader).toEqual(true);
		expect(isBordered).toEqual(false);
		expect(isLoading).toEqual(false);
		expect(hasPagination).toEqual(false);
		expect(fixedLeftColumnIndices).toMatchObject([]);
		expect(fixedRightColumnIndices).toMatchObject([]);
		expect(onTableChange).toBeDefined();
		expect(onTableChange).toBeInstanceOf(Function);
		expect(isRowExpendAccordion).toEqual(true);
		expect(rowKey).toEqual('key');
		expect(paginationProps).toMatchObject({});
		expect(size).toBe('small');
	});

	it('should renders correctly', () => {
		const wrapper = shallow(
			<Table
				isBordered
				rowKey="_id"
				dataSource={[
					{ _id: '1', column1: 'a', column2: 'a', },
					{ _id: '2', column1: 'b', column2: 'b', },
					{ _id: '3', column1: 'c', column2: 'c', },
				]}
				columns={[
					{ title: 'column1', dataIndex: 'column1', },
					{ title: 'column2', dataIndex: 'column2', },
				]}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should prefixClass to equal ljit-table', () => {
		expect(prefixClass).toEqual('ljit-table');
	});

	it('should DEFAULT_FIXED_COLUMN_WIDTH to equal 150', () => {
		expect(DEFAULT_FIXED_COLUMN_WIDTH).toEqual(150);
	});

	it('should DEFAULT_FIXED_SCROLL to equal 2000', () => {
		expect(DEFAULT_FIXED_SCROLL).toEqual(2000);
	});

	it('should DEFAULT_PAGE_SIZE_OPTIONS to equal [\'10\', \'20\', \'30\', \'40\']', () => {
		expect(DEFAULT_PAGE_SIZE_OPTIONS).toEqual(['10', '20', '30', '40']);
	});

	it('should be selectable by class ljit-table', () => {
		const wrapper = shallow(<Table />);

		expect(wrapper.hasClass('ljit-table')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<Table className={className} />);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should ljit-table--bordered be selectable by isBordered', () => {
		const wrapper = shallow(<Table isBordered />);

		expect(wrapper.hasClass('ljit-table--bordered')).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const dataSource = [
			{ _id: '1', column1: 'a', column2: 'a', },
			{ _id: '2', column1: 'b', column2: 'b', },
		];
		const columns = [
			{ title: 'column1', dataIndex: 'column1', },
			{ title: 'column2', dataIndex: 'column2', },
		];
		const alignType = Table.AlignTypeEnums.LEFT;
		const rowKey = '_id';
		const isShowingHeader = false;
		const className = 'mock-class';
		const isBordered = false;
		const isLoading = false;
		const hasPagination = false;
		const fixedLeftColumnIndices = [];
		const fixedRightColumnIndices = [];
		const onTableChange = () => {};
		const scroll = {
			x: 1500,
			y: 300,
		};
		const sorters = [
			{
				dataIndex: 'column1',
				sorter: (prev, next) => prev.column1 - next.column1,
			},
		];
		const filters = [
			{
				dataIndex: 'column1',
				onFilter: (value, record) => record.column1.toLowerCase().indexOf(value) > -1,
				filters: [
					{ text: 'A', value: 'a', },
					{ text: 'B', value: 'b', },
				],
			},
		];
		const rowSelection = {};
		const isRowExpendAccordion = false;
		const expandedRowRender = () => {};
		const paginationProps = {};
		const customFilters = [
			[ undefined, () => {}],
		];

		const wrapper = mount(
			<Table
				dataSource={dataSource}
				columns={columns}
				alignType={alignType}
				rowKey={rowKey}
				isShowingHeader={isShowingHeader}
				className={className}
				isBordered={isBordered}
				isLoading={isLoading}
				hasPagination={hasPagination}
				fixedLeftColumnIndices={fixedLeftColumnIndices}
				fixedRightColumnIndices={fixedRightColumnIndices}
				onTableChange={onTableChange}
				scroll={scroll}
				sorters={sorters}
				filters={filters}
				rowSelection={rowSelection}
				isRowExpendAccordion={isRowExpendAccordion}
				expandedRowRender={expandedRowRender}
				paginationProps={paginationProps}
				customFilters={customFilters}
			/>
		);

		expect(wrapper.props().dataSource).toMatchObject(dataSource);
		expect(wrapper.props().columns).toMatchObject(columns);
		expect(wrapper.props().alignType).toEqual(alignType);
		expect(wrapper.props().rowKey).toEqual(rowKey);
		expect(wrapper.props().isShowingHeader).toEqual(isShowingHeader);
		expect(wrapper.props().className).toEqual(className);
		expect(wrapper.props().isBordered).toEqual(isBordered);
		expect(wrapper.props().isLoading).toEqual(isLoading);
		expect(wrapper.props().hasPagination).toEqual(hasPagination);
		expect(wrapper.props().fixedLeftColumnIndices).toMatchObject(fixedLeftColumnIndices);
		expect(wrapper.props().fixedRightColumnIndices).toMatchObject(fixedRightColumnIndices);
		expect(wrapper.props().onTableChange).toEqual(onTableChange);
		expect(wrapper.props().scroll).toMatchObject(scroll);
		expect(wrapper.props().sorters).toMatchObject(sorters);
		expect(wrapper.props().filters).toMatchObject(filters);
		expect(wrapper.props().rowSelection).toMatchObject(rowSelection);
		expect(wrapper.props().isRowExpendAccordion).toEqual(isRowExpendAccordion);
		expect(wrapper.props().expandedRowRender).toEqual(expandedRowRender);
		expect(wrapper.props().paginationProps).toEqual(paginationProps);
		expect(wrapper.props().customFilters).toEqual(customFilters);
	});

	describe('when set hasPagination to true', () => {
		let generateWrapper;

		beforeEach(() => {
			jest.dontMock('antd/lib/table');
			generateWrapper = (props = {}) => mount(
				<Table
					{...props}
					rowKey="_id"
					hasPagination
					dataSource={[
						{ _id: '1', column1: 'a', column2: 'a', },
						{ _id: '2', column1: 'b', column2: 'b', },
						{ _id: '3', column1: 'c', column2: 'c', },
					]}
					columns={[
						{ title: 'column1', dataIndex: 'column1', },
						{ title: 'column2', dataIndex: 'column2', },
					]}
				/>
			);
		});
		afterEach(() => {
			generateWrapper = undefined;
		});

		it('should pagination element can be found', () => {
			const wrapper = generateWrapper();
			const expected = 1;

			expect(wrapper.find(Pagination)).toHaveLength(expected);
		});

		it('should pagination contains total text', () => {
			const wrapper = generateWrapper();
			const pagination = wrapper.find(Pagination);
			const totalPath = '.ant-pagination-total-text';
			const expected = 1;

			expect(pagination.find(totalPath)).toHaveLength(expected);
		});

		it('should pagination contains per page change select', () => {
			const wrapper = generateWrapper();
			const pagination = wrapper.find(Pagination);
			const selectPath = '.ant-pagination-options > .ant-pagination-options-size-changer';
			const expected = 1;

			expect(pagination.find(selectPath)).toHaveLength(expected);
		});

		it('should pagination contains prev item', () => {
			const wrapper = generateWrapper();
			const pagination = wrapper.find(Pagination);
			const prevPath = '.ant-pagination-prev';
			const expected = 1;

			expect(pagination.find(prevPath)).toHaveLength(expected);
		});

		it('should pagination contains next item', () => {
			const wrapper = generateWrapper();
			const pagination = wrapper.find(Pagination);
			const nextPath = '.ant-pagination-next';
			const expected = 1;

			expect(pagination.find(nextPath)).toHaveLength(expected);
		});

		describe('and change total count', () => {
			it('should contains 1 page items with 10 total', () => {
				const paginationProps = {
					current: 1,
					pageSize: 10,
					total: 10,
				};
				const wrapper = generateWrapper({ paginationProps, });
				const pagination = wrapper.find(Pagination);
				const itemPath = '.ant-pagination-item';
				const expected = 1;

				expect(pagination.find(itemPath)).toHaveLength(expected);
			});

			it('should contains 3 page items with 30 total', () => {
				const paginationProps = {
					current: 1,
					pageSize: 10,
					total: 30,
				};
				const wrapper = generateWrapper({ paginationProps, });
				const pagination = wrapper.find(Pagination);
				const itemPath = '.ant-pagination-item';
				const expected = 3;

				expect(pagination.find(itemPath)).toHaveLength(expected);
			});
		});

		describe('and total page greater than 10', () => {
			let paginationProps;

			beforeEach(() => {
				paginationProps = {
					current: 1,
					pageSize: 10,
					total: 120,
				};
			});
			afterEach(() => {
				paginationProps = undefined;
			});

			it('should contains jump next item', () => {
				const wrapper = generateWrapper({ paginationProps, });
				const pagination = wrapper.find(Pagination);
				const jumpPath = '.ant-pagination-jump-next';
				const expected = 1;

				expect(pagination.find(jumpPath)).toHaveLength(expected);
			});

			it('should contains 6 page items', () => {
				const wrapper = generateWrapper({ paginationProps, });
				const pagination = wrapper.find(Pagination);
				const itemPath = '.ant-pagination-item';
				const expected = 6;

				expect(pagination.find(itemPath)).toHaveLength(expected);
			});
		});

		describe('and handle pagination action', () => {
			let paginationProps;
			let _handleChangeTable;

			beforeEach(() => {
				_handleChangeTable = jest.fn();
				paginationProps = {
					current: 1,
					pageSize: 10,
					total: 120,
				};
			});
			afterEach(() => {
				paginationProps = undefined;
				_handleChangeTable = undefined;
			});

			it('should change current page with page 2 clicked', () => {
				const wrapper = generateWrapper({
					paginationProps,
					onTableChange: _handleChangeTable,
				});
				const pagination = wrapper.find(Pagination);
				const itemPath = '.ant-pagination-item';
				const expected = 2;

				pagination.find(itemPath).at(expected - 1).simulate('click');

				expect(wrapper.props().onTableChange).toHaveBeenCalled();
				expect(wrapper.props().onTableChange).toHaveBeenCalledWith(
					expect.objectContaining({
						current: expected,
					}),
					expect.anything(),
					expect.anything(),
					expect.anything()
				);
			});

			it('should change current page with page 4 clicked', () => {
				const wrapper = generateWrapper({
					paginationProps,
					onTableChange: _handleChangeTable,
				});
				const pagination = wrapper.find(Pagination);
				const itemPath = '.ant-pagination-item';
				const expected = 4;

				pagination.find(itemPath).at(expected - 1).simulate('click');

				expect(wrapper.props().onTableChange).toHaveBeenCalled();
				expect(wrapper.props().onTableChange).toHaveBeenCalledWith(
					expect.objectContaining({
						current: expected,
					}),
					expect.anything(),
					expect.anything(),
					expect.anything()
				);
			});
		});
	});

	describe('when set customFilters', () => {
		let generateWrapper;

		beforeEach(() => {
			jest.dontMock('antd/lib/table');
			generateWrapper = (props = {}) => mount(
				<Table
					{...props}
					rowKey="_id"
					dataSource={[
						{ _id: '1', column1: 'a', column2: 'a', },
						{ _id: '2', column1: 'b', column2: 'b', },
						{ _id: '3', column1: 'c', column2: 'c', },
					]}
					columns={[
						{ title: 'column1', dataIndex: 'column1', },
						{ title: 'column2', dataIndex: 'column2', },
					]}
				/>
			);
		});
		afterEach(() => {
			generateWrapper = undefined;
		});

		it('should find 1 record with \'a\' in column1', () => {
			const originalLength = 3;
			const customFilters = [
				[ 'a', (column1, record) => (record.column1 === column1), ],
			];
			const wrapper = generateWrapper();
			const expected = 1;

			expect(wrapper.find('TableRow')).toHaveLength(originalLength);

			wrapper.setProps({ customFilters, });

			expect(wrapper.find('TableRow')).toHaveLength(expected);
		});

		it('should find 1 record with \'a\' in column1 and \'a\' in column2', () => {
			const originalLength = 3;
			const customFilters = [
				[ 'a', (column1, record) => (record.column1 === column1), ],
				[ 'a', (column2, record) => (record.column2 === column2), ],
			];
			const wrapper = generateWrapper();
			const expected = 1;

			expect(wrapper.find('TableRow')).toHaveLength(originalLength);

			wrapper.setProps({ customFilters, });

			expect(wrapper.find('TableRow')).toHaveLength(expected);
		});

		it('should find 0 record with \'a\' in column1 and \'b\' in column2', () => {
			const originalLength = 3;
			const customFilters = [
				[ 'a', (column1, record) => (record.column1 === column1), ],
				[ 'b', (column2, record) => (record.column2 === column2), ],
			];
			const wrapper = generateWrapper();
			const expected = 0;

			expect(wrapper.find('TableRow')).toHaveLength(originalLength);

			wrapper.setProps({ customFilters, });

			expect(wrapper.find('TableRow')).toHaveLength(expected);
		});
	});

	describe('when pass alignType as left, center or right', () => {
		it('should ljit-table--align-left be selectable', () => {
			const wrapper = shallow(<Table alignType="left" />);

			expect(wrapper.hasClass('ljit-table--align-left')).toEqual(true);
		});

		it('should ljit-table--align-center be selectable', () => {
			const wrapper = shallow(<Table alignType="center" />);

			expect(wrapper.hasClass('ljit-table--align-center')).toEqual(true);
		});

		it('should ljit-table--align-right be selectable', () => {
			const wrapper = shallow(<Table alignType="right" />);

			expect(wrapper.hasClass('ljit-table--align-right')).toEqual(true);
		});
	});

	describe('Align Type Enums', () => {
		it('should contain left property.', () => {
			expect(Table.AlignTypeEnums).toHaveProperty('LEFT', 'left');
		});

		it('should contain center property.', () => {
			expect(Table.AlignTypeEnums).toHaveProperty('CENTER', 'center');
		});

		it('should contain right property.', () => {
			expect(Table.AlignTypeEnums).toHaveProperty('RIGHT', 'right');
		});
	});

	describe('Size Type Enums', () => {
		it('should contain LARGE property.', () => {
			expect(Table.TableSizeEnums).toHaveProperty('LARGE', 'default');
		});

		it('should contain MIDDLE property.', () => {
			expect(Table.TableSizeEnums).toHaveProperty('MIDDLE', 'middle');
		});

		it('should contain SMALL property.', () => {
			expect(Table.TableSizeEnums).toHaveProperty('SMALL', 'small');
		});
	});
});
