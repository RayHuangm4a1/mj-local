import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import { Table, TextButton, } from 'ljit-react-components';
import PageModal from '../../../../components/page-modal';
import PageBlock from '../../../../components/page-block';
import { convertDateStringToTimestamp, formatDate, } from '../../../../lib/moment-utils';
import { connect } from 'ljit-store-connecter';
import { bankCardBlackListActions, } from '../../../../controller';
import { LoadingStatusEnum, } from '../../../../lib/enums';
import { RouteKeyEnums, } from '../../../../routes';
import InputForm from './input-form';
import { omit, } from 'lodash';
import {
	withLoadingStatusNotification,
	notifications,
} from '../../../../../lib/notify-handler';

const { successNotifications, } = notifications;
const { Success, } = successNotifications;
const {
	fetchBankCardBlackListAction,
	addBankCardsToBlackListAction,
	removeBankCardFromBlackListAction,
} = bankCardBlackListActions;
const {
	ACCOUNT_BLACKLIST_BANKBANNED_MULTI_ADD,
	ACCOUNT_BLACKLIST_BANKBANNED_IMPORT,
} = RouteKeyEnums;
const { Message, } = PageModal;
const { ModeEnum, } = InputForm;
const { NONE, LOADING, SUCCESS, FAILED, } = LoadingStatusEnum;
const DEFAULT_PAGE = 1;
const EMPTY_TEXT = 'N/A';

const BlockBankCardListSortTypeEnum = {
	NUMBER: 'number',
	BLOCKED_AT: 'blockedAt',
};
const {
	NUMBER,
	BLOCKED_AT,
} = BlockBankCardListSortTypeEnum;
const TableColumnKeyToQuerySortMap = {
	number: NUMBER,
	createdAt: BLOCKED_AT,
};
const TableOrderToQueryOrderMap = {
	ascend: 'asc',
	descend: 'desc',
};

const propTypes = {
	bankCardBlackListData: PropTypes.shape({
		bankCardBlackList: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.number,
			bankId: PropTypes.number,
			bankName: PropTypes.string,
			number: PropTypes.string,
			status: PropTypes.number,
			description: PropTypes.string,
			operatorId: PropTypes.number,
			blockedAt: PropTypes.string,
			createdAt: PropTypes.string,
			updatedAt: PropTypes.string,
		})),
		numOfItems: PropTypes.number,
		numOfPages: PropTypes.number,
	}),
	fetchBankCardBlackListAction: PropTypes.func.isRequired,
	addBankCardsToBlackListAction: PropTypes.func.isRequired,
	removeBankCardFromBlackListAction: PropTypes.func.isRequired,
	loadingStatus: PropTypes.oneOf([NONE, LOADING, SUCCESS, FAILED]).isRequired,
	removeBankCardFromBlackListLoadingStatus: PropTypes.oneOf([NONE, LOADING, SUCCESS, FAILED]).isRequired,
	addBankCardToBlackListLoadingStatus: PropTypes.oneOf([NONE, LOADING, SUCCESS, FAILED]).isRequired,
	onNavigate: PropTypes.func.isRequired,
	notifyHandlingAction: PropTypes.func.isRequired,
};
const defaultProps = {
	bankCardBlackListData: {}
};

