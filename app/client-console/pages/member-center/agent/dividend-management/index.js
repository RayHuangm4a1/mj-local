import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Input,
	Button,
	IconButton,
	DecimalNumber,
} from 'ljit-react-components';
import PagerTable from '../../../../components/pager-table';
import SelectDropdown from '../../../../components/select-dropdown';
import { connect, } from 'ljit-store-connecter';
import DistributionDividendModal from './distribution-dividend-modal';
import DividendEditingModal from './dividend-editing-modal';
import DividendTemplateEditingModal from './dividend-template-editing-modal';
import MyDividendModal from './my-dividend-modal';
import { formatDate, DATE, } from '../../../../../lib/moment-utils';
import { DividendStatusEnums } from '../../../../lib/enums';
import { dataAmountMultiplyTenThousand, dataAmountDividedTenThousand } from '../../../../../lib/dividend-utils';
import { dividendManagementActions, } from '../../../../controller';
import { LoadingStatusEnum, } from '../../../../lib/enums';
import {
	withLoadingStatusNotification,
	notifications,
} from '../../../../../lib/notify-handler';
import './style.styl';

const { successNotifications, } = notifications;
const { Success, } = successNotifications;
const {
	NOT_SET,
	NOT_QUALIFIED,
	NOT_GRANTED,
	PARTIAL_GRANTED,
	FULL_GRANTED,
	TEAM_WIN,
} = DividendStatusEnums;
const {
	fetchDividendsAction,
	fetchDividendDurationsAction,
	fetchDividendSettingsSelfAction,
	fetchDividendSettingsTemplateAction,
	updateDividendSettingsTemplateAction,
	updateChildrenDividendSettingsAction,
	grantDividendAction,
} = dividendManagementActions;
const { NONE ,LOADING, SUCCESS, FAILED } = LoadingStatusEnum;

const propTypes = {
	durationsData: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			startedAt: PropTypes.string,
			closedAt: PropTypes.string,
		})
	),
	usersData: PropTypes.array,
	selfData: PropTypes.array,
	templateData: PropTypes.array,
	walletsData: PropTypes.object,
	usedWalletData: PropTypes.object,
	dividendsLoadingStatus: PropTypes.oneOf([ NONE ,LOADING, SUCCESS, FAILED,]).isRequired,
	dividendsLoadingStatusMessage: PropTypes.string.isRequired,
	durationsLoadingStatus: PropTypes.oneOf([ NONE ,LOADING, SUCCESS, FAILED,]).isRequired,
	durationsLoadingStatusMessage: PropTypes.string.isRequired,
	selfLoadingStatus: PropTypes.oneOf([ NONE ,LOADING, SUCCESS, FAILED,]).isRequired,
	selfLoadingStatusMessage: PropTypes.string.isRequired,
	templateLoadingStatus: PropTypes.oneOf([ NONE ,LOADING, SUCCESS, FAILED,]).isRequired,
	templateLoadingStatusMessage: PropTypes.string.isRequired,
	updateTemplateLoadingStatus: PropTypes.oneOf([ NONE ,LOADING, SUCCESS, FAILED,]).isRequired,
	updateTemplateLoadingStatusMessage: PropTypes.string.isRequired,
	updateChildrenDividendSettingsLoadingStatus: PropTypes.oneOf([ NONE ,LOADING, SUCCESS, FAILED,]).isRequired,
	updateChildrenDividendSettingsLoadingStatusMessage: PropTypes.string.isRequired,
	grantDividendLoadingStatus: PropTypes.oneOf([ NONE ,LOADING, SUCCESS, FAILED,]).isRequired,
	grantDividendLoadingStatusMessage: PropTypes.string.isRequired,
	fetchDividendsAction: PropTypes.func.isRequired,
	fetchDividendDurationsAction: PropTypes.func.isRequired,
	fetchDividendSettingsSelfAction: PropTypes.func.isRequired,
	fetchDividendSettingsTemplateAction: PropTypes.func.isRequired,
	updateDividendSettingsTemplateAction: PropTypes.func.isRequired,
	updateChildrenDividendSettingsAction: PropTypes.func.isRequired,
	notifySuccessfulMessage: PropTypes.func.isRequired,
	numOfItems: PropTypes.number,
	numOfPages: PropTypes.number,
	platformBonus: PropTypes.number,
	grantDividendAction: PropTypes.func.isRequired,
	notifyHandlingAction: PropTypes.func.isRequired,
};
const defaultProps = {
	durationsData: [],
	usersData: [],
	selfData: [],
	templateData: [],
	walletsData: {},
	usedWalletData: {},
};

