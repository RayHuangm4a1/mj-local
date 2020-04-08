const Sequelize = require("sequelize");
const {
	ENUM_PAYMENT_ACCOUNT_STATUS,
	ENUM_PAYMENT_CLASS_ID,
} = require("../../lib/enum");

const schema = {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	paymentServiceProviderId: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: -1,
	},
	paymentServiceProviderName: {
		type: Sequelize.STRING,
		allowNull: true,
		defaultValue: null,
	},
	paymentClassId: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			isIn: [
				Object.values(ENUM_PAYMENT_CLASS_ID),
			],
		},
	},
	shanghao: {
		type: Sequelize.STRING,
		allowNull: true,
		defaultValue: null,
	},
	extraShanghao: {
		type: Sequelize.STRING,
		allowNull: true,
		defaultValue: null,
	},
	secretKey: {
		type: Sequelize.STRING,
		allowNull: true,
		defaultValue: null,
	},
	publicKey: {
		type: Sequelize.STRING,
		allowNull: true,
		defaultValue: null,
	},
	maxAmountPerStaffRemit: {
		type: Sequelize.DECIMAL(11, 4),
		allowNull: false,
		defaultValue: 0,
	},
	description: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	status: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			isIn: [
				Object.values(ENUM_PAYMENT_ACCOUNT_STATUS),
			],
		},
	},
};

const indexes = {
	indexes:[]
};

module.exports = {
	schema,
	indexes,
};
