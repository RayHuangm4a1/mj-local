import React, { Component, } from 'react';
import {
	Form,
	FormItem,
	Input,
	Button,
	LabelContent,
	TextButton,
	UserBreadcrumb,
	Table,
	DecimalNumber,
} from 'ljit-react-components';
import { connect, } from 'ljit-store-connecter';
import SelectDropdown from '../../../../components/select-dropdown';
import PagerTable from '../../../../components/pager-table';
import ClientDateRangePicker from '../../../../features/client-date-range-picker';
import { DATE, convertDateStringToTimestamp } from '../../../../../lib/moment-utils';
import { LoadingStatusEnum } from '../../../../lib/enums';
import { withLoadingStatusNotification } from '../../../../../lib/notify-handler';
import PropTypes from 'prop-types';
import { teamReportsActions } from '../../../../controller';
import {
	getProfitAmount,
	getEncourageAmount,
} from './utils';
import './style.styl';

const PREFIX_CLASS = 'agent-team-report';
const { LOADING } = LoadingStatusEnum;
const { fetchTeamReportsAction } = teamReportsActions;
const { RangesEnums } = ClientDateRangePicker;
const {
	TODAY,
	YESTERDAY,
} = RangesEnums;

const propTypes = {
	userData: PropTypes.object.isRequired,
	statsData: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string,
		]),
		userId: PropTypes.number,
		username: PropTypes.string,
		walletCode: PropTypes.number,
		date: PropTypes.string,
		bettingAmount: PropTypes.number,
		bettingReward: PropTypes.number,
		depositAmount: PropTypes.number,
		withdrawalAmount: PropTypes.number,
		rebateAmount: PropTypes.number,
		activityAmount: PropTypes.number,
		fixedWageAmount: PropTypes.number,
		dividendAmount: PropTypes.number,
		incentiveAmount: PropTypes.number,
	})),
	ancestorsData: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		username: PropTypes.string,
	})),
	fetchTeamReportsAction: PropTypes.func.isRequired,
	loadingStatus: PropTypes.number.isRequired,
	loadingStatusMessage: PropTypes.string.isRequired,
};
const defaultProps = {
	statsData: [],
	ancestorsData: [],
};

const defaultRangeDate = ClientDateRangePicker.getTodayDateRange();

class AgentTeamReportPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			reportValue: 0,
			reportOptions: [{
				label: '綜合报表',
				value: 0,
			}],
			currentChildrenUser: props.userData.username,
		};

		this._handleSearch = this._handleSearch.bind(this);
		this._handleChangeReportType = this._handleChangeReportType.bind(this);
		this._handleClickUsername = this._handleClickUsername.bind(this);
		this._handleChangeUsername = this._handleChangeUsername.bind(this);
		this._mapStatsToDataSource = this._mapStatsToDataSource.bind(this);
		this._handleSort = this._handleSort.bind(this);
		this._renderUserName = this._renderUserName.bind(this);
	}

	_handleChangeReportType(value) {
		this.setState({
			reportValue: value
		});
	}
	_handleSearch() {
		const { userData, fetchTeamReportsAction } = this.props;
		const form = this.formInstance.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				const { username, fromTo } = values;
				const userIdOrUsername = username || userData.username;
				const query = {
					from: convertDateStringToTimestamp(fromTo[0]),
					to: convertDateStringToTimestamp(fromTo[1]),
				};

				fetchTeamReportsAction(userIdOrUsername, query);

				this.setState({ currentChildrenUser: username });
			}
		});
	}
	_handleClickUsername(user) {
		const form = this.formInstance.getForm();
		const fromTo = form.getFieldValue('fromTo');
		const { currentChildrenUser } = this.state;
		const { fetchTeamReportsAction } = this.props;
		const { username, userId, id } = user;

		const userIdOrUsername = userId || id;

		this._handleChangeUsername(username);

		if (username !== currentChildrenUser) {
			const query = {
				from: convertDateStringToTimestamp(fromTo[0]),
				to: convertDateStringToTimestamp(fromTo[1]),
			};

			fetchTeamReportsAction(userIdOrUsername, query);

			this.setState({ currentChildrenUser: username, });
		}
	}
	_handleChangeUsername(value) {
		const form = this.formInstance.getForm();

		form.setFieldsValue({ username: value });
	}
	_mapStatsToDataSource() {
		const { statsData } = this.props;

		let newStats;

		newStats = statsData.map(stat => {
			return {
				...stat,
				profit: getProfitAmount(stat),
				encourageAmount: getEncourageAmount(stat),
			};
		});

		return newStats;
	}
	_handleSort(current, next, key) {
		if (current.username === '总计' || next.username === '总计') {
			return 0;
		} else {
			const sorted = current[key] - next[key];

			return sorted;
		}
	}

	_renderUserName(value, record) {
		const { _handleClickUsername } = this;

		if (value === '总计') {
			return value;
		} else {
			return (
				<TextButton
					className={`${PREFIX_CLASS}__username-text`}
					onClick={() => _handleClickUsername(record)}
					text={value}
				/>
			);
		}
	}

	render() {
		const {
			_handleChangeReportType,
			_handleSearch,
			_handleClickUsername,
			_mapStatsToDataSource,
			_handleSort,
			_renderUserName,
		} = this;
		const {
			ancestorsData,
			loadingStatus,
		} = this.props;
		const { reportValue, reportOptions } = this.state;
		const dataSource = _mapStatsToDataSource();

		return (
			<div className={PREFIX_CLASS}>
				<div className={`${PREFIX_CLASS}__header`}>
					<Form
						cancelButtonDisabled
						submitButtonDisabled
						ref={(refForm) => this.formInstance = refForm}
					>
						<FormItem
							itemName="reportType"
							label="类型"
							labelColon={false}
							itemConfig={{
								initialValue: reportValue
							}}
						>
							<SelectDropdown
								options={reportOptions}
								onChange={_handleChangeReportType}
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
							itemConfig={{
								initialValue: defaultRangeDate
							}}
						>
							<ClientDateRangePicker
								inputStyle={{ width: '230px', }}
								ranges={[TODAY, YESTERDAY]}
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
						columnType={LabelContent.ColumnTypeEnums.SMALL}
					>
						<UserBreadcrumb
							data={ancestorsData}
							targetKey="username"
							separator="/"
							onClickUser={_handleClickUsername}
							isShowingCurrentCount={false}
						/>
					</LabelContent>
					<Table
						isLoading={loadingStatus === LOADING}
						rowKey="id"
						dataSource={dataSource}
						size={PagerTable.SizeEnums.SMALL}
						scroll={{ y: 440 }}
						columns={[
							{
								title: '会员名',
								dataIndex: 'username',
								width: 112,
								render: (value, record, index) => _renderUserName(value, record, index)
							},
							{
								title: '盈利',
								dataIndex: 'profit',
								width: 131,
								sorter: (prev, next) => _handleSort(prev, next, 'profit'),
								render: (value) => <DecimalNumber data={value} hasSeparator isTolerance/>,
							},
							{
								title: '消費',
								dataIndex: 'bettingAmount',
								width: 106,
								sorter: (prev, next) => _handleSort(prev, next, 'bettingAmount'),
							},
							{
								title: '中奖',
								dataIndex: 'bettingReward',
								width: 161,
								sorter: (prev, next) => _handleSort(prev, next, 'bettingReward'),
								render: (value) => <DecimalNumber data={value} hasSeparator />,
							},
							{
								title: '充值',
								dataIndex: 'depositAmount',
								width: 161,
								sorter: (prev, next) => _handleSort(prev, next, 'depositAmount'),
								render: (value) => <DecimalNumber data={value} hasSeparator />,
							},
							{
								title: '提款',
								dataIndex: 'withdrawalAmount',
								width: 107,
								sorter: (prev, next) => _handleSort(prev, next, 'withdrawalAmount')
							},
							{
								title: '奖励',
								dataIndex: 'encourageAmount',
								width: 107,
								sorter: (prev, next) => _handleSort(prev, next, 'encourageAmount')
							},
							{
								title: '返点',
								dataIndex: 'rebateAmount',
								width: 107,
								sorter: (prev, next) => _handleSort(prev, next, 'rebateAmount')
							},
						]}
					/>
				</div>
			</div>
		);
	}

	componentDidMount() {
		const {
			userData,
			fetchTeamReportsAction,
		} = this.props;

		const userIdOrUsername = userData.id;
		const query = {
			from: convertDateStringToTimestamp(defaultRangeDate[0]),
			to: convertDateStringToTimestamp(defaultRangeDate[1]),
		};

		fetchTeamReportsAction(userIdOrUsername, query);
	}
}

AgentTeamReportPage.propTypes = propTypes;
AgentTeamReportPage.defaultProps = defaultProps;

function mapStateToProps(state) {
	const teamReports = state.myTeam.reports;

	return {
		userData: state.user.get('data').toObject(),
		ancestorsData: teamReports.get('data').get('ancestors').toArray(),
		statsData: teamReports.get('data').get('stats').toArray(),
		loadingStatus: teamReports.get('loadingStatus'),
		loadingStatusMessage: teamReports.get('loadingStatusMessage'),
	};
}
function mapDispatchToProps(dispatch) {
	return {
		fetchTeamReportsAction: (userIdOrUsername, query) => dispatch(fetchTeamReportsAction(userIdOrUsername, query)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(
	withLoadingStatusNotification(
		[
			{
				loadingStatus: 'loadingStatus',
				loadingStatusMessage: 'loadingStatusMessage',
			},
		],
		AgentTeamReportPage)
);
