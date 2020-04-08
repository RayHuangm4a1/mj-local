const {
	USER_PROJECTIONS,

	getUserById,
} = require("../../../../services/user");

module.exports = async function prepareUser(req, res, next) {
	const { userId } = req.session.guest;

	try {
		const user = await getUserById(userId, {
			projections : USER_PROJECTIONS.STATUSES,
		});

		res.locals.user = user;

		next();
	} catch (error) {
		next(error);
	}
};
