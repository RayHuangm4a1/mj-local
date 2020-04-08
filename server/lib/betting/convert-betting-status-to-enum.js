const { ENUM_BETTING_STATUS } = require("../enum");
const {
	NEW,
	WIN,
	LOSE,
	DRAW,
	FAILED,
	CANCELED,
	NOT_OPENED,
	OPENING,
} = ENUM_BETTING_STATUS;
const MAPPING = {
	new: NEW,
	win: WIN,
	lose: LOSE,
	draw: DRAW,
	failed: FAILED,
	canceled: CANCELED,
	notOpened: NOT_OPENED,
	opening: OPENING,
};

module.exports = function (status) {
	return MAPPING[status];
};
