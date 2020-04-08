import React from 'react';
import PropTypes from 'prop-types';
import { DrawingInfoCard, } from 'ljit-react-components';
import './style.styl';

const PREFIX_CLASS = 'mobile-drawing-code-ball-block';

const propTypes = {
	issue: PropTypes.string,
	opencode: PropTypes.string,
	lotteryClassId: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	lotteryId: PropTypes.number,
	right: PropTypes.node,
};

const defaultProps = {
	issue: '',
	lotteryClassId: 0,
	opencode: '',
};

function MobileDrawingCodeBallBlock({
	issue,
	opencode,
	lotteryClassId,
	lotteryId,
	right,
}) {
	// TODO use mobile size DrawingInfoCard
	const DrawingCard = DrawingInfoCard.get(lotteryClassId);

	function _handleSplit(lotteryId, issue) {
		// TODO 確認 lotteryId 要顯示期號的邏輯與 default 分割的方式
		if (lotteryId === 1) {
			return Number(issue.toString().slice(-4));
		}
		return Number(issue.toString().slice(-3));
	}

	return (
		<div className={`${PREFIX_CLASS}`}>
			<div>
				<div>第<div>{_handleSplit(lotteryId ,issue)}</div>期 开奖号码</div>
				<DrawingCard opencode={opencode}/>
			</div>
			{right}
		</div>
	);
}

MobileDrawingCodeBallBlock.propTypes = propTypes;
MobileDrawingCodeBallBlock.defaultProps = defaultProps;

export default MobileDrawingCodeBallBlock;
