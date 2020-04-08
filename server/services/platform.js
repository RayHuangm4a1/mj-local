const PlatformStore = require("../stores/platform");
const DividendDurationStore = require("../stores/dividend-duration");
const SecurityQuestionStore = require("../stores/security-question");

module.exports = {
	getPlatform: PlatformStore.getPlatform,
	getLastDividendDurations: DividendDurationStore.getLastDividendDurations,
	getLatestDividendDuration: DividendDurationStore.getLatestDividendDuration,
	getDividendableDuration: DividendDurationStore.getDividendableDuration,
	getSecurityQuestions: SecurityQuestionStore.getSecurityQuestions,

	PLATFORM_PROJECTIONS: {
		BETTING: PlatformStore.BETTING_REQUIRED_PROJECTIONS,
		DIVIDEND_DURATION: PlatformStore.DIVIDEND_DURATION_ONLY_PROJECTIONS,
		FIXED_WAGES: PlatformStore.FIXED_WAGES_ONLY_PROJECTIONS,
		USER_CREATION: PlatformStore.CREATE_USER_REQUIRED_PROJECTIONS,
		LOGIN: PlatformStore.LOGIN_REQUIRED_PROJECTIONS,
		BONUS: PlatformStore.BONUS_ONLY_PROJECTIONS,
		WITHDRAWAL_CREATION: PlatformStore.WITHDRAWAL_CREATION_REQUIRED_PROJECTIONS,
	},
	DIVIDEND_DURATION_PROJECTIONS: {
		MIN: DividendDurationStore.MIN_PROJECTIONS,
		ID: DividendDurationStore.ID_ONLY_PROJECTIONS,
	},
	LIMIT_OF_FAILED_LOGIN: 10,
};
