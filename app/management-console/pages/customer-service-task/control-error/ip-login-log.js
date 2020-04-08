import React, { Component, } from 'react';
import { IpLoginLogTable, } from '../../../components/table';
import {
	Row,
	Col,
	Form,
	FormItem,
	Input,
	LabelContent,
	DateRangePicker,
	Button,
} from 'ljit-react-components';
import PageBlock from '../../../components/page-block';

const inputStyle = {
	width: '264px',
};

const propTypes = {
};

class IpLoginLog extends Component {
	constructor() {
		super();
		this.state = {
			selectedRowKeys: [],
		};
		this._handleSearch = this._handleSearch.bind(this);
		this._handleResetForm = this._handleResetForm.bind(this);
	}
	_handleSearch() {
		//TODO call Search api
	}
	_handleResetForm() {
		const form = this.refForm.getForm();

		form.resetFields();
	}
	render() {
		const {
			_handleSearch,
			_handleResetForm,
		} = this;

		return (
			<PageBlock>
				<Form
					submitButtonDisabled
					cancelButtonDisabled
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
							<LabelContent>
								<Button
									onClick={_handleSearch}
									color={Button.ColorEnums.BRIGHTBLUE500}
								>
									查询
								</Button>
								<Button
									onClick={_handleResetForm}
									outline={Button.OutlineEnums.HOLLOW}
									style={{ marginLeft: 16, }}
								>
									重置
								</Button>
							</LabelContent>
						</Col>
					</Row>
				</Form>
				<IpLoginLogTable
					dataSource={dataSource}
				/>
			</PageBlock>
		);
	}
}

IpLoginLog.propTypes = propTypes;

export default IpLoginLog;

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
