import BlueTheme from './blue-theme.styl';
import OrangeTheme from './orange-theme.styl';

export const MJThemeEnums = {
	BLUE: 'blue',
	ORANGE: 'orange',
};

const {
	BLUE,
	ORANGE,
} = MJThemeEnums;

export const MJThemeMaps = {
	[BLUE]: BlueTheme,
	[ORANGE]: OrangeTheme
};
