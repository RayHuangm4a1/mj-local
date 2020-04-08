const Sequelize = require("sequelize");
const {
	ENUM_FINANCIAL_DEPARTMENT_ID,
	ENUM_BANK_ACCOUNT_RECEIVED_AMOUNT_TYPE,
	ENUM_BANK_ACCOUNT_STATUS,
} = require("../../lib/enum");

const schema = {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	departmentId: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			isIn: [
				Object.values(ENUM_FINANCIAL_DEPARTMENT_ID),
			],
		},
	},
	bankId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	bankName: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	depositClassId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	number: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	payee: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	branch: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	displayNumber: {
		type: Sequelize.STRING,
		allowNull: true,
		defaultValue: null,
	},
	receivedAmountType: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			isIn: [
				Object.values(ENUM_BANK_ACCOUNT_RECEIVED_AMOUNT_TYPE),
			],
		},
	},
	minReceivedAmount: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
	maxReceivedAmount: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
	fixedReceivedAmounts: {
		type: Sequelize.JSON,
		allowNull: false,
		defaultValue: [],
	},
	balance: {
		type: Sequelize.DECIMAL(11, 4),
		allowNull: true,
		defaultValue: 0,
	},
	percentageOfDama: {
		type: Sequelize.INTEGER,
		allowNull: true,
		defaultValue: 0,
	},
	percentageOfFee: {
		type: Sequelize.INTEGER,
		allowNull: true,
		defaultValue: 0,
	},
	description: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	status: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			isIn: [
				Object.values(ENUM_BANK_ACCOUNT_STATUS),
			],
		},
	},
};

const indexes = {
	indexes:[
		{
			unique: false,
			fields: ["depositClassId", "status"],
		},
		{
			unique: true,
			fields: ["number"],
		},
	],
};

module.exports = {
	schema,
	indexes,
};
