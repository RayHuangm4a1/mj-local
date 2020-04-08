import React, { Component, } from 'react';
import {
	Button,
	Table,
	HeaderButtonBar,
	DecimalNumber,
} from 'ljit-react-components';
import PropTypes from 'prop-types';
import ZhaoShangSettingModal from './zhaoshang-setting-modal';
import { connect } from 'ljit-store-connecter';
import { zhaoShangAccountActions, } from '../../../../controller';
import {
	withLoadingStatusNotification,
	notifications,
} from '../../../../../lib/notify-handler';
import { LoadingStatusEnum, } from '../../../../../lib/enums';
import './style.styl';

const { successNotifications, } = notifications;
const { Success, } = successNotifications;
const {
	fetchZhaoShangAccountsAction,
	createZhaoShangAccountAction,
} = zhaoShangAccountActions;

const {
	NONE,
	LOADING,
	SUCCESS,
	FAILED,
} = LoadingStatusEnum;

const propTypes = {
	zhaoShangsData: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		username: PropTypes.string,
		deltaBonus: PropTypes.number,
		teamStats: PropTypes.shape({
			depositAmount: PropTypes.number,
			withdrawalAmount: PropTypes.number,
		}),
	})),
	numOfItems: PropTypes.number,
	numOfPages: PropTypes.number,
	platformData: PropTypes.shape({
		bonus: PropTypes.shape({
			list: PropTypes.arrayOf(PropTypes.number),
			max: PropTypes.number,
			min: PropTypes.number,
		})
	}),
	createZhaoShangAccountAction: PropTypes.func.isRequired,
	fetchZhaoShangAccountsAction: PropTypes.func.isRequired,
	notifyHandlingAction: PropTypes.func.isRequired,
	fetchZhaoShangAccountsLoadingStatus: PropTypes.oneOf([NONE, LOADING, SUCCESS, FAILED, ]).isRequired,
	fetchZhaoShangAccountsLoadingStatusMessage: PropTypes.string.isRequired,
	createZhaoShangAccountLoadingStatus: PropTypes.oneOf([NONE, LOADING, SUCCESS, FAILED, ]).isRequired,
	createZhaoShangAccountLoadingStatusMessage: PropTypes.string.isRequired,
};
const defaultProps = {
	zhaoShangsData: [],
};

class AccountZhaoShangAccountSettingPage extends Component {
	constructor() {
		super();
		this.state = {
			isModalVisible: false,
			pagination: {},
		};

		this._handleClickAdd = this._handleClickAdd.bind(this);
		this._handleCancel = this._handleCancel.bind(this);
		this._handleSubmitAdd = this._handleSubmitAdd.bind(this);
		this._handleChangeTable = this._handleChangeTable.bind(this);
	}
	_handleClickAdd() {
		this.setState({
			isModalVisible: true,
		});
	}
	_handleCancel() {
		this.setState({
			isModalVisible: false,
		});
	}
	_handleSubmitAdd({
		username,
		password,
		nickname,
	}) {
		const {
			createZhaoShangAccountAction,
			platformData: { bonus: { max, }, },
		} = this.props;

		createZhaoShangAccountAction(
			username,
			password,
			max,
			nickname,
		);
		this._handleCancel();
	}
	_handleChangeTable(pagination) {
		this.props.fetchZhaoShangAccountsAction({
			page: pagination.current,
		});
		this.setState({ pagination, });
	}

