import React, { Component, } from 'react';
import PageBlock from '../../../components/page-block';
import { convertDateStringToTimestamp, } from '../../../lib/moment-utils';
import PropTypes from 'prop-types';
import {
	HeaderButtonBar,
	LabelContent,
	CheckBoxGroup,
	InputSearch,
	Table,
} from 'ljit-react-components';
import './style.styl';

const propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		username: PropTypes.string,
		nickname: PropTypes.string,
		superiorUsername: PropTypes.string,
		createdAt: PropTypes.string,
		createdSource: PropTypes.string,
		ip: PropTypes.string,
	}))
};
// TODO get data
const defaultProps = {
	data: [
		{
			key: 0,
			username: 'aad1232',
			nickname: null,
			superiorUsername: null,
			createdAt: '2018/09/06 10:51:15',
			createdSource: 'admin',
			ip: '182.33.182.239',
		},
		{
			key: 1,
			username: 'berew32',
			nickname: '佩佩',
			superiorUsername: null,
			createdAt: '2018/09/06 10:51:20',
			createdSource: 'admin',
			ip: '182.133.182.29',
		},
		{
			key: 2,
			username: 'cdgaf342',
			nickname: null,
			superiorUsername: 'jin090',
			createdAt: '2018/09/06 10:31:35',
			createdSource: 'superior',
			ip: '182.33.132.239',
		},
		{
			key: 3,
			username: 'xcvd1232',
			nickname: '小禎',
			superiorUsername: 'jin090',
			createdAt: '2018/09/06 11:21:15',
			createdSource: 'superior',
			ip: '182.33.182.39',
		},
		{
			key: 4,
			username: 'edefsdf5632',
			nickname: '波波',
			superiorUsername: 'jin090',
			createdAt: '2018/09/06 10:11:15',
			createdSource: 'recommended',
			ip: '182.93.182.239',
		},
		{
			key: 5,
			username: 'aad1232',
			nickname: '阿嚕',
			superiorUsername: 'jin090',
			createdAt: '2018/09/06 10:41:55',
			createdSource: 'weChat',
			ip: '182.33.182.39',
		},
		{
			key: 6,
			username: 'aad1232',
			nickname: '雨凡',
			superiorUsername: 'jin090',
			createdAt: '2018/09/06 06:52:15',
			createdSource: 'friend',
			ip: '132.123.102.239',
		},
	]
};
const ADMIN = 'admin';
const SUPERIOR = 'superior';
const RECOMMENDED = 'recommended';
const WECHAT = 'weChat';
const FRIEND = 'friend';
const createdSourceNameMap = {
	[ADMIN]: '管理者创建',
	[SUPERIOR]: '上级创建',
	[RECOMMENDED]: '推荐申请',
	[WECHAT]: '微信推荐',
	[FRIEND]: '好友推荐',
};

class CompanyReportOnlineStatisticsPage extends Component {
	constructor() {
		super();
		this.state = {
			devices: ['PC', 'weChat', 'mobile'],
			inputSearchValue: null,
			filteredValue: null,
		};

		this._handleDevicesChange = this._handleDevicesChange.bind(this);
		this._handleInputSearchChange = this._handleInputSearchChange.bind(this);
		this._handleSearch = this._handleSearch.bind(this);
	}

	_handleDevicesChange(devices) {
		this.setState({ devices, });
	}
	_handleInputSearchChange(event) {
		this.setState({
			inputSearchValue: event.target.value,
		});
	}
	_handleSearch() {
		const { inputSearchValue, } = this.state;

		this.setState({ filteredValue: inputSearchValue, });
	}

	render() {
		const {
			_handleDevicesChange,
			_handleInputSearchChange,
			_handleSearch,
		} = this;
		const { devices, inputSearchValue, filteredValue, } = this.state;
		const { data, } = this.props;

		return (
			<PageBlock className="online-statistics">
				<HeaderButtonBar
					left={(
						<LabelContent
							label="装置"
							columnType={LabelContent.ColumnTypeEnums.SMALL}
							noMargin
						>
							<CheckBoxGroup
								value={devices}
								options={[
									{ label:'PC',value:'PC', },
									{ label:'微信',value:'weChat', },
									{ label:'手机',value:'mobile', },
								]}
								onChange={_handleDevicesChange}
							/>
						</LabelContent>
					)}
					right={(
						<InputSearch
							value={inputSearchValue}
							onChange={_handleInputSearchChange}
							onSearch={_handleSearch}
							style={{ width: 264 }}
						/>
					)}
				/>
				<Table
					columns={[
						{
							title: '帐号',
							dataIndex: 'username',
							filteredValue: filteredValue ? [filteredValue] : null,
							onFilter: (value, record) => {
								const { username, superiorUsername } = record;

								if (superiorUsername) {
									return username.indexOf(value) !== -1 || superiorUsername.indexOf(value) !== -1;
								} else {
									return username.indexOf(value) !== -1;
								}
							},
							sorter: (a, b) => a.username.localeCompare(b.username),
						},
						{
							title: '昵称',
							dataIndex: 'nickname',
						},
						{
							title: '上级帐号',
							dataIndex: 'superiorUsername'
						},
						{
							title: '创建时间',
							dataIndex: 'createdAt',
							sorter: (a, b) => convertDateStringToTimestamp(a.createdAt) - convertDateStringToTimestamp(b.createdAt)
						},
						{
							title: '创建来源',
							dataIndex: 'createdSource',
							render: (value) => createdSourceNameMap[value],
						},
						{
							title: '用戶 IP',
							dataIndex: 'ip'
						}
					]}
					dataSource={data}
				/>
			</PageBlock>
		);
	}
}

CompanyReportOnlineStatisticsPage.propTypes = propTypes;
CompanyReportOnlineStatisticsPage.defaultProps = defaultProps;

export default CompanyReportOnlineStatisticsPage;
