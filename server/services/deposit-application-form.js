const {
	ForbiddenError,
} = require("ljit-error");
const DepositApplicationFormStore = require('../stores/deposit-application-form');
const DepositAmountStore = require('../stores/deposit-amount');
const {
	getDepositFee,
	composeFullDepositAmount,
} = require('../lib/deposit');
const {
	getDateAfterNHours,
} = require('../lib/date');
const {
	WITHOUT_AVAILABLE_DEPOSIT_AMOUNT,
} = require("../lib/error/code");
const MAX_LIFETIME_OF_NEW_DEPOSIT_APPLICATION_FORM_IN_HOURS = 2;

// TODO: There is a deadlock issue in the process, need to enhance it.
async function createDepositApplicationForm(row) {
	const txn = DepositApplicationFormStore.getTransaction();
	const { userId, amount, percentageOfFee } = row;

	try {
		const operations = async (transaction) => {
			const forms = await DepositApplicationFormStore.getPreviousDepositApplicationFormsByUserId(userId, {
				projections: DepositApplicationFormStore.DEPOSIT_AMOUNT_ID_ONLY_PROJECTIONS,
				transaction,
				lock: transaction.LOCK.UPDATE,
			});

			if (forms.length) {
				const ids = forms.map(({ id }) => id);
				const depositAmountIds = forms.map(({ depositAmountId }) => depositAmountId);

				await DepositAmountStore.releaseDepositAmountsWithinIds(depositAmountIds, { transaction });
				await DepositApplicationFormStore.cancelPreviousDepositApplicationFormsWithinIdsAndUserId(ids, userId, { transaction });
			}

			const depositAmount = await DepositAmountStore.createDepositAmountByIntegerDepositAmount(amount, { transaction });

			if (depositAmount === null) {
				throw new ForbiddenError(WITHOUT_AVAILABLE_DEPOSIT_AMOUNT.MESSAGE, WITHOUT_AVAILABLE_DEPOSIT_AMOUNT.CODE);
			}

			const { id, integer, fraction } = depositAmount;

			row.depositAmountId = id;
			row.amount = composeFullDepositAmount({ integer, fraction });
			row.fee = getDepositFee({ amount: row.amount, percentageOfFee });

			return DepositApplicationFormStore.createDepositApplicationForm(row, { transaction });
		};

		await txn.startTransaction(operations);

		return await txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();

		throw error;
	}
}

function generateExpiredAtOfDepositApplicationForm() {
	return getDateAfterNHours(MAX_LIFETIME_OF_NEW_DEPOSIT_APPLICATION_FORM_IN_HOURS);
}

module.exports = {
	createDepositApplicationForm,
	generateExpiredAtOfDepositApplicationForm,
};
