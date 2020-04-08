const { CronJob } = require("cron");
const orchestrationServices = require("../orchestration-services");

function start() {
	const orchestrator = orchestrationServices.get("dividend-stats-orchestrator");

	const job = new CronJob(`0 0 03 * * *`, () => {
		orchestrator.start();
	}, null, false, "Asia/Shanghai");

	job.start();
}

module.exports = {
	start,
};
