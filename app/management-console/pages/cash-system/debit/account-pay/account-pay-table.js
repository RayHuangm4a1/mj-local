import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import {
	Table,
	Tooltip,
} from 'ljit-react-components';
import {
	DATE,
	MONTH_DAY,
	isDateValid,
	formatDate,
} from '../../../../lib/moment-utils';

// TODO: api data formats 
const propTypes = {
	orders: PropTypes.arrayOf(PropTypes.shape({
		orderId: PropTypes.object,
		lotteryAmount: PropTypes.string,
		rechargeAmount: PropTypes.string,
		depositAmount: PropTypes.string,
		spendAmount: PropTypes.string,
		pointAmount: PropTypes.string,
		rewardAmount: PropTypes.string,
		profitAmount: PropTypes.string,
		entertainmentAmount: PropTypes.array,
	})),
};
const defaultProps = {
	// TODO: should be []
	orders: FakeList,
};

// TODO: api data formats
const Columns = [
	{
		title: '订单编号',
		dataIndex: 'orderId',
		render: (value) => {
			const { dates, title, } = value;
			const from = isDateValid(dates[0]) ? formatDate(dates[0], DATE) : '';
			const to = isDateValid(dates[1]) ? formatDate(dates[1], MONTH_DAY) : '';
			let date;

			if (value.dates.length === 1) {
				date = `(${from})`;
			} else {
				date = `(${from}-${to})`;
			}

			return (
				<Fragment>
					<div>{title}</div>
					<div>{date}</div>
				</Fragment>
			);
		},
	},
	{
		title: '彩票盈余',
		dataIndex: 'lotteryAmount',
	},
	{
		title: '充值金额',
		dataIndex: 'rechargeAmount',
	},
	{
		title: '提款金额',
		dataIndex: 'depositAmount',
	},
	{
		title: '消费金额',
		dataIndex: 'spendAmount',
	},
	{
		title: '返点金额',
		dataIndex: 'rebateAmount',
	},
	{
		title: '奖励金额',
		dataIndex: 'rewardAmount',
	},
	{
		title: '盈利金额',
		dataIndex: 'profitAmount',
	},
	{
		title: '娱乐金额',
		dataIndex: 'entertainmentAmount',
		className: 'entertainment-amount',
		render: (value, record, index) => {
			const total = value.reduce((acc, current) => acc = acc + current.amount, 0);
			const content = value.map((item, index) => (
				<div key={`${item.title}-${index}`}>
					{item.title}
					<span>{item.amount}</span>
				</div>
			));
			
			return (
				<Tooltip
					title={content}
					overlayColor={Tooltip.ColorEnums.WHITE}
					overlayClassName={`${PREFIX_CLASS}__tooltip`}
				>
					{total}
				</Tooltip>
			);
		},
	},
];

const PREFIX_CLASS = 'account-pay-table';

class AccountPayTable extends Component {
	render() {
		return (
			<Table
				className={PREFIX_CLASS}
				columns={Columns}
				// TODO: should remove FakeList after list is ready
				dataSource={FakeList}
				rowKey={ (record, index) => `record-row-key-${index}` }
			/>
		);
	}
}

AccountPayTable.propTypes = propTypes;
AccountPayTable.defaultProps = defaultProps;

export default AccountPayTable;

// TODO: should remove after api is ready
const FakeList = [
	{
		orderId: {
			title: '最近七日',
			dates: [
				'2019-11-13T06:23:58.000Z',
				'2019-11-20T06:23:58.000Z',
			],
		},
		lotteryAmount: 100000,
		rechargeAmount: 100000,
		depositAmount: 100000,
		spendAmount: 100000,
		rebateAmount: 100000,
		rewardAmount: 100000,
		profitAmount: 100000,
		entertainmentAmount: [
			{ 
				title: 'VR电子',
				amount: 3000,
			},
			{ 
				title: 'GMMA',
				amount: 2000,
			},
			{ 
				title: 'PT电子',
				amount: 5000,
			},
		],
	},
	{
		orderId: {
			title: '本日',
			dates: [
				'2019-11-20T06:23:58.000Z',
			],
		},
		lotteryAmount: 100000,
		rechargeAmount: 100000,
		depositAmount: 100000,
		spendAmount: 100000,
		rebateAmount: 100000,
		rewardAmount: 100000,
		profitAmount: 100000,
		entertainmentAmount: [
			{ 
				title: 'VR电子',
				amount: 3000,
			},
			{ 
				title: 'GMMA',
				amount: 2000,
			},
			{ 
				title: 'PT电子',
				amount: 5000,
			},
		],
	},
];
