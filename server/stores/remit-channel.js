const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const {
	findOne,
} = require("../models/remit-channel");
const {
	ENUM_REMIT_CHANNEL_STATUS,
} = require("../lib/enum");
const AUTO_REMIT_PROJECTIONS = [
	"id",
	"paymentClassId",
	"paymentAccountId",
	"blockedBankIds",
];

function getActiveRemitChannelByAmount(amount, {
	projections,
} = {}) {
	return findOne({
		where: {
			minAutoRemitAmount: {
				[Op.lt]: amount,
			},
			maxAutoRemitAmount: {
				[Op.gte]: amount,
			},
			status: ENUM_REMIT_CHANNEL_STATUS.ACTIVE
		},
		attributes: projections,
	});
}


module.exports = {
	getActiveRemitChannelByAmount,

	AUTO_REMIT_PROJECTIONS,
};
