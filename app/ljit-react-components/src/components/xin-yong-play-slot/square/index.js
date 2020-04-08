import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Ball from '../../code-ball';
import DecimalNumber from '../../decimal-number';
import { TypeEnums, } from '../../code-ball/utils';
import './style.styl';

const propTypes = {
	className: PropTypes.string,
	play: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]),
		odds: PropTypes.number,
	}),
	playSlotType: PropTypes.oneOf(Object.values(TypeEnums).concat('')),
	isSelected: PropTypes.bool,
	isDisabled: PropTypes.bool,
	onClick: PropTypes.func,
};

const defaultProps = {
	className: '',
	playSlotType: '',
	play: {},
	isSelected: false,
	isDisabled: false,
	onClick: () => {},
};

const PREFIX_CLASS = 'ljit-xin-yong-play-slot-square';

class XinYongPlaySlotSquare extends Component {
	constructor() {
		super();

		this._renderSlotBall = this._renderSlotBall.bind(this);
	}

	_renderSlotBall() {
		const { play, playSlotType, } = this.props;
		const { name, } = play;

		switch (playSlotType) {
			case TypeEnums.CIRCLE:
				return <Ball.Circle text={name}/>;
			case TypeEnums.ROUND:
				return <Ball.Round text={name}/>;
			case TypeEnums.RECTANGLE:
				return <Ball.Rectangle text={name}/>;
			case TypeEnums.ANIMAL:
				return <Ball.Animal text={name} />;
			default:
				return name;
		}
	}

	render() {
		const {
			className,
			isDisabled,
			play,
			isSelected,
			onClick,
		} = this.props;
		const { _renderSlotBall, } = this;

		let odds = '-';

		if (!isDisabled && play.odds) {
			odds = <DecimalNumber data={play.odds} hasSeparator />;
		}

		return (
			<div
				className={cx(PREFIX_CLASS, className,
					{
						[`${PREFIX_CLASS}--selected`]: isSelected,
						[`${PREFIX_CLASS}--disabled`]: isDisabled,
					}
				)}
				onClick={isDisabled ? () => {} : onClick}
			>
				<div className={`${PREFIX_CLASS}__ball`}>{_renderSlotBall()}</div>
				<div className={`${PREFIX_CLASS}__odds`}>{odds}</div>
			</div>
		);
	}
}

XinYongPlaySlotSquare.propTypes = propTypes;
XinYongPlaySlotSquare.defaultProps = defaultProps;
XinYongPlaySlotSquare.TypeEnums = TypeEnums;

export default XinYongPlaySlotSquare;
