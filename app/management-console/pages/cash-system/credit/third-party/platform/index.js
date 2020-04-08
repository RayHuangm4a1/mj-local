import React, { Component, } from 'react';
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
import DepositRecordSearchForm from '../deposit-record-search-form';
import PageBlock from '../../../../../components/page-block';
import PageModal from '../../../../../components/page-modal';
import { DepositStatusEnum, } from '../../../../../lib/enums';
import DepositConfirmModal from './deposit-confirm-modal';
import CustomizeColumnsModal from '../../customize-columns-modal';
import {
	checkIsNewStatus,
	checkIsInconsistentStatus,
} from '../../utils';
import {
	PREFIX_CLASS,
	ColumnDefinitionMap,
	ColumnDefinitionEnums,
	defaultEnabledColumns,
} from './utils';
import './style.styl';

const propTypes = {};
const defaultProps = {};

const {
	NEW,
	CANCELED,
	INCONSISTENT,
} = DepositStatusEnum;

const {
	DEPOSITED_THIRD_PARTY,
	OPERATION,
	STATUS,
	AMOUNT,
	FEE,
} = ColumnDefinitionEnums;

const {
	Message: CancelAllSelectedItemsModal,
} = PageModal;

class CashSystemCreditBankPage extends Component {
	constructor() {
		super();
		this.state = {
			isCancelAllModalVisible: false,
			isCustomizeColumnsModalVisible: false,
			isDepositConfirmModalVisible: false,
			current: createFakeDepositData(),
			enabledColumns: [
				...defaultEnabledColumns,
				DEPOSITED_THIRD_PARTY,
				AMOUNT,
				FEE,
				STATUS,
				OPERATION,
			],
			selectedRows: [],
			order: {},
			pagination: {},
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
	_handleChangeTable(pagination, filters, sorter) {
		this.setState({ pagination, });
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
		const renderColumns = Object.keys(record)
			.filter(dataIndex => ColumnDefinitionMap[dataIndex] && enabledColumns.indexOf(dataIndex) === -1);
		const leftRenderColumns = renderColumns.filter((_, index) => index < 5);
		const rightRenderColumns = renderColumns.filter((_, index) => index >= 5);

		return (
			<Row>
				<Col span={12}>
					{leftRenderColumns.map(dataIndex => renderExpandRowElement(dataIndex, record, index))}
				</Col>
				<Col span={12}>
					{rightRenderColumns.map(dataIndex => renderExpandRowElement(dataIndex, record, index))}
				</Col>
			</Row>
		);
	}
	render() {
		const {
			state,
			_handleHideCancelAllSelectionModal,
			_handleClickCancelAllSelectionModalOk,
			_handleHideCustomizeColumnsModal,
			_handleCustomizeColumnsModalSubmit,
			_handleHideDepositConfirmModal,
			_handleClickDepositConfirmModalOk,
			_handleSearch,
			_handleClickCustomizeColumns,
			_handleClickCancelAllSelection,
			_handleChangeTable,
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
			pagination,
		} = state;
		const modalMessage = `是否确定取消此 ${countTheNumberOfCancellations(selectedRows, current)} 筆項目？`;
		const fakeTotalAmount = current.reduce((accumulator, currItem) => accumulator + currItem.amount, 0);
		const fakeTotalFee = current.reduce((accumulator, currItem) => accumulator + currItem.fee, 0);
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
					paginationProps={{
						...pagination,
					}}
					onTableChange={_handleChangeTable}
					alignType={Table.AlignTypeEnums.CENTER}
					dataSource={current}
					columns={columns}
					rowSelection={rowSelection}
					expandedRowRender={_renderExpandRow}
				/>
			</PageBlock>
		);
	}
}

CashSystemCreditBankPage.propTypes = propTypes;
CashSystemCreditBankPage.defaultProps = defaultProps;
// TODO 串接 API 來達成 (1) 取消 與 批量取消 動作, (2) 搜尋取得資料, (3) 搜尋取得指定入款單, (4) 資料換頁
export default CashSystemCreditBankPage;

function renderExpandRowElement(dataIndex, record, index) {
	const { title, render, } = ColumnDefinitionMap[dataIndex];
	const value = record[dataIndex];

	let content = '';

	if (dataIndex === 'level') {
		content = value.join(', ');
	} else {
		content = render ? render(value, record, index) : value;
	}
	return (
		<p key={`expand-row-${dataIndex}`}>
			{title}：{content}
		</p>
	);
}

function countTheNumberOfCancellations(selectedRows = [], currentItems = []) {
	const cancelItems = selectedRows.filter((item = {}) => {
		const matchedItem = currentItems.filter(currItem => currItem.id === item.id);

		return matchedItem.length > 0 && matchedItem[0].status !== CANCELED;
	});

	return cancelItems.length;
}

function createFakeDepositData() {
	const fakeUserNames = [
		'Albus Dumbledore',
		'Severus Snape',
		'Minerva McGonagall',
		'Horace Slughorn',
		'Filius Flitwick',
		'Pomona Sprout',
		'Professor Kettleburn',
		'Galatea Merrythought',
		'Remus Lupin',
		'Dolores Umbridge',
		'Amycus Carrow',
		'Rubeus Hagrid',
		'Argus Filch',
		'Sirius Black',
		'Hermione Granger',
		'Ronald Billius Weasley',
		'Dobby',
		'James Potter',
		'Lily Potter',
		'Harry Potter',
		'Molly Weasley',
	];
	
	return fakeUserNames.map((username, index) => ({
		id: index,
		depositedThirdParty: 'Gringotts Wizarding Bank',
		status: index % 2 ? INCONSISTENT : NEW,
		amount: 123 + index * 234,
		fee: 1 + index * 3,
		username: username,
		thirdPartyAccount: username,
		debitCardNumber: 1122334455 + index,
		level: [`第${index%8+1}层`, ],
		orderId: String(20317121001 + index),
		operator: index % 2 ? 'Griphook' : 'Gornuk',
		transactedAt: new Date(),
		depositsAt: new Date(),
		confirmedAt: new Date(),
		comment: 'Harry Potter series',
	}));
}
