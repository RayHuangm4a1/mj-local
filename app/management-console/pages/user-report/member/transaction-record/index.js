import React, { Component, Fragment, } from 'react';
import moment from 'moment';
import {
	Table,
	Modal,
	LabelContent,
	Row,
	Col,
	InputTextarea,
	DecimalNumber,
} from 'ljit-react-components';
import PageBlock from '../../../../components/page-block';
import PageModal from '../../../../components/page-modal';
import SearchForm from './search-form';
import './style.styl';

const propTypes = {};

const defaultProps = {};

function getStatusText(status) {
	switch (status) {
		case 'win':
			return '中獎';
		case 'lose':
			return '未中獎';
		case 'remove':
			return '已撤單';
		case 'pending':
			return '未開獎';
		default:
			return '';
	}
}

function getInfo(record, info, key) {
	switch (info) {
		case '帐号':
			return <p key={key}>帐号： {record.account}</p>;
		case '期号':
			return <p key={key}>期号： {record.term}</p>;
		case '下注时间':
			return <p key={key}>下注时间： {record.time}</p>;
		case '彩种':
			return <p key={key}>彩种： {record.lotteryClass}</p>;
		case '狀態':
			return <p key={key}>狀態： {getStatusText(record.status)}</p>;
		case '一倍奖金':
			return <p key={key}>一倍奖金： {record.bonus}</p>;
		case '销售返点':
			return <p key={key}>销售返点： {record.rebate}</p>;
		case 'IP':
			return <p key={key}>IP： {record.ip}</p>;
		case '盈亏':
			return <p key={key}>盈亏： {record.surplus}</p>;
		case '在线入款':
			return <p key={key}>在线入款： {record.onlineDeposit}</p>;
		case '第三方支付入款':
			return <p key={key}>第三方支付入款： {record.thirdDeposit}</p>;
		case '层级':
			return <p key={key}>层级： {record.level}</p>;
		case '手续费':
			return <p key={key}>手续费：$ {record.fee}</p>;
		case '附言':
			return <p key={key}>附言： {record.postscript}</p>;
		case '申请日期':
			return <p key={key}>申请日期： {record.applyDate}</p>;
		case '确认日期':
			return <p key={key}>确认日期： {record.confirmDate}</p>;
		case '银行卡号':
			return <p key={key}>银行卡号： {record.cardId}</p>;
		case '出款方式':
			return <p key={key}>出款方式： {record.withdrawal}</p>;
		case '已达投注量':
			return <p key={key}>已达投注量：＄ {record.arrive}</p>;
		case '须达投注量':
			return <p key={key}>须达投注量：＄ {record.need}</p>;
		case '追号总期数':
			return <p key={key}>追号总期数： {record.traceTerms}</p>;
		case '追号编号':
			return <p key={key}>追号编号： {record.traceTermId}</p>;
		case '已追期数':
			return <p key={key}>已追期数： {record.hasTrace}</p>;
		case '完成金额':
			return <p key={key}>完成金额： {record.applyGold}</p>;
		case '已取消期数':
			return <p key={key}>已取消期数： {record.cancelTerms}</p>;
		case '取消金额':
			return <p key={key}>取消金额： {record.cancelGold}</p>;
		case '备注':
			return <p key={key}>备注： {record.note}</p>;
		case '玩法':
			return <p key={key}>玩法： {record.play}</p>;
		case '位置':
			return <p key={key}>位置： {record.pos}</p>;
		case '开奖号码':
			return <p key={key}>开奖号码： {record.result}</p>;
		case '單注金額':
			return <p key={key}>單注金額： {record.single}</p>;
		case '投注总额':
			return <p key={key}>投注总额： {record.total}</p>;
		case '投注注数':
			return <p key={key}>投注注数： {record.times}</p>;
		case '中獎金額':
			return <p key={key}>中獎金額： {record.prize}</p>;
		case '倍數模式':
			return <p key={key}>倍數模式： {record.multiple}</p>;
		case '转帐帐号':
			return <p key={key}>转帐帐号：{record.bankAccount}</p>;
		case '谷歌验证':
			return <p key={key}>谷歌验证： {record.googleAuth}</p>;
		case '异地登陆校验':
			return <p key={key}>异地登陆校验： {record.remote}</p>;
		case '最后登录时间':
			return <p key={key}>最后登录时间： {record.lastLogin}</p>;
		case '操作者':
			return <p key={key}>操作者： {record.operator}</p>;
		case '投注号码':
			return (
				<Fragment key={key}>
					<p>投注号码：</p>
					<InputTextarea minRows={4} value={record.devote.join(',')} disabled></InputTextarea>
				</Fragment>
			);
		case '客服备注':
			return (
				<Fragment key={key}>
					<p>客服备注：</p>
					<InputTextarea value={record.customer} disabled></InputTextarea>
				</Fragment>
			);
		case '客服备注-大':
			return (
				<div key={key}>
					<p>客服备注：</p>
					<InputTextarea value={record.customer} minRows={7} disabled></InputTextarea>
				</div>
			);
		case '财务备注':
			return (
				<div key={key}>
					<p>财务备注：</p>
					<InputTextarea value={record.finance} disabled></InputTextarea>
				</div>
			);
		case '财务备注-大':
			return (
				<Fragment key={key}>
					<p>财务备注：</p>
					<InputTextarea value={record.finance} minRows={7} disabled></InputTextarea>
				</Fragment>
			);
	}
}

