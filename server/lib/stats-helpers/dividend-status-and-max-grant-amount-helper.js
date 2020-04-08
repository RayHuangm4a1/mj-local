const Decimal = require("decimal.js");
const {
	ENUM_DIVIDEND_STATUS,
} = require("../enum");
const {
	NOT_SET,
	NOT_QUALIFIED,
	NOT_GRANTED,
	PARTIAL_GRANTED,
	FULL_GRANTED,
	TEAM_WIN,
} = ENUM_DIVIDEND_STATUS;
const {
	NotFoundError,
} = require("ljit-error");
const {
	USER_ACHIEVED_DIVIDEND_SETTING_NOT_FOUND,
} = require("../error/code");

/**
 * ＠param {object} dividendSettings - User dividend settings are sorted in ascending order by amount.
 * ＠param {object} teamDurationStats - A team duration stats row
*/
class DividendStatusAndMaxGrantAmountHelper {
	constructor({ dividendSettings, teamDurationStats }) {
		this.dividendSettings = dividendSettings;
		this.teamDurationStats = teamDurationStats;
		this.result = {};
	}

	isNotSet() {
		return this.dividendSettings.length === 0;
	}

	isNotQualified() {
		const { bettingAmount } = this.teamDurationStats;
		const { amount, ratio } = this.dividendSettings[0];

		return bettingAmount < amount && ratio === 0;
	}

	isTeamWin() {
		return this.getProfitInDecimal().gte(0);
	}

	isNotGranted() {
		const { grantedAmount } = this.teamDurationStats;

		return this.result.maxGrantAmount > 0 && grantedAmount === 0;
	}

	isPartialGranted() {
		const { grantedAmount } = this.teamDurationStats;

		return grantedAmount > 0 && grantedAmount < this.result.maxGrantAmount;
	}

	isFullGranted() {
		const { grantedAmount } = this.teamDurationStats;

		return grantedAmount >= this.result.maxGrantAmount;
	}

	getProfitInDecimal() {
		const {
			bettingReward, rebateAmount, activityAmount,
			fixedWageAmount, bettingAmount, incentiveAmount,
		} = this.teamDurationStats;

		return new Decimal(bettingReward)
			.add(rebateAmount)
			.add(activityAmount)
			.add(fixedWageAmount)
			.add(incentiveAmount)
			.sub(bettingAmount);
	}

	calculateProfit() {
		return this.getProfitInDecimal().toNumber();
	}

	calculateMaxGrantAmount() {
		if (
			this.isNotSet() ||
			this.isNotQualified() ||
			this.isTeamWin()
		) {
			return 0;
		}

		const { bettingAmount } = this.teamDurationStats;
		const acheivedDividendSetting = this.dividendSettings.find(({ amount }) => bettingAmount < amount);

		if (acheivedDividendSetting === undefined) {
			throw new NotFoundError(
				USER_ACHIEVED_DIVIDEND_SETTING_NOT_FOUND.MESSAGE,
				USER_ACHIEVED_DIVIDEND_SETTING_NOT_FOUND.CODE
			);
		}

		return this.getProfitInDecimal()
			.mul(acheivedDividendSetting.ratio)
			.div(100)
			.abs()
			.toNumber();
	}

	getResult() {
		this.result.maxGrantAmount = this.calculateMaxGrantAmount();

		if (this.isNotSet()) {
			this.result.status = NOT_SET;

		} else if (this.isNotQualified()) {
			this.result.status = NOT_QUALIFIED;

		} else if (this.isTeamWin()) {
			this.result.status = TEAM_WIN;

		} else if (this.isNotGranted()) {
			this.result.status = NOT_GRANTED;

		} else if (this.isPartialGranted()) {
			this.result.status = PARTIAL_GRANTED;

		} else if (this.isFullGranted()) {
			this.result.status = FULL_GRANTED;

		} else {
			throw new Error("unkonwn dividend acheivement.");
		}

		return this.result;
	}
}

module.exports = DividendStatusAndMaxGrantAmountHelper;
