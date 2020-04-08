import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import { Table, } from 'ljit-react-components';
import { convertDateStringToTimestamp, } from '../../lib/moment-utils';
import PageBlock from '../../components/page-block';
import SearchForm from './bank-card-search-form';

const fakeData = Array.from(Array(20).keys()).map((index) => {
	const memberNames = ['王龙', '史佳兆', '刘小华', '欧阳芳'];
	const bankNames = ['建设银行', '农业银行', '兴业银行', '工商银行'];

	return {
		_id: index + 1,
		logNumber: `${getRandom(500000, 600000)}`,
		username: `test${getRandom(1, 100)}`,
		memberName: `${memberNames[getRandom(0, 3)]}`,
		bankName: `${bankNames[getRandom(0, 3)]}`,
		bankCardNumber: `${getRandom(600000000, 699999999)}`,
		createdAt:`2019/5/${getRandom(1, 31)} 13:32:31`,
		operatingType: `${getRandom(0, 2)}`,
		remark: 'mengliang888添加',
	};
});

const propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.number,
		logNumber: PropTypes.string,
		username: PropTypes.string,
		memberName: PropTypes.string,
		bankName: PropTypes.string,
		bankCardNumber: PropTypes.string,
		createdAt: PropTypes.string,
		operatingType: PropTypes.string,
		remark: PropTypes.string,
	})),
};

class MemberLogBankCardPage extends Component {
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
		// TODO call api sort data
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
				title: '姓名',
				dataIndex: 'memberName',
			},
			{
				title: '银行名',
				dataIndex: 'bankName',
			},
			{
				title: '卡号',
				dataIndex: 'bankCardNumber',
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
				title: '操作类型',
				dataIndex: 'operatingType',
				render: type => getOperatingTypeString(type),
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

MemberLogBankCardPage.propTypes = propTypes;

function getOperatingTypeString(operatingType) {
	let result;

	if (operatingType === '1') {
		result = '新增';
	}
	if (operatingType === '0') {
		result = '刪除';
	}
	return result;
}

function getRandom(min, max) {
	return Math.floor(Math.random() * max) + min;
}

export default MemberLogBankCardPage;
