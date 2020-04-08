import React from 'react';
import PropTypes from 'prop-types';
import {
	Row,
	Col,
	List,
} from 'ljit-react-components';
import PageBlock from '../../../../components/page-block';

const propTypes = {
	data: PropTypes.object,
};

const StatisticsQuota = (props) => {
	const {
		data = {
			quota: [
				{
					title: '13% 總人數',
					content: 0,
				},
				{
					title: '12.9% 總人數',
					content: 0,
				},
				{
					title: '12.8% 總人數',
					content: 0,
				},
				{
					title: '12.7% 總人數',
					content: 0,
				},
				{
					title: '12.6% 總人數',
					content: 0,
				},
				{
					title: '12.5% 總人數',
					content: 0,
				},
			],
		},
	} = props;
	const quotas = data.quota || [];
	const half = Math.ceil(quotas.length / 2);
	const leftdata = quotas.slice(0, half);
	const rightdata = quotas.slice(half);

	return (
		<div className="stat-tab">
			<div className="tab-content-title">
				<PageBlock.Title text="时时彩 - 团队配额设置" />
			</div>
			<Row gutter={20}>
				<Col span={12}>
					<List
						className="statistic-quota-list"
						dataSource={leftdata}
					/>
				</Col>
				<Col span={12}>
					<List
						className="statistic-quota-list"
						dataSource={rightdata}
					/>
				</Col>
			</Row>
		</div>
	);
};

StatisticsQuota.propTypes = propTypes;

export default StatisticsQuota;