	render() {
		const {
			_handleClickAdd,
			_handleCancel,
			_handleSubmitAdd,
			_handleChangeTable,
		} = this;
		const {
			isModalVisible,
			pagination,
		} = this.state;
		const {
			zhaoShangsData,
			platformData: { bonus: { max, }, },
			numOfItems,
		} = this.props;

		return (
			<div className="zhaoshang-account-setting">
				<HeaderButtonBar
					right={
						<Button
							color={Button.ColorEnums.BRIGHTBLUE500}
							icon="plus"
							onClick={_handleClickAdd}
						>
							新增招商
						</Button>
					}
				/>
				<Table
					rowKey="username"
					columns={[
						{
							title: '帐号',
							dataIndex: 'username',
						},{
							title: '昵称',
							dataIndex: 'nickname',
						},{
							title: '团队存款总额累计',
							dataIndex: 'teamStats.depositAmount',
							render: (depositAmount) => <DecimalNumber data={depositAmount} hasSeparator />,
						},{
							title: '团队提款总额累计',
							dataIndex: 'teamStats.withdrawalAmount',
							render: (withdrawalAmount) => <DecimalNumber data={withdrawalAmount} hasSeparator />,
						},{
							title: '奖金号',
							dataIndex: 'deltaBonus',
							render: (deltaBonus) => max + deltaBonus,
						},
					]}
					dataSource={zhaoShangsData}
					hasPagination
					paginationProps= {{
						...pagination,
						total: numOfItems,
						showQuickJumper: false,
						showSizeChanger: false
					}}
					onTableChange={_handleChangeTable}
				/>
				<ZhaoShangSettingModal
					isModalVisible={isModalVisible}
					onSubmit={_handleSubmitAdd}
					onCancel={_handleCancel}
				/>
			</div>
		);
	}
	componentDidMount() {
		this.props.fetchZhaoShangAccountsAction();
	}
	componentDidUpdate(prevProps) {
		const {
			createZhaoShangAccountLoadingStatus,
			fetchZhaoShangAccountsAction,
			notifyHandlingAction,
		} = this.props;
		const { pagination, } = this.state;

		if (prevProps.createZhaoShangAccountLoadingStatus === LOADING && createZhaoShangAccountLoadingStatus === SUCCESS) {
			notifyHandlingAction(new Success('招商創建成功'));
			fetchZhaoShangAccountsAction({ page: pagination.current });
		}
	}
}

AccountZhaoShangAccountSettingPage.propTypes = propTypes;
AccountZhaoShangAccountSettingPage.defaultProps = defaultProps;

function mapStateToProp(state) {
	return {
		platformData: state.platform.get('data').toObject(),
		zhaoShangsData: state.zhaoShangAccountPage.getIn(['data', 'zhaoShangs']).toArray(),
		numOfItems: state.zhaoShangAccountPage.getIn(['data', 'numOfItems']),
		numOfPages: state.zhaoShangAccountPage.getIn(['data', 'numOfPages']),
		fetchZhaoShangAccountsLoadingStatus: state.zhaoShangAccountPage.get('fetchZhaoShangAccountsLoadingStatus'),
		fetchZhaoShangAccountsLoadingStatusMessage: state.zhaoShangAccountPage.get('fetchZhaoShangAccountsLoadingStatusMessage'),
		createZhaoShangAccountLoadingStatus: state.zhaoShangAccountPage.get('createZhaoShangAccountLoadingStatus'),
		createZhaoShangAccountLoadingStatusMessage: state.zhaoShangAccountPage.get('createZhaoShangAccountLoadingStatusMessage'),
	};
}
function mapDispatchToProps(dispatch) {
	return {
		fetchZhaoShangAccountsAction: ({ limit, page, sort, order } = {}) => dispatch(fetchZhaoShangAccountsAction({ limit, page, sort, order })),
		createZhaoShangAccountAction: (username, password, bonus, nickname) => dispatch(createZhaoShangAccountAction(username, password, bonus, nickname)),
	};
}

export default connect(mapStateToProp, mapDispatchToProps)(withLoadingStatusNotification(
	[
		{
			loadingStatus: 'createZhaoShangAccountLoadingStatus',
			loadingStatusMessage: 'createZhaoShangAccountLoadingStatusMessage',
		},
		{
			loadingStatus: 'fetchZhaoShangAccountsLoadingStatus',
			loadingStatusMessage: 'fetchZhaoShangAccountsLoadingStatusMessage',
		},
	],
	AccountZhaoShangAccountSettingPage
));
