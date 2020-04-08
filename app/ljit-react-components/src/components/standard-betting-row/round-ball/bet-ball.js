import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import CodeBallButton from '../../code-ball-button';
import Badge from '../../badge';
import { BallSizeEnum, } from '../../standard-betting-element/utils';

const propTypes = {
	onClick: PropTypes.func,
	text: PropTypes.string,
	isSelected: PropTypes.bool,
	codeBallSize: PropTypes.oneOf(Object.values(BallSizeEnum).concat('')),
	badge: PropTypes.string,
};

const defaultProps = {
	onClick: () => {},
	text: '',
	isSelected: false,
	codeBallSize: BallSizeEnum.MIDDLE,
	badge: '',
};

class BetBall extends React.Component {
	constructor() {
		super();

		this._renderDefaultBall = this._renderDefaultBall.bind(this);
		this._renderWithBadgeBall = this._renderWithBadgeBall.bind(this);
	}

	_renderDefaultBall() {
		const {
			text,
			onClick,
			isSelected,
			codeBallSize,
		} =  this.props;

		return (
			<CodeBallButton.Rectangle
				isSelected={isSelected}
				text={text}
				onChange={onClick}
				size={codeBallSize}
				fontSize={CodeBallButton.Rectangle.FontSizeEnum.MIDDLE}
			/>
		);
	}

	_renderWithBadgeBall() {
		const {
			_renderDefaultBall,
			props: {
				isSelected,
				badge,
			},
		} = this;

		return (
			<Badge
				className={cx('ljit-bet-rectangle__badge', {
					[`ljit-bet-rectangle__badge-active`]: isSelected,
				})}
				count={badge}
				isBordered
			>
				{_renderDefaultBall()}
			</Badge>
		);
	}

	render() {
		const { badge, } = this.props;
		const { _renderDefaultBall, _renderWithBadgeBall } = this;
		let ballElement = null;

		if (!badge) {
			ballElement = _renderDefaultBall();
		} else {
			ballElement = _renderWithBadgeBall();
		}

		return (
			<div className="ljit-bet-rectangle">
				{ballElement}
			</div>
		);
	}
}

BetBall.propTypes = propTypes;
BetBall.defaultProps = defaultProps;

export default BetBall;