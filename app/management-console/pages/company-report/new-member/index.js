import React, { Component } from 'react';
import { Table, } from 'ljit-react-components';
import SearchForm from './search-form';
import PageBlock from '../../../components/page-block';
import { convertDateStringToTimestamp, } from '../../../lib/moment-utils';

const sourceData = ['管理者创建', '上级创建', '推荐申请', '微信推荐', '好友推荐'];

const propTypes = {};
const defaultProps = {};

class CompanyReportNewMemberPage extends Component {
	constructor() {
		super();
		this.state = {
			isResultTableVisible: false,
		};

		this._handleReset = this._handleReset.bind(this);
		this._handleSearch = this._handleSearch.bind(this);
		this._renderResultTable = this._renderResultTable.bind(this);
	}
	_handleReset(event) {
		//TODO reset

		this.setState({ isResultTableVisible: false, });
	}
	_handleSearch(data) {
		//TODO fetch data api

		this.setState({ isResultTableVisible: true, });
	}
	_renderResultTable() {
		const columns = [{
			title: '帐号',
			dataIndex: 'username',
			key: 'username',
			sorter: (prev, next) => prev.username.length - next.username.length,
		},{
			title: '奖金号',
			dataIndex: 'bonus',
			key: 'bonus',
		},{
			title: '上级帐号',
			dataIndex: 'upper',
			key: 'upper',
		},{
			title: '创建时间',
			dataIndex: 'createdAt',
			key: 'createdAt',
			sorter: (prev, next) => convertDateStringToTimestamp(prev.createdAt) - convertDateStringToTimestamp(next.createdAt),
		},{
			title: '创建来源',
			dataIndex: 'source',
			key: 'source',
		},];

		return (
			<Table
				rowKey="_id"
				columns={columns}
				dataSource={
					//TODO: change api data
					Array.from(Array(10).keys()).map((index) => ({
						_id: `${index + 1}`,
						createdAt:`2019/5/${Math.floor(Math.random() * 10 + 1)} 13:32:31`,
						username: `account${index}`,
						bonus: `${Math.floor(Math.random() * 1000)}`,
						upper: 'upper',
						source: sourceData[Math.floor(Math.random() * 5)],
					}))
				}
				pagination={false}
			/>
		);
	}
	render() {
		const { isResultTableVisible, } = this.state;

		return (
			<PageBlock noMinHeight>
				<SearchForm
					onSearch={this._handleSearch}
					onReset={this._handleReset}
				/>
				{isResultTableVisible ? this._renderResultTable() : null}
			</PageBlock>
		);
	}
}

CompanyReportNewMemberPage.propTypes = propTypes;
CompanyReportNewMemberPage.defaultProps = defaultProps;

export default CompanyReportNewMemberPage;
