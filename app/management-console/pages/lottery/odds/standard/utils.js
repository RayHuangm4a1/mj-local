import get from 'lodash/get';

export function getPKCount(play = {}) {
	const awardName = get(play, ['award', 'name']);
	const awards = get(play, ['pk', 'awards']);
	const awardNameMapPkAwards = awards ? awards[awardName] : null;

	if (awardNameMapPkAwards) {
		return awardNameMapPkAwards.count ? awardNameMapPkAwards.count : '';
	}
	return '';
}

export function getFilteredPlaysData(filterQuery = {}, playsData) {
	const {
		playConditionId,
		award,
		keyword,
	} = filterQuery;

	let filteredPlayData = [...playsData];

	if (playConditionId) {
		filteredPlayData = filteredPlayData.filter(play => playConditionId === play.playCondition.id);
	}
	if (award) {
		filteredPlayData = filteredPlayData.filter(play => award === play.award.name);
	}
	if (keyword) {
		filteredPlayData = filteredPlayData.filter(item => {
			const playCondition = item.playCondition || {};
			const playConditionName = playCondition.name || '';
			const playName = item.name || '';
			const name = playConditionName + playName;

			return name.match(keyword);
		});
	}

	return filteredPlayData;
}
