import React, { Component, } from 'react';
import {
	CollapsableForm,
	FormItem,
	Input,
	Table,
	DateRangePicker
} from 'ljit-react-components';
import PageBlock from '../../components/page-block';
import { convertDateStringToTimestamp, } from '../../lib/moment-utils';

const propType = {};
const defaultProps = {};

const inputStyle = {
	width: '264px',
};

class MemberLogFreezePage extends Component {
	constructor() {
		super();
		this.state = {
			isExpand: true,
			isResultTableVisible: false
		};

		this._renderExpandFields = this._renderExpandFields.bind(this);
		this._renderCollapseFields = this._renderCollapseFields.bind(this);
		this._handleCollapsableFormSubmit = this._handleCollapsableFormSubmit.bind(this);
		this._handleCollapsableFormCancel = this._handleCollapsableFormCancel.bind(this);
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
			<FormItem label="帐号" key="account-expand" itemName="account" style={{ display: 'flex', }}>
				<Input
					placeholder="请输入帐号"
					style={inputStyle}
				/>
			</FormItem>,
			<FormItem label="会员编号" key="userId-expand" itemName="userId" style={{ display: 'flex', }}>
				<Input
					placeholder="请输入会员编号"
					style={inputStyle}
				/>
			</FormItem>,
			<FormItem label="查询时间" key="freezeAt-expand" itemName="freezeAt" style={{ display: 'flex', }}>
				<DateRangePicker
					format="YYYY/M/DD"
					ranges={['today', 'lastSevenDays', 'lastThirtyDays']}
					inputStyle={inputStyle}
				/>
			</FormItem>,
		]);
	}
	_renderCollapseFields() {
		return ([
			<FormItem label="帐号" key="account-collapse" itemName="account" style={{ display: 'flex', }}>
				<Input
					placeholder="请输入帐号"
					style={inputStyle}
				/>
			</FormItem>,
			<FormItem label="会员编号" key="userId-collapse" itemName="userId" style={{ display: 'flex', }}>
				<Input
					placeholder="请输入会员编号"
					style={inputStyle}
				/>
			</FormItem>,
		]);
	}
	_renderResultTableBlock() {
		const columns = [{
			title: '会员编号',
			dataIndex: 'userId',
			key: 'userId',
			sorter: (prev, next) => prev.userId - next.userId
		},{
			title: '冻结帐号',
			dataIndex: 'account',
			key: 'account',
		},{
			title: '冻结时间',
			dataIndex: 'freezeAt',
			key: 'freezeAt',
			sorter: (prev, next) => convertDateStringToTimestamp(prev.freezeAt) - convertDateStringToTimestamp(next.freezeAt),
		},{
			title: '操作者',
			dataIndex: 'administrator',
			key: 'administrator',
		},{
			title: '备注',
			dataIndex: 'note',
			key: 'note',
		},];

		return (
			<PageBlock>
				<Table
					rowKey="_id"
					columns={columns}
					dataSource={
						//TODO: change api data
						Array.from(Array(10).keys()).map((index) => ({
							_id: `${index + 1}`,
							userId:index+1,
							account: `Account - ${index + 1}`,
							freezeAt: '2019/5/3 13:32:31',
							administrator: 'Admin',
							note: '注册会员',
						}))
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

MemberLogFreezePage.propType = propType;
MemberLogFreezePage.defaultProps = defaultProps;

export default MemberLogFreezePage;
