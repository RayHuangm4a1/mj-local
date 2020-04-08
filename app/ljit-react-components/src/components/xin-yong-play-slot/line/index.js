import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Input from '../../input';
import Ball from '../../code-ball';
import Tooltip from '../../tooltip';
import DecimalNumber from '../../decimal-number';
import { TypeEnums, } from '../../code-ball/utils';
import './style.styl';

const ControlledTooltip = Tooltip.ControlledTooltip;
const { PlacementEnums, ColorEnums, } = ControlledTooltip;

const propTypes = {
	className: PropTypes.string,
	style: PropTypes.object,
	play: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		odds: PropTypes.number,
	}),
	playSlotType: PropTypes.oneOf(Object.values(TypeEnums).concat('')),
	betting: PropTypes.shape({
		play: PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string,
			odds: PropTypes.number,
		}),
		amount: PropTypes.number,
	}),
	isDisabled: PropTypes.bool,
	disabledText: PropTypes.string,
	defaultAmount: PropTypes.number,
	onChange: PropTypes.func,
};

const defaultProps = {
	play: {},
	playSlotType: TypeEnums.CIRCLE,
	betting: {},
	isDisabled: false,
	disabledText: '不支援',
	defaultAmount: 0,
	onChange: () => {},
};

const PREFIX_CLASS = 'ljit-xin-yong-play-slot-line';

class XinYongPlaySlotLine extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isTooltipVisible: false,
		};

		this._handleClickSlot = this._handleClickSlot.bind(this);
		this._handleChangeInputValue = this._handleChangeInputValue.bind(this);
		this._handleVisibleChange = this._handleVisibleChange.bind(this);
	}

	_handleClickSlot(event) {
		const { play, betting, defaultAmount, onChange, isDisabled, } = this.props;
		const bettingAmount = betting.amount;

		if (event.target.nodeName === 'INPUT') {
			return;
		}
		if (!isDisabled) {
			if (!bettingAmount) {
				onChange(play, defaultAmount);
			} else {
				onChange(play, undefined);
			}
		}
	}

	_handleChangeInputValue(e) {
		const { play, onChange, isDisabled, } = this.props;
		const bettingAmount = parseInt(e.target.value, 10);
		const isNotNumber = Number.isNaN(bettingAmount);

		if (!isDisabled) {
			if (!isNotNumber && bettingAmount !== 0) {
				onChange(play, bettingAmount);
			} else {
				onChange(play, undefined);
			}
		}
	}

	_handleVisibleChange(updatedVisible) {
		const container = this.container;
		const { clientWidth, scrollWidth, } = container;

		if (clientWidth < scrollWidth) {
			this.setState({ isTooltipVisible: updatedVisible, });
		} else {
			this.setState({ isTooltipVisible: false, });
		}
	}

	_renderSlotBall() {
		const { play, playSlotType, betting, } = this.props;
		const bettingAmount = betting.amount;

		switch (playSlotType) {
			case TypeEnums.RECTANGLE: {
				if (bettingAmount > 0) {
					return (
						<Ball.Rectangle
							text={play.name}
							size={Ball.Rectangle.SizeEnum.SMALL}
							fontSize={Ball.Rectangle.FontSizeEnum.SMALL}
							type={Ball.Rectangle.StatusTypeEnum.SELECTED}
						/>
					);
				}
				return <Ball.Rectangle
					text={play.name}
					size={Ball.Rectangle.SizeEnum.SMALL}
					fontSize={Ball.Rectangle.FontSizeEnum.SMALL}
					type={Ball.Rectangle.StatusTypeEnum.PRIMARY}
				/>;
			}
			case TypeEnums.ANIMAL: {
				return <Ball.Animal text={play.name} />;
			}
			default: {
				if (bettingAmount > 0) {
					return (
						<Ball.Circle
							text={play.name}
							size={Ball.Circle.SizeEnum.EXTRA_SMALL}
							fontSize={Ball.Circle.FontSizeEnum.EXTRA_SMALL}
							type={Ball.Circle.StatusTypeEnum.SELECTED}
						/>
					);
				}
				return <Ball.Circle
					text={play.name}
					size={Ball.Circle.SizeEnum.EXTRA_SMALL}
					fontSize={Ball.Circle.FontSizeEnum.EXTRA_SMALL}
					type={Ball.Circle.StatusTypeEnum.PRIMARY}
				/>;
			}
		}
	}

	_renderSlotInput() {
		const { betting, isDisabled, disabledText, } = this.props;
		const { _handleChangeInputValue, } = this;
		const bettingAmount = betting.amount;

		if (isDisabled) {
			return (
				<Input
					className={`${PREFIX_CLASS}__input ${PREFIX_CLASS}__input--disabled`}
					disabled
					value={disabledText}
				/>
			);
		} else {
			return (
				<Input
					className={`${PREFIX_CLASS}__input`}
					onChange={_handleChangeInputValue}
					value={bettingAmount > -1 ? bettingAmount.toString() : ''}
				/>
			);
		}
	}

	render() {
		const {
			className,
			style,
			isDisabled,
			play,
			betting,
		} = this.props;
		const { isTooltipVisible, } = this.state;
		const { _handleClickSlot, _handleVisibleChange, } = this;
		const bettingAmount = betting.amount;

		let odds = '-';

		if (!isDisabled && play.odds) {
			odds = <DecimalNumber data={play.odds} hasSeparator />;
		}

		return (
			<div
				className={cx(PREFIX_CLASS,
					bettingAmount > 0 ? `${PREFIX_CLASS}--checked` : '',
					isDisabled ? `${PREFIX_CLASS}--disabled` : '',
					className
				)}
				style={style}
				onClick={event => {_handleClickSlot(event); }}
			>
				<div className={`${PREFIX_CLASS}__ball`}>{this._renderSlotBall()}</div>
				<div className={`${PREFIX_CLASS}__odds`}>
					<ControlledTooltip
						title={odds}
						placement={PlacementEnums.TOP}
						overlayColor={ColorEnums.WHITE}
						overlayClassName={`${PREFIX_CLASS}__overlay`}
						isVisible={isTooltipVisible}
						onVisibleChange={_handleVisibleChange}
					>
						<div ref={container => this.container = container}>
							{odds}
						</div>
					</ControlledTooltip>
				</div>
				<div className={`${PREFIX_CLASS}__status`}>{this._renderSlotInput()}</div>
			</div>
		);
	}
}

XinYongPlaySlotLine.propTypes = propTypes;
XinYongPlaySlotLine.defaultProps = defaultProps;
XinYongPlaySlotLine.TypeEnums = TypeEnums;

export default XinYongPlaySlotLine;
