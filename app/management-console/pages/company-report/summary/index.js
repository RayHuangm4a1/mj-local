import React, { Component } from 'react';
import PageBlock from "../../../components/page-block";
import TwoColumnsList from '../../../components/two-columns-list';
import {
	Form,
	FormItem,
	Card,
	Statistic,
	Table,
	Select,
	Button,
	DateRangePicker,
	Row,
	Col,
	Icon
} from 'ljit-react-components';
import "./style.styl";

const { LARGE, } = Statistic.SizeTypeEnums;

// TODO get correct options
const options = [
	{ label: "VRGAME", value: "VRGAME" },
	{ label: "AG", value: "AG" },
	{ label: "SA", value: "SA" },
	{ label: "EBET", value: "EBET" },
	{ label: "PT", value: "PT" },
	{ label: "UG", value: "UG" },
	{ label: "KY", value: "KY" },
	{ label: "GAMMA", value: "GAMMA" },
	{ label: "AS", value: "AS" },
	{ label: "BIO", value: "BIO" },
	{ label: "GD", value: "GD" },
	{ label: "CQ9", value: "CQ9" },
	{ label: "VR", value: "VR" },
];
const fakeCountData = {
	yesterdaySystemBalance: Math.random()*100000 **2,
	todaySystemBalance: Math.random()*100000 **2 ,
	totalSystemBalance: Math.random()*100000 **2 ,
};
const fakeCardData = {
	totalBet: Math.round(Math.random()*10000000) + 0.123,
	totalReward: Math.round(Math.random()*10000000) + 0.321,
	totalTurnPoint: Math.round(Math.random()*10000000) + 0.321,
	totalActivity: Math.round(Math.random()*1000),
	totalCashAccount: Math.round(Math.random()*100000) + 0.123,
	totalReportAccount: Math.round(Math.random()*100000) + 0.153,
	AccountDeleteAmount: 0,
	totalBonus: 0
};
const fakeListdata = [
	{ accountName: "人工充值", amount: Math.round(Math.random()*10000000) },
	{ accountName: "人工充值(其它)", amount: Math.round(Math.random()*10000000) },
	{ accountName: "一般提款", amount: Math.round(Math.random()*10000), },
	{ accountName: "第三方提款", amount: Math.round(Math.random()*10000), },
	{ accountName: "人工提款", amount: Math.round(Math.random()*10000), },
	{ accountName: "人工提款(其它)", amount: Math.round(Math.random()*10000), },
	{ accountName: "新增人数", amount: Math.round(Math.random()*10000), },
	{ accountName: "下注人数", amount: Math.round(Math.random()*10000), },
	{ accountName: "下注人数(彩票+外接)", amount: Math.round(Math.random()*10000), },
	{ accountName: "存款笔数", amount: Math.round(Math.random()*10000), },
	{ accountName: "出款笔数", amount: Math.round(Math.random()*10000), },
	{ accountName: "网银汇款", amount: Math.round(Math.random()*10000), },
	{ accountName: "在线充值", amount: Math.round(Math.random()*10000), },
	{ accountName: "充值手续费", amount: Math.round(Math.random()*10000), },
	{ accountName: "支付宝充值", amount: Math.round(Math.random()*10000), },
	{ accountName: "支付宝充值", amount: Math.round(Math.random()*10000), },
	{ accountName: "个人微信", amount: Math.round(Math.random()*10000), },
	{ accountName: "总转入", amount: Math.round(Math.random()*10000), },
	{ accountName: "总转出", amount: Math.round(Math.random()*10000), },
	{ accountName: "外接游戏其他活动", amount: Math.round(Math.random()*10000), },
	{ accountName: "外接游戏总盈亏", amount: Math.round(Math.random()*10000), },
];
const fakeTableData = [{
	key: 1,
	bettingPeople: Math.round(Math.random()*100),
	totalBet: Math.round(Math.random()*10000),
	totalProfit: Math.round(Math.random()*100000),
	totalActivity: Math.round(Math.random()*1000),
	ownerTotalBet: Math.round(Math.random()*1000),
	userTotalBet: Math.round(Math.random()*1000),
	totalReward: Math.round(Math.random()*1000),
	totalLost: Math.round(Math.random()*1000),
	totalTurnPoint: Math.round(Math.random()*100000),
	bettingAmount: Math.round(Math.random()*1000000),
	chaseingAmount: Math.round(Math.random()*10000),
	onBettingAmount: Math.round(Math.random()*1000)
}];

