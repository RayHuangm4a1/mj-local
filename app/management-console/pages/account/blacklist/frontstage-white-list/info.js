import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, TextButton, } from 'ljit-react-components';
import { connect, } from 'ljit-store-connecter';
import {
	notifyHandlingActions,
} from '../../../../controller';
import PageModal from '../../../../components/page-modal';
import PageBlock from '../../../../components/page-block';
import AddIpForm from '../form/add-ip-form';
import SearchIpForm from '../form/search-ip-form';
import { notifications, } from '../../../../../lib/notify-handler';
import { formatDate, } from '../../../../lib/moment-utils';
import { RouteKeyEnums, } from '../../../../routes';

const {
	notifyHandlingAction,
} = notifyHandlingActions;
const {
	successNotifications,
} = notifications;
const {
	Success,
} = successNotifications;

const {
	ACCOUNT_BLACKLIST_FRONTSTAGE_WHITE_LIST_MULTI_ADD,
	ACCOUNT_BLACKLIST_FRONTSTAGE_WHITE_LIST_IMPORT,
} = RouteKeyEnums;
const { Message, } = PageModal;

const propTypes = {
	onNavigate: PropTypes.func,
	notifyHandlingAction: PropTypes.func.isRequired,
};

const defaultProps = {
	onNavigate: () => {},
};

class AccountMemberFrontstageWhiteListInfoPage extends Component {
	constructor() {
		super();
		this.state = {
			isShowingSearchResult: false,
			isConfirmDeleteMessageVisible: false,
			selectedData: {},
			dataSource: [],
		};

		this._handleClickAddIp = this._handleClickAddIp.bind(this);
		this._handleClickSearch = this._handleClickSearch.bind(this);
		this._handleClickDelete = this._handleClickDelete.bind(this);
		this._handleSubmitDelete = this._handleSubmitDelete.bind(this);
		this._renderSearchResult = this._renderSearchResult.bind(this);
	}
	_handleClickAddIp(value) {
		// TODO send add api
		const { notifyHandlingAction, } = this.props;
		const { dataSource } = this.state;
		const newBannedIpData = Object.assign({}, value, {
			loginAt: formatDate(),
		});
		const updatedDataSource = [...dataSource, newBannedIpData];

		this.setState({
			dataSource: updatedDataSource,
		});
		notifyHandlingAction(new Success('新增前台IP白名单成功'));
	}
	_handleClickSearch(value) {
		// TODO send search api

		this.setState({ isShowingSearchResult: true, });
	}
	_handleClickDelete(selectedData) {
		this.setState({
			isConfirmDeleteMessageVisible: true,
			selectedData,
		});
	}
	_handleSubmitDelete() {
		// TODO send delete api
		const { dataSource, selectedData } = this.state;
		const { ip } = selectedData;
		const updatedDataSource = dataSource.filter(item => item.ip !== ip);

		this.setState({
			dataSource: updatedDataSource,
			selectedData: {},
			isConfirmDeleteMessageVisible: false,
		});
	}
	_renderSearchResult() {
		const { dataSource } = this.state;
		const { _handleClickDelete, } = this;
		const columns = [{
			title: '登陆 IP',
			dataIndex: 'ip'
		},{
			title: '登陆时间',
			dataIndex: 'loginAt'
		},{
			title: '备注',
			dataIndex: 'comment'
		},{
			title: '操作',
			dataIndex: 'operation',
			render: (value, record) => (
				<TextButton
					color="danger"
					text="刪除"
					onClick={() => _handleClickDelete(record)}
				/>
			)
		}];

		return (
			<Table
				rowKey="ip"
				columns={columns}
				dataSource={dataSource}
				// TODO add change table action(page, sorter ....)
				hasPagination
			/>
		);
	}
	render() {
		const { onNavigate } = this.props;
		const {
			isShowingSearchResult,
			isConfirmDeleteMessageVisible,
			selectedData,
		} = this.state;
		const {
			_handleClickAddIp,
			_handleClickSearch,
			_handleSubmitDelete,
			_renderSearchResult,
		} = this;
		const { ip, } = selectedData;
		const searchResult = isShowingSearchResult ? _renderSearchResult() : null;

		return (
			<React.Fragment >
				<PageBlock
					headerTitle="新增前台IP白名单"
					noMinHeight
				>
					<AddIpForm
						onClickAddIp={_handleClickAddIp}
						onClickMultiAdd={() => onNavigate(ACCOUNT_BLACKLIST_FRONTSTAGE_WHITE_LIST_MULTI_ADD)}
						onClickImport={() => onNavigate(ACCOUNT_BLACKLIST_FRONTSTAGE_WHITE_LIST_IMPORT)}
					/>
				</PageBlock>
				<PageBlock
					headerTitle="查询前台IP白名单"
					noMinHeight
				>
					<SearchIpForm
						onSubmit={_handleClickSearch}
						onCancel={() => this.setState({ isShowingSearchResult: false, })}
					/>
					{searchResult}
				</PageBlock>
				<Message
					visible={isConfirmDeleteMessageVisible}
					title="确认提示"
					message={`是否将此IP从白名单中删除：${ip}`}
					onClickCancel={() => this.setState({ isConfirmDeleteMessageVisible: false })}
					onClickOk={_handleSubmitDelete}
				/>
			</React.Fragment>
		);
	}
	componentDidMount() {
		// TODO get data
		this.setState({
			dataSource: fakeData
		});
	}
}

AccountMemberFrontstageWhiteListInfoPage.propTypes = propTypes;
AccountMemberFrontstageWhiteListInfoPage.defaultProps = defaultProps;

function mapStateToProps(state) {
	// TODO add data
	return {

	};
}
function mapDispatchToProps(dispatch) {
	// TODO add action
	return {
		notifyHandlingAction: (notification) => dispatch(notifyHandlingAction(notification)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountMemberFrontstageWhiteListInfoPage);

const fakeData = [
	{
		ip: '110.200.100.200',
		username: 'admin',
		loginAt: '2019/02/14 12:32:12',
		comment: 'test',
	},
	{
		ip: '210.200.100.200',
		username: 'admin',
		loginAt: '2019/02/14 12:32:12',
		comment: 'test',
	},
	{
		ip: '130.200.100.200',
		username: 'admin',
		loginAt: '2019/02/14 12:32:12',
		comment: 'test',
	},
	{
		ip: '140.200.100.200',
		username: 'admin',
		loginAt: '2019/02/14 12:32:12',
		comment: 'test',
	},
];
