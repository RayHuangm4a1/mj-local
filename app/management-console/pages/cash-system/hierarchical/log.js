import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Table,
	TextButton,
	CollapsableForm,
	FormItem,
	LabelContent,
	Input,
	Select,
	CheckBox,
	CheckBoxGroup,
	DateRangePicker,
} from 'ljit-react-components';
import { withLoadingStatusNotification } from '../../../../lib/notify-handler';
import PageBlock from '../../../components/page-block';
import LevelEditModal from './modal/level-edit-modal';
import { connect, } from 'ljit-store-connecter';
import { cashSystemHierarchicalLogPageActions, financeLevelsActions } from '../../../controller';
import {
	isDateValid,
	convertDateStringToTimestamp,
	formatDate,
} from '../../../../lib/moment-utils';
import { LoadingStatusEnum } from '../../../../lib/enums';
import find from 'lodash/find';

const { NONE, LOADING, SUCCESS, FAILED, } = LoadingStatusEnum;
const { fetchUserLevelLogsAction, } = cashSystemHierarchicalLogPageActions;
const { fetchFinanceLevelsAction, } = financeLevelsActions;

const PREFIX_CLASS = 'hierarchical-management-log';
const { CollapseTypeEnum, ColumnSizeEnums } = CollapsableForm;
const ENUM_USER_LEVEL_LOG_STATUS = {
	IP: 1,
	LOCATION: 2,
	MANUALLY: 3,
	UPGRADE: 4,
	DIFFERENT_PAYER_FOR_BANK_CARD_AND_DEPOSIT: 5,
};
const {
	IP,
	LOCATION,
	MANUALLY,
	UPGRADE,
	DIFFERENT_PAYER_FOR_BANK_CARD_AND_DEPOSIT,
} = ENUM_USER_LEVEL_LOG_STATUS;

const statusOptions = [
	{ label: 'IP符合', value: IP, },
	{ label: '地区符合', value: LOCATION, },
	{ label: '手动移层', value: MANUALLY, },
	{ label: '一般层级升级 ', value: UPGRADE, },
	{ label: '银行卡名称与充值名称不一致 ', value: DIFFERENT_PAYER_FOR_BANK_CARD_AND_DEPOSIT, },
];

const DEFAULT_PAGE = 1;

const propTypes = {
	userLevelLogsData: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		username: PropTypes.string,
		previousLevelId: PropTypes.number,
		afterLevelId: PropTypes.number,
		status: PropTypes.number,
		createdAt: PropTypes.string,
		updatedAt: PropTypes.string,
	})),
	numOfItems: PropTypes.number,
	financeLevelOptions: PropTypes.array.isRequired,
	financeLevelNamesMap: PropTypes.object.isRequired,
	fetchUserLevelLogsAction: PropTypes.func.isRequired,
	fetchFinanceLevelsAction: PropTypes.func.isRequired,
	userLevelLogsLoadingStatus: PropTypes.oneOf([NONE, LOADING, SUCCESS, FAILED,]).isRequired,
	userLevelLogsLoadingStatusMessage: PropTypes.string,
	financeLevelsLoadingStatus: PropTypes.oneOf([NONE, LOADING, SUCCESS, FAILED,]).isRequired,
	financeLevelsLoadingStatusMessage: PropTypes.string,
};

