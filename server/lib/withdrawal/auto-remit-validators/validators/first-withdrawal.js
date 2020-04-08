const {
	ForbiddenError,
} = require("ljit-error");
const {
	WITHDRAWAL_USER_FIRST_WITHDRAW,
} = require("../../../error/code");
const {
	ENUM_WITHDRAWAL_APPLICATION_FORM_AUTO_REMIT_REJECT_TYPE,
} = require("../../../enum");

module.exports = function validateUserFirstWithdrawal({
	platform,
	user,
}) {
	if (!platform.autoRemitPolicy.isEnableFirstWithdrawal) {
		return;
	}

	if (!user.hasWithdrawn()) {
		throw new ForbiddenError(
			WITHDRAWAL_USER_FIRST_WITHDRAW.MESSAGE,
			WITHDRAWAL_USER_FIRST_WITHDRAW.CODE,
			{
				autoRemitRejectType: ENUM_WITHDRAWAL_APPLICATION_FORM_AUTO_REMIT_REJECT_TYPE.FIRST_WITHDRAWAL,
			}
		);
	}
};
