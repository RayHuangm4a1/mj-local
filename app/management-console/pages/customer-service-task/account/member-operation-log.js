import React, { Component, } from 'react';
import { OperationLogTable, } from '../../../components/table';
import {
	Row,
	Col,
	Form,
	FormItem,
	Input,
	Select,
	DateRangePicker,
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
			isLogVisible: false,
		};
		this._handleTableChange = this._handleTableChange.bind(this);
		this._handleFormChange = this._handleFormChange.bind(this);
		this._handleSearch = this._handleSearch.bind(this);
		this._handleFormReset = this._handleFormReset.bind(this);
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
	render() {

		const {
			_handleTableChange,
			_handleFormChange,
			_handleSearch,
			_handleFormReset,
		} = this;

		return (
			<div
				className="member-operation-log customer-service-task__section"
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
								label="登录IP位址"
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
								label="类型"
								itemName="type"
								style={{ display: 'flex', }}
							>
								<Select
									style={inputStyle}
									// TODO add options
									options={undefined}
									placeholder="请选择"
								/>
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem
								label="时间"
								itemName="logAt"
								style={{ display: 'flex', }}
							>
								<DateRangePicker
									ranges={['today', 'lastSevenDays', 'lastThirtyDays',] }
									inputStyle={inputStyle}
								/>
							</FormItem>
						</Col>
					</Row>
					<Row gutter={24}>
						<Col span={8}>
							<FormItem
								label="服務器信息"
								itemName="serverMessage"
								style={{ display: 'flex', }}
							>
								<Input
									style={inputStyle}
									placeholder="请输入服务器"
								/>
							</FormItem>
						</Col>
					</Row>
				</Form>
				<OperationLogTable
					dataSource={Array.from(Array(20).keys()).map((index) => ({
						_id: `${index + 1}`,
						actionType: '开启会员API',
						appliedIp: '220.197.208.195',
						server: 'testhy.szxtd56.c',
						logAt: '2019/5/3 13:32:31',
						operator: 'admin',
						comment: '初次登录密码从[e58431c42b8431c425c6c05a6136c4]修改为[8867760368b541977b4777c3776935b7]，初次修改登录密码成功！初次登录密码从[e58431c42b8431c425c6c05a6136c4]修改为[8867760368b541977b4777c3776935b7]，初次修改登录密码成功！'
					}))}
					onTableChange={_handleTableChange}
					mode={OperationLogTable.ModeEnums.SHOWING_OPERATOR}
				/>
			</div>
		);
	}
}

MemberOperationLog.propTypes = propTypes;

export default MemberOperationLog;
