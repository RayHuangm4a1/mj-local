import PropTypes from 'prop-types';
import { SystemStatuses } from '../../../../components/table/constants';

const platformPropType = PropTypes.shape({
	_id: PropTypes.string,
});

const statusPropType = PropTypes.oneOf(Object.values(SystemStatuses).map(status => status.value));

const classPropType = PropTypes.shape({
	status: statusPropType,
	id: PropTypes.number,
	name: PropTypes.string,
	code: PropTypes.string
});

const conditionPropType = PropTypes.shape({
	id: PropTypes.number,
	name: PropTypes.string,
});

const limitPropType = PropTypes.shape({
	isEnabled: PropTypes.bool,
	content: PropTypes.array,
});

export const playsPropType = PropTypes.arrayOf(PropTypes.shape({
	_id: PropTypes.string,
	status: statusPropType,
	platform: platformPropType,
	lotteryClass: classPropType,
	lottery: classPropType,
	playCondition: conditionPropType,
	playSubcondition: conditionPropType,
	id: PropTypes.number,
	name: PropTypes.string,
	unit: PropTypes.number,
	pk: PropTypes.object,
	awards: PropTypes.shape({
		"中奖": PropTypes.shape({
			deltaBonus: PropTypes.number,
			numerator: PropTypes.number,
			denominator: PropTypes.number,
		}),
	}),
	positions: PropTypes.array,
	policy: PropTypes.shape({
		bonusLimiting: limitPropType,
		betLimiting: limitPropType,
	}),
	description: PropTypes.string,
	__v: PropTypes.number,
	createdAt: PropTypes.string,
	updatedAt: PropTypes.string,
}));

export const playConditionsPropType = PropTypes.arrayOf(PropTypes.shape({
	_id: PropTypes.string,
	platform: platformPropType,
	lottery: classPropType,
	playClass: classPropType,
	id: PropTypes.number,
	name: PropTypes.string,
	subconditions: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		plays: PropTypes.arrayOf(conditionPropType),
	})),
}));

export const filtersPropType = PropTypes.shape({
	playConditionId: PropTypes.number,
	subconditionId: PropTypes.number,
	status: statusPropType,
	keyword: PropTypes.string, 
});

export const optionsPropType = PropTypes.arrayOf(PropTypes.shape({
	label: PropTypes.string,
	value: PropTypes.number,
}));

export const searchPlays = (data, condition = {}) => {
	const { playConditionId, subconditionId, status, keyword, } = condition;

	let result = data.slice();

	if (keyword) {
		result = result.filter(item => {
			const playCondition = item.playCondition || {};
			const playConditionName = playCondition.name || '';
			const playName = item.name || '';
			const name = playConditionName + playName;
			
			return name.match(keyword);
		});
	}
	if (playConditionId) {
		result = result.filter(item => item.playCondition.id === playConditionId);
	}
	if (subconditionId) {
		result = result.filter(item => item.playSubcondition.id === subconditionId);
	}
	if (status) {
		result = result.filter(item => item.status === status);
	}
	return result;
};

export const allOption = { label: '全部', value: null, };

export const statusOptions = ([
	allOption,
	...(SystemStatuses.map(item => {
		return {
			label: item.text,
			value: item.value
		};
	})),
]);

export function getConditionOptions(conditions = []) {
	if (!conditions || !conditions.length) {
		return [allOption];
	}
	const options = conditions.map(
		condition => ({ label: condition.name, value: condition.id, })
	);

	return [allOption, ...options];
}

export function getSubconditions(playConditionsData = [], selectedPlayConditionId) {
	const selectedPlayCondition = playConditionsData.find(condition => condition.id === selectedPlayConditionId);

	return selectedPlayCondition ? selectedPlayCondition.subconditions : [];
}
