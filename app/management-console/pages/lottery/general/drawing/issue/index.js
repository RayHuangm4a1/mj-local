import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loading, } from 'ljit-react-components';
import { connect, } from '../../../../../../ljit-store-connecter';
import { convertToNumber, } from '../../../../../lib/general-utils';
import { withLoadingStatusNotification, } from '../../../../../../lib/notify-handler';
import { lotteryDrawingIssuePageActions, } from '../../../../../controller';
import { LoadingStatusEnum, } from '../../../../../../lib/enums';
import './style.styl';

const {
	SUCCESS,
	FAILED,
} = LoadingStatusEnum;

const {
	startInitLotteryDrawingIssuePageAction,
} = lotteryDrawingIssuePageActions;

const propTypes = {
	lotteryId: PropTypes.string.isRequired,
	issue: PropTypes.string.isRequired,
	renderedRoutes: PropTypes.object,
	startInitLotteryDrawingIssuePageAction: PropTypes.func.isRequired,
	loadingStatus: PropTypes.oneOf(Object.values(LoadingStatusEnum)).isRequired,
	loadingStatusMessage: PropTypes.string.isRequired,
};

const FailedStatuses = [
	{
		loadingStatus: 'loadingStatus',
		loadingStatusMessage: 'loadingStatusMessage',
	},
];

const PREFIX_CLASS = 'lottery-general-drawing-issue';

class LotteryGeneralDrawingIssuePage extends Component {
	render() {
		const {
			renderedRoutes,
			loadingStatus,
		} = this.props;

		if (loadingStatus === SUCCESS || loadingStatus === FAILED) {
			return (
				<div className={PREFIX_CLASS}>
					{renderedRoutes}
				</div>
			);
		} else {
			return <Loading />;
		}
	}

	componentDidMount() {
		const {
			lotteryId,
			issue,
			startInitLotteryDrawingIssuePageAction,
		} = this.props;

		startInitLotteryDrawingIssuePageAction(convertToNumber(lotteryId), convertToNumber(issue));
	}
}

LotteryGeneralDrawingIssuePage.propTypes = propTypes;

function mapStateToProp(state) {
	return {
		loadingStatus: state.lotteryDrawingIssuePage.get('loadingStatus'),
		loadingStatusMessage: state.lotteryDrawingIssuePage.get('loadingStatusMessage'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		startInitLotteryDrawingIssuePageAction: (lotteryId, issue) => dispatch(startInitLotteryDrawingIssuePageAction(lotteryId, issue)),
	};
}

export default connect(mapStateToProp, mapDispatchToProps)(
	withLoadingStatusNotification(
		FailedStatuses,
		LotteryGeneralDrawingIssuePage
	)
);
