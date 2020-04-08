const {
	create,
	findAndCountAll,
	count,
	findOne,
	find,
	update,
	getTransaction,
	getInstance,
	getCursor,
} = require("../models/user");
const WalletModel = require("../models/wallet");
const BankCardModel = require("../models/bank-card");
const UserBankCardModel = require("../models/user-bank-card");
const TeamDurationStatsModel = require("../models/team-duration-stats");
const UserDividendSettingModel = require("../models/user-dividend-setting");
const UserDailyStatsModel = require("../models/user-daily-stats");
const UserWithdrawalPolicyModel = require("../models/user-withdrawal-policy");
const UserStatsModel = require("../models/user-stats");
const TeamStatsModel = require("../models/team-stats");
const RelationshipModel = require("../models/relationship");
const {
	getOffsetByPageAndLimit,
} = require("./index");
const {
	NotFoundError,
} = require("ljit-error");
const {
	USER_NOT_FOUND,
} = require("../lib/error/code");
const {
	ENUM_USER_TYPE,
	ENUM_WALLET_CODE,
	ENUM_BANK_CARD_STATUS,
	ENUM_RELATIONSHIP_DISTANCE,
	ENUM_DIVIDEND_TYPE,
} = require("../lib/enum");
const {
	generateStatsDateString,
} = require("../lib/date");
const {
	ROOT_USER_ID,
} = require("../lib/user");
const { NORMAL_CONDITIONS, NORMAL_STATUSES } = require("../../server/lib/user");
const SQLWhereClauseBuilder = require("../lib/sequlize-query-builder/sql-where-clause-builder");
const SQLOrderClauseBuilder = require("../lib/sequlize-query-builder/sql-order-clause-builder");
const Sequelize = require("sequelize");
const { Op } = Sequelize;
const ME_PROJECTIONS = [
	"id",
	"username",
	"type",
	"deltaBonus",
	"nickname",
	"greeting",
	"statuses",
	"ip",
	"geo",
	"loginAt",
	"fixedWage",
	"createdAt",
	"payer",
	"loginPasswordUpdatedAt",
	"betPasswordUpdatedAt",
];
const MIN_PROJECTIONS = [
	"id",
	"username",
	"deltaBonus",
	"statuses",
	"loginAt",
];
const CHILDREN_REQUIRED_PROJECTIONS = [
	"id",
	"username",
	"type",
	"deltaBonus",
	"loginAt",
	"createdAt",
];
const CHILDREN_DIVIDEND_REQUIRED_PROJECTIONS = [
	"id",
	"username",
	"deltaBonus",
];
const DELTA_BONUS_AND_FIXED_WAGE_PROJECTIONS = [
	"id",
	"username",
	"deltaBonus",
	"fixedWage",
];
const ID_ONLY_PROJECTIONS = [
	"id",
];
const BETTING_REQUIRED_PROJECTIONS = [
	"id",
	"type",
	"deltaBonus",
	"statuses",
];
const DELTA_BONUS_ONLY_PROJECTIONS = [
	"id",
	"deltaBonus",
	"statuses",
];
const FIXED_WAGE_ONLY_PROJECTIONS = [
	"id",
	"fixedWage",
	"statuses",
];
const CHILDREN_FIXED_WAGE_PROJECTIONS = [
	"id",
	"username",
	"deltaBonus",
	"fixedWage",
	"createdAt",
];
const TYPE_ONLY_PROJECTIONS = [
	"id",
	"type",
	"statuses",
];
const PAYER_ONLY_PROJECTIONS = [
	"id",
	"payer",
	"statuses",
];
const ACCOUNT_ID_ONLY_PROJECTIONS = [
	"id",
	"accountId",
	"statuses",
];
const LOGIN_GEO_VALIDATION_PROJECTIONS = [
	"id",
	"username",
	"accountId",
	"type",
	"greeting",
	"statuses",
	"ip",
];
const DEPOSIT_REQUIRED_PROJECTIONS = [
	"id",
	"username",
	"levelId",
	"payer",
	"statuses",
];
const LEVEL_ID_ONLY_PROJECTIONS = [
	"id",
	"levelId",
	"statuses",
];
const AUTO_REMIT_VALIDATION_PROJECTIONS = [
	"id",
	"username",
	"statuses",
	"createdAt",
];
const WITHDRAWAL_CREATION_REQUIRED_PROJECTIONS = [
	"id",
	"username",
	"levelId",
	"statuses",
];
const STATUSES_ONLY_PROJECTIONS = [
	"id",
	"accountId",
	"statuses",
];
const TYPE_AND_DELTA_BONUS_PROJECTIONS = [
	"id",
	"type",
	"deltaBonus",
	"statuses",
];
const USERNAME_ONLY_PROJECTIONS = [
	"id",
	"username",
];
const NICKNAME_AND_DELTABONUS_PROJECTIONS = [
	"id",
	"username",
	"nickname",
	"deltaBonus",
];
const USERNAME_AND_LOGIN_AT_PROJECTIONS = [
	"id",
	"username",
	"loginAt",
];
const USERNAME_NICKNAME_AND_LEVEL_PROJECTIONS = [
	"id",
	"username",
	"nickname",
	"levelId",
	"levelExpiredAt",
];

function createUser(row, {
	transaction,
} = {}) {
	return create(row, { transaction });
}

function getUserById(id, {
	transaction,
	lock,
	projections,
} = {}) {
	return findOne({
		where: {
			id,
		},
		transaction,
		lock,
		raw: false,
		attributes: projections,
	});
}

function getUserByUsername(username, {
	projections,
} = {}) {
	return findOne({
		where: {
			username,
		},
		raw: false,
		attributes: projections,
	});
}

function getUsersByType(type, {
	projections,
	transaction,
} = {}) {
	return find({
		where: {
			type,
		},
		attributes: projections,
		transaction,
	});
}

