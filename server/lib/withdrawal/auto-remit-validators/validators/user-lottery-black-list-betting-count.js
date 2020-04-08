const {
	ForbiddenError,
} = require("ljit-error");
const {
	WITHDRAWAL_USER_BETTING_ISSUE_IN_BLACK_LIST,
} = require("../../../error/code");
const {
	ENUM_WITHDRAWAL_APPLICATION_FORM_AUTO_REMIT_REJECT_TYPE,
} = require("../../../enum");

module.exports = function validateUserLotteryBlackListBettingCount({
	count
}) {
	if (count > 0) {
		throw new ForbiddenError(
			WITHDRAWAL_USER_BETTING_ISSUE_IN_BLACK_LIST.MESSAGE,
			WITHDRAWAL_USER_BETTING_ISSUE_IN_BLACK_LIST.CODE,
			{
				autoRemitRejectType: ENUM_WITHDRAWAL_APPLICATION_FORM_AUTO_REMIT_REJECT_TYPE.ISSUE_IN_BLACKLIST,
			}
		);
	}
};
