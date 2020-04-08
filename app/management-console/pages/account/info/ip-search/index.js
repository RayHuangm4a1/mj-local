import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, HeaderButtonBar, Button,} from 'ljit-react-components';
import SearchForm from './search-form';
import PageBlock from '../../../../components/page-block';
import './style.styl';

const propTypes = {
	ipList: PropTypes.arrayOf(PropTypes.shape({
		ip: PropTypes.string,
		username: PropTypes.string,
		lastLoginAt: PropTypes.string,
		domain: PropTypes.string,
		nation: PropTypes.string,
		province: PropTypes.string,
		county: PropTypes.string,
	}))
};
const defaultProps = {};

class AccountInfoIpSearchPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: ipList,
			isShowingSearchResult: false,
			selectedRowKeys: [],
		};

		this._handleSearch = this._handleSearch.bind(this);
		this._handleTableChange = this._handleTableChange.bind(this);
		this._handleAddBlackList = this._handleAddBlackList.bind(this);
		this._handleSelectChange = this._handleSelectChange.bind(this);
		this._renderResult = this._renderResult.bind(this);
	}

	_handleSearch(data) {
		// TODO call api
		this.setState({ isShowingSearchResult: true, });
	}

	_handleTableChange(pagination, filters, sorter, extra) {
	}
	_handleAddBlackList() {
		// TODO send add black list api
	}
	_handleSelectChange(selectedRowKeys) {
		this.setState({ selectedRowKeys, });
	}
	_renderResult() {
		const { dataSource, selectedRowKeys } = this.state;
		const {
			_handleAddBlackList,
			_handleTableChange,
			_handleSelectChange,
		} = this;
		const columns = [{
			title:'登录IP位址',
			dataIndex:'ip',
		},{
			title:'登录帐号',
			dataIndex:'username',
		},{
			title:'登录时间',
			dataIndex:'lastLoginAt',
		},{
			title:'来源网址',
			dataIndex:'domain',
		},{
			title:'国家',
			dataIndex:'nation',
		},{
			title:'省',
			dataIndex:'province',
		},{
			title:'县市',
			dataIndex:'county',
		},];

		return (
			<React.Fragment>
				<HeaderButtonBar
					right={(
						<Button
							color={Button.ColorEnums.BRIGHTBLUE500}
							onClick={_handleAddBlackList}
						>
							将选取项目移入黑名单
						</Button>
					)}
				/>
				<Table
					rowKey="_id"
					className="ip-table"
					columns={columns}
					dataSource={dataSource}
					onTableChange={_handleTableChange}
					rowSelection={{
						selectedRowKeys,
						onChange: _handleSelectChange,
					}}
				/>
			</React.Fragment>
		);
	}

	render() {
		const { isShowingSearchResult, } = this.state;
		const { _renderResult, _handleSearch, } = this;
		const searchResult = isShowingSearchResult ? _renderResult() : null;

		return (
			<PageBlock className="management-account-ip" noMinHeight>
				<SearchForm onSearch={_handleSearch} />
				{searchResult}
			</PageBlock>
		);
	}
}

AccountInfoIpSearchPage.propTypes = propTypes;
AccountInfoIpSearchPage.defaultProps = defaultProps;

export default AccountInfoIpSearchPage;

const ipList = [{
	_id: '0',
	ip: '211.23.162.10',
	username: 'Admin0',
	lastLoginAt: '2019/02/13 13:48:34',
	domain: 'coddemo.cloudapp.net:80807',
	nation: '台灣',
	province: 'N/A',
	county: 'N/A',
},{
	_id: '1',
	ip: '211.23.162.10',
	username: 'Admin1',
	lastLoginAt: '2019/02/13 13:48:34',
	domain: 'coddemo.cloudapp.net:80807',
	nation: '台灣',
	province: 'N/A',
	county: 'N/A',
},{
	_id: '2',
	ip: '211.23.162.10',
	username: 'Admin2',
	lastLoginAt: '2019/02/13 13:48:34',
	domain: 'coddemo.cloudapp.net:80807',
	nation: '台灣',
	province: 'N/A',
	county: 'N/A',
},{
	_id: '3',
	ip: '211.23.162.10',
	username: 'Admin3',
	lastLoginAt: '2019/02/13 13:48:34',
	domain: 'coddemo.cloudapp.net:80807',
	nation: '台灣',
	province: 'N/A',
	county: 'N/A',
},{
	_id: '4',
	ip: '211.23.162.10',
	username: 'Admin4',
	lastLoginAt: '2019/02/13 13:48:34',
	domain: 'coddemo.cloudapp.net:80807',
	nation: '台灣',
	province: 'N/A',
	county: 'N/A',
},{
	_id: '5',
	ip: '211.23.162.10',
	username: 'Admin5',
	lastLoginAt: '2019/02/13 13:48:34',
	domain: 'coddemo.cloudapp.net:80807',
	nation: '台灣',
	province: 'N/A',
	county: 'N/A',
},];
