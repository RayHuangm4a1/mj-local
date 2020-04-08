import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import {
	bettingRecordPropType,
} from '../../lib/betting-utils';
import ClientMessageModal from '../../components/client-message-modal';
import BettingRecordDetailModal from '../../components/betting-record-detail-modal';
import { connect } from 'ljit-store-connecter';
import {
	bettingRecordActions,
	bettingRecordDetailsActions,
} from '../../controller';
import { LoadingStatusEnum } from '../../lib/enums';

const {
	discardBettingRecordAction,
} = bettingRecordActions;
const {
	fetchBettingRecordDetailAction,
} = bettingRecordDetailsActions;

const {
	LOADING,
	SUCCESS,
	FAILED,
	NONE,
} = LoadingStatusEnum;

const propTypes = {
	isModalVisible: PropTypes.bool,
	title: PropTypes.string,
	messageTitle: PropTypes.string,
	bettingRecordId: PropTypes.number,
	bettingRecordDetailsData: bettingRecordPropType,
	discardLoadingStatus: PropTypes.oneOf([LOADING, SUCCESS, FAILED, NONE]),
	onClose: PropTypes.func,
	fetchBettingRecordDetailAction: PropTypes.func.isRequired,
	discardBettingRecordAction: PropTypes.func.isRequired,
};
const defaultProps = {
	isModalVisible: false,
	bettingRecordId: null,
	bettingRecordDetailsData: {},
	onClose: () => {},
};

class BettingRecordDetailModalFeature extends Component {
	constructor() {
		super();
		this.state = {
			isDiscardMessageVisible: false,
		};

		this._handleCloseDiscardMessage = this._handleCloseDiscardMessage.bind(this);
		this._handleDiscardBetting = this._handleDiscardBetting.bind(this);
		this._renderDiscardMessageModal = this._renderDiscardMessageModal.bind(this);
	}

	_handleCloseDiscardMessage() {
		this.setState({
			isDiscardMessageVisible: false,
		});
	}
	_handleDiscardBetting() {
		const {
			bettingRecordId,
			discardBettingRecordAction,
		} = this.props;

		discardBettingRecordAction(bettingRecordId);
		this._handleCloseDiscardMessage();
	}

	_renderDiscardMessageModal() {
		const {
			messageTitle,
		} = this.props;
		const {
			isDiscardMessageVisible,
		} = this.state;
		const {
			_handleCloseDiscardMessage,
			_handleDiscardBetting,
		} = this;

		return (
			<ClientMessageModal
				isVisible={isDiscardMessageVisible}
				title={messageTitle}
				message="是否确定撤单？"
				okText="撤单"
				onClickCancel={_handleCloseDiscardMessage}
				onClickOk={_handleDiscardBetting}
			/>
		);
	}

	render() {
		const {
			isModalVisible,
			title,
			bettingRecordDetailsData = {},
			bettingRecordId,
			onClose,
		} = this.props;
		const {
			_renderDiscardMessageModal,
		} = this;
		const bettingRecord = bettingRecordDetailsData.hasOwnProperty(bettingRecordId) ?
			bettingRecordDetailsData[bettingRecordId] : {};
		
		return (
			<Fragment>
				<BettingRecordDetailModal
					isModalVisible={isModalVisible}
					title={title}
					bettingRecord={bettingRecord}
					onDiscardBetting={() => this.setState({ isDiscardMessageVisible: true, })}
					onClose={onClose}
				/>
				{_renderDiscardMessageModal()}
			</Fragment>
		);
	}

	componentDidMount() {
		const {
			bettingRecordId,
			fetchBettingRecordDetailAction,
		} = this.props;

		if (bettingRecordId) {
			fetchBettingRecordDetailAction(bettingRecordId);
		}
	}

	componentDidUpdate(prevProps) {
		const {
			isModalVisible,
			bettingRecordId,
			discardLoadingStatus,
			fetchBettingRecordDetailAction,
		} = this.props;
		const isOpeningModal = !prevProps.isModalVisible && isModalVisible;
		const isDiscardSuccess = prevProps.discardLoadingStatus === LOADING && discardLoadingStatus === SUCCESS;

		if (isOpeningModal || isDiscardSuccess) {
			if (bettingRecordId) {
				fetchBettingRecordDetailAction(bettingRecordId);
			}
		}
	}
}

BettingRecordDetailModalFeature.propTypes = propTypes;
BettingRecordDetailModalFeature.defaultProps = defaultProps;

function mapStateToProps(state) {
	return {
		bettingRecordDetailsData: state.bettingRecordDetails.get('data').toObject(),
		discardLoadingStatus: state.bettingRecords.get('discardLoadingStatus'),
	};
}
function mapDispatchToProps(dispatch) {
	return {
		fetchBettingRecordDetailAction: (...args) => dispatch(fetchBettingRecordDetailAction(...args)),
		discardBettingRecordAction: (...args) => dispatch(discardBettingRecordAction(...args)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(BettingRecordDetailModalFeature);
