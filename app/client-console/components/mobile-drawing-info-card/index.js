import React from 'react';
import { DrawingInfoCard, CodeBall, } from 'ljit-react-components';
import { LotteryClassIdEnum, } from '../../../lib/lotteries';
const CodeBallCircle = CodeBall.Circle;
const { SizeEnum, FontSizeEnum, } = CodeBallCircle;

function getMobileDrawingInfoCard(lotteryClassId) {
	return (
		function MobileDrawingInfoCard(props) {
			let size, fontSize;
			const MobileDrawingInfo = DrawingInfoCard.get(lotteryClassId);

			switch (lotteryClassId) {
				case LotteryClassIdEnum.SSC:
				case LotteryClassIdEnum.MARK_SIX:
				case LotteryClassIdEnum.KL8:
					size = SizeEnum.SMALL;
					fontSize = FontSizeEnum.SMALL;
					break;

				default:
					size = SizeEnum.SMALL;
					fontSize = FontSizeEnum.SMALL;
					break;
			}

			return (
				<MobileDrawingInfo
					size={size}
					fontSize={fontSize}
					{...props}
				/>
			);
		}
	);
}

export default {
	get: getMobileDrawingInfoCard
};
