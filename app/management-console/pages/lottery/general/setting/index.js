import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
	LabelContent,
	RadioGroup,
	Table,
	TextButton,
	Divider,
	CheckBoxGroup,
	Tooltip,
	Icon,
	Switch,
	Select,
	Form,
	FormItem,
	Input,
} from 'ljit-react-components';
import { connect, } from 'ljit-store-connecter';
import PageBlock from '../../../../components/page-block';
import { Cells, } from '../../../../components/table';
import PageModal from '../../../../components/page-modal';
import {
	lotteryClassesAndLotteriesActions,
	lotteryManagementPageActions,
} from '../../../../controller';
import { LoadingStatusEnum } from '../../../../lib/enums';
import {
	withLoadingStatusNotification,
	notifications,
} from '../../../../../lib/notify-handler';
import './style.styl';

const { StatusCell, } = Cells;

const {
	updateLotteryStatusAction,
} = lotteryClassesAndLotteriesActions;

const {
	initLotteryManagementPageAction,
} = lotteryManagementPageActions;

const {
	successNotifications,
	errorNotifications,
} = notifications;
const {
	Success,
} = successNotifications;
const {
	GeneralError,
} = errorNotifications;

const {
	NONE,
	SUCCESS,
	FAILED,
	LOADING,
} = LoadingStatusEnum;

const propTypes = {
	lotteriesData: PropTypes.arrayOf(PropTypes.shape({
		lotteryClass: PropTypes.shape({
			name: PropTypes.string,
		}),
		id: PropTypes.number,
		name: PropTypes.string,
		code: PropTypes.string,
		numOfIssues: PropTypes.number,
		status: PropTypes.oneOf(['online', 'offline', 'maintenance',]),
		playClasses: PropTypes.array,
		platformBonus: PropTypes.number,
	})),
	lotteryClassOptions: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string,
		value: PropTypes.number,
	})),
	notifyHandlingAction: PropTypes.func.isRequired,
	updateLotteryLoadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING,]),
	updateLotteryLoadingStatusMessage: PropTypes.string,
	updateLotteryStatusAction: PropTypes.func.isRequired,
	initLotteryManagementPageAction: PropTypes.func.isRequired,
};
const PREFIX_CLASS = 'lottery-setting';

const StatusOptions = [
	{ label: '上线', value: 'online', },
	{ label: '系统维护中',value: 'maintenance', },
	{ label: '下线',value: 'offline', },
];

class LotteryGeneralSettingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowingStatusForm: false,
			isShowingEditForm: false,
			currentStatusForm: {
				lotteryId: 0,
				status: null,
			},
			currentEditForm: {
				lotteryId: 0,
				playTypes: [],
			},
			filterQuery: {
				lotteryClassId: null,
				status: null,
				keyword: '',
			},
		};

		this._handleShowStatusForm = this._handleShowStatusForm.bind(this);
		this._handleShowEditForm = this._handleShowEditForm.bind(this);
		this._handleChangeStatusForm = this._handleChangeStatusForm.bind(this);
		this._handleChangeEditForm = this._handleChangeEditForm.bind(this);
		this._handleEditStatusOk = this._handleEditStatusOk.bind(this);
		this._handleEditOk = this._handleEditOk.bind(this);
		this._getTableColumn = this._getTableColumn.bind(this);
		this._handleChangeAutoCloseLottery = this._handleChangeAutoCloseLottery.bind(this);
		this._handleSearch = this._handleSearch.bind(this);
		this._handleReset = this._handleReset.bind(this);
		this._handleFilterLotteryData = this._handleFilterLotteryData.bind(this);
	}


	_handleShowStatusForm(lottery) {
		this.setState({
			isShowingStatusForm: true,
			currentStatusForm: {
				lotteryId: lottery.id,
				status: lottery.status,
			},
		});
	}

	_handleShowEditForm(lottery) {
		const { playClasses, } = lottery;
		const playTypes = playClasses.map(playClass => playClass.code);

		this.setState({
			isShowingEditForm: true,
			currentEditForm: {
				lotteryId: lottery.id,
				playTypes,
			},
		});
	}

	_handleChangeStatusForm(status) {
		const { currentStatusForm, } = this.state;
		const nextform = Object.assign({}, currentStatusForm, {
			status,
		});

		this.setState({
			currentStatusForm: nextform,
		});
	}

	_handleChangeEditForm(playTypes) {
		const { currentEditForm, } = this.state;
		const nextform = Object.assign({}, currentEditForm, {
			playTypes,
		});

		this.setState({
			currentEditForm: nextform,
		});
	}

	_handleEditStatusOk() {
		const { currentStatusForm, } = this.state;

		this.props.updateLotteryStatusAction({
			lotteryId: currentStatusForm.lotteryId,
			status: currentStatusForm.status,
		});
		this.setState({
			isShowingStatusForm: false,
		});
	}

	_handleEditOk() {
		const { currentEditForm, } = this.state;

		// TODO edit lottery api
		// this.props.updateLotteryAction({
		// 	lotteryId: currentEditForm.lotteryId,
		// 	status: currentEditForm.status,
		// });
		this.setState({
			isShowingEditForm: false,
		});
	}

	_handleChangeAutoCloseLottery(lottery, checked) {
		// TODO: 接资料, action
	}

	_renderTooltip() {
		const tooltipContent = '根据截止时间判断，彩种尚未截止，就已获取开奖号，系统自动关闭';

		return (
			<span>
				自动关闭
				<Tooltip
					key='tooltip'
					title={tooltipContent}
					overlayColor={Tooltip.ColorEnums.WHITE}
					placement={Tooltip.PlacementEnums.TOP_LEFT}
					isArrowPointAtCenter={true}
					className={`${PREFIX_CLASS}__tooltip-auto-close-lottery`}
					overlayClassName={`${PREFIX_CLASS}__tooltip-auto-close-lottery-overlay`}
				>
					<span>
						<Icon
							type={Icon.IconTypeEnums.QUESTION_CIRCLE_FILL}
							size={Icon.SizeEnums.SMALL}
							color={Icon.ColorEnums.GREY}
						/>
					</span>
				</Tooltip>
			</span>
		);
	}

	_getTableColumn() {
		return [{
			title: '彩种',
			dataIndex: 'name',
			key: 'name',
		},{
			title: '分类',
			dataIndex: 'lotteryClass.name',
			key: 'lotteryClass',
		},{
			title: '状态',
			dataIndex: 'status',
			key: 'status',
			render: (status) => (
				<StatusCell.System
					data={status}
				/>
			),
		},{
			title: '游戏种类',
			dataIndex: 'playClasses',
			key: 'playClasses',
			render: (playClasses) => {
				const showText = {
					xinyong: '信用玩法',
					standard: '官方玩法',
					// TODO 计划软件
				};

				return <span>{playClasses.map((playClass) => showText[playClass.code]).join(' / ')}</span>;
			},
		}, {
			// TODO: 待接资料
			title: () => this._renderTooltip(),
			dataIndex: 'isAutoClose',
			key: 'isAutoClose',
			render: (checked, lottery) => (
				// TODO auto switch api
				<Switch
					checked={checked}
					onChange={(checked) => this._handleChangeAutoCloseLottery(lottery, checked)}
				/>
			),
		}, {
			title: '操作',
			dataIndex: '',
			key: 'operation',
			render: (lottery) => (
				<Fragment>
					<TextButton
						text='状态设定'
						onClick={() => this._handleShowStatusForm(lottery)}
					/>
					<Divider type='vertical'/>
					<TextButton
						text='修改'
						onClick={() => this._handleShowEditForm(lottery)}
					/>
				</Fragment>
			),
		},];
	}

	_handleSearch() {
		const form = this.formInstance.getForm();

		form.validateFields((err, values) => {
			if (!err) {
				this.setState({
					filterQuery: values
				});
			}
		});
	}

	_handleReset() {
		const form = this.formInstance.getForm();

		form.resetFields();
	}

	_handleFilterLotteryData() {
		const { lotteriesData } = this.props;
		const { filterQuery } = this.state;
		const { lotteryClassId, status, keyword } = filterQuery;

		let filterLotteryData = [...lotteriesData];

		if (lotteryClassId !== null) {
			filterLotteryData = filterLotteryData.filter(lottery => lotteryClassId === lottery.lotteryClass.id);
		}
		if (status !== null) {
			filterLotteryData = filterLotteryData.filter(lottery => status === lottery.status);
		}
		if (keyword) {
			filterLotteryData = filterLotteryData.filter(lottery => lottery.name.indexOf(keyword) !== -1);
		}

		return filterLotteryData;
	}

	render() {
		const {
			lotteryClassOptions,
		} = this.props;
		const {
			isShowingEditForm,
			isShowingStatusForm,
			currentEditForm,
			currentStatusForm,
		} = this.state;
		const {
			_handleSearch,
			_handleReset,
			_getTableColumn,
			_handleEditStatusOk,
			_handleChangeStatusForm,
			_handleEditOk,
			_handleChangeEditForm,
			_handleFilterLotteryData,
		} = this;
		const { playTypes, } = currentEditForm;
		const { status, } = currentStatusForm;
		const columns = _getTableColumn();
		const allOption =  { label: '全部', value: null };
		const selectStatusOptions = [allOption, ...StatusOptions];
		const selectLotteryClassOptions = [allOption, ...lotteryClassOptions];

		return (
			<PageBlock>
				<PageModal
					title="状态设定"
					visible={isShowingStatusForm}
					onClickOk={_handleEditStatusOk}
					onClickCancel={() => this.setState({ isShowingStatusForm: false, })}
				>
					<LabelContent
						label="状态"
						columnType={LabelContent.ColumnTypeEnums.SMALL}
					>
						<RadioGroup
							radioType={RadioGroup.RadioTypeEnums.BUTTON}
							value={status}
							options={StatusOptions}
							onChange={(e) => _handleChangeStatusForm(e.target.value)}
						>
						</RadioGroup>
					</LabelContent>
				</PageModal>
				<PageModal
					title='修改'
					visible={isShowingEditForm}
					onClickOk={_handleEditOk}
					onClickCancel={() => this.setState({ isShowingEditForm: false, })}
				>
					<LabelContent
						label='游戏种类'
						columnType={LabelContent.ColumnTypeEnums.SMALL}
					>
						<CheckBoxGroup
							radioType={RadioGroup.RadioTypeEnums.BUTTON}
							value={playTypes}
							options={[
								{ label: '官方玩法', value: 'standard' },
								{ label: '信用玩法', value: 'xinyong' },
								{ label: '计划软件', value: 'jihau' }
							]}
							onChange={_handleChangeEditForm}
						/>
					</LabelContent>
				</PageModal>
				<div className={`${PREFIX_CLASS}__header`}>
					<Form
						submitText="查询"
						cancelText="重置"
						onSubmit={_handleSearch}
						onCancel={_handleReset}
						ref={(refForm) => this.formInstance = refForm}
					>
						<div>
							<FormItem
								itemName="lotteryClassId"
								label="分类"
								labelColon
								itemConfig={{
									initialValue: null
								}}
							>
								<Select
									options={selectLotteryClassOptions}
								/>
							</FormItem>
							<FormItem
								itemName="status"
								label="状态"
								labelColon
								itemConfig={{
									initialValue: null
								}}
							>
								<Select
									options={selectStatusOptions}
								/>
							</FormItem>
							<FormItem
								itemName="keyword"
								label="关键字"
								labelColon
								itemConfig={{
									initialValue: ''
								}}
							>
								<Input
									placeholder="请输入关键字"
								/>
							</FormItem>
						</div>
					</Form>
				</div>
				<div className={`${PREFIX_CLASS}__lottery-class`}>
					<Table
						rowKey='_id'
						columns={columns}
						dataSource={_handleFilterLotteryData()}
					/>
				</div>
			</PageBlock>
		);
	}
	componentDidMount() {
		this.props.initLotteryManagementPageAction();
	}
	componentDidUpdate(prevProps) {
		const {
			notifyHandlingAction,
			updateLotteryLoadingStatus,
			updateLotteryLoadingStatusMessage,
		} = this.props;
		const isUpdatingLottery = prevProps.updateLotteryLoadingStatus === LOADING;

		if (isUpdatingLottery) {
			if (updateLotteryLoadingStatus === SUCCESS) {
				this.props.initLotteryManagementPageAction();
				notifyHandlingAction(new Success('成功修改彩种状态'));
			} else if (updateLotteryLoadingStatus === FAILED) {
				notifyHandlingAction(new GeneralError(updateLotteryLoadingStatusMessage));
			}
		}
	}
}

