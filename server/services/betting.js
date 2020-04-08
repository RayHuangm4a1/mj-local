const BettingStore = require("../stores/betting");
const TraceStore = require("../stores/trace");
const WalletStore = require("../stores/wallet");
const TransactionLogStore = require("../stores/transaction-log");
const {
	ForbiddenError,
} = require("ljit-error");
const { sumBy } = require("ljit-collection");
const TraceCreationHelper = require("../lib/trace/trace-creation-helper");
const {
	BETTING_INSUFFICIENT_BALANCE,
	BETTING_NOT_CANCELABLE,
	TRACE_NOT_FOUND,
	WALLET_NOT_FOUND,
} = require("../lib/error/code");
const {
	ENUM_BETTING_TYPE,
} = require("../lib/enum");
const {
	generateBettingTransactionLogs,
	generateTraceTransactionLogs,
	generateCanceledBettingTransactionLogs,
} = require("../lib/transaction-log");

async function createBettingsByUserIdAndWalletCode(userId, walletCode, preparedBettings) {
	const txn = BettingStore.getTransaction();

	try {
		const amount = sumBy(preparedBettings, "amount");

		const operations = async (transaction) => {
			const wallet = await WalletStore.decreaseUsedWalletBalanceByUserIdAndWalletCode(userId, walletCode, amount, {
				transaction,
				projections: WalletStore.MIN_PROJECTIONS,
			});

			if (wallet === null) {
				throw new ForbiddenError(
					BETTING_INSUFFICIENT_BALANCE.MESSAGE,
					BETTING_INSUFFICIENT_BALANCE.CODE
				);
			}

			const bettings = await BettingStore.createBettings(preparedBettings, { transaction });

			const preparedTransactionLogs = generateBettingTransactionLogs(wallet, bettings);

			await TransactionLogStore.createTransactionLogs(preparedTransactionLogs, { transaction });

			return {
				wallet,
				bettings,
			};
		};

		await txn.startTransaction(operations);

		return await txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();

		throw error;
	}
}

async function createTracesAndBettingsByUserIdAndWalletCode(userId, walletCode, preparedTraces, incompletedBettings) {
	const txn = TraceStore.getTransaction();

	try {
		const amount = sumBy(preparedTraces, "amount");

		const operations = async (transaction) => {
			const wallet = await WalletStore.decreaseUsedWalletBalanceByUserIdAndWalletCode(userId, walletCode, amount, {
				transaction,
				projections: WalletStore.MIN_PROJECTIONS,
			});

			if (wallet === null) {
				throw new ForbiddenError(
					BETTING_INSUFFICIENT_BALANCE.MESSAGE,
					BETTING_INSUFFICIENT_BALANCE.CODE
				);
			}

			const traces = await TraceStore.createTraces(preparedTraces, { transaction });

			const preparedBettings = TraceCreationHelper.setTraceIdToBettings(traces, incompletedBettings);

			await BettingStore.createBettings(preparedBettings, { transaction });

			const preparedTransactionLogs = generateTraceTransactionLogs(wallet, traces);

			await TransactionLogStore.createTransactionLogs(preparedTransactionLogs, { transaction });

			return {
				wallet,
				traces,
			};
		};

		await txn.startTransaction(operations);

		return await txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();

		throw error;
	}
}

async function cancelBettingByIdAndUserId(bettingId, userId, canceledType) {
	const txn = BettingStore.getTransaction();

	try {
		const operations = async (transaction) => {
			const betting = await BettingStore.cancelBettingIfCancelableByIdAndUserId(bettingId, userId, canceledType, { transaction });

			if (betting === null) {
				throw new ForbiddenError(
					BETTING_NOT_CANCELABLE.MESSAGE,
					BETTING_NOT_CANCELABLE.CODE
				);
			}

			if (betting.type === ENUM_BETTING_TYPE.TRACE) {
				const result = await TraceStore.increaseNumOfFinishedIssuesById(betting.traceId, 1, { transaction });

				if (result === null || result.affectedRows !== 1) {
					throw new ForbiddenError(
						BETTING_NOT_CANCELABLE.MESSAGE,
						BETTING_NOT_CANCELABLE.CODE
					);
				}
			}

			const wallet = await WalletStore.increaseWalletBalanceByUserIdAndWalletCode(betting.userId, betting.walletCode, betting.amount, {
				transaction,
				projections: WalletStore.MIN_PROJECTIONS,
			});

			if (wallet === null) {
				throw new ForbiddenError(
					WALLET_NOT_FOUND.MESSAGE,
					WALLET_NOT_FOUND.CODE
				);
			}

			const preparedTransactionLogs = generateCanceledBettingTransactionLogs(wallet, [betting]);

			await TransactionLogStore.createTransactionLogs(preparedTransactionLogs, { transaction });

			return {
				wallet,
				betting,
			};
		};

		await txn.startTransaction(operations);

		return await txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();

		throw error;
	}
}