class AccountMemberBankBannedInfoPage extends Component {
	constructor() {
		super();
		this.state = {
			isSearchResultVisible: false,
			isDeleteModalVisible: false,
			rowData: {},
			pagination: {},
			queryParameters: {},
		};

		this._handleAddBankCardToBlackList = this._handleAddBankCardToBlackList.bind(this);
		this._handleSearch = this._handleSearch.bind(this);
		this._handleToogleRemoveConfirmModal = this._handleToogleRemoveConfirmModal.bind(this);
		this._handleDeleteSubmit = this._handleDeleteSubmit.bind(this);
		this._handleChangeTable = this._handleChangeTable.bind(this);
		this._renderResultTable = this._renderResultTable. bind(this);
	}
	_handleSearch(values) {
		const { queryParameters = {}, pagination = {}, } = this.state;
		const { fetchBankCardBlackListAction, } = this.props;
		const queries = omit(values, [ 'fromTo', ]);
		const { fromTo = [] } = values;
		const [ from, to ] = fromTo;
		const newQueryParameters = {
			...queries,
			order: queryParameters.order,
			sort: queryParameters.sort,
			page: DEFAULT_PAGE,
			blockedAtFrom: convertDateStringToTimestamp(from),
			blockedAtTo: convertDateStringToTimestamp(to),
		};
		const newPagination = {
			...pagination,
			current: DEFAULT_PAGE,
		};

		fetchBankCardBlackListAction(newQueryParameters);
		this.setState({
			queryParameters: newQueryParameters,
			pagination: newPagination,
		});
	}
	_handleAddBankCardToBlackList({ blockedPayer, number, description, }) {
		const { addBankCardsToBlackListAction, } = this.props;

		addBankCardsToBlackListAction([{
			blockedPayer,
			number: number.trim(),
			description,
		}]);
	}
	_handleToogleRemoveConfirmModal(record = {}) {
		const { isDeleteModalVisible, } = this.state;

		this.setState({
			isDeleteModalVisible: !isDeleteModalVisible,
			rowData: record,
		});
	}
	_handleDeleteSubmit() {
		const { removeBankCardFromBlackListAction, } = this.props;
		const { rowData, } = this.state;

		removeBankCardFromBlackListAction(rowData.id);
		this.setState({ isDeleteModalVisible: false, });
	}
	_handleChangeTable(pagination, filters, sorter) {
		const { queryParameters, } = this.state;
		const { fetchBankCardBlackListAction, } = this.props;
		const { columnKey, order, } = sorter;
		const { current, pageSize } = pagination;
		const newQueryParameters = Object.assign({}, queryParameters , {
			limit: pageSize,
			page: current,
			order: TableOrderToQueryOrderMap[order],
			sort: TableColumnKeyToQuerySortMap[columnKey],
		});

		fetchBankCardBlackListAction(newQueryParameters);
		this.setState({
			pagination,
			queryParameters: newQueryParameters,
		});
	}

	_renderResultTable() {
		const { pagination, } = this.state;
		const { bankCardBlackListData = {}, } = this.props;
		const { bankCardBlackList, numOfItems,  } = bankCardBlackListData;
		const { _handleToogleRemoveConfirmModal, _handleChangeTable, } = this;
		const paginationProps = {
			...pagination,
			total: numOfItems,
			showSizeChanger: false,
			totalRenderer: () => undefined,
		};
		const columns = [
			{
				title: '姓名',
				dataIndex: 'blockedPayer',
				render: value => value || EMPTY_TEXT,
			},
			{
				title: '银行卡号',
				dataIndex: 'number',
				sorter: () => {},
			},
			{
				title: '银行',
				dataIndex: 'bankName',
			},
			{
				title: '备注',
				dataIndex: 'description',
			},
			{
				title: '操作者',
				dataIndex: 'operatorUsername',
				render: value => value || EMPTY_TEXT,
			},
			{
				title: '新增时间',
				dataIndex: 'createdAt',
				sorter: () => {},
				render: value => formatDate(value),
			},
			{
				title: '操作',
				render: (record) => (
					<TextButton
						text="删除"
						onClick={() => _handleToogleRemoveConfirmModal(record)}
						color="danger"
					/>
				),
			},
		];

		return (
			<Table
				rowKey="id"
				columns={columns}
				dataSource={bankCardBlackList}
				hasPagination
				onTableChange={_handleChangeTable}
				paginationProps={paginationProps}
			/>
		);
	}

