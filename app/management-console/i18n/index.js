import i18n from "i18next";
import zhTW from "./zh-TW";
import zhCN from "./zh-CN";

i18n.init({
	resources: {
		"zh-TW": {
			translations: zhTW
		},
		"zh-CN": {
			translations: zhCN
		}
	},
	fallbackLng: "zh-CN",
	debug: true,

	ns: ["translations"],
	defaultNS: "translations",

	keySeparator: false,

	interpolation: {
		escapeValue: false,
		formatSeparator: ","
	},

	react: {
		wait: false
	}
});

export default i18n;
