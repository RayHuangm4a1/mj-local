const express = require("express");
const router = express.Router();

const {
	beforeGetChildrenBelongToUserRequest,
	beforeUpdateChildrenFixedWageRequest,
	beforeGetTeamDailyStatsBelongToUserRequest,
	beforeGetChildrenFixedWageRequest,
	beforeGrantDividendsBelongToChildrenRequest,
	beforeGetDescendantBettingsRequest,
	beforeUpdateChildrenSelfDividendSettingsRequest,
	beforeGetChildrenTeamDividendsRequest,
	beforeCreateChildrenRequest,
	beforeUpdateChildrenRequest,
	beforeGetDescendantTracesRequest,
	beforeGetDescendantTraceRequest,
	beforeGetDescendantBettingRequest,
	beforeGetDescendantTraceBettingsRequest,
} = require('../../route-hooks/client/team');

const {
	handleGetChildrenBelongToUserRequest,
	handleUpdateChildrenFixedWageRequest,
	handleGetTeamDailyStatsBelongToUserRequest,
	handleGetChildrenFixedWageRequest,
	handleGetDescendantBettingsRequest,
	handleGrantDividendsBelongToChildrenRequest,
	handleUpdateChildrenSelfDividendSettingsRequest,
	handleGetChildrenTeamDividendsRequest,
	handleCreateChildrenRequest,
	handleUpdateChildrenRequest,
	handleGetDescendantTraceRequest,
	handleGetTeamStatsRequest,
	handleGetDescendantTracesRequest,
	handleGetDescendantBettingRequest,
	handleGetDescendantTraceBettingsRequest,
} = require("../../route-handlers/client/team");

router.get("/leaderKey=:userIdOrUsername/children",
	beforeGetChildrenBelongToUserRequest,
	handleGetChildrenBelongToUserRequest
);

router.put("/leaderId=me/children/id=:childrenId/fixed-wage",
	beforeUpdateChildrenFixedWageRequest,
	handleUpdateChildrenFixedWageRequest
);

router.get("/leaderkey=:userIdOrUsername/daily-stats",
	beforeGetTeamDailyStatsBelongToUserRequest,
	handleGetTeamDailyStatsBelongToUserRequest
);

router.post("/leaderId=me/children",
	beforeCreateChildrenRequest,
	handleCreateChildrenRequest
);

router.get("/leaderId=me/children",
	beforeGetChildrenFixedWageRequest,
	handleGetChildrenFixedWageRequest
);

router.get(
	"/leaderId=me/children",
	beforeGetChildrenTeamDividendsRequest,
	handleGetChildrenTeamDividendsRequest
);

router.post("/leaderId=me/children/id=:childrenId/dividends",
	beforeGrantDividendsBelongToChildrenRequest,
	handleGrantDividendsBelongToChildrenRequest
);

router.put(
	"/leaderId=me/children/id=:childrenId/dividends/type=self/settings",
	beforeUpdateChildrenSelfDividendSettingsRequest,
	handleUpdateChildrenSelfDividendSettingsRequest
);

router.get("/leaderId=me/bettings",
	beforeGetDescendantBettingsRequest,
	handleGetDescendantBettingsRequest
);

router.get("/leaderId=me/traces",
	beforeGetDescendantTracesRequest,
	handleGetDescendantTracesRequest
);

router.get("/leaderId=me/members/id=:memberId/bettings/id=:bettingId",
	beforeGetDescendantBettingRequest,
	handleGetDescendantBettingRequest
);

router.patch("/leaderId=me/children/id=:childrenId",
	beforeUpdateChildrenRequest,
	handleUpdateChildrenRequest
);

router.get("/leaderId=me/stats",
	handleGetTeamStatsRequest
);

router.get("/leaderId=me/members/id=:memberId/traces/id=:traceId",
	beforeGetDescendantTraceRequest,
	handleGetDescendantTraceRequest
);

router.get("/leaderId=me/members/id=:memberId/traces/id=:traceId/bettings",
	beforeGetDescendantTraceBettingsRequest,
	handleGetDescendantTraceBettingsRequest
);

module.exports = router;
