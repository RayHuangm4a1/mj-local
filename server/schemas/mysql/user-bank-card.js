const Sequelize = require("sequelize");
const {
	ENUM_BANK_CARD_STATUS,
} = require("../../lib/enum");

const schema = {
	userId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		allowNull: false,
	},
	bankCardId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		allowNull: false,
	},
	numOfBindings: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 1,
	},
	withdrawableAt: {
		type: Sequelize.DATE,
		allowNull: false,
	},
	activatedAt: {
		type: Sequelize.DATE,
		allowNull: false,
	},
	status: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			isIn: [
				Object.values(ENUM_BANK_CARD_STATUS),
			],
		},
	},
};

const indexes = {
	indexes:[
		{
			unique: false,
			fields: ["bankCardId", "status"],
		},
	],
	freezeTableName: true,
};

module.exports = {
	schema,
	indexes,
};
