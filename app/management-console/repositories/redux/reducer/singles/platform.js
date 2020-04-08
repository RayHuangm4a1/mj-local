import { Map } from 'immutable';
import { LoadingStatusEnum } from "../../../../lib/enums";

import { START_FETCH_PLATFORM,
	FETCH_PLATFORM_SUCCESS,
	FETCH_PLATFORM_FAILED,
	START_UPDATE_BONUS_RULES,
	UPDATE_BONUS_RULES_SUCCESS,
	UPDATE_BONUS_RULES_FAILED,
	START_UPDATE_PLATFORM_DIVIDEND_SETTINGS,
	UPDATE_PLATFORM_DIVIDEND_SETTINGS_SUCCESS,
	UPDATE_PLATFORM_DIVIDEND_SETTINGS_FAILED,
	START_UPDATE_PLATFORM_FIXED_WAGE,
	UPDATE_PLATFORM_FIXED_WAGE_SUCCESS,
	UPDATE_PLATFORM_FIXED_WAGE_FAILED,
} from '../../../../controller/actions/action-types';
const {
	NONE,
	SUCCESS,
	FAILED,
	LOADING,
} = LoadingStatusEnum;

/* Example
platform = {
	_id: "5cd151312dfa1d244dd54517",
	status: "online",
	name: "麥傑",
	code: "mj",
	bonus: {
		list: [
			1956,
			1958,
			1956,
			1954,
			1952,
			1950,
			1800,
			1700
		],
		max: 1956,
		min: 1700
	},
	couldEqualToZhaoShangParentBonus: true,
	couldEqualToAgentParentBonus: false,
	rewardMode: "奖金模式",
	nonPKMaxProfit: 50000,
	pkMaxProfit: 10000,
};
*/

const initialState = Map({
	data: Map(),
	loadingStatus: NONE,
	loadingStatusMessage: '',
	updateBonusRulesLoadingStatus: NONE,
	updateBonusRulesLoadingStatusMessage: '',
	updateDividendSettingsLoadingStatus: NONE,
	updateDividendSettingsLoadingStatusMessage: '',
	updateFixedWageLoadingStatus: LoadingStatusEnum.NONE,
	updateFixedWageLoadingStatusMessage: '',
});

export default function platform(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_PLATFORM:
			return state.set('loadingStatus', LOADING);
		case FETCH_PLATFORM_SUCCESS:
			return state
				.set('loadingStatus', SUCCESS)
				.set('data', Map(action.payload));
		case FETCH_PLATFORM_FAILED:
			return state
				.set('loadingStatus', FAILED)
				.set('loadingStatusMessage', action.errorMessage); 

		case START_UPDATE_BONUS_RULES:
			return state.set('updateBonusRulesLoadingStatus', LOADING);
		case UPDATE_BONUS_RULES_SUCCESS:
			return state
				.set('updateBonusRulesLoadingStatus', SUCCESS)
				.set('bonusRules', Map(action.payload));
		case UPDATE_BONUS_RULES_FAILED:
			return state
				.set('updateBonusRulesLoadingStatus', FAILED)
				.set('loadingStatusMessage', action.errorMessage);

		case START_UPDATE_PLATFORM_DIVIDEND_SETTINGS:
			return state.set('updateDividendSettingsLoadingStatus', LOADING);
		case UPDATE_PLATFORM_DIVIDEND_SETTINGS_SUCCESS:
			return state
				.setIn(['data', 'dividendSettings'], action.dividendSetting)
				.set('updateDividendSettingsLoadingStatus', SUCCESS);
		case UPDATE_PLATFORM_DIVIDEND_SETTINGS_FAILED:
			return state
				.set('updateDividendSettingsLoadingStatus', FAILED)
				.set('updateDividendSettingsLoadingStatusMessage', action.errorMessage);
	
		case START_UPDATE_PLATFORM_FIXED_WAGE:
			return state.set('updateFixedWageLoadingStatus', LoadingStatusEnum.LOADING);
		case UPDATE_PLATFORM_FIXED_WAGE_SUCCESS:
			return state
				.setIn(['data', 'fixedWage'], action.fixedWage)
				.set('updateFixedWageLoadingStatus', LoadingStatusEnum.SUCCESS);
		case UPDATE_PLATFORM_FIXED_WAGE_FAILED:
			return state
				.set('updateFixedWageLoadingStatus', LoadingStatusEnum.FAILED)
				.set('updateFixedWageLoadingStatusMessage', action.errorMessage);

		default: {
			return state;
		}
	}
}
