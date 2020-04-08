const { intervalOfAutoRemitSchedule } = global.CONFIG;
const { CronJob } = require("cron");
const orchestrationServices = require("../orchestration-services");

function start() {
	const orchestrator = orchestrationServices.get("auto-remit-orchestrator");

	const job = new CronJob(`*/${intervalOfAutoRemitSchedule} * * * * *`, () => {
		orchestrator.start();
	}, null, false, "Asia/Shanghai");

	job.start();
}

module.exports = {
	start,
};
