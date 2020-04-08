const Sequelize = require("sequelize");
const { Op } = Sequelize;
const {
	findOne,
	update,
	upsert,
} = require("../models/user-withdrawal-policy");

const WITHDRAWAL_CREATION_REQUIRED_PROJECTIONS = [
	"maxWithdrawalAmountPerDay", "minAmountPerWithdrawal", "maxAmountPerWithdrawal",
	"numOfWithdrawalsPerDay",
];
const WITHDRAWAL_MESSAGE_ONLY_PROJECTIONS = ["message"];

function getWithdrawalMessageByUserId(userId) {
	return findOne({
		where: {
			userId,
			message: {
				[Op.ne]: null,
			}
		},
		attributes: WITHDRAWAL_MESSAGE_ONLY_PROJECTIONS,
	});
}

function deleteWithdrawalMessageByUserId(userId) {
	return update({
		message: null,
	}, {
		where: {
			userId,
			message: {
				[Op.ne]: null,
			}
		}
	});
}

function upsertWithdrawalMessage(row) {
	return upsert(row, {
		fields: ["message", "updatedAt"],
	});
}

module.exports = {
	upsertWithdrawalMessage,
	getWithdrawalMessageByUserId,
	deleteWithdrawalMessageByUserId,

	WITHDRAWAL_CREATION_REQUIRED_PROJECTIONS,
};

