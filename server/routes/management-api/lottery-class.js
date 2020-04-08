const router = require("express").Router();

const {
	beforeUpdateLotteryClassStatusRequest,
	afterUpdateLotteryClassStatusRequest,
} = require('../../route-hooks/management/lottery-class');
const {
	beforeGetLotteriesBelongToLotteryClassRequest,
	beforeUpdateTagsAndOrderingOfLotteriesRequest,
	afterUpdateTagsAndOrderingOfLotteriesRequest,
} = require('../../route-hooks/management/lottery');

const {
	handleGetLotteryClassesRequest,
	handleUpdateLotteryClassStatusRequest,
} = require("../../route-handlers/management/lottery-class");
const {
	handleGetLotteriesBelongToLotteryClassRequest,
	handleUpdateTagsAndOrderingsOfLotteriesRequest,
} = require("../../route-handlers/management/lottery");

router.get("/", handleGetLotteryClassesRequest);
router.get("/id=:lotteryClassId/lotteries",
	beforeGetLotteriesBelongToLotteryClassRequest,
	handleGetLotteriesBelongToLotteryClassRequest
);
router.put("/id=:lotteryClassId/status",
	beforeUpdateLotteryClassStatusRequest,
	handleUpdateLotteryClassStatusRequest,
	afterUpdateLotteryClassStatusRequest
);
router.patch("/id=:lotteryClassId/lotteries",
	beforeUpdateTagsAndOrderingOfLotteriesRequest,
	handleUpdateTagsAndOrderingsOfLotteriesRequest,
	afterUpdateTagsAndOrderingOfLotteriesRequest
);

module.exports = router;
