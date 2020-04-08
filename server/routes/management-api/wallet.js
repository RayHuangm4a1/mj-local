const router = require("express").Router();
const {
	beforeGetLessThanZeroBalanceWalletsRequest,
} = require("../../route-hooks/management/wallet");
const {
	handleGetLessThanZeroBalanceWalletsRequest,
} = require("../../route-handlers/management/wallet");

router.get("/",
	beforeGetLessThanZeroBalanceWalletsRequest,
	handleGetLessThanZeroBalanceWalletsRequest
);

module.exports = router;
