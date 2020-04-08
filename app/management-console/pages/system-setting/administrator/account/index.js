import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	HeaderButtonBar,
	InputSearch,
	Table,
	StatusTag,
	TextButton,
	Form,
	FormItem,
	Input,
} from 'ljit-react-components';
import PageBlock from '../../../../components/page-block';
import PageModal from '../../../../components/page-modal';
import AdminAccountFormModal from './admin-account-form-modal';
import { connect } from 'ljit-store-connecter';
import {
	fetchAdminUsersAction,
	createAdminUserAction,
	updateAdminUserAction,
	fetchStaffRolesAction,
	updateStaffUserPasswordAction,
} from '../../../../controller/actions/admin-users-management-actions';
import { validatePassword, } from '../../../../../lib/form-validation-utils';
import {
	withLoadingStatusNotification,
	notifications,
} from '../../../../../lib/notify-handler';
import { StaffRolesMeTypeEnum, } from '../../../../lib/enums';
import { LoadingStatusEnum, } from '../../../../../lib/enums';
import { UserStatusEnum, userStaffPropTypes, staffRolesPropTypes, } from './utils';
import './style.styl';

const {
	NONE,
	LOADING,
	SUCCESS,
	FAILED
} = LoadingStatusEnum;

const {
	BLOCKED,
	ACTIVE,
} = UserStatusEnum;

const { Success, } = notifications.successNotifications;

const StatusMap = {
	[BLOCKED]: {
		name: '禁用',
		status: 'error',
	},
	[ACTIVE]: {
		name: '启用',
		status: 'success',
	}
};

const statusPropTypes = PropTypes.oneOf([NONE, LOADING, SUCCESS, FAILED]).isRequired;

const propTypes = {
	adminUsers: PropTypes.shape({
		staffsData: PropTypes.arrayOf(userStaffPropTypes),
		numOfItems: PropTypes.number,
		numOfPages: PropTypes.number,
	}),
	staffRoles: staffRolesPropTypes,
	fetchAdminUsersAction: PropTypes.func.isRequired,
	fetchStaffRolesAction: PropTypes.func.isRequired,
	createAdminUserAction: PropTypes.func.isRequired,
	updateAdminUserAction: PropTypes.func.isRequired,
	notifyHandlingAction: PropTypes.func.isRequired,
	updateStaffUserPasswordAction: PropTypes.func.isRequired,
	loadingStatus: statusPropTypes,
	loadingStatusMessage: PropTypes.string.isRequired,
	createUserLoadingStatus: statusPropTypes,
	createUserLoadingStatusMessage: PropTypes.string.isRequired,
	updateUserLoadingStatus: statusPropTypes,
	updateUserLoadingStatusMessage: PropTypes.string.isRequired,
	updateUserPasswordLoadingStatus: statusPropTypes,
	updateUserPasswordLoadingStatusMessage: PropTypes.string.isRequired,
	fetchStaffRolesLoadingStatus: statusPropTypes,
	fetchStaffRolesLoadingStatusMessage: PropTypes.string.isRequired,
};
const defaultProps = {
	fetchAdminUsersAction: () => {},
	fetchStaffRolesAction: () => {},
	createAdminUserAction: () => {},
	updateAdminUserAction: () => {},
	updateStaffUserPasswordAction: () => {},
};

class SystemSettingAdministratorAccountPage extends Component {
	constructor () {
		super();
		this.state = {
			inputSearchValue: null,
			isModalVisible: false,
			isModifyPasswordModalVisible: false,
			isEditing: false,
			accountData: {},
		};

		this._handleClickAddAdmin = this._handleClickAddAdmin.bind(this);
		this._handleInputSearchChange = this._handleInputSearchChange.bind(this);
		this._handleSubmitSearch = this._handleSubmitSearch.bind(this);
		this._handleClickEdit = this._handleClickEdit.bind(this);
		this._handleClickModifyPassword = this._handleClickModifyPassword.bind(this);
		this._handleSubmitModifyPassword = this._handleSubmitModifyPassword.bind(this);
		this._handleSubmitAddConfirm = this._handleSubmitAddConfirm.bind(this);
		this._handleSubmitEditConfirm = this._handleSubmitEditConfirm.bind(this);
		this._handleModalVisible = this._handleModalVisible.bind(this);
	}

	_handleClickAddAdmin() {
		this.setState({
			isEditing: false,
			isModalVisible: true,
		});
	}
	_handleInputSearchChange(event) {
		this.setState({
			inputSearchValue: event.target.value
		});
	}
	_handleSubmitSearch() {
		const { fetchAdminUsersAction } = this.props;
		const { inputSearchValue } = this.state;

		fetchAdminUsersAction({
			username: inputSearchValue
		});
	}
	_handleModalVisible() {
		const { isModalVisible } = this.state;

		this.setState({ isModalVisible: !isModalVisible, });
	}

