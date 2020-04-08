import { Map, List, } from 'immutable';
import { actionTypes, } from '../../../../../controller';
import { LoadingStatusEnum } from '../../../../../lib/enums';

const {
	NONE,
	LOADING,
	SUCCESS,
	FAILED,
} = LoadingStatusEnum;

const {
	START_FETCH_USER_DIVIDEND_SETTINGS,
	FETCH_USER_DIVIDEND_SETTINGS_SUCCESS,
	FETCH_USER_DIVIDEND_SETTINGS_FAILED,
	START_UPDTATE_USER_DIVIDEND_SETTINGS,
	UPDTATE_USER_DIVIDEND_SETTINGS_SUCCESS,
	UPDTATE_USER_DIVIDEND_SETTINGS_FAILED,
} = actionTypes;

/* example
data:
[
    {
        "id": 1,
        "ratio": 0,
        "amount": 300000
    },
    {
        "id": 2,
        "ratio": 8,
        "amount": 600000
    },
    {
        "id": 3,
        "ratio": 9,
        "amount": 900000
    },
    {
        "id": "4",
        "ratio": 20,
        "amount": 100000000
	},
	...
]
*/

const initialState = Map({
	data: List(),
	
	loadingStatus: NONE,
	loadingStatusMessage: '',
	updateLoadingStatus: NONE,
	updateLoadingStatusMessage: '',
});

export default function dividendSettings(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_USER_DIVIDEND_SETTINGS:
			return state.set('loadingStatus', LOADING);
		case FETCH_USER_DIVIDEND_SETTINGS_SUCCESS: {
			const { dividendSettings, } = action;

			return state
				.set('data', List(appendDividendSettingId(dividendSettings)))
				.set('loadingStatus', SUCCESS);
		}
		case FETCH_USER_DIVIDEND_SETTINGS_FAILED:
			return state
				.set('loadingStatus', FAILED)
				.set('loadingStatusMessage', action.errorMessage);
		case START_UPDTATE_USER_DIVIDEND_SETTINGS:
			return state.set('updateLoadingStatus', LOADING);
		case UPDTATE_USER_DIVIDEND_SETTINGS_SUCCESS: {
			const { dividendSettings, } = action;

			return state
				.set('data', List(appendDividendSettingId(dividendSettings)))
				.set('updateLoadingStatus', SUCCESS);
		}
		case UPDTATE_USER_DIVIDEND_SETTINGS_FAILED:
			return state
				.set('updateLoadingStatus', FAILED)
				.set('updateLoadingStatusMessage', action.errorMessage);

		default:
			return state;	
	}
}

const appendDividendSettingId = (dividendSettings) => dividendSettings.map(
	(setting, index) => ({ ...setting, id: index + 1, })
);
