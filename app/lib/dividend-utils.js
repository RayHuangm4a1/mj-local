import curryRight from 'lodash/curryRight';
import { TEN_THOUSAND } from './constants';

export const multiplication = curryRight((x, y) => (x * y));
export const division = curryRight((x, y) => (x / y));

export const times10000 = multiplication(TEN_THOUSAND);
export const divided10000 = division(TEN_THOUSAND);

export const dataAmountMultiplyTenThousand = (data) => ({
	...data,
	amount: parseInt(times10000(data.amount), 10),
});

export const dataAmountDividedTenThousand = (data) => ({
	...data,
	amount: parseInt(divided10000(data.amount), 10)
});
