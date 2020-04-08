const ServiceLocator = require("ljit-lib/service-locator");
const locator = new ServiceLocator();

locator.register("fetch-drawing-orchestrator", require("./fetch-drawing-orchestrator"));
locator.register("open-betting-orchestrator", require("./open-betting-orchestrator"));
locator.register("early-opened-drawing-risk-orchestrator", require("./early-opened-drawing-risk-orchestrator"));
locator.register("dividend-stats-orchestrator", require("./dividend-stats-orchestrator"));
locator.register("dividend-transfer-orchestrator", require("./dividend-transfer-orchestrator"));
locator.register("auto-remit-orchestrator", require("./auto-remit-orchestrator"));
locator.register("team-stats-orchestrator", require("./team-stats-orchestrator"));

module.exports = locator;
