const emitter = require("../lib/event-emitter");
const {
	TOPIC_OF_DIVIDEND_TRANSFER_COMMAND,
	TOPIC_OF_DIVIDEND_TRANSFER_REPLY_EVENT,
} = require("../lib/event-topics");
const {
	REPLY_OF_DIVIDEND_TRANSFER_COMMAND_SUCCESS,
	REPLY_OF_DIVIDEND_TRANSFER_COMMAND_FAILED,
} = require("../lib/event-reply-types");
const {
	transferSeriesDividends,
} = require("../services/dividend.system");

function subscribe() {
	emitter.on(TOPIC_OF_DIVIDEND_TRANSFER_COMMAND, handleDividendTransferCommand);
}

async function handleDividendTransferCommand({ requestId }) {
	global.LOGGER.debug(requestId, TOPIC_OF_DIVIDEND_TRANSFER_COMMAND);

	try {
		const wallets = await transferSeriesDividends();

		global.LOGGER.info(requestId, TOPIC_OF_DIVIDEND_TRANSFER_COMMAND, `${wallets.length} dividends already transfered.`);

		emitter.emit(TOPIC_OF_DIVIDEND_TRANSFER_REPLY_EVENT, {
			requestId,
			type: REPLY_OF_DIVIDEND_TRANSFER_COMMAND_SUCCESS,
		});
	} catch (error) {
		global.LOGGER.warn(requestId, TOPIC_OF_DIVIDEND_TRANSFER_COMMAND, error.formatStack());

		emitter.emit(TOPIC_OF_DIVIDEND_TRANSFER_REPLY_EVENT, {
			requestId,
			type: REPLY_OF_DIVIDEND_TRANSFER_COMMAND_FAILED,
		});
	}
}

module.exports = {
	subscribe,
};
