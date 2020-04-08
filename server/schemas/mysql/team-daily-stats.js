const Sequelize = require("sequelize");

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
	date: {
		type: Sequelize.DATEONLY,
		primaryKey: true,
		allowNull: false,
		/*
			2019-09-01
		*/
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
	numOfRegistries: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
	numOfBettingUsers: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
	numOfEffectiveBettingUsers: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0,
		// betting amount >= 1000
	},
};

const indexes = {
	indexes:[
	]
};

module.exports = {
	schema,
	indexes,
};
