import React, { Component } from 'react';
import PageBlock from "../../../components/page-block";
import {
	Form,
	FormItem,
	RadioGroup,
	Card,
	Statistic,
	Select,
	Table,
	DateRangePicker,
	Button,
	Icon,
	DecimalNumber,
} from 'ljit-react-components';
import "./style.styl";

const { LARGE, } = Statistic.SizeTypeEnums;

// TODO get search result
const fakeData = [
	{
		key: 1,
		orderNumber: 22304601234,
		member: "mzc003",
		amount: 1000000,
		handlingFees: 0,
		depositMethod: "在线存款",
		depositValue: 1,
		name: "中国银行",
		nameValue: 1,
		operationTime: "2019/03/07 12:13:21",
		operator: "admin",
		remark: "0980",
	},{
		key: 2,
		orderNumber: 22304601234,
		member: "52",
		amount: 30,
		handlingFees: 10,
		depositMethod: "支付平台",
		depositValue: 2,
		name: "支付宝",
		nameValue: 1,
		operationTime: "2019/03/07 12:13:22",
		operator: "admin",
		remark: "3724",
	},{
		key: 3,
		orderNumber: 22304601234,
		member: "52",
		amount: 30,
		handlingFees: 10,
		depositMethod: "支付平台",
		depositValue: 2,
		name: "余额宝",
		nameValue: 2,
		operationTime: "2019/03/07 12:13:22",
		operator: "admin",
		remark: "3724",
	},{
		key: 4,
		orderNumber: 22304601234,
		member: "mzc003",
		amount: 1000000,
		handlingFees: 0,
		depositMethod: "在线存款",
		depositValue: 1,
		name: "人民银行",
		nameValue: 2,
		operationTime: "2019/03/07 12:13:21",
		operator: "admin",
		remark: "0980",
	},
];

const TOTAL = 0;
const ONLINE_DEPOSIT = 1;
const PAYMENT_PLATFORM = 2;
const TitleMap = {
	[TOTAL]: "总计",
	[ONLINE_DEPOSIT]: "在线存款",
	[PAYMENT_PLATFORM]: "支付平台存款"
};

class CompanyReportCashFlowCountPage extends Component {
	constructor(prop) {
		super(prop);
		this.state = {
			isShowSearchResults: false,
			selectorValue: 0,
			resultType: TOTAL,
			resultData: null,
			resultCount: null,
			resultTitle: null,
		};

		this._handleOnClickSubmit = this._handleOnClickSubmit.bind(this);
		this._handleFormChange = this._handleFormChange.bind(this);
		this._handleOnSelectorChange = this._handleOnSelectorChange.bind(this);
		this._renderCards = this._renderCards.bind(this);
		this._renderSearchResults = this._renderSearchResults.bind(this);
		this._renderSelector = this._renderSelector.bind(this);
	}

	_handleOnClickSubmit(e) {
		e.preventDefault();
		const { validateFieldsAndScroll } = this.refForm;

		validateFieldsAndScroll((err, values) => {
			if (!err) {
				// TODO fetch search result
				let resultData = fakeData;
				let totalTimes = 0;
				let totalAmount = 0;
				let totalHandlingFees = 0;
				const { type } = values;
				const resultTitle = TitleMap[type];

				if (type === ONLINE_DEPOSIT) {
					resultData = fakeData.filter(item => {
						return item.depositValue === ONLINE_DEPOSIT;
					});
				} else if (type === PAYMENT_PLATFORM) {
					resultData = fakeData.filter(item => {
						return item.depositValue === PAYMENT_PLATFORM;
					});
				}

				resultData.forEach(item => {
					totalAmount += item.amount;
					totalHandlingFees += item.handlingFees;
				});
				totalTimes = resultData.length;

				this.setState({
					isShowSearchResults: true,
					selectorValue: 0,
					resultType: type,
					resultTitle,
					resultData,
					resultCount:{
						totalAmount,
						totalTimes,
						totalHandlingFees
					}
				});
			}
		});
	}
	_handleOnSelectorChange(value) {
		this.setState({
			selectorValue: value,
		});
	}
	_handleFormChange() {
		const { validateFields } = this.refForm;

		validateFields((err, values) => {});
	}
	_renderCards() {
		// TODO get value
		const { resultType, resultCount } = this.state;
		const { totalHandlingFees, totalTimes, totalAmount } =resultCount;
		// TODO change correct Icon
		const moneyIcon = (
			<Icon type="pay-circle"/>
		);
		const walletIcon = (
			<Icon type="wallet"/>
		);

		let feeCard = null;

		if (resultType !== TOTAL) {
			feeCard = (
				<Card>
					<Statistic
						title={"手续费"}
						value={totalHandlingFees}
						prefix={moneyIcon}
						sizeType={LARGE}
					/>
				</Card>
			);
		}

		return (
			<div className="cashflow-count-result__cards">
				<Card>
					<Statistic
						title={"总次數"}
						value={totalTimes}
						prefix={walletIcon}
						sizeType={LARGE}
					/>
				</Card>
				<Card>
					<Statistic
						title={"总金额"}
						value={totalAmount}
						prefix={moneyIcon}
						sizeType={LARGE}
					/>
				</Card>
				{feeCard}
			</div>
		);
	}
	_renderSelector() {
		const { _handleOnSelectorChange, } = this;
		const { resultType, selectorValue } = this.state;

		// TODO get options
		const optionBanks = [
			{ label: "全部", value: 0 },
			{ label: "中国银行", value: 1 },
			{ label: "人民银行", value: 2 },
			{ label: "花旗银行", value: 3 },
		];
		const optionsPlateForms = [
			{ label: "全部", value: 0 },
			{ label: "支付宝", value: 1 },
			{ label: "余额宝", value: 2 },
		];

		return (
			<Select
				value={selectorValue}
				className="cashflow-count-result__selector"
				options={resultType === ONLINE_DEPOSIT ? optionBanks : optionsPlateForms}
				onChange={_handleOnSelectorChange}
				placeholder={"请选择"}
			/>
		);
	}

