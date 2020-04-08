import React, { Component } from 'react';
import { Link, } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
	Table,
	HeaderButtonBar,
	Button,
} from 'ljit-react-components';
import PageBlock from '../../../components/page-block';
import './style.styl';

const propTypes = {};
const defaultProps = {};

const fakeData =[
	{
		key: '1',
		_id: '1',
		date: '2019/03/06',
		personNumber: '3',
		betNumber: '4',
		betAmount: '325',
		bonus: '32101',
		rebate: '3',
		profitAndLoss: '2131.8',
		rtp: '4.23',
	},
	{
		key: '2',
		_id: '2',
		date: '2019/03/03',
		personNumber: '1',
		betNumber: '2',
		betAmount: '24',
		bonus: '9302',
		rebate: '1',
		profitAndLoss: '-103',
		rtp: '2',
	},
	{
		key: '3',
		_id: '3',
		date: '2019/03/06',
		personNumber: '3',
		betNumber: '4',
		betAmount: '325',
		bonus: '32101',
		rebate: '3',
		profitAndLoss: '2131.8',
		rtp: '4.23',
	},
];

class CompanyReportLotteryPlaysDetailsPage extends Component {
	render() {
		return (
			<div className="lottery-plays-details">
				<Link
					to="/company-report/lottery-plays"
					className="btn-forward"
				>
					<Button outline={Button.OutlineEnums.HOLLOW}>
						返回上一层
					</Button>
				</Link>
				<PageBlock>
					<HeaderButtonBar
						className="block-header"
						left={<PageBlock.Title
							text={<div>
								时时彩<br/>
								<span className="sub-title">五星组选组选60</span>
							</div>}
						/>}
						right={<div className="action">
							<a href="#">匯出 Excel</a>
						</div>}
					/>
					<Table
						columns={[
							{
								title: '日期',
								key: 'date',
								dataIndex: 'date',
								align: 'center',
								sorter: (a,b) => a.date - b.date,
							},
							{
								title: '人数',
								key: 'personNumber',
								dataIndex: 'personNumber',
								align: 'center',
								sorter: (a,b) => a.personNumber - b.personNumber,
							},
							{
								title: '投注笔数',
								key: 'betNumber',
								dataIndex: 'betNumber',
								align: 'center',
								sorter: (a,b) => a.betNumber - b.betNumber,
							},
							{
								title: '投注金額',
								key: 'betAmount',
								dataIndex: 'betAmount',
								align: 'center',
								sorter: (a,b) => a.betAmount - b.betAmount,
							},
							{
								title: '奖金',
								key: 'bonus',
								dataIndex: 'bonus',
								align: 'center',
								sorter: (a,b) => a.bonus - b.bonus,
							},
							{
								title: '返點',
								key: 'rebate',
								dataIndex: 'rebate',
								align: 'center',
								sorter: (a,b) => a.rebate - b.rebate,
							},
							{
								title: '盈亏',
								key: 'profitAndLoss',
								dataIndex: 'profitAndLoss',
								align: 'center',
								sorter: (a,b) => a.profitAndLoss - b.profitAndLoss,
							},
							{
								title: 'RTP',
								key: 'rtp',
								dataIndex: 'rtp',
								align: 'center',
								sorter: (a,b) => a.rtp - b.rtp,
							},
						]}
						dataSource={fakeData}
					/>
				</PageBlock>
			</div>
		);
	}
}

CompanyReportLotteryPlaysDetailsPage.propTypes = propTypes;
CompanyReportLotteryPlaysDetailsPage.defaultProps = defaultProps;

export default CompanyReportLotteryPlaysDetailsPage;
