const {
	updateTypeFromMemberToAgentByIdAndDeltaBonus,
	updateDeltaBonusAndTypeByIdAndDeltaBonus,
	updateDeltaBonusByIdAndDeltaBonus,
} = require("../../../services/user");
const {
	ENUM_USER_TYPE,
} = require("../../../lib/enum");
const {
	ForbiddenError,
} = require("ljit-error");
const {
	ILLEGAL_OPERATION,
} = require("../../../lib/error/code");

module.exports = async function handleUpdateChildrenRequest(req, res, next) {
	const { id, deltaBonus } = res.locals.user.descendants[0];
	const { toAgent } = res.locals;
	const { bonus } = req.body;
	const updatedDeltaBonus = bonus - res.locals.platform.bonus.max;

	try {
		if (toAgent) {
			if (deltaBonus === updatedDeltaBonus) {
				await updateTypeFromMemberToAgentByIdAndDeltaBonus(id, deltaBonus);
			} else {
				await updateDeltaBonusAndTypeByIdAndDeltaBonus(id, deltaBonus, {
					updatedDeltaBonus,
					type: ENUM_USER_TYPE.AGENT,
				});
			}
		} else if (deltaBonus < updatedDeltaBonus) {
			await updateDeltaBonusByIdAndDeltaBonus(id, deltaBonus, { updatedDeltaBonus });
		} else {
			throw new ForbiddenError(
				ILLEGAL_OPERATION.MESSAGE,
				ILLEGAL_OPERATION.CODE
			);
		}

		res.status(204).end();
	} catch (error) {
		next(error);
	}
};
