import React, { Component } from 'react';
import SearchForm from './search-form';
import { Button, } from 'ljit-react-components';
import PageBlock from '../../../../components/page-block';
import { PayCompanyTable, } from '../../../../components/table';
import PayCompanyStatisticRow from './pay-company-statistic-row';
import PayCompanyModal from './pay-company-modal';
import './style.styl';

const OperatingEnums = {
	DETAIL: 'detail',
	CANCEL: 'cancel',
	CONFIRM: 'confirm',
};

const PREFIX_CLASS = 'behalf-payment-company-info';

const { StatusEnums } = SearchForm ;

class CashSystemBehalfPaymentCompanyPage extends Component {
	constructor() {
		super();

		this.state ={
			isModalVisible: false,
			payCompanyList: PayCompanyList,
			statisticDatas: {
				payCompanyListCount: StatisticDatas.payCompanyListCount,
				payCompanyAmount: StatisticDatas.payCompanyAmount,
				payCompanyFee: StatisticDatas.payCompanyFee,
				payCompanyBankFee: StatisticDatas.payCompanyBankFee,
			},
			modalType: OperatingEnums.DETAIL,
			modalDetail: {
				account: '',
				holder: '',
				bank: '',
				bankBranch: '',
				status: '',
				amount: 0,
				fee: 0,
				confirmAmount: 0,
				unConfirmAmount: 0,
				bankFee: 0,
				remark: '',
				iconFileList: []
			}
		};

		this._handleSearchClick = this._handleSearchClick.bind(this);
		this._handleFailSubmit = this._handleFailSubmit.bind(this);
		this._handleProcessSubmit = this._handleProcessSubmit.bind(this);
		this._handleConfirmSubmit = this._handleConfirmSubmit.bind(this);
		this._handleCancelSubmit = this._handleCancelSubmit.bind(this);
		this._handleShowModal = this._handleShowModal.bind(this);
		this._handleModalCancel = this._handleModalCancel.bind(this);
		this._renderModalButtons = this._renderModalButtons.bind(this);
	}
	_handleSearchClick(values) {
		// TODO: search data API
		console.log('search values', values);
	}
	_handleFailSubmit() {
		const { modalDetail, } = this.state;

		// TODO: fail data API
		console.log('fail submit', modalDetail);
	}
	_handleProcessSubmit() {
		const { modalDetail, } = this.state;

		// TODO: process data API
		console.log('process submit', modalDetail);
	}
	_handleConfirmSubmit() {
		const { modalDetail, } = this.state;

		// TODO: confirm data API
		console.log('confirm submit', modalDetail);
	}
	_handleCancelSubmit() {
		const { modalDetail, } = this.state;

		// TODO: cancel data API
		console.log('cancel submit', modalDetail);
	}
	_handleShowModal(record, modalType) {
		this.setState({
			isModalVisible: true,
			modalType: modalType,
			modalDetail: {
				bankAccount: record.bankAccount,
				holder: record.holder,
				bank: record.bank,
				bankBranch: record.bankBranch,
				status: record.status,
				amount: record.amount,
				fee: record.fee,
				confirmAmount: record.confirmAmount,
				unConfirmAmount: record.unConfirmAmount,
				bankFee: record.bankFee,
				remark: record.remark
			}
		});
	}
	_handleModalCancel() {
		this.setState({ isModalVisible: false, });
	}
	_renderModalButtons() {
		const { modalType, } = this.state;
		let buttons = [];

		if (modalType === OperatingEnums.CONFIRM) {
			buttons = [
				<Button key={StatusEnums.FAIL} onClick={this._handleFailSubmit} outline={Button.OutlineEnums.HOLLOW}>出款失败</Button>,
				<Button key={StatusEnums.PROCESS} onClick={this._handleProcessSubmit} outline={Button.OutlineEnums.HOLLOW}>银行处理中</Button>,
				<Button key={StatusEnums.CONFIRM} onClick={this._handleConfirmSubmit} outline={Button.OutlineEnums.SOLID}>确认出款</Button>,
			];
		} else if (modalType === OperatingEnums.CANCEL) {
			buttons = [
				<Button key={StatusEnums.CANCEL} onClick={this._handleCancelSubmit} outline={Button.OutlineEnums.SOLID}>取消出款</Button>,
			];
		}

		buttons.splice(buttons.length - 1, 0, <Button key= "close" onClick={this._handleModalCancel} outline={Button.OutlineEnums.HOLLOW}>关闭</Button>);

		return buttons;
	}

