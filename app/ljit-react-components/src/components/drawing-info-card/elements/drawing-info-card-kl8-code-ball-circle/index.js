import React from 'react';
import CodeBall from '../../../code-ball';
import { drawingInfoCardElementSharingPropTypes, } from '../../utils';
import './style.styl';

const CodeBallCircle = CodeBall.Circle;

const PREFIX_CLASS = 'drawing-info-card-kl8-code-ball-circle';

const propTypes = {
	...drawingInfoCardElementSharingPropTypes,
};
const defaultProps = {
	size: CodeBallCircle.SizeEnum.SMALL,
	fontSize: CodeBallCircle.FontSizeEnum.SMALL,
};

function DrawingInfoCardKL8CodeBallCircle({
	splitOpencodes,
	size,
	fontSize,
}) {
	const _renderCodeBalls = (splitCodes) => splitCodes.map((code, index) => {
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

	if (splitOpencodes) {
		const ballCounts = splitOpencodes.length;
		const halfIndex = ballCounts / 2;
		const upperCodeBalls = _renderCodeBalls(splitOpencodes.slice(0, halfIndex));
		const lowerCodeBalls = _renderCodeBalls(splitOpencodes.slice(halfIndex, ballCounts));

		return (
			<div className={PREFIX_CLASS}>
				<div className={`${PREFIX_CLASS}__upper`}>
					{upperCodeBalls}
				</div>
				<div className={`${PREFIX_CLASS}__lower`}>
					{lowerCodeBalls}
				</div>
			</div>
		);
	} else {
		return null;
	}
}

DrawingInfoCardKL8CodeBallCircle.propTypes = propTypes;
DrawingInfoCardKL8CodeBallCircle.defaultProps = defaultProps;

export default DrawingInfoCardKL8CodeBallCircle;
