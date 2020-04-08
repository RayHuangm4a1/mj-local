const router = require("express").Router();
const {
	beforeLoginRequest,
	beforeGoogleTOTPLoginRequest,
} = require("../../route-hooks/client/login");
const {
	handleSuccessfulLoginRequest,
} = require("../../route-handlers/client/login");

router.post("/",
	beforeGoogleTOTPLoginRequest,
	handleSuccessfulLoginRequest
);

router.post("/",
	beforeLoginRequest,
	handleSuccessfulLoginRequest
);

module.exports = router;
