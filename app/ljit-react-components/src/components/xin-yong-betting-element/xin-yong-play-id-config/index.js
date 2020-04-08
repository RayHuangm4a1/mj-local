import { LotteryClassIdEnum, } from '../../../lib/game-id-enums';
import shishicai from './shishicai';
import pk10 from './pk10';
import pcdd from './pcdd';
import iix5 from './iix5';

export default {
	[LotteryClassIdEnum.SSC]: shishicai,
	[LotteryClassIdEnum.PK10]: pk10,
	[LotteryClassIdEnum.PCDD]: pcdd,
	[LotteryClassIdEnum.IIX5]: iix5,
};
