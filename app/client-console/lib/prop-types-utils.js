import PropTypes from 'prop-types';

export const LotteryDataPropTypes = PropTypes.shape({
	_id: PropTypes.string,
	lotteryClass: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		code: PropTypes.string,
		status: PropTypes.string,
	}),
	playClasses: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		code: PropTypes.string,
	})),
	id: PropTypes.number,
	name: PropTypes.string,
	code: PropTypes.string,
	numOfIssues: PropTypes.number,
	status: PropTypes.string,
	tags: PropTypes.array,
	ordering: PropTypes.number,
});

export const MyLotteryCollectionIdsDataPropTypes = PropTypes.arrayOf(PropTypes.number);

export const MyLotteryCollectionsDataPropTypes = PropTypes.arrayOf(LotteryDataPropTypes);

export const StatePropTypes = PropTypes.shape({
	id: PropTypes.number,
	userId: PropTypes.number,
	username: PropTypes.string,
	numOfUsers: PropTypes.number,
	numOfZeroBalanceUsers: PropTypes.number,
	numOfNonZeroBalanceUsers: PropTypes.number,
	balance: PropTypes.number,
	depositAmount: PropTypes.number,
	withdrawalAmount: PropTypes.number,
	createdAt: PropTypes.string,
	updatedAt: PropTypes.string,
	teamBonusStatses: PropTypes.arrayOf(PropTypes.shape({
		deltaBonus: PropTypes.number,
		numOfUsers: PropTypes.number,
	})),
	teamDailyStatses: PropTypes.arrayOf(PropTypes.shape({
		date: PropTypes.string,
		numOfRegistries: PropTypes.number,
		numOfBettingUsers: PropTypes.number,
		numOfEffectiveBettingUsers: PropTypes.number,
	})),
	today: PropTypes.string,
	numOfRegistries: PropTypes.number,
	numOfBettingUsers: PropTypes.number,
});
