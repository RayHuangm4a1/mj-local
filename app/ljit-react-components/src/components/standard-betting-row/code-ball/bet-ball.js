import React from 'react';
import PropTypes from 'prop-types';
import Ball from '../../code-ball';
import CodeBallButton from '../../code-ball-button';

const propTypes = {
	onClick: PropTypes.func,
	text: PropTypes.string,
	isSelected: PropTypes.bool,
};

const defaultProps = {
	onClick: () => {},
	text: '',
	isSelected: true,
};

function BetBall({ onClick, text, isSelected, }) {
	return (
		<div className="ljit-bet-ball">
			<div className="ljit-bet-ball__ball" onClick={onClick}>
				<CodeBallButton.Circle
					isSelected={isSelected}
					size={CodeBallButton.Circle.SizeEnum.MIDDLE}
					fontSize={CodeBallButton.Circle.FontSizeEnum.MIDDLE}
					text={text}
				/>
			</div>
			<div className="ljit-bet-ball__sub">
				{/* TODO wait for 遗漏/冷热 api data */}
				{/* <div className="ljit-bet-ball__sub__style ljit-bet-ball__sub--left">0</div>
				<div className="ljit-bet-ball__sub__style ljit-bet-ball__sub--right">12</div> */}
			</div>
		</div>
	);
}
BetBall.propTypes = propTypes;
BetBall.defaultProps = defaultProps;

export default BetBall;
