const {
	updateTeamFixedWageIfGreaterThanByLeaderId,
} = require("../../../services/user.admin");
const {
	updateFixedWageByIdAndFixedWage,
} = require("../../../services/user");

/**
 * @param {object} res.locals.managedUser
 */
module.exports = async function handleUpdateFixedWageBelongToUserRequest(req, res, next) {
	const { id, fixedWage: previousFixedWage } = res.locals.managedUser;
	const { fixedWage: currentFixedWage } = req.body;

	try {
		if (currentFixedWage < previousFixedWage) {
			await updateTeamFixedWageIfGreaterThanByLeaderId(id, currentFixedWage);
		} else {
			await updateFixedWageByIdAndFixedWage(id, previousFixedWage, {
				updatedFixedWage: currentFixedWage,
			});
		}

		res.status(204).end();

		next();
	} catch (error) {
		next(error);
	}
};
