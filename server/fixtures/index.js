const { product } = require("../../env");

global.CONFIG = require("../../config").getServer(product);

const {
	connect,
} = require("ljit-db/sequelize");

module.exports = async function () {
	try {
		await connect(global.CONFIG.mysqlURL);

		await require("./fixture-platforms").drop();
		await require("./fixture-levels").drop();
		await require("./fixture-bank-cards").drop();
		await require("./fixture-users").drop();
		await require("./fixture-drawings").drop();
		await require("./fixture-bettings").drop();
		await require("./fixture-traces").drop();
		await require("./fixture-transaction-logs").drop();
		await require("./fixture-comments").drop();
		await require("./fixture-management-logs").drop();
		await require("./fixture-team-stats").drop();
		await require("./fixture-team-bonus-stats").drop();
		await require("./fixture-user-bonus-logs").drop();
		await require("./fixture-user-stats").drop();
		await require("./fixture-user-daily-stats").drop();
		await require("./fixture-team-daily-stats").drop();
		await require("./fixture-dividend-durations").drop();
		await require("./fixture-user-dividend-settings").drop();
		await require("./fixture-team-duration-stats").drop();
		await require("./fixture-deposit-classes").drop();
		await require("./fixture-bank-accounts").drop();
		await require("./fixture-deposit-application-forms").drop();
		await require("./fixture-user-withdrawal-policies").drop();
		await require("./fixture-deposit-amounts").drop();
		await require("./fixture-withdrawal-application-forms").drop();
		await require("./fixture-remit-channel").drop();
		await require("./fixture-payment-account").drop();
		await require("./fixture-user-favorites").drop();
		await require("./fixture-user-level-logs").drop();
		await require("./fixture-roles").drop();
		await require("./fixture-staffs").drop();
		await require("./fixture-role-relationships").drop();
		await require("./fixture-risk-level-ip-policies").drop();

		await require("./fixture-platforms").init();
		await require("./fixture-levels").init();
		await require("./fixture-bank-cards").init();
		await require("./fixture-users").init();
		await require("./fixture-drawings").init();
		await require("./fixture-bettings").init();
		await require("./fixture-traces").init();
		await require("./fixture-transaction-logs").init();
		await require("./fixture-comments").init();
		await require("./fixture-management-logs").init();
		await require("./fixture-user-daily-stats").init();
		await require("./fixture-team-daily-stats").init();
		await require("./fixture-team-duration-stats").init();
		await require("./fixture-deposit-classes").init();
		await require("./fixture-bank-accounts").init();
		await require("./fixture-deposit-application-forms").init();
		await require("./fixture-user-withdrawal-policies").init();
		await require("./fixture-withdrawal-application-forms").init();
		await require("./fixture-remit-channel").init();
		await require("./fixture-payment-account").init();
		await require("./fixture-roles").init();
		await require("./fixture-staffs").init();
		await require("./fixture-role-relationships").init();
	} catch (error) {
		console.log(error);
	}
};
