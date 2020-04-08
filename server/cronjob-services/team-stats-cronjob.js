const { intervalOfTeamStatsScheduleInMinutes: minutes } = global.CONFIG;
const { CronJob } = require("cron");
const orchestrationServices = require("../orchestration-services");

function start() {
	const orchestrator = orchestrationServices.get("team-stats-orchestrator");

	new CronJob(`*/${minutes} 0-2,4-23 * * *`, () => {
		orchestrator.start(true);
	}, null, true, "Asia/Shanghai");

	new CronJob(`0-30/${minutes} 3 * * *`, () => {
		orchestrator.start(false);
	}, null, true, "Asia/Shanghai");

	new CronJob(`35-55/${minutes} 3 * * *`, () => {
		orchestrator.start(true);
	}, null, true, "Asia/Shanghai");
}

module.exports = {
	start,
};
