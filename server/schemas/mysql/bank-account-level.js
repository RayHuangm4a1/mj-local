const Sequelize = require("sequelize");

const schema = {
	bankAccountId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	levelId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
};

const indexes = {
	indexes:[
		{
			unique: true,
			fields: ["levelId", "bankAccountId"],
		},
	],
	freezeTableName: true,
};

module.exports = {
	schema,
	indexes,
};
