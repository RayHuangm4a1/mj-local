module.exports = function (userDailyStatses, effectiveBettingAmountPerDay) {
	const map = {};

	userDailyStatses.forEach(userDailyStats => {
		const { userId, username, walletCode, date, bettingAmount } = userDailyStats;
		const numOfBettingUsers = bettingAmount > 0 ? 1 : 0;
		const numOfEffectiveBettingUsers = bettingAmount >= effectiveBettingAmountPerDay ? 1 : 0;

		map[userId] = {
			userId,
			username,
			walletCode,
			date,
			numOfBettingUsers,
			numOfEffectiveBettingUsers,
		};
	});

	userDailyStatses.forEach(userDailyStats => {
		const { walletCode, date, bettingAmount } = userDailyStats;
		const numOfBettingUsers = bettingAmount > 0 ? 1 : 0;
		const numOfEffectiveBettingUsers = bettingAmount >= effectiveBettingAmountPerDay ? 1 : 0;

		userDailyStats.ancestors.forEach(({ id, username }) => {
			if (map[id] === undefined) {
				map[id] = {
					userId: id,
					username,
					walletCode,
					date,
					numOfBettingUsers,
					numOfEffectiveBettingUsers,
				};
			} else {
				map[id].numOfBettingUsers += numOfBettingUsers;
				map[id].numOfEffectiveBettingUsers += numOfEffectiveBettingUsers;
			}
		});
	});

	return Object.values(map);
};