async function cancelBettingsByTraceIdBettingIdsAndUserId(traceId, bettingIds, userId, canceledType) {
	const txn = BettingStore.getTransaction();

	try {
		const operations = async (transaction) => {
			const bettings = await BettingStore.cancelBettingsIfCancelableWithinIdsTraceIdAndUserId(bettingIds, traceId, userId, canceledType, { transaction });

			if (!bettings.length) {
				throw new ForbiddenError(
					BETTING_NOT_CANCELABLE.MESSAGE,
					BETTING_NOT_CANCELABLE.CODE
				);
			}

			const amount = sumBy(bettings, "amount");

			const wallet = await WalletStore.increaseWalletBalanceByUserIdAndWalletCode(userId, bettings[0].walletCode, amount, {
				transaction,
				projections: WalletStore.MIN_PROJECTIONS,
			});

			if (wallet === null) {
				throw new ForbiddenError(
					WALLET_NOT_FOUND.MESSAGE,
					WALLET_NOT_FOUND.CODE
				);
			}

			const result = await TraceStore.increaseNumOfFinishedIssuesById(traceId, bettings.length, { transaction });

			if (result === null || result.affectedRows !== 1) {
				throw new ForbiddenError(
					TRACE_NOT_FOUND.MESSAGE,
					TRACE_NOT_FOUND.CODE
				);
			}

			const preparedTransactionLogs = generateCanceledBettingTransactionLogs(wallet, bettings);

			await TransactionLogStore.createTransactionLogs(preparedTransactionLogs, { transaction });

			return {
				wallet,
				bettings,
			};
		};

		await txn.startTransaction(operations);

		return await txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();

		throw error;
	}
}

module.exports = {
	createBettingsByUserIdAndWalletCode,
	createTracesAndBettingsByUserIdAndWalletCode,
	cancelBettingByIdAndUserId,
	cancelBettingsByTraceIdBettingIdsAndUserId,

	getBettingByIdAndUserId: BettingStore.getBettingByIdAndUserId,
	getBettingsByUserIdDatesAndPagination: BettingStore.getBettingsByUserIdDatesAndPagination,
	getBettingsByUserIdTraceIdAndPagination: BettingStore.getBettingsByUserIdTraceIdAndPagination,
	getBettingsWithinUserIdsDatesAndPagination: BettingStore.getBettingsWithinUserIdsDatesAndPagination,
	getTracesByUserIdDatesAndPagination: TraceStore.getTracesByUserIdDatesAndPagination,
	getTraceByIdAndUserId: TraceStore.getTraceByIdAndUserId,
	getTracesWithinUserIdsDatesAndPagination: TraceStore.getTracesWithinUserIdsDatesAndPagination,
	getWonBettingsGreaterThanUpdatedAtByUserId: BettingStore.getWonBettingsGreaterThanUpdatedAtByUserId,

	BETTING_PROJECTIONS: {
		IGNORE_ANCESTORS_AND_AWARD: BettingStore.IGNORE_ANCESTORS_AND_AWARD_PROJECTIONS,
		DESCENDANT_TRACE_BETTINGS: BettingStore.DESCENDANT_TRACE_BETTINGS_REQUIRE_PROJECTIONS,
		WON_NOTIFICATION: BettingStore.WON_NOTIFICATION_PROJECTIONS,
	},
	TRACE_PROJECTIONS: {
		TRACES: TraceStore.TRACES_REQUIRED_PROJECTIONS,
		TRACE: TraceStore.TRACE_REQUIRED_PROJECTIONS,
	}
};
