const {
	ENUM_TRANSACTION_TYPE,
	ENUM_TRANSACTION_STATUS,
} = require("../enum");

module.exports = function (wallet, rebates, drawing) {
	return rebates.map(rebate => {
		return {
			userId: rebate.ancestorId,
			username: rebate.ancestorUsername,
			associateId: rebate.bettingId,
			lotteryId: drawing.lotteryId,
			issue: drawing.issue,
			type: ENUM_TRANSACTION_TYPE.TEAM_REBATE,
			walletCode: wallet.code,
			amount: rebate.amount,
			balance: null,
			description: `从${rebate.descendantUsername}返点`,
			status: ENUM_TRANSACTION_STATUS.PENDING,
		};
	});
};
