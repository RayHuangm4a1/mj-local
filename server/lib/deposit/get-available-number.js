function getAvailableNumber({ usedNumbers = [], min = 1, max = 99 }) {
	let availableNumber = null;
	const usedNumberSet = new Set(usedNumbers);

	for (let i = min; i <= max; i++) {
		if (!usedNumberSet.has(i)) {
			availableNumber = i;

			break;
		}
	}

	return availableNumber;
}

module.exports = getAvailableNumber;
