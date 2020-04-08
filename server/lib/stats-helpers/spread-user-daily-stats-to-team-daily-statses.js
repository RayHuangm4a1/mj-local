module.exports = function (userDailyStats, ancestors) {
	const {
		userId, username, walletCode,
		date, ...stats
	} = userDailyStats;

	const teamDailyStatses = [userDailyStats];

	ancestors.forEach(ancestor => {
		teamDailyStatses.push({
			walletCode,
			date,
			userId: ancestor.id,
			username: ancestor.username,
			...stats
		});
	});

	return teamDailyStatses;
};