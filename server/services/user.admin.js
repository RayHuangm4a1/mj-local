const {
	ForbiddenError,
} = require("ljit-error");
const UserStore = require("../stores/user");
const UserBonusLogStore = require("../stores/user-bonus-log");
const AccountStore = require("../stores/account");
const UserStatsStore = require("../stores/user-stats");
const WalletStore = require("../stores/wallet");
const RelationshipStore = require("../stores/relationship");
const UserWithdrawalPolicyStore = require("../stores/user-withdrawal-policy");
const UserDividendSettingStore = require("../stores/user-dividend-setting");
const LevelStore = require("../stores/level");
const UserLevelLogStore = require("../stores/user-level-log");
const {
	USER_IS_MODIFIED,
} = require("../lib/error/code");
const {
	ENUM_USER_LEVEL_LOG_STATUS,
} = require('../lib/enum');

async function getMemberIdsByLeaderId(leaderId) {
	const descendants = await RelationshipStore.getDescendantRelationshipsByUserId(leaderId, {
		projections: RelationshipStore.USERID_ONLY_PROJECTIONS,
	});

	const memberIds = descendants.map(descendant => descendant.userId);

	memberIds.push(leaderId);

	return memberIds;
}

async function blockTeamByLeaderId(leaderId) {
	const txn = UserStore.getTransaction();

	try {
		const memberIds = await getMemberIdsByLeaderId(leaderId);

		const operations = async (transaction) => {
			return UserStore.blockTeamMembersWithinIds(memberIds, { transaction });
		};

		await txn.startTransaction(operations);

		return await txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();

		throw error;
	}
}

async function unblockTeamByLeaderId(leaderId) {
	const txn = UserStore.getTransaction();

	try {
		const memberIds = await getMemberIdsByLeaderId(leaderId);

		const operations = async (transaction) => {
			return UserStore.unblockTeamMembersWithinIds(memberIds, { transaction });
		};

		await txn.startTransaction(operations);

		return await txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();

		throw error;
	}
}

async function enableTeamBettingByLeaderId(leaderId) {
	const txn = UserStore.getTransaction();

	try {
		const memberIds = await getMemberIdsByLeaderId(leaderId);

		const operations = async (transaction) => {
			return UserStore.enableTeamBettingWithinIds(memberIds, { transaction });
		};

		await txn.startTransaction(operations);

		return await txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();

		throw error;
	}
}

async function disableTeamBettingByLeaderId(leaderId) {
	const txn = UserStore.getTransaction();

	try {
		const memberIds = await getMemberIdsByLeaderId(leaderId);

		const operations = async (transaction) => {
			return UserStore.disableTeamBettingWithinIds(memberIds, { transaction });
		};

		await txn.startTransaction(operations);

		return await txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();

		throw error;
	}
}

async function enableTeamChildrenCreationByLeaderId(leaderId) {
	const txn = UserStore.getTransaction();

	try {
		const memberIds = await getMemberIdsByLeaderId(leaderId);

		const operations = async (transaction) => {
			return UserStore.enableTeamChildrenCreationWithinIds(memberIds, { transaction });
		};

		await txn.startTransaction(operations);

		return await txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();

		throw error;
	}
}

async function disableTeamChildrenCreationByLeaderId(leaderId) {
	const txn = UserStore.getTransaction();

	try {
		const memberIds = await getMemberIdsByLeaderId(leaderId);

		const operations = async (transaction) => {
			return UserStore.disableTeamChildrenCreationWithinIds(memberIds, { transaction });
		};

		await txn.startTransaction(operations);

		return await txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();

		throw error;
	}
}

async function enableTeamDepositByLeaderId(leaderId) {
	const txn = UserStore.getTransaction();

	try {
		const memberIds = await getMemberIdsByLeaderId(leaderId);

		const operations = async (transaction) => {
			return UserStore.enableTeamDepositWithinIds(memberIds, { transaction });
		};

		await txn.startTransaction(operations);

		return await txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();

		throw error;
	}
}

