import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Button, } from 'ljit-react-components';
import PageBlock from '../../../../../components/page-block';
import ThirdPartySearchForm from './third-party-search-form';
import ThirdPartyModal from './third-party-modal';
import ThirdPartyStatusModal from './third-party-status-modal';
import ThirdPartyTable from './third-party-table';
import { ActivateStatusEnums, } from '../../../../../components/table/constants';
import './style.styl';

const {
	ARCHIVED,
	ACTIVE,
} = ActivateStatusEnums;

const propTypes = {
	// TODO add proptypes after get data from reducer
};

const PREFIX_CLASS = 'debit-control-third-party';

class CashSystemDebitControlThirdPartyPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isAddModalVisible: false,
			isModifyModalVisible: false,
			isStatusModalVisible: false,
			record: {
				status: '',
			},
		};

		this._handleSearch = this._handleSearch.bind(this);
		this._handleReset = this._handleReset.bind(this);
		this._handleAdd = this._handleAdd.bind(this);
		this._handleSubmitAdd = this._handleSubmitAdd.bind(this);
		this._handleModify = this._handleModify.bind(this);
		this._handleSubmitModify = this._handleSubmitModify.bind(this);
		this._handleChangeStatus = this._handleChangeStatus.bind(this);
		this._handleSubmitChangeStatus = this._handleSubmitChangeStatus.bind(this);
	}
	
	_handleSearch(form) {
		// TODO call api then update table
		form.validateFields((error, values) => {});
	}

	_handleReset(form) {
		form.resetFields();
	}

	_handleAdd() {
		this.setState({
			isAddModalVisible: true,
		});
	}

	_handleSubmitAdd() {
		// TODO dispatch add third party setting
		this.setState({
			isAddModalVisible: false,
		});
	}

	_handleModify(record, index) {
		this.setState({
			isModifyModalVisible: true,
			record,
		});
	}

	_handleSubmitModify() {
		// TODO dispatch modify action
		this.setState({
			isModifyModalVisible: false,
		});
	}

	_handleChangeStatus(record, index) {
		this.setState({
			isStatusModalVisible: true,
			record,
		});
	}

	_handleSubmitChangeStatus() {
		// TODO dispatch change status action
		this.setState({
			isStatusModalVisible: false,
		});
	}

	render() {
		const {
			isAddModalVisible,
			isModifyModalVisible,
			isStatusModalVisible,
			record,
		} = this.state;
		const {
			_handleSearch,
			_handleReset,
			_handleAdd,
			_handleSubmitAdd,
			_handleModify,
			_handleSubmitModify,
			_handleChangeStatus,
			_handleSubmitChangeStatus,
		} = this;

		return (
			<PageBlock className={`${PREFIX_CLASS}`}>
				<ThirdPartySearchForm
					onSearch={_handleSearch}
					onReset={_handleReset}
				/>
				<div className={`${PREFIX_CLASS}__add-button`}>
					<Button
						icon={Button.IconEnums.PLUS}
						onClick={_handleAdd}
					>
						新增第三方代付
					</Button>
				</div>
				<ThirdPartyTable
					vendorsData={fakeData}
					isShowingOperations
					onClickModify={_handleModify}
					onClickChangeStatus={_handleChangeStatus}
				/>
				<ThirdPartyModal
					thirdPartyBank={{
						paymentPlatform: 1,
						singlePaymentLimit: 0,
					}}
					isVisible={isAddModalVisible}
					title="第三方代付新增"
					onSubmit={_handleSubmitAdd}
					onCancel={() => this.setState({ isAddModalVisible: false, })}
				/>
				<ThirdPartyModal
					thirdPartyBank={{
						vendorName: record.vendorName,
						paymentPlatform: record.paymentPlatform,
						tradeName: record.tradeName,
						vendorKey: record.vendorKey, 
						smartPayPublicKey: record.smartPayPublicKey,
						level: record.level,
						singlePaymentLimit: record.singlePaymentLimit,
						other: record.other,
					}}
					isVisible={isModifyModalVisible}
					title="第三方代付修改"
					onSubmit={_handleSubmitModify}
					onCancel={() => this.setState({ isModifyModalVisible: false, })}
				/>
				<ThirdPartyStatusModal
					isVisible={isStatusModalVisible}
					title="确认提示"
					status={record.status}
					onSubmit={_handleSubmitChangeStatus}
					onCancel={() => this.setState({ isStatusModalVisible: false, })}
				/>
			</PageBlock>
		);
	}
}

CashSystemDebitControlThirdPartyPage.propTypes = propTypes;

export default CashSystemDebitControlThirdPartyPage;

const fakeData = [{
	id: 1,
	vendorName: '畅汇',
	paymentPlatform: 2,
	tradeName: '11050163980000000752',
	level: ['1'],
	singlePaymentLimit: 10000,
	status: ACTIVE,
	other: 'k4pl3557e8wtp8564535242542525',
},{
	id: 2,
	vendorName: 'COLA-001',
	paymentPlatform: 3,
	tradeName: '11050163980000000752',
	level: ['1', '5', '9'],
	singlePaymentLimit: 5000,
	status: ARCHIVED,
	other: 'k4pl3557e8wtp8564535242542525',
}];
