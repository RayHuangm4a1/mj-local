class BettingCreationHelper {
	constructor(orders) {
		this.bettings = [];
		this.hasError = false;
		this.orders = orders;

		this.orders.forEach((order, index) => order.oid = index);
	}

	getOrders() {
		return this.orders;
	}

	getBettings() {
		return this.bettings;
	}

	getValidBettings() {
		return this.bettings.filter(BettingCreationHelper.isValidBetting);
	}

	hasInvalidBettings() {
		return this.hasError;
	}

	fillCreatedBettings(createdBettings) {
		createdBettings.forEach(betting => {
			this.bettings[betting.oid] = betting;
		});
	}

	setBetting(index, betting) {
		if (!BettingCreationHelper.isValidBetting(betting)) {
			this.hasError = true;
		}

		this.bettings[index] = betting;
	}

	static isValidBetting(betting) {
		return Number.isInteger(betting.oid);
	}
}

module.exports = BettingCreationHelper;
