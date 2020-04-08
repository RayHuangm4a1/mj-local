const express = require("express");
const router = express.Router();

const { handleGetLotteriesRequest } = require("../../route-handlers/client/lottery");

const { beforeGetPlaysBelongToLotteryRequest } = require("../../route-hooks/client/play");
const { handleGetPlaysBelongToLotteryRequest } = require('../../route-handlers/client/play');

const { beforeGetPlayConditionsBelongToLotteryRequest } = require("../../route-hooks/client/play-condition");
const { handleGetPlayConditionsBelongToLotteryRequest } = require("../../route-handlers/client/play-condition");

const {
	beforeIsDrawingExistedBelongToLotteryRequest,
	beforeIsNextDrawingOpeningBelongToLotteryRequest,
	beforeGetPreviousAndCurrentDrawingsBelongToLotteryRequest,
	beforeGetDrawingsBelongToLotteryRequest,
} = require("../../route-hooks/client/drawing");
const {
	handleIsDrawingExistedBelongToLotteryRequest,
	handleGetDrawingsBelongToLotteryRequest,
	handleGetPreviousAndCurrentDrawingsBelongToLotteryRequest,
	handleIsNextDrawingOpeningBelongToLotteryRequest,
} = require("../../route-handlers/client/drawing");

const { beforeCreateBettingsBelongToLotteryRequest } = require("../../route-hooks/client/betting");
const { handleCreateBettingsBelongToLotteryRequest } = require("../../route-handlers/client/betting");

const { beforeCreateTracesBelongToLotteryRequest } = require("../../route-hooks/client/trace");
const { handleCreateTracesBelongToLotteryRequest } = require("../../route-handlers/client/trace");


router.get("/", handleGetLotteriesRequest);

router.get("/id=:lotteryId/plays",
	beforeGetPlaysBelongToLotteryRequest,
	handleGetPlaysBelongToLotteryRequest,
);
router.get("/id=:lotteryId/play-conditions",
	beforeGetPlayConditionsBelongToLotteryRequest,
	handleGetPlayConditionsBelongToLotteryRequest
);

router.head("/id=:lotteryId/drawings/issue=:issue",
	beforeIsDrawingExistedBelongToLotteryRequest,
	handleIsDrawingExistedBelongToLotteryRequest
);
router.head("/id=:lotteryId/drawings/issue=:issue/next",
	beforeIsNextDrawingOpeningBelongToLotteryRequest,
	handleIsNextDrawingOpeningBelongToLotteryRequest
);
router.get("/id=:lotteryId/drawings",
	beforeGetPreviousAndCurrentDrawingsBelongToLotteryRequest,
	handleGetPreviousAndCurrentDrawingsBelongToLotteryRequest
);
router.get("/id=:lotteryId/drawings",
	beforeGetDrawingsBelongToLotteryRequest,
	handleGetDrawingsBelongToLotteryRequest
);

router.post("/id=:lotteryId/bettings",
	beforeCreateBettingsBelongToLotteryRequest,
	handleCreateBettingsBelongToLotteryRequest
);
router.post("/id=:lotteryId/traces",
	beforeCreateTracesBelongToLotteryRequest,
	handleCreateTracesBelongToLotteryRequest
);

module.exports = router;
