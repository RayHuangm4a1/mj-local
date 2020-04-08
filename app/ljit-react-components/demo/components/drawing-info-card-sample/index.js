import React, { Component, } from 'react';
import DrawingInfoCard from '../../../src/components/drawing-info-card';
import CodeBall from '../../../src/components/code-ball';
import { LotteryClassIdEnum, } from '../../../src/lib/game-id-enums';
import ComponentBlock from '../ComponentBlock';

const CodeBallCircle = CodeBall.Circle;
const { Item, } = ComponentBlock;
const {
	SSC,
	MMC,
} = LotteryClassIdEnum;

class DrawingInfoCardSample extends Component {
	render() {
		const SSCDrawingInfoCard = DrawingInfoCard.get(SSC);// ssc
		const MMCDrawingInfoCard = DrawingInfoCard.get(MMC);
		const MarkSixDrawingInfoCard = DrawingInfoCard.get(LotteryClassIdEnum.MARK_SIX);// mark-six
		const K3DrawingInfoCard = DrawingInfoCard.get(LotteryClassIdEnum.K3);// k3
		const KL8DrawingInfoCard = DrawingInfoCard.get(LotteryClassIdEnum.KL8);// kl8

		return (
			<React.Fragment>
				<ComponentBlock title="SSCDrawingInfoCard">
					<SSCDrawingInfoCard
						opencode={'1,2,3,4,5'}
					/>
					<div>mobile size</div>
					<SSCDrawingInfoCard
						opencode={'1,2,3,4,5'}
						size={CodeBallCircle.SizeEnum.SMALL}
						fontSize={CodeBallCircle.FontSizeEnum.EXTRA_SMALL}
					/>
				</ComponentBlock>
				<ComponentBlock title="MMCDrawingInfoCard">
					<Item>
						<span style={{ float: 'left', marginRight: '20px', }}>
							未開獎:
						</span>
						<MMCDrawingInfoCard
							opencode=""
							onClickButton={() => console.log('mmc')}
						/>
					</Item>
					<Item style={{ marginTop: 20 }}>
						<span style={{ float: 'left', marginRight: '20px', }}>
							已開獎:
						</span>
						<MMCDrawingInfoCard
							opencode="1,7,0,1,7"
							onClickButton={() => console.log('mmc')}
						/>
					</Item>
					<Item style={{ marginTop: 20 }}>
						<span style={{ float: 'left', marginRight: '20px', }}>
							Disabled:
						</span>
						<MMCDrawingInfoCard
							opencode="1,4,8,5,2"
							onClickButton={() => console.log('mmc')}
							isButtonDisabled
						/>
					</Item>
				</ComponentBlock>
				<ComponentBlock title="MarkSixDrawingInfoCard">
					<MarkSixDrawingInfoCard
						opencode={'10,07,18,35,11,42'}
					/>
					<div>mobile size</div>
					<MarkSixDrawingInfoCard
						opencode={'10,07,18,35,11,42'}
						size={CodeBallCircle.SizeEnum.SMALL}
						fontSize={CodeBallCircle.FontSizeEnum.EXTRA_SMALL}
					/>
				</ComponentBlock>
				<ComponentBlock title="K3DrawingInfoCard">
					<K3DrawingInfoCard
						opencode={'1,2,3,4,5,6'}
					/>
				</ComponentBlock>
				<ComponentBlock title="KL8DrawingInfoCard">
					<KL8DrawingInfoCard
						opencode={'1,3,6,8,9,5,2,10,4,7,24,27,18,7,30,31,16,32,37,19'}
					/>
					<div>mobile size</div>
					<KL8DrawingInfoCard
						opencode={'1,3,6,8,9,5,2,10,4,7,24,27,18,7,30,31,16,32,37,19'}
						size={CodeBallCircle.SizeEnum.SMALL}
						fontSize={CodeBallCircle.FontSizeEnum.EXTRA_SMALL}
					/>
				</ComponentBlock>
			</React.Fragment>
		);
	}
}

export default DrawingInfoCardSample;
