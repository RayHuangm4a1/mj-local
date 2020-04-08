export function isDecimal(number) {
	if (typeof number !== 'number') {
		return false;
	}

	return number % 1 !== 0;
}
