const Sequelize = require("sequelize");
const {
	ENUM_FINANCIAL_LEVEL_ID,
	ENUM_FINANCIAL_LEVEL_TYPE,
	ENUM_FINANCIAL_LEVEL_STATUS,
} = require("../../lib/enum");

const schema = {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		allowNull: false,
		validate: {
			isIn: [
				Object.values(ENUM_FINANCIAL_LEVEL_ID),
			],
		},
	},
	displayLevel: {
		type: Sequelize.INTEGER,
		allowNull:false,
	},
	type: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			isIn: [
				Object.values(ENUM_FINANCIAL_LEVEL_TYPE),
			],
		},
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	registeredAfter: {
		type: Sequelize.DATE,
		allowNull: true,
	},
	registeredBefore: {
		type: Sequelize.DATE,
		allowNull: true,
	},
	numOfRegisteredDays: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
	numOfDeposits: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
	depositAmount: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
	maxAmountPerDeposit: {
		type: Sequelize.DECIMAL(13, 4),
		allowNull: false,
		defaultValue: 0,
	},
	bettingAmount: {
		type: Sequelize.DECIMAL(13, 4),
		allowNull: false,
		defaultValue: 0,
	},
	numOfWithdraws: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
	withdrawalAmount: {
		type: Sequelize.DECIMAL(13, 4),
		allowNull: false,
		defaultValue: 0,
	},
	numOfUsers: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
	description: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	status: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: ENUM_FINANCIAL_LEVEL_STATUS.ACTIVE,
		validate: {
			isIn: [
				Object.values(ENUM_FINANCIAL_LEVEL_STATUS),
			],
		},
	},
	isBettingAmountGreaterThanDepositAmount: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: true,
	},
};

const indexes = {
	indexes:[
		{
			unique: true,
			fields: ["name"],
		},
	],
};

module.exports = {
	schema,
	indexes,
};
