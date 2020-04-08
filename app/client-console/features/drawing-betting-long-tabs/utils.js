import PropTypes from 'prop-types';

const datePropType = PropTypes.oneOfType([
	PropTypes.instanceOf(Date),
	PropTypes.string,
]);

export const lotteryDrawingRecordsPropTypes = PropTypes.arrayOf(
	PropTypes.shape({
		id: PropTypes.number,
		status: PropTypes.number,
		issue: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string,
		]),
		index: PropTypes.string,
		opencode: PropTypes.string,
		openedAt: datePropType,
		nextOpenedAt: datePropType,
		missing: PropTypes.object,
		lotteryId: PropTypes.number,
		createdAt: datePropType,
		updatedAt: datePropType,
	})
);