class CompanyReportSummaryPage extends Component {
	constructor(prop) {
		super(prop);
		this.state = {
			isShowSearchResults: false,
			selectorValue: options[0].value,
		};

		this._handleOnClickSubmit = this._handleOnClickSubmit.bind(this);
		this._handleOnClickReset = this._handleOnClickReset.bind(this);
		this._handleOnSelectorChange = this._handleOnSelectorChange.bind(this);
		this._renderSearchForm = this._renderSearchForm.bind(this);
		this._renderSummaryAmount = this._renderSummaryAmount.bind(this);
		this._renderCards = this._renderCards.bind(this);
		this._renderList = this._renderList.bind(this);
		this._renderTable = this._renderTable.bind(this);
		this._renderSearchResults = this._renderSearchResults.bind(this);
	}

	_handleOnClickSubmit(e) {
		e.preventDefault();
		const { validateFieldsAndScroll } = this.refForm;

		validateFieldsAndScroll((err, values) => {
			if (!err) {
				// TODO fetch search result
				this.setState({
					isShowSearchResults: true,
				});
			}
		});
	}
	_handleOnClickReset() {
		const { resetFields } = this.refForm;

		resetFields();
		this.setState({
			isShowSearchResults: false,
			selectorValue: options[0].value,
		});
	}
	_handleOnSelectorChange(value) {
		// TODO fetch select data
		this.setState({
			selectorValue: value,
		});
	}
	_renderSearchForm() {
		const { _handleOnClickSubmit, _handleOnClickReset, } = this;

		return (
			<PageBlock className="company-report-summary__search-form" noMinHeight>
				<Form
					ref={(refForm) => this.refForm = refForm }
					cancelButtonDisabled={true}
					submitButtonDisabled={true}
				>
					<Row gutter={24}>
						<Col span={8}>
							<FormItem
								label={"日期"}
								columnType={FormItem.ColumnTypeEnums.MEDIUM}
								itemName={"date"}
							>
								<DateRangePicker
									placeholder={["开始日期", "结束日期"]}
								/>
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem
								columnType={FormItem.ColumnTypeEnums.MEDIUM}
								itemName={"button"}
							>
								<React.Fragment>
									<Button
										onClick={_handleOnClickSubmit}
										color={Button.ColorEnums.BRIGHTBLUE500}
									>
										查询
									</Button>
									<Button
										style={{ marginLeft: 16 }}
										outline={Button.OutlineEnums.HOLLOW}
										onClick={_handleOnClickReset}
									>
										重置
									</Button>
								</React.Fragment>
							</FormItem>
						</Col>
					</Row>
				</Form>
			</PageBlock>
		);
	}
	_renderSummaryAmount() {
		// TODO get correct data
		const { yesterdaySystemBalance, todaySystemBalance, totalSystemBalance, } = fakeCountData;

		return (
			<PageBlock noMinHeight className="company-report-summary__system-profit">
				<Statistic
					title="昨日系统余额"
					value={yesterdaySystemBalance}
					precision={3}
				/>
				<span className="company-report-summary__system-profit-symbol">-</span>
				<Statistic
					title="今日系统余额"
					value={todaySystemBalance}
					precision={3}
				/>
				<span className="company-report-summary__system-profit-symbol">=</span>
				<Statistic
					title="系统余额增减"
					value={totalSystemBalance}
					precision={3}
				/>
			</PageBlock>
		);
	}
	_renderCards() {
		// TODO get correct data
		const {
			totalBet,
			totalReward,
			totalTurnPoint,
			totalActivity,
			totalCashAccount,
			totalReportAccount,
			AccountDeleteAmount,
			totalBonus,
		} = fakeCardData;
		const moneyIcon = (
			<Icon type="pay-circle"/>
		);
		const backPointIcon = (
			<Icon type="crown"/>
		);
		const diceIcon = (
			<Icon type="appstore"/>
		);
		const notificationIcon = (
			<Icon type="notification"/>
		);
		const bonusIcon = (
			<Icon type="gift"/>
		);

		return (
			<div className="company-report-summary__cards">
				{/* TODO get correct value  */}
				<Card>
					<Statistic
						title={"总投注量"}
						value={totalBet}
						prefix={diceIcon}
						sizeType={LARGE}
					/>
				</Card>
				<Card>
					<Statistic
						title={"总奖金"}
						value={totalReward}
						prefix={moneyIcon}
						sizeType={LARGE}
					/>
				</Card>
				<Card>
					<Statistic
						title={"总返点"}
						value={totalTurnPoint}
						prefix={backPointIcon}
						sizeType={LARGE}
					/>
				</Card>
				<Card>
					<Statistic
						title={"总活动"}
						value={totalActivity}
						prefix={notificationIcon}
						sizeType={LARGE}
					/>
				</Card>
				<Card>
					<Statistic
						title={"现金帐"}
						value={totalCashAccount}
						prefix={moneyIcon}
						sizeType={LARGE}
					/>
				</Card>
				<Card>
					<Statistic
						title={"报表帐"}
						value={totalReportAccount}
						prefix={moneyIcon}
						sizeType={LARGE}
					/>
				</Card>
				<Card>
					<Statistic
						title={"帐号删除金额"}
						value={AccountDeleteAmount}
						prefix={moneyIcon}
						sizeType={LARGE}
					/>
				</Card>
				<Card>
					<Statistic
						title={"总紅利"}
						value={totalBonus}
						prefix={bonusIcon}
						sizeType={LARGE}
					/>
				</Card>
			</div>
		);
	}
	_renderList() {
		// TODO get correct list Data

		return (
			<PageBlock>
				<Row gutter={32}>
					<TwoColumnsList
						data={fakeListdata}
						titleKey="accountName"
						contentKey="amount"
					/>
				</Row>
			</PageBlock>
		);
	}
	_renderTable() {
		const { _handleOnSelectorChange } = this;
		const { selectorValue } = this.state;
		const columns = generateTableColumns(selectorValue);

		return (
			<PageBlock>
				<div className="company-report-summary__table-header">
					<PageBlock.Title text={"单一帐目汇总"}/>
					<Select
						value={selectorValue}
						options={options}
						style={{ width: 180 }}
						onChange={_handleOnSelectorChange}
						placeholder={"请选择"}
					/>
				</div>
				<Table dataSource={fakeTableData} columns={columns} pagination={false}/>
			</PageBlock>
		);
	}
	_renderSearchResults() {
		const {
			_renderSummaryAmount,
			_renderCards,
			_renderList,
			_renderTable
		} = this;

		return (
			<React.Fragment>
				{_renderSummaryAmount()}
				{_renderCards()}
				{_renderList()}
				{_renderTable()}
			</React.Fragment>
		);
	}

