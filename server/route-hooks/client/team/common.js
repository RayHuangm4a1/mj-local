const {
	NotFoundError,
	ForbiddenError,
} = require("ljit-error");
const {
	USER_PROJECTIONS,
	RELATIONSHIP_PROJECTIONS,

	getUserById,
	getUserByUsername,
	getAncestorAndMeRelationshipsByAncestorIdAndUserId,
	isChildrenByAncestorIdAndUserId,
	isDescentdantByAncestorIdAndUserId,
	getChildrenRelationshipsByUserId,
	getUserWithChildByIdAndChildId,
} = require("../../../services/user");
const {
	isSQLId,
} = require("ljit-validation").validators;
const {
	USER_IS_BLOCKED,
	TEAM_CHILDREN_NOT_FOUND,
} = require("../../../lib/error/code");
const {
	ENUM_RELATIONSHIP_DISTANCE,
} = require("../../../lib/enum");

async function prepareDescendantsBelongToUser(req, res, next) {
	const { userIdOrUsername } = req.params;
	const { id: ancestorId } = req.user;

	let ancestorsOfQueriedDescendant = [];
	let queriedDescendant = null;

	try {
		if (isSQLId(userIdOrUsername)) {
			queriedDescendant = await getUserById(userIdOrUsername, {
				projections: USER_PROJECTIONS.ID,
			});
		} else {
			queriedDescendant = await getUserByUsername(userIdOrUsername, {
				projections: USER_PROJECTIONS.ID,
			});
		}

		if (queriedDescendant !== null) {
			ancestorsOfQueriedDescendant = await getAncestorAndMeRelationshipsByAncestorIdAndUserId(ancestorId, queriedDescendant.id, {
				projections: RELATIONSHIP_PROJECTIONS.ANCESTOR,
			});
		}
	} catch (error) {
		return next(error);
	}

	req.ancestorsOfQueriedDescendant = ancestorsOfQueriedDescendant;
	req.queriedDescendant = queriedDescendant;

	next();
}

async function validateIsTeamChildren(req, res, next) {
	const { childrenId } = req.params;
	const { id: ancestorId } = req.user;

	try {
		const isChildren = await isChildrenByAncestorIdAndUserId(ancestorId, childrenId);

		if (!isChildren) {
			throw new NotFoundError(
				TEAM_CHILDREN_NOT_FOUND.MESSAGE,
				TEAM_CHILDREN_NOT_FOUND.CODE
			);
		}
	} catch (error) {
		return next(error);
	}

	next();
}

async function prepareChildIfQueried(req, res, next) {
	const { username } = req.query;

	let queriedChild = null;

	try {
		if (username) {
			const child = await getUserByUsername(username, {
				projections: USER_PROJECTIONS.ID,
			});

			if (child !== null) {
				const isChildren = await isChildrenByAncestorIdAndUserId(req.user.id, child.id);

				queriedChild = isChildren ? child : null;
			}
		}
	} catch (error) {
		return next(error);
	}

	res.locals.queriedChild = queriedChild;

	next();
}

async function isDescendant(req, res, next) {
	const { id } = req.user;
	const { memberId } = req.params;

	try {
		const isDescendant = await isDescentdantByAncestorIdAndUserId(id, memberId);

		if (!isDescendant) {
			throw new NotFoundError(
				TEAM_CHILDREN_NOT_FOUND.MESSAGE,
				TEAM_CHILDREN_NOT_FOUND.CODE
			);
		}

		next();
	} catch (error) {
		next(error);
	}
}

async function prepareDescendantIdsIfWithQueriedUsername(req, res, next) {
	if (req.query.username === undefined) {
		return next();
	}

	const { id: userId } = req.user;
	const { username: queriedUsername, distance } = req.query;

	let child = null;

	let descendantIds = [];

	try {
		child = await getUserByUsername(queriedUsername, {
			projections: USER_PROJECTIONS.ID,
		});

		if (child !== null && distance === ENUM_RELATIONSHIP_DISTANCE.CHILDREN) {
			const isChildren = await isChildrenByAncestorIdAndUserId(userId, child.id);

			descendantIds = isChildren ? [child.id] : [];
		} else if (child !== null && distance === -1) {
			const isDescentdant = await isDescentdantByAncestorIdAndUserId(userId, child.id);

			descendantIds = isDescentdant ? [child.id] : [];
		}
	} catch (error) {
		return next(error);
	}

	res.locals.descendantIds = descendantIds;

	next();
}

async function prepareDescendantIdsIfWithoutQueriedUsername(req, res, next) {
	if (req.query.username !== undefined) {
		return next();
	}

	const { id: userId } = req.user;

	let descendantIds = [];

	try {
		const children = await getChildrenRelationshipsByUserId(userId, {
			projections: RELATIONSHIP_PROJECTIONS.USERID,
		});

		descendantIds = children.map(({ userId }) => userId);
	} catch (error) {
		return next(error);
	}

	res.locals.descendantIds = descendantIds;

	next();
}

function prepareActiveUserWithChild(projections = USER_PROJECTIONS.MIN) {
	return async function (req, res, next) {
		try {
			const user = await getUserWithChildByIdAndChildId(req.user.id, req.params.childrenId, { projections });

			if (user === null) {
				throw new NotFoundError(TEAM_CHILDREN_NOT_FOUND.MESSAGE, TEAM_CHILDREN_NOT_FOUND.CODE);
			}

			if (user.isBlocked()) {
				throw new ForbiddenError(USER_IS_BLOCKED.MESSAGE, USER_IS_BLOCKED.CODE);
			}

			res.locals.user = user;
		} catch (error) {
			return next(error);
		}

		next();
	};
}

module.exports = {
	prepareDescendantsBelongToUser,
	validateIsTeamChildren,
	prepareChildIfQueried,
	isDescendant,
	prepareDescendantIdsIfWithQueriedUsername,
	prepareDescendantIdsIfWithoutQueriedUsername,
	prepareActiveUserWithChild,
};
