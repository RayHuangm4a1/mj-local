import React, { Component, } from 'react';
import MobileDrawingInfoCard from '../../../components/mobile-drawing-info-card';
import { LotteryClassIdEnum, } from '../../../../lib/lotteries';

const {
	SSC,
	MARK_SIX,
	KL8,
} = LotteryClassIdEnum;

class MobileDrawingInfoCardSample extends Component {
	render() {
		const SSCDrawingInfoCard = MobileDrawingInfoCard.get(SSC);// ssc
		const MarkSixDrawingInfoCard = MobileDrawingInfoCard.get(MARK_SIX);// mark-six
		const KL8DrawingInfoCard = MobileDrawingInfoCard.get(KL8);// kl8

		return (
			<div style={{ background: '#fff', }}>
				<h5>MobileDrawingInfoCardSample</h5>
				<div>
					SSC
					<SSCDrawingInfoCard
						opencode={'1,2,3,4,5'}
					/>
				</div>
				<div>
					MarkSix
					<MarkSixDrawingInfoCard
						opencode={'10,07,18,35,11,42'}
					/>
				</div>
				<div>
					KL8
					<KL8DrawingInfoCard
						opencode={'1,3,6,8,9,5,2,10,4,7,24,27,18,7,30,31,16,32,37,19'}
					/>
				</div>
			</div>
		);
	}
}

export default MobileDrawingInfoCardSample;
