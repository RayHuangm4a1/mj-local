const {
	ForbiddenError,
	NotFoundError,
} = require("ljit-error");
const {
	USER_NOT_FOUND,
	USER_PAYER_IS_EMPTY,
	USER_IS_FORBIDDEN,
} = require("../../lib/error/code");
const {
	USER_PROJECTIONS,

	getUserById,
	getAccountById,
	getUserWithParentById,
	getUserWithAncestorsById,
	getUserByUsername,
} = require("../../services/user.admin");

async function prepareMemberUser(req, res, next) {
	const { memberId } = req.params;

	try {
		const user = await getUserById(memberId, {
			projections: USER_PROJECTIONS.ME,
		});

		if (user === null) {
			throw new NotFoundError(
				USER_NOT_FOUND.MESSAGE,
				USER_NOT_FOUND.CODE
			);
		}

		res.locals.member = user;
	} catch (error) {
		return next(error);
	}

	next();
}

function validateUserType(validTypes) {
	return function (req, res, next) {
		if (validTypes.includes(req.user.type)) {
			next();
		} else {
			next(new ForbiddenError(USER_IS_FORBIDDEN.MESSAGE, USER_IS_FORBIDDEN.CODE));
		}
	};
}


function validateManagedUserType(validTypes) {
	return function (req, res, next) {
		if (validTypes.includes(res.locals.managedUser.type)) {
			next();
		} else {
			next(new ForbiddenError(USER_IS_FORBIDDEN.MESSAGE, USER_IS_FORBIDDEN.CODE));
		}
	};
}

async function prepareManagedUser(req, res, next) {
	const { userId } = req.params;

	try {
		const user = await getUserById(userId);

		if (user === null) {
			throw new NotFoundError(
				USER_NOT_FOUND.MESSAGE,
				USER_NOT_FOUND.CODE
			);
		}

		res.locals.managedUser = user;
	} catch (error) {
		return next(error);
	}

	next();
}

async function prepareManagedUserWithParent(req, res, next) {
	const { userId } = req.params;

	try {
		const user = await getUserWithParentById(userId);

		if (user === null) {
			throw new NotFoundError(
				USER_NOT_FOUND.MESSAGE,
				USER_NOT_FOUND.CODE
			);
		}

		res.locals.managedUser = user;
	} catch (error) {
		return next(error);
	}

	next();
}


async function prepareLeaderUser(req, res, next) {
	const { leaderId } = req.params;

	try {
		const user = await getUserById(leaderId, {
			projections: USER_PROJECTIONS.ME,
		});

		if (user === null) {
			throw new NotFoundError(
				USER_NOT_FOUND.MESSAGE,
				USER_NOT_FOUND.CODE
			);
		}

		req.leader = user;
	} catch (error) {
		return next(error);
	}

	next();
}

async function prepareManagedUserAccount(req, res, next) {
	const { accountId } = res.locals.managedUser;
	const requestId = req.header("X-Request-Id");

	try {
		const account = await getAccountById(accountId, { requestId });

		res.locals.managedAccount = account;
	} catch (error) {
		return next(error);
	}

	next();
}

function isManagedUserPayerExisted(req, res, next) {
	const { payer } = res.locals.managedUser;

	if (payer !== null) {
		next();
	} else {
		next(new ForbiddenError(USER_PAYER_IS_EMPTY.MESSAGE, USER_PAYER_IS_EMPTY.CODE));
	}
}

function prepareManagedUserWithAncestors({
	userProjections,
	ancestorProjections,
} = {}) {
	return async function (req, res, next) {
		const { userId } = req.params;

		try {
			const user = await getUserWithAncestorsById(userId, {
				userProjections,
				ancestorProjections,
				order: "desc",
			});

			if (user === null) {
				throw new NotFoundError(
					USER_NOT_FOUND.MESSAGE,
					USER_NOT_FOUND.CODE
				);
			}

			res.locals.managedUser = user;
		} catch (error) {
			return next(error);
		}

		next();
	};
}

async function prepareManagedUserbyUsername(req, res, next) {
	const { username } = req.params;

	try {
		const user = await getUserByUsername(username);

		if (user === null) {
			throw new NotFoundError(
				USER_NOT_FOUND.MESSAGE,
				USER_NOT_FOUND.CODE
			);
		}

		res.locals.managedUser = user;
	} catch (error) {
		return next(error);
	}

	next();
}

async function prepareManagedUserIdIfWithQueriedUsername(req, res, next) {
	if (req.query.username === undefined) {
		return next();
	}

	try {
		const user = await getUserByUsername(req.query.username, {
			projections: USER_PROJECTIONS.ID,
		});

		res.locals.userId = (user === null) ? null : user.id;
	} catch (error) {
		return next(error);
	}

	next();
}

module.exports = {
	prepareMemberUser,
	prepareManagedUserWithParent,
	prepareManagedUser,
	prepareLeaderUser,
	prepareManagedUserAccount,
	validateUserType,
	validateManagedUserType,
	isManagedUserPayerExisted,
	prepareManagedUserWithAncestors,
	prepareManagedUserbyUsername,
	prepareManagedUserIdIfWithQueriedUsername,
};
