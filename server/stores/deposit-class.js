const {
	find,
} = require('../models/deposit-class');
const {
	ENUM_DEPOSIT_CLASS_STATUS,
} = require('../lib/enum');

const MIN_PROJECTIONS = ['id', 'name', 'ordering'];

function getActiveDepositClasses({ projections } = {}) {
	return find({
		where: {
			status: ENUM_DEPOSIT_CLASS_STATUS.ACTIVE,
		},
		order: [
			['ordering', 'ASC'],
		],
		attributes: projections,
	});
}

module.exports = {
	MIN_PROJECTIONS,

	getActiveDepositClasses,
};