async function disableTeamDepositByLeaderId(leaderId) {
	const txn = UserStore.getTransaction();

	try {
		const memberIds = await getMemberIdsByLeaderId(leaderId);

		const operations = async (transaction) => {
			return UserStore.disableTeamDepositWithinIds(memberIds, { transaction });
		};

		await txn.startTransaction(operations);

		return await txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();

		throw error;
	}
}

async function enableTeamFundsByLeaderId(leaderId) {
	const txn = UserStore.getTransaction();

	try {
		const memberIds = await getMemberIdsByLeaderId(leaderId);

		const operations = async (transaction) => {
			return UserStore.enableTeamFundsWithinIds(memberIds, { transaction });
		};

		await txn.startTransaction(operations);

		return await txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();

		throw error;
	}
}

async function disableTeamFundsByLeaderId(leaderId) {
	const txn = UserStore.getTransaction();

	try {
		const memberIds = await getMemberIdsByLeaderId(leaderId);

		const operations = async (transaction) => {
			return UserStore.disableTeamFundsWithinIds(memberIds, { transaction });
		};

		await txn.startTransaction(operations);

		return await txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();

		throw error;
	}
}

async function enableTeamWithdrawalByLeaderId(leaderId) {
	const txn = UserStore.getTransaction();

	try {
		const memberIds = await getMemberIdsByLeaderId(leaderId);

		const operations = async (transaction) => {
			return UserStore.enableTeamWithdrawalWithinIds(memberIds, { transaction });
		};

		await txn.startTransaction(operations);

		return await txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();

		throw error;
	}
}

async function disableTeamWithdrawalByLeaderId(leaderId) {
	const txn = UserStore.getTransaction();

	try {
		const memberIds = await getMemberIdsByLeaderId(leaderId);

		const operations = async (transaction) => {
			return UserStore.disableTeamWithdrawalWithinIds(memberIds, { transaction });
		};

		await txn.startTransaction(operations);

		return await txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();

		throw error;
	}
}

async function updateTeamFixedWageIfGreaterThanByLeaderId(leaderId, fixedWage) {
	const txn = UserStore.getTransaction();

	try {
		const memberIds = await getMemberIdsByLeaderId(leaderId);

		const operations = async (transaction) => {
			return UserStore.updateFixedWageIfGreaterThanWithinIds(memberIds, fixedWage, { transaction });
		};

		await txn.startTransaction(operations);

		return await txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();

		throw error;
	}
}

async function updateTeamDeltaBonusIfGreaterThanByLeaderId(leaderId, deltaBonus) {
	const txn = UserStore.getTransaction();

	try {
		const operations = async (transaction) => {
			const user = await UserStore.getUserWithGreaterThanDeltaBonusDescendantsById(leaderId, deltaBonus, {
				projections: ["id", "deltaBonus"],
				transaction,
				lock: transaction.LOCK.SHARE,
			});

			const memberIds = user.descendants.map(descendant => descendant.id);

			memberIds.push(leaderId);

			const preparedUserBonusLogs = [{
				userId: user.id,
				previousDeltaBonus: user.deltaBonus,
				updatedDeltaBonus: deltaBonus,
			}];

			user.descendants.forEach(descendant => {
				preparedUserBonusLogs.push({
					userId: descendant.id,
					previousDeltaBonus: descendant.deltaBonus,
					updatedDeltaBonus: deltaBonus,
				});
			});

			await UserStore.updateDeltaBonusIfGreaterThanWithinIds(memberIds, deltaBonus, { transaction });
			await UserBonusLogStore.createUserBonusLogs(preparedUserBonusLogs, { transaction });
		};

		await txn.startTransaction(operations);

		return await txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();

		throw error;
	}
}

async function getChildrenWithWalletsBankCardsAndTeamStatsByUserIdAndPagnation(userId, page, {
	limit,
	projections,
}) {
	const children = await RelationshipStore.getChildrenRelationshipsByUserId(userId, {
		projections: RelationshipStore.USERID_ONLY_PROJECTIONS,
	});
	const childrenIds = children.map(({ userId }) => userId);

	const {
		users,
		numOfItems,
		numOfPages,
	} = await UserStore.getUsersWithWalletsBankCardsAndTeamStatsWithinIdsAndPagnation(childrenIds, page, {
		limit,
		projections,
	});

	return {
		children: users,
		numOfItems,
		numOfPages,
	};
}

