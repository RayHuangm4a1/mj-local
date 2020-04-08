const emitter = require("../lib/event-emitter");
const {
	TOPIC_OF_REMIT_USING_THIRD_PARTY_COMMAND,
	TOPIC_OF_AUTO_REMIT_REPLY_EVENT,
} = require("../lib/event-topics");
const {
	REPLY_OF_REMIT_USING_THIRD_PARTY_COMMAND_SUCCESS,
	REPLY_OF_REMIT_USING_THIRD_PARTY_COMMAND_SKIP,
	REPLY_OF_REMIT_USING_THIRD_PARTY_COMMAND_FAILED,
} = require("../lib/event-reply-types");
const {
	ENUM_PAYMENT_CLASS_ID,
} = require("../lib/enum");
const {
	getReadyWithdrawalApplicationFormsWithPaymentAccountByPaymentClassId,
	WITHDRAWAL_APPLICATION_FORM_PROJECTIONS,
} = require("../services/withdrawal.system");

function subscribe() {
	emitter.on(TOPIC_OF_REMIT_USING_THIRD_PARTY_COMMAND, handleRemitUsingThirdPartyCommand);
}

async function handleRemitUsingThirdPartyCommand({ requestId }) {
	global.LOGGER.debug(requestId, TOPIC_OF_REMIT_USING_THIRD_PARTY_COMMAND);

	let withdrawalApplicationForms = [];

	try {
		withdrawalApplicationForms = await getReadyWithdrawalApplicationFormsWithPaymentAccountByPaymentClassId(ENUM_PAYMENT_CLASS_ID.THIRD_PARTY, {
			projections: WITHDRAWAL_APPLICATION_FORM_PROJECTIONS.REMIT,
		});

		if (!withdrawalApplicationForms.length) {
			throw new RangeError("without withdrawal application form, skip.");
		}
	} catch (error) {
		if (error instanceof RangeError) {
			emitter.emit(TOPIC_OF_AUTO_REMIT_REPLY_EVENT, {
				requestId,
				type: REPLY_OF_REMIT_USING_THIRD_PARTY_COMMAND_SKIP,
			});
		} else {
			global.LOGGER.error(requestId, TOPIC_OF_REMIT_USING_THIRD_PARTY_COMMAND, error.formatStack());

			emitter.emit(TOPIC_OF_AUTO_REMIT_REPLY_EVENT, {
				requestId,
				type: REPLY_OF_REMIT_USING_THIRD_PARTY_COMMAND_FAILED,
			});
		}

		return;
	}

	global.LOGGER.info(requestId, TOPIC_OF_REMIT_USING_THIRD_PARTY_COMMAND, withdrawalApplicationForms.length, "withdrawal application forms");

	try {
		for (let i = 0, { length } = withdrawalApplicationForms; i < length; i++) {
			const withdrawalApplicationForm = withdrawalApplicationForms[i];

			console.log(withdrawalApplicationForm.paymentAccount.id);

			/*
				mj-payment-services，提供id ，用法:
					const PaymentServices = require("mj-payment-services-sdk");
					const paymentService = PaymentServices.get(paymentServiceProviderId);
					if (withdrawalApplicationForm.amount <= remitChannel.maxAmountPerStaffRemit) {
						// 打 api 到 fin service
						await paymentService.send(remitChannel = {
							shanghao,
							extraShanghao,
							secretKey,
							publicKey,
						});
					} else {
						// 超過要怎麼處理？
					}
				mj-payment-services-sdk 寫好的SDK，供所有人用來打出款api的演算法
				如何取得paymentServiceProviderId?
					getPaymentServiceProviders(), 從service去大後台拿所有可以用的providers，大後台可以動態開關payment service providers
			*/
		}

		emitter.emit(TOPIC_OF_AUTO_REMIT_REPLY_EVENT, {
			requestId,
			type: REPLY_OF_REMIT_USING_THIRD_PARTY_COMMAND_SUCCESS,
		});
	} catch (error) {
		global.LOGGER.error(requestId, TOPIC_OF_REMIT_USING_THIRD_PARTY_COMMAND, error.formatStack());

		emitter.emit(TOPIC_OF_AUTO_REMIT_REPLY_EVENT, {
			requestId,
			type: REPLY_OF_REMIT_USING_THIRD_PARTY_COMMAND_FAILED,
		});
	}


}

module.exports = {
	subscribe,
};