	_handleClickEdit(record) {
		this.setState({
			isEditing: true,
			isModalVisible: true,
			accountData: record
		});
	}
	_handleClickModifyPassword(record) {
		this.setState({
			isModifyPasswordModalVisible: true,
			accountData: record,
		});
	}
	_handleSubmitModifyPassword() {
		const { accountData: { id: staffId, } } = this.state;
		const form = this.formInstance.getForm();

		form.validateFields((err, { password, }) => {
			if (!err) {
				form.resetFields();
				this.props.updateStaffUserPasswordAction(staffId, password);
				this.setState({ isModifyPasswordModalVisible: false, });
			}
		});
	}
	_handleSubmitAddConfirm({ username, password, description, role = {}, }) {
		const { createAdminUserAction, } = this.props;
		const { _handleModalVisible } = this;

		createAdminUserAction(
			role.id,
			description,
			password,
			username,
		);
		_handleModalVisible();
	}
	_handleSubmitEditConfirm({ status, description, role = {} }) {
		const { updateAdminUserAction, } = this.props;
		const { accountData: { id: staffId, }, } = this.state;
		const { _handleModalVisible } = this;

		updateAdminUserAction(
			staffId,
			status,
			role.id,
			description,
		);
		_handleModalVisible();
	}

	render() {
		const {
			adminUsers: { staffsData, },
			staffRoles,
		} = this.props;
		const {
			inputSearchValue,
			isModalVisible,
			isEditing,
			accountData,
			isModifyPasswordModalVisible,
		} = this.state;
		const {
			_handleInputSearchChange,
			_handleSubmitSearch,
			_handleClickAddAdmin,
			_handleClickEdit,
			_handleClickModifyPassword,
			_handleSubmitModifyPassword,
			_handleSubmitAddConfirm,
			_handleSubmitEditConfirm,
			_handleModalVisible,
		} = this;
		const onSubmit = isEditing ? _handleSubmitEditConfirm : _handleSubmitAddConfirm;

		return (
			<PageBlock className="system-setting-administrator">
				<HeaderButtonBar
					left={(
						<Button
							icon="plus"
							color={Button.ColorEnums.BRIGHTBLUE500}
							onClick={_handleClickAddAdmin}
						>
							新增管理员
						</Button>
					)}
					right={(
						<InputSearch
							value={inputSearchValue}
							onChange={_handleInputSearchChange}
							onSearch={_handleSubmitSearch}
							onPressEnter={_handleSubmitSearch}
						/>
					)}
				/>
				<Table
					columns={[
						{
							title: '帐号',
							dataIndex: 'username',
						},
						{
							title: '角色名称',
							dataIndex: 'role.name',
						},
						{
							title: '状态',
							dataIndex: 'status',
							render: (value) => {
								const matchedStatus = StatusMap[value] ? StatusMap[value] : {};

								return (
									<StatusTag
										status={matchedStatus.status}
										text={matchedStatus.name}
									/>
								);
							}
						},
						{
							title: '谷歌認證',
							dataIndex: 'account.totp.isEnabled',
							render: (value) => (
								<StatusTag
									status={value ? 'success' : 'error'}
									text={value ? '已绑定' : '未綁'}
								/>
							)
						},
						{
							title: '备注',
							dataIndex: 'description',
						},
						{
							title: '操作',
							dataIndex: 'action',
							render: (value, record) => (
								<Fragment>
									<div>
										<TextButton
											text="修改基本资讯"
											onClick={() => _handleClickEdit(record)}

										/>
									</div>
									<div>
										<TextButton
											text="修改密码"
											onClick={() => _handleClickModifyPassword(record)}
										/>
									</div>
								</Fragment>
							)
						},
					]}
					dataSource={staffsData}
					rowKey="id"
				/>
				<AdminAccountFormModal
					isModalVisible={isModalVisible}
					isEditing={isEditing}
					staffRoles={staffRoles}
					onSubmit={onSubmit}
					onCancel={_handleModalVisible}
					accountData={accountData}
				/>
				<PageModal
					visible={isModifyPasswordModalVisible}
					className="system-setting-admin-modify-password-modal"
					title="修改密码"
					modalSize={PageModal.ModalSizeEnum.SMALL}
					onClickCancel={() => this.setState({ isModifyPasswordModalVisible: false, })}
					onClickOk={_handleSubmitModifyPassword}
				>
					<Form
						ref={(refForm) => this.formInstance = refForm}
						cancelButtonDisabled
						submitButtonDisabled
					>
						<FormItem
							label="密码"
							itemName="password"
							itemConfig={{
								rules: [
									{
										required: true,
										validator: validatePassword('密码')
									},
								],
							}}
						>
							<Input />
						</FormItem>
					</Form>
				</PageModal>
			</PageBlock>
		);
	}

