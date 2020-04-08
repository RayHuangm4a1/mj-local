const router = require("express").Router();
const {
	beforeLoginRequest,
} = require("../../route-hooks/management/login");
const {
	handleSuccessfulLoginRequest,
} = require("../../route-handlers/management/login");

router.post("/",
	beforeLoginRequest,
	handleSuccessfulLoginRequest
);

module.exports = router;
