import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import BettingRecordDetailModalFeature from '../../../../features/betting-record-detail-modal';
import {
	TextButton,
} from 'ljit-react-components';

const propTypes = {
	bettingRecordId: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
};
const defaultProps = {
	bettingRecord: {},
	buttonText: 'open modal',
};

class BettingRecordModalButton extends Component {
	constructor() {
		super();
		this.state = {
			isBettingRecordDetailModalVisible: false,
		};

		this._handleShowBettingRecordDetailModal = this._handleShowBettingRecordDetailModal.bind(this);
	}

	_handleShowBettingRecordDetailModal() {
		this.setState({ isBettingRecordDetailModalVisible: true, });
	}

	render() {
		const {
			_handleShowBettingRecordDetailModal,
		} = this;
		const {
			isBettingRecordDetailModalVisible,
		} = this.state;
		const {
			bettingRecordId,
		} = this.props;

		return (
			<React.Fragment>
				<TextButton
					text={bettingRecordId}
					onClick={_handleShowBettingRecordDetailModal}
				/>
				<BettingRecordDetailModalFeature
					title="帐变详情"
					isModalVisible={isBettingRecordDetailModalVisible}
					messageTitle="投注撤单"
					bettingRecordId={bettingRecordId}
					onClose={() => this.setState({ isBettingRecordDetailModalVisible: false, })}
				/>
			</React.Fragment>
		);
	}
}

BettingRecordModalButton.propTypes = propTypes;
BettingRecordModalButton.defaultProps = defaultProps;

export default BettingRecordModalButton;
