const {
	ForbiddenError,
} = require("ljit-error");
const {
	WITHDRAWAL_USER_DAMA_AMOUNT_GREATER_THAN_ZERO,
} = require("../../../error/code");
const {
	ENUM_WITHDRAWAL_APPLICATION_FORM_AUTO_REMIT_REJECT_TYPE,
} = require("../../../enum");

module.exports = function validateUserDamaAmount({
	platform,
	userStats,
}) {
	if (!platform.autoRemitPolicy.isEnableDamaAmount) {
		return;
	}

	if (userStats.damaAmount > 0) {
		throw new ForbiddenError(
			WITHDRAWAL_USER_DAMA_AMOUNT_GREATER_THAN_ZERO.MESSAGE,
			WITHDRAWAL_USER_DAMA_AMOUNT_GREATER_THAN_ZERO.CODE,
			{
				autoRemitRejectType: ENUM_WITHDRAWAL_APPLICATION_FORM_AUTO_REMIT_REJECT_TYPE.DAMA_AMOUNT_GREATER_THAN_ZERO,
			}
		);
	}
};
