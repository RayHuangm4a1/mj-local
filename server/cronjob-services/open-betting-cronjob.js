const { intervalOfOpenBettingSchedule } = global.CONFIG;
const { CronJob } = require("cron");
const orchestrationServices = require("../orchestration-services");

function start() {
	const orchestrator = orchestrationServices.get("open-betting-orchestrator");
	const job = new CronJob(`*/${intervalOfOpenBettingSchedule} * * * * *`, () => {
		orchestrator.start();
	});

	job.start();
}

module.exports = {
	start,
};