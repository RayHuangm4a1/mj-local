import React, { Component } from 'react';
import { Table, StatusTag, Row, Col, InputTextarea, DecimalNumber, } from 'ljit-react-components';
import PageBlock from '../../../../components/page-block';
import PageModal from '../../../../components/page-modal';
import SearchForm from './search-form';
import './style.styl';

const propTypes = {};

const defaultProps = {
	data: trace,
};

function getStatus(status) {
	switch (status) {
		case '已完成':
			return 'success';
		case '停止追号':
			return 'warning';
		case '進行中':
			return 'error';
		default:
			return '';
	}
}

class UserReportMemberTracePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			current: [],
			isPromptVisible: false,
			betting: {},
			selectedRowKeys: [],
		};

		this._handleSearch = this._handleSearch.bind(this);
		this._handleReset = this._handleReset.bind(this);
		this._handleClickDiscardBetting = this._handleClickDiscardBetting.bind(this);
		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleCancel = this._handleCancel.bind(this);
		this._handleRowSelection = this._handleRowSelection.bind(this);
		this._handleGetCheckboxProps = this._handleGetCheckboxProps.bind(this);
		this._renderExpandRow = this._renderExpandRow.bind(this);
		this._renderTable = this._renderTable.bind(this);
		this._renderModal = this._renderModal.bind(this);
	}

	_handleSearch(form) {
		form.validateFields((err, values) => {
			//TODO call api then update
		});

		this.setState({
			current: trace, //fake data update
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

	_handleSelect(selectedRowKeys) {
		this.setState({
			selectedRowKeys: selectedRowKeys,
		});
	}

	_handleSubmit() {
		const { current, selectedRowKeys, betting, } = this.state;
		const index = current.findIndex(item => item.key === betting.key);
		const newData = current;
		const rowIndex = selectedRowKeys;
		const newTrace = [];

		betting.trace.forEach((item, index) => {
			let isFind = false;

			for (let i = 0; i < rowIndex.length; i++) {
				if (index === rowIndex[i]) {
					isFind=true;
				}
			}
			if (!isFind) {
				newTrace.push(item);
			}
		});

		newData.splice(index, 1, Object.assign({}, betting, { trace: newTrace, }));
		this.setState({
			current: newData,
			isPromptVisible: false,
		});
	}

	_handleCancel() {
		this.setState({
			isPromptVisible: false,
		});
	}

	_handleRowSelection(selectedRowKeys, selectedRows) {
		console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
		this._handleSelect(selectedRowKeys);
	}

	_handleGetCheckboxProps(record) {
		console.log(record);
		return record;
	}

	_renderExpandRow(record) {
		return (
			<Row className="trace-expandrow">
				<Col span={8}>
					<p>追号总期数：{record.totalTrace}</p>
					<p>追号编号：{record.traceId}</p>
					<p>已追期数： {record.traceTerms}</p>
					<p>完成金额：<DecimalNumber data={record.total} hasSeparator/></p>
					<p>已取消期数：{record.cancelTerms}</p>
					<p>取消金额：<DecimalNumber data={record.cancel} hasSeparator/></p>
					<p>销售返点： {record.rebate}</p>
					<p>一倍奖金：{record.bonus}</p>
					<p>备注： {record.note}</p>
				</Col>
				<Col span={8}>
					<p>位置： {record.pos}</p>
					<p>追号编号：{record.traceId}</p>
					<p>投注号码：</p>
					<InputTextarea minRows={7} value={record.devote.join(',')} disabled></InputTextarea>
				</Col>
				<Col span={8}>
				</Col>
			</Row>
		);
	}

	_renderTable() {
		const columns = [{
			title: '用户名',
			dataIndex: 'account',
			key: 'account',
		},{
			title: '追号时间',
			dataIndex: 'time',
			key: 'time',
		},{
			title: '彩种玩法',
			dataIndex: 'play',
			key: 'play',
		},{
			title: '开始追号期数',
			dataIndex: 'traceTerm',
			key: 'traceTerm',
		},{
			title: '中奖后停止',
			dataIndex: 'autoEnd',
			key: 'autoEnd',
		},{
			title: '模式',
			dataIndex: 'mode',
			key: 'mode',
			render: (mode) => (<div style={{ 'minWidth': '28px' }}>{mode}</div>),
		},{
			title: '状态',
			dataIndex: 'status',
			key: 'status',
			render: (status) => (<StatusTag status={getStatus(status)} text={status} />)
		},{
			title: '操作',
			dataIndex: '',
			key: '',
			render: (record) => (
				<div style={{ 'minWidth': '28px' }}>
					<span style={{ 'color': '#1890ff', 'cursor': 'pointer' }} onClick={() => this._handleClickDiscardBetting(record)}>撤單</span>
				</div>
			)
		},];

		const { current, } = this.state;

		if (current.length > 0) {
			return (
				<Table
					className="trace-table"
					dataSource={current}
					columns={columns}
					expandedRowRender={this._renderExpandRow}
				/>
			);
		} else {
			return null;
		}
	}

	_renderModal() {
		const modalcolumns = [{
			title: '期號',
			dataIndex: 'term',
			key: 'term',
		},{
			title: '追号倍数',
			dataIndex: 'multiple',
			key: 'multiple',
		},{
			title: '当前投注',
			dataIndex: 'devoteCount',
			key: 'devoteCount',
		},{
			title: '累积投注',
			dataIndex: 'devoteSum',
			key: 'devoteSum',
		},{
			title: '追号状态',
			dataIndex: 'traceStatus',
			key: 'traceStatus',
		},{
			title: '交易号',
			dataIndex: 'transactionId',
			key: 'transactionId',
		}];

		const rowSelection = {
			onChange: this._handleRowSelection,
			getCheckboxProps: this._handleGetCheckboxProps,
		};

		const { isPromptVisible, betting, } = this.state;

		return (
			<PageModal
				visible={isPromptVisible}
				title="确认提示"
				modalSize="large"
				onClickCancel={this._handleCancel}
				onClickOk={this._handleSubmit}
			>
				<div>
					<Table
						dataSource={betting.trace}
						columns={modalcolumns}
						rowSelection={rowSelection}
					/>
				</div>
			</PageModal>
		);
	}

	render() {
		return (
			<PageBlock noMinHeight>
				<SearchForm
					onSearch={this._handleSearch}
					onReset={this._handleReset}
				/>
				{this._renderTable()}
				{this._renderModal()}
			</PageBlock>
		);
	}
}

UserReportMemberTracePage.propTypes = propTypes;
UserReportMemberTracePage.defaultProps = defaultProps;

export default UserReportMemberTracePage;

const traceList = [{
	term: '0163980000000752',
	multiple: 2,
	devoteCount: 100,
	devoteSum: 100,
	traceStatus: '已投注',
	transactionId: '115103444916856',
},{
	term: '0163980000000753',
	multiple: 3,
	devoteCount: 100,
	devoteSum: 200,
	traceStatus: '已投注',
	transactionId: '11050163980000000752',
},{
	term: '0163980000000754',
	multiple: 4,
	devoteCount: 150,
	devoteSum: 350,
	traceStatus: '未投注',
	transactionId: '',
}];

const trace = [{
	key: 1,
	account: 'mzc003',
	totalTrace: 5,
	complete: 810,
	traceId: '203451495777',
	total: 1000,
	cancel: 100,
	time: '2019/03/07 12:13:21',
	traceTerm: '0163980000000752 ~ 0163980000000758',
	traceTerms: 5,
	autoEnd: '是',
	play: '(新疆时时彩)后三组选组六复式',
	cancelTerms: 0,
	status: '已完成',
	term: '0163980000000752',
	startTerm: '0163980000000752',
	rebate: 0,
	class: '新疆时时彩',
	multiple: 1,
	pos: '万、千、百',
	mode: '1元',
	bonus: 0.283,
	devote: ['123456'],
	trace: traceList,
	prize: '10000',
	single: 0.002,
	times: 56,
	surplus: 0,
	ip: '',
	note: '',
	winNum: '2,3',
	reward: '定位胆',
	winBetcount: 2,
},{
	key: 2,
	account: 'mzc003',
	totalTrace: 5,
	complete: 810,
	traceId: '203451495777',
	total: 1000,
	cancel: 100,
	time: '2019/03/07 12:13:21',
	traceTerm: '0163980000000740 ~ 0163980000000750',
	traceTerms: 5,
	autoEnd: '是',
	play: '(新疆时时彩)后三组选组六复式',
	cancelTerms: 0,
	status: '進行中',
	term: '0163980000000752',
	startTerm: '0163980000000752',
	rebate: 0,
	class: '新疆时时彩',
	multiple: 1,
	pos: '万、千、百',
	mode: '1元',
	bonus: 0.283,
	devote: ['123456'],
	trace: traceList,
	prize: '10000',
	single: 0.002,
	times: 56,
	surplus: 0,
	ip: '',
	note: '',
	winNum: '2,3',
	reward: '定位胆',
	winBetcount: 2,
},{
	key: 3,
	account: 'mzc003',
	totalTrace: 5,
	complete: 810,
	traceId: '203451495777',
	total: 1000,
	cancel: 100,
	time: '2019/03/07 12:13:21',
	traceTerm: '0163980000000452 ~ 0163980000000458',
	traceTerms: 5,
	autoEnd: '是',
	play: '(新疆时时彩)后三组选组六复式',
	cancelTerms: 0,
	status: '停止追号',
	term: '0163980000000752',
	startTerm: '0163980000000752',
	rebate: 0,
	class: '新疆时时彩',
	multiple: 1,
	pos: '万、千、百',
	mode: '1元',
	bonus: 0.283,
	devote: ['123456'],
	trace: traceList,
	prize: '10000',
	single: 0.002,
	times: 56,
	surplus: 0,
	ip: '',
	note: '',
	winNum: '2,3',
	reward: '定位胆',
	winBetcount: 2,
}];
