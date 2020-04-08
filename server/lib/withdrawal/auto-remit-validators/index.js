const validateUserFirstWithdrawal = require("./validators/first-withdrawal");
const validateAlertedUser = require("./validators/alerted-user");
const validateUserLevel = require("./validators/user-level");
const validateUserDamaAmount = require("./validators/user-dama-amount");
const validateUserRegisteredDays = require("./validators/user-registered-days");
const validateUserDailyBettingProfit = require("./validators/user-daily-betting-profit");
const validateUser30DaysBettingProfit = require("./validators/user-30-days-betting-profit");
const validateUserLotteryBlackListBettingCount = require("./validators/user-lottery-black-list-betting-count");

module.exports = {
	validateUserFirstWithdrawal,
	validateAlertedUser,
	validateUserLevel,
	validateUserDamaAmount,
	validateUserRegisteredDays,
	validateUserDailyBettingProfit,
	validateUser30DaysBettingProfit,
	validateUserLotteryBlackListBettingCount,
};
