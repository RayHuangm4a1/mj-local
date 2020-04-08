import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Table,
	Button,
	TextButton,
	Divider,
	HeaderButtonBar,
	Row,
	Col,
	Card,
	Statistic,
} from 'ljit-react-components';
import DepositRecordSearchForm from '../third-party/deposit-record-search-form';
import PageBlock from '../../../../components/page-block';
import PageModal from '../../../../components/page-modal';
import { DepositStatusEnum, } from '../../../../lib/enums';
import { convertDateStringToTimestamp, } from '../../../../../lib/moment-utils';
import DepositConfirmModal from './deposit-confirm-modal';
import CustomizeColumnsModal from '../customize-columns-modal';
import {
	checkIsNewStatus,
	checkIsInconsistentStatus,
} from '../utils';
import {
	PREFIX_CLASS,
	ColumnDefinitionMap,
	ColumnDefinitionEnums,
	defaultEnabledColumns,
	DepartmentIdEnums,
	DepositClassIdEnums,
} from './utils';
import './style.styl';
import { connect } from 'ljit-store-connecter';
import { cashSystemBankDepositActions } from '../../../../controller';

const { fetchCashSystemBankDepositAction } = cashSystemBankDepositActions;

const propTypes = {
	fetchCashSystemBankDepositAction: PropTypes.func.isRequired,
	bankDepositData: PropTypes.array,
	numOfItems: PropTypes.number,
	numOfPages: PropTypes.number,
	departmentId: PropTypes.string,
};
const defaultProps = {};

const {
	CANCELED,
} = DepositStatusEnum;

const {
	BANK_NAME,
	OPERATION,
	STATUS,
	AMOUNT,
	FEE,
} = ColumnDefinitionEnums;
const {
	ONLINE_BANK,
} = DepositClassIdEnums;
const {
	Message: CancelAllSelectedItemsModal,
} = PageModal;

function getDepartmentEnums(departmentId) {
	return DepartmentIdEnums[departmentId.toLocaleUpperCase()];
}

class CashSystemCreditBankPage extends Component {
	constructor() {
		super();
		this.state = {
			isCancelAllModalVisible: false,
			isCustomizeColumnsModalVisible: false,
			isDepositConfirmModalVisible: false,
			current: [],
			enabledColumns: [
				...defaultEnabledColumns,
				BANK_NAME,
				AMOUNT,
				FEE,
				STATUS,
				OPERATION,
			],
			selectedRows: [],
			order: {},
			query: {},
		};
		this._handleHideCancelAllSelectionModal = this._handleHideCancelAllSelectionModal.bind(this);
		this._handleClickCancelAllSelectionModalOk = this._handleClickCancelAllSelectionModalOk.bind(this);
		this._handleHideCustomizeColumnsModal = this._handleHideCustomizeColumnsModal.bind(this);
		this._handleCustomizeColumnsModalSubmit = this._handleCustomizeColumnsModalSubmit.bind(this);
		this._handleHideDepositConfirmModal = this._handleHideDepositConfirmModal.bind(this);
		this._handleClickDepositConfirmModalOk = this._handleClickDepositConfirmModalOk.bind(this);
		this._handleSearch = this._handleSearch.bind(this);
		this._handleClickCustomizeColumns = this._handleClickCustomizeColumns.bind(this);
		this._handleClickCancelAllSelection = this._handleClickCancelAllSelection.bind(this);
		this._handleClickConfirm = this._handleClickConfirm.bind(this);
		this._handleClickCancelSelection = this._handleClickCancelSelection.bind(this);
		this._handleChangeTable = this._handleChangeTable.bind(this);
		this._renderColumns = this._renderColumns.bind(this);
		this._renderExpandRow = this._renderExpandRow.bind(this);
	}
	_handleHideCancelAllSelectionModal() {
		this.setState({ isCancelAllModalVisible: false, });
	}
	_handleClickCancelAllSelectionModalOk() {
		const {
			state,
			_handleHideCancelAllSelectionModal,
		} = this;
		const {
			current,
			selectedRows,
		} = state;
		const selectedItemsIdList = selectedRows.map(item => item.id);
		const nextCurrent = current.map((item) => {
			const isCanceled = selectedItemsIdList.indexOf(item.id) > -1;
			const nextStatus = isCanceled ? CANCELED : item.status;

			return ({
				...item,
				status: nextStatus,
			});
		});

		this.setState({ current: nextCurrent, }, () => _handleHideCancelAllSelectionModal());
	}

