const Sequelize = require("sequelize");
const {
	ENUM_FINANCIAL_DEPARTMENT_ID,
	ENUM_DEPOSIT_APPLICATION_FORM_STATUS,
} = require("../../lib/enum");

const schema = {
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	username: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	userLevelId: {
		type: Sequelize.INTEGER,
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
	depositClassId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	walletCode: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	operatorId: {
		type: Sequelize.INTEGER,
		allowNull: true,
	},
	operatorUsername: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	bankId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	bankName: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	bankAccountId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	bankAccountNumber: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	amount: {
		type: Sequelize.DECIMAL(11, 2),
		allowNull: true,
	},
	payer: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	payerAccountNumber: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	fee: {
		type: Sequelize.DECIMAL(11, 4),
		allowNull: true,
	},
	damaAmount: {
		type: Sequelize.DECIMAL(11, 4).UNSIGNED,
		allowNull: true,
	},
	postscript: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	description: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	depositAmountId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	status: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			isIn: [
				Object.values(ENUM_DEPOSIT_APPLICATION_FORM_STATUS),
			],
		},
	},
	expiredAt: {
		type: Sequelize.DATE,
		allowNull: false,
	},
	confirmedAt: {
		type: Sequelize.DATE,
		allowNull: true,
	},
};

const indexes = {
	indexes:[
		{
			unique: false,
			fields: ["userId", "status"],
		},
		{
			unique: false,
			fields: ["departmentId", "depositClassId", "createdAt"],
			name: "departmentId_depositClassId_createdAt",
		},
	]
};

module.exports = {
	schema,
	indexes,
};
