const Sequelize = require("sequelize");

const schema = {
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	previousDeltaBonus: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	updatedDeltaBonus: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
};

const indexes = {
	updatedAt: false,
	indexes:[
		{
			unique: false,
			fields: ["createdAt", "id"],
		},
	],
};

module.exports = {
	schema,
	indexes,
};
