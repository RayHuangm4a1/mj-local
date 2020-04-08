const { db } = global.CONFIG;
const {
	schema,
	indexes,
} = require("../schemas/mysql/user");
const model = require("ljit-db/model")(db, "users", schema, indexes);
const WalletModel = require("./wallet");
const TeamDurationStatsModel = require("./team-duration-stats");
const UserDividendSettingModel = require("./user-dividend-setting");
const UserDailyStatsModel = require("./user-daily-stats");
const UserWithdrawalPolicyModel = require("./user-withdrawal-policy");
const UserStatsModel = require("./user-stats");
const TeamStatsModel = require("./team-stats");
const through = require("./relationship").getInstance();
const {
	ENUM_USER_TYPE,
} = require("../lib/enum");
const {
	ROOT_USER_ID,
} = require("../lib/user");

model.hasMany(WalletModel.getInstance(), { constraints: false, as: "wallets" });
model.belongsToMany(model, {
	through: {
		model: through,
		unique: false,
	},
	constraints: false,
	foreignKey: "userId",
	otherKey: "ancestorId",
	as: "ancestors",
});
model.belongsToMany(model, {
	through: {
		model: through,
		unique: false,
	},
	constraints: false,
	foreignKey: "ancestorId",
	otherKey: "userId",
	as: "descendants",
});
model.hasMany(TeamDurationStatsModel.getInstance(), {
	constraints: false,
	as: "teamDurationStats",
	sourceKey: "id",
	foreignKey: "userId",
});
model.hasMany(UserDividendSettingModel.getInstance(), {
	constraints: false,
	as: "userDividendSettings",
	sourceKey: "id",
	foreignKey: "userId",
});
model.hasMany(UserDailyStatsModel.getInstance(), {
	constraints: false,
	as: "userDailyStatses",
	sourceKey: "id",
	foreignKey: "userId",
});
model.hasOne(UserWithdrawalPolicyModel.getInstance(), {
	constraints: false,
	as: "userWithdrawalPolicy",
	sourceKey: "id",
	foreignKey: "userId",
});
model.hasOne(UserStatsModel.getInstance(), {
	constraints: false,
	as: "userStats",
	sourceKey: "id",
	foreignKey: "userId",
});
model.hasOne(TeamStatsModel.getInstance(), {
	constraints: false,
	as: "teamStats",
	sourceKey: "id",
	foreignKey: "userId",
});

model.prototype.isBlocked = function () {
	const { isBlocked, isTeamBlocked } = this.statuses;

	return isBlocked || isTeamBlocked;
};
model.prototype.isBetable = function () {
	const { isBetable, isTeamBetable } = this.statuses;

	return isBetable && isTeamBetable;
};
model.prototype.isChildrenCreatable = function () {
	return this.statuses.isChildrenCreatable;
};
model.prototype.isDividendable = function () {
	return this.statuses.isDividendable;
};
model.prototype.isDepositable = function () {
	const { isDepositable, isTeamDepositable } = this.statuses;

	return isDepositable && isTeamDepositable;
};
model.prototype.hasWithdrawn = function () {
	return this.statuses.hasWithdrawn;
};
model.prototype.isWithdrawable = function () {
	const { isWithdrawable, isTeamWithdrawable } = this.statuses;

	return isWithdrawable && isTeamWithdrawable;
};
model.prototype.isFundsable = function () {
	const { isFundsable, isTeamFundsable } = this.statuses;

	return isFundsable && isTeamFundsable;
};
model.prototype.isAgentOrMember = function () {
	return [
		ENUM_USER_TYPE.AGENT,
		ENUM_USER_TYPE.MEMBER,
	].includes(this.type);
};
model.prototype.isZhaoShang = function () {
	return this.type === ENUM_USER_TYPE.ZHAOSHANG;
};
model.prototype.isAgent = function () {
	return this.type === ENUM_USER_TYPE.AGENT;
};
model.prototype.isRoot = function () {
	return this.id === ROOT_USER_ID;
};
model.prototype.isTransferable = function () {
	return this.statuses.isTransferable;
};

module.exports = require("ljit-db/model/interface")(db, model);
