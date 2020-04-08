const Sequelize = require("sequelize");
const { Op } = Sequelize;
const {
	update,
	create,
	findOne,
} = require("../models/deposit-amount");
const {
	ENUM_DEPOSIT_AMOUNT_STATUS: {
		IDLE, BUSY,
	},
} = require("../lib/enum");
const MIN_PROJECTIONS = [
	"id", "integer", "fraction",
	"status",
];
const MIN_FRACTION = 1;
const MAX_FRACTION = 99;

function getDepositAmountByIntegerAndStatus(integer, status, {
	transaction,
	projections,
	lock,
	sort,
} = {}) {
	return findOne({
		where: {
			integer,
			status,
		},
		order: [
			["fraction", sort]
		],
		attributes: projections,
		transaction,
		lock,
	});
}

function getIdleDepositAmountByInteger(integer, {
	transaction,
	projections,
	lock,
} = {}) {
	return getDepositAmountByIntegerAndStatus(integer, IDLE, {
		transaction,
		projections,
		sort: "ASC",
		lock,
	});
}

function getLatestBusyDepositAmountByInteger(integer, {
	transaction,
	projections,
	lock,
}) {
	return getDepositAmountByIntegerAndStatus(integer, BUSY, {
		transaction,
		projections,
		sort: "DESC",
		lock,
	});
}

function createDepositAmount(row, {
	transaction,
} = {}) {
	return create(row, { transaction });
}

function releaseDepositAmountById(id, {
	transaction,
} = {}) {
	return update({
		status: IDLE,
	}, {
		where: {
			id,
		},
		transaction,
	});
}

function releaseDepositAmountsWithinIds(ids, {
	transaction,
} = {}) {
	return update({
		status: IDLE,
	}, {
		where: {
			id: {
				[Op.in]: ids,
			},
		},
		transaction,
	});
}

function setIdleDepositAmountToBusyById(id, {
	transaction,
} = {}) {
	return update({
		status: BUSY,
	}, {
		where: {
			id,
			status: IDLE,
		},
		transaction,
	});
}

async function createDepositAmountByIntegerDepositAmount(integer, {
	transaction,
} = {}) {
	const idleDepositAmount = await getIdleDepositAmountByInteger(integer, {
		projections: MIN_PROJECTIONS,
		transaction,
	});

	if (idleDepositAmount !== null) {
		const result = await setIdleDepositAmountToBusyById(idleDepositAmount.id, { transaction });

		if (result === null || result.affectedRows !== 1) {
			return null;
		}

		return idleDepositAmount;
	}

	const busyDepositAmount = await getLatestBusyDepositAmountByInteger(integer, {
		projections: MIN_PROJECTIONS,
		transaction,
	});

	const row = { integer, status: BUSY };

	if (busyDepositAmount === null) {
		row.fraction = MIN_FRACTION;

		return createDepositAmount(row, { transaction });
	}

	if (busyDepositAmount.fraction < MAX_FRACTION) {
		row.fraction = busyDepositAmount.fraction + 1;

		return createDepositAmount(row, { transaction });
	}

	return null;
}

module.exports = {
	createDepositAmountByIntegerDepositAmount,
	releaseDepositAmountsWithinIds,
	releaseDepositAmountById,
};