	componentDidMount() {
		this.props.fetchStaffRolesAction(StaffRolesMeTypeEnum.WITH_ME);
		this.props.fetchAdminUsersAction();
	}
	componentDidUpdate(prevProps) {
		const {
			notifyHandlingAction,
			fetchAdminUsersAction,
			createUserLoadingStatus,
			updateUserLoadingStatus,
			updateUserPasswordLoadingStatus,
		} = this.props;

		if (prevProps.createUserLoadingStatus === LOADING && createUserLoadingStatus === SUCCESS) {
			fetchAdminUsersAction();
			notifyHandlingAction(new Success('新增管理员成功'));
		}
		if (prevProps.updateUserLoadingStatus === LOADING && updateUserLoadingStatus === SUCCESS) {
			fetchAdminUsersAction();
			notifyHandlingAction(new Success('修改基本资讯成功'));
		}
		if (prevProps.updateUserPasswordLoadingStatus === LOADING && updateUserPasswordLoadingStatus === SUCCESS) {
			fetchAdminUsersAction();
			notifyHandlingAction(new Success('修改密码成功'));
		}
	}
}

function mapStateToProps(state) {
	const adminUsers = state.adminUsersManagement.get('adminUsers').toObject();

	return {
		adminUsers: {
			staffsData: adminUsers.data.toArray(),
			numOfItems: adminUsers.numOfItems,
			numOfPages: adminUsers.numOfPages,
		},
		staffRoles: state.adminUsersManagement.get('staffRoles').toArray(),
		loadingStatus: state.adminUsersManagement.get('loadingStatus'),
		loadingStatusMessage: state.adminUsersManagement.get('loadingStatusMessage'),
		createUserLoadingStatus: state.adminUsersManagement.get('createUserLoadingStatus'),
		createUserLoadingStatusMessage: state.adminUsersManagement.get('createUserLoadingStatusMessage'),
		updateUserLoadingStatus: state.adminUsersManagement.get('updateUserLoadingStatus'),
		updateUserLoadingStatusMessage: state.adminUsersManagement.get('updateUserLoadingStatusMessage'),
		updateUserPasswordLoadingStatus: state.adminUsersManagement.get('updateUserPasswordLoadingStatus'),
		updateUserPasswordLoadingStatusMessage: state.adminUsersManagement.get('updateUserPasswordLoadingStatusMessage'),
		fetchStaffRolesLoadingStatus: state.adminUsersManagement.get('fetchStaffRolesLoadingStatus'),
		fetchStaffRolesLoadingStatusMessage: state.adminUsersManagement.get('fetchStaffRolesLoadingStatusMessage'),
	};
}
function mapDispatchToProps(dispatch) {
	return {
		fetchAdminUsersAction: (query) => dispatch(fetchAdminUsersAction(query)),
		fetchStaffRolesAction: (meType) => dispatch(fetchStaffRolesAction(meType)),
		createAdminUserAction: (roleId, description, password, username) => dispatch(createAdminUserAction(roleId, description, password, username)),
		updateAdminUserAction: (staffId, status, roleId, description) => dispatch(updateAdminUserAction(staffId, status, roleId, description)),
		updateStaffUserPasswordAction: (staffId, password) => dispatch(updateStaffUserPasswordAction(staffId, password))
	};
}

SystemSettingAdministratorAccountPage.propTypes = propTypes;
SystemSettingAdministratorAccountPage.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(
	withLoadingStatusNotification(
		[
			{
				loadingStatus: 'loadingStatus',
				loadingStatusMessage: 'loadingStatusMessage',
			},
			{
				loadingStatus: 'createUserLoadingStatus',
				loadingStatusMessage: 'createUserLoadingStatusMessage',
			},
			{
				loadingStatus: 'updateUserLoadingStatus',
				loadingStatusMessage: 'updateUserLoadingStatusMessage',
			},
			{
				loadingStatus: 'updateUserPasswordLoadingStatus',
				loadingStatusMessage: 'updateUserPasswordLoadingStatusMessage',
			},
			{
				loadingStatus: 'fetchStaffRolesLoadingStatus',
				loadingStatusMessage: 'fetchStaffRolesLoadingStatusMessage',
			},
		],
		SystemSettingAdministratorAccountPage)
);