const {
	LARGE,
} = IconButton.SizeEnums;

const {
	EDIT,
	DIVIDEND,
} = IconButton.IconTypeEnums;

const ReleaseStatusOptions = [
	{
		label: '全部',
		value: null,
	},
	{
		label: '未设置',
		value: NOT_SET,
	},
	{
		label: '未达标',
		value: NOT_QUALIFIED,
	},
	{
		label: '未发放',
		value: NOT_GRANTED,
	},
	{
		label: '部分发放',
		value: PARTIAL_GRANTED,
	},
	{
		label: '全部发放',
		value: FULL_GRANTED,
	},
];

const PREVIOUS_DURARIONS = 3;
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 8;

// TODO use client-button in all button component
class MemberDividendManagementPage extends Component {
	constructor() {
		super();
		this.state = {
			durationsDataOptions: [],
			pagination: {
				pageSize: DEFAULT_PAGE_SIZE,
			},
			queries: {
				page: DEFAULT_PAGE,
				limit: DEFAULT_PAGE_SIZE,
			},
			searchUsername: '',
			durationsDataValue: '',
			releaseStatusValue: null,
			isDistributionDividendModalVisible: false,
			isSettingDividendModalVisible: false,
			isSettingDividendTemplateModalVisible: false,
			isMyDividendModalVisible: false,
			selectedUserIndex: 0,
		};
		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleChangeTable = this._handleChangeTable.bind(this);
		this._handleChangeDurationsDataValue = this._handleChangeDurationsDataValue.bind(this);
		this._handleChangeSearchUsername = this._handleChangeSearchUsername.bind(this);
		this._handleChangeReleaseStatusValue = this._handleChangeReleaseStatusValue.bind(this);
		this._handleToggleMyDividendModalVisible = this._handleToggleMyDividendModalVisible.bind(this);
		this._handleToggleSettingDividendTemplateModalVisible = this._handleToggleSettingDividendTemplateModalVisible.bind(this);
		this._handleSaveSettingDividendTemplate = this._handleSaveSettingDividendTemplate.bind(this);
		this._handelToggleDistributionDividendModalVisible = this._handelToggleDistributionDividendModalVisible.bind(this);
		this._handleToggleSettingDividendModalVisible = this._handleToggleSettingDividendModalVisible.bind(this);
		this._handleSaveDividendSetting = this._handleSaveDividendSetting.bind(this);
		this._handleSelectUser = this._handleSelectUser.bind(this);
		this._handleGrantDividends = this._handleGrantDividends.bind(this);
		this._renderIcon = this._renderIcon.bind(this);
	}
	_handleSubmit() {
		const { fetchDividendsAction } = this.props;
		const {
			durationsDataValue,
			searchUsername,
			releaseStatusValue,
			pagination
		} = this.state;
		const queries = {
			durationId: durationsDataValue,
			username: searchUsername,
			status: releaseStatusValue,
			page: DEFAULT_PAGE,
			limit: DEFAULT_PAGE_SIZE,
		};

		fetchDividendsAction(queries);
		this.setState({
			queries,
			pagination: Object.assign({}, pagination, { current: DEFAULT_PAGE })
		});
	}
	_handleChangeTable(pagination, filters, sorter) {
		const { fetchDividendsAction } = this.props;
		const { queries, pagination: prevPagination } = this.state;
		const { order = '', field = '' } = sorter;

		let current;

		let sort = '';

		if (pagination.current === prevPagination.current) {
			current = DEFAULT_PAGE;
			pagination.current = DEFAULT_PAGE;
		} else {
			current = pagination.current;
		}

		if (field.includes('.')) {
			const index = field.indexOf('.') + 1;
			const length = field.length;

			sort = field.slice(index, length);
		} else {
			sort = field;
		}
		const newQueries = {
			...queries,
			order: order.replace('end',''),
			sort,
			page: current,
		};

		fetchDividendsAction(newQueries);
		this.setState({
			queries: newQueries,
			pagination
		});
	}
	_handleChangeDurationsDataValue(value) {
		this.setState({
			durationsDataValue: value,
		});
	}
	_handleChangeSearchUsername (event) {
		this.setState({
			searchUsername: event.target.value
		});
	}
	_handleChangeReleaseStatusValue(value) {
		this.setState({
			releaseStatusValue: value,
		});
	}
	_handleToggleMyDividendModalVisible() {
		this.setState({
			isMyDividendModalVisible: !this.state.isMyDividendModalVisible,
		});
	}
	_handleToggleSettingDividendTemplateModalVisible() {
		this.setState({
			isSettingDividendTemplateModalVisible: !this.state.isSettingDividendTemplateModalVisible,
		});
	}
	_handleSaveSettingDividendTemplate(template = []) {
		const { updateDividendSettingsTemplateAction, } = this.props;
		const updatedTemplate = template.map(dataAmountMultiplyTenThousand);

		updateDividendSettingsTemplateAction(updatedTemplate);
	}
	_handelToggleDistributionDividendModalVisible() {
		this.setState({
			isDistributionDividendModalVisible: !this.state.isDistributionDividendModalVisible,
		});
	}
	_handleToggleSettingDividendModalVisible() {
		this.setState({
			isSettingDividendModalVisible: !this.state.isSettingDividendModalVisible,
		});
	}
	_handleSaveDividendSetting(dividendSettings = []) {
		const {
			props,
			state,
		} = this;
		const {
			updateChildrenDividendSettingsAction,
			usersData,
		} = props;
		const updatedDividendSettings = dividendSettings.map(dataAmountMultiplyTenThousand);

		updateChildrenDividendSettingsAction(usersData[state.selectedUserIndex].id, updatedDividendSettings);
	}
	_handleSelectUser(index = 0) {
		this.setState({ selectedUserIndex: index, });
	}
	_handleGrantDividends(userId, selectedWalletId, actualDividendValue, password) {
		const { grantDividendAction } = this.props;

		grantDividendAction(userId, selectedWalletId, actualDividendValue, password);
	}
	_renderIcon(value, record, index) {
		const {
			_handelToggleDistributionDividendModalVisible,
			_handleToggleSettingDividendModalVisible,
			_handleSelectUser,
		} = this;
		const {
			teamDurationStats,
		} = value;
		const { status, durationId } = teamDurationStats[0];
		const isCompliance = (
			durationId === PREVIOUS_DURARIONS &&
			(status === NOT_GRANTED || status === PARTIAL_GRANTED)
		);

		return (
			<React.Fragment>
				<IconButton
					type={EDIT}
					size={LARGE}
					onClick={() => {
						_handleToggleSettingDividendModalVisible();
						_handleSelectUser(index);
					}}
				/>
				{
					isCompliance ?
						<IconButton
							type={DIVIDEND}
							size={LARGE}
							onClick={() => {
								_handelToggleDistributionDividendModalVisible();
								_handleSelectUser(index);
							}}
						/>: null
				}
			</React.Fragment>
		);
	}
	render() {
		const {
			props,
			state,
			_handleChangeSearchUsername,
			_handleChangeDurationsDataValue,
			_handleChangeReleaseStatusValue,
			_handelToggleDistributionDividendModalVisible,
			_handleToggleSettingDividendModalVisible,
			_handleToggleSettingDividendTemplateModalVisible,
			_handleSaveSettingDividendTemplate,
			_handleToggleMyDividendModalVisible,
			_handleSaveDividendSetting,
			_renderIcon,
			_handleSubmit,
			_handleChangeTable,
			_handleGrantDividends,
		} = this;
		const {
			durationsDataOptions,
			searchUsername,
			durationsDataValue,
			releaseStatusValue,
			isDistributionDividendModalVisible,
			isSettingDividendModalVisible,
			isSettingDividendTemplateModalVisible,
			isMyDividendModalVisible,
			selectedUserIndex,
			pagination,
		} = state;
		const {
			usersData,
			selfData,
			walletsData,
			usedWalletData,
			selfLoadingStatus,
			templateData,
			templateLoadingStatus,
			dividendsLoadingStatus,
			numOfItems,
			platformBonus,
		} = props;

		const userData = usersData[selectedUserIndex] || {};

		return (
			<div className="ljit-dividend-management">
				<div className="ljit-dividend-management__title-bar">
					<div className="ljit-dividend-management__dividend-cycle">
						<span>分紅週期</span>
						<SelectDropdown
							value={durationsDataValue}
							options={durationsDataOptions}
							onChange={_handleChangeDurationsDataValue}
						/>
					</div >
					<div className="ljit-dividend-management__member-name">
						<span>会员名</span>
						<Input
							placeholder="输入会员名"
							value={searchUsername}
							onChange={_handleChangeSearchUsername}
						/>
					</div>
					<div className="ljit-dividend-management__release-status">
						<span>发放状态</span>
						<SelectDropdown
							value={releaseStatusValue}
							options={ReleaseStatusOptions}
							onChange={_handleChangeReleaseStatusValue}
						/>
					</div>
					<Button
						outline={Button.OutlineEnums.SOLID}
						color={Button.ColorEnums.ORANGE}
						onClick={_handleSubmit}
					>查询</Button>
					<div className="ljit-dividend-management__title-button-group">
						<Button
							outline={Button.OutlineEnums.HOLLOW}
							color={Button.ColorEnums.ORANGE}
							onClick={_handleToggleMyDividendModalVisible}
							disabled={templateData.length === 0 && templateLoadingStatus !== SUCCESS}
						>我的</Button>
						<Button
							outline={Button.OutlineEnums.HOLLOW}
							color={Button.ColorEnums.ORANGE}
							onClick={_handleToggleSettingDividendTemplateModalVisible}
							disabled={selfData.length === 0 && selfLoadingStatus !== SUCCESS}
						>模板</Button>
					</div>
				</div>
				<PagerTable
					rowKey="id"
					dataSource={usersData}
					isLoading={dividendsLoadingStatus === LOADING}
					columns={[
						{
							dataIndex: 'username',
							title: '会员名',
							width: 65,
						},
						{
							dataIndex: 'deltaBonus',
							title: '奖金号',
							width: 82,
							sorter: () => 0,
							render: (value) => platformBonus + value
						},
						{
							dataIndex: 'teamStats.numOfUsers',
							title: '团队总人数',
							width: 111,
							sorter: () => 0,
						},
						{
							dataIndex: 'wallets[0].balance',
							title: '余额',
							width: 101,
							sorter: () => 0,
							render: (value) => <DecimalNumber data={value} hasSeparator/>,
						},
						{
							dataIndex: 'teamStats.teamBalance',
							title: '团队总余额',
							width: 111,
							sorter: () => 0,
							render: (value) => <DecimalNumber data={value} hasSeparator/>,
						},
						{
							dataIndex: 'teamDurationStats[0].bettingAmount',
							title: '周期总量',
							width: 101,
							sorter: () => 0,
							render: (value) => <DecimalNumber data={value} hasSeparator/>,
						},
						{
							dataIndex: 'teamDurationStats[0].status',
							title: '达标比例',
							render: (value, record) => {
								if (value === TEAM_WIN) {
									const { dividendSettings, teamDurationStats } = record;
									const bettingAmount = teamDurationStats[0].bettingAmount;
									const dividendSetting = dividendSettings.filter((dividend, index, array) => {
										const prevAmount = array[index - 1] ? array[index - 1].amount : 0;
										const amount = dividend.amount;

										return (prevAmount <= bettingAmount && amount > bettingAmount);
									});

									return `${dividendSetting[0].ratio}%`;
								}
								const option = ReleaseStatusOptions.filter(item => item.value === value)[0];

								return option ? option.label : '';
							},
							width: 75,
						},
						{
							dataIndex: 'teamDurationStats[0].profit',
							title: '团队盈亏',
							width: 97,
							sorter: () => 0,
						},
						{
							dataIndex: 'teamDurationStats[0].maxGrantAmount',
							title: '应发分红',
							width: 97,
							sorter: () => 0,
						},
						{
							dataIndex: 'teamDurationStats[0].grantedAmount',
							title: '实发分红',
							width: 97,
							sorter: () => 0,
						},
						{
							title: '操作',
							width: 60,
							render: (value, record, index) => _renderIcon(value, record, index),
						},
					]}
					hasPagination
					paginationProps={{
						...pagination,
						total: numOfItems,
					}}
					onTableChange={_handleChangeTable}
				/>
				<DistributionDividendModal
					isVisible={isDistributionDividendModalVisible}
					onToggleModal={_handelToggleDistributionDividendModalVisible}
					target={userData}
					walletsData={walletsData}
					usedWalletData={usedWalletData}
					onSubmit={_handleGrantDividends}
				/>
				<DividendEditingModal
					isVisible={isSettingDividendModalVisible}
					onToggleModal={_handleToggleSettingDividendModalVisible}
					onSaveSetting={_handleSaveDividendSetting}
					usersName={userData.username}
					dividends={userData.dividendSettings || []}
					dividendTemplate={templateData}
				/>
				<DividendTemplateEditingModal
					isVisible={isSettingDividendTemplateModalVisible}
					onSaveTemplate={_handleSaveSettingDividendTemplate}
					onToggleModal={_handleToggleSettingDividendTemplateModalVisible}
					isDividendSetting={false}
					dividendTemplate={templateData}
				/>
				<MyDividendModal
					isVisible={isMyDividendModalVisible}
					onToggleModal={_handleToggleMyDividendModalVisible}
					dividends={selfData}
				/>
			</div>
		);
	}
	componentDidMount() {
		const {
			fetchDividendsAction,
			fetchDividendDurationsAction,
			fetchDividendSettingsSelfAction,
			fetchDividendSettingsTemplateAction,
		} = this.props;
		const {
			queries
		} = this.state;

		fetchDividendsAction(queries);
		fetchDividendDurationsAction();
		fetchDividendSettingsSelfAction();
		fetchDividendSettingsTemplateAction();
	}

