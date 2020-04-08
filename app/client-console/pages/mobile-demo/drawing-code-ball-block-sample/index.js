import React, { useState, } from 'react';
import MobileDrawingCodeBallBlock from '../../../components/mobile-drawing-code-ball-block';
import { Button, Icon, TextButton, } from 'ljit-react-components';
import './style.styl';

function StandardDrawingCodeBallBlockSample() {

	function _renderButton() {
		return <Button
			className='mobile-drawing-code-ball-block-sample__button'
			outline={Button.OutlineEnums.HOLLOW}
			color={Button.ColorEnums.ORANGE}
			onClick={() => {console.log('open');}}
		> 立即开奖 </Button>;
	}
	function _renderRandom() {
		return (
			<div
				onClick={() => {console.log('random');}}
				className="mobile-drawing-code-ball-block-sample__random"
			>
				<Icon
					type={Icon.IconTypeEnums.PHONE}
					size={Icon.SizeEnums.X_LARGE}
				/>
				机选
			</div>
		);
	}
	const [isOpen, setIsOpen] = useState(false);

	function _handleClickTextButton() {
		setIsOpen(!isOpen);
		console.log(!isOpen);
	}

	function _renderTextLabelButton() {
		return (
			<div className="mobile-drawing-code-ball-block-sample__text-label">
				賠率
				<TextButton
					text={isOpen ? '关闭': '显示'}
					fontSize={TextButton.SizeEnums.SMALL}
					onClick={_handleClickTextButton}
				/>
			</div>
		);
	}
	return (
		<React.Fragment>
			<h4>Mobile Drawing Code Ball Block</h4>
			<MobileDrawingCodeBallBlock
				issue={1123}
				opencode={'1,2,3,4,5,6'}
				lotteryClassId={0}
			/>
			<MobileDrawingCodeBallBlock
				issue={1123}
				opencode={'1,2,3,4,5,6'}
				lotteryClassId={7}
				lotteryId={1}
			/>
			<MobileDrawingCodeBallBlock
				issue={0}
				opencode={'10,07,18,35,11,42'}
				lotteryClassId={'mark_six'}
				right={_renderTextLabelButton()}
			/>
			<MobileDrawingCodeBallBlock
				issue={11}
				opencode={'1,2,3,4,5'}
				lotteryClassId={0}
				right={_renderRandom()}
			/>
			<MobileDrawingCodeBallBlock
				issue={117}
				opencode={'1,2,3,4,5'}
				lotteryClassId={7}
				right={_renderButton()}
			/>
		</React.Fragment>
	);
}

export default StandardDrawingCodeBallBlockSample;
