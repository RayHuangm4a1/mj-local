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
	maxWithdrawalAmountPerDay: {
		type: Sequelize.INTEGER,
		defaultValue: null,
		/*
			每日出款上限 (會員單日最大提款總額)
		*/
	},
	minAmountPerWithdrawal: {
		type: Sequelize.INTEGER,
		defaultValue: null,
		/*
			每次出款下限 (會員每次最小提款額)
		*/
	},
	maxAmountPerWithdrawal: {
		type: Sequelize.INTEGER,
		defaultValue: null,
		/*
			每次出款上限 (會員每次最大提款額)
		*/
	},
	numOfWithdrawalsPerDay: {
		type: Sequelize.INTEGER,
		defaultValue: null,
		/*
			會員每日可提款次數
		*/
	},
	message: {
		type: Sequelize.STRING,
		defaultValue: null,
	},
};

const indexes = {
	indexes:[
	],
};

module.exports = {
	schema,
	indexes,
};
