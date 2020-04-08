import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import PageBlock from '../../../../components/page-block';
import { RouteKeyEnums, } from  '../../../../routes';
import {
	HeaderButtonBar,
	Button,
	Table,
	DateRangePicker,
} from 'ljit-react-components';
import ListBlock from './list-block';

const {
	SYSTEMSETTING_ADMINISTRATOR_IP_WHITE_LIST_BACKSTAGE_ADD,
	SYSTEMSETTING_ADMINISTRATOR_IP_WHITE_LIST_RECEIVE_ADD,
} = RouteKeyEnums;
const { Title } = PageBlock;
const fakeBackstageWhiteListData = [
	{
		key: 1,
		ip: '123.13.123.123',
		remark: '客服专用',
	},
	{
		key: 2,
		ip: '123.123.123.121',
		remark: '客服专用',
	},
	{
		key: 3,
		ip: '123.121.123.123',
		remark: '客服专用',
	},
];
const fakeReceiveWhiteListData = [
	{
		key: 1,
		ip: '192.129.123.123',
		remark: '客服专用',
	},
	{
		key: 2,
		ip: '123.133.123.23',
		remark: '客服专用',
	},
	{
		key: 3,
		ip: '140.112.122.123',
		remark: '客服专用',
	},
];
const fakeOperationLogsData = [
	{
		key: 1,
		logAt: "2019/03/17 21:26:23",
		operator: "Admin",
		ip: '123.113.123.123',
		action: "刪除",
		remark: '客服专用',
	},
	{
		key: 2,
		logAt: "2019/03/17 21:26:23",
		operator: "Admin",
		ip: '123.113.123.123',
		action: "刪除",
		remark: '客服专用',
	},
	{
		key: 3,
		logAt: "2019/03/17 21:26:23",
		operator: "Admin",
		ip: '123.113.123.123',
		action: "刪除",
		remark: '客服专用',
	},
];

const propTypes = {
	onNavigate: PropTypes.func
};

class SystemSettingAdministratorIpWhiteListInfoPage extends Component {
	constructor() {
		super();
		this.state = {
			dateRange: null,
			backstageWhiteListData: null,
			receiveWhiteListData: null,
			operationLogsData: null,
		};

		this._handleDateRangePickerChange = this._handleDateRangePickerChange.bind(this);
		this._handleClickSearch = this._handleClickSearch.bind(this);
		this._handleDeleteBackstageWhiteListIpSubmit = this._handleDeleteBackstageWhiteListIpSubmit.bind(this);
		this._handleDeleteReceiveWhiteListIpSubmit = this._handleDeleteReceiveWhiteListIpSubmit.bind(this);
	}

	_handleDateRangePickerChange(dateRange) {
		this.setState({ dateRange, });
	}
	_handleClickSearch() {
		// TODO send search api
	}
	_handleDeleteBackstageWhiteListIpSubmit(seletedData) {
		// TODO send delete BackstageWhiteListIp api
		const { backstageWhiteListData } = this.state;
		const updatedData = backstageWhiteListData.filter(item => {
			return item.ip !== seletedData.ip;
		});

		this.setState({
			backstageWhiteListData: updatedData,
		});
	}
	_handleDeleteReceiveWhiteListIpSubmit(seletedData) {
		// TODO send delete ReceiveWhiteListIp api
		const { receiveWhiteListData } = this.state;
		const updatedData = receiveWhiteListData.filter(item => {
			return item.ip !== seletedData.ip;
		});

		this.setState({
			receiveWhiteListData: updatedData,
		});
	}

	render() {
		const {
			_handleDateRangePickerChange,
			_handleClickSearch,
			_handleDeleteBackstageWhiteListIpSubmit,
			_handleDeleteReceiveWhiteListIpSubmit,
		} = this;
		const { onNavigate } = this.props;
		const {
			dateRange,
			backstageWhiteListData,
			receiveWhiteListData,
			operationLogsData,
		} = this.state;

		return (
			<React.Fragment>
				<ListBlock
					title="后台白名单"
					onClickAdd={() => onNavigate(SYSTEMSETTING_ADMINISTRATOR_IP_WHITE_LIST_BACKSTAGE_ADD)}
					onSubmitDelete={_handleDeleteBackstageWhiteListIpSubmit}
					data={backstageWhiteListData}
				/>
				<ListBlock
					title="收款白名单"
					onClickAdd={() => onNavigate(SYSTEMSETTING_ADMINISTRATOR_IP_WHITE_LIST_RECEIVE_ADD)}
					onSubmitDelete={_handleDeleteReceiveWhiteListIpSubmit}
					data={receiveWhiteListData}
				/>
				<PageBlock noMinHeight>
					<HeaderButtonBar
						left={(
							<Title text="白名单操作记录"/>
						)}
						right={(
							<div>
								<span>游戏時間：</span>
								<DateRangePicker
									value={dateRange}
									onChange={_handleDateRangePickerChange}
								/>
								<Button
									color={Button.ColorEnums.BRIGHTBLUE500}
									onClick={_handleClickSearch}
									style={{ marginLeft: 16 }}
								>
									查询
								</Button>
							</div>
						)}
					/>
					<Table
						columns={[
							{
								title: "操作时间",
								dataIndex: "logAt"
							},
							{
								title: "操作者",
								dataIndex: "operator"
							},
							{
								title: "IP列表",
								dataIndex: "ip"
							},
							{
								title: "动作",
								dataIndex: "action"
							},
							{
								title: "备注",
								dataIndex: "remark"
							},
						]}
						dataSource={operationLogsData}
					/>
				</PageBlock>
			</React.Fragment>
		);
	}
	componentDidMount() {
		// TODO fetch data
		this.setState({
			backstageWhiteListData: fakeBackstageWhiteListData,
			receiveWhiteListData: fakeReceiveWhiteListData,
			operationLogsData: fakeOperationLogsData,
		});
	}
}

SystemSettingAdministratorIpWhiteListInfoPage.propTypes = propTypes;

export default SystemSettingAdministratorIpWhiteListInfoPage;
