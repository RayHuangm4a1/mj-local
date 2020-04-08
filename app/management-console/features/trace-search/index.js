import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	Modal,
} from 'ljit-react-components';

import { connect, } from '../../../ljit-store-connecter';
import {
	TraceRecordBettingsPropTypes,
	TraceRecordsPropTypes,
} from '../../lib/prop-types-utils';
import {
	GeneralTraceRecordTable,
	GeneralTraceModalTable,
} from '../../components/table';
import PageModal from '../../components/page-modal';
import {
	traceRecordBettingsActions,
	traceRecordsActions,
} from '../../controller';
import { LoadingStatusEnum, } from '../../lib/enums';
import { TraceSearchFrom, } from '../search-form';

const { fetchTraceRecordBettingsAction, } = traceRecordBettingsActions;
const { fetchTraceRecordsAction, } = traceRecordsActions;
const {
	NONE,
	SUCCESS,
	FAILED,
	LOADING,
} = LoadingStatusEnum;
const OperationEnums = {
	INFO: 'info',
	DISCARD: 'discard',
};
const {
	INFO,
	DISCARD,
} = OperationEnums;

const propTypes = {
	lotteryId: PropTypes.number,
	issue: PropTypes.number,
	fetchTraceRecordBettingsAction: PropTypes.func.isRequired,
	fetchTraceRecordsAction: PropTypes.func.isRequired,
	traceRecordBettingsData: PropTypes.shape({
		traceRecordBettings: TraceRecordBettingsPropTypes,
		page: PropTypes.number,
		numOfItems: PropTypes.number,
		numOfPages: PropTypes.number,
	}),
	traceRecordsData: PropTypes.shape({
		traceRecords: TraceRecordsPropTypes,
		page: PropTypes.number,
		numOfItems: PropTypes.number,
		numOfPages: PropTypes.number,
	}),
	loadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING]),
};

const defaultProps = {};

class TraceSearch extends Component {
	constructor() {
		super();
		this.state = {
			isInfoModalVisible: false,
			isDiscardModalVisible: false,
			selectedRowKeys: [],
			operation: INFO,
		};
		this._handleShowInfoModal = this._handleShowInfoModal.bind(this);
		this._handleShowDiscardModal = this._handleShowDiscardModal.bind(this);
		this._handleClickSearch = this._handleClickSearch.bind(this);
		this._handleModalSubmit = this._handleModalSubmit.bind(this);
		this._handleRowSelection = this._handleRowSelection.bind(this);
		this._handleCloseInfoModal = this._handleCloseInfoModal.bind(this);
		this._handleCloseDiscardModal = this._handleCloseDiscardModal.bind(this);
	}
	_handleShowInfoModal(traceRecord) {
		this.setState({
			isInfoModalVisible: true,
			operation: INFO,
		});
	}
	_handleShowDiscardModal(traceRecord) {
		this.setState({
			isDiscardModalVisible: true,
			operation: DISCARD,
		});
	}
	_handleClickSearch(data) {
	}
	_handleModalSubmit() {
	}
	_handleRowSelection(selectedRowKeys) {
		this.setState({
			selectedRowKeys,
		});
	}
	_handleCloseInfoModal() {
		this.setState({
			isInfoModalVisible: false,
		});
	}
	_handleCloseDiscardModal() {
		this.setState({
			isDiscardModalVisible: false,
		});
	}
	render() {
		const {
			props,
			state,
			_handleClickSearch,
			_handleShowInfoModal,
			_handleShowDiscardModal,
			_handleRowSelection,
			_handleModalSubmit,
			_handleCloseInfoModal,
			_handleCloseDiscardModal,
		} = this;
		const {
			loadingStatus,
			issue,
			lotteryId,
			traceRecordsData,
			traceRecordBettingsData,
		} = props;
		const {
			isInfoModalVisible,
			isDiscardModalVisible,
			selectedRowKeys,
			operation,
		} = state;
		const isLoading = loadingStatus === LOADING;

		return (
			<Fragment>
				<TraceSearchFrom
					onClickSearch={_handleClickSearch}
					issue={issue}
					lotteryId={lotteryId}
				/>
				<GeneralTraceRecordTable
					isLoading={isLoading}
					traceRecords={traceRecordsData.traceRecords}
					hasAccountField
					onShowTraceList={_handleShowInfoModal}
					onDiscardTraceList={_handleShowDiscardModal}
				/>
				<PageModal
					visible={isInfoModalVisible}
					title="追号列表"
					modalSize="large"
					onClickCancel={_handleCloseInfoModal}
					footer={
						<Button
							outline={Button.OutlineEnums.SOLID}
							onClick={_handleCloseInfoModal}
						>
							关 闭
						</Button>
					}
				>
					<GeneralTraceModalTable
						traceRecordBettings={traceRecordBettingsData.traceRecordBettings}
						modalType={operation}
					/>
				</PageModal>
				<PageModal
					visible={isDiscardModalVisible}
					title="确认提示"
					modalSize={Modal.ModalSizeEnum.LARGE}
					onClickCancel={_handleCloseDiscardModal}
					onClickOk={_handleModalSubmit}
				>
					<GeneralTraceModalTable
						traceRecordBettings={traceRecordBettingsData.traceRecordBettings}
						modalType={operation}
						selectedRowKeys={selectedRowKeys}
						onRowSelection={_handleRowSelection}
					/>
				</PageModal>
			</Fragment>
		);
	}
	componentDidMount() {
		const {
			fetchTraceRecordsAction,
			fetchTraceRecordBettingsAction,
		} = this.props;

		fetchTraceRecordsAction();
		fetchTraceRecordBettingsAction();
	}
}

TraceSearch.propTypes = propTypes;
TraceSearch.defaultProps = defaultProps;

function mapStateToProp(state) {
	const traceRecordBettingsData = state.traceRecordBettings.get('data').toObject();
	const traceRecordsData = state.traceRecords.get('data').toObject();

	return {
		traceRecordBettingsData: {
			traceRecordBettings: traceRecordBettingsData.traceBettings.toArray(),
			page: traceRecordBettingsData.page,
			numOfItems: traceRecordBettingsData.numOfItems,
			numOfPages: traceRecordBettingsData.numOfPages,
		},
		traceRecordsData: {
			traceRecords: traceRecordsData.traceRecords.toArray(),
			page: traceRecordsData.page,
			numOfItems: traceRecordsData.numOfItems,
			numOfPages: traceRecordsData.numOfPages,
		},
		loadingStatus: state.traceRecords.get('loadingStatus'),
	};
}

// TODO 串API後補上 (1)主動query (2)搜尋 (3)撤單 等動作
function mapDispatchToProp(dispatch) {
	return {
		fetchTraceRecordsAction: () => dispatch(fetchTraceRecordsAction()),
		fetchTraceRecordBettingsAction: () => dispatch(fetchTraceRecordBettingsAction()),
	};
}

export default connect(mapStateToProp, mapDispatchToProp)(TraceSearch);
