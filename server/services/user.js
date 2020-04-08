const Sequelize = require("sequelize");
const UserStore = require("../stores/user");
const AccountStore = require("../stores/account");
const RelationshipStore = require("../stores/relationship");
const WalletStore = require("../stores/wallet");
const UserStatsStore = require("../stores/user-stats");
const UserBonusLogStore = require("../stores/user-bonus-log");
const TeamStatsStore = require("../stores/team-stats");
const TeamBonusStatsStore = require("../stores/team-bonus-stats");
const TeamDailyStatsStore = require("../stores/team-daily-stats");
const LevelStore = require("../stores/level");
const UserFavoriteStore = require("../stores/user-favorite");
const UserCacheStore = require("../cache-stores/user");
const {
	ConflictError,
	ForbiddenError,
} = require("ljit-error");
const {
	ENUM_FINANCIAL_LEVEL_ID,
	ENUM_WALLET_CODE,
} = require("../lib/enum");
const {
	USER_DUPLICATED,
	USER_IS_MODIFIED,
} = require("../lib/error/code");
const {
	generateStatsDateString,
	getDateAfterNSeconds,
} = require("../lib/date");
const {
	getOnlineStatusesWithinUserIdsAndDate,
} = require('../cache-stores/user');

async function createUser({
	accountId,
	parentId,
	username,
	nickname,
	type,
	deltaBonus,
	fixedWage,
	createdBy,
}) {
	const txn = UserStore.getTransaction();

	try {
		const operations = async function (transaction) {
			const user = await UserStore.createUser({
				accountId,
				username,
				nickname,
				type,
				deltaBonus,
				fixedWage,
				createdBy,
			}, { transaction });

			const relationships = await RelationshipStore.getAncestorAndMeRelationshipsByUserId(parentId, {
				transaction,
				lock: transaction.LOCK.SHARE,
			});

			const ancestorIds = relationships.map(relationship => relationship.ancestorId);
			const preparedRelationships = prepareUserCreationRequiredRelationships({ user, relationships });
			const preparedWallets = prepareUserCreationRequiredWallets({ user });
			const preparedUserStats = prepareUserCreationRequiredUserStats({ user });
			const preparedTeamStats = prepareUserCreationRequiredTeamStats({ user });
			const preparedTeamBonusStatses = prepareUserCreationRequiredTeamBonusStatses({ user, relationships });
			const preparedTeamDailyStatses = prepareUserCreationRequiredTeamDailyStatses({ relationships });

			await RelationshipStore.createRelationships(preparedRelationships, { transaction });
			await WalletStore.createWallets(preparedWallets, { transaction });
			await UserStatsStore.createUserStats(preparedUserStats, { transaction });
			await TeamStatsStore.createTeamStats(preparedTeamStats, { transaction });
			await TeamStatsStore.increaseNumOfUsersWithinUserIdsAndWalletCode(ancestorIds, ENUM_WALLET_CODE.PRIMARY, { transaction });
			await TeamBonusStatsStore.bulkIncreaseTeamBonusStatses(preparedTeamBonusStatses, { transaction });
			await TeamDailyStatsStore.bulkIncreaseUserCreationRelatedTeamDailyStatses(preparedTeamDailyStatses, { transaction });
			await LevelStore.increaseNumOfUsersById(ENUM_FINANCIAL_LEVEL_ID.NORMAL_ONE, { transaction });

			return user;
		};

		await txn.startTransaction(operations);

		return await txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();

		if (error instanceof Sequelize.UniqueConstraintError) {
			throw new ConflictError(USER_DUPLICATED.MESSAGE, USER_DUPLICATED.CODE);
		}

		throw error;
	}
}

function prepareUserCreationRequiredRelationships({ user, relationships }) {
	const preparedRelationships = [{
		userId: user.id,
		username: user.username,
		ancestorId: user.id,
		ancestorUsername: user.username,
		distance: 0,
	}];

	relationships.forEach(relationship => {
		preparedRelationships.push({
			userId: user.id,
			username: user.username,
			ancestorId: relationship.ancestorId,
			ancestorUsername: relationship.ancestorUsername,
			distance: relationship.distance + 1,
		});
	});

	return preparedRelationships;
}

