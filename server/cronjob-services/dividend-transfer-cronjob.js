const { CronJob } = require("cron");
const orchestrationServices = require("../orchestration-services");
const { daysOfDividendTransferSchedule } = global.CONFIG;

function start() {
	const orchestrator = orchestrationServices.get("dividend-transfer-orchestrator");

	const job = new CronJob(`0 0 03 ${daysOfDividendTransferSchedule} * *`, () => {
		orchestrator.start();
	}, null, false, "Asia/Shanghai");

	job.start();
}

module.exports = {
	start,
};
