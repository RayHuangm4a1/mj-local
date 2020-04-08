import React, { Component } from 'react';
import {
	HeaderButtonBar,
	InputSearch,
	Button,
	Table,
	Divider,
} from 'ljit-react-components';
import PageBlock from '../../../../components/page-block';
import PageModal from '../../../../components/page-modal';
import CreateModal from './create-modal';
import SendModal from './send-modal';
import './style.styl';

const propTypes = {};

const defaultProps = {};
const BEFORE_DISPLAYED_NUMBER = 3;
const AFTER_DISPLAYED_NUMBER = 3;

class CashSystemThirdPartyListPage extends Component {
	constructor() {
		super();

		this.state = {
			tableData: data,
			isCreateModalVisible: false,
			isSendModalVisible: false,
			isDeleteModalVisible: false,
			record: {},
		};

		this._handleClickCreateThirdPartyAccount = this._handleClickCreateThirdPartyAccount.bind(this);
		this._handleSubmitCreateAccount = this._handleSubmitCreateAccount.bind(this);
		this._handleShowSendModal = this._handleShowSendModal.bind(this);
		this._handleSubmitSend = this._handleSubmitSend.bind(this);
		this._handleShowDeleteModal = this._handleShowDeleteModal.bind(this);
		this._handleSubmitDelete = this._handleSubmitDelete.bind(this);
		this._renderTable = this._renderTable.bind(this);
	}

	_handleClickCreateThirdPartyAccount() {
		this.setState({
			isCreateModalVisible: true,
		});
	}

	_handleSubmitCreateAccount(form) {
		const { tableData } = this.state;

		form.validateFields((error, data) => {
			if (!error) {
				// TODO call api update
				tableData.push({
					key: tableData.length + 1,
					bank: data.bank,
					province: data.province,
					city: data.city,
					branch: data.branch,
					cardName: data.cardName,
					accountId: data.accountId,
				});
				this.setState({
					tableData,
					isCreateModalVisible: false,
				});
			}
		});
	}

	_handleShowSendModal(record) {
		this.setState({
			isSendModalVisible: true,
			record,
		});
	}

	_handleSubmitSend(form) {
		form.validateFields((error, data) => {
			if (!error) {
				// TODO call api send
				this.setState({
					isSendModalVisible: false,
				});
			}
		});
	}

	_handleShowDeleteModal(record) {
		this.setState({
			isDeleteModalVisible: true,
			record,
		});
	}

	_handleSubmitDelete() {
		const { tableData, record } = this.state;
		const index = tableData.findIndex((item) => item.accountId === record.accountId);

		tableData.splice(index, 1);
		this.setState({
			tableData,
			isDeleteModalVisible: false,
		});
	}

	_renderTable() {
		const columns = [{
			title: '银行名称',
			dataIndex: 'bank',
			key: 'bank',
		},{
			title: '银行省份',
			dataIndex: 'province',
			key: 'province',
		},{
			title: '银行城市',
			dataIndex: 'city',
			key: 'city',
		},{
			title: '支行名称',
			dataIndex: 'branch',
			key: 'branch',
		},{
			title: '银行卡姓名',
			dataIndex: 'cardName',
			key: 'cardName',
		},{
			title: '出款帐号',
			dataIndex: 'accountId',
			key: 'accountId',
			render: (record) => conversionText(record)
		},{
			title: '操作',
			dataIndex: '',
			key: '',
			render: (record) => (
				<div>
					<span
						style={{ color: '#1890ff', cursor: 'pointer' }}
						onClick={() => this._handleShowSendModal(record)}
					>
						下发
					</span>
					<Divider type={Divider.DirectionTypeEnums.VERTICAL}/>
					<span
						style={{ color: '#f5222d', cursor: 'pointer' }}
						onClick={() => this._handleShowDeleteModal(record)}
					>
						刪除
					</span>
				</div>
			),
		}];

		return (
			<Table
				className="third-party-list-table"
				dataSource={this.state.tableData}
				columns={columns}
			/>
		);
	}

	render() {
		const {
			record,
			isSendModalVisible,
			isCreateModalVisible,
			isDeleteModalVisible
		} = this.state;
		const {
			_renderTable,
			_handleClickCreateThirdPartyAccount,
			_handleSubmitCreateAccount,
			_handleSubmitSend,
			_handleSubmitDelete
		} = this;

		return (
			<PageBlock>
				<HeaderButtonBar
					left={
						<InputSearch
							style={{ width: 224 }}
							placeholder="请输入帳號"
						/>
					}
					right={
						<Button
							outline={Button.OutlineEnums.SOLID}
							icon={Button.IconEnums.PLUS}
							onClick={_handleClickCreateThirdPartyAccount}
						>
							新增第三方下发出款帐号
						</Button>
					}
				/>
				{_renderTable()}
				<CreateModal
					visible={isCreateModalVisible}
					onSubmit={_handleSubmitCreateAccount}
					onCancel={() => {
						this.setState({
							isCreateModalVisible: false,
						});
					}}
				/>
				<SendModal
					visible={isSendModalVisible}
					onSubmit={_handleSubmitSend}
					onCancel={() => {
						this.setState({
							isSendModalVisible: false,
						});
					}}
					record={record}
				/>
				<PageModal.Message
					title="确认提示"
					message="是否确定刪除此帳號？"
					visible={isDeleteModalVisible}
					onClickOk={_handleSubmitDelete}
					onClickCancel={() => {
						this.setState({
							isDeleteModalVisible: false,
						});
					}}
					modalSize={PageModal.ModalSizeEnum.SMALL}
				/>
			</PageBlock>
		);
	}
}

CashSystemThirdPartyListPage.propTypes = propTypes;
CashSystemThirdPartyListPage.defaultProps = defaultProps;

export default CashSystemThirdPartyListPage;

export function conversionText(text) {
	return text
		.split('')
		.map((item, index, array) => (index >= BEFORE_DISPLAYED_NUMBER && index <= array.length - 1 - AFTER_DISPLAYED_NUMBER) ? '*' : item)
		.join('');
}

const data = [{
	key: 1,
	bank: '中信银行',
	province: '四川',
	city: '成都',
	branch: '成都走马街支行',
	cardName: '高志成',
	accountId: '6217496003949768',
},{
	key: 2,
	bank: '中国光大银行',
	province: '北京',
	city: '东城',
	branch: '北京东城支行',
	cardName: '李佩臻',
	accountId: '6267337202593204',
},{
	key: 3,
	bank: '中信银行',
	province: '四川',
	city: '成都',
	branch: '成都走马街支行',
	cardName: '吴孟刃',
	accountId: '6214235608507202',
},{
	key: 4,
	bank: '中国光大银行',
	province: '北京',
	city: '东城',
	branch: '北京东城支行',
	cardName: '李贝珍',
	accountId: '6214497020497202',
}];