	render() {
		const {
			isDeleteModalVisible,
			isSearchResultVisible,
			rowData,
		} = this.state;
		const { onNavigate, } = this.props;
		const {
			_handleAddBankCardToBlackList,
			_handleSearch,
			_handleDeleteSubmit,
			_handleToogleRemoveConfirmModal,
			_renderResultTable,
		} = this;

		return (
			<Fragment>
				<PageBlock
					headerTitle="新增黑名单"
					noMinHeight
				>
					<InputForm
						ref={ref => this.inputFormInstance = ref}
						onClickImport={() => onNavigate(ACCOUNT_BLACKLIST_BANKBANNED_IMPORT)}
						onClickBatch={() => onNavigate(ACCOUNT_BLACKLIST_BANKBANNED_MULTI_ADD)}
						onSubmit={_handleAddBankCardToBlackList}
						mode={ModeEnum.ADD}
					/>
				</PageBlock>
				<PageBlock
					headerTitle="查询黑名单"
					noMinHeight
				>
					<InputForm
						onSubmit={_handleSearch}
						mode={ModeEnum.SEARCH}
					/>
					{isSearchResultVisible ? _renderResultTable() : null}
					<Message
						title="确认提示"
						visible={isDeleteModalVisible}
						message={(
							<Fragment>
								<div>是否将此银行卡从黑名单中删除：</div>
								<div>{rowData.number}</div>
							</Fragment>
						)}
						onClickCancel={_handleToogleRemoveConfirmModal}
						onClickOk={_handleDeleteSubmit}
					/>
				</PageBlock>
			</Fragment>
		);
	}

	componentDidUpdate(prevProps) {
		const {
			loadingStatus,
			removeBankCardFromBlackListLoadingStatus,
			addBankCardToBlackListLoadingStatus,
			notifyHandlingAction,
			fetchBankCardBlackListAction,
		} = this.props;
		const { queryParameters, } = this.state;

		if (prevProps.loadingStatus === LOADING && loadingStatus === SUCCESS) {
			this.setState({ isSearchResultVisible: true, });
		}
		if (prevProps.removeBankCardFromBlackListLoadingStatus === LOADING && removeBankCardFromBlackListLoadingStatus === SUCCESS) {
			notifyHandlingAction(new Success('刪除银行卡黑名单成功'));
			fetchBankCardBlackListAction(queryParameters);
		}
		if (prevProps.addBankCardToBlackListLoadingStatus === LOADING && addBankCardToBlackListLoadingStatus === SUCCESS) {
			this.inputFormInstance.resetForm();
			notifyHandlingAction(new Success('新增银行卡黑名单成功'));
			fetchBankCardBlackListAction(queryParameters);
		}
	}
}

AccountMemberBankBannedInfoPage.propTypes = propTypes;
AccountMemberBankBannedInfoPage.defaultProps = defaultProps;

function mapStateToProps(state) {
	return {
		bankCardBlackListData: state.bankCardBlackList.get('data').toObject(),
		loadingStatus: state.bankCardBlackList.get('loadingStatus'),
		removeBankCardFromBlackListLoadingStatus: state.bankCardBlackList.get('removeBankCardFromBlackListLoadingStatus'),
		removeBankCardFromBlackListLoadingStatusMessage: state.bankCardBlackList.get('removeBankCardFromBlackListLoadingStatusMessage'),
		addBankCardToBlackListLoadingStatus: state.bankCardBlackList.get('addBankCardToBlackListLoadingStatus'),
		addBankCardToBlackListLoadingStatusMessage: state.bankCardBlackList.get('addBankCardToBlackListLoadingStatusMessage'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchBankCardBlackListAction: (queries) => dispatch(fetchBankCardBlackListAction(queries)),
		addBankCardsToBlackListAction: (bankCards) => dispatch(addBankCardsToBlackListAction(bankCards)),
		removeBankCardFromBlackListAction: (bankCardId) => dispatch(removeBankCardFromBlackListAction(bankCardId)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(
	withLoadingStatusNotification([
		{
			loadingStatus: 'addBankCardToBlackListLoadingStatus',
			loadingStatusMessage: 'addBankCardToBlackListLoadingStatusMessage',
		},
		{
			loadingStatus: 'removeBankCardFromBlackListLoadingStatus',
			loadingStatusMessage: 'removeBankCardFromBlackListLoadingStatusMessage',
		}
	],
	AccountMemberBankBannedInfoPage)
);
