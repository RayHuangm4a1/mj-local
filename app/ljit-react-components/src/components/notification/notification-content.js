import React from 'react';

const PREFIX_CLASS = 'ljit-notification';

export default function notificationContent(type, node) {
	if (node) {
		return <div className={`${PREFIX_CLASS}__${type}`}>{node}</div>;
	}

	return null;
}
