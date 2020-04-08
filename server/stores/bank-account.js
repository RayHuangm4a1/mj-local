require("../models/bank-account-level");
const {
	find,
	findOne,
} = require("../models/bank-account");
const LevelModel = require("../models/level");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const {
	ENUM_BANK_ACCOUNT_STATUS,
	ENUM_FINANCIAL_LEVEL_STATUS,
} = require("../lib/enum");

const MIN_PROJECTIONS = [
	'id', 'name', 'receivedAmountType',
	'minReceivedAmount', 'maxReceivedAmount', 'fixedReceivedAmounts',
	'depositClassId', 'balance',
];
const DEPOSIT_REQUIRED_PROJECTIONS = [
	"id", "bankId", "bankName",
	"payee", "branch", "number",
	"receivedAmountType", "minReceivedAmount", "maxReceivedAmount",
	"fixedReceivedAmounts", "percentageOfFee", "departmentId",
];
const PERCENTAGE_OF_DAMA_AND_FEE_PROJECTIONS = [
	"id", "percentageOfDama", "percentageOfFee",
];

async function getBankAccountWithLevelsByIdAndDepositClassId(id, depositClassId, {
	bankAccountProjections,
	levelProjections,
} = {}) {
	let bankAccountWithLevels = await findOne({
		where: {
			id,
			depositClassId,
			status: ENUM_BANK_ACCOUNT_STATUS.ACTIVE,
		},
		attributes: bankAccountProjections,
		raw: false,
		include: [
			{
				model: LevelModel.getInstance(),
				where: {
					status: ENUM_FINANCIAL_LEVEL_STATUS.ACTIVE,
				},
				through: {
					attributes: [],
				},
				as: "levels",
				attributes: levelProjections,
			},
		],
	});

	if (bankAccountWithLevels !== null) {
		bankAccountWithLevels = bankAccountWithLevels.toJSON();
	}

	return bankAccountWithLevels;
}

function getActiveBankAccountsWithinDepositClassIdsAndLevelId(depositClassIds, levelId, {
	projections,
} = {}) {
	return find({
		where: {
			depositClassId: {
				[Op.in]: depositClassIds,
			},
			status: ENUM_BANK_ACCOUNT_STATUS.ACTIVE,
		},
		raw: false,
		attributes: projections,
		include: [
			{
				model: LevelModel.getInstance(),
				through: {
					attributes: [],
				},
				where: {
					id: levelId,
					status: ENUM_FINANCIAL_LEVEL_STATUS.ACTIVE,
				},
				as: 'levels',
				attributes: [],
			},
		],
		order: [['balance', 'asc']],
	});
}


module.exports = {
	MIN_PROJECTIONS,
	DEPOSIT_REQUIRED_PROJECTIONS,
	PERCENTAGE_OF_DAMA_AND_FEE_PROJECTIONS,

	getBankAccountWithLevelsByIdAndDepositClassId,
	getActiveBankAccountsWithinDepositClassIdsAndLevelId,
};