async function updateLevelByUserId(userId, {
	levelId,
	levelExpiredAt,
	previousLevelId,
	username,
}) {
	const txn = UserStore.getTransaction();
	const operations = async (transaction) => {
		const result = await UserStore.updateLevelByIdAndLevelId(userId, previousLevelId, {
			levelId,
			levelExpiredAt,
		}, {
			transaction,
		});

		if (result === null || result.affectedRows !== 1) {
			throw new ForbiddenError(
				USER_IS_MODIFIED.MESSAGE,
				USER_IS_MODIFIED.CODE
			);
		}

		await LevelStore.decreaseNumOfUsersById(previousLevelId, { transaction });
		await LevelStore.increaseNumOfUsersById(levelId, { transaction });

		await UserLevelLogStore.createUserLevelLog({
			userId,
			username,
			previousLevelId,
			afterLevelId: levelId,
			status: ENUM_USER_LEVEL_LOG_STATUS.MANUALLY,
		}, {
			transaction,
		});
	};

	try {
		await txn.startTransaction(operations);

		return txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();

		throw error;
	}
}

async function getUsersWithWalletsBankCardsAndTeamStatsByPagination(page, {
	username,
	type,
	isNormal,
	payer,
	bankCardNumber,
	sort,
	order,
	limit,
}) {
	const result = await UserStore.getUsersWithWalletsBankCardsAndTeamStatsByPagination(page, {
		username,
		type,
		isNormal,
		payer,
		bankCardNumber,
		sort,
		order,
		limit,
	});

	result.users = result.users.map(user => user.toJSON());

	return result;
}