function prepareUserCreationRequiredWallets({ user }) {
	const defaultWallets = WalletStore.generateDefaultWallets();

	return defaultWallets.map(defaultWallet => {
		defaultWallet.userId = user.id;
		defaultWallet.username = user.username;

		return defaultWallet;
	});
}

function prepareUserCreationRequiredUserStats({ user }) {
	return {
		userId: user.id,
		username: user.username,
		walletCode: ENUM_WALLET_CODE.PRIMARY,
	};
}

function prepareUserCreationRequiredTeamStats({ user }) {
	return {
		userId: user.id,
		username: user.username,
		walletCode: ENUM_WALLET_CODE.PRIMARY,
	};
}

function prepareUserCreationRequiredTeamBonusStatses({ user, relationships }) {
	const preparedTeamBonusStatses = [{
		userId: user.id,
		username: user.username,
		deltaBonus: user.deltaBonus,
		numOfUsers: 1,
	}];

	relationships.forEach(relationship => {
		preparedTeamBonusStatses.push({
			userId: relationship.ancestorId,
			username: relationship.ancestorUsername,
			deltaBonus: user.deltaBonus,
			numOfUsers: 1,
		});
	});

	return preparedTeamBonusStatses;
}

function prepareUserCreationRequiredTeamDailyStatses({ relationships }) {
	const date = generateStatsDateString(new Date());

	return relationships.map(relationship => {
		return {
			userId: relationship.ancestorId,
			username: relationship.ancestorUsername,
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			numOfRegistries: 1,
			date,
		};
	});
}

async function getFavoriteLotteryIdsByUserId(userId) {
	const userFavorite = await UserFavoriteStore.getUserFavoriteByUserId(userId);

	if (userFavorite === null) {
		return [];
	}

	return userFavorite.lotteryIds;
}

async function updateTypeFromMemberToAgentByIdAndDeltaBonus(userId, deltaBonus) {
	const result = await UserStore.updateTypeFromMemberToAgentByIdAndDeltaBonus(userId, deltaBonus);

	if (result === null) {
		throw new ForbiddenError(
			USER_IS_MODIFIED.MESSAGE,
			USER_IS_MODIFIED.CODE
		);
	}

	return result;
}

async function updateDeltaBonusAndTypeByIdAndDeltaBonus(userId, deltaBonus, {
	updatedDeltaBonus,
	type,
}) {
	const txn = await UserStore.getTransaction();

	try {
		const operations = async (transaction) => {
			const result = await UserStore.updateDeltaBonusAndTypeByIdAndDeltaBonus(userId, deltaBonus, {
				updatedDeltaBonus,
				type
			}, {
				transaction
			});

			if (result === null) {
				throw new ForbiddenError(
					USER_IS_MODIFIED.MESSAGE,
					USER_IS_MODIFIED.CODE
				);
			}

			const preparedUserBonusLogs = [{
				userId,
				previousDeltaBonus: deltaBonus,
				updatedDeltaBonus,
			}];

			await UserBonusLogStore.createUserBonusLogs(preparedUserBonusLogs, { transaction });
		};

		await txn.startTransaction(operations);

		return await txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();

		throw error;
	}
}

async function updateDeltaBonusByIdAndDeltaBonus(userId, deltaBonus, { updatedDeltaBonus }) {
	const txn = await UserStore.getTransaction();

	try {
		const operations = async (transaction) => {
			const result = await UserStore.updateDeltaBonusByIdAndDeltaBonus(userId, deltaBonus, {
				updatedDeltaBonus,
			}, {
				transaction
			});

			if (result === null) {
				throw new ForbiddenError(
					USER_IS_MODIFIED.MESSAGE,
					USER_IS_MODIFIED.CODE
				);
			}

			const preparedUserBonusLogs = [{
				userId,
				previousDeltaBonus: deltaBonus,
				updatedDeltaBonus,
			}];

			await UserBonusLogStore.createUserBonusLogs(preparedUserBonusLogs, { transaction });
		};

		await txn.startTransaction(operations);

		return await txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();

		throw error;
	}
}

