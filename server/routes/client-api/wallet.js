const router = require("express").Router();
const {
	beforeTransferRequest,
} = require("../../route-hooks/client/wallet");
const {
	handleGetWalletsRequest,
	handleTransferRequest,
} = require("../../route-handlers/client/wallet");

router.get("/", handleGetWalletsRequest);

router.post("/id=primary/transferred",
	beforeTransferRequest,
	handleTransferRequest,
);

module.exports = router;