	componentDidUpdate(prevProps) {
		const {
			durationsData,
			durationsLoadingStatus,
			updateTemplateLoadingStatus,
			updateChildrenDividendSettingsLoadingStatus,
			grantDividendLoadingStatus,
			fetchDividendsAction,
			notifyHandlingAction,
		} = this.props;
		const {
			durationsLoadingStatus: prevDurationsLoadingStatus,
			updateTemplateLoadingStatus: prevUpdateTemplateLoadingStatus,
			updateChildrenDividendSettingsLoadingStatus: prevUpdateChildrenDividendSettingsLoadingStatus,
			grantDividendLoadingStatus: prevGrantDividendLoadingStatus,
		} = prevProps;
		const { _handelToggleDistributionDividendModalVisible } = this;
		const {
			queries
		} = this.state;

		if (prevDurationsLoadingStatus === LOADING) {
			if (durationsLoadingStatus === SUCCESS
				&& durationsData.length > 0
			) {
				const durationsDataOptions = durationsData.map((item, index) => {
					const durationContents = ['当前周期', '上一周期', '上二周期', '上三周期'];

					return {
						label: `${durationContents[index]} ${formatDate(item.startedAt, DATE)} - ${formatDate(item.closedAt, DATE)}`,
						value: item.id,
					};
				});

				this.setState({
					durationsDataOptions,
					durationsDataValue: durationsDataOptions[0].value,
				});
			}
		}

		if (prevUpdateTemplateLoadingStatus === LOADING && updateTemplateLoadingStatus === SUCCESS) {
			notifyHandlingAction(new Success('分红模板设定成功'));
		}
		if (prevUpdateChildrenDividendSettingsLoadingStatus === LOADING && updateChildrenDividendSettingsLoadingStatus === SUCCESS) {
			notifyHandlingAction(new Success('直属分红设定成功'));
			fetchDividendsAction(queries);
		}
		if (prevGrantDividendLoadingStatus === LOADING && grantDividendLoadingStatus === SUCCESS) {
			notifyHandlingAction(new Success('发放分红成功'));
			_handelToggleDistributionDividendModalVisible();
		}
	}
}

