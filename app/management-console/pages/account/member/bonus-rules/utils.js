export function getFixedWagesText(value) {
	if (value.length) {
		return `${value.join('%, ')}%`;
	}
	return '';
}

export function getMaxWage(value) {
	if (value.length === 0) return 0;
	const sortValue = value.sort((a, b) => b - a);

	return sortValue[0];
}
