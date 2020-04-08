const {
	ENUM_TRANSACTION_TYPE,
	ENUM_TRANSACTION_STATUS,
} = require("../enum");

module.exports = function (wallet, fixedWages, drawing) {
	return fixedWages.map(fixedWage => {
		return {
			userId: fixedWage.ancestorId,
			username: fixedWage.ancestorUsername,
			associateId: fixedWage.bettingId,
			lotteryId: drawing.lotteryId,
			issue: drawing.issue,
			type: ENUM_TRANSACTION_TYPE.TEAM_FIXED_WAGE,
			walletCode: wallet.code,
			amount: fixedWage.amount,
			balance: null,
			description: `从${fixedWage.descendantUsername}返回工资`,
			status: ENUM_TRANSACTION_STATUS.PENDING,
		};
	});
};
