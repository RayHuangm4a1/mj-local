const express = require("express");
const router = express.Router();
const { handleGetDividendDurationsRequest } = require("../../route-handlers/client/dividend-duration");
const { beforeGetDividendDurationsRequest } = require("../../route-hooks/client/dividend-duration")

router.get("/",
	beforeGetDividendDurationsRequest,
	handleGetDividendDurationsRequest
);

module.exports = router;
