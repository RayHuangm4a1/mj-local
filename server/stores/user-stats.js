const Sequelize = require("sequelize");
const {
	findOne,
	create,
	update,
	increment,
} = require("../models/user-stats");
const {
	getDecreasedFeeDepositAmount,
	getDamaAmount,
} = require("../lib/deposit");
const DAMA_AMOUNT_ONLY_PROJECTIONS = [
	"damaAmount"
];
const STATS_ONLY_PROJECTIONS = [
	"numOfDeposits",
	"depositAmount",
	"maxAmountPerDeposit",
	"bettingAmount",
	"bettingReward",
	"numOfWithdraws",
	"withdrawalAmount",
	"damaAmount",
];

function getUserStatsByUserIdAndWalletCode(userId, walletCode, {
	projections,
} = {}) {
	return findOne({
		where: {
			userId,
			walletCode,
		},
		attributes: projections,
	});
}

function createUserStats(row, {
	transaction,
} = {}) {
	return create(row, { transaction });
}

function increaseBettingRelatedStatsByUserIdAndWalletCode(userId, walletCode, { bettingAmount, bettingReward }, {
	transaction,
} = {}) {
	return update(
		{
			bettingReward: Sequelize.literal(`bettingReward + ${bettingReward}`),
			bettingAmount: Sequelize.literal(`bettingAmount + ${bettingAmount}`),
			damaAmount: Sequelize.literal(`damaAmount - (IF(damaAmount > ${bettingAmount}, ${bettingAmount}, damaAmount))`),
		},
		{
			where: {
				userId,
				walletCode,
			},
			transaction,
		}
	);
}

function decreaseBettingAmountStatsByUserIdAndWalletCode(userId, walletCode, amount, {
	transaction,
} = {}) {
	if (amount <= 0) {
		throw new Error("amount positive required");
	}

	return increment(
		{
			bettingAmount: -amount,
		},
		{
			where: {
				userId,
				walletCode,
			},
			transaction,
		}
	);
}

function increaseDepositAmountStatsByUserIdAndWalletCode(userId, walletCode, {
	amount, percentageOfDama, percentageOfFee,
}, {
	transaction,
} = {}) {
	const depositAmount = getDecreasedFeeDepositAmount({ amount, percentageOfFee });
	const damaAmount = getDamaAmount({ amount, percentageOfDama });

	return increment(
		{
			depositAmount,
			damaAmount,
			numOfDeposits: 1,
		},
		{
			where: {
				userId,
				walletCode,
			},
			transaction,
		},
	);
}

module.exports = {
	getUserStatsByUserIdAndWalletCode,
	createUserStats,
	increaseBettingRelatedStatsByUserIdAndWalletCode,
	decreaseBettingAmountStatsByUserIdAndWalletCode,
	increaseDepositAmountStatsByUserIdAndWalletCode,

	DAMA_AMOUNT_ONLY_PROJECTIONS,
	STATS_ONLY_PROJECTIONS,
};
