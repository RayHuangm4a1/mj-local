const UserDailyStatsStore = require("../stores/user-daily-stats");
const TeamDailyStatsStore = require("../stores/team-daily-stats");
const TeamDurationStatsStore = require("../stores/team-duration-stats");
const UserStatsStore = require("../stores/user-stats");
const TeamStatsStore = require("../stores/team-stats");

module.exports = {
	getTeamStatsWithBonusStatsAndDailyStatsByUserIdAndWalletCode: TeamStatsStore.getTeamStatsWithBonusStatsAndDailyStatsByUserIdAndWalletCode,
	getUserDailyStatsByUserIdWalletCodeAndDates: UserDailyStatsStore.getUserDailyStatsByUserIdWalletCodeAndDates,
	getTeamDailyStatsWithinUserIdsWalletCodeAndDates: TeamDailyStatsStore.getTeamDailyStatsWithinUserIdsWalletCodeAndDates,
	getTeamDurationStatsByUserIdWalletCodeAndDurationId: TeamDurationStatsStore.getTeamDurationStatsByUserIdWalletCodeAndDurationId,

	USER_DAILY_STATS_PROJECTIONS: {
		WITHDRAWAL_CREATION: UserDailyStatsStore.WITHDRAWAL_CREATION_REQUIRED_PROJECTIONS,
	},
	USER_STATS_PROJECTIONS: {
		DAMA_AMOUNT: UserStatsStore.DAMA_AMOUNT_ONLY_PROJECTIONS,
	},

};
