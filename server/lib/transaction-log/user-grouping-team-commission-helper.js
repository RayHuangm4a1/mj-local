const {
	ENUM_TRANSACTION_STATUS,
	ENUM_TRANSACTION_TYPE,
} = require("../enum");

class UserGroupingTeamCommissionHelper {
	constructor() {
		this.users = {};
	}

	isPendingStatus(status) {
		return status === ENUM_TRANSACTION_STATUS.PENDING;
	}

	isTeamRebateOrTeamFixedWageType(type) {
		return type === ENUM_TRANSACTION_TYPE.TEAM_REBATE || type === ENUM_TRANSACTION_TYPE.TEAM_FIXED_WAGE;
	}

	stringifyAncestorsToMaterializedPath(ancestors) {
		return ancestors.map(({ id }) => id).join(",");
	}

	addPendingTransactionLog(transactionLog) {
		const {
			userId, walletCode, type,
			status, betting,
		} = transactionLog;
		const path = this.stringifyAncestorsToMaterializedPath(betting.ancestors);

		if (!this.isPendingStatus(status)) {
			return;
		}

		if (!this.isTeamRebateOrTeamFixedWageType(type)) {
			return;
		}

		if (this.users[userId] === undefined) {
			this.users[userId] = {};
		}

		if (this.users[userId][walletCode] === undefined) {
			this.users[userId][walletCode] = [];
		}

		if (this.users[userId][walletCode][path] === undefined) {
			this.users[userId][walletCode][path] = [];
		}

		this.users[userId][walletCode][path].push(transactionLog);
	}

	addPendingTransactionLogs(transactionLogs) {
		transactionLogs.forEach(transactionLog => this.addPendingTransactionLog(transactionLog));

		return this;
	}

	getResults() {
		const result = [];

		const userIds = Object.keys(this.users);

		userIds.forEach(userId => {
			const walletCodes = Object.keys(this.users[userId]);

			walletCodes.forEach(walletCode => {
				const paths = Object.keys(this.users[userId][walletCode]);

				paths.forEach(path => {
					result.push({
						userId: parseInt(userId),
						walletCode,
						transactionLogs: this.users[userId][walletCode][path],
					});
				});
			});
		});

		return result;
	}
}

module.exports = UserGroupingTeamCommissionHelper;
