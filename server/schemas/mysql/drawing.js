const Sequelize = require("sequelize");
const {
	ENUM_DRAWING_STATUS,
} = require("../../lib/enum");

const schema = {
	lotteryId: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
	},
	issue: {
		type: Sequelize.BIGINT,
		allowNull: false,
		primaryKey: true,
	},
	index: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	opencode: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	startedAt: {
		type: Sequelize.DATE,
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
	isFetched: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	},
	income: {
		type: Sequelize.DECIMAL(12, 4),
		allowNull: false,
		defaultValue: 0,
		// only include betting amount
	},
	expense: {
		type: Sequelize.DECIMAL(12, 4),
		allowNull: false,
		defaultValue: 0,
		// only include betting reward
	},
	status: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			isIn: [
				Object.values(ENUM_DRAWING_STATUS),
			],
		},
	},
};

const indexes = {
	indexes:[
		{
			unique: false,
			fields: ["status", "updatedAt"]
		},
	]
};

module.exports = {
	schema,
	indexes,
};
