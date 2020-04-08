import React from 'react';
import PropTypes from 'prop-types';
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
		<div className="ljit-mobile-betting-ball">
			<div className="ljit-mobile-betting-ball__ball" onClick={onClick}>
				<CodeBallButton.Circle
					isSelected={isSelected}
					text={text}
					size={CodeBallButton.Circle.SizeEnum.SMALL}
					fontSize={CodeBallButton.Circle.FontSizeEnum.SMALL}
				/>
			</div>
		</div>
	);
}
BetBall.propTypes = propTypes;
BetBall.defaultProps = defaultProps;

export default BetBall;
