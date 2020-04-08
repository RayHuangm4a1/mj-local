const Sequelize = require("sequelize");
const {
	ENUM_DEPOSIT_AMOUNT_STATUS,
} = require("../../lib/enum");

const schema = {
	integer: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	fraction: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			min: 1,
			max: 99,
		},
	},
	status: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			isIn: [
				Object.values(ENUM_DEPOSIT_AMOUNT_STATUS),
			],
		},
	},
};

const indexes = {
	indexes:[
		{
			unique: true,
			fields: ["integer", "fraction"],
		},
		{
			unique: false,
			fields: ["integer", "status", "fraction"],
		}
	]
};

module.exports = {
	schema,
	indexes,
};
