import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { connect } from 'ljit-store-connecter';
import {
	Button,
	LabelContent,
	InputTextarea,
	StatusTag,
} from 'ljit-react-components';
import { formatDate, } from '../../../lib/moment-utils';
import {
	bettingRecordPropType,
	checkIsNotOpenBettingRecordStatus,
	checkIsTraceRecordStatus,
	traceRecordDataPropType,
	getTraceRecordStatusMap,
	convertTerminatedIfWinToType,
	getTraceRecordTypeMap,
} from '../../lib/betting-utils';
import SubmitFormModal from '../../components/submit-form-modal';
import BettingRecordDetailList from '../../components/betting-record-detail-list';
import ClientMessageModal from '../../components/client-message-modal';
import SelectableBettingRecordTable from './selectable-betting-record-table';
import {
	traceRecordActions,
	traceRecordBettingActions,
} from '../../controller';
import { LoadingStatusEnum, } from '../../lib/enums';
import './style.styl';

// TODO add discard all trace record bettings interface when api done

const {
	fetchTraceRecordAction,
} = traceRecordActions;

const {
	fetchTraceRecordBettingsAction,
	discardTraceRecordBettingsAction,
} = traceRecordBettingActions;

const {
	NONE,
	LOADING,
	SUCCESS,
	FAILED,
} = LoadingStatusEnum;

const PREFIX_CLASS = 'trace-record-detail-modal';
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const initialState = {
	isDiscardMessageVisible: false,
	selectedRowKeys: [],
	traceBettingQueryParameter: {
		page: DEFAULT_PAGE,
		limit: DEFAULT_PAGE_SIZE,
	},
	traceBettingPagination: {
		pageSize: DEFAULT_PAGE_SIZE,
	},
};
const EMPTY_TEXT = '-';

const propTypes = {
	isModalVisible: PropTypes.bool,
	onClose: PropTypes.func,
	username: PropTypes.string,
	selectedTraceRecord: traceRecordDataPropType,
	traceRecordBettingsData: PropTypes.shape({
		traceRecordBettings: PropTypes.arrayOf(bettingRecordPropType),
		page: PropTypes.number,
		numOfItems: PropTypes.number,
		numOfPages: PropTypes.number,
	}),
	className: PropTypes.string,
	traceRecordBettingsLoadingStatus: PropTypes.oneOf([
		NONE,
		LOADING,
		SUCCESS,
		FAILED,
	]),
	discardLoadingStatus: PropTypes.oneOf([
		NONE,
		LOADING,
		SUCCESS,
		FAILED,
	]),
	fetchTraceRecordAction: PropTypes.func.isRequired,
	fetchTraceRecordBettingsAction: PropTypes.func.isRequired,
	discardTraceRecordBettingsAction: PropTypes.func.isRequired,
};
const defaultProps = {
	isModalVisible: false,
	onClose: () => {},
	username: '',
	selectedTraceRecord: {},
	className: '',
};

class TraceRecordDetailModalFeature extends Component {
	constructor(props) {
		super(props);
		this.state = initialState;

		this._handleSelect = this._handleSelect.bind(this);
		this._handleDiscardTraceBetting = this._handleDiscardTraceBetting.bind(this);
		this._handleChangeTraceBettingTable = this._handleChangeTraceBettingTable.bind(this);
		this._renderTypeTag = this._renderTypeTag.bind(this);
		this._renderStatusTag = this._renderStatusTag.bind(this);
		this._renderDiscardButton = this._renderDiscardButton.bind(this);
		this._renderDiscardAllBettingsButton = this._renderDiscardAllBettingsButton.bind(this);
		this._renderFooter = this._renderFooter.bind(this);
	}

	_handleSelect(selectedRowKeys = []) {
		this.setState({ selectedRowKeys, });
	}
	_handleDiscardTraceBetting() {
		const {
			selectedTraceRecord,
			discardTraceRecordBettingsAction,
		} = this.props;
		const { selectedRowKeys, } = this.state;

		discardTraceRecordBettingsAction(selectedTraceRecord.id, selectedRowKeys);
		this.setState({
			isDiscardMessageVisible: false,
			selectedRowKeys: [],
		});
	}
	_handleChangeTraceBettingTable(pagination) {
		const {
			selectedTraceRecord,
			fetchTraceRecordBettingsAction,
		} = this.props;
		const {
			traceBettingQueryParameter: prevQueryParameters,
		} = this.state;
		const {
			page: prevPage,
		} = prevQueryParameters;
		const { current, } = pagination;
		const traceBettingQueryParameter = Object.assign({}, prevQueryParameters, {
			page: current || prevPage,
		});

		fetchTraceRecordBettingsAction(selectedTraceRecord.id, traceBettingQueryParameter);
		this.setState({
			traceBettingPagination: pagination,
		});
	}

