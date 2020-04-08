const router = require('express').Router();
const { isLoggedIn } = require("../../route-hooks/common");

router.use("/login", require("./login"));

router.use(isLoggedIn);

router.use("/logout", require("./logout"));
router.use("/users", require("./user"));
router.use("/zhaoshangs", require("./zhaoshangs"));
router.use("/teams", require("./team"));
router.use("/lottery-classes", require("./lottery-class"));
router.use("/lotteries", require("./lottery"));
router.use("/bettings", require("./betting"));
router.use("/traces", require("./trace"));
router.use("/platform", require("./platform"));
router.use("/departments", require("./department"));
router.use("/deposit-application-forms", require("./deposit-application-form"));
router.use("/bank-cards", require("./bank-card"));
router.use("/wallets", require("./wallet"));
router.use("/levels", require("./level"));
router.use("/staffs", require("./staff"));
router.use("/user-level-logs", require("./user-level-log"));

module.exports = router;
