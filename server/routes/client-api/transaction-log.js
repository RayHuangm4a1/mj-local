const express = require("express");
const router = express.Router();
const {
	beforeGetTransactionLogsRequest,
	beforeGetDividendTransactionLogsRequest,
} = require("../../route-hooks/client/transaction-log");
const {
	handleGetTransactionLogsRequest,
	handleGetDividendTransactionLogsRequest,
} = require("../../route-handlers/client/transaction-log");

router.get("/",
	beforeGetTransactionLogsRequest,
	handleGetTransactionLogsRequest
);

router.get("/",
	beforeGetDividendTransactionLogsRequest,
	handleGetDividendTransactionLogsRequest
);

module.exports = router;
