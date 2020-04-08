import React, { Component, Fragment, } from 'react';
import {
	Table,
	HeaderButtonBar,
	Button,
	DecimalNumber,
} from 'ljit-react-components';
import PageBlock from '../../../../../components/page-block';
import RechargeSearchForm from '../recharge-search-form';
import RechargePaymentServiceModal from '../recharge-payment-service-modal';
import RechargeConfirmModal from '../recharge-confirm-modal';
import LevelCell from '../level-cell';
import StatusCell from '../status-cell';
import OperationTextButton from '../operation-text-button';
import ModifyTextButton from '../modify-text-button';
import {
	fakeData as data,
	getPaymentStatus,
} from '../utils';
import './style.styl';

const propTypes = {};

class CashSystemCreditControlThirdPartyAccountPage extends Component {
	constructor() {
		super();
		this.state = {
			formTitle: '',
			formData: {},
			pagination: {},
			isFormVisible: false,
			isStatusExchangeModalShow: false,
			recordStatus: '0',
			isRecommendationModalShow: false,
			recordRecommendation: '3',
		};
		this._handleExchangeStatus = this._handleExchangeStatus.bind(this);
		this._handleSubmitExchangeStatus = this._handleSubmitExchangeStatus.bind(this);
		this._handleRecommendation = this._handleRecommendation.bind(this);
		this._handleSubmitExchangeRecommendation = this._handleSubmitExchangeRecommendation.bind(this);
		this._handleEditForm = this._handleEditForm.bind(this);
		this._handleShowForm = this._handleShowForm.bind(this);
		this._handleHideForm = this._handleHideForm.bind(this);
		this._handleFormSubmit = this._handleFormSubmit.bind(this);
		this._handleTableChange = this._handleTableChange.bind(this);
	}

