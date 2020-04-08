const BankAccountModel = require("../models/bank-account");
const BankAccountLevelModel = require("../models/bank-account-level");
const fixturedBankAccounts = require("./data/bank-account");
const logger = require("ljit-logger")("debug");

async function createBankAccountsDocuments () {
	for (let i = 0; i < fixturedBankAccounts.length; i++) {
		const bankAccount = await BankAccountModel.create(fixturedBankAccounts[i]);

		const { levelIds } = fixturedBankAccounts[i];

		const preparedBankAccountLevels = levelIds.map(levelId => {
			return {
				levelId,
				bankAccountId: bankAccount.id,
			};
		});

		await BankAccountLevelModel.insertMany(preparedBankAccountLevels);
	}
}

async function init() {
	try {
		await createBankAccountsDocuments();
		logger.info("[mysql][bank-accounts] fixture done");
	} catch (error) {
		logger.info("[mysql][bank-accounts] fixture failed", error.stack);
	}
}

async function drop() {
	await BankAccountModel.getInstance().sync({ force: true });
	await BankAccountLevelModel.getInstance().sync({ force: true });
}

exports.init = init;
exports.drop = drop;