	render() {
		const { _renderSearchForm, _renderSearchResults } = this;
		const { isShowSearchResults } = this.state;

		let searchReaults = null;

		if (isShowSearchResults) {
			searchReaults = _renderSearchResults();
		}

		return (
			<div className="company-report-summary">
				{_renderSearchForm()}
				{searchReaults}
			</div>
		);
	}
}

export default CompanyReportSummaryPage;

function generateTableColumns(game) {
	let column;
	const NormalItems = [
		{ title: `${game}下注人数`, dataIndex: "bettingPeople" },
		{ title: `${game}总投注量`, dataIndex: "totalBet" },
		{ title: `${game}总盈亏`, dataIndex: "totalProfit" },
		{ title: `${game}总活动`, dataIndex: "totalActivity" },
	];
	const VRItems = [
		{ title: `${game}下注人数`, dataIndex: "bettingPeople" },
		{ title: `${game}总投注量`, dataIndex: "totalBet" },
		{ title: `${game}商户总奖金`, dataIndex: "ownerTotalBet" },
		{ title: `${game}用户总奖金`, dataIndex: "userTotalBet" },
		{ title: `${game}总打赏`, dataIndex: "totalReward" },
		{ title: `${game}总重颁亏损`, dataIndex: "totalLost" },
		{ title: `${game}总返点`, dataIndex: "totalTurnPoint" },
		{ title: `${game}投注中金额`, dataIndex: "bettingAmount" },
		{ title: `${game}追号中金额`, dataIndex: "chaseingAmount" },
	];

	column = NormalItems;
	if (game === "VR") {
		column = VRItems;
	}
	if (game === "UG") {
		column.push({
			title: "进行中投注金额",
			dataIndex: "onBettingAmount"
		});
	}

	return column;
}
