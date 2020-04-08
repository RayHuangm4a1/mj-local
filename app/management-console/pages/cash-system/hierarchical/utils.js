import path from 'lodash/fp/path';
import compose from 'lodash/fp/compose';
import filter from 'lodash/fp/filter';
import {
	FinanceLevelTypeEnum,
} from '../../../lib/enums';

const getType = path('type');

const filterByType = (type) => filter(
	compose(
		_type => _type === type,
		getType
	)
);

export const filterNormalFinanceLevels = filterByType(FinanceLevelTypeEnum.NORMAL);

export const filterSpecialFinanceLevels = filterByType(FinanceLevelTypeEnum.SPECIAL);
