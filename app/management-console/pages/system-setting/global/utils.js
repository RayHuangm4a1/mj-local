export const PeriodEnums = {
	ONE: '1',
	TWO: '2',
	THREE: '3',
};

const { ONE, TWO, THREE, } = PeriodEnums;

export const PeriodOptions = [
	{ label: '1次', value: ONE },
	{ label: '2次', value: TWO },
	{ label: '3次', value: THREE },
];

export const DateOptions = (() => {
	let dateOptions = [];

	for (let i = 1; i < 31; i += 1) {
		dateOptions.push({ label: `${i}号`, value: `${i}` });
	}
	dateOptions.push({ label: '每月最后一天', value: 'last' });
	return dateOptions;
})();
