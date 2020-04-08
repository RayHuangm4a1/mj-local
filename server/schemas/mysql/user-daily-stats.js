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
	numOfWithdrawals: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0,
		/*
			今日已提款的次數
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
	transferAmount: {
		type: Sequelize.DECIMAL(13, 4),
		allowNull: false,
		defaultValue: 0,
	},
};

const indexes = {
	indexes:[
		{
			unique: false,
			fields: ["date", "walletCode"],
		},
	]
};

module.exports = {
	schema,
	indexes,
};
