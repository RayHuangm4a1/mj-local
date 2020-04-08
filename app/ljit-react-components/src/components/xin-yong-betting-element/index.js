import xinYongBettingGroup from './xin-yong-betting-group';

function getXinYongBettingGroup(classId, lotteryId, playConditionId) {
	return xinYongBettingGroup.get(classId, lotteryId, playConditionId);
}

export default {
	get: getXinYongBettingGroup,
};
