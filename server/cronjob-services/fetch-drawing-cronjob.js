const { intervalOfDrawingSchedule } = global.CONFIG;
const { CronJob } = require("cron");
const orchestrationServices = require("../orchestration-services");

function start() {
	const orchestrator = orchestrationServices.get("fetch-drawing-orchestrator");
	const job = new CronJob(`*/${intervalOfDrawingSchedule} * * * * *`, () => {
		orchestrator.start();
	});

	job.start();
}

module.exports = {
	start,
};
