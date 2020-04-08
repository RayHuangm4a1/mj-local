import cx from 'classnames';
import { Notification, } from 'ljit-react-components';
import './style.styl';

const ThemeEnums = {
	ORANGE: 'orange',
};

const PREFIX_CLASS = 'ljit-client-notification';

export function clientNotification() {
	return ({
		className = '',
		title = '',
		description = '',
		iconType,
		theme = ThemeEnums.ORANGE,
		duration = 3000,
	}) => {
		return Notification.info({
			className: cx(
				PREFIX_CLASS,
				className,
				`${PREFIX_CLASS}--theme-${theme}`,
			),
			title,
			description,
			iconType,
			duration,
		});
	};
}

export default {
	info: clientNotification(),
};
