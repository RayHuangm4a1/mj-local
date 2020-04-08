const router = require('express').Router();
const { isLoggedIn } = require("../../route-hooks/common");

router.use("/captcha", require("./captcha"));
router.use("/login", require("./login"));
router.use("/guests", require("./guest"));

router.use(isLoggedIn);

router.use("/logout", require("./logout"));
router.use("/users", require("./user"));
router.use("/teams", require("./team"));
router.use("/lottery-classes", require("./lottery-class"));
router.use("/play-classes", require("./play-class"));
router.use("/lotteries", require("./lottery"));
router.use("/wallets", require("./wallet"));
router.use("/platform", require("./platform"));
router.use("/bettings", require("./betting"));
router.use("/traces", require("./trace"));
router.use("/security-questions", require("./security-question"));
router.use("/transaction-logs", require("./transaction-log"));
router.use("/dividend-durations", require("./dividend-duration"));
router.use("/deposit-classes", require("./deposit-class"));
router.use("/withdrawal-application-forms", require("./withdrawal-application-form"));
router.use("/bank-cards", require("./bank-card"));

module.exports = router;
