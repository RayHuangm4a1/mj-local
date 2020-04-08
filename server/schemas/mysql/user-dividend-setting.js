const Sequelize = require("sequelize");
const {
	ENUM_DIVIDEND_TYPE,
} = require("../../lib/enum");

const schema = {
	userId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		allowNull: true,
	},
	type: {
		type: Sequelize.TINYINT,
		primaryKey: true,
		allowNull: false,
		validate: {
			isIn: [
				Object.values(ENUM_DIVIDEND_TYPE),
			],
		}
	},
	dividendSettings: {
		type: Sequelize.JSON,
		allowNull: false,
		defaultValue: [],
		/*
			分紅標準, Ex:
			[
				{ amount: 300000, ratio: 0 },
				{ amount: 450000, ratio: 8 },
				{ amount: 600000, ratio: 9 },
				{ amount: 100000000, ratio: 20 },
			]
		*/
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
