import React from 'react';
import PropTypes from 'prop-types';
import { Table, } from 'ljit-react-components';
import PageBlock from '../../../../components/page-block';

const propTypes = {
	data: PropTypes.object,
};

const StatisticsPlatform = (props) => {
	const {
		data = {
			platform: [
				{
					platform:'AG',username:'无登录',pwd:'无',
				},{
					platform:'SA',username:'无登录',pwd:'无',
				},{
					platform:'EBET',username:'无登录',pwd:'无',
				},{
					platform:'PT',username:'无登录',pwd:'无',
				},{
					platform:'UG',username:'无登录',pwd:'无',
				},{
					platform:'KY',username:'无登录',pwd:'无',
				},{
					platform:'GAMMA',username:'无登录',pwd:'无',
				},{
					platform:'AS',username:'无登录',pwd:'无',
				},{
					platform:'BIO',username:'无登录',pwd:'无',
				},{
					platform:'GD',username:'无登录',pwd:'无',
				},{
					platform:'CQ9',username:'无登录',pwd:'无',
				},
			],
		},
	} = props;
	const columns = [
		{
			title:'外接平台',
			dataIndex: 'platform',
			key: 'platform'
		},
		{
			title:'帐号',
			dataIndex: 'username',
			key: 'username'
		},
		{
			title:'密碼',
			dataIndex: 'pwd',
			key: 'pwd'
		}
	];

	return (
		<div className="stat-tab">
			<div className="tab-content-title">
				<PageBlock.Title text="外接游戏资讯" />
			</div>
			<Table
				rowKey="platform"
				alignType="center"
				columns={columns}
				dataSource={data.platform}
			/>
		</div>
	);
};

StatisticsPlatform.propTypes = propTypes;

export default StatisticsPlatform;