function getUserWithParentById(id, {
	projections,
	transaction,
} = {}) {
	return findOne({
		where: { id },
		include: [{
			model: getInstance(),
			through: {
				where: {
					distance: ENUM_RELATIONSHIP_DISTANCE.PARENT,
				},
				attributes: [],
			},
			as: "ancestors",
			attributes: projections,
			required: false,
		}],
		transaction,
		raw: false,
		attributes: projections,
	});
}

function getUserWithChildByIdAndChildId(id, childId, {
	transaction,
	lock,
	projections,
} = {}) {
	return findOne({
		where: { id },
		include: [{
			model: getInstance(),
			through: {
				where: {
					userId: childId,
					distance: ENUM_RELATIONSHIP_DISTANCE.CHILDREN,
				},
				attributes: [],
			},
			as: "descendants",
			attributes: projections,
			required: true,
		}],
		lock,
		transaction,
		subQuery: false,
		raw: false,
		attributes: projections,
	});
}

function getUserWithGreaterThanDeltaBonusDescendantsById(id, deltaBonus, {
	transaction,
	lock,
	projections,
} = {}) {
	return findOne({
		where: { id },
		include: [{
			model: getInstance(),
			where: {
				deltaBonus: {
					[Op.gt]: deltaBonus,
				},
			},
			through: {
				where: {
					distance: {
						[Op.gt]: ENUM_RELATIONSHIP_DISTANCE.ME,
					},
				},
				attributes: [],
			},
			as: "descendants",
			attributes: projections,
			required: false,
		}],
		lock,
		transaction,
		subQuery: false,
		raw: false,
		attributes: projections,
	});
}

function updateLoginAuditById(id, {
	ip,
	geo,
	loginAt,
}) {
	return update({
		ip,
		geo,
		loginAt,
	}, {
		where: {
			id,
		}
	});
}

async function updateNicknameById(id, nickname) {
	const result = await update({
		nickname,
	}, {
		where: {
			id,
		},
	});

	if (result === null || result.affectedRows !== 1) {
		throw new NotFoundError(USER_NOT_FOUND.MESSAGE, USER_NOT_FOUND.CODE);
	}
}

async function updateGreetingById(id, greeting) {
	const result = await update({
		greeting,
	}, {
		where: {
			id,
		},
	});

	if (result === null || result.affectedRows !== 1) {
		throw new NotFoundError(USER_NOT_FOUND.MESSAGE, USER_NOT_FOUND.CODE);
	}
}

function updatePayerById(id, payer) {
	return update({
		payer,
	}, {
		where: {
			id,
		},
	});
}

function updateAgentOrMemberTypeById(id, type) {
	return update({
		type,
	}, {
		where: {
			id,
			type: {
				[Op.in]: [
					ENUM_USER_TYPE.AGENT,
					ENUM_USER_TYPE.MEMBER,
				]
			}
		},
	});
}

function updateTypeFromMemberToAgentByIdAndDeltaBonus(id, deltaBonus) {
	return update({
		type: ENUM_USER_TYPE.AGENT,
	}, {
		where: {
			id,
			type: ENUM_USER_TYPE.MEMBER,
			deltaBonus,
		}
	});
}

async function getChildrenWithWalletsByUserIdAndPagination(userId, page, {
	me = false,
	username,
	deltaBonus,
	minBalance,
	maxBalance,
	walletCode,
	limit,
	projections,
	sort: field,
	order: rule,
} = {}) {
	const offset = getOffsetByPageAndLimit(page, limit);

	const userWhereClause = new SQLWhereClauseBuilder()
		.setEqual("username", username)
		.setEqual("deltaBonus", deltaBonus)
		.build();

	const relationshipWhereClauseBuilder = new SQLWhereClauseBuilder();

	relationshipWhereClauseBuilder.setEqual("ancestorId", userId);

	if (me) {
		relationshipWhereClauseBuilder.setIn("distance", [ENUM_RELATIONSHIP_DISTANCE.ME, ENUM_RELATIONSHIP_DISTANCE.CHILDREN]);
	} else {
		relationshipWhereClauseBuilder.setEqual("distance", ENUM_RELATIONSHIP_DISTANCE.CHILDREN);
	}

	const relationshipWhereClause = relationshipWhereClauseBuilder.build();

	const walletWhereClause = new SQLWhereClauseBuilder()
		.setEqual("code", walletCode)
		.setGte("balance", minBalance)
		.setLte("balance", maxBalance)
		.build();

	const orderClauseBuilder = new SQLOrderClauseBuilder();

	if (field === "balance") {
		orderClauseBuilder.setRefOrder("wallets", field, rule);
	} else if (field === "teamBalance") {
		orderClauseBuilder.setRefOrder("teamStats", "balance", rule);
	} else if (field === "numOfUsers") {
		orderClauseBuilder.setRefOrder("teamStats", "numOfUsers", rule);
	} else {
		orderClauseBuilder.setOrder(field, rule);
	}

	const orderClause = orderClauseBuilder.build();

	const { count: numOfItems, rows: children } = await findAndCountAll({
		where: userWhereClause,
		order: [
			["ancestors", RelationshipModel.getInstance(), "distance", "asc"],
			...orderClause,
		],
		include: [
			{
				model: getInstance(),
				through: {
					where: relationshipWhereClause,
				},
				as: "ancestors",
				attributes: [],
				required: true,
			},
			{
				model: WalletModel.getInstance(),
				where: walletWhereClause,
				attributes: ["code", "balance"],
				as: "wallets",
			},
			{
				model: TeamStatsModel.getInstance(),
				attributes: ["numOfUsers", "balance"],
				as: "teamStats",
			},
		],
		offset,
		limit,
		subQuery: false,
		raw: false,
		distinct: true,
		attributes: projections,
	});

	return {
		children,
		numOfItems,
		numOfPages: Math.ceil(numOfItems / limit),
	};
}

