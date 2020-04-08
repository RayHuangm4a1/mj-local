import React, { Component, } from 'react';
import { IpLoginLogTable, } from '../../../components/table';
import {
	Row,
	Col,
	Form,
	FormItem,
	Input,
	HeaderButtonBar,
	DateRangePicker,
	Button,
	RadioGroup,
} from 'ljit-react-components';

const inputStyle = {
	width: '264px',
};

const propTypes = {
};

class MemberOperationLog extends Component {
	constructor() {
		super();
		this.state = {
			selectedRowKeys: [],
		};
		this._handleTableChange = this._handleTableChange.bind(this);
		this._handleFormChange = this._handleFormChange.bind(this);
		this._handleSearch = this._handleSearch.bind(this);
		this._handleFormReset = this._handleFormReset.bind(this);
		this._handleRowSelectionChange = this._handleRowSelectionChange.bind(this);
		this._handleBannedItemsAdd = this._handleBannedItemsAdd.bind(this);
	}
	_handleRowSelectionChange(selectedRowKeys) {
		this.setState({
			selectedRowKeys,
		});
	}
	_handleTableChange() {
		// TODO call api sort data
	}
	_handleFormChange() {
		//TODO call form item change api
	}
	_handleSearch() {
		//TODO call form item change api
	}
	_handleFormReset() {
		const form = this.refForm.getForm();

		form.resetFields();
	}
	_handleBannedItemsAdd() {
		//TODO call banned ip api
	}
	render() {
		const { selectedRowKeys, } = this.state;
		const {
			_handleTableChange,
			_handleFormChange,
			_handleSearch,
			_handleFormReset,
			_handleBannedItemsAdd
		} = this;

		const rowSelection = {
			selectedRowKeys,
			onChange: this._handleRowSelectionChange,
		};

		return (
			<div
				className="ip-login-log customer-service-task__section"
			>
				<Form
					onChange={_handleFormChange}
					onSubmit={_handleSearch}
					onCancel={_handleFormReset}
					submitText="查询"
					cancelText="重置"
					ref={(refForm) => this.refForm = refForm }
				>
					<Row gutter={24}>
						<Col span={8}>
							<FormItem
								label="登录IP位址："
								itemName="Ip"
								style={{ display: 'flex', }}
							>
								<Input
									style={inputStyle}
									placeholder="请输入IP"
								/>
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem
								label="登录时间"
								itemName="loginAt"
								style={{ display: 'flex', }}
							>
								<DateRangePicker
									ranges={['today', 'lastSevenDays', 'lastThirtyDays',] }
									inputStyle={inputStyle}
								/>
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem
								label="来源网址："
								itemName="sourceUrl"
								style={{ display: 'flex', }}
							>
								<Input
									style={inputStyle}
									placeholder="请输入来源网址"
								/>
							</FormItem>
						</Col>
					</Row>
					<Row gutter={24}>
						<Col span={8}>
							<FormItem
								label=""
								itemName="searchType"
								style={{ display: 'flex', }}
								itemConfig={{
									initialValue: 'current'
								}}
							>
								<RadioGroup
									options={[
										{ label: '仅搜当前帐号', value: 'current', },
										{ label: '搜所有帐号', value: 'all', },
									]}
								/>
							</FormItem>
						</Col>
					</Row>
				</Form>
				<div className="ip-login-log__block">
					<HeaderButtonBar
						right={(
							<Button
								onClick={_handleBannedItemsAdd}
							>
								将选取项目移入黑名单
							</Button>
						)}
					/>
				</div>
				<IpLoginLogTable
					dataSource={dataSource}
					rowSelection={rowSelection}
					onTableChange={_handleTableChange}
				/>
			</div>
		);
	}
}

MemberOperationLog.propTypes = propTypes;

export default MemberOperationLog;

const dataSource = [{
	_id: '1',
	ip: '211.23.162.10',
	username: 'Admin0',
	lastLoginAt: '2019/02/13 13:48:34',
	domain: 'coddemo.cloudapp.net:80807',
	nation: '台灣',
	province: 'N/A',
	county: 'N/A',
},{
	_id: '2',
	ip: '211.23.162.10',
	username: 'Admin1',
	lastLoginAt: '2019/02/13 13:48:34',
	domain: 'coddemo.cloudapp.net:80807',
	nation: '台灣',
	province: 'N/A',
	county: 'N/A',
},{
	_id: '3',
	ip: '211.23.162.10',
	username: 'Admin2',
	lastLoginAt: '2019/02/13 13:48:34',
	domain: 'coddemo.cloudapp.net:80807',
	nation: '台灣',
	province: 'N/A',
	county: 'N/A',
},{
	_id: '4',
	ip: '211.23.162.10',
	username: 'Admin3',
	lastLoginAt: '2019/02/13 13:48:34',
	domain: 'coddemo.cloudapp.net:80807',
	nation: '台灣',
	province: 'N/A',
	county: 'N/A',
},{
	_id: '5',
	ip: '211.23.162.10',
	username: 'Admin4',
	lastLoginAt: '2019/02/13 13:48:34',
	domain: 'coddemo.cloudapp.net:80807',
	nation: '台灣',
	province: 'N/A',
	county: 'N/A',
},{
	_id: '6',
	ip: '211.23.162.10',
	username: 'Admin5',
	lastLoginAt: '2019/02/13 13:48:34',
	domain: 'coddemo.cloudapp.net:80807',
	nation: '台灣',
	province: 'N/A',
	county: 'N/A',
},{
	_id: '12',
	ip: '211.23.162.10',
	username: 'Admin1',
	lastLoginAt: '2019/02/13 13:48:34',
	domain: 'coddemo.cloudapp.net:80807',
	nation: '台灣',
	province: 'N/A',
	county: 'N/A',
},{
	_id: '13',
	ip: '211.23.162.10',
	username: 'Admin2',
	lastLoginAt: '2019/02/13 13:48:34',
	domain: 'coddemo.cloudapp.net:80807',
	nation: '台灣',
	province: 'N/A',
	county: 'N/A',
},{
	_id: '14',
	ip: '211.23.162.10',
	username: 'Admin3',
	lastLoginAt: '2019/02/13 13:48:34',
	domain: 'coddemo.cloudapp.net:80807',
	nation: '台灣',
	province: 'N/A',
	county: 'N/A',
},{
	_id: '15',
	ip: '211.23.162.10',
	username: 'Admin4',
	lastLoginAt: '2019/02/13 13:48:34',
	domain: 'coddemo.cloudapp.net:80807',
	nation: '台灣',
	province: 'N/A',
	county: 'N/A',
},{
	_id: '16',
	ip: '211.23.162.10',
	username: 'Admin5',
	lastLoginAt: '2019/02/13 13:48:34',
	domain: 'coddemo.cloudapp.net:80807',
	nation: '台灣',
	province: 'N/A',
	county: 'N/A',
},];
