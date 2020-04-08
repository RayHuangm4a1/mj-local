import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'ljit-store-connecter';
import VerifyBettingPasswordModal from '../../components/verify-betting-password-modal';
import { bettingActions } from '../../controller';
import { BettingProcessStatusEnum } from '../../lib/betting-utils';

const propTypes = {
	selectedLottery: PropTypes.object,
	bettingsData: PropTypes.array,
	startBetAction: PropTypes.func,
	cancelBetAction: PropTypes.func,
	bettingProcessStatus: PropTypes.number.isRequired,
};
const defaultProps = {
	selectedLottery: {},
	bettingsData: [],
	startBetAction: () => {},
	cancelBetAction: () => {},
};

const {
	startBetAction,
	cancelBetAction,
} = bettingActions;
const {
	NO_PASSWORD,
} = BettingProcessStatusEnum;


function BettingWithPasswordFeature({
	cancelBetAction,
	selectedLottery,
	bettingsData,
	startBetAction,
	bettingProcessStatus,
}) {
	const [ isModalVisible, setIsModalVisible ] = useState(false);

	useEffect(() => {
		if (bettingProcessStatus === NO_PASSWORD) {
			setIsModalVisible(true);
		}
	}, [bettingProcessStatus]);

	function _handleSubmitBetting(password) {
		const lotteryId = selectedLottery.id;
		const bettings = [...bettingsData];

		startBetAction(lotteryId, {
			bettings,
			password,
		});

		setIsModalVisible(false);
	}

	function _handleCancelBetting() {
		cancelBetAction();
		setIsModalVisible(false);
	}

	return (
		<VerifyBettingPasswordModal
			isModalVisible={isModalVisible}
			onClickSubmit={_handleSubmitBetting}
			onClickCancel={_handleCancelBetting}
		/>
	);
}

function mapStateToProps(state) {
	return {
		bettingsData: state.bettings.get('data').toArray(),
		selectedLottery: state.selectedLottery.toObject(),
		bettingProcessStatus: state.bettings.get('bettingProcessStatus'),
	};
}
function mapDispatchToProps(dispatch) {
	return {
		startBetAction: (lotteryId, data) => dispatch(startBetAction(lotteryId, data)),
		cancelBetAction: () => dispatch(cancelBetAction()),
	};
}

BettingWithPasswordFeature.propTypes = propTypes;
BettingWithPasswordFeature.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(BettingWithPasswordFeature);