	_renderTypeTag(type) {
		const typeMap = getTraceRecordTypeMap(type);

		return (
			<StatusTag
				className={`${PREFIX_CLASS}__type-tag`}
				status={typeMap.statusTag}
				text={typeMap.text}
			/>
		);
	}
	_renderStatusTag(status) {
		const statusMap = getTraceRecordStatusMap(status);

		return <StatusTag status={statusMap.statusTag} text={statusMap.text} />;
	}
	_renderDiscardButton() {
		const { selectedRowKeys, } = this.state;
		const isShow = selectedRowKeys.length > 0;

		return (
			<Button
				onClick={() => this.setState({ isDiscardMessageVisible: true, })}
				color={Button.ColorEnums.ORANGE}
				outline={Button.OutlineEnums.HOLLOW}
				className={cx(`${PREFIX_CLASS}__button`, { [`${PREFIX_CLASS}__button--hidden`]: !isShow, })}
			>
				撤单
			</Button>
		);
	}
	_renderDiscardAllBettingsButton() {
		const {
			traceRecordBettingsData,
		} = this.props;
		const nonCompletedBettingIds = traceRecordBettingsData.traceRecordBettings.reduce((reduced, record) => {
			const { id, status, } = record;
		
			if (checkIsNotOpenBettingRecordStatus(status)) {
				reduced.push(id);
			}
		
			return reduced;
		}, []);
		const isDiscardAllBettingsHidden = nonCompletedBettingIds.length === 0;

		return (
			<Button
				onClick={() => this.setState({
					selectedRowKeys: nonCompletedBettingIds,
					isDiscardMessageVisible: true,
				})}
				color={Button.ColorEnums.ORANGE}
				outline={Button.OutlineEnums.HOLLOW}
				className={cx(`${PREFIX_CLASS}__button`, { [`${PREFIX_CLASS}__button--hidden`]: isDiscardAllBettingsHidden, })}
			>
				全部撤单
			</Button>
		);
	}
	_renderFooter() {
		const {
			onClose,
		} = this.props;
		const {
			_renderDiscardButton,
			_renderDiscardAllBettingsButton,
		} = this;

		return (
			<React.Fragment>
				{_renderDiscardAllBettingsButton()}
				{_renderDiscardButton()}
				<Button
					onClick={onClose}
					color={Button.ColorEnums.GREY30}
					outline={Button.OutlineEnums.HOLLOW}
					className={`${PREFIX_CLASS}__button`}
				>
					取消
				</Button>
			</React.Fragment>
		);
	}

