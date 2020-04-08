const {
	findOne,
	upsert,
} = require("../models/user-favorite");

function getUserFavoriteByUserId(userId) {
	return findOne({
		where: {
			userId,
		},
	});
}

function upsertLotteryIdsByUserId(userId, lotteryIds) {
	return upsert({
		userId,
		lotteryIds,
	}, {
		fields: ['lotteryIds', 'updatedAt'],
	});
}

module.exports = {
	getUserFavoriteByUserId,
	upsertLotteryIdsByUserId,
};
