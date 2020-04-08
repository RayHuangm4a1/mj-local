import React, { Component, } from 'react';
import PagerTable from '../../../../components/pager-table';
import ClientDateRangePicker from '../../../../features/client-date-range-picker';
import SelectDropDown from '../../../../components/select-dropdown';
import {
	Form,
	FormItem,
	Input,
	Button,
	LabelContent,
	TextButton,
	UserBreadcrumb,
	DecimalNumber,
} from 'ljit-react-components';
import PropTypes from 'prop-types';
import { connect, } from 'ljit-store-connecter';
import { DATE } from '../../../../../lib/moment-utils';
import './style.styl';

const PREFIX_CLASS = 'agent-team-third-party-report';

const { RangesEnums } = ClientDateRangePicker;
const {
	TODAY,
	YESTERDAY,
	THIS_WEEK,
} = RangesEnums;

const TypeOptions = [
	{ label: '娱乐总报表', value: 'all', },
];

// TODO check propTypes
const propTypes = {
	userData: PropTypes.shape({
		username: PropTypes.string,
	})
};

class AgentTeamThirdPartyPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			breadcrumbUsers: [props.userData],
			pagination: {},
		};

		this._handleSearch = this._handleSearch.bind(this);
		this._handleClickUsername = this._handleClickUsername.bind(this);
		this._handleChangeTable = this._handleChangeTable.bind(this);
	}

	_handleSearch() {
		const form = this.formInstance.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				// TODO dispatch search action
			}
		});
	}
	_handleClickUsername(user) {
		const { breadcrumbUsers, } = this.state;
		const breadcrumbIndex =  breadcrumbUsers.map(breadcrumb => breadcrumb.id).indexOf(user.id);

		// TODO dispatch fetch descendants data action
		if (breadcrumbIndex === -1) {
			this.setState({
				breadcrumbUsers: [...breadcrumbUsers, user],
			});
		} else {
			this.setState({
				breadcrumbUsers: breadcrumbUsers.slice(0, breadcrumbIndex + 1),
			});
		}
	}
	_handleChangeTable(pagination, filters, sorter) {
		// TODO dispatch action to update table

		this.setState({ pagination, });
	}

	render() {
		const {
			_handleSearch,
			_handleClickUsername,
			_handleChangeTable,
		} = this;
		const {
			pagination,
			breadcrumbUsers,
		} = this.state;

		// TODO remove generateFakeData when api is ok
		// TODO remove fakeTotal when api is ok, (api should return total data)
		const fakedata = generateFakeData();
		const fakeTotal = fakedata.reduce((accumulator, data) => {
			const keys = Object.keys(accumulator);

			keys.forEach(key => {
				if (key !== 'username') {
					accumulator[key] = accumulator[key] + data[key];
				}
			});

			return accumulator;
		}, {
			username: '总计',
			transferIn: 0,
			transferOut: 0,
			tips: 0,
			betting: 0,
			yesterdayBalance: 0,
			currentBalance: 0,
			teamProfit: 0,
			cumulativeProfit: 0,
			wage: 0,
		});
		const dataSource = [fakeTotal, ...fakedata,];

		return (
			<div className={PREFIX_CLASS}>
				<div className={`${PREFIX_CLASS}__header`}>
					<Form
						cancelButtonDisabled
						submitButtonDisabled
						ref={(refForm) => this.formInstance = refForm}
					>
						<FormItem
							itemName="type"
							label="类型"
							labelColon={false}
							itemConfig={{ initialValue: TypeOptions[0].value, }}
						>
							<SelectDropDown
								options={TypeOptions}
							/>
						</FormItem>
						<FormItem
							itemName="username"
							label="会员名"
							labelColon={false}
						>
							<Input
								placeholder="输入会员名"
							/>
						</FormItem>
						<FormItem
							label="时间"
							itemName="fromTo"
							labelColon={false}
						>
							<ClientDateRangePicker
								inputStyle={{ width: '230px', }}
								ranges={[TODAY, YESTERDAY, THIS_WEEK]}
								format={DATE}
							/>
						</FormItem>
						<Button
							outline={Button.OutlineEnums.SOLID}
							color={Button.ColorEnums.ORANGE}
							onClick={_handleSearch}
						>
							查询
						</Button>
					</Form>
				</div>
				<div className={`${PREFIX_CLASS}__body`}>
					<LabelContent
						label="会员层级"
					>
						<UserBreadcrumb
							data={breadcrumbUsers}
							targetKey="username"
							separator="/"
							onClickUser={_handleClickUsername}
							isShowingCurrentCount={false}
						/>
					</LabelContent>
					<PagerTable
						rowKey="username"
						dataSource={dataSource}
						size={PagerTable.SizeEnums.SMALL}
						columns={[
							{
								title: '会员名',
								dataIndex: 'username',
								width: 90,
								render: (value, record, index) => {
									if (index === 0) {
										return value;
									} else {
										return (
											<TextButton
												onClick={() => _handleClickUsername(record)}
												text={value}
											/>
										);
									}
								}
							},
							{
								title: '转入',
								dataIndex: 'transferIn',
								width: 94,
								sorter: () => 0,
								render: (value) => <DecimalNumber data={value} hasSeparator />,
							},
							{
								title: '转出',
								dataIndex: 'transferOut',
								width: 90,
								sorter: () => 0,
								render: (value) => <DecimalNumber data={value} hasSeparator />,
							},
							{
								title: '小费',
								dataIndex: 'tips',
								width: 96,
								sorter: () => 0,
								render: (value) => <DecimalNumber data={value} hasSeparator />,
							},
							{
								title: '投注',
								dataIndex: 'betting',
								width: 100,
								sorter: () => 0,
								render: (value) => <DecimalNumber data={value} hasSeparator />,
							},
							{
								title: '昨天余额',
								dataIndex: 'yesterdayBalance',
								width: 108,
								sorter: () => 0,
								render: (value) => <DecimalNumber data={value} hasSeparator />,
							},
							{
								title: '当前余额',
								dataIndex: 'currentBalance',
								width: 108,
								sorter: () => 0,
								render: (value) => <DecimalNumber data={value} hasSeparator />,
							},
							{
								title: '团队盈利',
								dataIndex: 'teamProfit',
								width: 104,
								sorter: () => 0,
								render: (value) => <DecimalNumber data={value} hasSeparator />,
							},
							{
								title: '累計盈利',
								dataIndex: 'cumulativeProfit',
								width: 114,
								sorter: () => 0,
								render: (value) => <DecimalNumber data={value} hasSeparator />,
							},
							{
								title: '工資',
								dataIndex: 'wage',
								width: 98,
								sorter: () => 0,
								render: (value) => <DecimalNumber data={value} hasSeparator />,
							},

						]}
						paginationProps={{
							...pagination,
							total: 200,
						}}
						onTableChange={_handleChangeTable}
					/>
				</div>
			</div>
		);
	}
}

AgentTeamThirdPartyPage.propTypes = propTypes;

function mapStateToProps(state) {
	return {
		userData: state.user.get('data').toObject(),
	};
}

function mapDispatchToProps(dispatch) {
	return {
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AgentTeamThirdPartyPage);

// TODO remove this after api is ok.
function generateFakeData() {
	const data= [];

	for (let i = 0; i < 6; i++) {
		data.push({
			id: parseInt(Math.random()*10000),
			username: `test${parseInt(Math.random()*1000)}`,
			transferIn: parseInt(Math.random()*1000),
			transferOut: parseInt(Math.random()*1000),
			tips: parseInt(Math.random()*1000),
			betting: parseInt(Math.random()*1000),
			yesterdayBalance: parseInt(Math.random()*1000),
			currentBalance: parseInt(Math.random()*1000),
			teamProfit: parseInt(Math.random()*1000),
			cumulativeProfit: parseInt(Math.random()*1000),
			wage: parseInt(Math.random()*1000),
		});
	}

	return data;
}