	_handleExchangeStatus(record) {
		this.setState({
			isStatusExchangeModalShow: true,
			recordStatus: record.status,
		});
	}
	_handleSubmitExchangeStatus() {
		//TODO update status to server
		this.setState({
			isStatusExchangeModalShow: false,
		});
	}
	_handleRecommendation(record) {
		this.setState({
			isRecommendationModalShow: true,
			recordRecommendation: record.recommendation,
		});
	}
	_handleSubmitExchangeRecommendation() {
		//TODO update status to server
		this.setState({
			isRecommendationModalShow: false,
		});
	}
	_handleEditForm(formTitle, record) {
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
			isFormVisible: false,
		});
	}
	_handleFormSubmit(data) {
		// TODO call api
		this._handleHideForm();
	}
	_handleTableChange(pagination) {
		// TODO dispatch action to update transactionLog data
		this.setState({ pagination, });
	}

	render() {
		const {
			state,
			_handleHideForm,
			_handleFormSubmit,
			_handleSubmitExchangeStatus,
			_handleSubmitExchangeRecommendation,
			_handleShowForm,
			_handleTableChange,
			_handleEditForm,
			_handleExchangeStatus,
			_handleRecommendation,
		} = this;
		const {
			formTitle,
			formData,
			isFormVisible,
			isStatusExchangeModalShow,
			recordStatus,
			isRecommendationModalShow,
			recordRecommendation,
			pagination,
		} = state;

		return (
			<PageBlock className="cash-system-third-party-account">
				<RechargePaymentServiceModal
					title={formTitle}
					initialValues={{
						rechargeName: formData.rechargeName,
						thirdPartyPay: formData.thirdPartyPay,
						rechargeType: formData.rechargeType,
						tradeName: formData.tradeName,
						smartPayPublicKey: formData.smartPayPublicKey,
						vendorKey: formData.vendorKey,
						shoppingRedirection: formData.shoppingRedirection,
						deactivationAmount: formData.deactivationAmount,
						level: formData.level,
						fixedCollections: formData.fixedCollections,
						minCollection: formData.minCollection,
						maxCollection: formData.maxCollection,
						singlePaymentLimit: formData.singlePaymentLimit,
						remark: formData.remark,
						hiddenDevice: formData.hiddenDevice,
						collectionType: formData.collectionType,
					}}
					isVisible={isFormVisible}
					onCancel={_handleHideForm}
					onSubmit={_handleFormSubmit}
					className="cash-system-third-party-account__recharge-payment-service-modal"
				/>
				<RechargeConfirmModal
					status={recordStatus}
					isVisible={isStatusExchangeModalShow}
					onCancel={() => this.setState({ isStatusExchangeModalShow: false })}
					onSubmit={_handleSubmitExchangeStatus}
				/>
				<RechargeConfirmModal
					status={recordRecommendation}
					isVisible={isRecommendationModalShow}
					onCancel={() => this.setState({ isRecommendationModalShow: false })}
					onSubmit={_handleSubmitExchangeRecommendation}
				/>
				<RechargeSearchForm
					formType={RechargeSearchForm.FormTypeEnum.SHOPPING}
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
								onClick={() => _handleShowForm('第三方帐户新增')}
							>
								新增第三方帐户
							</Button>
						)}
					/>
				</div>
				<div>
					<Table
						rowKey="_id"
						alignType={Table.AlignTypeEnums.CENTER}
						dataSource={data}
						onTableChange={_handleTableChange}
						paginationProps={pagination}
						hasPagination
						expandedRowRender={(record) => (
							<div>
								<p>
									{`收款金额限制：${record.minCollection} - ${record.maxCollection}`}
								</p>
								<p>
									停用金额：<DecimalNumber data={record.deactivationAmount} hasSeparator isCurrency/>
								</p>
								<p>
									购物跳转网址：<span className="redirect-address">{record.redirectAddress}</span>
								</p>
								<p>
									{`隐藏装置：${record.hiddenDevice}`}
								</p>
								<p>
									{`存款百分比：${record.deposit}`}
								</p>
								<p>
									{`存款盈利百分比：${record.depositProfit}`}
								</p>
								<p>
									{`其他：${record.remark}`}
								</p>
							</div>
						)}
						columns={[
							{
								title: '名称',
								dataIndex: 'rechargeName',
								key: '0',
							},
							{
								title: '充值类型',
								dataIndex: 'rechargeType',
								key: '1',
							},
							{
								title: '支付平台',
								dataIndex: 'bank',
								key: '2',
							},
							{
								title: '商号',
								dataIndex: 'tradeName',
								key: '3',
							},
							{
								title: '层级',
								dataIndex: 'level',
								key: '4',
								render: (level) => <LevelCell levels={level} />,
							},
							{
								title: '最大收款金额',
								dataIndex: 'maxCollection',
								key: '5',
								render: (maxCollection) => <DecimalNumber data={maxCollection} isCurrency hasSeparator/>,
							},
							{
								title: '状态',
								dataIndex: '',
								key: '6',
								render: (record) => (
									<Fragment>
										<div style={{ margin: '0px 0px 10px 0px' }}>
											<StatusCell {...getPaymentStatus(record.status)} />
										</div>
										<div style={{ margin: '10px 0px 0px 0px' }}>
											<StatusCell {...getPaymentStatus(record.recommendation)} />
										</div>
									</Fragment>
								),
							},
							{
								title: '操作',
								dataIndex: 'operation',
								key: '7',
								render: (text, record) => (
									<Fragment>
										<div>
											<ModifyTextButton
												onClick={() => _handleEditForm('第三方帐户编辑', record)}
											/>
										</div>
										<div>
											<OperationTextButton
												status={record.status}
												onClick={() => _handleExchangeStatus(record)}
											/>
										</div>
										<div>
											<OperationTextButton
												status={record.recommendation}
												onClick={() => _handleRecommendation(record)}
											/>
										</div>
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

CashSystemCreditControlThirdPartyAccountPage.propTypes = propTypes;

export default CashSystemCreditControlThirdPartyAccountPage;
