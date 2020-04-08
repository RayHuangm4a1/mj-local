import React, { Component } from 'react';
import PageBlock from '../../components/page-block';
import { Table, CollapsableForm, FormItem, Input, Select, DateRangePicker, } from 'ljit-react-components';
import { convertDateStringToTimestamp } from '../../lib/moment-utils';

class MemberLogPayChangePage extends Component {
	constructor() {
		super();
		this.state = {
			isSearchResultVisible: false,
			data: [],
		};
		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleReset = this._handleReset.bind(this);
		this._renderCollapseFields = this._renderCollapseFields.bind(this);
		this._renderExpandFields = this._renderExpandFields.bind(this);
		this._renderSearchResult = this._renderSearchResult.bind(this);
	}
	_handleSubmit() {
		const form = this.collapsableFormInstance.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				// TODO fetch data
				const fakeData = [
					{
						key: '1',
						logId: 582297,
						username: 'qilnkdg',
						operator: 'admin',
						salaryMode: 'A01模式',
						originSalary: '0',
						newSalary: '1',
						logAt: '2019/5/3 13:32:31',
						remark: '新增会员工资',
					},
					{
						key: '2',
						logId: 582295,
						username: 'qwedcdfda',
						operator: 'admin',
						salaryMode: 'A01模式',
						originSalary: '0.8',
						newSalary: '0',
						logAt: '2019/5/3 13:32:40',
						remark: '删除会员工资',
					},
					{
						key: '3',
						logId: 582293,
						username: 'cxvcxzv',
						operator: 'admin',
						salaryMode: 'A01模式',
						originSalary: '0.5',
						newSalary: '0.7',
						logAt: '2019/5/3 13:32:39',
						remark: '修改工资',
					},
					{
						key: '4',
						logId: 582292,
						username: 'asdfad',
						operator: 'admin',
						salaryMode: 'A01模式',
						originSalary: '0.84',
						newSalary: '1.9',
						logAt: '2019/5/3 13:32:34',
						remark: '设置工资',
					},
					{
						key: '5',
						logId: 582497,
						username: '2e132fesda',
						operator: 'admin',
						salaryMode: 'A01模式',
						originSalary: '0.32',
						newSalary: '1.4',
						logAt: '2019/5/3 13:32:30',
						remark: '设置工资',
					},
				];

				this.setState({
					isSearchResultVisible: true,
					data: fakeData,
				});
			}
		});
	}
	_handleReset() {
		const form = this.collapsableFormInstance.getForm();

		form.resetFields();
		this.setState({
			isSearchResultVisible: false,
			data: []
		});
	}
	_renderCollapseFields() {
		return [
			<FormItem
				key="username"
				itemName="username"
				label="帐号"
				columnType={FormItem.ColumnTypeEnums.MEDIUM}
			>
				<Input placeholder="请输入帐号" style={{ width: "100%" }}/>
			</FormItem>,
			<FormItem
				key="mode"
				itemName="mode"
				label="工資模式"
				columnType={FormItem.ColumnTypeEnums.MEDIUM}
			>
				<Select
					placeholder="请输入工资模式"
					style={{ width: '100%' }}
					// TODO get options
					options={[
						{ label: 'A01模式', value: 'A01' },
						{ label: 'A02模式', value: 'A02' },
						{ label: 'A03模式', value: 'A03' },
						{ label: 'A04模式', value: 'A04' },
					]}
				/>
			</FormItem>,
		];
	}
	_renderExpandFields() {
		const { _renderCollapseFields } = this;
		const collapseFields = _renderCollapseFields();

		return [
			...collapseFields,
			<FormItem
				key="operator"
				itemName="operator"
				label="操作者"
				columnType={FormItem.ColumnTypeEnums.MEDIUM}
			>
				<Input placeholder="请输入操作者" style={{ width: "100%" }}/>
			</FormItem>,
			<FormItem
				key="date"
				itemName="date"
				label="時間"
				columnType={FormItem.ColumnTypeEnums.MEDIUM}
			>
				<DateRangePicker style={{ width: "100%" }}/>
			</FormItem>,
		];
	}

	_renderSearchResult() {
		const columns = [
			{
				title: '日志编号',
				dataIndex: 'logId',
				sorter: (a, b) => b.logId - a.logId,
			}, {
				title: '帐号',
				dataIndex: 'username',
			}, {
				title: '操作员',
				dataIndex: 'operator',
			}, {
				title: '工资模式',
				dataIndex: 'salaryMode',
			}, {
				title: '原工资',
				dataIndex: 'originSalary',
			},{
				title: '新工资',
				dataIndex: 'newSalary',
			},{
				title: '操作时间',
				dataIndex: 'logAt',
				sorter: (a, b) => convertDateStringToTimestamp(b.logAt) - convertDateStringToTimestamp(a.logAt),
			},{
				title: '备注',
				dataIndex: 'remark',
			}];
		const { data } = this.state;

		return (
			<PageBlock noMinHeight>
				<Table columns={columns} dataSource={data} pagination={false}/>
			</PageBlock>
		);
	}
	render() {
		const { isSearchResultVisible } = this.state;
		const {
			_renderCollapseFields,
			_renderExpandFields,
			_renderSearchResult,
			_handleSubmit,
			_handleReset,
		} = this;

		return (
			<React.Fragment>
				<PageBlock noMinHeight>
					<CollapsableForm
						expand
						onSubmit={_handleSubmit}
						onCancel={_handleReset}
						submitText="查询"
						cancelText="重置"
						collapseType={CollapsableForm.CollapseTypeEnum.INSERTROW}
						ref={(refForm) => this.collapsableFormInstance = refForm}
						expandChildren={_renderExpandFields()}
						collapseChildren={_renderCollapseFields()}
					/>
				</PageBlock>
				{isSearchResultVisible ? _renderSearchResult() : null}
			</React.Fragment>
		);
	}
}

export default MemberLogPayChangePage;

