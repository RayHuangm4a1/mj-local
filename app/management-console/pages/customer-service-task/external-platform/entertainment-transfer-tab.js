import React, { Component, } from 'react';
import {
	Form,
	FormItem,
	Input,
	DateRangePicker,
	Select,
	Table,
	StatusTag,
	DecimalNumber,
} from 'ljit-react-components';
import PropTypes from 'prop-types';

const PROCESSING = 'processing';
const SUCCESS = 'success';
const StatusTagMap = {
	[PROCESSING]: 'error',
	[SUCCESS]: 'success',
};
const StatusTextMap = {
	[PROCESSING]: '進行中',
	[SUCCESS]: '成功',
};

const fakeData = [
	{
		_id: 1,
		orderId: '6006415598880124066',
		type: '转出',
		amount: 2500,
		centerBalance: 2500,
		entertainmentBalance: 30,
		transferAt: '2019/03/07 12:14:21',
		status: PROCESSING,
		comment: '开元棋牌转出'
	},
	{
		_id: 2,
		orderId: '2006415598890124066',
		type: '转入',
		amount: 500,
		centerBalance: 500,
		entertainmentBalance: 38,
		transferAt: '2019/03/07 12:14:29',
		status: SUCCESS,
		comment: '开元棋牌转出'
	},
	{
		_id: 3,
		orderId: '6306415598880124066',
		type: '转入',
		amount: 600.12,
		centerBalance: 500.12,
		entertainmentBalance: 40,
		transferAt: '2019/03/07 12:15:21',
		status: SUCCESS,
		comment: 'AG电子转出'
	},
];

const propTypes = {
	dataSource: PropTypes.arrayOf(PropTypes.shape({
		orderId: PropTypes.string,
		type: PropTypes.string,
		amount: PropTypes.number,
		centerBalance: PropTypes.number,
		entertainmentBalance: PropTypes.number,
		transferAt: PropTypes.string,
		status: PropTypes.string,
		comment: PropTypes.string,
	})),
};
const defaultProps = {
	// TODO get datasource
	dataSource: fakeData,
};
const inputStyle = { width: '264px', };

class EntertainmentTransferTab extends Component {
	constructor() {
		super();

		this._handleClickSearch = this._handleClickSearch.bind(this);
		this._handleClickReset = this._handleClickReset.bind(this);
	}

	_handleClickSearch() {
		const form = this.formInstance.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				//TODO send search api
			}
		});
	}

	_handleClickReset() {
		const form = this.formInstance.getForm();

		form.resetFields();
	}

	render() {
		const { dataSource, } = this.props;
		const {
			_handleClickSearch,
			_handleClickReset,
		} = this;

		return (
			<div className="entertainment-transfer-tab">
				<Form
					ref={(refForm) => this.formInstance = refForm }
					submitText="查询"
					cancelText="重置"
					onSubmit={_handleClickSearch}
					onCancel={_handleClickReset}
				>
					<div style={{ display: 'flex', justifyContent: 'space-between'}}>
						<FormItem
							itemName="orderId"
							label="订单号"
						>
							<Input
								placeholder="请输入订单号"
								style={inputStyle}
							/>
						</FormItem>
						<FormItem
							itemName="transferAt"
							label="转帐时间"
						>
							<DateRangePicker style={inputStyle}/>
						</FormItem>
						<FormItem
							itemName="type"
							label="类型"
						>
							<Select
								placeholder="请选择类型"
								// TODO get options
								options={[]}
								style={inputStyle}
							/>
						</FormItem>
					</div>
				</Form>
				<Table
					columns={[
						{
							title: '订单号',
							dataIndex: 'orderId',
							sorter:  (a, b) => a.orderId.localeCompare(b.orderId)
						},{
							title: '类型',
							dataIndex: 'type',
						},{
							title: '转帐金额',
							dataIndex: 'amount',
							render: (amount) => <DecimalNumber data={amount} hasSeparator/>,
						},{
							title: '中心余额',
							dataIndex: 'centerBalance',
							render: (centerBalance) => <DecimalNumber data={centerBalance} hasSeparator/>,
						},{
							title: '娱乐余额',
							dataIndex: 'entertainmentBalance',
							render: (entertainmentBalance) => <DecimalNumber data={entertainmentBalance} hasSeparator/>,
						},{
							title: '转帐时间',
							dataIndex: 'transferAt',
						},{
							title: '状态',
							dataIndex: 'status',
							render: (value) => {
								return (
									<StatusTag
										status={StatusTagMap[value]}
										text={StatusTextMap[value]}
									/>
								);
							}
						},{
							title: '备注',
							dataIndex: 'comment',
						},
					]}
					dataSource={dataSource}
					rowKey="_id"
					hasPagination
				/>
			</div>
		);
	}
}

EntertainmentTransferTab.propTypes = propTypes;
EntertainmentTransferTab.defaultProps = defaultProps;

export default EntertainmentTransferTab;

