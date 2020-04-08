import i18n from 'i18next';
import zhTW from './zh-TW.json';
import zhCN from './zh-CN.json';
import enUS from './en-US.json';

const defaultI18N = {
	lng: 'zh-CN',
	resources: {
		'zh-TW': {
			translations: zhTW
		},
		'zh-CN': {
			translations: zhCN
		},
		'en-US': {
			translations: enUS
		}
	},
	fallbackLng: 'zh-CN',
	debug: true,

	ns: ['translations'],
	defaultNS: 'translations',

	keySeparator: false,

	interpolation: {
		escapeValue: false,
		formatSeparator: ','
	},

	react: {
		wait: false
	}
};

export function createI18N({
	language = "",
	translations = {},
} = {}) {
	let i18nConfig = Object.assign({}, defaultI18N);
	const keys = Object.keys(translations);

	keys.forEach(function(key) {
		if (i18nConfig[key]) {
			i18nConfig[key].translations = translations[key];
		} else {
			i18nConfig[key] = {
				translations: translations[key]
			};
		}
	});

	if (language) {
		i18nConfig.lng = language;
	}

	i18n.init(i18nConfig);

	return i18n;
}
