import React from 'react';
import PropTypes from 'prop-types';
import TraceSearch from '../../../../../../features/trace-search';

const propTypes = {
	lotteryId: PropTypes.number,
	issue: PropTypes.number,
};
const defaultProps = {};

function TraceRecordTab({
	issue,
	lotteryId,
}) {
	return (
		<TraceSearch
			issue={issue}
			lotteryId={lotteryId}
		/>
	);
}

TraceRecordTab.propTypes = propTypes;
TraceRecordTab.defaultProps = defaultProps;

export default TraceRecordTab;
