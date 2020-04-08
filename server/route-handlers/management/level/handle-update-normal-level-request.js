const {
	updateLevelById,
} = require('../../../services/level.admin');

module.exports = async function handleUpdateSpecialLevelRequest(req, res, next) {
	const {
		isBettingAmountGreaterThanDepositAmount, status, withdrawalAmount,
		numOfWithdraws, bettingAmount, depositAmount,
		numOfDeposits, numOfRegisteredDays, registeredBefore,
		registeredAfter, name, description,
	} = req.body;

	try {
		await updateLevelById(req.params.levelId, {
			isBettingAmountGreaterThanDepositAmount, status, withdrawalAmount,
			numOfWithdraws, bettingAmount, depositAmount,
			numOfDeposits, numOfRegisteredDays, registeredBefore,
			registeredAfter, name, description,
		});

		res.status(204).end();

		next();
	} catch (error) {
		next(error);
	}
};
