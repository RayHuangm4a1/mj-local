import React, { Component, Fragment, } from 'react';
import {
	Table,
	HeaderButtonBar,
	Button,
	Divider,
} from 'ljit-react-components';
import PageBlock from '../../../../../components/page-block';
import RechargeSearchForm from '../recharge-search-form';
import RechargeAccountModal from '../recharge-account-modal';
import RechargeConfirmModal from '../recharge-confirm-modal';
import DisableTextButton from '../disable-text-button';
import ModifyTextButton from '../modify-text-button';
import CustomizeColumnsModal from './customize-columns-modal';
import {
	fakeData as data,
	checkStatusIsArchived,
} from '../utils';
import {
	ColumnDefinitionEnums,
	ColumnDefinitionMap,
} from './utils';
import './style.styl';

const {
	NAME,
	BANK,
	BANK_ACCOUNT,
	RECHARGE_TYPE,
	LEVEL,
	MIN_COLLECTION,
	MAX_COLLECTION,
	STATUS,
	OPERATION,
} = ColumnDefinitionEnums;

const propTypes = {};

const PREFIX_CLASS = 'credit-bank-account-page';

class CashSystemCreditControlBankAccountPage extends Component {
	constructor() {
		super();
		this.state = {
			formTitle: '',
			formData: {},
			isFormVisible: false,
			isEditStatus: false,
			isStatusDisableModalShow: false,
			isCustomizeColumnsModalShow: false,
			recordStatus: '0',
			enabledColumns: [
				NAME,
				BANK,
				BANK_ACCOUNT,
				RECHARGE_TYPE,
				LEVEL,
				MIN_COLLECTION,
				MAX_COLLECTION,
				STATUS,
			],
		};
		this._handleStatusDisable = this._handleStatusDisable.bind(this);
		this._handleSubmitStatusDisable = this._handleSubmitStatusDisable.bind(this);
		this._handleEditForm = this._handleEditForm.bind(this);
		this._handleShowForm = this._handleShowForm.bind(this);
		this._handleHideForm = this._handleHideForm.bind(this);
		this._handleSubmitForm = this._handleSubmitForm.bind(this);
		this._handleSubmitColumns = this._handleSubmitColumns.bind(this);
		this._renderExpandedRow = this._renderExpandedRow.bind(this);
		this._renderColumns = this._renderColumns.bind(this);
	}

	_handleStatusDisable(record) {
		this.setState({
			isStatusDisableModalShow: true,
			recordStatus: record.status,
		});
	}
	_handleSubmitStatusDisable() {
		//TODO update status to server
		this.setState({
			isStatusDisableModalShow: false,
		});
	}
	_handleEditForm(formTitle, record) {
		this.setState({ isEditStatus: true });
		this._handleShowForm(formTitle, record);
	}
	_handleShowForm(formTitle, formData = {}) {
		this.setState({
			formTitle,
			formData,
			isFormVisible: true,
		});
	}
	_handleHideForm() {
		this.setState({
			formTitle: '',
			formData: {},
			isEditStatus: false,
			isFormVisible: false,
		});
	}
	_handleSubmitForm(data) {
		// TODO call api
		this._handleHideForm();
	}
	_handleSubmitColumns(enabledColumns) {
		this.setState({
			isCustomizeColumnsModalShow: false,
			enabledColumns,
		});
	}
	_renderExpandedRow(record = {}, index) {
		const { enabledColumns, } = this.state;

		return Object.keys(record)
			.filter(dataIndex => {
				return ColumnDefinitionMap[dataIndex] && enabledColumns.indexOf(dataIndex) === -1;
			})
			.map(dataIndex => {
				const { title, render, } = ColumnDefinitionMap[dataIndex];
				const value = record[dataIndex];

				return (
					<div
						key={`expand-row-${dataIndex}`}
						className={`${PREFIX_CLASS}__table-expand-item` }
					>
						{title} : {render ? render(value, record, index) : value}
					</div>
				);
			});
	}
	_renderColumns() {
		const { enabledColumns, } = this.state;
		const columns = enabledColumns
			.filter((column) => column !== OPERATION)
			.map((column) => {
				return ColumnDefinitionMap[column];
			});

		const operationColumn = {
			title: '操作',
			dataIndex: OPERATION,
			render: (text, record) => (
				<Fragment>
					<DisableTextButton
						isDisabled={checkStatusIsArchived(record.status)}
						onClick={() => this._handleStatusDisable(record)}
					/>
					<Divider type={Divider.DirectionTypeEnums.VERTICAL}/>
					<ModifyTextButton
						onClick={() => this._handleEditForm('银行帐户修改', record)}
					/>
				</Fragment>
			),
		};

		return [...columns, operationColumn];
	}

	render() {
		const {
			formTitle,
			formData,
			isFormVisible,
			isEditStatus,
			isStatusDisableModalShow,
			isCustomizeColumnsModalShow,
			enabledColumns,
			recordStatus,
		} = this.state;
		const { 
			_renderColumns,
			_renderExpandedRow,
			_handleSubmitColumns,
		} = this;
		const columns = _renderColumns();

		return (
			<PageBlock className={PREFIX_CLASS}>
				<RechargeAccountModal
					title={formTitle}
					initialValues={{
						name: formData.name,
						bank: formData.bank,
						rechargeType: formData.rechargeType,
						bankAccount: formData.bankAccount,
						level: formData.level,
						payee: formData.payee,
						netPoint: formData.netPoint,
						clientAccount: formData.clientAccount,
						fixedCollections: formData.fixedCollections,
						minCollection: formData.minCollection,
						maxCollection: formData.maxCollection,
						handlingFeePercent: formData.handlingFeePercent,
						remark: formData.remark,
						lastUpdateTime: formData.lastUpdateTime,
					}}
					isEditStatus={isEditStatus}
					isVisible={isFormVisible}
					onCancel={this._handleHideForm}
					onSubmit={this._handleSubmitForm}
				/>
				<RechargeConfirmModal
					status={recordStatus}
					isVisible={isStatusDisableModalShow}
					onCancel={() => this.setState({ isStatusDisableModalShow: false })}
					onSubmit={this._handleSubmitStatusDisable}
				/>
				<RechargeSearchForm
					formType={RechargeSearchForm.FormTypeEnum.BANK}
					onSearch={(formData) => {
						// TODO fetch data
					}}
				/>
				<CustomizeColumnsModal
					isModalVisible={isCustomizeColumnsModalShow}
					enabledColumns={enabledColumns}
					onSubmit={_handleSubmitColumns}
					onCancel={() => this.setState({ isCustomizeColumnsModalShow: false })}
				/>
				<div className="recharge-button-bar">
					<HeaderButtonBar
						right={(
							<React.Fragment>
								<Button
									color={Button.ColorEnums.BRIGHTBLUE500}
									outline={Button.OutlineEnums.HOLLOW}
									onClick={() => this.setState({ isCustomizeColumnsModalShow: true })}
								>
									自订显示项目
								</Button>
								<Button
									icon="plus"
									color={Button.ColorEnums.BRIGHTBLUE500}
									onClick={() => this._handleShowForm('银行帐户新增')}
								>
									新增银行帐户
								</Button>
							</React.Fragment>
						)}
					/>
				</div>
				<div>
					<Table
						rowKey="_id"
						alignType={Table.AlignTypeEnums.CENTER}
						dataSource={data}
						columns={columns}
						expandedRowRender={_renderExpandedRow}
					/>
				</div>
			</PageBlock>
		);
	}
}

CashSystemCreditControlBankAccountPage.propTypes = propTypes;

export default CashSystemCreditControlBankAccountPage;
