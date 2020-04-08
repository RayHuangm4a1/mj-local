import React, { Component, } from 'react';
import PageBlock from '../../components/page-block';
import {
	CollapsableForm,
	FormItem,
	Input,
	Table,
	Select,
	StatusTag,
	DateRangePicker,
} from 'ljit-react-components';
import { convertDateStringToTimestamp, } from '../../lib/moment-utils';
import './style.styl';


const inputStyle = {
	width: '264px',
};

const propTypes = {};
const defaultProps = {};

class MemberLogPointApplyPage extends Component {
	constructor() {
		super();
		this.state = {
			isExpand: true,
			isResultTableVisible: false,
		};

		this._handleCollapsableFormSubmit = this._handleCollapsableFormSubmit.bind(this);
		this._handleCollapsableFormCancel = this._handleCollapsableFormCancel.bind(this);
		this._renderExpandFields = this._renderExpandFields.bind(this);
		this._renderCollapseFields = this._renderCollapseFields.bind(this);
		this._renderResultTableBlock = this._renderResultTableBlock.bind(this);
	}
	_handleCollapsableFormSubmit(event) {
		const form = this.collapsableFormInstance.getForm();

		event.preventDefault();
		form.validateFields((err, values) => {
			//TODO: fetch api
		});

		this.setState({ isResultTableVisible: true, });
	}
	_handleCollapsableFormCancel() {
		const form = this.collapsableFormInstance.getForm();

		form.resetFields();
		this.setState({ isResultTableVisible: false, });
	}
	_renderExpandFields() {
		return ([
			<FormItem className="point-apply-search__item" label="编号" key="userNumber-expand" itemName="userNumber">
				<Input
					placeholder="请输入会员编号"
					style={inputStyle}
				/>
			</FormItem>,
			<FormItem className="point-apply-search__item" label="帐号" key="username-expand" itemName="username">
				<Input
					placeholder="请输入帐号"
					style={inputStyle}
				/>
			</FormItem>,
			<FormItem className="point-apply-search__item" label="状态" key="status-expand" itemName="status">
				<Select
					placeholder="请选择状态"
					style={inputStyle}
					options={[
						{
							label: '关闭',
							value: 'disabled',
						},
						{
							label: '开启',
							value: 'enabled',
						}
					]}
				/>
			</FormItem>,
			<FormItem className="point-apply-search__item" label="时间" key="applyAt-expand" itemName="applyAt">
				<DateRangePicker
					placeholder="请选择日期"
					inputStyle={inputStyle}
					format="YYYY/MM/DD"
				/>
			</FormItem>,
			<FormItem className="point-apply-search__item" label="时间类型" key="timeType-expand" itemName="timeType">
				<Select
					placeholder="请选择时间类型"
					style={inputStyle}
					//TODO: fetch API
					options={[
						{
							label: 'type1',
							value: 'type1',
						},
						{
							label: 'type2',
							value: 'type2',
						}
					]}
				/>
			</FormItem>,
		]);
	}
	_renderCollapseFields() {
		return ([
			<FormItem className="point-apply-search__item" label="编号" key="userNumber-collapse" itemName="userNumber">
				<Input
					placeholder="请输入会员编号"
					style={inputStyle}
				/>
			</FormItem>,
			<FormItem className="point-apply-search__item" label="帐号" key="username-collapse" itemName="username">
				<Input
					placeholder="请输入帐号"
					style={inputStyle}
				/>
			</FormItem>,
		]);
	}
	_renderResultTableBlock() {
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
			title: '申请IP',
			dataIndex: 'Ip',
			key: 'Ip',
		},{
			title: '申请区域',
			dataIndex: 'area',
			key: 'area',
		},{
			title: '到期时间',
			dataIndex: 'expireAt',
			key: 'expireAt',
			sorter: (prev, next) => convertDateStringToTimestamp(prev.expireAt) - convertDateStringToTimestamp(next.expireAt)
		},{
			title: '状态',
			dataIndex: 'status',
			key: 'status',
			render: (status) => (
				<StatusTag status={convertPointApplyStatus(status)} text={convertStatus(status)} className="status" />
			),
		},{
			title: '申请时间',
			dataIndex: 'applyAt',
			key: 'applyAt',
			sorter: (prev, next) => convertDateStringToTimestamp(prev.applyAt) - convertDateStringToTimestamp(next.applyAt)
		}];

		return (
			<PageBlock>
				<Table
					rowKey="_id"
					columns={columns}
					dataSource={
						//TODO: change api data
						applyPointData()
					}
					pagination={false}
				/>
			</PageBlock>
		);

	}
	render() {
		const { isExpand, isResultTableVisible, } = this.state;

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
				{isResultTableVisible ? this._renderResultTableBlock() : null}
			</React.Fragment>
		);
	}
}

MemberLogPointApplyPage.propTypes = propTypes;
MemberLogPointApplyPage.defaultProps = defaultProps;

export default MemberLogPointApplyPage;


function convertPointApplyStatus(status = '') {
	switch (status) {
		case 'enabled':
			return 'success';
		case 'disabled':
			return 'error';
		default:
			return '';
	}
}
function convertStatus(status = '') {
	switch (status) {
		case 'enabled':
			return '开启';
		case 'disabled':
			return '关闭';
		default:
			return '';
	}
}

const applyPointData = () => {
	let data = Array.from(Array(5).keys()).map((index) => ({
		_id: `${index + 1}`,
		userNumber:index+1,
		username: `Account - ${index + 1}`,
		actionType: '开启会员API',
		Ip: '220.197.208.195',
		area: '台湾省台北市新世纪资通股份有限公司',
		expireAt: '2019/5/3 13:32:31',
		status: 'enabled',
		applyAt: '2019/5/3 13:32:31',
	}));

	data = data.concat(Array.from(Array(5).keys()).map((index) => ({
		_id: `${index + 6}`,
		userNumber:index+6,
		username: `Account - ${index + 6}`,
		actionType: '开启会员API',
		Ip: '36.6.9.118',
		area: '台湾省中华电信(HiNet)数据中心',
		expireAt: '2019/5/1 13:32:31',
		status: 'disabled',
		applyAt: '2019/5/1 13:32:31',
	})));

	return data;
};