	render() {
		const { isModalVisible, modalDetail, payCompanyList, statisticDatas, modalType, } = this.state;
		const {
			_renderModalButtons,
			_handleModalCancel,
			_handleSearchClick,
			_handleShowModal,
		} = this;
		const {
			payCompanyListCount,
			payCompanyAmount,
			payCompanyFee,
			payCompanyBankFee,
		} = statisticDatas;

		return (
			<div className={PREFIX_CLASS}>
				<PageBlock>
					<PayCompanyModal
						data={modalDetail}
						type={modalType}
						isVisible={isModalVisible}
						footer={_renderModalButtons()}
						onClickCancel={_handleModalCancel}
					/>
					<SearchForm
						onSearch={_handleSearchClick}>
					</SearchForm>
					<PayCompanyStatisticRow
						listCount={payCompanyListCount}
						amount={payCompanyAmount}
						fee={payCompanyFee}
						bankFee={payCompanyBankFee}
					/>
					<PayCompanyTable
						className="pay-company_table"
						dataSource={payCompanyList}
						// TODO update methods
						onClickDetails={(record) => _handleShowModal(record, OperatingEnums.DETAIL)}
						onClickConfirmDeposit={(record) => _handleShowModal(record, OperatingEnums.CONFIRM)}
						onClickCancelDeposit={(record) => _handleShowModal(record, OperatingEnums.CANCEL)}
					/>
				</PageBlock>
			</div>
		);
	}
}

export default CashSystemBehalfPaymentCompanyPage;
// TODO: should be removed after api is ready
const StatisticDatas = {
	payCompanyListCount: 20,
	payCompanyAmount: 3318500,
	payCompanyFee: 3000,
	payCompanyBankFee: 3800,
};
const imageFile =  {
	uid: 'pic4',
	name: 'pic4',
	thumbUrl: 'https://picsum.photos/id/133/50/40'
};
const PayCompanyList = [{
	_id: 1,
	cardId: '2201370030234552',
	bankAccount: '62170493995955',
	holder: '馬采風',
	bank: '中國浦發銀行',
	bankBranch: '龍崗支行',
	amount: 3000,
	fee: 0,
	bankFee: 0,
	feePoint: 0,
	confirmAmount: 3000,
	unConfirmAmount: 4500,
	applyAt: '2019/02/12',
	confirmAt: '2019/02/12',
	status: '待确认',
	remark: 'test',
	administrator: 'admin',
	iconFileList: [imageFile],
},{
	_id: 2,
	cardId: '1000562400520056',
	bankAccount: '62170493995955',
	holder: '馬采風',
	bank: '中國浦發銀行',
	bankBranch: '龍崗支行',
	amount: 150000,
	fee: 0,
	bankFee: 0,
	feePoint: 0,
	confirmAmount: 150000,
	unConfirmAmount: 4500,
	applyAt: '2019/03/15',
	confirmAt: '2019/03/15',
	status: '待确认',
	remark: 'test',
	iconFileList: [imageFile],
	administrator: 'admin'
},{
	_id: 3,
	cardId: ' 2201370030234552',
	bankAccount: '62170493995955',
	holder: '馬采風',
	bank: '中國浦發銀行',
	bankBranch: '龍崗支行',
	amount: 3000,
	fee: 10,
	bankFee: 220,
	feePoint: 0,
	confirmAmount: 3000,
	unConfirmAmount: 4500,
	applyAt: '2019/03/15',
	confirmAt: '2019/03/15',
	status: '待第三方出款處理',
	remark: 'test',
	iconFileList: [imageFile],
	administrator: 'admin'
},{
	_id: 4,
	cardId: '1000562400520056',
	bankAccount: '62170493995955',
	holder: '馬采風',
	bank: '中國浦發銀行',
	bankBranch: '龍崗支行',
	amount: 150000,
	fee: 0,
	bankFee: 0,
	feePoint: 0,
	confirmAmount: 3000,
	unConfirmAmount: 4500,
	applyAt: '2019/03/15',
	confirmAt: '2019/03/15',
	status: '待第三方出款處理',
	remark: 'test',
	iconFileList: [imageFile],
	administrator: 'admin11'
}, ];
