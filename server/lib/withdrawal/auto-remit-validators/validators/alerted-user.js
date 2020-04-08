const {
	ForbiddenError,
} = require("ljit-error");
const {
	WITHDRAWAL_ALERTED_USER,
} = require("../../../error/code");
const {
	ENUM_WITHDRAWAL_APPLICATION_FORM_AUTO_REMIT_REJECT_TYPE,
} = require("../../../enum");
const ALLOWED_STATUSES_CONDITIONS = {
	isBlocked: false,
	isDepositable: true,
	isBetable: true,
	isWithdrawable: true,
	isFundsable: true,
	isDividendable: true,

	// [TODO] 缺 禁止開下級、禁止任意轉帳者
};
const NOT_ALLOWED_STATUSES = Object.keys(ALLOWED_STATUSES_CONDITIONS);

module.exports = function validateAlertedUser({
	platform,
	user,
}) {
	if (!platform.autoRemitPolicy.isEnableAlertedUser) {
		return;
	}

	NOT_ALLOWED_STATUSES.forEach(function(key) {
		if (user.statuses[key] !== ALLOWED_STATUSES_CONDITIONS[key]) {
			throw new ForbiddenError(
				WITHDRAWAL_ALERTED_USER.MESSAGE,
				WITHDRAWAL_ALERTED_USER.CODE,
				{
					autoRemitRejectType: ENUM_WITHDRAWAL_APPLICATION_FORM_AUTO_REMIT_REJECT_TYPE.ALERTED_USER,
					reason: {
						message: `${key} = ${user.statuses[key]}, should be ${ALLOWED_STATUSES_CONDITIONS[key]}}`,
						condition: key,
						value: user.statuses[key],
						correctValue:  ALLOWED_STATUSES_CONDITIONS[key],
					},
				}
			);
		}
	});
};
