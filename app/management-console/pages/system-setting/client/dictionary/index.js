import React, { Component, } from 'react';
import {
	Table,
	Button,
	HeaderButtonBar,
	InputSearch,
	Divider,
	TableEllipsisText,
} from 'ljit-react-components';
import { convertDateStringToTimestamp, formatDate, } from '../../../../lib/moment-utils';
import PageBlock from '../../../../components/page-block';
import PageModal from '../../../../components/page-modal';
import SettingForm from './setting-form';
import './style.styl';

const propTypes = {};
const defaultProps = {};

class SystemSettingClientDictionaryPage extends Component {
	constructor() {
		super();
		this.state = {
			tableData: dictionary,
			inputSearchValue: null,
			isCreateModalShow: false,
			isModifyModalShow: false,
			isDeleteModalShow: false,
			modalKeyValue: null,
			modalNameValue: '',
			modalValueValue: [],
			modalDescriptionValue: '',
		};

		this._handleSubmitInputSearch = this._handleSubmitInputSearch.bind(this);
		this._renderDescriptionTable = this._renderDescriptionTable.bind(this);
		this._handleSubmitCreateDescription = this._handleSubmitCreateDescription.bind(this);
		this._handleSubmitModifyDescription = this._handleSubmitModifyDescription.bind(this);
		this._handleSubmitDeleteDescription = this._handleSubmitDeleteDescription.bind(this);
	}

	_handleSubmitInputSearch() {
		//TODO get data from api
		const { tableData, inputSearchValue, } = this.state;
		const newData = [];
		const trimmedInputSearchValue = inputSearchValue.trim();

		if (trimmedInputSearchValue === '') {
			this.setState({
				tableData: dictionary,
			});
		} else {
			tableData.forEach((item) => {
				if (item.name && item.name.includes(trimmedInputSearchValue)) {
					newData.push(item);
				} else if (item.description && item.description.includes(trimmedInputSearchValue)) {
					newData.push(item);
				} else if (Array.isArray(item.value)) {
					const hasMatchedValue = item.value.join(' ').includes(trimmedInputSearchValue);

					if (hasMatchedValue) {
						newData.push(item);
					}
				}
			});
			this.setState({
				tableData: newData,
			});
		}
	}

	_renderDescriptionTable() {
		const columns = [{
			title: '字典名称',
			dataIndex: 'name',
			key: 'name',
		},{
			title: '字典值',
			dataIndex: 'value',
			key: 'value',
			render: (record) => <div style={{ wordWrap: 'break-word', wordBreak: 'break-all', minWidth: '200px' }}>{record.join()}</div>
		},{
			title: '值类型',
			dataIndex: 'type',
			key: 'type',
			render: (record) => <div style={{ minWidth: '42px' }}>{record}</div>
		},{
			title: '备注说明',
			dataIndex: 'description',
			key: 'description',
			render: (record) => (
				<TableEllipsisText
					className="description-text"
					text={record}
					tooltipPosition={TableEllipsisText.TooltipPositionEnums.TOP}
				/>
			),
		},{
			title: '创建时间',
			dataIndex: 'createdAt',
			key: 'createdAt',
			render: (record) => <div style={{ minWidth: '76px' }}>{record}</div>
		},{
			title: '修改时间',
			dataIndex: 'updatedAt',
			key: 'updatedAt',
			render: (record) => <div style={{ minWidth: '76px' }}>{record}</div>
		},{
			title: '操作',
			dataIndex: '',
			key: '',
			render: (record) => (
				<div style={{ minWidth: '73px' }}>
					<span
						style={{ color: '#1890ff', cursor: 'pointer' }}
						onClick={() =>
							this.setState({
								isModifyModalShow: true,
								modalKeyValue: record.key,
								modalNameValue: record.name,
								modalValueValue: record.value,
								modalDescriptionValue: record.description,
							})
						}
					>
						修改
					</span>
					<Divider type={Divider.DirectionTypeEnums.VERTICAL}/>
					<span
						style={{ color: '#f5222d', cursor: 'pointer' }}
						onClick={() =>
							this.setState({
								isDeleteModalShow: true,
								modalKeyValue: record.key,
							})
						}
					>
						刪除
					</span>
				</div>
			),
		},];

		const sorters = [{
			dataIndex: 'createdAt',
			sorter: (prev, next) =>
				convertDateStringToTimestamp(prev.createdAt) - convertDateStringToTimestamp(next.createdAt),
		},{
			dataIndex: 'updatedAt',
			sorter: (prev, next) =>
				convertDateStringToTimestamp(prev.updatedAt) - convertDateStringToTimestamp(next.updatedAt),
		}];

		const { tableData } = this.state;

		return (
			<Table
				className="dictionary-management-table"
				rowKey="key"
				dataSource={tableData}
				columns={columns}
				sorters={sorters}
			/>
		);
	}

