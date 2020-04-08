import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Input,
	DateRangePicker,
	Select,
} from 'ljit-react-components';
import { PayCompanyTable, } from '../../../components/table';
import PayCompanyDetailsModal from './modal/pay-company-details';

const propTypes = {
	dataSource: PropTypes.arrayOf(PropTypes.shape({
		cardId: PropTypes.string,
		account: PropTypes.string,
		holder: PropTypes.string,
		bank: PropTypes.string,
		bankBranch: PropTypes.string,
		amount: PropTypes.number,
		fee: PropTypes.number,
		bankFee: PropTypes.number,
		confirmAmount: PropTypes.number,
		unConfirmAmount: PropTypes.number,
		applyAt: PropTypes.string,
		confirmAt: PropTypes.string,
		status: PropTypes.string,
		remark: PropTypes.string,
		administrator: PropTypes.string,
		iconFileList: PropTypes.array,
	})),
};
const initialState = {
	isDetailsModalVisible: false,
	selectedData: {},
};

class PayCompanyTab extends Component {
	constructor() {
		super();
		this.state = {
			blackList:[],
			dataSource: [],
			...initialState,
		};

		this._handleClickSearch = this._handleClickSearch.bind(this);
		this._handleClickReset = this._handleClickReset.bind(this);
		this._handleClickDetails = this._handleClickDetails.bind(this);
		this._handleCancel = this._handleCancel.bind(this);
	}

	_handleClickSearch() {
		const form = this.formInstance.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				// Send search api
			}
		});
	}
	_handleClickReset() {
		const form = this.formInstance.getForm();

		form.resetFields();
	}
	_handleClickDetails(selectedData) {
		this.setState({
			isDetailsModalVisible: true,
			selectedData,
		});
	}
	_handleCancel() {
		this.setState(initialState);
	}

	render() {
		const {
			dataSource,
			isDetailsModalVisible,
			selectedData,
		} = this.state;
		const {
			_handleClickSearch,
			_handleClickReset,
			_handleClickDetails,
			_handleCancel,
		} = this;

		return (
			<React.Fragment>
				<Form
					ref={formRef => this.formInstance = formRef}
					submitText="查询"
					cancelText="重置"
					onSubmit={_handleClickSearch}
					onCancel={_handleClickReset}
				>
					<div style={{ display: 'flex', justifyContent: 'space-between', }}>
						<FormItem
							itemName="cardId"
							label="銀行卡号"
						>
							<Input
								style={{ width: '264px', }}
								placeholder="请输入銀行卡号"
							/>
						</FormItem>
						<FormItem
							itemName="bindedAt"
							label="下注时间"
						>
							<DateRangePicker style={{ width: '264px', }}/>
						</FormItem>
						<FormItem
							itemName="status"
							label="状态"
						>
							<Select
								style={{ width: '264px', }}
								// TODO get options
								options={[]}
								placeholder="请选择状态"
							/>
						</FormItem>
					</div>
				</Form>
				<PayCompanyTable
					dataSource={dataSource}
					onClickDetails={_handleClickDetails}
					isDepositOperationDisabled
					hasPagination
				/>
				<PayCompanyDetailsModal
					isVisible={isDetailsModalVisible}
					selectedData={selectedData}
					onClickCancel={_handleCancel}
				/>
			</React.Fragment>
		);
	}
	componentDidMount() {
		// TODO fetch data
		this.setState({
			dataSource: fakeData,
		});
	}
}

PayCompanyTab.propTypes = propTypes;

export default PayCompanyTab;

const imageFile =  {
	uid: 'pic4',
	name: 'pic4',
	thumbUrl: 'https://picsum.photos/id/133/50/40'
};
const fakeData = [{
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
	iconFileList: [imageFile]
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
	iconFileList: [imageFile]
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
	iconFileList: [imageFile]
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
	iconFileList: [imageFile]
}];
