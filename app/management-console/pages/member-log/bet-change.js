import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import { Table, } from 'ljit-react-components';
import { convertDateStringToTimestamp, } from '../../lib/moment-utils';
import PageBlock from '../../components/page-block';
import SearchForm from './bet-change-search-form';

const fakeData = Array.from(Array(20).keys()).map((index) => {
	const descriptions = ['转充值', '下注码量变更']

	return {
		_id: index + 1,
		memberNumber: `${getRandom(500000, 600000)}`,
		username: `test${getRandom(1, 100)}`,
		changeAmount: getRandom(0, 100000),
		changedBetAmount: getRandom(0, 100000),
		operatingType: `${getRandom(1, 3)}`,
		createdAt: `2019/5/${getRandom(1, 31)} 13:32:31`,
		description: descriptions[getRandom(0, 2)],
	};
});

const propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.number,
		memberNumber: PropTypes.string,
		username: PropTypes.string,
		changeAmount: PropTypes.number,
		changedBetAmount: PropTypes.number,
		operatingType: PropTypes.string,
		createdAt: PropTypes.string,
		description: PropTypes.string,
	})),
};

class MemberLogBetChangePage extends Component {
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
		this.setState({ isLogVisible: !this.state.isLogVisible, });
	}

	_handleTableChange() {
		// TODO call api sort, filter data
	}

	_renderLogBlock(data = []) {
		const columns = [
			{
				title: '会员编号',
				dataIndex: 'memberNumber',
				sorter: (prev, next) => prev.memberNumber - next.memberNumber,
				sortDirections: ['descend', 'ascend'],
			},
			{
				title: '会员名称',
				dataIndex: 'username',
			},
			{
				title: '变化值',
				dataIndex: 'changeAmount',
			},
			{
				title: '变化后码量',
				dataIndex: 'changedBetAmount',
			},
			{
				title: '操作类型',
				dataIndex: 'operatingType',
				render: type => getOperatingTypeString(type),
			},
			{
				title: '操作时间',
				dataIndex: 'createdAt',
				sorter: (prev, next) => {
					return convertDateStringToTimestamp(prev.createdAt) - convertDateStringToTimestamp(next.createdAt);
				},
				sortDirections: ['descend', 'ascend'],
			},
			{
				title: '描述',
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

MemberLogBetChangePage.propTypes = propTypes;

function getOperatingTypeString(operatingType) {
	let result;

	if (operatingType === '1') {
		result = '提现';
	}
	if (operatingType === '2') {
		result = '人工操作';
	}
	if (operatingType === '3') {
		result = '充值';
	}
	return result;
}

function getRandom(min, max) {
	return Math.floor(Math.random() * max) + min;
}

export default MemberLogBetChangePage;
