const {
	updateTeamDeltaBonusIfGreaterThanByLeaderId,
} = require("../../../services/user.admin");
const {
	updateDeltaBonusByIdAndDeltaBonus,
} = require("../../../services/user");

/**
 * @param {number} res.locals.preparedDeltaBonus
 */
module.exports = async function handleUpdateBonusBelongToUserRequest(req, res, next) {
	const { id, deltaBonus: previousDeltaBonus } = res.locals.managedUser;
	const { preparedDeltaBonus } = res.locals;

	try {
		if (preparedDeltaBonus < previousDeltaBonus) {
			await updateTeamDeltaBonusIfGreaterThanByLeaderId(id, preparedDeltaBonus);
		} else {
			await updateDeltaBonusByIdAndDeltaBonus(id, previousDeltaBonus, {
				updatedDeltaBonus: preparedDeltaBonus
			});
		}

		res.status(204).end();

		next();
	} catch (error) {
		next(error);
	}
};
