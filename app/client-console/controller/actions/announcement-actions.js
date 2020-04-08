import {
	START_FETCH_ANNOUNCEMENTS,
	FETCH_ANNOUNCEMENTS_SUCCESS,
	FETCH_ANNOUNCEMENTS_FAILED,
	SET_SELECTED_ANNOUNCEMENT_ID,
	RESET_SELECTED_ANNOUNCEMENT_ID,
} from './action-types';

export function fetchAnnouncementsAction(query = {}) {
	return {
		type: START_FETCH_ANNOUNCEMENTS,
		query,
	};
}
export function fetchAnnouncementsSuccessAction(announcements = []) {
	return {
		type: FETCH_ANNOUNCEMENTS_SUCCESS,
		announcements,
	};
}
export function fetchAnnouncementsFailedAction(error, errorMessage) {
	return {
		type: FETCH_ANNOUNCEMENTS_FAILED,
		error,
		errorMessage,
	};
}
export function setSelectedAnnouncementIdAction(selectedAnnouncementId) {
	return {
		type: SET_SELECTED_ANNOUNCEMENT_ID,
		selectedAnnouncementId,
	};
}
export function resetSelectedAnnouncementIdAction() {
	return {
		type: RESET_SELECTED_ANNOUNCEMENT_ID,
	};
}