function getTableConfig(type = '') {
	const defaultExpendRow = {
		colLeft: ['帐号','期号','下注时间','彩种','狀態','一倍奖金','销售返点','IP','盈亏'],
		colMiddle: ['玩法','位置','开奖号码','單注金額','投注总额','投注注数','中獎金額','倍數模式'],
		colRight: ['投注号码','客服备注','财务备注'],
	};

	switch (type) {
		case '活动':
		case '红利':
		case '转入':
		case '转出':
			return {
				columnConfig: {
					hasOperation: false,
				},
			};
		case '返点':
		case '投注':
			return {
				columnConfig: {
					hasOperation: true,
				},
				expandConfig: defaultExpendRow,
			};
		case '充值':
			return {
				columnConfig: {
					hasOperation: false,
				},
				expandConfig: {
					colLeft: ['在线入款','第三方支付入款','层级','手续费','附言','申请日期','确认日期'],
					colMiddle: ['转帐帐号','谷歌验证','异地登陆校验','最后登录时间','操作者'],
					colRight: [],
				},
			};
		case '提款':
			return {
				columnConfig: {
					hasOperation: false,
				},
				expandConfig: {
					colLeft: ['银行卡号','出款方式','层级','手续费','已达投注量','须达投注量','确认日期'],
					colMiddle: ['客服备注-大'],
					colRight: ['财务备注-大'],
				},
			};
		case '中奖':
			return {
				columnConfig: {
					hasOperation: true,
				},
				expandConfig: defaultExpendRow,
			};
		case '撤单':
			return {
				columnConfig: {
					hasOperation: true,
				},
				expandConfig: {
					colLeft: ['追号总期数','追号编号','已追期数','完成金额','已取消期数','取消金额','销售返点','一倍奖金','备注'],
					colMiddle: ['彩种','玩法','开奖号码','單注金額','投注总额','投注注数','中獎金額','倍數模式','位置'],
					colRight: ['投注号码','客服备注','财务备注'],
				},
			};
		default:
			return {
				columnConfig: {
					hasOperation: true,
				},
				expandConfig: defaultExpendRow,
			};
	}
}


class UserReportMemberTransactionRecordPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			current: [],
			isPromptVisible: false,
			isCustomerVisible: false,
			isFinanceVisible: false,
			betting: {},
			textArea: '',
			type: '',
		};

		this._handleSearch = this._handleSearch.bind(this);
		this._handleReset = this._handleReset.bind(this);
		this._handleClickDiscardBetting = this._handleClickDiscardBetting.bind(this);
		this._handleRemoveSubmit = this._handleRemoveSubmit.bind(this);
		this._handleRemoveCancel = this._handleRemoveCancel.bind(this);
		this._handleCustomer = this._handleCustomer.bind(this);
		this._handleCustomerSubmit = this._handleCustomerSubmit.bind(this);
		this._handleCustomerCancel = this._handleCustomerCancel.bind(this);
		this._handleFinance = this._handleFinance.bind(this);
		this._handleFinanceSubmit = this._handleFinanceSubmit.bind(this);
		this._handleFinanceCancel = this._handleFinanceCancel.bind(this);
		this._handleTextArea = this._handleTextArea.bind(this);
		this._getTableColumns = this._getTableColumns.bind(this);
		this._renderExpandRow = this._renderExpandRow.bind(this);
		this._renderTable = this._renderTable.bind(this);
	}

	_handleSearch(form) {
		form.validateFields((err, values) => {
			//TODO call api then update
		});

		const { type, } = form.getFieldsValue();

		this.setState({
			type,
			current: change, //fake data update
		});
	}

	_handleReset(form) {
		form.resetFields();
	}

	_handleClickDiscardBetting(record) {
		this.setState({
			betting: record,
			isPromptVisible: true,
		});
	}

	_handleRemoveSubmit() {
		const { current, betting, } = this.state;
		const index = current.findIndex((item) => item.key === betting.key);
		const newData = current;

		newData.splice(index, 1);
		this.setState({
			current: newData,
			isPromptVisible: false,
		});
	}

	_handleRemoveCancel() {
		this.setState({
			isPromptVisible: false,
		});
	}

	_handleCustomer(record) {
		this.setState({
			betting: record,
			textArea: record.customer,
			isCustomerVisible: true,
		});
	}

	_handleCustomerSubmit() {
		const { current, betting, textArea } = this.state;
		const index = current.findIndex(item => item.key === betting.key);
		const newData = current;

		newData.splice(index, 1, Object.assign({}, betting, { customer: textArea }));
		this.setState({
			current: newData,
			isCustomerVisible: false,
		});
	}

	_handleCustomerCancel() {
		this.setState({
			isCustomerVisible: false,
		});
	}

	_handleFinance(record) {
		this.setState({
			betting: record,
			textArea: record.finance,
			isFinanceVisible: true,
		});
	}

	_handleFinanceSubmit() {
		const { current, betting, textArea, } = this.state;
		const index = current.findIndex(item => item.key === betting.key);
		const newData = current;

		newData.splice(index, 1, Object.assign({}, betting, { finance: textArea }));
		this.setState({
			current: newData,
			isFinanceVisible: false,
		});
	}

	_handleFinanceCancel() {
		this.setState({
			isFinanceVisible: false,
		});
	}

	_handleTextArea(e) {
		this.setState({
			textArea: e.target.value,
		});
	}

	_getTableColumns(hasOperation) {
		const columns = [{
			title: '用户名',
			dataIndex: 'account',
			key: 'account',
		},{
			title: '类别',
			dataIndex: 'type',
			key: 'type',
		},{
			title: '时间',
			dataIndex: 'time',
			key: 'time',
			sorter: (prev, next) =>  moment(prev.time, "YYYY-MM-DD HH:mm:ss").diff(moment(next.time, "YYYY-MM-DD HH:mm:ss")),
		},{
			title: '变动金额',
			dataIndex: 'change',
			key: 'change',
			sorter: (prev, next) => prev.change - next.change,
			render: (data) => (
				<DecimalNumber
					data={data}
					isTolerance
				/>
			),
		},{
			title: '变动后金額',
			dataIndex: 'after',
			key: 'after',
			sorter: (prev, next) => prev.after - next.after,
			render: (data) => (
				<DecimalNumber
					data={data}
					hasSeparator
				/>
			),
		},{
			title: '备注',
			dataIndex: 'note',
			key: 'note',
		},];

		const operationColumns = [...columns];

		operationColumns.unshift({
			title: '交易号',
			dataIndex: 'transactionId',
			key: 'transactionId',
		},);
		operationColumns.push({
			title: '操作',
			dataIndex: '',
			key: '',
			render: (record) => (
				<div style={{ 'minWidth': '56px' }}>
					<div>
						<span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => this._handleClickDiscardBetting(record)}>撤單</span>
					</div>
					<div>
						<span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => this._handleCustomer(record)}>客服备注</span>
					</div>
					<div>
						<span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => this._handleFinance(record)}>财务备注</span>
					</div>
				</div>
			)
		});

		if (hasOperation) {
			return operationColumns;
		} else {
			return columns;
		}
	}

	_renderExpandRow(record, expandConfig) {
		const { colLeft, colMiddle, colRight, } = expandConfig;

		return (
			<Row className="transaction-record-expandrow" gutter={15}>
				<Col span={8}>
					{colLeft.map((item, key) => getInfo(record, item, item + key))}
				</Col>
				<Col span={8}>
					{colMiddle.map((item, key) => getInfo(record, item, item + key))}
				</Col>
				<Col span={8}>
					{colRight.map((item, key) => getInfo(record, item, item + key))}
				</Col>
			</Row>
		);
	}

	_renderTable(type) {
		const { current } = this.state;
		const tableConfig = getTableConfig(type);
		const { columnConfig: { hasOperation }, expandConfig, } = tableConfig;

		if (current.length === 0) {
			return null;
		}
		if (expandConfig) {
			return (
				<Table
					className="transaction-record-table"
					dataSource={current}
					columns={this._getTableColumns(hasOperation)}
					expandedRowRender={(record) => this._renderExpandRow(record, expandConfig)}
				/>
			);
		} else {
			return (
				<Table
					className="transaction-record-table"
					dataSource={current}
					columns={this._getTableColumns(hasOperation)}
					expandedRowRender={undefined}
				/>
			);
		}
	}

	render() {
		const {
			type, isPromptVisible,isCustomerVisible, isFinanceVisible, textArea,
		} = this.state;

		return (
			<PageBlock>
				<SearchForm
					onSearch={this._handleSearch}
					onReset={this._handleReset}
				/>
				{this._renderTable(type)}
				<PageModal
					visible={isPromptVisible}
					title="确认提示"
					onClickCancel={this._handleRemoveCancel}
					onClickOk={this._handleRemoveSubmit}
					modalSize={Modal.ModalSizeEnum.SMALL}
				>
					<div>是否确定撤單？</div>
				</PageModal>
				<PageModal
					visible={isCustomerVisible}
					title="客服备注"
					onClickCancel={this._handleCustomerCancel}
					onClickOk={this._handleCustomerSubmit}
					modalSize={Modal.ModalSizeEnum.NORMAL}
				>
					<LabelContent
						label='修改备注'
						className="customer-form-item"
						columnType={LabelContent.ColumnTypeEnums.SMALL}
					>
						<InputTextarea
							minRows={5}
							onChange={(e) => this._handleTextArea(e)}
							value={textArea}
						>
						</InputTextarea>
					</LabelContent>
				</PageModal>
				<PageModal
					visible={isFinanceVisible}
					title="财务备注"
					onClickCancel={this._handleFinanceCancel}
					onClickOk={this._handleFinanceSubmit}
					modalSize={Modal.ModalSizeEnum.NORMAL}
				>
					<LabelContent
						label='修改备注'
						className="finance-form-item"
						columnType={LabelContent.ColumnTypeEnums.SMALL}
					>
						<InputTextarea
							minRows={5}
							onChange={(e) => this._handleTextArea(e)}
							value={textArea}
						>
						</InputTextarea>
					</LabelContent>
				</PageModal>
			</PageBlock>
		);
	}
}

