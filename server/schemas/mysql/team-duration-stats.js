const Sequelize = require("sequelize");
const {
	ENUM_DIVIDEND_STATUS,
} = require("../../lib/enum");

const schema = {
	userId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		allowNull: false,
	},
	username: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	walletCode: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		allowNull: false,
	},
	durationId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		allowNull: false,
	},
	bettingAmount: {
		type: Sequelize.DECIMAL(11, 4),
		allowNull: false,
		defaultValue: 0,
	},
	bettingReward: {
		type: Sequelize.DECIMAL(11, 4),
		allowNull: false,
		defaultValue: 0,
	},
	depositAmount: {
		type: Sequelize.DECIMAL(11, 4),
		allowNull: false,
		defaultValue: 0,
	},
	withdrawalAmount: {
		type: Sequelize.DECIMAL(11, 4),
		allowNull: false,
		defaultValue: 0,
	},
	rebateAmount: {
		type: Sequelize.DECIMAL(11, 4),
		allowNull: false,
		defaultValue: 0,
	},
	activityAmount: {
		type: Sequelize.DECIMAL(11, 4),
		allowNull: false,
		defaultValue: 0,
	},
	fixedWageAmount: {
		type: Sequelize.DECIMAL(11, 4),
		allowNull: false,
		defaultValue: 0,
	},
	dividendAmount: {
		type: Sequelize.DECIMAL(11, 4),
		allowNull: false,
		defaultValue: 0,
	},
	incentiveAmount: {
		type: Sequelize.DECIMAL(11, 4),
		allowNull: false,
		defaultValue: 0,
	},
	maxGrantAmount: {
		type: Sequelize.DECIMAL(11, 4),
		allowNull: false,
		defaultValue: 0,
	},
	grantedAmount: {
		type: Sequelize.DECIMAL(11, 4),
		allowNull: false,
		defaultValue: 0,
	},
	status: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: ENUM_DIVIDEND_STATUS.NOT_SET,
		validate: {
			isIn: [
				Object.values(ENUM_DIVIDEND_STATUS),
			],
		},
	},
	latestStatsAt: {
		type: Sequelize.DATEONLY,
		allowNull: false,
		/*
			2019-09-01
		*/
	},
};

const indexes = {
	indexes:[
		{
			unique: false,
			fields: ["latestStatsAt"],
		},
	]
};

module.exports = {
	schema,
	indexes,
};
