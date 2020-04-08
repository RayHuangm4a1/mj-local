import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import {
	Table,
	FormItem,
	Input,
	CollapsableForm,
	DatePicker,
} from 'ljit-react-components';
import { convertDateStringToTimestamp, } from '../../lib/moment-utils';
import PageBlock from '../../components/page-block';

const fakeData = Array.from(Array(20).keys()).map((index) => {
	const remarks = ['新增娱乐工资', '删除娱乐工资', '修改娱乐工资', '设置娱乐工资'];

	return {
		_id: index + 1,
		logNumber: `${getRandom(500000, 600000)}`,
		username: `test${getRandom(1, 100)}`,
		operator: 'admin',
		originalPay: Math.random().toFixed(2),
		newestPay: Math.random().toFixed(2),
		createdAt: `2019/5/${getRandom(1, 31)} 13:32:31`,
		remark: remarks[getRandom(0, 4)],
	};
});

const propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.number,
		logNumber: PropTypes.string,
		username: PropTypes.string,
		operator: PropTypes.string,
		originalPay: PropTypes.number,
		newestPay: PropTypes.number,
		createdAt: PropTypes.string,
		remark: PropTypes.string,
	})),
};

class MemberLogEntertainmentPayChangePage extends Component {
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
			(
				<FormItem
					key="operator"
					label="操作者："
					itemName="operator"
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
				>
					<Input
						placeholder="请输入操作者"
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
					key="searchTime"
					label="发放時間："
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

	_renderLogBlock(data = []) {
		const columns = [
			{
				title: '日志编号',
				dataIndex: 'logNumber',
				sorter: (prev, next) => prev.logNumber - next.logNumber,
				sortDirections: ['descend', 'ascend'],
			},
			{
				title: '帐号',
				dataIndex: 'username',
			},
			{
				title: '操作者',
				dataIndex: 'operator',
			},
			{
				title: '原娱乐工资',
				dataIndex: 'originalPay',
			},
			{
				title: '新娱乐工资',
				dataIndex: 'newestPay',
			},
			{
				title: '操作时间',
				dataIndex: 'createdAt',
				sorter: (prev, next) => {
					return convertDateStringToTimestamp(prev.createdAt) - convertDateStringToTimestamp(next.createdAt);
				},
				sortDirections: ['descend', 'ascend'],
			},
			{
				title: '备注',
				dataIndex: 'remark',
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

MemberLogEntertainmentPayChangePage.propTypes = propTypes;

function getRandom(min, max) {
	return Math.floor(Math.random() * max) + min;
}

export default MemberLogEntertainmentPayChangePage;
