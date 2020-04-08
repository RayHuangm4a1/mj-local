import React, { Component, } from 'react';
import {
	Table,
	Button,
	HeaderButtonBar,
	Divider,
	Datetime,
} from 'ljit-react-components';
import { convertDateStringToTimestamp, formatDate, } from '../../../../lib/moment-utils';
import PageBlock from '../../../../components/page-block';
import PageModal from '../../../../components/page-modal';
import SettingForm from './setting-form';
import './style.styl';

const propTypes = {};
const defaultProps = {};

class SystemSettingPlatformAppVersionControlPage extends Component {
	constructor() {
		super();
		this.state = {
			tableData: app,
			isCreateModalShow: false,
			isModifyModalShow: false,
			isDeleteModalShow: false,
			modalKeyValue: null,
			modalVersionValue: '',
			modalPlatformValue: '',
			modalURLValue: '',
			modalDiscriptionValue: '',
		};

		this._renderExplainTable = this._renderExplainTable.bind(this);
		this._handleSubmitCreateAppVersion = this._handleSubmitCreateAppVersion.bind(this);
		this._handleSubmitModifyAppVersion = this._handleSubmitModifyAppVersion.bind(this);
		this._handleSubmitDeleteAppVersion = this._handleSubmitDeleteAppVersion.bind(this);
	}

	_renderExplainTable() {
		const columns = [{
			title: '版本号',
			dataIndex: 'version',
			key: 'version',
			render: (record) => <div style={{ minWidth: '42px' }}>{record}</div>
		},{
			title: '平台',
			dataIndex: 'platform',
			key: 'platform',
		},{
			title: '连结网址',
			dataIndex: 'url',
			key: 'url',
		},{
			title: '描述',
			dataIndex: 'discription',
			key: 'discription',
		},{
			title: '上传时间',
			dataIndex: 'uploadedAt',
			key: 'uploadedAt',
			render: (record) => (
				<div style={{ minWidth: '76px' }}>
					<Datetime data={record} />
				</div>
			),
		},{
			title: '功能',
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
								modalVersionValue: record.version,
								modalPlatformValue: record.platform,
								modalURLValue: record.url,
								modalDiscriptionValue: record.discription,
							})
						}
					>
						修改
					</span>
					<Divider type="vertical"/>
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
			dataIndex: 'uploadedAt',
			sorter: (prev, next) =>
				convertDateStringToTimestamp(prev.createTime) - convertDateStringToTimestamp(next.createTime),
		},];

		const { tableData, } = this.state;

		return (
			<Table
				className="app-version-table"
				rowKey="key"
				dataSource={tableData}
				columns={columns}
				sorters={sorters}
			/>
		);
	}

	_handleSubmitCreateAppVersion(data) {
		// TODO create explain to server
		const { version, platform, url, discription, } = data;

		const { tableData, } = this.state;
		const newData = [...tableData];

		newData.push({
			key: tableData.length + 1,
			version,
			platform,
			url,
			discription,
			uploadedAt: formatDate(),
		});
		this.setState({
			tableData: newData,
			isCreateModalShow: false,
		});
	}

	_handleSubmitModifyAppVersion(data) {
		// TODO update explain to server
		const { version, platform, url, discription, } = data;
		const { tableData, modalKeyValue, } = this.state;
		const newData = tableData.map((item) => {
			if (item.key === modalKeyValue) {
				return Object.assign(item, {
					version,
					platform,
					url,
					discription,
					uploadedAt: formatDate(),
				});
			}
			return item;
		});

		this.setState({
			tableData: newData,
			isModifyModalShow: false,
		});
	}

	_handleSubmitDeleteAppVersion() {
		// TODO delete explain on server
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
			isCreateModalShow,
			isModifyModalShow,
			isDeleteModalShow,
			modalVersionValue,
			modalPlatformValue,
			modalURLValue,
			modalDiscriptionValue,
		} = this.state;
		const {
			_renderExplainTable,
			_handleSubmitCreateAppVersion,
			_handleSubmitModifyAppVersion,
			_handleSubmitDeleteAppVersion,
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
									})
								}
							>
								新增网址
							</Button>
						]}
					/>
					{_renderExplainTable()}
				</PageBlock>
				<SettingForm
					visible={isCreateModalShow}
					title="新增网址"
					initialValues={{
						version: '',
						platform: 'ios',
						url: '',
						discription: '',
					}}
					onSubmit={_handleSubmitCreateAppVersion}
					onCancel={() => this.setState({ isCreateModalShow: false, })}
				/>
				<SettingForm
					visible={isModifyModalShow}
					title="修改"
					initialValues={{
						version: modalVersionValue,
						platform: modalPlatformValue,
						url: modalURLValue,
						discription: modalDiscriptionValue,
					}}
					onSubmit={_handleSubmitModifyAppVersion}
					onCancel={() => this.setState({ isModifyModalShow: false, })}
				/>
				<PageModal.Message
					visible={isDeleteModalShow}
					message="确定删除？"
					onClickCancel={() => this.setState({ isDeleteModalShow: false, })}
					onClickOk={_handleSubmitDeleteAppVersion}
				></PageModal.Message>
			</React.Fragment>
		);
	}
}

SystemSettingPlatformAppVersionControlPage.propTypes = propTypes;
SystemSettingPlatformAppVersionControlPage.defaultProps = defaultProps;

export default SystemSettingPlatformAppVersionControlPage;

const app = [{
	key: 1,
	version: '1',
	platform: 'ios',
	url: 'http://coddemo.cloudapp.net',
	discription: '測試',
	uploadedAt: '2018-12-04T10:45:36+00:00',
},{
	key: 2,
	version: '1',
	platform: 'android',
	url: 'http://d1.cod168.net:9999',
	discription: '測試',
	uploadedAt: '2018-12-04T10:45:36+00:00',
},{
	key: 3,
	version: '1',
	platform: 'android',
	url: 'http://d2.cod168.net:9999',
	discription: '測試',
	uploadedAt: '2018-12-04T10:45:36+00:00',
},];
