const {
	ForbiddenError,
} = require("ljit-error");
const {
	USER_INVALID_BONUS,
} = require("../../../../lib/error/code");

module.exports = function hasPermissionToSetChildrenBonus(req, res, next) {
	const {
		bonus: {
			list: platformBonusList,
		},
		couldEqualToPlatformMaxBonus,
		couldEqualToParentBonus,
	} = res.locals.platform;

	req.checkBody("bonus").isBonus({
		platformBonusList,
		couldEqualToPlatformMaxBonus,
		couldEqualToParentBonus,
		parentDeltaBonus: res.locals.user.deltaBonus,
	});

	const errors = req.validationErrors();

	if (errors) {
		const error = new ForbiddenError(USER_INVALID_BONUS.MESSAGE, USER_INVALID_BONUS.CODE);

		return next(error);
	}

	next();
};