class CashSystemHierarchicalLogPage extends Component {
	constructor() {
		super();
		this.state = {
			isModalVisible: false,
			modalData: {},
			status: [],
			pagination: {},
			queryParameters: {}
		};

		this._handleChangeSelectAll = this._handleChangeSelectAll.bind(this);
		this._handleChangeStatus = this._handleChangeStatus.bind(this);
		this._handleSearch = this._handleSearch.bind(this);
		this._handleReset = this._handleReset.bind(this);
		this._handleClickMoveLevel = this._handleClickMoveLevel.bind(this);
		this._handleSubmitEdit = this._handleSubmitEdit.bind(this);
		this._handleChangeTable = this._handleChangeTable.bind(this);
		this._renderContentFields = this._renderContentFields.bind(this);
	}
	_handleChangeSelectAll() {
		const { status, } = this.state;

		if (status.length === statusOptions.length) {
			this.setState({ status: [] });
		} else {
			this.setState({ status: statusOptions.map(item => item.value), });
		}
	}
	_handleChangeStatus(status) {
		this.setState({ status, });
	}
	_handleSearch() {
		const form = this.collapsableFormInstance.getForm();
		const { status, queryParameters } = this.state;
		const { fetchUserLevelLogsAction, } = this.props;

		form.validateFields((err, {
			username,
			previousLevelId,
			afterLevelId,
			fromTo = [],
		}) => {
			if (!err) {
				const [ from, to ] = fromTo;
				const newQueryParameters = Object.assign({}, queryParameters , {
					username,
					previousLevelId,
					afterLevelId,
					from: from ? convertDateStringToTimestamp(from) : undefined,
					to: to ? convertDateStringToTimestamp(to) : undefined,
					page: DEFAULT_PAGE,
					status: status.join(','),
				});

				fetchUserLevelLogsAction(newQueryParameters);
			}
		});
	}
	_handleReset() {
		const form = this.collapsableFormInstance.getForm();

		form.resetFields();
		this.setState({ status: [] });
	}
	_handleClickMoveLevel(data) {
		this.setState({
			isModalVisible: true,
			modalData: data,
		});
	}
	_handleSubmitEdit(data) {
		// TODO dispatch edit action
	}
	_handleChangeTable(pagination, filters, sorter) {
		const { queryParameters, } = this.state;
		const { fetchUserLevelLogsAction, } = this.props;
		const { columnKey, order } = sorter;
		const sorterOrder = order ? order.replace('end', '') : undefined;

		if (sorterOrder !== queryParameters.order) {
			pagination.current = DEFAULT_PAGE;
		}

		const { current, } = pagination;
		const newQueryParameters = Object.assign({}, queryParameters , {
			page: current,
			sort: columnKey,
			order: sorterOrder,
		});

		fetchUserLevelLogsAction(newQueryParameters);

		this.setState({
			pagination,
			queryParameters: newQueryParameters,
		});
	}

	_renderContentFields() {
		const { financeLevelOptions, } = this.props;
		const { status, } = this.state;
		const { _handleChangeSelectAll, _handleChangeStatus, } = this;
		const levelOptions = [{ value: null, label: '全选' }, ...financeLevelOptions ];

		const content = [
			<FormItem
				key={1}
				label="帳号"
				itemName="username"
				columnType={FormItem.ColumnTypeEnums.MEDIUM}
			>
				<Input
					placeholder="请输入帐号"
				/>
			</FormItem>,
			<FormItem
				key={2}
				label="原层层级"
				itemName="previousLevelId"
				columnType={FormItem.ColumnTypeEnums.MEDIUM}
			>
				<Select
					placeholder="不指定"
					options={levelOptions}
				/>
			</FormItem>,
			<FormItem
				key={3}
				label="新层层级"
				itemName="afterLevelId"
				columnType={FormItem.ColumnTypeEnums.MEDIUM}
			>
				<Select
					placeholder="不指定"
					options={levelOptions}
				/>
			</FormItem>,
			<FormItem
				key={4}
				label="移层时间"
				itemName="fromTo"
				columnType={FormItem.ColumnTypeEnums.MEDIUM}
			>
				<DateRangePicker/>
			</FormItem>,
			<div key={5} className={`${PREFIX_CLASS}__reason-options`}>
				<LabelContent
					label="原因"
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
				>
					<CheckBox
						value={status.length === statusOptions.length}
						onChange={_handleChangeSelectAll}
					>
						全选
					</CheckBox>
				</LabelContent>
				<CheckBoxGroup
					value={status}
					options={statusOptions}
					onChange={_handleChangeStatus}
				/>
			</div>,
		];

		return content;
	}