async function getUserWithAncestorsById(id, {
	transaction,
	userProjections,
	ancestorProjections,
	order = "asc"
} = {}) {
	const model = getInstance();

	const user = await findOne({
		transaction,
		where: { id },
		raw: false,
		attributes: userProjections,
		include: [{
			model,
			through: {
				where: {
					distance: {
						[Op.gt]: 0,
					}
				},
				attributes: [],
			},
			as: "ancestors",
			attributes: ancestorProjections,
			required: false,
		}],
		order: [[
			{
				through: { model },
			},
			"distance",
			order,
		]],
	});

	return user;
}

function blockUserById(id) {
	return update({
		statuses: Sequelize.literal(
			"JSON_REPLACE(`statuses`, '$.isBlocked', true)"
		),
	}, {
		where: {
			id,
			"statuses.isBlocked": false,
		},
	});
}

function unblockUserById(id) {
	return update({
		statuses: Sequelize.literal(
			"JSON_REPLACE(`statuses`, '$.isBlocked', false)"
		),
	}, {
		where: {
			id,
			"statuses.isBlocked": true,
		},
	});
}

function blockTeamMembersWithinIds(ids, {
	transaction,
} = {}) {
	return update({
		statuses: Sequelize.literal(
			"JSON_REPLACE(`statuses`, '$.isTeamBlocked', true)"
		),
	}, {
		where: {
			id: {
				[Op.in]: ids,
			},
			"statuses.isTeamBlocked": false,
		},
		transaction,
	});
}

function unblockTeamMembersWithinIds(ids, {
	transaction,
} = {}) {
	return update({
		statuses: Sequelize.literal(
			"JSON_REPLACE(`statuses`, '$.isTeamBlocked', false)"
		),
	}, {
		where: {
			id: {
				[Op.in]: ids,
			},
			"statuses.isTeamBlocked": true,
		},
		transaction,
	});
}

function unblockTeamMemberById(id) {
	return update({
		statuses: Sequelize.literal(
			"JSON_REPLACE(`statuses`, '$.isTeamBlocked', false)"
		),
	}, {
		where: {
			id,
			"statuses.isTeamBlocked": true,
		},
	});
}

function enableTeamBettingWithinIds(ids, {
	transaction,
} = {}) {
	return update({
		statuses: Sequelize.literal(
			"JSON_REPLACE(`statuses`, '$.isTeamBetable', true)"
		),
	}, {
		where: {
			id: {
				[Op.in]: ids,
			},
			"statuses.isTeamBetable": false,
		},
		transaction,
	});
}

function disableTeamBettingWithinIds(ids, {
	transaction,
} = {}) {
	return update({
		statuses: Sequelize.literal(
			"JSON_REPLACE(`statuses`, '$.isTeamBetable', false)"
		),
	}, {
		where: {
			id: {
				[Op.in]: ids,
			},
			"statuses.isTeamBetable": true,
		},
		transaction,
	});
}

function enableTeamMemberBettingById(id) {
	return update({
		statuses: Sequelize.literal(
			"JSON_REPLACE(`statuses`, '$.isTeamBetable', true)"
		),
	}, {
		where: {
			id,
			"statuses.isTeamBetable": false,
		},
	});
}

function enableUserBettingById(id) {
	return update({
		statuses: Sequelize.literal(
			"JSON_REPLACE(`statuses`, '$.isBetable', true)"
		),
	}, {
		where: {
			id,
			"statuses.isBetable": false,
		},
	});
}

function disableUserBettingById(id) {
	return update({
		statuses: Sequelize.literal(
			"JSON_REPLACE(`statuses`, '$.isBetable', false)"
		),
	}, {
		where: {
			id,
			"statuses.isBetable": true,
		},
	});
}

function enableUserDepositById(id) {
	return update({
		statuses: Sequelize.literal(
			"JSON_REPLACE(`statuses`, '$.isDepositable', true)"
		),
	}, {
		where: {
			id,
			"statuses.isDepositable": false,
		},
	});
}

function disableUserDepositById(id) {
	return update({
		statuses: Sequelize.literal(
			"JSON_REPLACE(`statuses`, '$.isDepositable', false)"
		),
	}, {
		where: {
			id,
			"statuses.isDepositable": true,
		},
	});
}

function enableUserWithdrawalById(id) {
	return update({
		statuses: Sequelize.literal(
			"JSON_REPLACE(`statuses`, '$.isWithdrawable', true)"
		),
	}, {
		where: {
			id,
			"statuses.isWithdrawable": false,
		},
	});
}

function disableUserWithdrawalById(id) {
	return update({
		statuses: Sequelize.literal(
			"JSON_REPLACE(`statuses`, '$.isWithdrawable', false)"
		),
	}, {
		where: {
			id,
			"statuses.isWithdrawable": true,
		},
	});
}

function enableUserDividendById(id) {
	return update({
		statuses: Sequelize.literal(
			"JSON_REPLACE(`statuses`, '$.isDividendable', true)"
		),
	}, {
		where: {
			id,
			"statuses.isDividendable": false,
		},
	});
}

function enableUserFundsById(id) {
	return update({
		statuses: Sequelize.literal(
			"JSON_REPLACE(`statuses`, '$.isFundsable', true)"
		),
	}, {
		where: {
			id,
			"statuses.isFundsable": false,
		},
	});
}

function disableUserDividendById(id) {
	return update({
		statuses: Sequelize.literal(
			"JSON_REPLACE(`statuses`, '$.isDividendable', false)"
		),
	}, {
		where: {
			id,
			"statuses.isDividendable": true,
		},
	});
}

function disableUserFundsById(id) {
	return update({
		statuses: Sequelize.literal(
			"JSON_REPLACE(`statuses`, '$.isFundsable', false)"
		),
	}, {
		where: {
			id,
			"statuses.isFundsable": true,
		},
	});
}

