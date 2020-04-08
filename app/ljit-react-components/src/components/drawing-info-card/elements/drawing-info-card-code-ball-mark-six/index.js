import React from 'react';
import { drawingInfoCardElementSharingPropTypes, } from '../../utils';
import CodeBall from '../../../code-ball';
import './style.styl';

const CodeBallCircle = CodeBall.Circle;
const MarkSixColorMap = getMarkSixColorMap();

const propTypes = {
	...drawingInfoCardElementSharingPropTypes,
};
const defaultProps = {
	size: CodeBallCircle.SizeEnum.MIDDLE,
	fontSize: CodeBallCircle.FontSizeEnum.MIDDLE,
};

const CodeBallMarkSix = ({
	splitOpencodes,
	size,
	fontSize,
}) => {
	const specialNumber = splitOpencodes.slice(-1)[0];
	const normalNumbers = splitOpencodes.slice(0, -1);

	const renderNormalBalls = () => {
		return normalNumbers.map((number) => {
			return (
				<CodeBallCircle
					className={`code-ball-mark-six--${MarkSixColorMap[number]}`}
					key={number}
					text={number}
					size={size}
					fontSize={fontSize}
				/>
			);
		});
	};

	return (
		<div className='drawing-info-card-code-ball-mark-six'>
			{renderNormalBalls()}
			<div>+</div>
			<CodeBallCircle
				className={`code-ball-mark-six--${MarkSixColorMap[specialNumber]}`}
				text={specialNumber}
				size={size}
				fontSize={fontSize}
			/>
		</div>
	);
};

CodeBallMarkSix.propTypes = propTypes;
CodeBallMarkSix.defaultProps = defaultProps;

export default CodeBallMarkSix;

function getMarkSixColorMap() {
	const red = [
		'01', '02', '07', '08', '12', '13', '18', '19', '23', '24', '29', '30', '34', '35', '40', '45', '46',
	];
	const blue = [
		'03', '04', '09', '10', '14', '15', '20', '25', '26', '31', '36', '37', '41', '42', '47', '48',
	];
	const green = [
		'05', '06', '11', '16', '17', '21', '22', '27', '28', '32', '33', '38', '39', '43', '44', '49',
	];
	const ColorMap = {};

	red.forEach(number => {
		ColorMap[number] = 'red';
	});
	blue.forEach(number => {
		ColorMap[number] = 'blue';
	});
	green.forEach(number => {
		ColorMap[number] = 'green';
	});

	return ColorMap;
}
