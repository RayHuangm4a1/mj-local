import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import { omit, } from 'lodash';
import { GeneralBettingRecordTable, } from '../../components/table';
import PageModal from '../../components/page-modal';
import { BettingSearchForm, } from '../search-form';
import { connect, } from '../../../ljit-store-connecter';
import { bettingRecordsActions, } from '../../controller';
import { withLoadingStatusNotification, } from '../../../lib/notify-handler';
import { LoadingStatusEnum, } from '../../lib/enums';
import { convertDateStringToTimestamp, } from '../../lib/moment-utils';

const DEFAULT_PAGE = 1;
const { fetchBettingRecordsAction, } = bettingRecordsActions;
const { NONE, SUCCESS, FAILED, LOADING, } = LoadingStatusEnum;

const propTypes = {
	gameType: PropTypes.string,
	issue: PropTypes.string,
	lotteryId: PropTypes.number,
	fetchBettingRecordsAction: PropTypes.func.isRequired,
	bettingRecordsData: PropTypes.shape({
		bettingRecords: PropTypes.array,
		page: PropTypes.number,
		numOfItems: PropTypes.number,
		numOfPages: PropTypes.number,
	}),
	loadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING]),
};
const defaultProps = {};

class BettingSearch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [],
			pagination: {},
			queryParameters: {},
			gameType: props.gameType,
			isDiscardModalVisible: false,
		};
		this._handleSearch = this._handleSearch.bind(this);
		this._handleChangeGameType = this._handleChangeGameType.bind(this);
		this._handleChangeTable = this._handleChangeTable.bind(this);
		this._handleCancelDiscardBetting = this._handleCancelDiscardBetting.bind(this);
		this._handleSubmitDiscardBetting = this._handleSubmitDiscardBetting.bind(this);
	}
	_handleSearch(values) {
		const { fetchBettingRecordsAction, } = this.props;

		const queries = omit(values, [ 'fromTo', ]);
		const { fromTo = [] } = values;
		const [ from, to ] = fromTo;
		const queryParameters = {
			...queries,
			from: convertDateStringToTimestamp(from),
			to: convertDateStringToTimestamp(to),
			order: 'desc'
		};

		fetchBettingRecordsAction(queryParameters);
		this.setState({ queryParameters, });
	}
	_handleChangeGameType(gameType) {
		this.setState({
			gameType,
			queryParameters: {},
		});
	}
	_handleChangeTable(pagination, filters, sorter) {
		const { queryParameters, } = this.state;
		const { fetchBettingRecordsAction, } = this.props;

		let { columnKey, order = 'desc', } = sorter;

		order = order.replace('end', '');

		if (order !== queryParameters.order) {
			pagination.current = DEFAULT_PAGE;
		}
		const {
			current,
			pageSize,
		} = pagination;
		const newQueryParameters = Object.assign({}, queryParameters , {
			limit: pageSize,
			page: current,
			sort: columnKey,
			order,
		});

		fetchBettingRecordsAction(newQueryParameters);
		this.setState({
			pagination,
			queryParameters: newQueryParameters,
		});
	}
	_handleCancelDiscardBetting() {
		this.setState({
			isDiscardModalVisible: false,
		});
	}
	_handleSubmitDiscardBetting() {
		this._handleCancelDiscardBetting();
	}
	render() {
		const {
			props,
			state,
			_handleSearch,
			_handleChangeGameType,
			_handleChangeTable,
			_handleCancelDiscardBetting,
			_handleSubmitDiscardBetting,
		} = this;
		const {
			loadingStatus,
			issue,
			lotteryId,
			bettingRecordsData,
		} = props;
		const {
			gameType,
			pagination,
			isDiscardModalVisible,
		} = state;
		const {
			numOfItems,
			bettingRecords,
		} = bettingRecordsData;
		const isLoading = loadingStatus === LOADING;
		const paginationProps = {
			showSizeChanger: true,
			...pagination,
			total: numOfItems,
		};

		return (
			<Fragment>
				<BettingSearchForm
					issue={issue}
					gameType={gameType}
					lotteryId={lotteryId}
					onSearch={_handleSearch}
					onChangeGameType={_handleChangeGameType}
				/>
				<GeneralBettingRecordTable
					isLoading={isLoading}
					gameType={gameType}
					bettingRecords={bettingRecords}
					hasPagination
					paginationProps={paginationProps}
					onTableChange={_handleChangeTable}
				/>
				<PageModal
					visible={isDiscardModalVisible}
					title="确认提示"
					onClickCancel={_handleCancelDiscardBetting}
					onClickOk={_handleSubmitDiscardBetting}
					modalSize={PageModal.ModalSizeEnum.SMALL}
				>
					<div>是否确定撤单？</div>
				</PageModal>
			</Fragment>
		);
	}
	componentDidMount() {
		const {
			issue,
			lotteryId,
			fetchBettingRecordsAction,
		} = this.props;
		const queryParameters = {
			issue,
			lotteryId,
			order: 'desc',
		};

		const canQueryBettingRecord = !!queryParameters.issue;

		if (canQueryBettingRecord) {
			fetchBettingRecordsAction(queryParameters);
			this.setState({
				queryParameters,
			});
		}
	}
}

BettingSearch.propTypes = propTypes;
BettingSearch.defaultProps = defaultProps;

// TODO 串接 API 來完成撤單動作
function mapStateToProp(state) {
	const data = state.bettingRecords.get('data').toObject();

	return {
		bettingRecordsData: {
			bettingRecords: data.bettingRecords.toArray(),
			page: data.page,
			numOfItems: data.numOfItems,
			numOfPages: data.numOfPages,
		},
		loadingStatus: state.bettingRecords.get('loadingStatus'),
		loadingStatusMessage: state.bettingRecords.get('loadingStatusMessage'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchBettingRecordsAction: (query) => dispatch(fetchBettingRecordsAction(query)),
	};
}

export default connect(mapStateToProp, mapDispatchToProps)(withLoadingStatusNotification(
	[
		{
			loadingStatus: 'loadingStatus',
			loadingStatusMessage: 'loadingStatusMessage',
		},
	],
	BettingSearch
));
