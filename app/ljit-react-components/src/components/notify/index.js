import React from 'react';
import message from 'antd/lib/message';
import _NorifyContent from './notify-content';
import 'antd/lib/message/style';
import './style.styl';

// duration: milliseconds
export function generator(notifyType) {
	return (content, duration = 3000) => {
		if (duration < 0) {
			throw new Error('Norify: duration must greater than zero.');
		}

		const hide = message.open({
			content: (
				<NorifyContent
					notifyType={notifyType}
					content={content}
					// dismiss manually
					onClickClose={() => hide()}
				/>
			),
			duration: 0,
		});

		// don't dismiss if set to 0
		if (duration === 0) {
			return hide;
		}

		// for dismiss manually
		return setTimeout(hide, duration);
	};
}

export const NorifyContent = _NorifyContent;

export default {
	success: generator('success'),
	info: generator('info'),
	error: generator('error'),
	NotifyTypeEnums: _NorifyContent.NotifyTypeEnums,
};