MemberDividendManagementPage.propTypes = propTypes;
MemberDividendManagementPage.defaultProps = defaultProps;


function mapStateToProps(state) {
	const selfData = state.dividendManagement.get('selfData').toArray().map(dataAmountDividedTenThousand);  //UI show ten thousand
	const templateData = state.dividendManagement.get('templateData').toArray().map(dataAmountDividedTenThousand);  //UI show ten thousand

	return {
		durationsData: state.dividendManagement.get('durationsData').toArray(),
		usersData: state.dividendManagement.get('data').toArray(),
		selfData,
		templateData,
		walletsData: state.wallets.get('data').toObject(),
		usedWalletData: state.wallets.get('usedWalletData').toObject(),
		dividendsLoadingStatus: state.dividendManagement.get('loadingStatus'),
		dividendsLoadingStatusMessage: state.dividendManagement.get('loadingStatusMessage'),
		durationsLoadingStatus: state.dividendManagement.get('durationsLoadingStatus'),
		durationsLoadingStatusMessage: state.dividendManagement.get('durationsLoadingStatusMessage'),
		selfLoadingStatus: state.dividendManagement.get('selfLoadingStatus'),
		selfLoadingStatusMessage: state.dividendManagement.get('selfLoadingStatusMessage'),
		templateLoadingStatus: state.dividendManagement.get('templateLoadingStatus'),
		templateLoadingStatusMessage: state.dividendManagement.get('templateLoadingStatusMessage'),
		updateTemplateLoadingStatus: state.dividendManagement.get('updateTemplateLoadingStatus'),
		updateTemplateLoadingStatusMessage: state.dividendManagement.get('updateTemplateLoadingStatusMessage'),
		updateChildrenDividendSettingsLoadingStatus: state.dividendManagement.get('updateChildrenDividendSettingsLoadingStatus'),
		updateChildrenDividendSettingsLoadingStatusMessage: state.dividendManagement.get('updateChildrenDividendSettingsLoadingStatusMessage'),
		grantDividendLoadingStatus: state.dividendManagement.get('grantDividendLoadingStatus'),
		grantDividendLoadingStatusMessage: state.dividendManagement.get('grantDividendLoadingStatusMessage'),
		numOfItems: state.dividendManagement.get('numOfItems'),
		numOfPages: state.dividendManagement.get('numOfPages'),
		platformBonus: state.platform.get('data').toObject().bonus.max,
	};
}
function mapDispatchToProps(dispatch) {
	return {
		fetchDividendsAction: (query) => dispatch(fetchDividendsAction(query)),
		fetchDividendDurationsAction: () => dispatch(fetchDividendDurationsAction()),
		fetchDividendSettingsSelfAction: (dividendType) => dispatch(fetchDividendSettingsSelfAction(dividendType)),
		fetchDividendSettingsTemplateAction: (dividendType) => dispatch(fetchDividendSettingsTemplateAction(dividendType)),
		updateDividendSettingsTemplateAction: (template) => dispatch(updateDividendSettingsTemplateAction(template)),
		updateChildrenDividendSettingsAction: (childrenId, dividendSettings) => dispatch(updateChildrenDividendSettingsAction(childrenId, dividendSettings)),
		grantDividendAction: (childrenId, walletCode, amount, password) => dispatch(grantDividendAction(childrenId, walletCode, amount, password))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(
	withLoadingStatusNotification(
		[
			{
				loadingStatus: 'dividendsLoadingStatus',
				loadingStatusMessage: 'dividendsLoadingStatusMessage',
			},
			{
				loadingStatus: 'durationsLoadingStatus',
				loadingStatusMessage: 'durationsLoadingStatusMessage',
			},
			{
				loadingStatus: 'selfLoadingStatus',
				loadingStatusMessage: 'selfLoadingStatusMessage',
			},
			{
				loadingStatus: 'templateLoadingStatus',
				loadingStatusMessage: 'templateLoadingStatusMessage',
			},
			{
				loadingStatus: 'updateTemplateLoadingStatus',
				loadingStatusMessage: 'updateTemplateLoadingStatusMessage',
			},
			{
				loadingStatus: 'updateChildrenDividendSettingsLoadingStatus',
				loadingStatusMessage: 'updateChildrenDividendSettingsLoadingStatusMessage',
			},
			{
				loadingStatus: 'grantDividendLoadingStatus',
				loadingStatusMessage: 'grantDividendLoadingStatusMessage',
			}
		],
		MemberDividendManagementPage)
);
