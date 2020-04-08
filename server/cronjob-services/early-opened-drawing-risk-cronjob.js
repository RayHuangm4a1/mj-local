const { intervalOfEarlyOpenedDrawingCloseSchedule } = global.CONFIG;
const { CronJob } = require("cron");
const orchestrationServices = require("../orchestration-services");

function start() {
	const orchestrator = orchestrationServices.get("early-opened-drawing-risk-orchestrator");
	const job = new CronJob(`*/${intervalOfEarlyOpenedDrawingCloseSchedule} * * * * *`, () => {
		orchestrator.start();
	});

	job.start();
}

module.exports = {
	start,
};
