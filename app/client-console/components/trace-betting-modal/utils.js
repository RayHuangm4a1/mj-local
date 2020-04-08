import PropTypes from 'prop-types';

export const BettingsDataPropTypes = PropTypes.arrayOf(PropTypes.shape({
	play: PropTypes.shape({
		_id: PropTypes.string,
		id: PropTypes.number,
		name: PropTypes.string,
		bonus: PropTypes.number,
	}),
	name: PropTypes.string,
	lotteryName: PropTypes.string,
	betcontent: PropTypes.string,
	weizhi: PropTypes.string,
	multiple: PropTypes.number,
	amountPerBet: PropTypes.number,
	rebate: PropTypes.number,
	amount: PropTypes.number,
	count: PropTypes.number,
}));