function enableTeamDepositWithinIds(ids, {
	transaction,
} = {}) {
	return update({
		statuses: Sequelize.literal(
			"JSON_REPLACE(`statuses`, '$.isTeamDepositable', true)"
		),
	}, {
		where: {
			id: {
				[Op.in]: ids,
			},
			"statuses.isTeamDepositable": false,
		},
		transaction,
	});
}

function disableTeamDepositWithinIds(ids, {
	transaction,
} = {}) {
	return update({
		statuses: Sequelize.literal(
			"JSON_REPLACE(`statuses`, '$.isTeamDepositable', false)"
		),
	}, {
		where: {
			id: {
				[Op.in]: ids,
			},
			"statuses.isTeamDepositable": true,
		},
		transaction,
	});
}

function enableTeamMemberDepositById(id) {
	return update({
		statuses: Sequelize.literal(
			"JSON_REPLACE(`statuses`, '$.isTeamDepositable', true)"
		),
	}, {
		where: {
			id,
			"statuses.isTeamDepositable": false,
		},
	});
}

function enableTeamFundsWithinIds(ids, {
	transaction,
} = {}) {
	return update({
		statuses: Sequelize.literal(
			"JSON_REPLACE(`statuses`, '$.isTeamFundsable', true)"
		),
	}, {
		where: {
			id: {
				[Op.in]: ids,
			},
			"statuses.isTeamFundsable": false,
		},
		transaction,
	});
}

function disableTeamFundsWithinIds(ids, {
	transaction,
} = {}) {
	return update({
		statuses: Sequelize.literal(
			"JSON_REPLACE(`statuses`, '$.isTeamFundsable', false)"
		),
	}, {
		where: {
			id: {
				[Op.in]: ids,
			},
			"statuses.isTeamFundsable": true,
		},
		transaction,
	});
}

function enableTeamMemberFundsById(id) {
	return update({
		statuses: Sequelize.literal(
			"JSON_REPLACE(`statuses`, '$.isTeamFundsable', true)"
		),
	}, {
		where: {
			id,
			"statuses.isTeamFundsable": false,
		},
	});
}

function enableTeamWithdrawalWithinIds(ids, {
	transaction,
} = {}) {
	return update({
		statuses: Sequelize.literal(
			"JSON_REPLACE(`statuses`, '$.isTeamWithdrawable', true)"
		),
	}, {
		where: {
			id: {
				[Op.in]: ids,
			},
			"statuses.isTeamWithdrawable": false,
		},
		transaction,
	});
}

function disableTeamWithdrawalWithinIds(ids, {
	transaction,
} = {}) {
	return update({
		statuses: Sequelize.literal(
			"JSON_REPLACE(`statuses`, '$.isTeamWithdrawable', false)"
		),
	}, {
		where: {
			id: {
				[Op.in]: ids,
			},
			"statuses.isTeamWithdrawable": true,
		},
		transaction,
	});
}


function enableTeamMemberWithdrawalById(id) {
	return update({
		statuses: Sequelize.literal(
			"JSON_REPLACE(`statuses`, '$.isTeamWithdrawable', true)"
		),
	}, {
		where: {
			id,
			"statuses.isTeamWithdrawable": false,
		},
	});
}

function updateDeltaBonusAndTypeByIdAndDeltaBonus(id, deltaBonus, {
	updatedDeltaBonus,
	type,
}, {
	transaction,
} = {}) {
	return update({
		deltaBonus: updatedDeltaBonus,
		type
	}, {
		where: {
			id,
			deltaBonus,
		},
		transaction,
	});
}

function updateDeltaBonusByIdAndDeltaBonus(id, deltaBonus, {
	updatedDeltaBonus,
}, {
	transaction,
} = {}) {
	return update({
		deltaBonus: updatedDeltaBonus,
	}, {
		where: {
			id,
			deltaBonus,
		},
		transaction,
	});
}

function updateDeltaBonusIfGreaterThanWithinIds(ids, deltaBonus, {
	transaction,
} = {}) {
	return update({
		deltaBonus,
	}, {
		where: {
			id: {
				[Op.in]: ids,
			},
			deltaBonus: {
				[Op.gt]: deltaBonus,
			},
		},
		transaction,
	});
}

function updateFixedWageIfGreaterThanWithinIds(ids, fixedWage, {
	transaction,
} = {}) {
	return update({
		fixedWage,
	}, {
		where: {
			id: {
				[Op.in]: ids,
			},
			fixedWage: {
				[Op.gt]: fixedWage,
			},
		},
		transaction,
	});
}

function updateFixedWageByIdAndFixedWage(id, fixedWage, {
	updatedFixedWage,
}) {
	return update({
		fixedWage: updatedFixedWage,
	}, {
		where: {
			id,
			fixedWage,
		},
	});
}

function createChildrenTeamDividendsOrderClause(field, rule) {
	const orderClauseBuilder = new SQLOrderClauseBuilder();

	switch (field) {
		case "deltaBonus":
			orderClauseBuilder.setOrder(field, rule);
			break;
		case "balance":
			orderClauseBuilder.setRefOrder("wallets", field, rule);
			break;
		case "teamBalance":
			orderClauseBuilder.setRefOrder("teamStats", "balance", rule);
			break;
		case "numOfUsers":
			orderClauseBuilder.setRefOrder("teamStats", field, rule);
			break;
		case "bettingAmount":
		case "maxGrantAmount":
		case "grantedAmount":
			orderClauseBuilder.setRefOrder("teamDurationStats", field, rule);
			break;
		case "profit":
			orderClauseBuilder.setRefOrder(
				"teamDurationStats",
				Sequelize.literal(`bettingReward+rebateAmount+activityAmount+fixedWageAmount+incentiveAmount-bettingAmount`),
				rule
			);
			break;
	}

	return orderClauseBuilder.build();

}