async function updateFixedWageByIdAndFixedWage(id, fixedWage, { updatedFixedWage }) {
	const result = await UserStore.updateFixedWageByIdAndFixedWage(id, fixedWage, { updatedFixedWage });

	if (result === null) {
		throw new ForbiddenError(
			USER_IS_MODIFIED.MESSAGE,
			USER_IS_MODIFIED.CODE
		);
	}

	return result;
}

async function addOnlineStatusToUsers(users) {
	const userIds = users.map(({ id }) => id);
	const dateOfOneMinuteAgo = getDateAfterNSeconds(-60);
	const onlineStatuses = await getOnlineStatusesWithinUserIdsAndDate(userIds, dateOfOneMinuteAgo);

	return users.map((user, index) => {
		user.isOnline = (onlineStatuses[index] === 1);

		return user;
	});
}

async function getChildrenWithWalletsByUserIdAndPagination(userId, page, {
	me,
	username,
	deltaBonus,
	minBalance,
	maxBalance,
	walletCode,
	limit,
	projections,
	sort,
	order,
}) {
	const result = await UserStore.getChildrenWithWalletsByUserIdAndPagination(userId, page, {
		me,
		username,
		deltaBonus,
		minBalance,
		maxBalance,
		walletCode,
		limit,
		projections,
		sort,
		order,
	});

	result.children = result.children.map(child => child.toJSON());

	return result;
}