	_renderSearchResults() {
		const { _renderCards, _renderSelector } = this;
		const {
			selectorValue,
			resultType,
			resultData,
			resultTitle
		} = this.state;
		const columns = [
			{
				title: '订单号',
				dataIndex: 'orderNumber',
			},{
				title: '会员',
				dataIndex: 'member',
			},{
				title: '金额',
				dataIndex: 'amount',
				render: (amount) => <DecimalNumber data={amount} hasSeparator/>,
			},{
				title: '手续费',
				dataIndex: 'handlingFees',
				render: (handlingFees) => <DecimalNumber data={handlingFees} hasSeparator/>,
			},{
				title: '存款方式',
				dataIndex: 'depositMethod',
			},{
				title: '名称',
				dataIndex: 'name',
				filteredValue: selectorValue ? [selectorValue] : null,
				onFilter: (value, record) => record.nameValue === value
			},{
				title: '操作时间',
				dataIndex: 'operationTime',
			},{
				title: '操作者',
				dataIndex: 'operator',
			},{
				title: '备注',
				dataIndex: 'remark',
			},
		];

		let selector = null;

		if (resultType !== TOTAL) {
			selector = _renderSelector();
		}

		return (
			<PageBlock className="cashflow-count-result">
				<div className="cashflow-count-result__header">
					<PageBlock.Title text={resultTitle}/>
					{selector}
				</div>
				{_renderCards()}
				<Table
					dataSource={resultData}
					columns={columns}
				/>
			</PageBlock>
		);
	}

	render() {
		const {
			_handleOnClickSubmit,
			_renderSearchResults,
			_handleFormChange
		} = this;
		const { isShowSearchResults } = this.state;
		const radioGroupOptions = [
			{ label: TitleMap[TOTAL], value: TOTAL, },
			{ label: TitleMap[ONLINE_DEPOSIT], value: ONLINE_DEPOSIT },
			{ label: TitleMap[PAYMENT_PLATFORM], value: PAYMENT_PLATFORM },
		];

		let searchReaults = null;

		if (isShowSearchResults) {
			searchReaults = _renderSearchResults();
		}

		return (
			<div className="cashflow-count">
				<PageBlock noMinHeight={true}>
					<Form
						onSubmit={_handleOnClickSubmit}
						onChange={_handleFormChange}
						ref={(refForm) => this.refForm = refForm }
						submitButtonDisabled
						cancelButtonDisabled
					>
						<div className="cashflow-count__formitem-inline">
							<FormItem
								label={"時間"}
								itemName={'date'}
								columnType={FormItem.ColumnTypeEnums.SMALL}
							>
								<DateRangePicker
									inputStyle={{ width: 264 }}
								/>
							</FormItem>
							<FormItem
								itemName={'submit'}
							>
								<Button
									color={Button.ColorEnums.BRIGHTBLUE500}
									onClick={_handleOnClickSubmit}
									style={{ marginLeft: 20 }}
								>
									查询
								</Button>
							</FormItem>
						</div>
						<div>
							<FormItem
								itemName={'type'}
								itemConfig={{ initialValue: 0 }}
							>
								<RadioGroup
									options={radioGroupOptions}
								/>
							</FormItem>
						</div>
					</Form>
				</PageBlock>
				{searchReaults}
			</div>
		);
	}
}

export default CompanyReportCashFlowCountPage;
