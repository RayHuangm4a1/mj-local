const { product } = require("../../env");

global.CONFIG = require("../../config").getServer(product);

require("ljit-db/sequelize").connect(global.CONFIG.mysqlURL);

const {
	doTeamDurationStatsByDate,
} = require("../services/dividend.system");
const {
	createUser,
} = require("../services/user");

const DividendDurationModel = require("../models/dividend-duration");
const UserDividendSettingModel = require("../models/user-dividend-setting");
const TeamDailyStatsModel = require("../models/team-daily-stats");

const fixturedDividendDurations = require("./data/testing-dividend-duration");
const fixturedUserDividendSettings = require("./data/testing-user-dividend-setting");
const fixturedTeamDailyStatses = require("./data/testing-team-daily-stats");
const fixturedUserTest01Children = require("./data/testing-user-test01-children");

const logger = require("ljit-logger")("debug");

async function bulkCreateDividendDurationsDocument() {
	await DividendDurationModel.insertMany(fixturedDividendDurations);
}

async function bulkCreateUserDividendSettingsDocument() {
	await UserDividendSettingModel.insertMany(fixturedUserDividendSettings);
}

async function bulkCreateTeamDailyStatsesDocument() {
	await TeamDailyStatsModel.insertMany(fixturedTeamDailyStatses);
}

async function bulkCreateUserDocument() {
	for (let i = 0; i < fixturedUserTest01Children.length; i++) {
		await createUser(fixturedUserTest01Children[i]);
	}
}

async function start() {
	try {
		await bulkCreateDividendDurationsDocument();
		await bulkCreateUserDocument();
		await bulkCreateUserDividendSettingsDocument();
		await bulkCreateTeamDailyStatsesDocument();
		await doTeamDurationStatsByDate(fixturedTeamDailyStatses[0].date);

		logger.info("[mysql][testing-team-duration-statses] fixture done");
		process.exit();
	} catch (error) {
		logger.info("[mysql][testing-team-duration-statses] fixture failed", error.stack);

		process.exit(1);
	}
}

start();
