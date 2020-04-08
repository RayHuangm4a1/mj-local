const {
	ForbiddenError,
} = require("ljit-error");
const {
	WITHDRAWAL_DISALLOWED_LEVEL,
} = require("../../../error/code");
const {
	ENUM_WITHDRAWAL_APPLICATION_FORM_AUTO_REMIT_REJECT_TYPE,
} = require("../../../enum");

module.exports = function validateUserLevel({
	platform,
	withdrawalApplicationForm,
}) {
	const autoRemitLevelIds = platform.autoRemitPolicy.levelIds;
	const { userLevelId } = withdrawalApplicationForm;

	if (!autoRemitLevelIds.includes(userLevelId)) {
		throw new ForbiddenError(
			WITHDRAWAL_DISALLOWED_LEVEL.MESSAGE,
			WITHDRAWAL_DISALLOWED_LEVEL.CODE,
			{
				autoRemitRejectType: ENUM_WITHDRAWAL_APPLICATION_FORM_AUTO_REMIT_REJECT_TYPE.DISALLOWED_LEVEL,
			}
		);
	}
};
