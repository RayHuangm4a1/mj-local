const {
	findOne,
	upsert,
	getTransaction,
} = require("../models/user-dividend-setting");
const {
	ENUM_DIVIDEND_TYPE,
} = require("../lib/enum");

function upsertSelfDividendSettingsByUserIdAndDividendSettings(userId, dividendSettings, { transaction } = {}) {
	return upsert({
		userId,
		type: ENUM_DIVIDEND_TYPE.SELF,
		dividendSettings
	}, {
		fields: ['dividendSettings', "updatedAt"],
		transaction,
	});
}

function upsertTemplateDividendSettingsByUserIdAndDividendSettings(userId, dividendSettings) {
	return upsert({
		userId,
		type: ENUM_DIVIDEND_TYPE.TEMPLATE,
		dividendSettings
	}, {
		fields: ['dividendSettings', "updatedAt"],
	});
}

async function getUserDividendSettingsByUserIdAndType(userId, type, {
	lock,
	transaction,
} = {}) {
	const result = await findOne({
		where: {
			userId,
			type,
		},
		lock,
		transaction,
	});

	if (result === null) {
		return [];
	}

	return result.dividendSettings;
}

module.exports = {
	upsertSelfDividendSettingsByUserIdAndDividendSettings,
	getTransaction,
	getUserDividendSettingsByUserIdAndType,
	upsertTemplateDividendSettingsByUserIdAndDividendSettings,
};
