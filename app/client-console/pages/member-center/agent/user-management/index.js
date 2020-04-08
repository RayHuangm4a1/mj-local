import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'ljit-store-connecter';
import {
	Form,
	FormItem,
	Input,
	InputNumber,
	Button,
	LabelContent,
	TextButton,
	StatusTag,
	IconButton,
	UserBreadcrumb,
	DecimalNumber,
} from 'ljit-react-components';
import FreeTransferButton from './button/free-transfer-button';
import CreateUserButton from './button/create-user-button';
import ChildrenTransferButton from './button/children-transfer-button';
import UserModal from './modal/user-modal';
import EnableTransferModal from './modal/enable-transfer-modal';
import ChildrenTransferModal from './modal/children-transfer-modal';
import { isDateValid, formatDate } from '../../../../../lib/moment-utils';
import { calculateDeltaBonus } from '../../../../../lib/bonus-utils';
import PagerTable from '../../../../components/pager-table';
import { userActions } from '../../../../controller';
import { LoadingStatusEnum } from '../../../../lib/enums';
import { connectObservable, } from 'ljit-observable/react-observable';
import { default as compose } from 'lodash/flowRight';
import { EventEnum, } from '../../../../lib/enums';
import { RouteKeyEnums } from '../../../../route-modals/member-center/routes';
import {
	withLoadingStatusNotification,
	notifications,
} from '../../../../../lib/notify-handler';
import './style.styl';

const { successNotifications, } = notifications;
const { Success, } = successNotifications;
const {
	NONE,
	LOADING,
	SUCCESS,
	FAILED,
} = LoadingStatusEnum;
const { IconTypeEnums, } = IconButton;
const {
	CHART,
	EDIT,
	MONEY_CHANGE,
} = IconTypeEnums;

const PREFIX_CLASS = 'agent-user-management';

const {
	fetchChildrenUsersAction,
	updateChildrenUserAction,
} = userActions;

const propTypes = {
	userData: PropTypes.shape({
		_id: PropTypes.string,
		id: PropTypes.number,
		numOfDescendants: PropTypes.number,
		nickname: PropTypes.string,
		greeting: PropTypes.string,
		status: PropTypes.string,
		username: PropTypes.string,
		type: PropTypes.number,
		parent: PropTypes.string,
		deltaBonus: PropTypes.number,
		bonus: PropTypes.number,
		isOnline: PropTypes.bool,
		// TODO 少了餘額，團隊總餘額，外接遊戲返點，
		ip: PropTypes.string,
		geo: PropTypes.string,
		loginAt: PropTypes.instanceOf(Date),
	}).isRequired,
	platformData: PropTypes.shape({
		_id: PropTypes.string,
		name: PropTypes.string,
		code: PropTypes.string,
		bonus: PropTypes.shape({
			max: PropTypes.number,
			min:  PropTypes.number,
			list: PropTypes.arrayOf(PropTypes.number),
		}),
		couldEqualToPlatformMaxBonus: PropTypes.bool,
		couldEqualToParentBonus: PropTypes.bool,
		rewardMode: PropTypes.string,
		nonPKMaxProfit: PropTypes.number,
		pkMaxProfit: PropTypes.number,
		status: PropTypes.string,
		createdAt: PropTypes.string,
		updatedAt: PropTypes.string,
	}).isRequired,
	childrenUsersData: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		username: PropTypes.string,
		deltaBonus: PropTypes.number,
		wallets: PropTypes.arrayOf(PropTypes.shape({
			code: PropTypes.number,
			balance: PropTypes.number
		})),
		teamStats: PropTypes.shape({
			numOfUsers: PropTypes.number,
			balance: PropTypes.number,
		}),
		loginAt: PropTypes.string,
		isOnline: PropTypes.bool,
		bonus: PropTypes.number,
		createdAt: PropTypes.string,
		// TODO 少了註冊時間/是否在线/會員類型
	})).isRequired,
	ancestorsData: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		username: PropTypes.username,
	})).isRequired,
	page: PropTypes.number.isRequired,
	numOfItems: PropTypes.number.isRequired,
	numOfPages: PropTypes.number.isRequired,
	loadingStatus: PropTypes.number.isRequired,
	loadingStatusMessage: PropTypes.string.isRequired,
	fetchChildrenUsersAction: PropTypes.func.isRequired,
	updateChildrenUserAction: PropTypes.func.isRequired,
	norifySuccessfulMessage: PropTypes.func.isRequired,
	notifyErrorMessage: PropTypes.func.isRequired,
	notifyToChangeModalRoute: PropTypes.func.isRequired,
	createLoadingStatus: PropTypes.oneOf([NONE, LOADING, SUCCESS, FAILED,]).isRequired,
	updateChildrenUserLoadingStatus: PropTypes.oneOf([NONE, LOADING, SUCCESS, FAILED,]).isRequired,
	notifyHandlingAction: PropTypes.func.isRequired,
};
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
// TODO: 待確認拉回來的資料每頁是否為10筆

class AgentUserManagementPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentChildrenUsername: 0,
			isUserModalVisible: false,
			editingChildrenUser: {},
			transferingUsername: '',
			query: {
				bonus: undefined,
				minBalance: undefined,
				maxBalance: undefined,
				page: props.page,
			},
			// GET is enable transfer in userData
			isEnableTransfer: false,
			isEnableTransferModalVisible: false,
			isChildrenTransferModalVisible: false,
		};

		this._handleSearch = this._handleSearch.bind(this);
		this._handleClickUsername = this._handleClickUsername.bind(this);
		this._handleChangeUsername = this._handleChangeUsername.bind(this);
		this._handleChangeTable = this._handleChangeTable.bind(this);
		this._handleOpenUserModal = this._handleOpenUserModal.bind(this);
		this._handleCloseUserModal = this._handleCloseUserModal.bind(this);
		this._handlePostEditingUser = this._handlePostEditingUser.bind(this);
		this._handleClickUserTransfer = this._handleClickUserTransfer.bind(this);
		this._handleEnableTransfer = this._handleEnableTransfer.bind(this);
		this._handleCloselEnableTransferModal = this._handleCloselEnableTransferModal.bind(this);
		this._handleDisableTransfer = this._handleDisableTransfer.bind(this);
		this._handlePostChildrenTransfer = this._handlePostChildrenTransfer.bind(this);
		this._handleCloseChildrenTransferModal = this._handleCloseChildrenTransferModal.bind(this);
		this._handleShowNotification = this._handleShowNotification.bind(this);
		this._handleClickChart = this._handleClickChart.bind(this);
		this._renderButtons = this._renderButtons.bind(this);
	}

	_handleSearch() {
		const form = this.formInstance.getForm();
		const { query } = this.state;
		const { userData, platformData, fetchChildrenUsersAction } = this.props;
		const platformMaxBonus = platformData.bonus.max;

		form.validateFields((error, values) => {
			if (!error) {
				const { username, bonus, minBalance, maxBalance } = values;
				const deltaBonus = typeof bonus === 'number' ? calculateDeltaBonus(platformMaxBonus, bonus) : undefined;
				const user = username && username.length > 0 ? username : userData.username;
				const queryParams = {
					deltaBonus,
					minBalance,
					maxBalance,
					page: query.page,
				};

				fetchChildrenUsersAction(user, queryParams);

				this.setState({
					query: queryParams,
					currentChildrenUsername: user
				});
			}
		});
	}

	_handleClickUsername(user) {
		const { fetchChildrenUsersAction } = this.props;
		const { currentChildrenUsername, query } = this.state;
		const { id, username } = user;
		const page = DEFAULT_PAGE;
		const queryParams = {
			...query,
			page,
		};

		this._handleChangeUsername(username);

		if (username !== currentChildrenUsername) {
			fetchChildrenUsersAction(id, queryParams);

			this.setState({
				currentChildrenUsername: username,
				query: queryParams,
			});
		}
	}
	_handleChangeUsername(value) {
		const form = this.formInstance.getForm();

		form.setFieldsValue({ username: value });
	}

	_handleChangeTable(pagination, filters, sorter) {
		// TODO sort, order
		const { currentChildrenUsername, query } = this.state;
		const { fetchChildrenUsersAction } = this.props;
		const page = pagination ? pagination.current : DEFAULT_PAGE;

		let { columnKey = '', order = '' } = sorter;

		if (columnKey === 'teamStats.balance') {
			columnKey = 'teamBalance';
		} else if (columnKey === 'teamStats.numOfUsers') {
			columnKey = 'numOfUsers';
		} else if (columnKey === 'wallets[0].balance') {
			columnKey = 'balance';
		} else if (columnKey === 'bonus') {
			columnKey = 'deltaBonus';
		}

		order = order.replace('end', '');

		const queryParams = {
			...query,
			page,
			order,
			sort: columnKey,
		};

		fetchChildrenUsersAction(currentChildrenUsername, queryParams);

		this.setState({ query: queryParams });
	}

	_handleOpenUserModal(editingChildrenUser = {}) {
		this.setState({
			isUserModalVisible: true,
			editingChildrenUser,
		});
	}
	_handlePostEditingUser({ childrenId, isAgent, bonus, }) {
		const { updateChildrenUserAction } = this.props;

		updateChildrenUserAction(childrenId, isAgent, bonus);
		this.setState({
			editingChildrenUser: {},
		});
		this._handleCloseUserModal();
	}
	_handleClickChart() {
		// TODO go to chart content
		const { notifyToChangeModalRoute } = this.props;

		notifyToChangeModalRoute(RouteKeyEnums.AGENT_MANAGEMENT_STATISTICS);
	}
	_handleCloseUserModal() {
		this.setState({
			isUserModalVisible: false,
		});
	}

	_handleClickUserTransfer(userData = {}) {
		if (this.state.isEnableTransfer) {
			this.setState({
				isChildrenTransferModalVisible: true,
				transferingUsername: userData.username,
			});
		} else {
			this.setState({
				isEnableTransferModalVisible: true,
			});
		}
	}
	_handleEnableTransfer(value) {
		// TODO post data
		console.log(value);
		this._handleCloselEnableTransferModal();
		this.setState({ isEnableTransfer: true });
		this._handleShowNotification();
	}
	_handleCloselEnableTransferModal() {
		this.setState({
			isEnableTransferModalVisible: false,
		});
	}
	_handleDisableTransfer() {
		// TODO shut down open transfer
		console.log('shut down transfer');
	}
	_handleShowNotification() {
		this.props.notifyHandlingAction(new Success('转帐功能已开通'));
	}
	_handlePostChildrenTransfer(value) {
		// TODO POST data
		console.log(value);
		this._handleCloseChildrenTransferModal();
	}
	_handleCloseChildrenTransferModal() {
		this.setState({
			isChildrenTransferModalVisible: false,
		});
	}
	_renderButtons() {
		const { _handleShowNotification, } = this;
		const { userData = {}, platformData } = this.props;
		// TODO 確認下級轉帳按鈕消失的判斷
		const isShowingChildrenTransferButton =  userData.numOfDescendants > 0;
		const { statuses = {} } = userData;
		const { isTransferable } = statuses;
		const createModalBonusOptions = getCreateBonus(userData.bonus, platformData).map(bonus => ({ label: bonus, value: bonus, }));

		return (
			<div className={`${PREFIX_CLASS}__header-right`}>
				{isTransferable ? <FreeTransferButton/> : null}
				{isShowingChildrenTransferButton ? <ChildrenTransferButton onNotify={_handleShowNotification}/> : null}
				<CreateUserButton
					bonusOptions={createModalBonusOptions}
				/>
			</div>
		);
	}

	render() {
		const {
			_handleSearch,
			_handlePostEditingUser,
			_handleClickUsername,
			_handleChangeTable,
			_handleOpenUserModal,
			_handleCloseUserModal,
			_handleClickChart,
			_handleClickUserTransfer,
			_renderButtons,
			_handleEnableTransfer,
			_handleCloselEnableTransferModal,
			_handlePostChildrenTransfer,
			_handleCloseChildrenTransferModal,
			_handleDisableTransfer,
		} = this;
		const {
			userData,
			childrenUsersData,
			ancestorsData,
			platformData,
			loadingStatus,
			numOfItems,
		} = this.props;
		const {
			isUserModalVisible,
			editingChildrenUser,
			query,
			isEnableTransferModalVisible,
			isChildrenTransferModalVisible,
			transferingUsername,
		} = this.state;
		const createModalBonusOptions = getCreateBonus(userData.bonus, platformData);
		const editModalBonusOptions = getEditBonus(editingChildrenUser.bonus, createModalBonusOptions).map(bonus => ({ label: bonus, value: bonus, }));

		return (
			<div className={PREFIX_CLASS}>
				<div className={`${PREFIX_CLASS}__header`}>
					<Form
						cancelButtonDisabled
						submitButtonDisabled
						ref={(refForm) => this.formInstance = refForm}
					>
						<FormItem
							itemName="username"
							label="会员名"
							labelColon={false}
						>
							<Input
								placeholder="输入会员名"
								onChange={e => this._handleChangeUsername(e.target.value)}
							/>
						</FormItem>
						<FormItem
							itemName="bonus"
							label="奖金号"
							labelColon={false}
						>
							<InputNumber
								placeholder="输入奖金号"
							/>
						</FormItem>
						<FormItem
							itemName="minBalance"
							label="余额"
							labelColon={false}
						>
							<InputNumber
								placeholder="最小余额"
							/>
						</FormItem>
							至
						<FormItem
							itemName="maxBalance"
						>
							<InputNumber
								placeholder="最大余额"
							/>
						</FormItem>
						<Button
							outline={Button.OutlineEnums.SOLID}
							onClick={_handleSearch}
							color={Button.ColorEnums.ORANGE}
						>
							查询
						</Button>
					</Form>
					{_renderButtons()}
				</div>
				<div className={`${PREFIX_CLASS}__body`}>
					<LabelContent
						label="会员层级"
					>
						<UserBreadcrumb
							data={ancestorsData}
							targetKey="username"
							separator="/"
							onClickUser={_handleClickUsername}
							isShowingCurrentCount={false}
						/>
					</LabelContent>
					<PagerTable
						isLoading={loadingStatus === LOADING}
						rowKey="id"
						dataSource={childrenUsersData}
						size={PagerTable.SizeEnums.SMALL}
						columns={[
							{
								title: '会员名',
								dataIndex: 'username',
								width: 77,
								render: (value, record,) => {
									return (
										<TextButton
											onClick={() => _handleClickUsername(record)}
											text={value}
										/>
									);
								}
							},
							{
								title: '奖金号',
								dataIndex: 'bonus',
								width: 88,
								sorter: () => 0
							},
							{
								title: '团队总人数',
								dataIndex: 'teamStats.numOfUsers',
								width: 120,
								sorter: () => 0
							},
							{
								title: '余额',
								dataIndex: 'wallets[0].balance',
								width: 72,
								sorter: () => 0,
								render: (value) => <DecimalNumber data={value} hasSeparator/>,
							},
							{
								title: '团队总余额',
								dataIndex: 'teamStats.balance',
								width: 120,
								sorter: () => 0
							},
							{
								title: '注册时间',
								dataIndex: 'createdAt',
								width: 164,
								sorter: () => 0,
								render: (value) => isDateValid(value) ? formatDate(value) : '-'
							},
							{
								title: '最后登录时间',
								width: 164,
								dataIndex: 'loginAt',
								sorter: () => 0,
								render: (value) => isDateValid(value) ? formatDate(value) : '-'
							},
							{
								title: '是否在线',
								// TODO get value when data schema is ok
								dataIndex: 'isOnline',
								width: 94,
								render: (isOnline) => (
									<StatusTag
										tagType={StatusTag.TagTypeEnums.HOLLOW}
										status={isOnline ? StatusTag.StatusEnums.SUCCESS : StatusTag.StatusEnums.LOSE}
										text={isOnline ? '在线' : '离线'}
									/>
								),
							},
							{
								title: '操作',
								dataIndex: 'operation',
								width: 101,
								render: (value, record) => {
									if (record.id !== userData.id) {
										return (
											<React.Fragment>
												<IconButton
													type={EDIT}
													onClick={() => _handleOpenUserModal(record)}
												/>
												<IconButton
													type={MONEY_CHANGE}
													onClick={() => _handleClickUserTransfer(record)}
												/>
												<IconButton
													type={CHART}
													onClick={() => _handleClickChart(record)}
												/>
											</React.Fragment>
										);
									} else {
										return (
											<IconButton
												type={CHART}
												onClick={() => _handleClickChart(record)}
											/>
										);
									}
								},
							}
						]}
						paginationProps={{
							current: query.page,
							pageSize: DEFAULT_PAGE_SIZE,
							total: numOfItems,
						}}
						onTableChange={_handleChangeTable}
					/>
				</div>
				<UserModal
					isEditing={true}
					className={`${PREFIX_CLASS}__modal`}
					isVisible={isUserModalVisible}
					editingUser={editingChildrenUser}
					onEditUser={_handlePostEditingUser}
					onCancel={_handleCloseUserModal}
					bonusOptions={editModalBonusOptions}
				/>
				<EnableTransferModal
					isVisible={isEnableTransferModalVisible}
					onClickOk={_handleEnableTransfer}
					onClickCancel={_handleCloselEnableTransferModal}
					className={`${PREFIX_CLASS}__modal`}
				/>
				<ChildrenTransferModal
					title={"会员转帐"}
					username={transferingUsername}
					isVisible={isChildrenTransferModalVisible}
					className={`${PREFIX_CLASS}__modal`}
					onClickOk={_handlePostChildrenTransfer}
					onClickCancel={_handleCloseChildrenTransferModal}
					onDisableTransfer={_handleDisableTransfer}
					transferTime={(new Date()).toString()}
				/>
			</div>
		);
	}

	componentDidMount() {
		const {
			userData,
			fetchChildrenUsersAction,
		} = this.props;
		const { id, username } = userData;
		const { query } = this.state;

		fetchChildrenUsersAction(id, query);
		this.setState({ currentChildrenUsername: username });
	}

	componentDidUpdate(prevProps) {
		const {
			createLoadingStatus,
			userData,
			fetchChildrenUsersAction,
			updateChildrenUserLoadingStatus,
			notifyHandlingAction,
		} = this.props;

		if (prevProps.createLoadingStatus === LOADING && createLoadingStatus === SUCCESS) {
			const { query, } = this.state;

			this.setState({
				query: {
					...query,
					page: DEFAULT_PAGE,
				}
			});

			fetchChildrenUsersAction(userData.username, { page: DEFAULT_PAGE, });
		}

		if (prevProps.updateChildrenUserLoadingStatus === LOADING && updateChildrenUserLoadingStatus === SUCCESS) {
			notifyHandlingAction(new Success('修改会员成功'));
		}
	}
}

