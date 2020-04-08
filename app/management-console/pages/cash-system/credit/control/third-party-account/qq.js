import React, { Component, Fragment, } from 'react';
import {
	Table,
	HeaderButtonBar,
	Button,
	Divider,
	DecimalNumber,
} from 'ljit-react-components';
import PageBlock from '../../../../../components/page-block';
import RechargeSearchForm from '../recharge-search-form';
import RechargeAccountModal from '../recharge-account-modal';
import RechargeConfirmModal from '../recharge-confirm-modal';
import LevelCell from '../level-cell';
import StatusCell from '../status-cell';
import DisableTextButton from '../disable-text-button';
import ModifyTextButton from '../modify-text-button';
import {
	fakeData as data,
	getStatus,
	checkStatusIsArchived,
} from '../utils';

const propTypes = {};

class CashSystemCreditControlThirdPartyAccountQqPage extends Component {
	constructor() {
		super();
		this.state = {
			formTitle: '',
			formData: {},
			isFormVisible: false,
			isEditStatus: false,
			isStatusDisableModalShow: false,
			recordStatus: '0',
		};
		this._handleDisableStatus = this._handleDisableStatus.bind(this);
		this._handleSubmitDisableStatus = this._handleSubmitDisableStatus.bind(this);
		this._handleEditForm = this._handleEditForm.bind(this);
		this._handleShowForm = this._handleShowForm.bind(this);
		this._handleHideForm = this._handleHideForm.bind(this);
		this._handleSubmitForm = this._handleSubmitForm.bind(this);
	}

	_handleDisableStatus(record) {
		this.setState({
			isStatusDisableModalShow: true,
			recordStatus: record.status,
		});
	}
	_handleSubmitDisableStatus() {
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

	render() {
		const {
			formTitle,
			formData,
			isFormVisible,
			isEditStatus,
			isStatusDisableModalShow,
			recordStatus,
		} = this.state;

		return (
			<PageBlock>
				<RechargeAccountModal
					title={formTitle}
					initialValues={{
						bank: formData.bank,
						rechargeType: formData.rechargeType,
						bankAccount: formData.bankAccount,
						level: formData.level,
						payee: formData.payee,
						netPoint: formData.netPoint,
						clientAccount: formData.clientAccount,
						minCollection: formData.minCollection,
						maxCollection: formData.maxCollection,
						handlingFeePercent: formData.handlingFeePercent,
						remark: formData.remark,
						lastUpdateTime: formData.lastUpdateTime,
						status: formData.status,
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
					onSubmit={this._handleSubmitDisableStatus}
				/>
				<RechargeSearchForm
					formType={RechargeSearchForm.FormTypeEnum.BANK}
					onSearch={(formData) => {
						// TODO fetch data
					}}
				/>
				<div className="recharge-button-bar">
					<HeaderButtonBar
						right={(
							<Button
								icon="plus"
								color={Button.ColorEnums.BRIGHTBLUE500}
								onClick={() => this._handleShowForm('QQ帐户新增')}
							>
								新增QQ帐户
							</Button>
						)}
					/>
				</div>
				<div>
					<Table
						rowKey="_id"
						alignType={Table.AlignTypeEnums.CENTER}
						dataSource={data}
						expandedRowRender={(record) => {
							return (
								<div>
									<p>
										{`收款人：${record.payee}`}
									</p>
									<p>
										{`开户行网点：${record.netPoint}`}
									</p>
									<p>
										{`提示帐号：${record.hintAccount}`}
									</p>
									<p>
										{`备注：${record.remark}`}
									</p>
									<p>
										{`最后更新时间：${record.lastUpdateTime}`}
									</p>
								</div>
							);
						}}
						columns={[
							{
								title: '银行',
								dataIndex: 'bank',
							},
							{
								title: '商号/银行帐号',
								dataIndex: 'bankAccount',
							},
							{
								title: '充值类型',
								dataIndex: 'rechargeType',
							},
							{
								title: '层级',
								dataIndex: 'level',
								render: (level) => <LevelCell levels={level} />,
							},
							{
								title: '最小收款金额',
								dataIndex: 'minCollection',
								render: (minCollection) => <DecimalNumber data={minCollection} isCurrency hasSeparator/>,
							},
							{
								title: '最大收款金额',
								dataIndex: 'maxCollection',
								render: (maxCollection) => <DecimalNumber data={maxCollection} isCurrency hasSeparator/>,
							},
							{
								title: '状态',
								dataIndex: 'status',
								render: (status) => <StatusCell {...getStatus(status)} />,
							},
							{
								title: '操作',
								dataIndex: 'operation',
								render: (text, record) => (
									<Fragment>
										<DisableTextButton
											isDisabled={checkStatusIsArchived(record.status)}
											onClick={() => this._handleDisableStatus(record)}
										/>
										<Divider type={Divider.DirectionTypeEnums.VERTICAL}/>
										<ModifyTextButton
											onClick={() => this._handleEditForm('QQ帐户修改', record)}
										/>
									</Fragment>
								),
							},
						]}
					/>
				</div>
			</PageBlock>
		);
	}
}

CashSystemCreditControlThirdPartyAccountQqPage.propTypes = propTypes;

export default CashSystemCreditControlThirdPartyAccountQqPage;
