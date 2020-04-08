import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import {
	Table,
	TextButton,
} from 'ljit-react-components';
import PageBlock from '../../../components/page-block';
import { RouteKeyEnums, } from '../../../routes';
import { formatDate, } from '../../../lib/moment-utils';

const { COMPANYREPORT_DIVIDEND, } = RouteKeyEnums;

const fakeData = [{
	id: 0,
	startAt: new Date('2019/04/01'),
	endAt: new Date('2019/04/30'),
	totalBetting: 1000,
	totalPlayer: 10,
	totalProfit: 32101,
	totalDividend: 2131.8,
	percentage: 325,
	operator: 'Admin',
	date: new Date('2019/04/30 15:16:16'),
},{
	id: 1,
	startAt: new Date('2019/03/01'),
	endAt: new Date('2019/03/31'),
	totalBetting: 10000,
	totalPlayer: 30,
	totalProfit: 9302,
	totalDividend: 33241.2,
	percentage: 24,
	operator: 'Admin',
	date: new Date('2019/03/30 15:16:16'),
},{
	id: 2,
	startAt: new Date('2019/02/01'),
	endAt: new Date('2019/02/28'),
	totalBetting: 100000,
	totalPlayer: 1,
	totalProfit: 33332,
	totalDividend: 234.9,
	percentage: 5646,
	operator: 'Admin',
	date: new Date('2019/02/28 15:16:16'),
},];

const propTypes = {
	onNavigate: PropTypes.func.isRequired,
};
const defaultProps = {};

class DividendInfoPage extends Component {
	constructor() {
		super();
		this.state = {
			data: [],
		};
	}

	render() {
		const { onNavigate, } = this.props;
		const { data, } = this.state;
		const columns = [{
			title: '起始時間',
			dataIndex: 'startAt',
			render: (record) => <span>{formatDate(record, 'YYYY/MM/DD')}</span>,
		},{
			title: '结束时间',
			dataIndex: 'endAt',
			render: (record) => <span>{formatDate(record, 'YYYY/MM/DD')}</span>,
		},{
			title: '总投注量',
			dataIndex: 'totalBetting',
		},{
			title: '总投注人数',
			dataIndex: 'totalPlayer',
		},{
			title: '总盈亏',
			dataIndex: 'totalProfit',
		},{
			title: '总分红',
			dataIndex: 'totalDividend',
		},{
			title: '百分比',
			dataIndex: 'percentage',
		},{
			title: '操作者',
			dataIndex: 'operator',
		},{
			title: '日期',
			dataIndex: 'date',
			render: (record) => <span>{formatDate(record)}</span>,
		},{
			title: '操作',
			dataIndex: '',
			key: 'operation',
			render: (record) =>
				<TextButton
					text="详细"
					color={TextButton.TYPE_DEFAULT}
					onClick={() => onNavigate(`${COMPANYREPORT_DIVIDEND}/${record.id}`)}
				/>
		},];

		return (
			<PageBlock>
				<Table
					rowKey="id"
					dataSource={data}
					columns={columns}
					hasPagination
				/>
			</PageBlock>
		);
	}

	componentDidMount() {
		//TODO fetch data
		this.setState({
			data: fakeData,
		});
	}
}

DividendInfoPage.propTypes = propTypes;
DividendInfoPage.defaultProps = defaultProps;

export default DividendInfoPage;
