import React, { Component, } from 'react';
import PageBlock from '../../components/page-block';
import {
	CollapsableForm,
	FormItem,
	Input,
	Table,
	Select,
	DateRangePicker,
	TableEllipsisText,
} from 'ljit-react-components';
import { convertDateStringToTimestamp, } from '../../lib/moment-utils';
import './style.styl';

const inputStyle = {
	width: '100%',
};

const propTypes = {};
const defaultProps = {};

class MemberLogOperationPage extends Component {
	constructor() {
		super();
		this.state = {
			isExpand: true,
		};

		this._handleCollapsableFormSubmit = this._handleCollapsableFormSubmit.bind(this);
		this._handleCollapsableFormCancel = this._handleCollapsableFormCancel.bind(this);
		this._renderExpandFields = this._renderExpandFields.bind(this);
		this._renderCollapseFields = this._renderCollapseFields.bind(this);
	}
	_handleCollapsableFormSubmit(event) {
		const form = this.collapsableFormInstance.getForm();

		event.preventDefault();
		form.validateFields((err, values) => {
			//TODO: fetch api
		});
	}
	_handleCollapsableFormCancel() {
		const form = this.collapsableFormInstance.getForm();

		form.resetFields();
	}
	_renderExpandFields() {
		return ([
			<FormItem label="编号" key="userNumber-expand" itemName="userNumber" columnType={FormItem.ColumnTypeEnums.SMALL}>
				<Input
					placeholder="请输入会员编号"
					style={inputStyle}
				/>
			</FormItem>,
			<FormItem label="帐号" key="username-expand" itemName="username" columnType={FormItem.ColumnTypeEnums.SMALL}>
				<Input
					placeholder="请输入帐号"
					style={inputStyle}
				/>
			</FormItem>,
			<FormItem label="服务器" key="server-expand" itemName="server" columnType={FormItem.ColumnTypeEnums.SMALL}>
				<Input
					placeholder="请输入服务器"
					style={inputStyle}
				/>
			</FormItem>,
			<FormItem label="类型" key="actionType-expand" itemName="actionType" columnType={FormItem.ColumnTypeEnums.SMALL}>
				<Select
					placeholder="请选择操作类型"
					//TODO: fetch API
					options={[
						{
							label: '添加会员',
							value: 1,
						},
						{
							label: '开启会员API',
							value: 2,
						}
					]}
				/>
			</FormItem>,
			<FormItem label="時間" key="logAt-expand" itemName="logAt" columnType={FormItem.ColumnTypeEnums.SMALL}>
				<DateRangePicker
					inputStyle={inputStyle}
					format="YYYY/MM/DD"
				/>
			</FormItem>,
		]);
	}
	_renderCollapseFields() {
		return ([
			<FormItem label="编号" key="userNumber-collapse" itemName="userNumber" columnType={FormItem.ColumnTypeEnums.SMALL}>
				<Input
					placeholder="请输入会员编号"
					style={inputStyle}
				/>
			</FormItem>,
			<FormItem label="帐号" key="username-collapse" itemName="username" columnType={FormItem.ColumnTypeEnums.SMALL}>
				<Input
					placeholder="请输入帐号"
					style={inputStyle}
				/>
			</FormItem>,
		]);
	}
	render() {
		const { isExpand, } = this.state;
		const columns = [{
			title: '会员编号',
			dataIndex: 'userNumber',
			key: 'userNumber',
			sorter: (prev, next) => prev.userNumber - next.userNumber
		},{
			title: '帐号',
			dataIndex: 'username',
			key: 'username',
		},{
			title: '操作类型',
			dataIndex: 'actionType',
			key: 'actionType',
		},{
			title: '申请IP',
			dataIndex: 'appliedIp',
			key: 'appliedIp',
		},{
			title: '服务器信息',
			dataIndex: 'server',
			key: 'server',
		},{
			title: '操作时间',
			dataIndex: 'logAt',
			key: 'logAt',
			sorter: (prev, next) => convertDateStringToTimestamp(prev.logAt) - convertDateStringToTimestamp(next.logAt),
		},{
			title: '备注',
			dataIndex: 'note',
			key: 'note',
			width: '200px',
			render: (record) => (
				<React.Fragment>
					<TableEllipsisText text={record} positionToRight={-50}/>
				</React.Fragment>)
		}];

		return (
			<React.Fragment>
				<PageBlock noMinHeight>
					<CollapsableForm
						expand={isExpand}
						onSubmit={this._handleCollapsableFormSubmit}
						onCancel={this._handleCollapsableFormCancel}
						submitText="查询"
						cancelText="重置"
						collapseType={CollapsableForm.CollapseTypeEnum.INSERTROW}
						ref={(refForm) => this.collapsableFormInstance = refForm}
						expandChildren={this._renderExpandFields()}
						collapseChildren={this._renderCollapseFields()}
					>
					</CollapsableForm>
				</PageBlock>
				<PageBlock>
					<Table
						rowKey="_id"
						columns={columns}
						dataSource={
							//TODO: change api data
							Array.from(Array(10).keys()).map((index) => ({
								_id: `${index + 1}`,
								userNumber:index+1,
								username: `Account - ${index + 1}`,
								actionType: '开启会员API',
								appliedIp: '220.197.208.195',
								server: 'testhy.szxtd56.c',
								logAt: '2019/5/3 13:32:31',
								note: '初次登录密码从[e58431c42b8431c425c6c05a6136c4]修改为[8867760368b541977b4777c3776935b7]，初次修改登录密码成功！初次登录密码从[e58431c42b8431c425c6c05a6136c4]修改为[8867760368b541977b4777c3776935b7]，初次修改登录密码成功！'
							}))
						}
						pagination={false}
					/>
				</PageBlock>
			</React.Fragment>
		);
	}
}

MemberLogOperationPage.propTypes = propTypes;
MemberLogOperationPage.defaultProps = defaultProps;

export default MemberLogOperationPage;
