export const UnitEnums = {
	'DAY': '1',
	'HOUR': '2',
};

export function checkDayUnit(unitValue) {
	return unitValue === UnitEnums.DAY;
}

export function checkHourUnit(unitValue) {
	return unitValue === UnitEnums.HOUR;
}
