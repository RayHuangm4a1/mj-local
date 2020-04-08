import { getProductConfigs } from './utils';
import { ProductsEnum, } from './constants';

import ImagesMJ from './mj/images';

const { productName, } = getProductConfigs();
const IMAGES = getImages();

function getImages() {
	switch (productName) {
		case ProductsEnum.MJ:
			return ImagesMJ;
		// TODO add others Product tpye
		default:
			break;
	}
}

export default IMAGES;