	_handleSubmitCreateDescription(data) {
		// TODO create description to server
		const { name, value, description, } = data;
		const { tableData, } = this.state;
		const newData = [...tableData];

		newData.push({
			key: tableData.length + 1,
			name,
			value: value.split(','),
			description,
			createdAt: formatDate(),
			updatedAt: formatDate(),
		});
		this.setState({
			tableData: newData,
			isCreateModalShow: false,
		});
	}

	_handleSubmitModifyDescription(data) {
		// TODO update description to server
		const { name, value, description, } = data;
		const { tableData, modalKeyValue, } = this.state;
		const newData = tableData.map((item) => {
			if (item.key === modalKeyValue) {
				return Object.assign(item, {
					name,
					value: value.split(','),
					description,
					updatedAt: formatDate(),
				});
			}
			return item;
		});

		this.setState({
			tableData: newData,
			isModifyModalShow: false,
		});
	}

	_handleSubmitDeleteDescription() {
		// TODO delete description on server
		const { tableData, modalKeyValue, } = this.state;
		const newData = [];

		tableData.forEach((item) => {
			if (item.key !== modalKeyValue) {
				newData.push(item);
			}
		});

		this.setState({
			tableData: newData,
			isDeleteModalShow: false,
		});
	}

	render() {
		const {
			inputSearchValue,
			isCreateModalShow,
			isModifyModalShow,
			isDeleteModalShow,
			modalNameValue,
			modalValueValue,
			modalDescriptionValue,
		} = this.state;
		const {
			_handleSubmitInputSearch,
			_renderDescriptionTable,
			_handleSubmitCreateDescription,
			_handleSubmitModifyDescription,
			_handleSubmitDeleteDescription,
		} = this;

		return (
			<React.Fragment>
				<PageBlock noMinHeight>
					<HeaderButtonBar
						left={[]}
						right={[
							<Button
								key="button"
								outline={Button.OutlineEnums.SOLID}
								icon={Button.IconEnums.PLUS}
								onClick={() =>
									this.setState({
										isCreateModalShow: true,
										modalKeyValue: null,
										modalNameValue: '',
										modalValueValue: [],
										modalDescriptionValue: '',
									})
								}
							>
								新增字典
							</Button>,
							<InputSearch
								key="inputSearch"
								value={inputSearchValue}
								style={{ width: '272px' }}
								onChange={(event) =>
									this.setState({ inputSearchValue: event.target.value, })
								}
								onSearch={_handleSubmitInputSearch}
								onPressEnter={_handleSubmitInputSearch}
							/>
						]}
					/>
					{_renderDescriptionTable()}
				</PageBlock>
				<SettingForm
					isVisible={isCreateModalShow}
					title="新增字典"
					initialValues={{
						name: '',
						value: '',
						description: '',
					}}
					onSubmit={_handleSubmitCreateDescription}
					onCancel={() => this.setState({ isCreateModalShow: false, })}
				/>
				<SettingForm
					isVisible={isModifyModalShow}
					title="修改字典"
					initialValues={{
						name: modalNameValue,
						value: modalValueValue.join(),
						description: modalDescriptionValue,
					}}
					isNameReadOnly
					onSubmit={_handleSubmitModifyDescription}
					onCancel={() => this.setState({ isModifyModalShow: false, })}
				/>
				<PageModal.Message
					visible={isDeleteModalShow}
					message="确定删除？"
					onClickCancel={() => this.setState({ isDeleteModalShow: false, })}
					onClickOk={_handleSubmitDeleteDescription}
				></PageModal.Message>
			</React.Fragment>
		);
	}
}

SystemSettingClientDictionaryPage.propTypes = propTypes;
SystemSettingClientDictionaryPage.defaultProps = defaultProps;

export default SystemSettingClientDictionaryPage;

const dictionary = [{
	key: 1,
	sort: 1,
	name: 'sfbaoalipay_ratio',
	value: ['0.01'],
	type: 2,
	description: '盛付宝支付宝手续费',
	createdAt: '2019/5/3 13:32:31',
	updatedAt: '2019/5/3 13:32:31',
},{
	key: 2,
	sort: 1,
	name: 'yule_pfs',
	value: ['AG', 'CMD', 'CQ', 'GMA', 'HC', 'JDB', 'LV', 'MW', 'PP', 'SA', 'UG'],
	type: 1,
	description: '娱乐平台字典',
	createdAt: '2019/5/3 13:32:31',
	updatedAt: '2019/5/3 13:32:31',
},{
	key: 3,
	sort: 1,
	name: 'AddBankIsNeedFundsPwd',
	value: ['0'],
	type: 1,
	description: '添加银行卡是否需要资金密码',
	createdAt: '2019/5/3 13:32:31',
	updatedAt: '2019/5/3 13:32:31',
},{
	key: 4,
	sort: 2,
	name: 'max_dividend_ration',
	value: ['50'],
	type: 2,
	description: '最大分红比例设置',
	createdAt: '2019/5/3 13:32:31',
	updatedAt: '2019/5/3 13:32:31',
},];
