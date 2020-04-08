const {
	findOne,
	update,
	getTransaction,
} = require("../models/platform");
const BETTING_REQUIRED_PROJECTIONS = [
	"id",
	"bonus",
	"bettingPolicy",
];
const TRACE_REQUIRED_PROJECTION = [
	"id",
	"bonus",
	"bettingPolicy",
];
const FIXED_WAGES_ONLY_PROJECTIONS = [
	"id",
	"fixedWages",
];
const CREATE_USER_REQUIRED_PROJECTIONS = [
	"id",
	"bonus",
	"couldEqualToPlatformMaxBonus",
	"couldEqualToParentBonus",
];
const LOGIN_REQUIRED_PROJECTIONS = [
	"id",
	"_id",
];
const BONUS_ONLY_PROJECTIONS = [
	"id",
	"bonus",
];
const DIVIDEND_DURATION_ONLY_PROJECTIONS = [
	"id",
	"dividendDuration",
];
const DIVIDEND_STATS_REQUIRED_PROJECTIONS = [
	"id",
	"dividendDuration",
	"dividendSettings",
];
const AUTO_REMIT_PROJECTIONS = [
	"id",
	"autoRemitPolicy",
];
const WITHDRAWAL_CREATION_REQUIRED_PROJECTIONS = [
	"id",
	"withdrawalPolicy",
];
const UPDATE_FIXED_WAGE_REQUIRED_PROJECTIONS = [
	"id",
	"fixedWage",
	"fixedWages",
];
const CREATE_ZHAOSHANG_REQUIRED_PROJECTIONS = [
	"id",
	"fixedWage",
	"bonus",
];
const CREATE_STAFF_REQUIRED_PROJECTIONS = [
	"id",
	"_id",
];

function getPlatform({
	projections,
} = {}) {
	return findOne({
		where: {
			id: 1,
		},
		raw: false,
		attributes: projections,
	});
}

function updateDividendSettings(dividendSettings, { transaction } = {}) {
	return update({
		dividendSettings,
	}, {
		where: {
			id: 1,
		},
		transaction,
	});
}

function updateFixedWage(fixedWage, { transaction } = {}) {
	return update({
		fixedWage,
	}, {
		where: {
			id: 1,
		},
		transaction,
	});
}

module.exports = {
	getTransaction,
	getPlatform,

	updateDividendSettings,
	updateFixedWage,

	BETTING_REQUIRED_PROJECTIONS,
	TRACE_REQUIRED_PROJECTION,
	FIXED_WAGES_ONLY_PROJECTIONS,
	CREATE_USER_REQUIRED_PROJECTIONS,
	LOGIN_REQUIRED_PROJECTIONS,
	BONUS_ONLY_PROJECTIONS,
	DIVIDEND_DURATION_ONLY_PROJECTIONS,
	DIVIDEND_STATS_REQUIRED_PROJECTIONS,
	AUTO_REMIT_PROJECTIONS,
	WITHDRAWAL_CREATION_REQUIRED_PROJECTIONS,
	UPDATE_FIXED_WAGE_REQUIRED_PROJECTIONS,
	CREATE_ZHAOSHANG_REQUIRED_PROJECTIONS,
	CREATE_STAFF_REQUIRED_PROJECTIONS,
};
