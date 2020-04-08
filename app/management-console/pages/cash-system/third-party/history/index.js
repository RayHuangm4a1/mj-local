import React, { Component, Fragment } from 'react';
import { Table, StatusTag, } from 'ljit-react-components';
import moment from 'moment';
import PageBlock from '../../../../components/page-block';
import SearchForm from './search-form';

const OptionEnums = {
	QQ: 'qq',
	ICBC: 'icbc',
	CITIC: 'citic',
};

const StatusEnums = {
	SUCCESS: '成功',
	ERROR: '失败',
};

const { QQ, ICBC, CITIC, } = OptionEnums;
const { SUCCESS, ERROR, } = StatusEnums;

const propTypes = {};

const defaultProps = {};

function getStatus(text) {
	switch (text) {
		case ERROR:
			return StatusTag.StatusEnums.ERROR;
		case SUCCESS:
			return StatusTag.StatusEnums.SUCCESS;
		default:
			return '';
	}
}

class CashSystemThirdPartyHistoryPage extends Component {
	constructor() {
		super();

		this.state = {
			tableData: [],
			isTableVisible: false,
		};

		this._handleSearch = this._handleSearch.bind(this);
		this._renderExpandedRow = this._renderExpandedRow.bind(this);
	}

	_handleSearch(form) {
		form.validateFields((error, data) => {
			if (!error) {
				// TODO call api get data
				this.setState({
					tableData: fakeData,
					isTableVisible: true,
				});
			}
		});
	}

	_renderExpandedRow(record) {
		return (
			<div>
				<div className="expanded-info-row">
					<span>银行卡帐号：{record.accountId}</span>
				</div>
				<div className="expanded-info-row">
					<span>交易单号：{record.transactionId}</span>
				</div>
				<div className="expanded-info-row">
					<span>备注：{record.note}</span>
				</div>
			</div>
		);
	}

	_renderTableBlock() {
		const columns = [{
			title: '操作者',
			dataIndex: 'operator',
			key: 'operator',
		},{
			title: '第三方名称',
			dataIndex: 'thirdParty',
			key: 'thirdParty',
		},{
			title: '银行卡姓名',
			dataIndex: 'cardName',
			key: 'cardName',
		},{
			title: '银行名称',
			dataIndex: 'bank',
			key: 'bank',
		},{
			title: '交易金額',
			dataIndex: 'amount',
			key: 'amount',
		},{
			title: '交易状态',
			dataIndex: 'status',
			key: 'status',
			render: (status) => <StatusTag status={getStatus(status)} text={status}></StatusTag>,
		},{
			title: '登录时间',
			dataIndex: 'loginDate',
			key: 'loginDate',
		}];

		const sorters = [{
			dataIndex: 'amount',
			sorter: (prev, next) => prev.amount - next.amount,
		},{
			dataIndex: 'loginDate',
			sorter: (prev, next) => moment(prev.loginDate, "YYYY-MM-DD HH:mm:ss").diff(moment(next.loginDate, "YYYY-MM-DD HH:mm:ss")),
		}];

		if (this.state.isTableVisible) {
			return (
				<PageBlock>
					<Table
						className="third-party-history-table"
						dataSource={this.state.tableData}
						columns={columns}
						sorters={sorters}
						expandedRowRender={this._renderExpandedRow}
					/>
				</PageBlock>
			);
		} else {
			return null;
		}
	}

	render() {
		return (
			<Fragment>
				<PageBlock noMinHeight>
					<SearchForm
						onSearch={this._handleSearch}
					/>
				</PageBlock>
				{this._renderTableBlock()}
			</Fragment>
		);
	}
}

CashSystemThirdPartyHistoryPage.propTypes = propTypes;
CashSystemThirdPartyHistoryPage.defaultProps = defaultProps;

export default CashSystemThirdPartyHistoryPage;

const fakeData = [{
	key: 1,
	operator: 'a6677721',
	thirdParty: 'Alipay',
	cardName: '高志成',
	bank: '中信银行',
	amount: 30405,
	status: '成功',
	loginDate: '2019/02/13 13:48:34',
	accountId: '6212261911006588211',
	transactionId: '20190403054110',
	note: '首次第三方发款',
},{
	key: 2,
	operator: 'cchang2005tw',
	thirdParty: 'QQ代付',
	cardName: '王跃进',
	bank: '中国工商银行',
	amount: 30406,
	status: '成功',
	loginDate: '2019/02/13 13:48:33',
	accountId: '6212261911006588211',
	transactionId: '20190403054110',
	note: '首次第三方发款',
},{
	key: 3,
	operator: 'cchang2005tw',
	thirdParty: 'QQ代付',
	cardName: '王跃进',
	bank: '中国工商银行',
	amount: 30407,
	status: '失败',
	loginDate: '2019/02/13 13:48:32',
	accountId: '6212261911006588211',
	transactionId: '20190403054110',
	note: '首次第三方发款',
},{
	key: 4,
	operator: 'a6677721',
	thirdParty: 'QQ代付',
	cardName: '王跃进',
	bank: '中国工商银行',
	amount: 30408,
	status: '失败',
	loginDate: '2019/02/13 13:48:31',
	accountId: '6212261911006588211',
	transactionId: '20190403054110',
	note: '首次第三方发款',
}];
