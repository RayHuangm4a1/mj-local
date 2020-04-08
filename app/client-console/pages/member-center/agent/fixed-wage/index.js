import React, { Component, } from 'react';
import Big from 'big.js';
import PagerTable from '../../../../components/pager-table';
import {
	Form,
	FormItem,
	Input,
	Button,
	LabelContent,
	IconButton,
	DecimalNumber,
} from 'ljit-react-components';
import WageModal from './wage-modal';
import PropTypes from 'prop-types';
import { formatDate, } from '../../../../../lib/moment-utils';
import { LoadingStatusEnum } from '../../../../lib/enums';
import { fixedWageActions, } from '../../../../controller';
import { connect, } from 'ljit-store-connecter';
import {
	withLoadingStatusNotification,
	notifications,
} from '../../../../../lib/notify-handler';
import './style.styl';

const {
	successNotifications,
} = notifications;
const {
	Success,
} = successNotifications;
const {
	NONE,
	LOADING,
	SUCCESS,
	FAILED,
} = LoadingStatusEnum;

const { IconTypeEnums, } = IconButton;
const {
	EDIT,
} = IconTypeEnums;

const PREFIX_CLASS = 'agent-fixed-wage';

const {
	fetchFixedWagesAction,
	updateUserFixedWageAction,
} = fixedWageActions;

const userPropTypes = PropTypes.shape({
	id: PropTypes.number,
	username: PropTypes.string,
	bonus: PropTypes.number,
	numOfDescendants: PropTypes.number,
	balance: PropTypes.number,
	teamBalance: PropTypes.number,
	fixedWage: PropTypes.number,
	ip: PropTypes.string,
	geo: PropTypes.string,
	loginAt: PropTypes.instanceOf(Date),
	//TODO  少了餘額，團隊總餘額，外接遊戲返點，
	_id: PropTypes.string,
	nickname: PropTypes.string,
	greeting: PropTypes.string,
	status: PropTypes.string,
	type: PropTypes.number,
	parent: PropTypes.string,
	deltaBonus: PropTypes.number,
	isOnline: PropTypes.bool,
});

const propTypes = {
	userData: userPropTypes.isRequired,
	platformData: PropTypes.shape({
		id: PropTypes.number,
		_id: PropTypes.string,
		status: PropTypes.string,
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
		fixedWages: PropTypes.arrayOf(PropTypes.number),
		createdAt: PropTypes.string,
		updatedAt: PropTypes.string,
	}).isRequired,
	fetchFixedWagesAction: PropTypes.func.isRequired,
	fixedWageData: PropTypes.shape({
		children: PropTypes.array,
		page: PropTypes.number,
		numOfItems: PropTypes.number,
		numOfPages: PropTypes.number,
	}),
	updateUserFixedWageAction: PropTypes.func.isRequired,
	updateUserFixedWageStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING]),
	updateUserFixedWageStatusMessage: PropTypes.string,
	notifyHandlingAction: PropTypes.func.isRequired,
};

const DEFAULT_PAGE_SIZE = 8;
const DEFAULT_PAGE = 1;

class AgentFixedWagePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isWageModalVisible: false,
			editingMember: {},
			wageOptions: [],
			queryParameters: {
				limit: DEFAULT_PAGE_SIZE,
				page: DEFAULT_PAGE,
				sort: null,
				order: '',
				username: '',
			},
			pagination: {
				pageSize: DEFAULT_PAGE_SIZE
			},
		};

		this._handleSearch = this._handleSearch.bind(this);
		this._handleOpenWageModal = this._handleOpenWageModal.bind(this);
		this._handleChangeTable = this._handleChangeTable.bind(this);
		this._handleEditMember = this._handleEditMember.bind(this);
	}

	_handleSearch() {
		const form = this.formInstance.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				const { username } = values;
				const { fetchFixedWagesAction } = this.props;
				const queryParameters = Object.assign({}, this.state.queryParameters ,{ username, page: DEFAULT_PAGE });

				fetchFixedWagesAction(queryParameters);

				this.setState({
					queryParameters,
				});
			}
		});
	}
	_handleOpenWageModal(editingMember = {}) {
		const {
			userData,
			platformData,
		} = this.props;
		const wageOptions = getWageOptions(userData.fixedWage, editingMember.fixedWage, platformData.fixedWages);

		this.setState({
			editingMember,
			isWageModalVisible: true,
			wageOptions,
		});
	}
	_handleEditMember({ wage }) {
		const { updateUserFixedWageAction } = this.props;
		const { editingMember } = this.state;
		const { id } = editingMember;

		updateUserFixedWageAction(id, wage);
	}
	_handleChangeTable(pagination, filters, sorter) {
		const { fetchFixedWagesAction } = this.props;

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
		if (order !== this.state.queryParameters.order) {
			pagination.current = DEFAULT_PAGE;
		}

		const { current } = pagination;
		const queryParameters = Object.assign({}, this.state.queryParameters, {
			page: current,
			sort: columnKey,
			order,
		});

		fetchFixedWagesAction(queryParameters);
		this.setState({ pagination, queryParameters, });
	}

	render() {
		const {
			_handleSearch,
			_handleEditMember,
			_handleChangeTable,
			_handleOpenWageModal,
		} = this;
		const {
			userData,
			fixedWageData,
		} = this.props;
		const {
			isWageModalVisible,
			editingMember,
			wageOptions,
		} = this.state;
		const {
			children,
			numOfItems,
		} = fixedWageData;
		const myWage = getDisplayWage(userData.fixedWage);

		return (
			<div className={PREFIX_CLASS}>
				<div className={`${PREFIX_CLASS}__header`}>
					<LabelContent
						label=""
					>
						<div>
							我的工资【
							<DecimalNumber
								className={`${PREFIX_CLASS}-theme-color`}
								data={myWage}
								decimalPlaces={2}
								hasSeparator
							/>
							】
						</div>
					</LabelContent>
					<Form
						cancelButtonDisabled
						submitButtonDisabled
						ref={(refForm) => this.formInstance = refForm}
					>
						<FormItem
							itemName="username"
							label="会员名"
						>
							<Input
								placeholder="输入会员名"
							/>
						</FormItem>
						<Button
							outline={Button.OutlineEnums.SOLID}
							onClick={_handleSearch}
						>
							查询
						</Button>
					</Form>
				</div>
				<div className={`${PREFIX_CLASS}__body`}>
					<PagerTable
						rowKey="id"
						dataSource={children}
						columns={[
							{
								title: '会员名',
								dataIndex: 'username',
								width: 94,
							},
							{
								title: '奖金号',
								dataIndex: 'bonus',
								width: 108,
								sorter: () => 0,
							},
							{
								title: '团队总人数',
								dataIndex: 'teamStats.numOfUsers',
								width: 147,
								sorter: () => 0,
							},
							{
								title: '余额',
								dataIndex: 'wallets[0].balance',
								width: 133,
								sorter: () => 0,
								render: (value) => <DecimalNumber data={value} hasSeparator/>,
							},
							{
								title: '团队总余额',
								dataIndex: 'teamStats.balance',
								width: 147,
								sorter: () => 0,
								render: (value) => <DecimalNumber data={value} hasSeparator/>,
							},
							{
								title: '工资',
								dataIndex: 'fixedWage',
								width: 88,
								sorter: () => 0,
								render: (value) => <DecimalNumber data={getDisplayWage(value)} hasSeparator/>
							},
							{
								title: '设置时间',
								width: 225,
								dataIndex: 'createdAt',
								sorter: () => 0,
								render: (value) => formatDate(value)
							},
							{
								title: '操作',
								dataIndex: 'operation',
								width: 62,
								render: (value, record) => {
									return (
										<React.Fragment>
											<IconButton
												type={EDIT}
												onClick={() => _handleOpenWageModal(record)}
											/>
										</React.Fragment>
									);
								},
							}
						]}
						paginationProps={{
							...this.state.pagination,
							total: numOfItems,
						}}
						onTableChange={_handleChangeTable}
					/>
				</div>
				<WageModal
					editingMember={editingMember}
					isVisible={isWageModalVisible}
					onEditMember={_handleEditMember}
					onCancel={() => this.setState({ isWageModalVisible: false, })}
					wageOptions={wageOptions}
				/>
			</div>
		);
	}
	componentDidMount() {
		const { queryParameters } = this.state;
		const { fetchFixedWagesAction } = this.props;

		fetchFixedWagesAction(queryParameters);
	}
	componentDidUpdate(prevProps) {
		const {
			notifyHandlingAction,
			updateUserFixedWageStatus,
		} = this.props;
		const isUserFixedWageUpdated = prevProps.updateUserFixedWageStatus === LOADING && updateUserFixedWageStatus === SUCCESS;

		if (isUserFixedWageUpdated) {
			this.setState({
				isWageModalVisible: false,
				editingMember: {},
			});
			notifyHandlingAction(new Success('固定工资修改成功'));
		}
	}
}

AgentFixedWagePage.propTypes = propTypes;

function mapStateToProps(state) {
	return {
		platformData: state.platform.get('data').toObject(),
		userData: state.user.get('data').toObject(),
		fixedWageData: state.fixedWages.get('data').toObject(),
		updateUserFixedWageStatus: state.fixedWages.get('updateUserFixedWageStatus'),
		updateUserFixedWageStatusMessage: state.fixedWages.get('updateUserFixedWageStatusMessage'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchFixedWagesAction: (query) => dispatch(fetchFixedWagesAction(query)),
		updateUserFixedWageAction: (childrenId, fixedWage) => dispatch(updateUserFixedWageAction(childrenId, fixedWage)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(
	withLoadingStatusNotification(
		[
			{
				loadingStatus: 'updateUserFixedWageStatus',
				loadingStatusMessage: 'updateUserFixedWageStatusMessage',
			},
		],
		AgentFixedWagePage)
);

function getDisplayWage(wage) {
	return parseFloat(new Big(wage).times(100));
}

function getWageOptions(userWage, childrenWage, platformFixedWages = []) {
	return platformFixedWages
		.filter(wage => wage >= childrenWage && wage <= userWage)
		.map(wage => {
			const realWage = getDisplayWage(wage);

			if (wage === childrenWage) {
				return { label: `设置固定工资为：${realWage}(当前设置)`, value: wage, };
			}
			return { label: `设置固定工资为：${realWage}`, value: wage, };
		});
}
