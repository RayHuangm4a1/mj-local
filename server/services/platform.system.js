const PlatformStore = require("../stores/platform");
const DividendDurationStore = require("../stores/dividend-duration");

module.exports = {
	getPlatform: PlatformStore.getPlatform,
	getDividendableDuration: DividendDurationStore.getDividendableDuration,

	PLATFORM_PROJECTIONS: {
		DIVIDEND_DURATION: PlatformStore.DIVIDEND_DURATION_ONLY_PROJECTIONS,
		AUTO_REMIT: PlatformStore.AUTO_REMIT_PROJECTIONS,
	},
	DIVIDEND_DURATION_PROJECTIONS: {
		ID: DividendDurationStore.ID_ONLY_PROJECTIONS,
	},
};
