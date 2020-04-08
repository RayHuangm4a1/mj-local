const {
	NORMAL_STATUSES,
	NORMAL_CONDITIONS,
} = require("./index");

module.exports = function isNormal(statuses) {
	return NORMAL_STATUSES.every(current => {
		return NORMAL_CONDITIONS[current] === statuses[current];
	});
};
