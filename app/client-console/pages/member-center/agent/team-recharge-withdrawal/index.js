import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import SelectDropdown from '../../../../components/select-dropdown';
import PagerTable from '../../../../components/pager-table';
import {
	Input,
	Form,
	FormItem,
	Button,
	DecimalNumber,
} from 'ljit-react-components';
import ClientDateRangePicker from '../../../../features/client-date-range-picker';
import { formatDate, DATE_TIME } from '../../../../../lib/moment-utils';
import { connect, } from 'ljit-store-connecter';
import { MAX_SELECTION_DAYS } from '../../../../../lib/constants';
import './style.styl';

const { RangesEnums } = ClientDateRangePicker;
const {
	TODAY,
	YESTERDAY,
	THIS_WEEK,
} = RangesEnums;

const ActionTypeOptions = [
	{ label: '团队充值', value: 'teamRecharge', },
	{ label: '团队提现', value: 'teamWithdrawal', },
];
const DescendantOptions = [
	{ label: '直属下级', value: 'children', },
	{ label: '所有下級', value: 'descendants', },
];

const PREFIX_CLASS = 'team-recharge-withdrawal';

const propTypes = {
};

class AgentTeamRechargeWithdrawalPage extends Component {
	constructor() {
		super();
		this.state = {
			pagination: {},
		};

		this._handleSearch = this._handleSearch.bind(this);
		this._handleChangeTablePage = this._handleChangeTablePage.bind(this);
	}
	_handleSearch() {
		const form = this.formInstance.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				// TODO dispatch search action.
			}
		});
	}
	_handleChangeTablePage(pagination, filters, sorter) {
		// TODO dispatch action to update transactionLog data

		this.setState({ pagination, });
	}

	render() {
		const {
			_handleSearch,
			_handleChangeTablePage,
		} = this;
		const {
			pagination,
		} = this.state;


		return (
			<div className={PREFIX_CLASS}>
				<Form
					cancelButtonDisabled
					submitButtonDisabled
					ref={(refForm) => this.formInstance = refForm}
				>
					<div>
						<FormItem
							label="类型"
							itemName="type"
							labelColon={false}
							itemConfig={{
								initialValue: ActionTypeOptions[0].value
							}}
						>
							<SelectDropdown
								// TODO check options
								options={ActionTypeOptions}
							/>
						</FormItem>
						<FormItem
							label="下級"
							// TODO check api requirement to change naming
							itemName="descendant"
							labelColon={false}
							itemConfig={{
								initialValue: DescendantOptions[0].value
							}}
						>
							<SelectDropdown
								// TODO check options
								options={DescendantOptions}
							/>
						</FormItem>
						<FormItem
							label="时间"
							itemName="fromTo"
							labelColon={false}
						>
							<ClientDateRangePicker
								inputStyle={{ width: '310px', }}
								ranges={[TODAY, YESTERDAY, THIS_WEEK]}
								showTime
								format={DATE_TIME}
								limitDays={MAX_SELECTION_DAYS}
							/>
						</FormItem>
						<Button
							outline={Button.OutlineEnums.SOLID}
							color={Button.ColorEnums.ORANGE}
							onClick={_handleSearch}
						>
							查询
						</Button>
					</div>
					<div>
						<FormItem
							label="会员名"
							itemName="username"
							labelColon={false}
							itemConfig={{
								initialValue: ''
							}}
						>
							<Input
								placeholder="输入会员名"
							/>
						</FormItem>
						<FormItem
							label="方案号"
							itemName="id"
							labelColon={false}
						>
							<Input
								placeholder="输入方案号"
							/>
						</FormItem>
					</div>
				</Form>
				<PagerTable
					rowKey="id"
					dataSource={fakeData}
					size={PagerTable.SizeEnums.X_SMALL}
					columns={[
						{
							title: '方案号',
							dataIndex: 'id',
							width: 163,
						},
						{
							title: '会员',
							dataIndex: 'username',
							width: 125,
						},
						{
							title: '充值时间',
							dataIndex: 'createdAt',
							width: 225,
							// TODO get sorted data from api res
							sorter: () => 0,
							render: (value) => formatDate(value)
						},
						{
							title: '充值金额',
							dataIndex: 'amount',
							width: 111,
							render: (value) => <DecimalNumber data={value} hasSeparator/>,
						},
						{
							title: '手续费',
							dataIndex: 'fee',
							width: 171,
							render: (value) => <DecimalNumber data={value} hasSeparator/>,
						},
						{
							title: '备注',
							dataIndex: 'description',
							width: 135,
							render: (value) => value ? value : '-'
						},
					]}
					paginationProps={{
						...pagination,
						// TODO get totoal data length form api response
						total: 200,
					}}
					onTableChange={_handleChangeTablePage}
				/>
			</div>
		);
	}
}

AgentTeamRechargeWithdrawalPage.propTypes = propTypes;

function mapStateToProps(state) {
	return {
		// TODO get data when api is ok
	};
}
function mapDispatchToProps(dispatch) {
	return {
		// TODO add search action, update table action
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AgentTeamRechargeWithdrawalPage);

// TODO remove fake data
const fakeData = [
	{
		id: 4197849215,
		username: 'qiyi168',
		amount: 1230,
		fee: 33100,
		description: null,
		createdAt: "2019-05-12T10:18:10.103Z",
	},
	{
		id: 4193849285,
		username: 'qax231',
		amount: 1230,
		fee: 100,
		description: null,
		createdAt: "2019-06-12T10:18:10.103Z",
	},
	{
		id: 4197849285,
		username: 'qiyi168',
		amount: 11110,
		fee: 10330,
		description: "河内时时彩第[20190806-168]期",
		createdAt: "2019-06-11T10:18:10.103Z",
	},
	{
		id: 41937849285,
		username: 'qiyi168',
		amount: 10,
		fee: 100,
		description: "河内时时彩第[20190806-168]期",
		createdAt: "2019-06-11T10:18:10.103Z",
	},
	{
		id: 41397849285,
		username: 'qiyi168',
		amount: 10,
		fee: 100,
		description: "河内时时彩第[20190806-168]期",
		createdAt: "2019-06-11T10:18:10.103Z",
	},
	{
		id: 41973849285,
		username: 'qiyi168',
		amount: 10,
		fee: 100,
		description: "河内时时彩第[20190806-168]期",
		createdAt: "2019-06-11T10:18:10.103Z",
	},
	{
		id: 41197849285,
		username: 'qiyi168',
		amount: 10,
		fee: 1000,
		description: "河内时时彩第[20190806-168]期",
		createdAt: "2019-06-11T10:18:10.103Z",
	},
	{
		id: 41978149285,
		username: 'qiyi168',
		amount: 10,
		fee: 100,
		description: "河内时时彩第[20190806-168]期",
		createdAt: "2019-06-11T10:18:10.103Z",
	},
	{
		id: 41978492851,
		username: 'qiyi168',
		amount: 10,
		fee: 100,
		description: "河内时时彩第[20190806-168]期",
		createdAt: "2019-06-11T10:18:10.103Z",
	},
	{
		id: 41978493285,
		username: 'qiyi168',
		amount: 10,
		fee: 100,
		description: "河内时时彩第[20190806-168]期",
		createdAt: "2019-06-11T10:18:10.103Z",
	},
];
