import { Map, List, } from 'immutable';
import { LoadingStatusEnum } from '../../../../lib/enums';
import { actionTypes, } from '../../../../controller';

const {
	START_FETCH_ANNOUNCEMENTS,
	FETCH_ANNOUNCEMENTS_SUCCESS,
	FETCH_ANNOUNCEMENTS_FAILED,
	SET_SELECTED_ANNOUNCEMENT_ID,
	RESET_SELECTED_ANNOUNCEMENT_ID,
} = actionTypes;

//TODO add example
/* Example
data:
{
}

selectedAnnouncement:
{

}
*/

const initialState = Map({
	data: Map(),
	selectedAnnouncementId: null,

	loadingStatus: LoadingStatusEnum.NONE,
	loadingStatusMessage: '',
});

export default function announcements(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_ANNOUNCEMENTS:
			return state.set('loadingStatus', LoadingStatusEnum.LOADING);
		case FETCH_ANNOUNCEMENTS_SUCCESS:
			return state
				.set('data', List(action.announcements))
				.set('loadingStatus', LoadingStatusEnum.SUCCESS);
		case FETCH_ANNOUNCEMENTS_FAILED:
			return state
				.set('loadingStatus', LoadingStatusEnum.FAILED)
				.set('loadingStatusMessage', action.errorMessage);
		case SET_SELECTED_ANNOUNCEMENT_ID:
			return state.set('selectedAnnouncementId', action.selectedAnnouncementId);
		case RESET_SELECTED_ANNOUNCEMENT_ID:
			return state.set('selectedAnnouncementId', null);
		default:
			return state;
	}
}
