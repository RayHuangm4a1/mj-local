import { DepositStatusEnum, } from '../../lib/enums';

export function checkIsNewStatus(data) {
	return data.status === DepositStatusEnum.NEW;
}

export function checkIsInconsistentStatus(data) {
	return data.status === DepositStatusEnum.INCONSISTENT;
}

