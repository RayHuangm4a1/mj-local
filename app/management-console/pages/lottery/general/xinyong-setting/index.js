import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'ljit-store-connecter';
import { lotteryPlayBonusXinyongManagementPageActions } from '../../../../controller';
import { withLoadingStatusNotification, } from '../../../../../lib/notify-handler';
import './style.styl';

const {
	startInitLotteryPlayBonusXinyongManagementPageAction,
} = lotteryPlayBonusXinyongManagementPageActions;

const propTypes = {
	renderedRoutes: PropTypes.object.isRequired,
	startInitLotteryPlayBonusXinyongManagementPageAction: PropTypes.func.isRequired,
};

class LotteryGeneralXinyongSettingPage extends Component {
	render() {
		const { renderedRoutes } = this.props;

		return (
			<div className="general-xinyong-setting">
				{renderedRoutes}
			</div>
		);
	}
	componentDidMount() {
		const { startInitLotteryPlayBonusXinyongManagementPageAction } = this.props;

		startInitLotteryPlayBonusXinyongManagementPageAction();
	}
}

LotteryGeneralXinyongSettingPage.propTypes = propTypes;


function mapStateToProps(state) {
	return {
		loadingStatus: state.lotteryPlayBonusXinyongManagementPage.get('loadingStatus'),
		loadingStatusMessage: state.lotteryPlayBonusXinyongManagementPage.get('loadingStatusMessage'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		startInitLotteryPlayBonusXinyongManagementPageAction: () => dispatch(startInitLotteryPlayBonusXinyongManagementPageAction()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(withLoadingStatusNotification(
	[
		{
			loadingStatus: 'loadingStatus',
			loadingStatusMessage: 'loadingStatusMessage',
		},
	],
	LotteryGeneralXinyongSettingPage
));
