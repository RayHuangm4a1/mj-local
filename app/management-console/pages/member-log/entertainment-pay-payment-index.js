import React, { Component, } from 'react';
import PageBlock from '../../components/page-block';
import {
	CollapsableForm,
	FormItem,
	Input,
	DateRangePicker,
	Table,
	InputNumber,
} from 'ljit-react-components';
import { convertDateStringToTimestamp, } from '../../lib/moment-utils';

const inputStyle = {
	width: '264px',
};

const propTypes = {};
const defaultProps = {};

class MemberLogEntertainmentPayPaymentPage extends Component {
	constructor() {
		super();
		this.state = {
			isExpand: true,
			isResultTableVisible: false,
		};

		this._handleCollapsableFormSubmit = this._handleCollapsableFormSubmit.bind(this);
		this._handleCollapsableFormCancel = this._handleCollapsableFormCancel.bind(this);
		this._renderExpandFields = this._renderExpandFields.bind(this);
		this._renderCollapseFields = this._renderCollapseFields.bind(this);
		this._renderResultTableBlock = this._renderResultTableBlock.bind(this);
	}
	_handleCollapsableFormSubmit(event) {
		const form = this.collapsableFormInstance.getForm();

		event.preventDefault();
		form.validateFields((err, values) => {
			//TODO: fetch api
		});

		this.setState({ isResultTableVisible: true, });
	}
	_handleCollapsableFormCancel() {
		const form = this.collapsableFormInstance.getForm();

		form.resetFields();
		this.setState({ isResultTableVisible: false, });
	}
	_renderExpandFields() {
		return ([
			<FormItem label="帐号" key="username-expand" itemName="username" style={{ display: 'flex', }}>
				<Input
					placeholder="请输入帐号"
					style={inputStyle}
				/>
			</FormItem>,
			<FormItem label="工资" key="payment-expand" itemName="payment" style={{ display: 'flex', }}>
				<InputNumber
					placeholder="请输入工资"
					style={inputStyle}
					min={0}
				/>
			</FormItem>,
			<FormItem label="发放時間" key="payAt-expand" itemName="payAt" style={{ display: 'flex', }}>
				<DateRangePicker
					format="YYYY/M/DD"
					ranges={['today', 'lastSevenDays', 'lastThirtyDays']}
					inputStyle={inputStyle}
				/>
			</FormItem>,
		]);
	}
	_renderCollapseFields() {
		return ([
			<FormItem label="帐号" key="username-collapse" itemName="username" style={{ display: 'flex', }}>
				<Input
					placeholder="请输入帐号"
					style={inputStyle}
				/>
			</FormItem>,
			<FormItem label="工资" key="payment-collapse" itemName="payment" style={{ display: 'flex', }}>
				<Input
					placeholder="请输入工资"
					style={inputStyle}
				/>
			</FormItem>,
		]);
	}
	_renderResultTableBlock() {
		const columns = [{
			title: '会员编号',
			dataIndex: 'userNumber',
			key: 'userNumber',
			sorter: (prev, next) => prev.userNumber - next.userNumber,
		},{
			title: '帐号',
			dataIndex: 'username',
			key: 'username',
		},{
			title: '发放时间',
			dataIndex: 'payAt',
			key: 'payAt',
			sorter: (prev, next) => convertDateStringToTimestamp(prev.payAt) - convertDateStringToTimestamp(next.payAt),
		},{
			title: '工资',
			dataIndex: 'payment',
			key: 'payment',
		},{
			title: '备注',
			dataIndex: 'note',
			key: 'note',
		}];

		return (
			<PageBlock>
				<Table
					rowKey="_id"
					columns={columns}
					dataSource={
						//TODO: change api data
						Array.from(Array(10).keys()).map((index) => ({
							_id: `${index + 1}`,
							userNumber:index+1,
							username: `Account - ${index + 1}`,
							payAt: `2019/5/${Math.floor(Math.random() * 10)} 13:32:31`,
							payment: (Math.random() * 1.5).toFixed(2),
							note: '发放工资'
						}))
					}
					pagination={false}
				/>
			</PageBlock>
		);
	}
	render() {
		const { isExpand, isResultTableVisible, } = this.state;

		return (
			<React.Fragment>
				<PageBlock noMinHeight>
					<CollapsableForm
						expand={isExpand}
						onSubmit={this._handleCollapsableFormSubmit}
						onCancel={this._handleCollapsableFormCancel}
						submitText="查询"
						cancelText="重置"
						collapseType={CollapsableForm.CollapseTypeEnum.INSERTROW}
						ref={(refForm) => this.collapsableFormInstance = refForm}
						expandChildren={this._renderExpandFields()}
						collapseChildren={this._renderCollapseFields()}
					>
					</CollapsableForm>
				</PageBlock>
				{isResultTableVisible ? this._renderResultTableBlock() : null}
			</React.Fragment>
		);
	}
}

MemberLogEntertainmentPayPaymentPage.propTypes = propTypes;
MemberLogEntertainmentPayPaymentPage.defaultProps = defaultProps;

export default MemberLogEntertainmentPayPaymentPage;
