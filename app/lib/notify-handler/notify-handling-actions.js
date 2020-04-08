export const CATCH_NOTIFY_HANDLING = 'CATCH_NOTIFY_HANDLING';

export function notifyHandlingAction(notification) {
	return {
		type: CATCH_NOTIFY_HANDLING,
		notification,
	};
}
