const Sequelize = require("sequelize");
const {
	ENUM_USER_TYPE,
	ENUM_FINANCIAL_LEVEL_ID
} = require("../../lib/enum");
const {
	isNormal,
} = require("../../lib/user");
const STATUSES_DEFAULT_VALUE = {
	// 用戶狀態
	isBlocked: false,
	isBetable: true,
	isDepositable: true,
	isWithdrawable: true,
	isDividendable: true,
	isFundsable: true,
	hasWithdrawn: false,
	isEverInRiskLevel: false,
	isTransferable: true,
	isEnableDepositZhuandian: true,
	isEnableIncentiveZhuandian: true,

	// 團隊狀態
	isTeamBlocked: false,
	isTeamBetable: true,
	isTeamDepositable: true,
	isTeamWithdrawable: true,
	isTeamFundsable: true,
	isChildrenCreatable: true,
};

const schema = {
	username: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	accountId: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	type: {
		type: Sequelize.TINYINT,
		allowNull: false,
		validate: {
			isIn: [
				Object.values(ENUM_USER_TYPE)
			],
		},
	},
	deltaBonus: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	fixedWage: {
		type: Sequelize.DECIMAL(4, 2),
		allowNull: false,
		defaultValue: 0,
	},
	nickname: {
		type: Sequelize.STRING,
		allowNull: true,
		defaultValue: null,
	},
	greeting: {
		type: Sequelize.STRING,
		allowNull: true,
		defaultValue: null,
	},
	createdBy: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	ip: {
		type: Sequelize.STRING,
		allowNull: true,
		defaultValue: null,
	},
	geo: {
		type: Sequelize.STRING,
		allowNull: true,
		defaultValue: null,
	},
	loginAt: {
		type: Sequelize.DATE,
		allowNull: true,
		defaultValue: null,
	},
	payer: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	levelId: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: ENUM_FINANCIAL_LEVEL_ID.NORMAL_ONE,
		validate: {
			isIn: [
				Object.values(ENUM_FINANCIAL_LEVEL_ID)
			],
		},
	},
	levelExpiredAt: {
		type: Sequelize.DATEONLY,
		allowNull: false,
		defaultValue: new Date("9999-12-31"),
	},
	statuses: {
		type: Sequelize.JSON,
		allowNull: false,
		defaultValue: STATUSES_DEFAULT_VALUE,
	},
	loginPasswordUpdatedAt: {
		type: Sequelize.DATE,
		allowNull: false,
		defaultValue: new Date(),
	},
	betPasswordUpdatedAt: {
		type: Sequelize.DATE,
		allowNull: true,
		defaultValue: null,
	},
	isNormal: {
		type: Sequelize.VIRTUAL,
		get() {
			const statuses = this.getDataValue("statuses");

			if (statuses === undefined) {
				throw new Error("projection statuses is required.");
			}

			return isNormal(statuses);
		}
	},
};

const indexes = {
	indexes:[
		{
			unique: true,
			fields: ["username"],
		},
		{
			unique: false,
			fields: ["type", "username"],
		},
		{
			unique: false,
			fields: ["payer"],
		},
		{
			unique: false,
			fields: ["fixedWage"],
		},
		{
			unique: false,
			fields: ["levelId", "loginAt"],
		}
	],
};

module.exports = {
	schema,
	indexes,
	STATUSES_DEFAULT_VALUE,
};