async function getChildrenWithDividendsByUserIdDurationIdAndPagination(
	userId,
	durationId,
	page,
	{
		status,
		childId,
		limit,
		sort: field,
		order: rule,
		projections = [],
	} = {}
) {
	const offset = getOffsetByPageAndLimit(page, limit);

	const userWhereClause = new SQLWhereClauseBuilder()
		.setEqual("id", childId)
		.build();
	const orderClause = createChildrenTeamDividendsOrderClause(field, rule);

	const model = getInstance();

	const { count: numOfItems, rows: data } = await findAndCountAll({
		where: userWhereClause,
		include: [
			{
				model,
				through: {
					where: {
						ancestorId: userId,
						distance: 1,
					},
				},
				attributes: [],
				as: "ancestors",
				required: true,
				// inner join
			},
			{
				model: WalletModel.getInstance(),
				where: {
					code: ENUM_WALLET_CODE.PRIMARY,
				},
				attributes: ["code", "balance"],
				as: "wallets",
				required: true,
				// inner join
			},
			{
				model: TeamStatsModel.getInstance(),
				attributes: ["numOfUsers", "balance"],
				as: "teamStats",
				required: true,
			},
			{
				model: TeamDurationStatsModel.getInstance(),
				where: {
					walletCode: ENUM_WALLET_CODE.PRIMARY,
					durationId,
					status,
				},
				attributes: [
					"bettingReward", "rebateAmount", "activityAmount",
					"fixedWageAmount", "bettingAmount", "incentiveAmount",
					"status", "maxGrantAmount", "grantedAmount",
					"durationId",
					[
						Sequelize.literal(`bettingReward+rebateAmount+activityAmount+fixedWageAmount+incentiveAmount-bettingAmount`), "profit"
					],
				],
				as: "teamDurationStats",
				required: true,
				// inner join
			},
			{
				model: UserDividendSettingModel.getInstance(),
				where: {
					type: ENUM_DIVIDEND_TYPE.SELF,
				},
				attributes: [],
				as: "userDividendSettings",
				required: false,
				// left outer join
			}
		],
		attributes: [
			...projections,
			[
				Sequelize.literal('userDividendSettings.dividendSettings'), "dividendSettings"
			]
		],
		offset,
		limit,
		order: orderClause,
		distinct: true,
		raw: false,
		subQuery: false,
	});

	return {
		data,
		numOfItems,
		numOfPages: Math.ceil(numOfItems / limit),
	};
}

async function isUserExistedById(id) {
	const userCount = await count({
		where: {
			id,
		},
	});

	return userCount === 1;
}

function setStatusesWhereClauseIfNormal(userWhereClause) {
	NORMAL_STATUSES.forEach(current => {
		userWhereClause[`statuses.${current}`] = NORMAL_CONDITIONS[current];
	});
}

function setStatusesWhereClauseIfNonNormal(userWhereClause) {
	const nonNormalClauses = NORMAL_STATUSES.map(current => {
		return {
			[`statuses.${current}`]: !NORMAL_CONDITIONS[current]
		};
	});

	userWhereClause[Op.or] = nonNormalClauses;
}

function getUserWithWalletsAndUserStatsByUsernameAndWalletCode(username, walletCode, {
	userProjections,
	userStatsProjections
} = {}) {
	return findOne({
		where: {
			username,
		},
		attributes: userProjections,
		raw: false,
		include: [{
			model: WalletModel.getInstance(),
			where: {
				code: walletCode,
			},
			attributes: ["code", "balance"],
			as: "wallets",
			required: false,
		}, {
			model: UserStatsModel.getInstance(),
			where: {
				walletCode,
			},
			attributes: userStatsProjections,
			as: "userStats",
			required: false,
		}],
		subQuery: false,
	});
}

async function getUsersWithWalletsBankCardsAndTeamStatsByPagination(page, {
	username,
	type,
	isNormal,
	payer,
	bankCardNumber,
	limit,
	projections,
	sort: field,
	order: rule,
} = {}) {
	const offset = getOffsetByPageAndLimit(page, limit);

	let userWhereClause = new SQLWhereClauseBuilder()
		.setEqual("username", username)
		.setIn("type", type)
		.setEqual("payer", payer)
		.build();

	if (isNormal !== undefined) {
		if (isNormal) {
			setStatusesWhereClauseIfNormal(userWhereClause);
		} else {
			setStatusesWhereClauseIfNonNormal(userWhereClause);
		}
	}

	const bankCardWhereClause = new SQLWhereClauseBuilder()
		.setEqual("number", bankCardNumber)
		.build();

	const orderClauseBuilder = new SQLOrderClauseBuilder();

	if (field === "balance") {
		orderClauseBuilder.setRefOrder("wallets", field, rule);
	} else {
		orderClauseBuilder.setOrder(field, rule);
	}

	orderClauseBuilder.setOrder("username", "asc");

	const orderClause = orderClauseBuilder.build();

	let { count: numOfItems, rows: users } = await findAndCountAll({
		where: userWhereClause,
		include: [{
			model: BankCardModel.getInstance(),
			where: bankCardWhereClause,
			as: "bankCards",
			through: {
				attributes: [],
				as: "userBankCard",
			},
			attributes: ["number"],
			/**
			 * 正常的時候沒有bankCard的user也要拿, 所以用 left outer join
			 * 當查詢bankCardNumber的時候, 只拿符合搜尋條件的user, 所以用 inner join
			 */
			required: bankCardNumber !== undefined,
		}, {
			model: WalletModel.getInstance(),
			where: {
				code: ENUM_WALLET_CODE.PRIMARY,
			},
			attributes: ["code", "balance"],
			as: "wallets",
			required: false,
		}, {
			model: TeamStatsModel.getInstance(),
			where: {
				walletCode: ENUM_WALLET_CODE.PRIMARY,
			},
			attributes: ["numOfUsers", "balance"],
			as: "teamStats",
			required: false,
		}],
		offset,
		limit,
		attributes: projections,
		order: orderClause,
		distinct: true,
		raw: false,
		subQuery: false,
	});

	return {
		users,
		numOfItems,
		numOfPages: Math.ceil(numOfItems / limit),
	};
}

