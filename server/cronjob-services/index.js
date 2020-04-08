const ServiceLocator = require("ljit-lib/service-locator");
const locator = new ServiceLocator();

locator.register("fetch-drawing-cronjob", require("./fetch-drawing-cronjob"));
locator.register("open-betting-cronjob", require("./open-betting-cronjob"));
locator.register("early-opened-drawing-risk-cronjob", require("./early-opened-drawing-risk-cronjob"));
locator.register("dividend-stats-cronjob", require("./dividend-stats-cronjob"));
locator.register("dividend-transfer-cronjob", require("./dividend-transfer-cronjob"));
locator.register("auto-remit-cronjob", require("./auto-remit-cronjob"));
locator.register("team-stats-cronjob", require("./team-stats-cronjob"));

module.exports = locator;
