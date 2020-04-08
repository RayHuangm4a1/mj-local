const Sequelize = require("sequelize");
const moment = require('moment');
const { convertBettingStatusToEnum } = require("../../lib/betting");
const {
	ENUM_BETTING_TYPE,
	ENUM_BETTING_STATUS,
	ENUM_BETTING_CANCELED_TYPE,
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
	type: {
		type: Sequelize.TINYINT(4),
		allowNull: false,
		validate: {
			isIn: [
				Object.values(ENUM_BETTING_TYPE),
			],
		},
	},
	traceId: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: -1,
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
	unit: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	awards: {
		type: Sequelize.JSON,
		allowNull: false,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		/*
			name = play_condition_name + play_name
		*/
	},
	bonus: {
		type: Sequelize.INTEGER,
		allowNull: false,
		/*
			bonus = platform_max_bonus + user_delta_bonus
		*/
	},
	rebate: {
		type: Sequelize.DECIMAL(3, 1),
		allowNull: false,
	},
	issue: {
		type: Sequelize.BIGINT,
		allowNull: false
	},
	opencode: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	reward: {
		type: Sequelize.DECIMAL(11, 4),
		allowNull: false,
		defaultValue: 0,
	},
	amountPerBet: {
		type: Sequelize.DECIMAL(7, 3),
		allowNull: false
	},
	multiple: {
		type: Sequelize.INTEGER,
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
		allowNull: false
	},
	isPK: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	},
	isTerminatedIfWin: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	},
	status: {
		type: Sequelize.INTEGER,
		allowNull: false,
		set: function(value) {
			if (Number.isInteger(value)) {
				this.setDataValue("status", value);
			} else {
				this.setDataValue("status", convertBettingStatusToEnum(value));
			}
		},
		get: function() {
			const now = new Date();
			const status = this.getDataValue('status');
			const openedAt = this.getDataValue('openedAt');

			if (status !== ENUM_BETTING_STATUS.NEW) {
				return status;
			}

			return moment(openedAt).isAfter(now)
				? ENUM_BETTING_STATUS.NOT_OPENED
				: ENUM_BETTING_STATUS.OPENING;
		},
	},
	canceledType: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: -1,
		validate: {
			isIn: [
				Object.values(ENUM_BETTING_CANCELED_TYPE),
			],
		},
	},
	ancestors: {
		type: Sequelize.JSON,
		allowNull: false,
		defaultValue: [],
	},
	transactionLogIds: {
		type: Sequelize.JSON,
		allowNull: false,
		defaultValue: [],
	},
	details: {
		type: Sequelize.JSON,
		allowNull: false,
		defaultValue: [],
		/*
			[
				{
					name: "和",
					count: 1,
					reward: 10,
				}
			]
		*/
	},
	device: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	error: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	oid: {
		type: Sequelize.SMALLINT(5).UNSIGNED,
		allowNull: false,
	},
	closedAt: {
		type: Sequelize.DATE,
		allowNull: false,
	},
	openedAt: {
		type: Sequelize.DATE,
		allowNull: false,
	},
	ip: {
		type: Sequelize.STRING,
		allowNull: true,
	}
};

const indexes = {
	indexes:[
		{
			unique: false,
			fields: ["lotteryId", "issue", "createdAt"],
		},
		{
			unique: false,
			fields: ["userId", "createdAt"],
		},
		{
			unique: false,
			fields: ["traceId", "userId", "createdAt"],
		},
		{
			unique: false,
			fields: ["traceId", "issue"],
		},
		{
			unique: false,
			fields: ["lotteryId", "userId", "issue"],
		},
		{
			unique: false,
			fields: ["lotteryId", "playId", "createdAt"],
		},
		{
			unique: false,
			fields: ["lotteryId", "traceId", "createdAt"],
		},
		{
			unique: false,
			fields: ["userId", "status", "updatedAt"],
		},
	]
};

module.exports = {
	schema,
	indexes,
};
