const {
	NotFoundError,
	ForbiddenError,
} = require("ljit-error");
const UserStore = require("../stores/user");
const BettingStore = require("../stores/betting");
const WithdrawalApplicationFormStore = require("../stores/withdrawal-application-form");
const UserStatsStore = require("../stores/user-stats");
const UserDailyStatsStore = require("../stores/user-daily-stats");
const RemitChannelStore = require("../stores/remit-channel");
const {
	validateUserFirstWithdrawal,
	validateAlertedUser,
	validateUserLevel,
	validateUserDamaAmount,
	validateUserRegisteredDays,
	validateUserDailyBettingProfit,
	validateUser30DaysBettingProfit,
	validateUserLotteryBlackListBettingCount,
} = require("../lib/withdrawal/auto-remit-validators");

const {
	USER_NOT_FOUND,
	WITHDRAWAL_NO_REMIT_CHANNEL_WITHIN_AMOUNT,
	WITHDRAWAL_REMIT_TO_BLOCKED_BANK,
} = require("../lib/error/code");
const {
	ENUM_WALLET_CODE,
	ENUM_WITHDRAWAL_APPLICATION_FORM_AUTO_REMIT_REJECT_TYPE,
} = require("../lib/enum");

async function validateWithdrawalApplicationFormCouldAutoRemit({
	platform,
	withdrawalApplicationForm,
}) {
	const { userId, walletCode } = withdrawalApplicationForm;
	const user = await UserStore.getUserById(userId, {
		projections: UserStore.AUTO_REMIT_VALIDATION_PROJECTIONS,
	});

	if (user === null) {
		throw new NotFoundError(USER_NOT_FOUND.MESSAGE, USER_NOT_FOUND.CODE);
	}

	validateUserFirstWithdrawal({ platform, user, });
	validateAlertedUser({ platform, user, });
	validateUserLevel({
		platform,
		withdrawalApplicationForm,
	});

	const userStats = await UserStatsStore.getUserStatsByUserIdAndWalletCode(userId, ENUM_WALLET_CODE.PRIMARY, {
		projections: UserStatsStore.DAMA_AMOUNT_ONLY_PROJECTIONS,
	});

	validateUserDamaAmount({
		platform,
		userStats,
	});
	validateUserRegisteredDays({
		platform,
		user,
	});

	const userDailyStats = await UserDailyStatsStore.getTodayUserDailyStatsByUserIdWalletCode(
		userId,
		walletCode,
		{
			projections: UserDailyStatsStore.BETTING_PROFIT_PROJECTIONS,
		}
	);

	if (userDailyStats !== null) {
		validateUserDailyBettingProfit({
			platform,
			userDailyStats,
		});
	}

	const sumOfUserDailyStats = await UserDailyStatsStore.getSumOfLast30DaysUserDailyStatsByUserIdWalletCode(
		userId,
		walletCode,
		{
			projections: UserDailyStatsStore.BETTING_PROFIT_PROJECTIONS,
		}
	);

	if (sumOfUserDailyStats !== null) {
		validateUser30DaysBettingProfit({
			platform,
			sumOfUserDailyStats,
		});
	}

	const { lotteryBlackList } = platform.autoRemitPolicy;

	if (lotteryBlackList.length) {
		const queries = lotteryBlackList.map(({ lotteryId, issue, }) => ({
			lotteryId,
			issue,
			userId,
		}));
		const count = await BettingStore.countBettingsWithinLotteryIdIssueAndUserId(queries);

		validateUserLotteryBlackListBettingCount({
			count
		});
	}
}

async function getRemitableChannelByBankIdAndAmount(bankId, amount) {
	const remitChannel = await RemitChannelStore.getActiveRemitChannelByAmount(amount, {
		projections: RemitChannelStore.AUTO_REMIT_PROJECTIONS,
	});

	if (remitChannel === null) {
		throw new ForbiddenError(
			WITHDRAWAL_NO_REMIT_CHANNEL_WITHIN_AMOUNT.MESSAGE,
			WITHDRAWAL_NO_REMIT_CHANNEL_WITHIN_AMOUNT.CODE,
			{
				autoRemitRejectType: ENUM_WITHDRAWAL_APPLICATION_FORM_AUTO_REMIT_REJECT_TYPE.NO_REMIT_CHANNEL_WITHIN_AMOUNT,
			}
		);
	}

	if (remitChannel.blockedBankIds.includes(bankId)) {
		throw new ForbiddenError(
			WITHDRAWAL_REMIT_TO_BLOCKED_BANK.MESSAGE,
			WITHDRAWAL_REMIT_TO_BLOCKED_BANK.CODE,
			{
				autoRemitRejectType: ENUM_WITHDRAWAL_APPLICATION_FORM_AUTO_REMIT_REJECT_TYPE.REMIT_TO_BLOCKED_BANK,
			}
		);
	}

	return remitChannel;
}

module.exports = {
	getNewWithdrawalApplicationForms: WithdrawalApplicationFormStore.getNewWithdrawalApplicationForms,
	getReadyWithdrawalApplicationFormsWithPaymentAccountByPaymentClassId: WithdrawalApplicationFormStore.getReadyWithdrawalApplicationFormsWithPaymentAccountByPaymentClassId,
	bulkUpdateWithdrawalApplicationForms: WithdrawalApplicationFormStore.bulkUpdateWithdrawalApplicationForms,
	getRemitableChannelByBankIdAndAmount,
	validateWithdrawalApplicationFormCouldAutoRemit,

	WITHDRAWAL_APPLICATION_FORM_PROJECTIONS: {
		AUTO_WITHDRAWAL: WithdrawalApplicationFormStore.AUTO_WITHDRAWAL_PROJECTIONS,
		REMIT: WithdrawalApplicationFormStore.REMIT_PROJECTIONS,
	},
	REMIT_CHANNEL_PROJECTIONS: {
		AUTO_REMIT: RemitChannelStore.AUTO_REMIT_PROJECTIONS,
	},
};
