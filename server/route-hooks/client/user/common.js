const {
	ForbiddenError,
	NotFoundError,
	AuthenticationError,
} = require("ljit-error");
const {
	USER_IS_FORBIDDEN,
	USER_NEVER_BIND_BANK_CARD,
	USER_NOT_FOUND,
	USER_IS_BLOCKED,
	USER_IS_NOT_CREATABLE,
	ILLEGAL_OPERATION,
	INVALID_USER_PAYER,
} = require("../../../lib/error/code");
const {
	getAccountById,
	getUserByUsername,
	setOnlineByUserId,

	USER_PROJECTIONS,
} = require("../../../services/user");
const getDateAfterNSeconds = require("../../../lib/date/get-date-after-n-seconds");
const FIVE_MINUTES_IN_SECONDS = 300;

function validateUserType(validTypes) {
	return function (req, res, next) {
		if (validTypes.includes(res.locals.user.type)) {
			next();
		} else {
			next(new ForbiddenError(USER_IS_FORBIDDEN.MESSAGE, USER_IS_FORBIDDEN.CODE));
		}
	};
}

async function prepareAccount(req, res, next) {
	const requestId = req.header("X-Request-Id");
	const { accountId } = res.locals.user;

	try {
		const account = await getAccountById(accountId, { requestId });

		res.locals.account = account;
	} catch (error) {
		return next(error);
	}

	next();
}

function isUserPayerExisted(req, res, next) {
	if (res.locals.user.payer !== null) {
		next();
	} else {
		next(new ForbiddenError(USER_NEVER_BIND_BANK_CARD.MESSAGE, USER_NEVER_BIND_BANK_CARD.CODE));
	}
}

function prepareActiveUserBelongToGuest(projections = USER_PROJECTIONS.ME) {
	return async function (req, res, next) {
		const { username } = req.params;

		try {
			const user = await getUserByUsername(username, {
				projections,
			});

			if (user === null) {
				throw new NotFoundError(
					USER_NOT_FOUND.MESSAGE,
					USER_NOT_FOUND.CODE
				);
			}

			if (user.isBlocked()) {
				throw new ForbiddenError(
					USER_IS_BLOCKED.MESSAGE,
					USER_IS_BLOCKED.CODE
				);
			}

			res.locals.user = user;

			req.session.guest = {
				userId: user.id,
				accountId: user.accountId,
				expiredAt: getDateAfterNSeconds(FIVE_MINUTES_IN_SECONDS),
			};
		} catch (error) {
			return next(error);
		}

		next();
	};
}

function isGuestExisted(req, res, next) {
	const { guest } = req.session;

	if (guest === undefined) {
		return next(new ForbiddenError(
			ILLEGAL_OPERATION.MESSAGE,
			ILLEGAL_OPERATION.CODE
		));
	}

	if (Date.now() > new Date(guest.expiredAt).getTime()) {
		return next(new ForbiddenError(
			ILLEGAL_OPERATION.MESSAGE,
			ILLEGAL_OPERATION.CODE
		));
	}

	next();
}

function validateUserPayer(req, res, next) {
	const { payer } = req.body;

	if (payer !== res.locals.user.payer) {
		return next(new AuthenticationError(
			INVALID_USER_PAYER.MESSAGE,
			INVALID_USER_PAYER.CODE
		));
	}

	next();
}

function isChildrenCreatable(req, res, next) {
	if (!res.locals.user.isChildrenCreatable()) {
		return next(new ForbiddenError(
			USER_IS_NOT_CREATABLE.MESSAGE,
			USER_IS_NOT_CREATABLE.CODE
		));
	}

	next();
}

async function setUserOnline(req, res, next) {
	try {
		await setOnlineByUserId(req.user.id);
	} catch (error) {
		return next(error);
	}

	next();
}

module.exports = {
	validateUserType,
	validateUserPayer,
	prepareAccount,
	isUserPayerExisted,
	prepareActiveUserBelongToGuest,
	isGuestExisted,
	isChildrenCreatable,
	setUserOnline,
};
