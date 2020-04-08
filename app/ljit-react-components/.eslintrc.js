module.exports = {
	"parser": "babel-eslint",
	"env": {
		"es6": true,
		"node": true,
		"jquery": true,
		"browser": true,
		"mocha": true,
		"jest": true
	},
	"extends": ["eslint:recommended", "plugin:react/recommended"],
	"parserOptions": {
		"ecmaVersion": 2017,
		"sourceType": "module"
	},
	"plugins": [
		"async-await",
		"react",
		"react-hooks"
	],
	"settings": {
		"react": {
			"version": "15.6"
		}
	},
	"rules": {
		"no-console": "warn",
		"async-await/space-after-async": "error",
		"async-await/space-after-await": "error",
		"semi": "error",
		"indent": ["error", "tab", {"SwitchCase": 1}],
		"no-multiple-empty-lines": ["error", { "max": 2, "maxEOF": 1 }],
		"newline-after-var": "error",
		"object-curly-spacing": ["error", "always"],
		"keyword-spacing": "error",
		"space-in-parens": ["error", "never"],
		"space-before-blocks": "error",
		"arrow-spacing": "error",
		"space-before-function-paren": ["error", {
			"anonymous": "always",
			"named": "never",
			"asyncArrow": "always"
		}],
		"quotes": ["error", "single", { "avoidEscape": true, "allowTemplateLiterals": true }],
		"comma-dangle": ["error", {
			"arrays": "always",
			"objects": "always",
			"imports": "always",
			"exports": "always",
			"functions": "ignore"
		}],
		"react-hooks/rules-of-hooks": "error"
	},
};
