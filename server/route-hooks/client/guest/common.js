const {
	ForbiddenError,
	NotFoundError,
} = require("ljit-error");
const {
	USER_NOT_FOUND,
	USER_IS_BLOCKED,
	ILLEGAL_OPERATION,
} = require("../../../lib/error/code");
const {
	getAccountById,
	getUserByUsername,

	USER_PROJECTIONS,
} = require("../../../services/user");
const getDateAfterNSeconds = require("../../../lib/date/get-date-after-n-seconds");
const FIVE_MINUTES_IN_SECONDS = 300;

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

module.exports = {
	prepareAccount,
	prepareActiveUserBelongToGuest,
	isGuestExisted,
};
