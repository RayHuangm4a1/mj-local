const router = require("express").Router();
const {
	handleCreateCaptchaRequest,
} = require("../../route-handlers/client/captcha");

router.post("/",
	handleCreateCaptchaRequest,
);

module.exports = router;