module.exports = {
	createUser,
	createAccount: AccountStore.createAccount,

	validateBetPasswordByAccountId: AccountStore.validateBetPasswordByAccountId,
	validateLoginPasswordByAccountId: AccountStore.validateLoginPasswordByAccountId,
	validateFundsPasswordByAccountId: AccountStore.validateFundsPasswordByAccountId,
	validateGoogleTOTPByAccountId: AccountStore.validateGoogleTOTPByAccountId,
	validateLoginGeoByAccountId: AccountStore.validateLoginGeoByAccountId,

	login: AccountStore.login,
	loginWithGoogleTOTP: AccountStore.loginWithGoogleTOTP,

	isChildrenByAncestorIdAndUserId: RelationshipStore.isChildrenByAncestorIdAndUserId,
	isDescentdantByAncestorIdAndUserId: RelationshipStore.isDescentdantByAncestorIdAndUserId,
	isPayerExistedByIdAndPayer: UserStore.isPayerExistedByIdAndPayer,

	getUserById: UserStore.getUserById,
	getUserByUsername: UserStore.getUserByUsername,
	getUserWithChildByIdAndChildId: UserStore.getUserWithChildByIdAndChildId,
	getAccountById: AccountStore.getAccountById,
	getChildrenWithWalletsByUserIdAndPagination,
	getChildrenWithDividendsByUserIdDurationIdAndPagination: UserStore.getChildrenWithDividendsByUserIdDurationIdAndPagination,
	getChildrenRelationshipsByUserId: RelationshipStore.getChildrenRelationshipsByUserId,
	getAncestorAndMeRelationshipsByAncestorIdAndUserId: RelationshipStore.getAncestorAndMeRelationshipsByAncestorIdAndUserId,
	getUserWithWithdrawalRequiredProfileByIdWalletCodeAndBankCardId: UserStore.getUserWithWithdrawalRequiredProfileByIdWalletCodeAndBankCardId,
	getUserWithActiveBankCardsByUsername: UserStore.getUserWithActiveBankCardsByUsername,
	getFavoriteLotteryIdsByUserId,

	enableGoogleTOTPByAccountId: AccountStore.enableGoogleTOTPByAccountId,
	enableLoginGeoValidationByAccountId: AccountStore.enableLoginGeoValidationByAccountId,
	disableGoogleTOTPByAccountId: AccountStore.disableGoogleTOTPByAccountId,
	disableLoginGeoValidationByAccountId: AccountStore.disableLoginGeoValidationByAccountId,
	setSecurityQuestionsByAccountId: AccountStore.setSecurityQuestionsByAccountId,
	updateBetPasswordViaPasswordByAccountId: AccountStore.updateBetPasswordViaPasswordByAccountId,
	updateBetPasswordViaSecurityQuestionByAccountId: AccountStore.updateBetPasswordViaSecurityQuestionByAccountId,
	updateFundsPasswordViaGoogleTOTPByAccountId: AccountStore.updateFundsPasswordViaGoogleTOTPByAccountId,
	updateBetPasswordViaGoogleTOTPByAccountId: AccountStore.updateBetPasswordViaGoogleTOTPByAccountId,
	updateFundsPasswordViaPasswordByAccountId: AccountStore.updateFundsPasswordViaPasswordByAccountId,
	updateFundsPasswordViaSecurityQuestionByAccountId: AccountStore.updateFundsPasswordViaSecurityQuestionByAccountId,
	updateLoginPasswordViaPasswordByAccountId: AccountStore.updateLoginPasswordViaPasswordByAccountId,
	updateLoginPasswordViaGoogleTOTPByAccountId: AccountStore.updateLoginPasswordViaGoogleTOTPByAccountId,
	updateLoginPasswordViaSecurityQuestionByAccountId: AccountStore.updateLoginPasswordViaSecurityQuestionByAccountId,
	updateGreetingById: UserStore.updateGreetingById,
	updateNicknameById: UserStore.updateNicknameById,
	updateLoginAuditById: UserStore.updateLoginAuditById,
	updateTypeFromMemberToAgentByIdAndDeltaBonus,
	updateDeltaBonusAndTypeByIdAndDeltaBonus,
	updateDeltaBonusByIdAndDeltaBonus,
	updateFixedWageByIdAndFixedWage,
	blockUserById: UserStore.blockUserById,
	setFavoriteLotteryIdsByUserId: UserFavoriteStore.upsertLotteryIdsByUserId,
	updateLoginPasswordUpdatedAtById: UserStore.updateLoginPasswordUpdatedAtById,
	updateBetPasswordUpdatedAtById: UserStore.updateBetPasswordUpdatedAtById,
	setOnlineByUserId: UserCacheStore.setOnlineByUserId,
	addOnlineStatusToUsers,

	USER_PROJECTIONS: {
		MIN: UserStore.MIN_PROJECTIONS,
		ME: UserStore.ME_PROJECTIONS,
		ID:  UserStore.ID_ONLY_PROJECTIONS,
		CHILDREN: UserStore.CHILDREN_REQUIRED_PROJECTIONS,
		CHILDREN_FIXED_WAGE: UserStore.CHILDREN_FIXED_WAGE_PROJECTIONS,
		CHILDREN_DIVIDEND: UserStore.CHILDREN_DIVIDEND_REQUIRED_PROJECTIONS,
		BETTING: UserStore.BETTING_REQUIRED_PROJECTIONS,
		TYPE: UserStore.TYPE_ONLY_PROJECTIONS,
		FIXED_WAGE: UserStore.FIXED_WAGE_ONLY_PROJECTIONS,
		PAYER: UserStore.PAYER_ONLY_PROJECTIONS,
		LOGIN_GEO_VALIDATION: UserStore.LOGIN_GEO_VALIDATION_PROJECTIONS,
		LEVEL_ID: UserStore.LEVEL_ID_ONLY_PROJECTIONS,
		ACCOUNT_ID: UserStore.ACCOUNT_ID_ONLY_PROJECTIONS,
		DEPOSIT: UserStore.DEPOSIT_REQUIRED_PROJECTIONS,
		WITHDRAWAL_CREATION: UserStore.WITHDRAWAL_CREATION_REQUIRED_PROJECTIONS,
		STATUSES: UserStore.STATUSES_ONLY_PROJECTIONS,
		TYPE_AND_DELTA_BONUS: UserStore.TYPE_AND_DELTA_BONUS_PROJECTIONS,
	},
	RELATIONSHIP_PROJECTIONS: {
		USERID: RelationshipStore.USERID_ONLY_PROJECTIONS,
		ANCESTOR: RelationshipStore.ANCESTOR_PROJECTIONS,
	},
};
