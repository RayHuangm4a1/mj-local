const {
	ForbiddenError,
} = require("ljit-error");
const {
	getTeamDurationStatsByUserIdWalletCodeAndDurationId,
} = require("../../../../services/stats");
const {
	TEAM_DURATION_STATS_NOT_FOUND,
	DIVIDEND_STATUS_IS_INVALID,
	DIVIDEND_EXCEEDED_PROFIT,
} = require("../../../../lib/error/code");
const {
	ENUM_WALLET_CODE,
} = require("../../../../lib/enum");
const {
	GrantChildrenDividendsHelper,
} = require("../../../../lib/stats-helpers");
const {
	isGrantable,
	isGrantedAmountExceedProfit,
} = GrantChildrenDividendsHelper;

module.exports = async function prepareGrantableTeamDurationStats(req, res, next) {
	const { childrenId } = req.params;
	const { amount } = req.body;
	const { id: durationId } = res.locals.previousDividendDuration;

	try {
		const childrenTeamDurationStats = await getTeamDurationStatsByUserIdWalletCodeAndDurationId(childrenId, ENUM_WALLET_CODE.PRIMARY, durationId);

		if (childrenTeamDurationStats === null) {
			throw new ForbiddenError(
				TEAM_DURATION_STATS_NOT_FOUND.MESSAGE,
				TEAM_DURATION_STATS_NOT_FOUND.CODE
			);
		}

		if (!isGrantable(childrenTeamDurationStats)) {
			throw new ForbiddenError(
				DIVIDEND_STATUS_IS_INVALID.MESSAGE,
				DIVIDEND_STATUS_IS_INVALID.CODE
			);
		}

		if (isGrantedAmountExceedProfit(childrenTeamDurationStats, amount)) {
			throw new ForbiddenError(
				DIVIDEND_EXCEEDED_PROFIT.MESSAGE,
				DIVIDEND_EXCEEDED_PROFIT.CODE
			);
		}

		res.locals.childrenTeamDurationStats = childrenTeamDurationStats;
	} catch (error) {
		return next(error);
	}

	next();
};