module.exports = {
	getUserById: UserStore.getUserById,
	getUserByUsername: UserStore.getUserByUsername,
	getUserWithParentById: UserStore.getUserWithParentById,
	getUserWithWalletsAndUserStatsByUsernameAndWalletCode: UserStore.getUserWithWalletsAndUserStatsByUsernameAndWalletCode,
	getUsersWithWalletsBankCardsAndTeamStatsByPagination,
	getChildrenWithWalletsBankCardsAndTeamStatsByUserIdAndPagnation,
	getAncestorRelationshipsByUserId: RelationshipStore.getAncestorRelationshipsByUserId,
	getUserStatsByUserIdAndWalletCode: UserStatsStore.getUserStatsByUserIdAndWalletCode,
	getAccountById: AccountStore.getAccountById,
	getWalletsByUserId: WalletStore.getWalletsByUserId,
	getWithdrawalMessageByUserId: UserWithdrawalPolicyStore.getWithdrawalMessageByUserId,
	getUserDividendSettingsByUserIdAndType: UserDividendSettingStore.getUserDividendSettingsByUserIdAndType,
	getUserWithActiveBankCardByIdAndBankCardNumber: UserStore.getUserWithActiveBankCardByIdAndBankCardNumber,
	getUserWithAncestorsById: UserStore.getUserWithAncestorsById,
	getZhaoshangsByPagnation: UserStore.getZhaoshangsByPagnation,
	getUsersWithWalletsByLevelIdAndPagination: UserStore.getUsersWithWalletsByLevelIdAndPagination,

	isUserExistedById: UserStore.isUserExistedById,

	updateBetPasswordByAccountId: AccountStore._updateBetPasswordByAccountId,
	updateFundsPasswordByAccountId: AccountStore._updateFundsPasswordByAccountId,
	updateLoginPasswordByAccountId: AccountStore._updateLoginPasswordByAccountId,
	updateNicknameById: UserStore.updateNicknameById,
	updatePayerById: UserStore.updatePayerById,
	updateGreetingById: UserStore.updateGreetingById,
	updateAgentOrMemberTypeById: UserStore.updateAgentOrMemberTypeById,
	updateTeamFixedWageIfGreaterThanByLeaderId,
	updateTeamDeltaBonusIfGreaterThanByLeaderId,
	updateUserZhuandianById: UserStore.updateUserZhuandianById,
	upsertWithdrawalMessage: UserWithdrawalPolicyStore.upsertWithdrawalMessage,
	updateLevelByUserId,
	updateLoginPasswordUpdatedAtById: UserStore.updateLoginPasswordUpdatedAtById,
	updateBetPasswordUpdatedAtById: UserStore.updateBetPasswordUpdatedAtById,

	disableGoogleTOTPByAccountId: AccountStore._disableGoogleTOTPByAccountId,
	disableLoginGeoValidationByAccountId: AccountStore._disableLoginGeoValidationByAccountId,
	enableLoginGeoValidationByAccountId: AccountStore._enableLoginGeoValidationByAccountId,
	blockUserById: UserStore.blockUserById,
	unblockUserById: UserStore.unblockUserById,
	enableUserBettingById: UserStore.enableUserBettingById,
	disableUserBettingById: UserStore.disableUserBettingById,
	enableUserDepositById: UserStore.enableUserDepositById,
	disableUserDepositById: UserStore.disableUserDepositById,
	disableUserWithdrawalById: UserStore.disableUserWithdrawalById,
	enableUserWithdrawalById: UserStore.enableUserWithdrawalById,
	enableUserDividendById: UserStore.enableUserDividendById,
	disableUserDividendById: UserStore.disableUserDividendById,
	disableUserFundsById: UserStore.disableUserFundsById,
	disableUserTransferById: UserStore.disableUserTransferById,
	enableUserFundsById: UserStore.enableUserFundsById,
	enableUserTransferById: UserStore.enableUserTransferById,
	deleteWithdrawalMessageByUserId: UserWithdrawalPolicyStore.deleteWithdrawalMessageByUserId,

	// Team Setting
	blockTeamByLeaderId,
	unblockTeamByLeaderId,
	unblockTeamMemberById: UserStore.unblockTeamMemberById,
	enableTeamBettingByLeaderId,
	disableTeamBettingByLeaderId,
	enableTeamMemberBettingById: UserStore.enableTeamMemberBettingById,
	enableTeamChildrenCreationByLeaderId,
	disableTeamChildrenCreationByLeaderId,
	enableTeamDepositByLeaderId,
	disableTeamDepositByLeaderId,
	enableTeamMemberDepositById: UserStore.enableTeamMemberDepositById,
	enableTeamFundsByLeaderId,
	disableTeamFundsByLeaderId,
	enableTeamMemberFundsById: UserStore.enableTeamMemberFundsById,
	enableTeamWithdrawalByLeaderId,
	disableTeamWithdrawalByLeaderId,
	enableTeamMemberWithdrawalById: UserStore.enableTeamMemberWithdrawalById,
	deleteSecurityQuestionsByAccountId: AccountStore._deleteSecurityQuestionsByAccountId,

	USER_PROJECTIONS: {
		ME: UserStore.ME_PROJECTIONS,
		ID: UserStore.ID_ONLY_PROJECTIONS,
		DELTA_BONUS: UserStore.DELTA_BONUS_ONLY_PROJECTIONS,
		FIXED_WAGE: UserStore.FIXED_WAGE_ONLY_PROJECTIONS,
		USERNAME: UserStore.USERNAME_ONLY_PROJECTIONS,
		ZHAOSHANG: UserStore.NICKNAME_AND_DELTABONUS_PROJECTIONS,
		LOGIN_AT: UserStore.USERNAME_AND_LOGIN_AT_PROJECTIONS,
		USERNAME_NICKNAME_AND_LEVEL: UserStore.USERNAME_NICKNAME_AND_LEVEL_PROJECTIONS,
	},
	RELATIONSHIP_PROJECTIONS: {
		ANCESTOR: RelationshipStore.ANCESTOR_PROJECTIONS,
	},
	USER_STATS_PROJECTIONS: {
		STATS_ONLY: UserStatsStore.STATS_ONLY_PROJECTIONS,
	},
};
