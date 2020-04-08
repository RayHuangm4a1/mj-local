const {
	isUserExistedById,
} = require("../../../../services/user.admin");
const {
	NotFoundError,
} = require("ljit-error");
const {
	USER_NOT_FOUND,
} = require("../../../../lib/error/code");

module.exports = async function isUserExisted(req, res, next) {
	const isUserExisted = await isUserExistedById(req.params.userId);

	if (!isUserExisted) {
		return next(new NotFoundError(USER_NOT_FOUND.MESSAGE, USER_NOT_FOUND.CODE));
	}

	next();
};
