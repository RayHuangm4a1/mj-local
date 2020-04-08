import ServiceLocator from 'ljit-lib/service-locator';
import { getProductConfigs } from '../../product-configs/utils.js';

const configs = getProductConfigs();
const { Images, } = configs;
const lotteryImagelocator = new ServiceLocator();

lotteryImagelocator.register('ahq3', Images.get('AHQ3'));
lotteryImagelocator.register('bj5f3d', Images.get('BJ5F3D'));
lotteryImagelocator.register('bj5fc', Images.get('BJ5FC'));
lotteryImagelocator.register('bjkl8', Images.get('BJKL8'));
lotteryImagelocator.register('bjpc28', Images.get('BJPC28'));
lotteryImagelocator.register('bjpk10', Images.get('BJPK10'));
lotteryImagelocator.register('bjq3', Images.get('BJQ3'));
lotteryImagelocator.register('cckl10f', Images.get('CCKL10F'));
lotteryImagelocator.register('ccsss', Images.get('CCSSS'));
lotteryImagelocator.register('cnd35fc', Images.get('CND35FC'));
lotteryImagelocator.register('cndpc28', Images.get('CNDPC28'));
lotteryImagelocator.register('cs11s5', Images.get('CS11S5'));
lotteryImagelocator.register('csu11s5', Images.get('CSU11S5'));
lotteryImagelocator.register('dj1.5fc', Images.get('DJ15FC'));
lotteryImagelocator.register('fc3d', Images.get('FC3D'));
lotteryImagelocator.register('hb11s5', Images.get('HB11S5'));
lotteryImagelocator.register('hk6hc', Images.get('HK6HC'));
lotteryImagelocator.register('hlc11s5', Images.get('HLC11S5'));
lotteryImagelocator.register('hnkl10f', Images.get('HNKL10F'));
lotteryImagelocator.register('hnssc', Images.get('HNSSC'));
lotteryImagelocator.register('jlq3', Images.get('JLQ3'));
lotteryImagelocator.register('kd11s5', Images.get('KD11S5'));
lotteryImagelocator.register('kdkl10f', Images.get('KDKL10F'));
lotteryImagelocator.register('ksq3', Images.get('KSQ3'));
lotteryImagelocator.register('ln11s5', Images.get('LN11S5'));
lotteryImagelocator.register('md2fc', Images.get('MD2FC'));
lotteryImagelocator.register('nmkq3', Images.get('NMKQ3'));
lotteryImagelocator.register('pl35', Images.get('PL35'));
lotteryImagelocator.register('qqffc', Images.get('QQFFC'));
lotteryImagelocator.register('sd11s5', Images.get('SD11S5'));
lotteryImagelocator.register('sh11s5', Images.get('SH11S5'));
lotteryImagelocator.register('shq3', Images.get('SHQ3'));
lotteryImagelocator.register('tckl10f', Images.get('TCKL10F'));
lotteryImagelocator.register('tcssc', Images.get('TCSSC'));
lotteryImagelocator.register('ts5fc', Images.get('TS5FC'));
lotteryImagelocator.register('ts10fc', Images.get('TS10FC'));
lotteryImagelocator.register('txffc', Images.get('TSFFC'));
lotteryImagelocator.register('tw5f3d', Images.get('TW5F3D'));
lotteryImagelocator.register('tw5fc', Images.get('TW5FC'));
lotteryImagelocator.register('twkl8', Images.get('TWKL8'));
lotteryImagelocator.register('twpc28', Images.get('TWPC28'));
lotteryImagelocator.register('twpk10', Images.get('TWPK10'));
lotteryImagelocator.register('xc11s5', Images.get('XC11S5'));
lotteryImagelocator.register('xcssc', Images.get('XCSSC'));
lotteryImagelocator.register('xyft', Images.get('XYFT'));
lotteryImagelocator.register('ykkl10f', Images.get('YKKL10F'));
lotteryImagelocator.register('ynssc', Images.get('YNSSC'));

export default function getlotteryImage(lotteryCode) {
	try {
		return lotteryImagelocator.get(lotteryCode);

	} catch (error) {
		return Images.get('DEFAULT');
	}
}