	render() {
		const {
			_handleSearch,
			_handleReset,
			_handleClickMoveLevel,
			_handleSubmitEdit,
			_handleChangeTable,
			_renderContentFields,
		} = this;
		const {
			userLevelLogsData,
			numOfItems,
			financeLevelNamesMap,
			userLevelLogsLoadingStatus,
		} = this.props;
		const {
			isModalVisible,
			pagination,
			modalData,
		} = this.state;
		const content = _renderContentFields();
		const collapse = content.slice(0, 2);

		return (
			<PageBlock className={PREFIX_CLASS}>
				<CollapsableForm
					expand={true}
					onSubmit={_handleSearch}
					onCancel={_handleReset}
					submitText="查询"
					cancelText="重置"
					collapseType={CollapseTypeEnum.INSERTROW}
					columnSize={ColumnSizeEnums.SMALL}
					ref={(refForm) => this.collapsableFormInstance = refForm}
					expandChildren={content}
					collapseChildren={collapse}
				/>
				<Table
					rowKey="id"
					dataSource={userLevelLogsData}
					columns={[
						{
							title: '帐号',
							dataIndex: 'username',
							width: '12.5%',
						},{
							title: '原层',
							dataIndex: 'previousLevelId',
							width: '12.5%',
							render: (previousLevelId) => financeLevelNamesMap[previousLevelId]
						},{
							title: '新层',
							dataIndex: 'afterLevelId',
							width: '12.5%',
							render: (afterLevelId) => financeLevelNamesMap[afterLevelId]
						},{
							title: '原因',
							dataIndex: 'status',
							width: '25%',
							render: (status) => {
								const statusOption = find(statusOptions, (option) => option.value === status) || {};

								return statusOption.label || '未知';
							},
						},{
							title: '移层时间',
							dataIndex: 'createdAt',
							sorter: () => {},
							width: '25%',
							render: (value) => isDateValid(value) ? formatDate(value): null,
						},{
							title: '操作',
							dataIndex: 'operation',
							width: '12.5%',
							render: (value, record) => {
								return (
									<TextButton
										text="移层"
										onClick={() => _handleClickMoveLevel(record)}
									/>
								);
							}
						}
					]}
					hasPagination
					paginationProps={{
						showQuickJumper: false,
						showSizeChanger: false,
						... pagination,
						total: numOfItems,
						totalRenderer: () => null,
					}}
					onTableChange={_handleChangeTable}
					isLoading={userLevelLogsLoadingStatus === LOADING}
				/>
				<LevelEditModal
					isVisible={isModalVisible}
					data={modalData}
					onSubmit={_handleSubmitEdit}
					onClose={() => this.setState({ isModalVisible: false, })}
				/>
			</PageBlock>
		);
	}

	componentDidMount() {
		const {
			fetchFinanceLevelsAction,
			fetchUserLevelLogsAction,
		} = this.props;

		fetchFinanceLevelsAction();
		fetchUserLevelLogsAction();
	}
}

CashSystemHierarchicalLogPage.propTypes = propTypes;

function mapStateToProps(state) {
	return {
		userLevelLogsData: state.cashSystemHierarchicalLogPage.get('data').toArray(),
		numOfItems: state.cashSystemHierarchicalLogPage.get('numOfItems'),
		numOfPages: state.cashSystemHierarchicalLogPage.get('numOfPages'),
		financeLevelOptions: state.financeLevels.get('financeLevelOptions').toArray(),
		financeLevelNamesMap: state.financeLevels.get('financeLevelNamesMap').toObject(),
		userLevelLogsLoadingStatus: state.cashSystemHierarchicalLogPage.get('loadingStatus'),
		userLevelLogsLoadingStatusMessage: state.cashSystemHierarchicalLogPage.get('loadingStatusMessage'),
		financeLevelsLoadingStatus: state.financeLevels.get('loadingStatus'),
		financeLevelsLoadingStatusMessage: state.financeLevels.get('loadingStatusMessage'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchUserLevelLogsAction: (queries) => dispatch(fetchUserLevelLogsAction(queries)),
		fetchFinanceLevelsAction: () => dispatch(fetchFinanceLevelsAction()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(withLoadingStatusNotification(
	[{
		loadingStatus: 'userLevelLogsLoadingStatus',
		loadingStatusMessage: 'userLevelLogsLoadingStatusMessage',
	},{
		loadingStatus: 'financeLevelsLoadingStatus',
		loadingStatusMessage: 'financeLevelsLoadingStatusMessage',
	}],
	CashSystemHierarchicalLogPage)
);
