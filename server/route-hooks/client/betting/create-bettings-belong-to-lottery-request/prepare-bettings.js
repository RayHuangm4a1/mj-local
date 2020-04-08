const Decimal = require('decimal.js');
const {
	RequestValidationError,
	ForbiddenError,
} = require("ljit-error");
const BetcontentHelpers = require('ljit-betcontent-helper');
const {
	isWeizhi,
	isRebate,
	isAmountPerOrder,
} = require('ljit-validation').validators;
const {
	BETTING_PLAY_NOT_FOUND,
	BETTING_LOTTERY_CLASS_OFFLINE,
	BETTING_LOTTERY_OFFLINE,
	BETTING_PLAY_OFFLINE,
	BETTING_INVALID_BETCONTENT,
	BETTING_INVALID_WEIZHI,
	BETTING_INVALID_REBATE,
	BETTING_INVALID_AMOUNT_PER_ORDER,
	BETTING_IS_STOPPED,
} = require('../../../../lib/error/code');
const {
	ENUM_BETTING_TYPE,
	ENUM_BETTING_STATUS,
} = require('../../../../lib/enum');
const {
	getPrimaryPlaysByLotteryIdAndIds,
	getPrimaryCurrentDrawingByLotteryId,
	isDrawingStoppedByLotteryIdAndIssue,
} = require('../../../../services/lottery');
const {
	isPKBetting,
} = require("core-lib/pk-helper");

/**
  * @param {object} res.locals.helper - betting creation helper instance.
  */
module.exports = async function prepareBettings(req, res, next) {
	const requestId = req.header('X-Request-Id');
	const { lotteryId } = req.params;
	const { walletCode } = req.body;
	const { bonus: platformBonus } = res.locals.platform;
	const orders = res.locals.helper.getOrders();

	let issue;
	let closedAt;
	let openedAt;
	let plays;

	try {
		const playIds = orders.map(order => order.playId);

		[{ issue, closedAt, openedAt }, plays] = await Promise.all([
			getPrimaryCurrentDrawingByLotteryId(lotteryId, { requestId }),
			getPrimaryPlaysByLotteryIdAndIds(lotteryId, playIds, { requestId, mapped: true }),
		]);

		const isStopped = await isDrawingStoppedByLotteryIdAndIssue(lotteryId, issue);

		if (isStopped) {
			throw new ForbiddenError(BETTING_IS_STOPPED.MESSAGE, BETTING_IS_STOPPED.CODE);
		}
	} catch (error) {
		return next(error);
	}

	const { deltaBonus: userDeltaBonus } = res.locals.user;

	for (let i = 0, { length } = orders; i < length; i++) {
		const order = orders[i];
		const play = plays[order.playId];

		try {
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

			const amount = new Decimal(order.amountPerBet)
				.mul(order.multiple)
				.mul(count)
				.toNumber();

			if (!isAmountPerOrder(amount, global.PRODUCT)) {
				throw new RequestValidationError(BETTING_INVALID_AMOUNT_PER_ORDER.CODE, [], BETTING_INVALID_AMOUNT_PER_ORDER.MESSAGE);
			}

			// TODO 檢查betcontent是否有pk和非pk混合
			const isPK = isPKBetting({ play, betcontent: order.betcontent, count });

			res.locals.helper.setBetting(order.oid, {
				userId: req.user.id,
				username: req.user.username,
				walletCode,
				type: ENUM_BETTING_TYPE.STANDARD,
				traceId: -1,
				lotteryClassId: play.lotteryClass.id,
				lotteryId: play.lottery.id,
				lotteryName: play.lottery.name,
				playId: play.id,
				unit: play.unit,
				awards: play.awards,
				name: `${play.playCondition.name} ${play.name}`,
				bonus: platformBonus.max + userDeltaBonus,
				rebate: order.rebate,
				issue,
				opencode: null,
				reward: 0,
				amountPerBet: order.amountPerBet,
				multiple: order.multiple,
				count,
				amount,
				betcontent: order.betcontent,
				weizhi: order.weizhi,
				isPK,
				isTerminatedIfWin: false,
				status: ENUM_BETTING_STATUS.NEW,
				details: [],
				device: req.device.os,
				error: null,
				oid: order.oid,
				closedAt,
				openedAt,
				ip: req.device.ip,
			});
		} catch (error) {
			res.locals.helper.setBetting(order.oid, error.toJson());
			continue;
		}
	}

	const validBettings = res.locals.helper.getValidBettings();

	if (!validBettings.length) {
		const errors = res.locals.helper.getBettings();
		const error = new RequestValidationError(errors[0].code, [], errors[0].message);

		return next(error);
	}

	next();
};