async function getUsersWithWalletsBankCardsAndTeamStatsWithinIdsAndPagnation(ids, page, {
	limit,
	projections,
}) {
	const offset = getOffsetByPageAndLimit(page, limit);

	const orderClause = new SQLOrderClauseBuilder()
		.setOrder("type", "asc")
		.setOrder("username", "asc")
		.build();

	let { count: numOfItems, rows: users } = await findAndCountAll({
		where: {
			id: {
				[Op.in]: ids,
			}
		},
		include: [{
			model: BankCardModel.getInstance(),
			as: "bankCards",
			through: {
				attributes: [],
				as: "userBankCard",
			},
			attributes: ["number"],
			required: false,
		}, {
			model: WalletModel.getInstance(),
			where: {
				code: ENUM_WALLET_CODE.PRIMARY,
			},
			attributes: ["code", "balance"],
			as: "wallets",
			required: false,
		}, {
			model: TeamStatsModel.getInstance(),
			where: {
				walletCode: ENUM_WALLET_CODE.PRIMARY,
			},
			attributes: ["numOfUsers", "balance"],
			as: "teamStats",
			required: false,
		}],
		offset,
		limit,
		attributes: projections,
		order: orderClause,
		distinct: true,
		raw: false,
		subQuery: false,
	});

	return {
		users,
		numOfItems,
		numOfPages: Math.ceil(numOfItems / limit),
	};
}

function paginateUsersByType(type, {
	projections,
} = {}) {
	return getCursor({
		where: {
			type,
		},
		attributes: projections,
	});
}

async function isPayerExistedByIdAndPayer(id, payer) {
	const numOfUsers = await count({
		where: {
			id,
			payer,
		},
	});

	return numOfUsers === 1;
}

function getUserWithActiveBankCardsById(id, {
	userProjections,
	userBankCardProjections,
} = {}) {
	return findOne({
		where: {
			id,
		},
		order: [[
			{
				through: {
					model: UserBankCardModel.getInstance(),
				},
			},
			'activatedAt',
			'DESC',
		]],
		attributes: userProjections,
		raw: false,
		include: [
			{
				model: BankCardModel.getInstance(),
				as: 'bankCards',
				through: {
					where: {
						status: ENUM_BANK_CARD_STATUS.ACTIVE,
					},
					as: 'userBankCard',
					attributes: userBankCardProjections,
				},
			},
		],
	});
}

async function getUserWithActiveBankCardsByUsername(username, {
	userProjections,
	BankCardProjections,
} = {}) {
	const users = await find({
		where: {
			username,
		},
		attributes: userProjections,
		raw: false,
		include: [
			{
				model: BankCardModel.getInstance(),
				as: 'bankCards',
				through: {
					where: {
						status: ENUM_BANK_CARD_STATUS.ACTIVE,
					},
					as: 'userBankCard',
				},
				required: false,
				attributes: BankCardProjections,
			},
		],
		subQuery: false,
	});

	if (!users.length) {
		return null;
	}

	return users[0];
}

async function getUserWithWithdrawalRequiredProfileByIdWalletCodeAndBankCardId(id, walletCode, bankCardId, {
	userProjections,
	userDailyStatsProjections,
	userWithdrawalPolicyProjections,
	bankCardProjections,
	userBankCardProjections,
	userStatsProjections,
} = {}) {
	return findOne({
		where: {
			id,
		},
		attributes: userProjections,
		include: [
			{
				model: UserDailyStatsModel.getInstance(),
				where: {
					walletCode,
					date: generateStatsDateString(new Date()),
				},
				attributes: userDailyStatsProjections,
				as: "userDailyStatses",
				required: false,
			},
			{
				model: UserWithdrawalPolicyModel.getInstance(),
				where: {
					maxWithdrawalAmountPerDay: {
						[Op.ne]: null,
					},
					minAmountPerWithdrawal: {
						[Op.ne]: null,
					},
					maxAmountPerWithdrawal: {
						[Op.ne]: null,
					},
					numOfWithdrawalsPerDay: {
						[Op.ne]: null,
					},
				},
				attributes: userWithdrawalPolicyProjections,
				as: "userWithdrawalPolicy",
				required: false,
			},
			{
				model: BankCardModel.getInstance(),
				where: {
					id: bankCardId,
				},
				as: "bankCards",
				through: {
					where: {
						bankCardId,
						status: ENUM_BANK_CARD_STATUS.ACTIVE,
					},
					attributes: userBankCardProjections,
					as: "userBankCard",
				},
				attributes: bankCardProjections,
				required: false,
			},
			{
				model: UserStatsModel.getInstance(),
				where: {
					walletCode,
				},
				attributes: userStatsProjections,
				as: "userStats",
				required: false,
			},
		],
		raw: false,
	});
}

function setPayerByIdIfEmpty(id, payer, {
	transaction,
	projections,
} = {}) {
	return update({
		payer,
	}, {
		where: {
			id,
			payer: {
				[Op.eq]: null,
			},
		},
		transaction,
		attributes: projections,
	});
}

function updateZhaoshangFixedWage(fixedWage, { transaction } = {}) {
	return update({
		fixedWage,
	}, {
		where: {
			type: ENUM_USER_TYPE.ZHAOSHANG,
		},
		transaction,
	});
}

function updateFixedWageIfGreaterThan(fixedWage, { transaction } = {}) {
	return update({
		fixedWage,
	}, {
		where: {
			fixedWage: {
				[Op.gt]: fixedWage,
			},
		},
		transaction,
	});
}

