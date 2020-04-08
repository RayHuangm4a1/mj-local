import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import {
	Table,
	FormItem,
	Input,
	Select,
	CollapsableForm,
	DatePicker,
} from 'ljit-react-components';
import { convertDateStringToTimestamp, } from '../../lib/moment-utils';
import PageBlock from '../../components/page-block';
import uuid from 'uuid';

const fakeData = Array.from(Array(20).keys()).map((index) => {
	return {
		_id: index + 1,
		memberNumber: `${getRandom(500000, 600000)}`,
		username: `test${getRandom(1, 100)}`,
		originalPassword: uuid(),
		newestPassword: uuid(),
		passwordType: `${getRandom(1, 4)}`,
		loginIp: `220.197.208.${getRandom(0, 255)}`,
		serverType: '1',
		serverMessage: 'testhy.szxtd56.c',
		createdAt: `2019/5/${getRandom(1, 31)} 13:32:31`,
	};
});

const propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.number,
		memberNumber: PropTypes.string,
		username: PropTypes.string,
		originalPassword: PropTypes.string,
		newestPassword: PropTypes.string,
		passwordType: PropTypes.string,
		loginIp: PropTypes.string,
		serverType: PropTypes.string,
		serverMessage: PropTypes.string,
		createdAt: PropTypes.string,
	})),
};

class MemberLogPasswordChangePage extends Component {
	constructor() {
		super();
		this.state = {
			isLogVisible: false,
		};
		this._handleSearch = this._handleSearch.bind(this);
		this._handleReset = this._handleReset.bind(this);
		this._renderExpandFields = this._renderExpandFields.bind(this);
		this._renderCollapseFields = this._renderCollapseFields.bind(this);
		this._handleTableChange = this._handleTableChange.bind(this);
		this._renderRow = this._renderRow.bind(this);
		this._renderLogBlock = this._renderLogBlock.bind(this);
	}

	_handleSearch(event) {
		const form = this.formInstance.getForm();

		event.preventDefault();
		form.validateFields((error, data) => {
			if (!error) {
				// TODO call api
				this.setState({ isLogVisible: !this.state.isLogVisible, });
			}
		});
	}
	_handleReset() {
		const form = this.formInstance.getForm();

		form.resetFields();
	}

	_renderCollapseFields() {
		return [
			(
				<FormItem
					key="memberNumber"
					label="编号："
					itemName="memberNumber"
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
				>
					<Input
						placeholder="请输入会员编号"
					/>
				</FormItem>
			),
			(
				<FormItem
					key="username"
					label="帐号："
					itemName="username"
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
				>
					<Input
						placeholder="请输入帐号"
					/>
				</FormItem>
			),
		];
	}
	_renderExpandFields() {
		const collapseFields = this._renderCollapseFields();
		const fields = [
			(
				<FormItem
					key="passwordType"
					label="密码类型："
					itemName="passwordType"
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
				>
					<Select
						options={[
							{ label: '资金密码', value: '1' },
							{ label: '登录密码', value: '2' },
							{ label: '投注密码', value: '3' },
						]}
						placeholder="请选择密码类型"
					/>
				</FormItem>
			),
			(
				<FormItem
					key="searchTime"
					label="時間："
					itemName="searchTime"
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
				>
					<DatePicker
						format="YYYY/M/DD hh:mm"
						style={{ width: '100%', }}
						isShowToday
						placeholder="请选择日期"
					/>
				</FormItem>
			),
		];

		return [].concat(collapseFields, fields);
	}

	_handleTableChange() {
		// TODO call api sort, filter data
	}

	_renderRow(record) {
		const {
			originalPassword,
			serverMessage,
		} = record;

		return (
			<div className="expend-content">
				<p className="expend-content__line">
					{`原始密码：${originalPassword}`}
				</p>
				<p className="expend-content__line">
					{`服务器信息：${serverMessage}`}
				</p>
			</div>
		);
	}
	_renderLogBlock(data = []) {
		const columns = [
			{
				title: '会员编号',
				dataIndex: 'memberNumber',
				sorter: (prev, next) => prev.memberNumber - next.memberNumber,
				sortDirections: ['descend', 'ascend'],
			},
			{
				title: '帐号',
				dataIndex: 'username',
			},
			{
				title: '新密码',
				dataIndex: 'newestPassword',
			},
			{
				title: '密码类型',
				dataIndex: 'passwordType',
				render: type => getPasswordTypeString(type),
			},
			{
				title: '登录IP',
				dataIndex: 'loginIp',
			},
			{
				title: '服务器类型',
				dataIndex: 'serverType',
			},
			{
				title: '操作时间',
				dataIndex: 'createdAt',
				sorter: (prev, next) => {
					return convertDateStringToTimestamp(prev.createdAt) - convertDateStringToTimestamp(next.createdAt);
				},
				sortDirections: ['descend', 'ascend'],
			},
		];

		return (
			<PageBlock>
				<Table
					rowKey="_id"
					alignType={Table.AlignTypeEnums.CENTER}
					onChange={this._handleTableChange}
					dataSource={data}
					columns={columns}
					expandedRowRender={(record) => this._renderRow(record)}
				/>
			</PageBlock>
		);
	}

	render() {
		const {
			data = fakeData,
			isLogVisible,
		} = this.state;

		return (
			<Fragment>
				<PageBlock noMinHeight>
					<CollapsableForm
						expand
						onSubmit={this._handleSearch}
						onCancel={this._handleReset}
						onChange={() => {}}
						submitText="查询"
						cancelText="重置"
						collapseType={CollapsableForm.CollapseTypeEnum.INSERTROW}
						columnSize={CollapsableForm.ColumnSizeEnums.SMALL}
						ref={(formRef) => this.formInstance = formRef}
						collapseChildren={this._renderCollapseFields()}
						expandChildren={this._renderExpandFields()}
					/>
				</PageBlock>
				{isLogVisible ? this._renderLogBlock(data) : null}
			</Fragment>
		);
	}
}

MemberLogPasswordChangePage.propTypes = propTypes;

function getPasswordTypeString(passwordType) {
	let result = '';

	if (passwordType === '1') {
		result = '资金密码';
	}
	if (passwordType === '2') {
		result = '登录密码';
	}
	if (passwordType === '3') {
		result = '投注密码';
	}
	return result;
}

function getRandom(min, max) {
	return Math.floor(Math.random() * max) + min;
}

export default MemberLogPasswordChangePage;
