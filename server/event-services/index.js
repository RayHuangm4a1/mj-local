const ServiceLocator = require("ljit-lib/service-locator");
const locator = new ServiceLocator();

locator.register("fetch-drawing-worker", require("./fetch-drawing-worker"));
locator.register("open-betting-worker", require("./open-betting-worker"));
locator.register("grant-commission-worker", require("./grant-commission-worker"));
locator.register("terminate-trace-worker", require("./terminate-trace-worker"));
locator.register("cancel-betting-worker", require("./cancel-betting-worker"));
locator.register("renew-betting-worker", require("./renew-betting-worker"));
locator.register("early-opened-drawing-risk-worker", require("./early-opened-drawing-risk-worker"));
locator.register("dividend-stats-worker", require("./dividend-stats-worker"));
locator.register("dividend-transfer-worker", require("./dividend-transfer-worker"));
locator.register("grant-zhaoshang-dividends-worker", require("./grant-zhaoshang-dividends-worker"));
locator.register("check-auto-remit-worker", require("./check-auto-remit-worker"));
locator.register("remit-using-bank-worker", require("./remit-using-bank-worker"));
locator.register("remit-using-third-party-worker", require("./remit-using-third-party-worker"));
locator.register("team-bonus-stats-worker", require("./team-bonus-stats-worker"));
locator.register("team-stats-worker", require("./team-stats-worker"));

module.exports = locator;
