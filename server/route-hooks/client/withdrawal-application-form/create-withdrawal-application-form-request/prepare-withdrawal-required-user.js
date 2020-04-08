const {
	ForbiddenError,
	NotFoundError,
} = require("ljit-error");
const {
	USER_NOT_FOUND,
	USER_IS_BLOCKED,
} = require("../../../../lib/error/code");
const {
	getUserWithWithdrawalRequiredProfileByIdWalletCodeAndBankCardId,
	USER_PROJECTIONS,
} = require("../../../../services/user");
const {
	USER_DAILY_STATS_PROJECTIONS,
	USER_STATS_PROJECTIONS,
} = require("../../../../services/stats");
const {
	USER_WITHDRAWAL_POLICY_PROJECTIONS,
} = require("../../../../services/withdrawal");
const {
	BANK_CARD_PROJECTIONS,
	USER_BANK_CARD_PROJECTIONS,
} = require("../../../../services/bank-card");

module.exports = async function prepareWithdrawalRequiredUser(req, res, next) {
	const { id: userId } = req.user;
	const { walletCode, bankCardId } = req.body;

	try {
		const withdrawalRequiredUser = await getUserWithWithdrawalRequiredProfileByIdWalletCodeAndBankCardId(userId, walletCode, bankCardId, {
			userProjections: USER_PROJECTIONS.WITHDRAWAL_CREATION,
			userDailyStatsProjections: USER_DAILY_STATS_PROJECTIONS.WITHDRAWAL_CREATION,
			userWithdrawalPolicyProjections: USER_WITHDRAWAL_POLICY_PROJECTIONS.WITHDRAWAL_CREATION,
			bankCardProjections: BANK_CARD_PROJECTIONS.MIN,
			userBankCardProjections: USER_BANK_CARD_PROJECTIONS.WITHDRAWABLE_AT,
			userStatsProjections: USER_STATS_PROJECTIONS.DAMA_AMOUNT,
		});

		if (withdrawalRequiredUser === null) {
			throw new NotFoundError(USER_NOT_FOUND.MESSAGE, USER_NOT_FOUND.CODE);
		}

		if (withdrawalRequiredUser.isBlocked()) {
			throw new ForbiddenError(USER_IS_BLOCKED.MESSAGE, USER_IS_BLOCKED.CODE);
		}

		if (!withdrawalRequiredUser.userDailyStatses.length) {
			withdrawalRequiredUser.set("userDailyStatses", [
				{
					numOfWithdrawals: 0,
					withdrawalAmount: 0,
				}
			]);
		}

		res.locals.user = withdrawalRequiredUser;
	} catch (error) {
		return next(error);
	}

	next();
};
