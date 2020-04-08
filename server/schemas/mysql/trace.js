const Sequelize = require("sequelize");
const {
	ENUM_TRACE_STATUS,
} = require("../../lib/enum");

const schema = {
	id: {
		type: Sequelize.BIGINT,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
	},
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	username: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	walletCode: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	lotteryClassId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	lotteryId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	lotteryName: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	playId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		/*
			name = play_condition_name + play_name
		*/
	},
	isTerminatedIfWin: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	},
	firstIssue: {
		type: Sequelize.BIGINT,
		allowNull: false
	},
	latestIssue: {
		type: Sequelize.BIGINT,
		allowNull: false
	},
	numOfIssues: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	numOfFinishedIssues: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	rebate: {
		type: Sequelize.DECIMAL(3, 1),
		allowNull: false,
		defaultValue: 0,
	},
	amountPerBet: {
		type: Sequelize.DECIMAL(7, 3),
		allowNull: false
	},
	count: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	amount: {
		type: Sequelize.DECIMAL(11, 4),
		allowNull: false
	},
	betcontent: {
		type: Sequelize.STRING,
		allowNull: false
	},
	weizhi: {
		type: Sequelize.STRING,
		defaultValue: "",
	},
	isPK: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	},
	status: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			isIn: [
				Object.values(ENUM_TRACE_STATUS),
			],
		},
	},
	device: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	oid: {
		type: Sequelize.SMALLINT(5).UNSIGNED,
		allowNull: false,
	},
};

const indexes = {
	indexes:[
		{
			unique: false,
			fields: ["userId", "createdAt"],
		},
		{
			unique: false,
			fields: ["status", "createdAt"],
		},
		{
			unique: false,
			fields: ["lotteryId", "userId", "createdAt"],
		},
		{
			unique: false,
			fields: ["lotteryId", "playId", "createdAt"],
		}
	]
};

module.exports = {
	schema,
	indexes,
};
