import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { InputSearch, Table, Button, HeaderButtonBar, RemindText, } from 'ljit-react-components';
import SearchForm from './search-form';
import PageBlock from '../../../../components/page-block';
import PageModal from '../../../../components/page-modal';
import './style.styl';

const { Message, } = PageModal;

const propTypes = {
	accounts: PropTypes.arrayOf(
		PropTypes.shape({
			username: PropTypes.string,
			rebate: PropTypes.shape({
				lottery: PropTypes.string,
				treasure: PropTypes.string,
				video: PropTypes.string,
				sport: PropTypes.string,
				live: PropTypes.string,
			}),
			upper: PropTypes.string,
			level: PropTypes.number,
			occupy: PropTypes.number,
		}),
	),
};
const defaultProps = {};

class AccountMemberMovePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			source: accounts,
			current: [],
			upper: accounts,
			isMoveVisible: false,
			isSearch: false,
			moveAccount: null,
			upperAccount: null,
			occupy: null,
			level: null,
			searchAccount: null,
			movingUser: null,
			pagination: {
				pageSize: 10,
			},
		};

		this._handleSearch = this._handleSearch.bind(this);
		this._handleRefresh = this._handleRefresh.bind(this);
		this._handleUpperSearch = this._handleUpperSearch.bind(this);
		this._showModal = this._showModal.bind(this);
		this._handleMoveOk = this._handleMoveOk.bind(this);
		this._handleMoveCancel = this._handleMoveCancel.bind(this);
		this._handleTableChange = this._handleTableChange.bind(this);
	}

	/*TODO directly get data(username), not get data(username) from form,
		there is only one input in search block, maybe it can be place in this page and
		don't need to have SearchForm file.
	*/
	_handleSearch(form) {
		form.validateFields((err, values) => {});

		//TODO call api then update
		const { source } = this.state;
		const { username, } = form.getFieldsValue();

		this.setState((prev) => (Object.assign(prev,{
			current: source,
			isSearch: true,
			movingUser: username,
		})));
		this.setState((prev) => {
			const newdata = prev.current.filter((item) => item['username'] === username);
			const occupy = newdata.length? newdata[0].occupy : 0;

			return Object.assign(prev,{
				current: newdata,
				moveAccount: username,
				occupy,
			});
		});
	}
	_handleRefresh() {
		const { movingUser, source } = this.state;

		//TODO call api then update
		this.setState((prev) => (Object.assign(prev,{
			current: source,
			isSearch: true,
			movingUser,
		})));
		this.setState((prev) => {
			const newdata = prev.current.filter((item) => item['username'] === movingUser);
			const occupy = newdata.length? newdata[0].occupy : 0;

			return Object.assign(prev,{
				current: newdata,
				moveAccount: movingUser,
				occupy,
			});
		});
	}

	_handleUpperSearch(username) {
		const { source } = this.state;

		this.setState((prev) => {
			const upper = source.filter((item) => item['username'].indexOf(username) !== -1);

			return Object.assign(prev,{
				upper,
			});
		});
	}

	_showModal(record) {
		this.setState({
			isMoveVisible: true,
			upperAccount: record.username,
			level: record.level,
		});
	}

	_handleMoveOk() {
		const { source: data, moveAccount, upperAccount } = this.state;

		let current = {};
		const newData = data.map((item) => {
			if (item.username === moveAccount) {
				current = Object.assign({},item,{ upper: upperAccount, },);
				return current;
			}
			return item;
		});

		this.setState({
			source: newData,
			current: [current],
			upper: newData,
			isMoveVisible: false,
		});
	}

	_handleMoveCancel() {
		this.setState({ isMoveVisible: !this.state.isMoveVisible, });
	}

	_handleTableChange(pagination, filters, sorter, extra) {
		console.log('Various parameters', pagination, filters, sorter, extra);
		this.setState({
			pagination
		});
	}

	render() {
		const {
			_handleTableChange,
		} = this;
		const {
			upperAccount,
			occupy,
			level,
			isMoveVisible,
			isSearch,
			current,
			searchAccount,
			upper,
			pagination,
		} = this.state;

		const moveColumns = [{
			title:'被移桶帐号',
			dataIndex:'username',
			key:'username',
		},{
			title:'返点百分比',
			children:[{
				title:'时时彩',
				dataIndex:'rebate.lottery',
				key:'lottery',
			},{
				title:'连环夺宝',
				dataIndex:'rebate.treasure',
				key:'treasure',
			},{
				title:'真人视讯',
				dataIndex:'rebate.video',
				key:'video',
			},{
				title:'体育',
				dataIndex:'rebate.sport',
				key:'sport',
			},{
				title:'AS直播',
				dataIndex:'rebate.live',
				key:'live',
			},],
			key:'rebate',
		},{
			title:'上級帐号',
			dataIndex:'upper',
			key:'upper',
		},{
			title:'本身与下级所需占阶层至少',
			dataIndex:'occupy',
			key:'occupy',
		},];

		const upperColumns= [{
			title:'新上級帳號',
			dataIndex:'username',
			key:'username',
			sorter: (prev, next) => { return prev.username.localeCompare(next.username); },
			sortDirections: ['descend', 'ascend'],
		},{
			title:'返点百分比',
			children:[{
				title:'时时彩',
				dataIndex:'rebate.lottery',
				key:'lottery',
				sorter: (prev, next) => { return prev.rebate.lottery.split('%')[0]-next.rebate.lottery.split('%')[0]; },
				sortDirections: ['descend', 'ascend'],
			},{
				title:'连环夺宝',
				dataIndex:'rebate.treasure',
				key:'treasure',
				sorter: (prev, next) => { return prev.rebate.treasure.split('%')[0]-next.rebate.treasure.split('%')[0]; },
				sortDirections: ['descend', 'ascend'],
			},{
				title:'真人视讯',
				dataIndex:'rebate.video',
				key:'video',
				sorter: (prev, next) => { return prev.rebate.video.split('%')[0]-next.rebate.video.split('%')[0]; },
				sortDirections: ['descend', 'ascend'],
			},{
				title:'体育',
				dataIndex:'rebate.sport',
				key:'sport',
				sorter: (prev, next) => { return prev.rebate.sport.split('%')[0]-next.rebate.sport.split('%')[0]; },
				sortDirections: ['descend', 'ascend'],
			},{
				title:'AS直播',
				dataIndex:'rebate.live',
				key:'live',
				sorter: (prev, next) => { return prev.rebate.live.split('%')[0]-next.rebate.live.split('%')[0]; },
				sortDirections: ['descend', 'ascend'],
			},],
			key:'rebate',
		},{
			title:'上級帐号',
			dataIndex:'upper',
			key:'upper',
			sorter: (prev, next) => { return prev.upper.localeCompare(next.upper); },
			sortDirections: ['descend', 'ascend'],
		},{
			title:'所屬阶层',
			dataIndex:'level',
			key:'level',
			sorter: (prev, next) => { return prev.level - next.level; },
			sortDirections: ['descend', 'ascend'],
		},{
			title:'功能',
			dataIndex:'',
			key:'operation',
			render: (record) => <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => this._showModal(record)}>转移至此</span>,
		},];

		const confirmMessage = `是否确定搬移帐号至${upperAccount}代理底下，该团队整体将延伸至` +
			`${occupy+level}阶层`;

		return (
			<div className="management-account-move">
				<PageBlock className="move-search" noMinHeight>
					<PageBlock.Title text="帐户查询"/>
					<Message
						visible={isMoveVisible}
						title="确认提示"
						message={confirmMessage}
						onClickCancel={this._handleMoveCancel}
						onClickOk={this._handleMoveOk}
					/>
					<SearchForm
						onSearch={this._handleSearch}
					/>
				</PageBlock>
				{/* TODO use render function */}
				{isSearch ?
					<PageBlock  className="move-info">
						<HeaderButtonBar
							left={<PageBlock.Title text="被移桶帐号资讯"/>}
							right={
								<Button
									className="move-re-search-btn"
									color={Button.ColorEnums.BRIGHTBLUE500}
									onClick={this._handleRefresh}
								>
								重新查詢
								</Button>
							}
						/>
						<Table
							rowKey="username"
							className="move-table"
							columns={moveColumns}
							dataSource={current}
							onTableChange={this._handleMoveChange}
							isBordered
						/>
						<RemindText
							text={
								<div>
									<div>1. 本身与下级所需占阶层，已包含计算最后一层如有代理将可再创一层会员的状况，如最后一层都为会员将自动扣除。</div>
									<div>2. 系统目前设定限制阶层数为 20 阶层。</div>
								</div>
							}
						/>
					</PageBlock>
					: null}
				{/* TODO use render function */}
				{isSearch ?
					<PageBlock  className="move-upper">
						<HeaderButtonBar
							left={<PageBlock.Title text="指定新上级代理"/>}
							right={
								<InputSearch
									className="upper-search"
									onSearch={this._handleUpperSearch}
									placeholder='搜索帳號'
									onChange={(e) => this.setState({ searchAccount: e.target.value, })}
									value={searchAccount}
								/>
							}
						/>
						<Table
							rowKey="username"
							className="upper-table"
							columns={upperColumns}
							dataSource={upper}
							onTableChange={_handleTableChange}
							isBordered
							hasPagination
							// TODO get pagination data from api
							paginationProps={{
								...pagination,
								total: 200,
							}}
						/>
					</PageBlock>
					: null}
			</div>
		);
	}
}

