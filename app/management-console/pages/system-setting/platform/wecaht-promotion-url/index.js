import React, { Component, } from 'react';
import {
	Table,
	Button,
	Input,
	Modal,
} from 'ljit-react-components';
import PageBlock from '../../../../components/page-block';
import PageModal from '../../../../components/page-modal';

const { Message, } = PageModal;

const propTypes = {};
const defaultProps = {};

class SystemSettingPlatformWechatPromotionUrlPage extends Component {
	constructor() {
		super();
		this.state = {
			isDeleteModalVisible: false,
			isCreateModalVisible: false,
			activeRecordKey: null,
			newUrl: '',
		};

		this._handleDeleteClick = this._handleDeleteClick.bind(this);
		this._handleDeleteModalSubmit = this._handleDeleteModalSubmit.bind(this);
		this._handleDeleteModalCancel = this._handleDeleteModalCancel.bind(this);
		this._handleCreateClick = this._handleCreateClick.bind(this);
		this._handleCreateModalSubmit = this._handleCreateModalSubmit.bind(this);
		this._handleCreateModalCancel = this._handleCreateModalCancel.bind(this);

	}
	_handleCreateClick() {
		this.setState({ isCreateModalVisible: true, });
	}
	_handleDeleteClick(record) {
		this.setState({
			isDeleteModalVisible: true,
			activeRecordKey: record._id,
		});
	}
	_handleDeleteModalSubmit() {
		//TODO: Delete url api by activeRecordKey
		this.setState({ isDeleteModalVisible: false, });
	}
	_handleDeleteModalCancel() {
		this.setState({ isDeleteModalVisible: false, });
	}
	_handleCreateModalSubmit() {
		//TODO: Create url api
		this.setState({ isCreateModalVisible: false, });
	}
	_handleCreateModalCancel() {
		this.setState({ isCreateModalVisible: false, });
	}
	render() {
		const {
			isCreateModalVisible,
			isDeleteModalVisible,
			newUrl,
		} = this.state;
		const columns = [{
			title: '注册网址',
			dataIndex: 'promotionUrl',
			key: 'promotionUrl',
		},{
			title: '操作',
			render: (record) => {
				return (
					<React.Fragment>
						<div>
							<span style={{ color: '#f5222d', cursor: 'pointer' }} onClick={this._handleDeleteClick}>刪除</span>
						</div>
					</React.Fragment>
				);
			}
		}];

		return (
			<PageBlock>
				<PageModal
					visible={isCreateModalVisible}
					title="新增网址"
					onClickCancel={this._handleCreateModalCancel}
					onClickOk={this._handleCreateModalSubmit}
					modalSize={Modal.ModalSizeEnum.NORMAL}
				>
					<div style={{ display: 'flex', }}>
						<label>网址：</label>
						<Input
							style={{ width: '537px', }}
							value={newUrl}
							placeholder="请输入网址"
							onChange={(event) => { this.setState({ newUrl: event.target.value, }); }}
						/>
					</div>
				</PageModal>
				<Message
					visible={isDeleteModalVisible}
					title='确认提示'
					message={`您确定要刪除嗎 ？`}
					onClickCancel={this._handleDeleteModalCancel}
					onClickOk={this._handleDeleteModalSubmit}
				>
				</Message>
				<div style={{ textAlign: 'right', paddingBottom: '25px', }}>
					<Button onClick={this._handleCreateClick}>
						新增网址
					</Button>
				</div>
				<Table
					rowKey="_id"
					columns={columns}
					dataSource={
						//TODO: change api data
						Array.from(Array(10).keys()).map((index) => ({
							_id: `${index + 1}`,
							promotionUrl:`http://coddemo.cloudapp.net:80${Math.floor(Math.random() * 10 + 1)}`,
						}))
					}
					pagination={false}
				/>
			</PageBlock>
		);
	}
}

SystemSettingPlatformWechatPromotionUrlPage.propTypes = propTypes;
SystemSettingPlatformWechatPromotionUrlPage.defaultProps = defaultProps;

export default SystemSettingPlatformWechatPromotionUrlPage;
