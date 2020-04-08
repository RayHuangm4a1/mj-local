const {
	bitfield,
	bitcount,
	expirenx,
} = require("ljit-redis/model");
const {
	USER_ONLINE_STATUS_TTL,
} = require("./index");

const DATA_TYPE = "u1";
const ONLINE_STATUS = 1;

function generateKeyOfUserOnlineStatus(date = new Date()) {
	return `${date.getDate()}-${date.getHours()}-${date.getMinutes()}`;
}

function getOnlineStatusesWithinUserIdsAndDate(userIds, date) {
	const key = generateKeyOfUserOnlineStatus(date);

	const operations = [key];

	userIds.forEach(userId => {
		operations.push("get", DATA_TYPE, userId);
	});

	return bitfield(operations);
}

function setOnlineByUserId(userId) {
	const key = generateKeyOfUserOnlineStatus();

	return expirenx(
		key,
		USER_ONLINE_STATUS_TTL,
		function (batch) {
			return batch.bitfield([key, "set", DATA_TYPE, userId, ONLINE_STATUS]);
		}
	);
}

function getCurrentNumOfOnlineUsers() {
	return bitcount(generateKeyOfUserOnlineStatus());
}

module.exports = {
	getOnlineStatusesWithinUserIdsAndDate,
	setOnlineByUserId,
	getCurrentNumOfOnlineUsers,
};
