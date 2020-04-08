const emitter = require("../lib/event-emitter");
const {
	TOPIC_OF_TERMINATE_TRACES_COMMAND,
	TOPIC_OF_OPEN_BETTINGS_REPLY_EVENT,
} = require("../lib/event-topics");
const {
	REPLY_OF_TERMINATE_TRACES_COMMAND_SKIP,
	REPLY_OF_TERMINATE_TRACES_COMMAND_SUCCESS,
	REPLY_OF_TERMINATE_TRACES_COMMAND_FAILED,
} = require("../lib/event-reply-types");
const {
	TRACE_PROJECTIONS,

	getTerminatingTraces,
	terminateTraceByIdUserIdAndWalletCode,
} = require("../services/betting.system");

function subscribe() {
	emitter.on(TOPIC_OF_TERMINATE_TRACES_COMMAND, handleTerminateTracesCommand);
}

async function handleTerminateTracesCommand({ requestId }) {
	global.LOGGER.debug(requestId, TOPIC_OF_TERMINATE_TRACES_COMMAND);

	let traces = [];

	try {
		traces = await getTerminatingTraces({ projections: TRACE_PROJECTIONS.TERMINATE });

		if (!traces.length) {
			throw new RangeError("without terminating traces, skip.");
		}
	} catch (error) {
		if (error instanceof RangeError) {
			emitter.emit(TOPIC_OF_OPEN_BETTINGS_REPLY_EVENT, {
				requestId,
				type: REPLY_OF_TERMINATE_TRACES_COMMAND_SKIP,
			});
		} else {
			global.LOGGER.error(requestId, TOPIC_OF_TERMINATE_TRACES_COMMAND, error.formatStack());

			emitter.emit(TOPIC_OF_OPEN_BETTINGS_REPLY_EVENT, {
				requestId,
				type: REPLY_OF_TERMINATE_TRACES_COMMAND_FAILED,
			});
		}

		return;
	}

	global.LOGGER.info(requestId, TOPIC_OF_TERMINATE_TRACES_COMMAND, traces.length, "terminating traces");

	try {
		for (let i = 0, { length } = traces; i < length; i++) {
			const { id, userId, walletCode } = traces[i];

			try {
				await terminateTraceByIdUserIdAndWalletCode(id, userId, walletCode);
			} catch (error) {
				global.LOGGER.error(error.formatStack());
			}
		}

		emitter.emit(TOPIC_OF_OPEN_BETTINGS_REPLY_EVENT, {
			requestId,
			type: REPLY_OF_TERMINATE_TRACES_COMMAND_SUCCESS,
		});
	} catch (error) {
		global.LOGGER.error(requestId, TOPIC_OF_TERMINATE_TRACES_COMMAND, error.formatStack());

		emitter.emit(TOPIC_OF_OPEN_BETTINGS_REPLY_EVENT, {
			requestId,
			type: REPLY_OF_TERMINATE_TRACES_COMMAND_FAILED,
		});
	}
}

module.exports = {
	subscribe,
};
