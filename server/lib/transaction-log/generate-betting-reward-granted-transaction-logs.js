const Decimal = require("decimal.js");
const {
	ENUM_TRANSACTION_TYPE,
	ENUM_TRANSACTION_STATUS,
} = require("../enum");
const {
	forEachRight,
} = require("ljit-collection");

module.exports = function (wallet, openedBettings) {
	const results = [];

	let balance = new Decimal(wallet.balance);

	forEachRight(openedBettings, openedBetting => {
		const {
			userId, username, id,
			fixedWageAmount, bettingRebateAmount, reward,
		} = openedBetting;

		if (fixedWageAmount > 0) {
			results.push({
				userId,
				username,
				associateId: id,
				lotteryId: openedBetting.lotteryId,
				issue: openedBetting.issue,
				type: ENUM_TRANSACTION_TYPE.SELF_FIXED_WAGE,
				walletCode: wallet.code,
				amount: fixedWageAmount,
				balance: balance.toNumber(),
				description: `返回自身工资`,
				status: ENUM_TRANSACTION_STATUS.DONE,
			});

			balance = balance.sub(fixedWageAmount);
		}

		if (bettingRebateAmount > 0) {
			results.push({
				userId,
				username,
				associateId: id,
				lotteryId: openedBetting.lotteryId,
				issue: openedBetting.issue,
				type: ENUM_TRANSACTION_TYPE.BETTING_REBATE,
				walletCode: wallet.code,
				amount: bettingRebateAmount,
				balance: balance.toNumber(),
				description: `自身返点`,
				status: ENUM_TRANSACTION_STATUS.DONE,
			});

			balance = balance.sub(bettingRebateAmount);
		}

		if (reward > 0) {
			results.push({
				userId: userId,
				username: username,
				associateId: id,
				lotteryId: openedBetting.lotteryId,
				issue: openedBetting.issue,
				type: ENUM_TRANSACTION_TYPE.BETTING_REWARD,
				walletCode: wallet.code,
				amount: reward,
				balance: balance.toNumber(),
				description: `返回中奖金额`,
				status: ENUM_TRANSACTION_STATUS.DONE,
			});

			balance = balance.sub(reward);
		}
	});

	return results.reverse();
};
