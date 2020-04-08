import React, { Component, } from 'react';
import {
	Table,
	TextButton,
	Button,
} from '../../../src';
import ComponentBlock from '../ComponentBlock';
import staticData from './fake-data';
import CustomFilterForm from './custom-filter-form';

const { Item, } = ComponentBlock;

const API_URL = 'https://reqres.in/api';

const staticColumns = [
	{
		title: 'Name',
		dataIndex: 'name',
		width: 150,
		key: 'name',
	},
	{
		title: 'Age',
		dataIndex: 'age',
		key: 'age',
		className: 'cell-danger',
	},
	{
		title: 'Address0',
		dataIndex: 'address0',
		key: 'address0',
		className: 'cell-primary',
	},
	{
		title: 'Address1',
		dataIndex: 'address1',
		key: 'address1',
	},
	{
		title: 'Address2',
		dataIndex: 'address2',
		key: 'address2',
	},
	{
		title: 'Address3',
		dataIndex: 'address3',
		key: 'address3',
	},
	{
		title: 'Address4',
		dataIndex: 'address4',
		width: 150,
		key: 'address4',
		render: data => <TextButton type="danger" text={data} />,
	},
];

const initialPagination = {
	current: 1,
	pageSize: 1,
};

const initialCustomFilterData = {};

class TableSample extends Component {
	constructor() {
		super();
		this.state = {
			selectedRowKeys: [],
			filteredInfo: null,
			sortedInfo: null,

			data: [],
			pagination: initialPagination,
			isDataLoadingCompleted: false,

			customFilterData: initialCustomFilterData,
		};

		this._handleSelectChange = this._handleSelectChange.bind(this);
		this._handleTableChange = this._handleTableChange.bind(this);
		this._handleNameFilter = this._handleNameFilter.bind(this);
		this._handleAgeSort = this._handleAgeSort.bind(this);
		this._clearAll = this._clearAll.bind(this);
		this._handleFetchUsers = this._handleFetchUsers.bind(this);
		this._handleChangeAjaxTable = this._handleChangeAjaxTable.bind(this);
		this._handleCustomFilter = this._handleCustomFilter.bind(this);
		this._handleFilterTable = this._handleFilterTable.bind(this);
	}

	_handleSelectChange(selectedRowKeys) {
		this.setState({ selectedRowKeys, });
	}
	_handleTableChange(pagination, filters, sorter) {
		this.setState({
			filteredInfo: filters,
			sortedInfo: sorter,
		});
	}
	_handleNameFilter() {
		this.setState({
			filteredInfo: {
				name: ['mike',],
			},
		});
	}
	_handleAgeSort() {
		this.setState({
			sortedInfo: {
				columnKey: 'age',
				order: 'descend',
			},
		});
	}
	_clearAll() {
		this.setState({
			filteredInfo: null,
			sortedInfo: null,
		});
	}

	_handleFetchUsers(params = {}) {
		const {
			current,
			pageSize,
		} = params;

		this.setState({ isDataLoadingCompleted: false, });
		getData(`${API_URL}/users`, {
			...params,
			page: current,
			'per_page': pageSize,
		})
			.then((response) => {
				const {
					data,
					page,
					total,
				} = response;

				this.setState((prevState) => ({
					data,
					isDataLoadingCompleted: true,
					pagination: {
						...prevState.pagination,
						total,
						current: page,
					},
				}));

				return Promise.resolve(response);
			})
			.catch(() => this.setState({
				isDataLoadingCompleted: true,
			}));
	}

	_handleChangeAjaxTable(nextPagination = {}) {
		const {
			current: nextPage,
			pageSize: nextPageSize,
		} = nextPagination;
		const pager = { ...this.state.pagination };

		pager.current = nextPage;
		pager.pageSize = nextPageSize;

		this._handleFetchUsers(pager);
	}

	_handleCustomFilter(data) {
		this.setState({ customFilter: data, });
	}
	_handleFilterTable() {
		const { customFilter = {}, } = this.state;
		const {
			name,
			age,
			address0,
		} = customFilter;

		return [
			[ name, filterName, ],
			[ age, filterAge, ],
			[ address0, filterAddress0, ],
		];
	}

