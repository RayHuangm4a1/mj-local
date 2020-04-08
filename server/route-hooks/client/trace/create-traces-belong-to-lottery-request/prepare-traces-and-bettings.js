const Decimal = require('decimal.js');
const {
	RequestValidationError,
	ForbiddenError,
} = require("ljit-error");
const {
	TRACE_INVALID_AMOUNT_PER_BETTING,
	BETTING_PLAY_NOT_FOUND,
	BETTING_LOTTERY_CLASS_OFFLINE,
	BETTING_LOTTERY_OFFLINE,
	BETTING_PLAY_OFFLINE,
	BETTING_INVALID_BETCONTENT,
	BETTING_INVALID_WEIZHI,
	BETTING_INVALID_REBATE,
	EXCEEDED_MAX_ISSUES_PER_TRACE,
	BETTING_IS_STOPPED,
} = require('../../../../lib/error/code');
const BetcontentHelpers = require('ljit-betcontent-helper');
const {
	isWeizhi,
	isRebate,
	isAmountPerOrder,
} = require('ljit-validation').validators;
const {
	getPrimaryPlaysByLotteryIdAndIds,
	getPrimaryGreaterThanEqualCurrentDrawingsByLotteryId,
	isDrawingStoppedByLotteryIdAndIssue,
} = require("../../../../services/lottery");
const {
	ENUM_BETTING_TYPE,
	ENUM_TRACE_STATUS,
	ENUM_BETTING_STATUS,
} = require("../../../../lib/enum");
const {
	isPKBetting,
} = require("core-lib/pk-helper");

/**
  * @param {object} res.locals.helper - trace creation helper instance.
  */
