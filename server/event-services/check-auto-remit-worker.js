const {
	ForbiddenError,
} = require("ljit-error");
const emitter = require("../lib/event-emitter");
const {
	TOPIC_OF_APPLY_AUTO_REMIT_COMMAND,
	TOPIC_OF_AUTO_REMIT_REPLY_EVENT,
} = require("../lib/event-topics");
const {
	REPLY_OF_APPLY_AUTO_REMIT_COMMAND_SUCCESS,
	REPLY_OF_APPLY_AUTO_REMIT_COMMAND_SKIP,
	REPLY_OF_APPLY_AUTO_REMIT_COMMAND_FAILED,
} = require("../lib/event-reply-types");
const {
	getPlatform,
	PLATFORM_PROJECTIONS,
} = require("../services/platform.system");
const {
	getNewWithdrawalApplicationForms,
	getRemitableChannelByBankIdAndAmount,
	bulkUpdateWithdrawalApplicationForms,
	validateWithdrawalApplicationFormCouldAutoRemit,
	WITHDRAWAL_APPLICATION_FORM_PROJECTIONS,
} = require("../services/withdrawal.system");
const {
	ENUM_WITHDRAWAL_APPLICATION_FORM_STATUS,
} = require("../lib/enum");

function subscribe() {
	emitter.on(TOPIC_OF_APPLY_AUTO_REMIT_COMMAND, handleCheckAutoRemitCommand);
}

async function handleCheckAutoRemitCommand({ requestId }) {
	global.LOGGER.debug(requestId, TOPIC_OF_APPLY_AUTO_REMIT_COMMAND);

	let withdrawalApplicationForms = [];

	try {
		withdrawalApplicationForms = await getNewWithdrawalApplicationForms({
			projections: WITHDRAWAL_APPLICATION_FORM_PROJECTIONS.AUTO_WITHDRAWAL,
		});

		if (!withdrawalApplicationForms.length) {
			throw new RangeError("without withdrawal application form, skip.");
		}
	} catch (error) {
		if (error instanceof RangeError) {
			emitter.emit(TOPIC_OF_AUTO_REMIT_REPLY_EVENT, {
				requestId,
				type: REPLY_OF_APPLY_AUTO_REMIT_COMMAND_SKIP,
			});
		} else {
			global.LOGGER.error(requestId, TOPIC_OF_APPLY_AUTO_REMIT_COMMAND, error.formatStack());

			emitter.emit(TOPIC_OF_AUTO_REMIT_REPLY_EVENT, {
				requestId,
				type: REPLY_OF_APPLY_AUTO_REMIT_COMMAND_FAILED,
			});
		}

		return;
	}

	global.LOGGER.info(requestId, TOPIC_OF_APPLY_AUTO_REMIT_COMMAND, withdrawalApplicationForms.length, "withdrawal application forms");

	try {
		const platform = await getPlatform({
			projections: PLATFORM_PROJECTIONS.AUTO_REMIT,
		});

		let preparedWithdrawalApplicationForms = [];

		for (let i = 0, { length } = withdrawalApplicationForms; i < length; i++) {
			let withdrawalApplicationForm = withdrawalApplicationForms[i];

			try {
				await validateWithdrawalApplicationFormCouldAutoRemit({
					platform,
					withdrawalApplicationForm,
				});

				const { amount, bankId } = withdrawalApplicationForm;
				const remitChannel = await getRemitableChannelByBankIdAndAmount(bankId, amount);

				withdrawalApplicationForm.status = ENUM_WITHDRAWAL_APPLICATION_FORM_STATUS.READY;
				withdrawalApplicationForm.paymentClassId = remitChannel.paymentClassId;
				withdrawalApplicationForm.paymentAccountId = remitChannel.paymentAccountId;

				preparedWithdrawalApplicationForms.push(withdrawalApplicationForm);
			} catch (error) {
				if (error instanceof ForbiddenError && error.options.autoRemitRejectType !== undefined) {
					withdrawalApplicationForm.status = ENUM_WITHDRAWAL_APPLICATION_FORM_STATUS.AUTO_REMIT_REJECTED;
					withdrawalApplicationForm.autoRemitRejectType = error.options.autoRemitRejectType;

					preparedWithdrawalApplicationForms.push(withdrawalApplicationForm);
				} else {
					global.LOGGER.error(requestId, TOPIC_OF_APPLY_AUTO_REMIT_COMMAND, error.formatStack());
				}
			}
		}

		await bulkUpdateWithdrawalApplicationForms(preparedWithdrawalApplicationForms);

		emitter.emit(TOPIC_OF_AUTO_REMIT_REPLY_EVENT, {
			requestId,
			type: REPLY_OF_APPLY_AUTO_REMIT_COMMAND_SUCCESS,
		});
	} catch (error) {
		global.LOGGER.error(requestId, TOPIC_OF_APPLY_AUTO_REMIT_COMMAND, error.formatStack());

		emitter.emit(TOPIC_OF_AUTO_REMIT_REPLY_EVENT, {
			requestId,
			type: REPLY_OF_APPLY_AUTO_REMIT_COMMAND_FAILED,
		});
	}
}

module.exports = {
	subscribe,
};
