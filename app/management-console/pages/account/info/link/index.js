import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Table, TextButton, } from 'ljit-react-components';
import SearchForm from './search-form';
import PageBlock from '../../../../components/page-block';
import PageModal from '../../../../components/page-modal';
import { LoadingStatusEnum, } from '../../../../lib/enums';
import './style.styl';

const fakeData = [
	{
		_id: '0',
		username: 'codtest123456',
		code: '56FD8825AE405425C1CD8D4C86D236B3',
		bonus: 1920,
		registeredCount: 0,
		comment: '',
	},
	{
		_id: '1',
		username: 'codtest123456',
		code: '87AD8825AE405425C1CD8D4C86D236B3',
		bonus: 1960,
		registeredCount: 1,
		comment: '備註一條文字',
	}
];

const {
	NONE,
	LOADING,
	SUCCESS,
} = LoadingStatusEnum;
const { Message, } = PageModal;

const propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.string,
		username: PropTypes.string,
		code: PropTypes.string,
		bonus: PropTypes.number,
		registeredCount: PropTypes.number,
		comment: PropTypes.string,
	})),
	loadingStatus: PropTypes.string,
};
const defaultProps = {};

class AccountInfoLinkPage extends Component {
	constructor() {
		super();
		this.state = {
			isDeleteVisible: false,
			rowData: {},
			// TODO use data from reducer,
			data: [],
			loadingStatus: NONE,
		};

		this._handleSearch = this._handleSearch.bind(this);
		this._showModal = this._showModal.bind(this);
		this._handleDeleteOk = this._handleDeleteOk.bind(this);
		this._handleDeleteCancel = this._handleDeleteCancel.bind(this);
		this._handleTableChange = this._handleTableChange.bind(this);
		this._renderTable = this._renderTable.bind(this);
	}

	componentDidMount() {
		// TODO fetch link data
	}

	_handleSearch() {
		//TODO call api then update
		this.setState(() => ({ loadingStatus: LOADING, }));
		setTimeout(() => {
			this.setState(() => ({
				loadingStatus: SUCCESS,
				data: fakeData,
			}))
		}, 300);
	}

	_showModal(record) {
		this.setState({
			isDeleteVisible: true,
			rowData: record,
		});
	}
	_handleDeleteOk() {
		const {
			data,
			rowData,
		} = this.state;
		const updatedData = data.filter(item => item.code !== rowData.code);

		this.setState({
			data: updatedData,
			isDeleteVisible: false,
		});
	}
	_handleDeleteCancel() {
		this.setState({
			isDeleteVisible: false,
			rowData: {},
		});
	}

	_handleTableChange() {
		// TODO handle sorting and pagination by call api
	}

	_renderTable() {
		const {
			data,
		} = this.state;
		const columns = [
			{
				title: '帐号',
				dataIndex: 'username',
				sorter: (prev, next) => prev.username.localeCompare(next.username),
				sortDirections: ['descend', 'ascend'],
			},
			{
				title: '自动注册链结代码',
				dataIndex: 'code',
				sorter: (prev, next) => prev.code.localeCompare(next.code),
				sortDirections: ['descend', 'ascend'],
			},
			{
				title: '奖金号',
				dataIndex: 'bonus',
				sorter: (prev, next) => prev.bonus - next.bonus,
				sortDirections: ['descend', 'ascend'],
			},
			{
				title: '注册人数',
				dataIndex: 'registeredCount',
				sorter: (prev, next) => prev.registeredCount - next.registeredCount,
				sortDirections: ['descend', 'ascend'],
			},
			{
				title: '备注',
				dataIndex: 'comment',
			},
			{
				title: '操作',
				render: (record) => (
					<TextButton
						color="danger"
						text="删除"
						onClick={() => this._showModal(record)}
					/>
				),
			},
		];

		return (
			<Table
				className="link-table"
				rowKey={record => record._id}
				columns={columns}
				dataSource={data}
				onTableChange={this._handleTableChange}
			/>
		);
	}

	render() {
		const {
			loadingStatus,
			isDeleteVisible,
			rowData,
		} = this.state;

		return (
			<PageBlock
				className="account-member-link"
				noMinHeight
			>
				<Message
					className="delete-link"
					visible={isDeleteVisible}
					title="确认提示"
					message={(
						<div>
							是否确认删除该推广链结:
							<div>{rowData.code}</div>
						</div>
					)}
					onClickCancel={this._handleDeleteCancel}
					onClickOk={this._handleDeleteOk}
				>
				</Message>
				<SearchForm
					onSearch={this._handleSearch}
				/>
				{loadingStatus === NONE || loadingStatus === LOADING ? null : this._renderTable()}
			</PageBlock>
		);
	}
}

AccountInfoLinkPage.propTypes = propTypes;
AccountInfoLinkPage.defaultProps = defaultProps;

export default AccountInfoLinkPage;
