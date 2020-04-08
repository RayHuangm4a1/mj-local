const express = require("express");
const router = express.Router();
const {
	beforeCancelTraceBettingsRequest,
	beforeGetTracesRequest,
	beforeGetTraceBettingsRequest,
	beforeGetTraceRequest,
} = require("../../route-hooks/client/trace");
const {
	handleGetTracesRequest,
	handleGetTraceRequest,
	handleGetTraceBettingsRequest,
	handleCancelTraceBettingsRequest,
} = require("../../route-handlers/client/trace");

router.delete("/id=:traceId/bettings",
	beforeCancelTraceBettingsRequest,
	handleCancelTraceBettingsRequest
);

router.get("/",
	beforeGetTracesRequest,
	handleGetTracesRequest
);

router.get("/id=:traceId",
	beforeGetTraceRequest,
	handleGetTraceRequest
);

router.get("/id=:traceId/bettings",
	beforeGetTraceBettingsRequest,
	handleGetTraceBettingsRequest
);

module.exports = router;
