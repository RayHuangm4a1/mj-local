const { keyBy, mapWithKeys } = require("ljit-collection");
const {
	ForbiddenError,
} = require("ljit-error");
const {
	BETTING_NOT_CANCELABLE,
} = require("../error/code");

class TraceCreationHelper {
	constructor(orders) {
		this.hasError = false;
		this.orders = orders;
		this.traces = [];
		this.bettings = [];

		this.orders.forEach((order, index) => order.oid = index);
	}

	getOrders() {
		return this.orders;
	}

	getTraces() {
		return this.traces;
	}

	getRequiredIssueLength() {
		return this.orders.reduce((max, { multiples }) => {
			return Math.max(max, multiples.length);
		}, 0);
	}

	getValidTraces() {
		return this.traces.filter(TraceCreationHelper.isValidTrace);
	}

	hasInvalidTraces() {
		return this.hasError;
	}

	fillCreatedTraces(createdTraces) {
		createdTraces.forEach((trace) => {
			this.traces[trace.oid] = trace;
		});
	}

	setTrace(index, trace) {
		if (!TraceCreationHelper.isValidTrace(trace)) {
			this.hasError = true;
		}

		this.traces[index] = trace;
	}

	addBetting(betting) {
		this.bettings.push(betting);
	}

	getBettings() {
		return this.bettings;
	}

	static isValidTrace(trace) {
		return Number.isInteger(trace.oid);
	}

	static setTraceIdToBettings(traces, bettings) {
		const traceIdMapping = mapWithKeys(traces, "oid", "id");

		return bettings.map(betting => {
			betting.traceId = traceIdMapping[betting.traceOid];

			delete betting.traceOid;

			return betting;
		});
	}

	static fillCancelableError(ids, canceledBettings) {
		if (ids.length === canceledBettings.length) {
			return canceledBettings;
		}

		const mapping = keyBy(canceledBettings, "id");

		return ids.map(id => {
			if (mapping[id] !== undefined) {
				return mapping[id];
			} else {
				return new ForbiddenError(
					BETTING_NOT_CANCELABLE.MESSAGE,
					BETTING_NOT_CANCELABLE.CODE
				).toJson();
			}
		});
	}
}

module.exports = TraceCreationHelper;