function enableUserTransferById(id) {
	return update({
		statuses: Sequelize.literal(
			"JSON_REPLACE(`statuses`, '$.isTransferable', true)"
		),
	}, {
		where: {
			id,
			"statuses.isTransferable": false,
		},
	});
}

function getUserWithActiveBankCardByIdAndBankCardId(id, bankCardId, {
	projections,
} = {}) {
	return findOne({
		where: {
			id,
		},
		raw: false,
		attributes: projections,
		include: [
			{
				model: BankCardModel.getInstance(),
				as: 'bankCards',
				where: {
					id: bankCardId,
				},
				through: {
					as: 'userBankCard',
					where: {
						status: ENUM_BANK_CARD_STATUS.ACTIVE,
					},
				},
				required: false,
			}
		],
	});
}

function getUserWithBlockedBankCardByIdAndBankCardId(id, bankCardId, {
	projections,
} = {}) {
	return findOne({
		where: {
			id,
		},
		raw: false,
		attributes: projections,
		include: [
			{
				model: BankCardModel.getInstance(),
				as: 'bankCards',
				where: {
					id: bankCardId,
				},
				through: {
					as: 'userBankCard',
					where: {
						status: ENUM_BANK_CARD_STATUS.BLOCKED,
					},
				},
				required: false,
			}
		],
	});
}

function disableUserTransferById(id) {
	return update({
		statuses: Sequelize.literal(
			"JSON_REPLACE(`statuses`, '$.isTransferable', false)"
		),
	}, {
		where: {
			id,
			"statuses.isTransferable": true,
		},
	});
}

function enableTeamChildrenCreationWithinIds(ids, {
	transaction,
} = {}) {
	return update({
		statuses: Sequelize.literal(
			"JSON_REPLACE(`statuses`, '$.isChildrenCreatable', true)"
		),
	}, {
		where: {
			id: {
				[Op.in]: ids,
			},
			"statuses.isChildrenCreatable": false,
		},
		transaction,
	});
}

function disableTeamChildrenCreationWithinIds(ids, {
	transaction,
} = {}) {
	return update({
		statuses: Sequelize.literal(
			"JSON_REPLACE(`statuses`, '$.isChildrenCreatable', false)"
		),
	}, {
		where: {
			id: {
				[Op.in]: ids,
			},
			"statuses.isChildrenCreatable": true,
		},
		transaction,
	});
}

function updateUserZhuandianById(id, {
	isEnableIncentiveZhuandian,
	isEnableDepositZhuandian
}) {
	return update({
		statuses: Sequelize.literal(
			`JSON_REPLACE(\`statuses\`, '$.isEnableIncentiveZhuandian', ${isEnableIncentiveZhuandian}, '$.isEnableDepositZhuandian', ${isEnableDepositZhuandian})`
		),
	}, {
		where: {
			id,
		},
	});
}

function getUserWithBankCardsById(id, {
	sort,
	order,
	projections,
}) {
	return findOne({
		where: {
			id,
		},
		order: [[
			{
				through: {
					model: UserBankCardModel.getInstance(),
				},
			},
			sort,
			order,
		]],
		attributes: projections,
		raw: false,
		include: [
			{
				model: BankCardModel.getInstance(),
				as: 'bankCards',
				through: {
					as: 'userBankCard',
					where: {
						status: {
							[Op.ne]: ENUM_BANK_CARD_STATUS.ARCHIVED,
						},
					},
				},
				required: false,
			}
		],
	});
}

function getUserWithActiveBankCardByIdAndBankCardNumber(id, bankCardNumber, {
	projections,
} = {}) {
	return findOne({
		where: {
			id,
		},
		attributes: projections,
		raw: false,
		include: [
			{
				model: BankCardModel.getInstance(),
				as: 'bankCards',
				where: {
					number: bankCardNumber,
				},
				through: {
					as: 'userBankCard',
					attributes: [],
					where: {
						status: ENUM_BANK_CARD_STATUS.ACTIVE,
					},
				},
				required: false,
			}
		],
	});
}

async function getZhaoshangsByPagnation(page, {
	limit,
	sort: field,
	order: rule,
	projections,
} = {}) {
	const offset = getOffsetByPageAndLimit(page, limit);

	const order = new SQLOrderClauseBuilder()
		.setOrder(field, rule)
		.build();

	let { count: numOfItems, rows: zhaoshangs } = await findAndCountAll({
		where: {
			type: ENUM_USER_TYPE.ZHAOSHANG,
			id: {
				[Op.ne]: ROOT_USER_ID,
			},
		},
		order,
		include: [
			{
				model: TeamStatsModel.getInstance(),
				attributes: ["depositAmount", "withdrawalAmount"],
				as: 'teamStats',
				required: false,
			}
		],
		offset,
		limit,
		attributes: projections,
		raw: false,
		subQuery: false,
	});

	return {
		zhaoshangs,
		numOfItems,
		numOfPages: Math.ceil(numOfItems / limit),
	};
}

function updateLevelByIdAndLevelId(id, previousLevelId, {
	levelId,
	levelExpiredAt,
}, {
	transaction,
} = {}) {
	return update({
		levelId,
		levelExpiredAt: generateStatsDateString(levelExpiredAt),
	}, {
		where: {
			id,
			levelId: previousLevelId,
		},
		transaction,
	});
}

function updateLoginPasswordUpdatedAtById(id, loginPasswordUpdatedAt) {
	return update({
		loginPasswordUpdatedAt,
	}, {
		where: {
			id,
		},
	});
}

function updateBetPasswordUpdatedAtById(id, betPasswordUpdatedAt) {
	return update({
		betPasswordUpdatedAt,
	}, {
		where: {
			id,
		},
	});
}