AccountMemberMovePage.propTypes = propTypes;
AccountMemberMovePage.defaultProps = defaultProps;

export default AccountMemberMovePage;

const accounts = [{
	username: 'codtest123456',
	rebate: {
		key: "0",
		lottery: '12.5%',
		treasure: '20%',
		video: '3.2%',
		sport: '1.5%',
		live: '0.5%',
	},
	upper: 'master',
	level: 1,
	occupy: 2,
},{
	username: 'sm111222',
	rebate: {
		lottery: '31.1%',
		treasure: '1.2%',
		video: '3%',
		sport: '1.5%',
		live: '0.5%',
	},
	upper: '',
	level: 1,
	occupy: 2,
},{
	username: 'codtest12',
	rebate: {
		lottery: '22.1%',
		treasure: '1.2%',
		video: '3%',
		sport: '1.5%',
		live: '0.5%',
	},
	upper: '',
	level: 1,
	occupy: 1,
},{
	username: 'sax666',
	rebate: {
		lottery: '22.3%',
		treasure: '20%',
		video: '3%',
		sport: '1.5%',
		live: '0.5%',
	},
	upper: '',
	level: 1,
	occupy: 3,
},{
	username: 'sax04',
	rebate: {
		lottery: '33.9%',
		treasure: '9%',
		video: '1%',
		sport: '1.5%',
		live: '0.5%',
	},
	upper: '',
	level: 2,
	occupy: 2,
},{
	username: 'xuyang9988',
	rebate: {
		lottery: '21.8%',
		treasure: '20%',
		video: '3%',
		sport: '1.5%',
		live: '0.5%',
	},
	upper: 'masteruu',
	level: 2,
	occupy: 1,
},{
	username: 'zd6699',
	rebate: {
		lottery: '2.7%',
		treasure: '20%',
		video: '3%',
		sport: '1.5%',
		live: '0.5%',
	},
	upper: '',
	level: 2,
	occupy: 1,
},{
	username: 'test0703',
	rebate: {
		lottery: '4.9%',
		treasure: '2%',
		video: '3%',
		sport: '1.5%',
		live: '0.5%',
	},
	upper: 'seafood',
	level: 1,
	occupy: 2,
},{
	username: 'test0890',
	rebate: {
		lottery: '2.1%',
		treasure: '20%',
		video: '1%',
		sport: '1.5%',
		live: '0.5%',
	},
	upper: '',
	level: 1,
	occupy: 2,
},{
	username: 'test0293',
	rebate: {
		lottery: '87%',
		treasure: '0%',
		video: '3%',
		sport: '1.5%',
		live: '0.5%',
	},
	upper: 'wow019',
	level: 1,
	occupy: 3,
},{
	username: 'test0482',
	rebate: {
		lottery: '20%',
		treasure: '20%',
		video: '4%',
		sport: '1.5%',
		live: '0.5%',
	},
	upper: '',
	level: 1,
	occupy: 2,
},{
	username: 'test0001',
	rebate: {
		lottery: '13%',
		treasure: '3.2%',
		video: '3%',
		sport: '1.5%',
		live: '0.5%',
	},
	upper: 'cod123',
	level: 1,
	occupy: 1,
}];