AgentUserManagementPage.propTypes = propTypes;

function mapStateToProps(state) {
	const data = state.childrenUsers.get('data').toObject();

	return {
		platformData: state.platform.get('data').toObject(),
		userData: state.user.get('data').toObject(),
		childrenUsersData: data.children.toArray(),
		ancestorsData: data.ancestors.toArray(),
		page: data.page,
		numOfItems: data.numOfItems,
		numOfPages: data.numOfPages,
		loadingStatus: state.childrenUsers.get('loadingStatus'),
		loadingStatusMessage: state.childrenUsers.get('loadingStatusMessage'),
		createLoadingStatus: state.childrenUsers.get('createLoadingStatus'),
		updateChildrenUserLoadingStatus: state.childrenUsers.get('updateChildrenUserLoadingStatus'),
		updateChildrenUserLoadingStatusMessage: state.childrenUsers.get('updateChildrenUserLoadingStatusMessage'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchChildrenUsersAction: (userIdOrUsername, query) => dispatch(fetchChildrenUsersAction(userIdOrUsername, query)),
		updateChildrenUserAction: (childrenId, isAgent, bonus) => dispatch(updateChildrenUserAction(childrenId, isAgent, bonus)),
	};
}

function mapNotifyToProps(notify) {
	return {
		notifyToChangeModalRoute: (data) => {
			return notify(
				EventEnum.CHANGE_MEMBER_CENTER_ROUTE,
				data,
			);
		}
	};
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	connectObservable(mapNotifyToProps),
)(withLoadingStatusNotification(
	[
		{
			loadingStatus: 'loadingStatus',
			loadingStatusMessage: 'loadingStatusMessage',
		},
		{
			loadingStatus: 'updateChildrenUserLoadingStatus',
			loadingStatusMessage: 'updateChildrenUserLoadingStatusMessage',
		}
	],
	AgentUserManagementPage)
);

function getCreateBonus(userBonus, platformData) {
	const { couldEqualToParentBonus, bonus, } = platformData;
	const { list, } = bonus;

	if (couldEqualToParentBonus) {
		return list;
	} else {
		return list.filter(bonus => bonus < userBonus);
	}
}

function getEditBonus(childBonus, CreateBonusArray = []) {
	return CreateBonusArray.filter((bonus) => bonus >= childBonus);
}
