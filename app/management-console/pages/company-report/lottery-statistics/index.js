import React, { Component } from 'react';
import PageBlock from "../../../components/page-block";
import { DatePicker, Row, Col, Form ,FormItem, Select, Table } from 'ljit-react-components';
import "./style.styl";

// TODO get search result
const gameData = [
	"连环夺宝", "重庆时时彩", "江西时时彩", "新疆时时彩", "天京时时彩", "云南时时彩", "北京PK10", "三分彩", "分分11选5", "时时11选5", "東京11.5彩", "江苏1.5分彩"
];
const resultData = gameData.map((game, i) => {
	return {
		key: i,
		lotteryType: game,
		bettingPeople: 0,
		bettingNumber: 0,
		bet: 0,
		prize: 0,
		turnPoint: 0,
		profit: 0,
		RTP: 0,
	};
});

class CompanyReportLotteryStatisticsPage extends Component {
	constructor(prop) {
		super(prop);
		this.state = {
			isShowSearchResults: false,
		};

		this._handleFormChange = this._handleFormChange.bind(this);
		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleReset = this._handleReset.bind(this);
		this._renderSearchResults = this._renderSearchResults.bind(this);
	}

	_handleFormChange() {
		const { validateFields } = this.refForm;

		validateFields((error, values) => {});
	}
	_handleSubmit(event) {
		event.preventDefault();
		const { validateFieldsAndScroll } = this.refForm.getForm();

		validateFieldsAndScroll((error, values) => {
			if (!error) {
				// TODO fetch search result
				this.setState({
					isShowSearchResults: true,
				});
			}
		});
	}
	_handleReset() {
		const { resetFields } = this.refForm;

		resetFields();
		this.setState({
			isShowSearchResults: false,
		});
	}
	_renderSearchResults() {
		const columns = [
			{
				title: '彩种',
				dataIndex: 'lotteryType',
			},{
				title: '投注人数',
				dataIndex: 'bettingPeople',
			},{
				title: '投注单数',
				dataIndex: 'bettingNumber',
			},{
				title: '投注',
				dataIndex: 'bet',
			},{
				title: '奖金',
				dataIndex: 'prize',
			},{
				title: '返点',
				dataIndex: 'turnPoint',
			},{
				title: '盈亏',
				dataIndex: 'profit',
			},{
				title: 'RTP',
				dataIndex: 'RTP',
			},
		];

		return (
			<Table dataSource={resultData} columns={columns} pagination={false}/>
		);
	}

	render() {
		const { isShowSearchResults } = this.state;
		const {
			_handleFormChange,
			_handleSubmit,
			_handleReset,
			_renderSearchResults,
		} = this;

		let searchResults = null;

		if (isShowSearchResults) {
			searchResults = _renderSearchResults();
		}

		return (
			<div className="lottery-statistics">
				<PageBlock noMinHeight={true}>
					<Form
						ref={(refForm) => this.refForm = refForm }
						submitText={"查询"}
						cancelText={"重置"}
						onSubmit={_handleSubmit}
						onChange={_handleFormChange}
						onCancel={_handleReset}
					>
						<Row gutter={24}>
							<Col span={8}>
								<FormItem
									label={"游戏类型"}
									columnType={FormItem.ColumnTypeEnums.MEDIUM}
									itemName={"gameType"}
								>
									<Select
										style={{ width: "100%" }}
										// TODO add options
										options={[{ label: "彩票", value: "彩票" }]}
									/>
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem
									label={"游戏时间"}
									columnType={FormItem.ColumnTypeEnums.MEDIUM}
									itemName={"gameTime"}
								>
									<DatePicker
										style={{ width: "100%" }}
									/>
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem
									label={"代理帐号"}
									columnType={FormItem.ColumnTypeEnums.MEDIUM}
									itemName={"proxyAccount"}
								>
									<Select
										style={{ width: "100%" }}
										// TODO add options
										placeholder={"请选择"}
									/>
								</FormItem>
							</Col>
						</Row>
					</Form>
					{searchResults}
				</PageBlock>
			</div>
		);
	}
}

export default CompanyReportLotteryStatisticsPage;