	render() {
		const {
			selectedRowKeys,
			isDataLoadingCompleted,
			data,
			pagination,
		} = this.state;

		let {
			filteredInfo,
			sortedInfo,
		} = this.state;

		sortedInfo = sortedInfo || {};
		filteredInfo = filteredInfo || {};

		return (
			<ComponentBlock title="Table">
				<Item>
					<h2>
						Basic Usage
					</h2>
					<Table
						isBordered
						rowKey={_record => _record._id}
						striped="even"
						dataSource={staticData}
						columns={staticColumns}
						rowSelection={{
							selectedRowKeys,
							onChange: this._handleSelectChange,
						}}
						expandedRowRender={(record) => <div>{record.address0}</div>}
					/>
				</Item>
				<Item>
					<h2>
						Fixed Column
					</h2>
					<Table
						rowKey="_id"
						dataSource={staticData}
						columns={staticColumns}
						fixedLeftColumnIndices={[0,]}
						fixedRightColumnIndices={[6,]}
						sorters={[{
							dataIndex: 'age',
							sorter: (prev, next) => prev.age - next.age,
						},]}
						filters={[{
							dataIndex: 'name',
							onFilter: (value, record) => record.name.toLowerCase().indexOf(value) > -1,
							filters: [
								{
									text: 'Mike',
									value: 'mike',
								},
								{
									text: 'John',
									value: 'john',
								},
								{
									text: 'Submenu',
									value: 'submenu',
									children: [
										{
											text: 'Green',
											value: 'green',
										},
										{
											text: 'Red',
											value: 'red',
										},
									],
								},
							],
						},]}
					/>
				</Item>
				<Item>
					<h2>
						Controled By External Component
					</h2>
					<div style={{ marginBottom: 20, }}>
						<Button onClick={this._handleNameFilter}>
							filter name by Mike
						</Button>
						<Button
							onClick={this._handleAgeSort}
							style={{ marginLeft: 10, }}
						>
							sort age by descend
						</Button>
						<Button
							onClick={this._clearAll}
							style={{ marginLeft: 10, }}
						>
							clear filter and sorter
						</Button>
					</div>
					<Table
						onTableChange={this._handleTableChange}
						rowKey="_id"
						dataSource={staticData}
						columns={staticColumns}
						filters={[{
							dataIndex: 'name',
							filteredValue: filteredInfo.name || null,
							onFilter: (value, record) => record.name.toLowerCase().indexOf(value) > -1,
							filters: [
								{
									text: 'Mike',
									value: 'mike',
								},
								{
									text: 'John',
									value: 'john',
								},
							],
						},]}
						sorters={[
							{
								dataIndex: 'age',
								sorter: (a, b) => a.age - b.age,
								sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
							},
						]}
					/>
				</Item>
				<Item>
					<h2>
						Table Pagination With Ajax Data
					</h2>
					<Table
						rowKey={record => record.id}
						dataSource={data}
						columns={[
							{
								dataIndex: 'first_name',
								title: 'First Name',
							},
							{
								dataIndex: 'last_name',
								title: 'Last Name',
							},
							{
								dataIndex: 'email',
								title: 'Email',
							},
						]}
						hasPagination
						paginationProps={pagination}
						onTableChange={this._handleChangeAjaxTable}
						isLoading={!isDataLoadingCompleted}
					/>
				</Item>
				<Item>
					<h2>
						Custom Filter
					</h2>
					<CustomFilterForm
						onSearch={this._handleCustomFilter}
						onReset={() => this.setState({ customFilter: initialCustomFilterData, })}
					/>
					<Table
						rowKey={_record => _record._id}
						dataSource={staticData}
						columns={staticColumns}
						customFilters={this._handleFilterTable()}
					/>
				</Item>
			</ComponentBlock>
		);
	}

	componentDidMount() {
		const {
			pagination,
		} = this.state;

		this._handleFetchUsers(pagination);
	}
}

function getData(url = '', params = {}) {
	const isParamsExisted = Object.keys(params).length > 0;
	const paramsStrings = stringifyParams(params);

	return fetch(`${url}${isParamsExisted ? '?' + paramsStrings : ''}`, {
		headers: {
			'content-type': 'application/json',
		},
		method: 'GET',
		mode: 'cors',
	})
	.then(response => response.json());
}


function stringifyParams(params = {}) {
	return Object.keys(params)
		.filter(key => params[key])
		.map(key => `${key}=${params[key]}`)
		.join('&');
}

const filterName = (name, record = {}) => record.name.indexOf(name) > -1;
const filterAge = (age, record = {}) => record.age === age;
const filterAddress0 = (address, record = {}) => record.address0.indexOf(address) > -1;

export default TableSample;
