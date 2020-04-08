import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import { Table, } from 'ljit-react-components';
import { convertDateStringToTimestamp, } from '../../lib/moment-utils';
import PageBlock from '../../components/page-block';
import SearchForm from './login-search-form';

const fakeData = Array.from(Array(20).keys()).map((index) => {
	const remarks = ['验证码正确', '用户密码登入成功']

	return {
		_id: index + 1,
		logNumber: `${getRandom(500000, 600000)}`,
		username: `test${getRandom(1, 100)}`,
		lastLoginAt: `2019/5/${getRandom(1, 31)} 13:32:31`,
		loginIp: `220.197.208.${getRandom(0, 255)}`,
		loginAddress: '台湾省中华电信(HiNet)数据中心',
		remark: remarks[getRandom(0, 2)],
		browserName: 'chrome73.0.3683.103',
		serverName: 'testhy.szxtd56.c',
	};
});

const propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.number,
		logNumber: PropTypes.string,
		username: PropTypes.string,
		lastLoginAt: PropTypes.string,
		loginIp: PropTypes.string,
		loginAddress: PropTypes.string,
		remark: PropTypes.string,
		browserName: PropTypes.string,
		serverName: PropTypes.string,
	})),
};

class MemberLogLoginPage extends Component {
	constructor() {
		super();
		this.state = {
			isLogVisible: false,
		};
		this._handleSearch = this._handleSearch.bind(this);
		this._handleTableChange = this._handleTableChange.bind(this);
		this._renderRow = this._renderRow.bind(this);
		this._renderLogBlock = this._renderLogBlock.bind(this);
	}

	_handleSearch(data) {
		// TODO call api
		this.setState({ isLogVisible: !this.state.isLogVisible, });
	}

	_handleTableChange() {
		// TODO call api sort data
	}

	_renderRow(record) {
		const {
			browserName,
			serverName,
		} = record;

		return (
			<div className="expend-content">
				<p className="expend-content__line">
					{`浏览器：${browserName}`}
				</p>
				<p className="expend-content__line">
					{`服务器信息：${serverName}`}
				</p>
			</div>
		);
	}
	_renderLogBlock(data = []) {
		const columns = [
			{
				title: '日志编号',
				dataIndex: 'logNumber',
				sorter: (prev, next) => prev.logNumber - next.logNumber,
				sortDirections: ['descend', 'ascend'],
			},
			{
				title: '帐号',
				dataIndex: 'username',
			},
			{
				title: '登入时间',
				dataIndex: 'lastLoginAt',
				sorter: (prev, next) => {
					return convertDateStringToTimestamp(prev.lastLoginAt) - convertDateStringToTimestamp(next.lastLoginAt);
				},
				sortDirections: ['descend', 'ascend'],
			},
			{
				title: '登入IP',
				dataIndex: 'loginIp',
			},
			{
				title: '登入地址',
				dataIndex: 'loginAddress',
			},
			{
				title: '备注',
				dataIndex: 'remark',
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
					expandedRowRender={(record) => this._renderRow(record)}
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

MemberLogLoginPage.propTypes = propTypes;

function getRandom(min, max) {
	return Math.floor(Math.random() * max) + min;
}

export default MemberLogLoginPage;