module.exports = async function prepareTracesAndBettings(req, res, next) {
	const requestId = req.header("X-Request-Id");
	const { lotteryId } = req.params;
	const { walletCode } = req.body;
	const { id: userId, username } = req.user;
	const {
		bonus: platformBonus,
	} = res.locals.platform;
	const { maxIssuesPerTrace } = res.locals.platform.bettingPolicy;
	const orders = res.locals.helper.getOrders();
	const requiredIssueLength = res.locals.helper.getRequiredIssueLength();

	let plays, futureDrawings;

	try {
		const playIds = orders.map(order => order.playId);

		[plays, futureDrawings] = await Promise.all([
			getPrimaryPlaysByLotteryIdAndIds(lotteryId, playIds, { requestId, mapped: true }),
			getPrimaryGreaterThanEqualCurrentDrawingsByLotteryId(lotteryId, {
				limit: requiredIssueLength,
				requestId
			})
		]);

		const isStopped = await isDrawingStoppedByLotteryIdAndIssue(lotteryId, futureDrawings[0].issue);

		if (isStopped) {
			throw new ForbiddenError(BETTING_IS_STOPPED.MESSAGE, BETTING_IS_STOPPED.CODE);
		}
	} catch (error) {
		return next(error);
	}

	const { deltaBonus: userDeltaBonus } = res.locals.user;

	for (let i = 0, { length } = orders; i < length; i++) {
		const order = orders[i];

		try {
			if (order.multiples.length > maxIssuesPerTrace) {
				const message = EXCEEDED_MAX_ISSUES_PER_TRACE.MESSAGE.replace(/{AMOUNT}/, maxIssuesPerTrace);

				throw new RequestValidationError(EXCEEDED_MAX_ISSUES_PER_TRACE.CODE, [], message);
			}

			const play = plays[order.playId];

			if (play === undefined) {
				throw new RequestValidationError(BETTING_PLAY_NOT_FOUND.CODE, [], BETTING_PLAY_NOT_FOUND.MESSAGE);
			}

			const { lotteryClass, lottery } = play;

			if (lotteryClass.status !== 'online') {
				throw new RequestValidationError(BETTING_LOTTERY_CLASS_OFFLINE.CODE, [], BETTING_LOTTERY_CLASS_OFFLINE.MESSAGE);
			}
			if (lottery.status !== 'online') {
				throw new RequestValidationError(BETTING_LOTTERY_OFFLINE.CODE, [], BETTING_LOTTERY_OFFLINE.MESSAGE);
			}
			if (play.status !== 'online') {
				throw new RequestValidationError(BETTING_PLAY_OFFLINE.CODE, [], BETTING_PLAY_OFFLINE.MESSAGE);
			}

			const betcontentHelper = BetcontentHelpers.getHelper(lotteryClass.id, lottery.id, play.id);

			if (!betcontentHelper.isValidFormat(order.betcontent)) {
				throw new RequestValidationError(BETTING_INVALID_BETCONTENT.CODE, [], BETTING_INVALID_BETCONTENT.MESSAGE);
			}
			if (!isWeizhi(order.weizhi, lotteryClass.code)) {
				throw new RequestValidationError(BETTING_INVALID_WEIZHI.CODE, [], BETTING_INVALID_WEIZHI.MESSAGE);
			}
			if (!isRebate(order.rebate, platformBonus.max, platformBonus.min, userDeltaBonus)) {
				throw new RequestValidationError(BETTING_INVALID_REBATE.CODE, [], BETTING_INVALID_REBATE.MESSAGE);
			}

			order.betcontent = betcontentHelper.normalize(order.betcontent);
			const count = betcontentHelper.count(order.betcontent, { weizhi: order.weizhi });

			if (count < 1) {
				throw new RequestValidationError(BETTING_INVALID_BETCONTENT.CODE, [], BETTING_INVALID_BETCONTENT.MESSAGE);
			}

			// TODO 檢查betcontent是否有pk和非pk混合
			const isPK = isPKBetting({ play, betcontent: order.betcontent, count });
			const amounts = calculateEachIssueAmounts(order.multiples, count, order.amountPerBet);

			if (!isValidAmountOfEachIssue(amounts)) {
				throw new RequestValidationError(TRACE_INVALID_AMOUNT_PER_BETTING.CODE, [], TRACE_INVALID_AMOUNT_PER_BETTING.MESSAGE);
			}

			const totalAmount = sumOfEachIssueAmount(amounts);

			res.locals.helper.setTrace(order.oid, {
				userId,
				username,
				walletCode,
				lotteryClassId: play.lotteryClass.id,
				lotteryId: play.lottery.id,
				lotteryName: play.lottery.name,
				playId: play.id,
				name: `${play.playCondition.name} ${play.name}`,
				isTerminatedIfWin: order.isTerminatedIfWin,
				firstIssue: futureDrawings[0].issue,
				latestIssue: futureDrawings[order.multiples.length - 1].issue,
				numOfIssues: order.multiples.length,
				numOfFinishedIssues: 0,
				rebate: order.rebate,
				amountPerBet: order.amountPerBet,
				count,
				amount: totalAmount,
				betcontent: order.betcontent,
				weizhi: order.weizhi,
				isPK,
				status: ENUM_TRACE_STATUS.NEW,
				device: req.device.os,
				oid: order.oid,
			});

			order.multiples.forEach((multiple, index) => {
				res.locals.helper.addBetting({
					userId,
					username,
					walletCode,
					type: ENUM_BETTING_TYPE.TRACE,
					traceId: null,
					lotteryClassId: play.lotteryClass.id,
					lotteryId: play.lottery.id,
					lotteryName: play.lottery.name,
					playId: play.id,
					unit: play.unit,
					awards: play.awards,
					name: `${play.playCondition.name} ${play.name}`,
					bonus: platformBonus.max + userDeltaBonus,
					rebate: order.rebate,
					issue: futureDrawings[index].issue,
					opencode: null,
					reward: 0,
					amountPerBet: order.amountPerBet,
					multiple,
					count,
					amount: amounts[index],
					betcontent: order.betcontent,
					weizhi: order.weizhi,
					isPK,
					isTerminatedIfWin: order.isTerminatedIfWin,
					status: ENUM_BETTING_STATUS.NEW,
					details: [],
					device: req.device.os,
					error: null,
					oid: index,
					traceOid: order.oid,
					closedAt: futureDrawings[index].closedAt,
					openedAt: futureDrawings[index].openedAt,
					ip: req.device.ip,
				});
			});
		} catch (error) {
			res.locals.helper.setTrace(order.oid, error.toJson());
			continue;
		}
	}

	const validTraces = res.locals.helper.getValidTraces();

	if (!validTraces.length) {
		const errors = res.locals.helper.getTraces();
		const error = new RequestValidationError(errors[0].code, [], errors[0].message);

		return next(error);
	}

	next();
};


function calculateEachIssueAmounts(multiples, count, amountPerBet) {
	return multiples.map((multiple) => {
		return new Decimal(multiple)
			.mul(count)
			.mul(amountPerBet)
			.toNumber();
	});
}

function isValidAmountOfEachIssue(amounts) {
	return amounts.every((amount) => isAmountPerOrder(amount, global.PRODUCT));
}

function sumOfEachIssueAmount(amounts) {
	return amounts.reduce((accumulator, amount) => {
		return new Decimal(accumulator)
			.add(amount)
			.toNumber();
	}, 0);
}
