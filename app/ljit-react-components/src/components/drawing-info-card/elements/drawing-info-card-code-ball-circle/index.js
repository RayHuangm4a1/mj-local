import React from 'react';
import CodeBall from '../../../code-ball';
import { drawingInfoCardElementSharingPropTypes, } from '../../utils';
import './style.styl';

const CodeBallCircle = CodeBall.Circle;

const PREFIX_CLASS = 'drawing-info-card-code-ball-circle';

const propTypes = {
	...drawingInfoCardElementSharingPropTypes,
};
const defaultProps = {
	size: CodeBallCircle.SizeEnum.MIDDLE,
	fontSize: CodeBallCircle.FontSizeEnum.MIDDLE,
};

function DrawingInfoCardCodeBallCircle({
	splitOpencodes,
	size,
	fontSize,
}) {
	if (splitOpencodes) {
		const renderCodeBalls = splitOpencodes.map((code, index) => {
			return (
				<CodeBallCircle
					key={index}
					className={`${PREFIX_CLASS}__code-ball`}
					text={code}
					size={size}
					fontSize={fontSize}
					type={CodeBallCircle.StatusTypeEnum.SELECTED}
				/>
			);
		});

		return (
			<div className={PREFIX_CLASS}>
				{renderCodeBalls}
			</div>
		);
	} else {
		return null;
	}
}

DrawingInfoCardCodeBallCircle.propTypes = propTypes;
DrawingInfoCardCodeBallCircle.defaultProps = defaultProps;

export default DrawingInfoCardCodeBallCircle;
