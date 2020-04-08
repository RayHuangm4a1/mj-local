import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Card, CodeBall, } from 'ljit-react-components';
import { lotteryDrawingRecordsPropTypes, } from '../utils';
import './style.styl';

const propTypes = {
	className: PropTypes.string,
	lotteryDrawingRecords: lotteryDrawingRecordsPropTypes,
};

const PREFIX_CLASS = 'drawing-list-item';

function DrawingRecordList({
	className,
	lotteryDrawingRecords,
}) {
	function _renderBalls(opencode) {
		return opencode.split(',').map((item, index) => {
			return (
				<CodeBall.Circle
					key={`${item}-${index}`}
					text={item}
					className={`${PREFIX_CLASS}__ball`}
					size={CodeBall.Circle.SizeEnum.SMALL}
					fontSize={CodeBall.Circle.FontSizeEnum.SMALL}
					type={CodeBall.Circle.StatusTypeEnum.SELECTED}
				/>
			);
		});
	}

	let content = lotteryDrawingRecords.map((item, index) => {
		return (
			<Card key={`${item}-${index}`} className={cx(PREFIX_CLASS, className)}>
				<div className={`${PREFIX_CLASS}__issue`}>{`第 ${item.issue} 期`}</div>
				<div className={`${PREFIX_CLASS}__drawings`}>{_renderBalls(item.opencode)}</div>
			</Card>
		);
	});

	if (content.length === 0) {
		content = <div className={`${PREFIX_CLASS}__no-draw`}>无开奖纪录</div>;
	}

	return <div className={`${PREFIX_CLASS}__wrapper`}>{content}</div>;
}

DrawingRecordList.propTypes = propTypes;

export default DrawingRecordList;
