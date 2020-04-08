import { getProductConfigs } from '../../product-configs/utils.js';

const configs = getProductConfigs();
const { Images, } = configs;

export default Images.get('logo');
