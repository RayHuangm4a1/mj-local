const NORMAL_CONDITIONS = {
	isBlocked: false,
	isTeamBlocked: false,
	isBetable: true,
	isDepositable: true,
	isWithdrawable: true,
	isDividendable: true,
	isFundsable: true,
	isTeamBetable: true,
	isTeamDepositable: true,
	isTeamWithdrawable: true,
	isTeamFundsable: true
};

exports.ROOT_USER_ID = 1;
exports.NORMAL_CONDITIONS = NORMAL_CONDITIONS;
exports.NORMAL_STATUSES = Object.keys(NORMAL_CONDITIONS);
exports.isNormal = require("./is-normal");
exports.simplifyPayer = require('./simplify-payer');
