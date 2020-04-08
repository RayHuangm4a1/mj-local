const Sequelize = require("sequelize");
const {
	ENUM_WITHDRAWAL_APPLICATION_FORM_AUTO_REMIT_REJECT_TYPE,
	ENUM_WITHDRAWAL_APPLICATION_FORM_STATUS,
	ENUM_PAYMENT_CLASS_ID,
} = require("../../lib/enum");

const schema = {
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	username: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	userLevelId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	walletCode: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	operatorId: {
		type: Sequelize.INTEGER,
		allowNull: true,
	},
	operatorUsername: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	bankId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	bankName: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	branchName: {
		type: Sequelize.STRING,
		// TODO 要修改新增提款單，讓這邊不能是null，要跟pm確認是不是需要分行名稱
		allowNull: true,
	},
	bankCardId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	amount: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	feeByPlatform: {
		type: Sequelize.DECIMAL(11, 4),
		allowNull: true,
	},
	feeByBank: {
		type: Sequelize.DECIMAL(11, 4),
		allowNull: true,
	},
	paymentClassId: {
		type: Sequelize.INTEGER,
		allowNull: true,
		validate: {
			isIn: [
				Object.values(ENUM_PAYMENT_CLASS_ID),
			],
		},
	},
	paymentAccountId: {
		type: Sequelize.INTEGER,
		allowNull: true,
		defaultValue: -1,
		// 0: 手動匯款
	},
	remitVoucherUrl: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	autoRemitRejectType: {
		type: Sequelize.INTEGER,
		allowNull: true,
		validate: {
			isIn: [
				Object.values(ENUM_WITHDRAWAL_APPLICATION_FORM_AUTO_REMIT_REJECT_TYPE),
			],
		},
	},
	description: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	remitedAt: {
		type: Sequelize.DATE,
		allowNull: true,
		/*
			1. 自動出款 -> 系統出款時間
			2. 非自動出款 -> 手動出款時間
			3. 非自動出款 -> 自動出款時間
		*/
	},
	operatorRemitChannelSelectedAt: {
		type: Sequelize.DATE,
		allowNull: true,
		/*
			非自動出款 -> 手動操作時間
		*/
	},
	isStaffProcessing: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
	status: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			isIn: [
				Object.values(ENUM_WITHDRAWAL_APPLICATION_FORM_STATUS),
			],
		},
	},
};

const indexes = {
	indexes:[
		{
			unique: false,
			fields: ["status", "createdAt"],
		},
		{
			unique: false,
			fields: ["userId", "status"],
		},
		{
			unique: false,
			fields: ["paymentClassId", "status", "createdAt"],
		},
		{
			unique: false,
			fields: ["userId", "bankCardId"],
		},
	]
};

module.exports = {
	schema,
	indexes,
};
