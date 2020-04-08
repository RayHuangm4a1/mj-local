import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import { Table, } from 'ljit-react-components';
import { convertDateStringToTimestamp, } from '../../lib/moment-utils';
import PageBlock from '../../components/page-block';
import SearchForm from './point-change-search-form';

const fakeData = Array.from(Array(20).keys()).map((index) => {
	const descriptions = ['管理员操作', '注册会员', '新增会员'];

	return {
		_id: index + 1,
		memberNumber: `${getRandom(500000, 600000)}`,
		username: `test${getRandom(1, 100)}`,
		changeAmount: getRandom(0, 100),
		changedPointAmount: getRandom(0, 100),
		createdAt: `2019/5/${getRandom(1, 31)} 13:32:31`,
		description: descriptions[getRandom(0, 3)],
	};
});

const propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.number,
		memberNumber: PropTypes.string,
		username: PropTypes.string,
		changeAmount: PropTypes.number,
		changedPointAmount: PropTypes.number,
		createdAt: PropTypes.string,
		remark: PropTypes.string,
	})),
};

class MemberLogPointChangePage extends Component {
	constructor() {
		super();
		this.state = {
			isLogVisible: false,
		};
		this._handleSearch = this._handleSearch.bind(this);
		this._handleTableChange = this._handleTableChange.bind(this);
		this._renderLogBlock = this._renderLogBlock.bind(this);
	}

	_handleSearch(data) {
		// TODO call api
		console.log(data);
		this.setState({ isLogVisible: !this.state.isLogVisible, });
	}

	_handleTableChange() {
		// TODO call api sort data
	}

	_renderLogBlock(data = []) {
		const columns = [
			{
				title: '编号',
				dataIndex: 'memberNumber',
				sorter: (prev, next) => prev.memberNumber - next.memberNumber,
				sortDirections: ['descend', 'ascend'],
			},
			{
				title: '帐号',
				dataIndex: 'username',
			},
			{
				title: '变化值',
				dataIndex: 'changeAmount',
			},
			{
				title: '变化后值',
				dataIndex: 'changedPointAmount',
			},
			{
				title: '变化时间',
				dataIndex: 'createdAt',
				sorter: (prev, next) => {
					return convertDateStringToTimestamp(prev.createdAt) - convertDateStringToTimestamp(next.createdAt);
				},
				sortDirections: ['descend', 'ascend'],
			},
			{
				title: '备注',
				dataIndex: 'description',
			},
		];

		return (
			<PageBlock>
				<Table
					rowKey="_id"
					alignType={Table.AlignTypeEnums.CENTER}
					onChange={this._handleTableChange}
					dataSource={data}
					columns={columns}
				/>
			</PageBlock>
		);
	}

	render() {
		const {
			data = fakeData,
			isLogVisible,
		} = this.state;

		return (
			<Fragment>
				<PageBlock noMinHeight>
					<SearchForm
						onSearch={this._handleSearch}
					/>
				</PageBlock>
				{isLogVisible ? this._renderLogBlock(data) : null}
			</Fragment>
		);
	}
}

MemberLogPointChangePage.propTypes = propTypes;

function getRandom(min, max) {
	return Math.floor(Math.random() * max) + min;
}

export default MemberLogPointChangePage;