	render() {
		const {
			isModalVisible,
			onClose,
			selectedTraceRecord,
			traceRecordBettingsData,
			className,
			traceRecordBettingsLoadingStatus,
		} = this.props;
		const {
			selectedRowKeys,
			traceBettingPagination,
			isDiscardMessageVisible,
		} = this.state;
		const {
			_handleSelect,
			_handleDiscardTraceBetting,
			_handleChangeTraceBettingTable,
			_renderFooter,
			_renderTypeTag,
			_renderStatusTag,
		} = this;
		const {
			id,
			name,
			lotteryName,
			amountPerBet,
			amount,
			rebate,
			numOfFinishedIssues,
			betcontent,
			weizhi,
			device,
			status,
			username,
			createdAt,
			isTerminatedIfWin,
			numOfIssues
			// TODO when schema updated, sync property name
		} = selectedTraceRecord;
		const terminatedIfWinType = convertTerminatedIfWinToType(isTerminatedIfWin);

		return (
			<SubmitFormModal
				title="追号详情"
				isVisible={isModalVisible}
				footer={_renderFooter()}
				width={880}
				onClickCancel={onClose}
				className={cx(PREFIX_CLASS, className)}
			>
				<div className={`${PREFIX_CLASS}__section`}>
					<BettingRecordDetailList>
						<LabelContent
							label="会员名"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
							labelColon={false}
						>
							{username}
						</LabelContent>
						<LabelContent
							label="彩种"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
							labelColon={false}
						>
							{lotteryName}
						</LabelContent>
						<LabelContent
							label="总金额"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
							labelColon={false}
						>
							{amount}
						</LabelContent>

						<LabelContent
							label="位置"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
							labelColon={false}
						>
							{weizhi ? weizhi : EMPTY_TEXT}
						</LabelContent>
						<LabelContent
							label="方案编号"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
							labelColon={false}
						>
							{id}
						</LabelContent>
						<LabelContent
							label="玩法"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
							labelColon={false}
						>
							{name}
						</LabelContent>
						<LabelContent
							label="单注金额"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
							labelColon={false}
						>
							{amountPerBet}
						</LabelContent>
						<LabelContent
							label="奖金返点"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
							labelColon={false}
						>
							{rebate}%
						</LabelContent>
						<LabelContent
							label="下注时间"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
							labelColon={false}
						>
							{formatDate(createdAt)}
						</LabelContent>
						<LabelContent
							label="追号期数"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
							labelColon={false}
						>
							{numOfIssues}
						</LabelContent>
						<LabelContent
							label="完成期数"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
							labelColon={false}
						>
							{numOfFinishedIssues}
						</LabelContent>
						<LabelContent
							label="投注来源"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
							labelColon={false}
						>
							{device}
						</LabelContent>
						<LabelContent
							label="追号类型"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
							labelColon={false}
						>
							{_renderTypeTag(terminatedIfWinType)}
						</LabelContent>
						<LabelContent
							label="状态"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
							labelColon={false}
						>
							{checkIsTraceRecordStatus(status) ? _renderStatusTag(status) : EMPTY_TEXT}
						</LabelContent>
					</BettingRecordDetailList>
				</div>
				<div className={`${PREFIX_CLASS}__section`}>
					<LabelContent
						label="投注号码"
						labelColon={false}
					>
						<InputTextarea
							value={betcontent}
							minRows={3}
							maxRows={3}
							disabled
						/>
					</LabelContent>
				</div>
				<div className={`${PREFIX_CLASS}__betting-table`}>
					<SelectableBettingRecordTable
						isLoading={traceRecordBettingsLoadingStatus === LOADING}
						traceRecordBettings={traceRecordBettingsData.traceRecordBettings}
						onSelect={_handleSelect}
						selectedRowKeys={selectedRowKeys}
						paginationProps={{
							...traceBettingPagination,
							total: traceRecordBettingsData.numOfItems,
						}}
						onChange={_handleChangeTraceBettingTable}
					/>
				</div>
				<ClientMessageModal
					isVisible={isDiscardMessageVisible}
					message="是否确定撤单？"
					okText="撤单"
					onClickCancel={() => this.setState({ isDiscardMessageVisible: false, })}
					onClickOk={() => _handleDiscardTraceBetting()}
				/>
			</SubmitFormModal>
		);
	}
	componentDidMount() {
		const {
			selectedTraceRecord,
			fetchTraceRecordAction,
		} = this.props;
		const { id: traceRecordId, } = selectedTraceRecord;

		if (traceRecordId || traceRecordId === 0) {
			fetchTraceRecordAction(traceRecordId);
		}
	}
	componentDidUpdate(prevProps) {
		const {
			isModalVisible,
			selectedTraceRecord,
			discardLoadingStatus,
			fetchTraceRecordAction,
			fetchTraceRecordBettingsAction,
		} = this.props;
		const { traceBettingQueryParameter, } = this.state;
		const { id: traceRecordId, } = selectedTraceRecord;

		if (!prevProps.isModalVisible && isModalVisible) {
			this.setState(initialState);
			fetchTraceRecordAction(traceRecordId);
			fetchTraceRecordBettingsAction(traceRecordId, traceBettingQueryParameter);
		}
		if (prevProps.discardLoadingStatus === LOADING && discardLoadingStatus === SUCCESS) {
			fetchTraceRecordAction(traceRecordId);
		}
	}
}

TraceRecordDetailModalFeature.propTypes = propTypes;
TraceRecordDetailModalFeature.defaultProps = defaultProps;

function mapStateToProps(state) {
	const traceRecordBettingsData = state.traceRecordBettings.get('data').toObject();

	return {
		selectedTraceRecord: state.traceRecords.get('selectedTraceRecord').toObject(),
		traceRecordBettingsData: {
			traceRecordBettings: traceRecordBettingsData.traceRecordBettings.toArray(),
			page: traceRecordBettingsData.page,
			numOfItems: traceRecordBettingsData.numOfItems,
			numOfPages: traceRecordBettingsData.numOfPages,
		},
		traceRecordBettingsLoadingStatus: state.traceRecords.get('bettingLoadingStatus'),
		discardLoadingStatus: state.traceRecordBettings.get('discardLoadingStatus'),
	};
}
function mapDispatchToProps(dispatch) {
	return {
		fetchTraceRecordAction: (...args) => dispatch(fetchTraceRecordAction(...args)),
		fetchTraceRecordBettingsAction: (...args) => dispatch(fetchTraceRecordBettingsAction(...args)),
		discardTraceRecordBettingsAction: (...args) => dispatch(discardTraceRecordBettingsAction(...args)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(TraceRecordDetailModalFeature);