UserReportMemberTransactionRecordPage.propTypes = propTypes;
UserReportMemberTransactionRecordPage.defaultProps = defaultProps;

export default UserReportMemberTransactionRecordPage;

const change = [{
	key: 1,
	account: 'mzc003',
	type: '返點',
	play: '后三组选组六复式',
	prize: '10000',
	transactionId: '11050163980000000752',
	pos: '百',
	time: '2019/03/07 12:13:21',
	result: '',
	class: '',
	total: 0.002,
	term: '0163980000000752',
	status: 'win',
	single: 0.002,
	times: 56,
	rebate: 0,
	surplus: 0,
	multiple: '90 (2厘）',
	bonus: 0.283,
	ip: '225.1.1.1',
	note: 'watch',
	devote: ['123456'],
	lotteryClass: '新疆时时彩',
	customer: '他是黑名单',
	finance: '时常拖欠款项',
	mode: '2厘',
	change: 6.4,
	after: 10000,
	onlineDeposit: '中国-波波',
	thirdDeposit: '',
	level: '第五层、第十层',
	fee: 500,
	postscript: '6614',
	applyDate: '2019/02/20',
	confirmDate: '2019/02/13',
	bankAccount: '2787019392810',
	googleAuth: '未验证',
	remote: '关',
	lastLogin: '2019/02/20',
	operator: 'system_admin',
	cardId: '2201370030234552',
	withdrawal: '代付公司出款',
	arrive: 6614,
	need: 7000,
	traceTerms: 5,
	traceTermId: '203451495777',
	hasTrace: 5,
	applyGold: 810,
	cancelTerms: 2,
	cancelGold: 100,
},{
	key: 2,
	account: 'mzc003',
	type: '撤单',
	play: '后三组选组六复式',
	prize: '5000',
	transactionId: '11050163980000000752',
	pos: '百',
	time: '2019/03/07 12:13:21',
	result: '',
	class: '',
	total: 0.002,
	term: '0163980000000752',
	status: 'win',
	single: 0.002,
	times: 56,
	rebate: 0,
	surplus: 0,
	multiple: '90 (2厘）',
	bonus: 0.283,
	ip: '1.1.1.225',
	note: 'sign',
	devote: ['123456'],
	lotteryClass: '新疆时时彩',
	customer: '他是黑名单',
	finance: '时常拖欠款项',
	mode: '2厘',
	change: -192,
	after: 2000,
	onlineDeposit: '中国-波波',
	thirdDeposit: '',
	level: '第五层、第十层',
	fee: 500,
	postscript: '6614',
	applyDate: '2019/02/20',
	confirmDate: '2019/02/13',
	bankAccount: '2787019392810',
	googleAuth: '未验证',
	remote: '关',
	lastLogin: '2019/02/20',
	operator: 'system_admin',
	cardId: '2201370030234552',
	withdrawal: '代付公司出款',
	arrive: 6614,
	need: 7000,
	traceTerms: 5,
	traceTermId: '203451495777',
	hasTrace: 5,
	applyGold: 810,
	cancelTerms: 2,
	cancelGold: 100,
}];
