const express = require("express");
const router = express.Router();

const {
	beforeGetLotteriesRequest,
	beforeUpdateLotteryStatusRequest,
	afterUpdateLotteryStatusRequest,
} = require("../../route-hooks/management/lottery");
const {
	handleGetLotteriesRequest,
	handleUpdateLotteryStatusRequest,
} = require("../../route-handlers/management/lottery");

const {
	beforeUpdateManyPlayStatusBelongToLotteryRequest,
	beforeUpdateManyPlayDeltaBonusAndPKBelongToLotteryRequest,
	beforeGetPlaysBelongToLotteryAndPlayClassRequest,
	afterUpdateManyPlayStatusBelongToLotteryRequest,
	afterUpdateManyPlayDeltaBonusAndPKBelongToLotteryRequest,
} = require("../../route-hooks/management/play");
const {
	handleUpdateManyPlayStatusBelongToLotteryRequest,
	handleUpdateManyPlayDeltaBonusAndPKBelongToLotteryRequest,
	handleGetPlaysBelongToLotteryAndPlayClassRequest,
} = require("../../route-handlers/management/play");
const {
	handleGetDrawingsBelongToLotteryRequest,
	handleStopDrawingBelongToLotteryAndIssueRequest,
	handleCancelDrawingBelongToLotteryAndIssueRequest,
	handleUpdateDrawingOpencodeBelongToLotteryAndIssueRequest,
	handleGetDrawingBelongToLotteryAndIssueRequest,
	handleCountBettingUsersBelongToLotteryAndIssueRequest,
} = require("../../route-handlers/management/drawing");

const {
	beforeGetDrawingsBelongToLotteryRequest,
	beforeStopDrawingBelongToLotteryAndIssueRequest,
	afterStopDrawingBelongToLotteryAndIssueRequest,
	beforeCancelDrawingBelongToLotteryAndIssueRequest,
	afterCancelDrawingBelongToLotteryAndIssueRequest,
	beforeUpdateDrawingOpencodeBelongToLotteryAndIssueRequest,
	afterUpdateDrawingOpencodeBelongToLotteryAndIssueRequest,
	beforeGetDrawingBelongToLotteryAndIssueRequest,
	beforeCountBettingUsersBelongToLotteryAndIssueRequest,
} = require("../../route-hooks/management/drawing");
const {
	beforeGetPlayConditionsBelongToLotteryAndPlayClassRequest,
} = require("../../route-hooks/management/play-condition");
const {
	handleGetPlayConditionsBelongToLotteryAndPlayClassRequest,
} = require("../../route-handlers/management/play-condition");

router.get("/",
	beforeGetLotteriesRequest,
	handleGetLotteriesRequest
);
router.put("/id=:lotteryId/status",
	beforeUpdateLotteryStatusRequest,
	handleUpdateLotteryStatusRequest,
	afterUpdateLotteryStatusRequest
);

router.patch("/id=:lotteryId/plays",
	beforeUpdateManyPlayStatusBelongToLotteryRequest,
	handleUpdateManyPlayStatusBelongToLotteryRequest,
	afterUpdateManyPlayStatusBelongToLotteryRequest
);

router.patch("/id=:lotteryId/plays",
	beforeUpdateManyPlayDeltaBonusAndPKBelongToLotteryRequest,
	handleUpdateManyPlayDeltaBonusAndPKBelongToLotteryRequest,
	afterUpdateManyPlayDeltaBonusAndPKBelongToLotteryRequest
);

router.get("/id=:lotteryId/drawings",
	beforeGetDrawingsBelongToLotteryRequest,
	handleGetDrawingsBelongToLotteryRequest
);

router.get("/id=:lotteryId/drawings/issue=:issue",
	beforeGetDrawingBelongToLotteryAndIssueRequest,
	handleGetDrawingBelongToLotteryAndIssueRequest
);

router.get("/id=:lotteryId/drawings/issue=:issue/bettings",
	beforeCountBettingUsersBelongToLotteryAndIssueRequest,
	handleCountBettingUsersBelongToLotteryAndIssueRequest
);

router.post("/id=:lotteryId/drawings/issue=:issue/stopped",
	beforeStopDrawingBelongToLotteryAndIssueRequest,
	handleStopDrawingBelongToLotteryAndIssueRequest,
	afterStopDrawingBelongToLotteryAndIssueRequest
);

router.post("/id=:lotteryId/drawings/issue=:issue/canceled",
	beforeCancelDrawingBelongToLotteryAndIssueRequest,
	handleCancelDrawingBelongToLotteryAndIssueRequest,
	afterCancelDrawingBelongToLotteryAndIssueRequest
);

router.put("/id=:lotteryId/drawings/issue=:issue/opencode",
	beforeUpdateDrawingOpencodeBelongToLotteryAndIssueRequest,
	handleUpdateDrawingOpencodeBelongToLotteryAndIssueRequest,
	afterUpdateDrawingOpencodeBelongToLotteryAndIssueRequest
);

router.get("/id=:lotteryId/play-classes/id=:playClassId/play-conditions",
	beforeGetPlayConditionsBelongToLotteryAndPlayClassRequest,
	handleGetPlayConditionsBelongToLotteryAndPlayClassRequest
);

router.get("/id=:lotteryId/play-classes/id=:playClassId/plays",
	beforeGetPlaysBelongToLotteryAndPlayClassRequest,
	handleGetPlaysBelongToLotteryAndPlayClassRequest
);

module.exports = router;
