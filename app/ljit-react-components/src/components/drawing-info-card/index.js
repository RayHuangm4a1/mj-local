import { LotteryClassIdEnum, } from '../../lib/game-id-enums';
import withDrawingInfoCard from './with-drawing-info-card';
import DrawingInfoCardElements from './elements';

const {
	DrawingInfoCardCodeBallCircle,
	DrawingInfoCardMMC,
	DrawingInfoCardCodeBallMarkSix,
	DrawingInfoCardCodeBallDice,
	DrawingInfoCardKL8CodeBallCircle,
} = DrawingInfoCardElements;

const  LotteryClassDrawingMap = {
	[LotteryClassIdEnum.SSC]: DrawingInfoCardCodeBallCircle,
	[LotteryClassIdEnum.MMC]: DrawingInfoCardMMC,
	[LotteryClassIdEnum.MARK_SIX]: DrawingInfoCardCodeBallMarkSix,
	[LotteryClassIdEnum.K3]:DrawingInfoCardCodeBallDice,
	[LotteryClassIdEnum.KL8]: DrawingInfoCardKL8CodeBallCircle,
};

function getDrawingInfoCard(lotteryClassId,) {

	const drawingInfoElement = LotteryClassDrawingMap[lotteryClassId];

	if (!drawingInfoElement) {
		throw new Error(`LotteryClassId: ${lotteryClassId}, can't find map to DrawingInfoElement.`);
	}

	return withDrawingInfoCard(drawingInfoElement);
}

export default {
	get: getDrawingInfoCard,
};