LotteryGeneralSettingPage.propTypes = propTypes;

function mapStateToProps(state) {
	return {
		lotteriesData: state.lotteryClassesAndLotteries.get('lotteries').toArray(),
		lotteryClassOptions: state.lotteryManagementPage.get('lotteryClassOptions').toArray(),
		loadingStatus: state.lotteryManagementPage.get('loadingStatus'),
		loadingStatusMessage: state.lotteryManagementPage.get('loadingStatusMessage'),
		updateLotteryLoadingStatus: state.lotteryClassesAndLotteries.get('updateLotteryLoadingStatus'),
		updateLotteryLoadingStatusMessage: state.lotteryClassesAndLotteries.get('updateLotteryLoadingStatusMessage'),
	};
}
function mapDispatchToProps(dispatch) {
	return {
		initLotteryManagementPageAction: () => dispatch(initLotteryManagementPageAction()),
		updateLotteryStatusAction: (attributes) => dispatch(updateLotteryStatusAction(attributes)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(withLoadingStatusNotification(
	[
		{
			loadingStatus: 'loadingStatus',
			loadingStatusMessage: 'loadingStatusMessage',
		},
		{
			loadingStatus: 'updateLotteryLoadingStatus',
			loadingStatusMessage: 'updateLotteryLoadingStatusMessage',
		},
	],
	LotteryGeneralSettingPage
));
