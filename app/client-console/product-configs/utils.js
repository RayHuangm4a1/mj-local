import { ProductsEnum, ProductConfigsMap } from './constants';
import { get as getConfig } from '../config';

const { ThemeEnums } = ProductConfigsMap[ProductsEnum.MJ];
const initialOptions = {
	product: ProductsEnum.MJ,
	themeName: ThemeEnums.ORANGE
};

function createProductStyle(configs, themeName) {
	const { ThemeMaps } = configs;

	return ThemeMaps[themeName];
}

export const getProductConfigs = (_options = {}) => {
	const {
		environment,
	} = getConfig();

	const options = Object.assign(initialOptions, _options);
	const {
		product,
		themeName,
	} = options;

	const configs = ProductConfigsMap[product];

	return {
		productName: product,
		style: createProductStyle(configs, themeName),
		environment: environment,
		...configs,
	};
};
