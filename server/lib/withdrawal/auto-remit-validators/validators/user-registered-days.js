const {
	ForbiddenError,
} = require("ljit-error");
const {
	getDayDiffBetween,
} = require("ljit-lib/moment-utils");
const {
	WITHDRAWAL_MIN_REGISTERED_DAYS_UNREACH,
} = require("../../../error/code");
const {
	ENUM_WITHDRAWAL_APPLICATION_FORM_AUTO_REMIT_REJECT_TYPE,
} = require("../../../enum");

module.exports = function validateUserRegisteredDays({
	platform,
	user,
}) {
	if (!platform.autoRemitPolicy.isEnableMinRegisteredDays) {
		return;
	}

	const autoRemitMinRegisteredDays = platform.autoRemitPolicy.minRegisteredDays;
	const { createdAt } = user;
	const userRegisteredDays = getDayDiffBetween(createdAt, new Date());

	if (userRegisteredDays < autoRemitMinRegisteredDays) {
		throw new ForbiddenError(
			WITHDRAWAL_MIN_REGISTERED_DAYS_UNREACH.MESSAGE,
			WITHDRAWAL_MIN_REGISTERED_DAYS_UNREACH.CODE,
			{
				autoRemitRejectType: ENUM_WITHDRAWAL_APPLICATION_FORM_AUTO_REMIT_REJECT_TYPE.MIN_REGISTERED_DAYS,
				autoRemitMinRegisteredDays,
			}
		);
	}
};