	_handleHideCustomizeColumnsModal() {
		this.setState({ isCustomizeColumnsModalVisible: false, });
	}
	_handleCustomizeColumnsModalSubmit(enabledColumns) {
		this.setState({
			enabledColumns,
			isCustomizeColumnsModalVisible: false,
		});
	}
	_handleHideDepositConfirmModal() {
		this.setState({ isDepositConfirmModalVisible: false, });
	}
	_handleClickDepositConfirmModalOk(order) {
		this._handleHideDepositConfirmModal();
	}
	_handleSearch(value) {
		let query = value;
		const { createdDate, confirmDate, status } = query;
		const {
			departmentId,
			fetchCashSystemBankDepositAction,
		} = this.props;

		if (createdDate) {
			query = Object.assign({}, query, {
				createdAtFrom: convertDateStringToTimestamp(createdDate[0]),
				createdAtTo: convertDateStringToTimestamp(createdDate[1]),
				createdDate: null,
			});
		}
		if (confirmDate) {
			query = Object.assign({}, query, {
				confirmedAtFrom: convertDateStringToTimestamp(confirmDate[0]),
				confirmedAtTo: convertDateStringToTimestamp(confirmDate[1]),
				confirmDate: null,
			});
		}
		if (status) {
			query = Object.assign({}, query, {
				status: status.join(','),
			});
		}
		fetchCashSystemBankDepositAction(getDepartmentEnums(departmentId), ONLINE_BANK, query);
		this.setState({ query });
	}
	_handleChangeTable(pagination, filters, sorter) {
		const {
			departmentId,
			fetchCashSystemBankDepositAction,
		} = this.props;
		const { query } = this.state;
		const { field, order = '', } = sorter;
		const newQuery = Object.assign({}, query, {
			sort: field,
			order: order.replace('end', ''),
		});

		fetchCashSystemBankDepositAction(getDepartmentEnums(departmentId), ONLINE_BANK, newQuery);
		this.setState({ query: newQuery });
	}
	_handleClickCustomizeColumns() {
		this.setState({ isCustomizeColumnsModalVisible: true, });
	}
	_handleClickCancelAllSelection() {
		this.setState({ isCancelAllModalVisible: true, });
	}
	_handleClickConfirm(order, index) {
		this.setState({
			isDepositConfirmModalVisible: true,
			order,
		});
	}
	_handleClickCancelSelection(order, index) {
	}
	_renderColumns() {
		const {
			state,
			_handleClickConfirm,
			_handleClickCancelSelection,
		} = this;

		const columns = state.enabledColumns
			.filter((column) => column !== OPERATION)
			.map((column) => ColumnDefinitionMap[column])
			.sort((a, b) => a.tableColumnLocation - b.tableColumnLocation);

		const operationColumn = {
			title: '操作',
			dataIndex: OPERATION,
			render: (value, record, index) => {
				const content = [];
				const shouldAddCancelButton = checkIsNewStatus(record) || checkIsInconsistentStatus(record);
				const shouldAddConfirmButton = checkIsInconsistentStatus(record);

				if (shouldAddConfirmButton) {
					content.push(
						<TextButton
							key="cancel-and-confirm"
							text="确认"
							onClick={() => _handleClickConfirm(record, index)}
						/>
					);
				}
				if (shouldAddCancelButton) {
					if (content.length > 0) {
						content.push(
							<Divider key="divider" type="vertical"/>
						);
					}
					content.push(
						<TextButton
							key="cancel"
							text="取消"
							onClick={() => _handleClickCancelSelection(record, index)}
						/>
					);
				}
				return (
					<div className="table-operation">
						{content}
					</div>
				);
			}
		};

		return [...columns, operationColumn];
	}
	_renderExpandRow(record, index) {
		const { enabledColumns, } = this.state;

		return Object.keys(record)
			.filter(dataIndex => {
				return ColumnDefinitionMap[dataIndex] && enabledColumns.indexOf(dataIndex) === -1;
			})
			.map(dataIndex => {
				const { title, render, } = ColumnDefinitionMap[dataIndex];
				const value = record[dataIndex];

				let content = '';

				if (dataIndex === 'level') {
					content = value.join(', ');
				} else {
					content = render ? render(value, record, index) : value;
				}

				return (
					<p
						key={`expand-row-${dataIndex}`}
						className="table-expand-item"
					>
						{title}：{content}
					</p>
				);
			});
	}
	render() {
		const {
			_handleHideCancelAllSelectionModal,
			_handleClickCancelAllSelectionModalOk,
			_handleHideCustomizeColumnsModal,
			_handleCustomizeColumnsModalSubmit,
			_handleHideDepositConfirmModal,
			_handleClickDepositConfirmModalOk,
			_handleSearch,
			_handleChangeTable,
			_handleClickCustomizeColumns,
			_handleClickCancelAllSelection,
			_renderColumns,
			_renderExpandRow,
		} = this;
		const {
			isCustomizeColumnsModalVisible,
			isCancelAllModalVisible,
			isDepositConfirmModalVisible,
			current,
			selectedRows,
			enabledColumns,
			order,
		} = this.state;
		const {
			bankDepositData,
			numOfItems,
			numOfPages,
		} = this.props;
		const modalMessage = `是否确定取消此 ${countTheNumberOfCancellations(selectedRows, current)} 筆項目？`;
		const fakeTotalAmount = 16000;
		const fakeTotalFee = 160;
		const columns = _renderColumns();
		const rowSelection = {
			onChange: (selectedRowKeys, selectedRows) => this.setState({ selectedRows, }),
			getCheckboxProps: record => {
				const isCancelable = checkIsNewStatus(record) || checkIsInconsistentStatus(record);
				const style = !isCancelable ? { display: 'none', } : {};

				return ({
					disabled: !isCancelable,
					style,
				});
			},
		};

		return (
			<PageBlock className={PREFIX_CLASS}>
				<CancelAllSelectedItemsModal
					title="确认提示"
					visible={isCancelAllModalVisible}
					message={modalMessage}
					onClickCancel={_handleHideCancelAllSelectionModal}
					onClickOk={_handleClickCancelAllSelectionModalOk}
				/>
				<CustomizeColumnsModal
					className={PREFIX_CLASS}
					isVisible={isCustomizeColumnsModalVisible}
					onClickCancel={_handleHideCustomizeColumnsModal}
					onSubmit={_handleCustomizeColumnsModalSubmit}
					enabledColumns={enabledColumns}
					columnDefinitionMap={ColumnDefinitionMap}
					defaultEnabledColumns={defaultEnabledColumns}
				/>
				<DepositConfirmModal
					isVisible={isDepositConfirmModalVisible}
					onClickCancel={_handleHideDepositConfirmModal}
					onClickOk={_handleClickDepositConfirmModalOk}
					order={order}
				/>
				<DepositRecordSearchForm
					collapseItemsLength={4}
					onSearch={_handleSearch}
				/>
				<Row
					className={`${PREFIX_CLASS}__totalizing`}
					type="flex"
					gutter={10}
				>
					<Col>
						<Card>
							<Statistic
								className="pay-company-card-group"
								title="本页取款金额总计"
								value={fakeTotalAmount}
								prefix="¥"
							/>
						</Card>
					</Col >
					<Col>
						<Card>
							<Statistic
								className="pay-company-card-group"
								title="本页手续费总计"
								value={fakeTotalFee}
								prefix="¥"
							/>
						</Card>
					</Col>
				</Row>
				<HeaderButtonBar
					right={(
						<React.Fragment>
							<Button
								onClick={_handleClickCustomizeColumns}
								color={Button.ColorEnums.BRIGHTBLUE500}
								outline={Button.OutlineEnums.HOLLOW}
							>
								自订显示项目
							</Button>
							<Button
								className="cancel-all-selected-item"
								onClick={_handleClickCancelAllSelection}
								outline={Button.OutlineEnums.HOLLOW}
								color={Button.ColorEnums.PINKISH}
							>
								取消已选取資料
							</Button>
						</React.Fragment>
					)}
				/>
				<Table
					rowKey="id"
					hasPagination
					paginationProps= {{
						total: numOfItems,
						current: numOfPages,
						showQuickJumper: false,
						showSizeChanger: false
					}}
					onTableChange={_handleChangeTable}
					alignType={Table.AlignTypeEnums.CENTER}
					dataSource={bankDepositData}
					columns={columns}
					rowSelection={rowSelection}
					expandedRowRender={_renderExpandRow}
				/>
			</PageBlock>
		);
	}
	componentDidMount() {
		const {
			departmentId,
			fetchCashSystemBankDepositAction,
		} = this.props;

		fetchCashSystemBankDepositAction(getDepartmentEnums(departmentId), ONLINE_BANK);
	}
}

CashSystemCreditBankPage.propTypes = propTypes;
CashSystemCreditBankPage.defaultProps = defaultProps;
// TODO 串接 API 來達成 (1) 取消 與 批量取消 動作, (2) 搜尋取得資料, (3) 搜尋取得指定入款單
function mapStateToProp(state) {
	return {
		bankDepositData: state.cashSystemBankDepositPage.get('data').toArray(),
		numOfItems: state.cashSystemBankDepositPage.get('numOfItems'),
		numOfPages: state.cashSystemBankDepositPage.get('numOfPages'),
	};
}
function mapDispatchToProp(dispatch) {
	return {
		fetchCashSystemBankDepositAction: (departmentId, depositClassId, query) => dispatch(fetchCashSystemBankDepositAction(departmentId, depositClassId, query)),
	};
}
export default connect(mapStateToProp, mapDispatchToProp)(CashSystemCreditBankPage);

function countTheNumberOfCancellations(selectedRows = [], currentItems = []) {
	const cancelItems = selectedRows.filter((item = {}) => {
		const matchedItem = currentItems.filter(currItem => currItem.id === item.id);

		return matchedItem.length > 0 && matchedItem[0].status !== CANCELED;
	});

	return cancelItems.length;
}