async function getUsersWithWalletsByLevelIdAndPagination(levelId, page, {
	id,
	limit,
	loginAtFrom,
	loginAtTo,
	sort: field,
	order: rule,
	projections,
}) {
	const offset = getOffsetByPageAndLimit(page, limit);
	const order = new SQLOrderClauseBuilder()
		.setOrder(field, rule)
		.build();

	const where = new SQLWhereClauseBuilder()
		.setEqual("id", id)
		.setGte("loginAt", loginAtFrom)
		.setLte("loginAt", loginAtTo)
		.setEqual("levelId", levelId)
		.build();

	const { count: numOfItems, rows: data } = await findAndCountAll({
		where,
		include: [{
			model: WalletModel.getInstance(),
			as: "wallets",
			where: {
				code: ENUM_WALLET_CODE.PRIMARY,
			},
			attributes: ["balance"],
			required: false,
		}],
		order,
		offset,
		limit,
		raw: false,
		attributes: projections,
		subQuery: false,
	});

	return {
		data,
		numOfItems,
		numOfPages: Math.ceil(numOfItems / limit),
	};
}

module.exports = {
	createUser,

	getTransaction,
	getUserById,
	getUserByUsername,
	getUserWithAncestorsById,
	getUserWithParentById,
	getUserWithChildByIdAndChildId,
	getUserWithGreaterThanDeltaBonusDescendantsById,
	getUsersByType,
	getUsersWithWalletsBankCardsAndTeamStatsByPagination,
	getUsersWithWalletsByLevelIdAndPagination,
	getChildrenWithWalletsByUserIdAndPagination,
	getChildrenWithDividendsByUserIdDurationIdAndPagination,
	getUserWithActiveBankCardsById,
	getUserWithActiveBankCardsByUsername,
	getUserWithActiveBankCardByIdAndBankCardId,
	getUserWithBlockedBankCardByIdAndBankCardId,
	getUserWithWalletsAndUserStatsByUsernameAndWalletCode,
	getUsersWithWalletsBankCardsAndTeamStatsWithinIdsAndPagnation,
	getUserWithWithdrawalRequiredProfileByIdWalletCodeAndBankCardId,
	getUserWithBankCardsById,
	getZhaoshangsByPagnation,
	getUserWithActiveBankCardByIdAndBankCardNumber,
	paginateUsersByType,
	isUserExistedById,
	isPayerExistedByIdAndPayer,

	updateLoginAuditById,
	updateNicknameById,
	updateGreetingById,
	updatePayerById,
	updateAgentOrMemberTypeById,
	updateTypeFromMemberToAgentByIdAndDeltaBonus,
	updateDeltaBonusIfGreaterThanWithinIds,
	updateDeltaBonusAndTypeByIdAndDeltaBonus,
	updateDeltaBonusByIdAndDeltaBonus,
	updateFixedWageIfGreaterThanWithinIds,
	updateFixedWageByIdAndFixedWage,
	updateUserZhuandianById,
	setPayerByIdIfEmpty,
	updateZhaoshangFixedWage,
	updateFixedWageIfGreaterThan,
	updateLevelByIdAndLevelId,
	updateLoginPasswordUpdatedAtById,
	updateBetPasswordUpdatedAtById,

	// user setting
	blockUserById,
	unblockUserById,
	enableUserBettingById,
	disableUserBettingById,
	enableUserDepositById,
	disableUserDepositById,
	disableUserWithdrawalById,
	enableUserWithdrawalById,
	enableUserDividendById,
	disableUserDividendById,
	enableUserFundsById,
	disableUserFundsById,
	disableUserTransferById,
	enableUserTransferById,

	// team setting
	blockTeamMembersWithinIds,
	unblockTeamMembersWithinIds,
	unblockTeamMemberById,
	enableTeamBettingWithinIds,
	disableTeamBettingWithinIds,
	enableTeamMemberBettingById,
	enableTeamChildrenCreationWithinIds,
	disableTeamChildrenCreationWithinIds,
	enableTeamDepositWithinIds,
	disableTeamDepositWithinIds,
	enableTeamMemberDepositById,
	enableTeamFundsWithinIds,
	disableTeamFundsWithinIds,
	enableTeamMemberFundsById,
	enableTeamWithdrawalWithinIds,
	disableTeamWithdrawalWithinIds,
	enableTeamMemberWithdrawalById,

	MIN_PROJECTIONS,
	ME_PROJECTIONS,
	CHILDREN_REQUIRED_PROJECTIONS,
	CHILDREN_DIVIDEND_REQUIRED_PROJECTIONS,
	BETTING_REQUIRED_PROJECTIONS,
	DELTA_BONUS_ONLY_PROJECTIONS,
	FIXED_WAGE_ONLY_PROJECTIONS,
	DELTA_BONUS_AND_FIXED_WAGE_PROJECTIONS,
	ID_ONLY_PROJECTIONS,
	CHILDREN_FIXED_WAGE_PROJECTIONS,
	TYPE_ONLY_PROJECTIONS,
	PAYER_ONLY_PROJECTIONS,
	ACCOUNT_ID_ONLY_PROJECTIONS,
	LOGIN_GEO_VALIDATION_PROJECTIONS,
	DEPOSIT_REQUIRED_PROJECTIONS,
	LEVEL_ID_ONLY_PROJECTIONS,
	WITHDRAWAL_CREATION_REQUIRED_PROJECTIONS,
	AUTO_REMIT_VALIDATION_PROJECTIONS,
	STATUSES_ONLY_PROJECTIONS,
	TYPE_AND_DELTA_BONUS_PROJECTIONS,
	NICKNAME_AND_DELTABONUS_PROJECTIONS,
	USERNAME_ONLY_PROJECTIONS,
	USERNAME_AND_LOGIN_AT_PROJECTIONS,
	USERNAME_NICKNAME_AND_LEVEL_PROJECTIONS,
};
