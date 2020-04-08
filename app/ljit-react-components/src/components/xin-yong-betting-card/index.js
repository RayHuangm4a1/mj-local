import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Row from '../row';
import Col from '../col';
import XinYongPlaySlot from '../xin-yong-play-slot';
import './style.styl';

const XinYongPlaySlotLine = XinYongPlaySlot.Line;
const XinYongPlaySlotSquare = XinYongPlaySlot.Square;
const { TypeEnums, } = XinYongPlaySlotLine;
const OrientationEnums = {
	VERTICAL: 'vertical',
	HORIZONTAL: 'horizontal',
};
const XinYongPlaySlotTypeEnums = {
	LINE: 'line',
	SQUARE: 'square',
};

const propTypes = {
	playsMap: PropTypes.objectOf(
		PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string,
			odds: PropTypes.number,
			status: PropTypes.string,
		})
	),
	bettingsMap: PropTypes.objectOf(
		PropTypes.shape({
			play: PropTypes.shape({
				id: PropTypes.number,
				name: PropTypes.string,
				odds: PropTypes.number,
			}),
			amount: PropTypes.number,
		}),
	),
	playTemplates: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		playSlotType: PropTypes.oneOf(Object.values(TypeEnums).concat('')),
	})),
	playSubcondition: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
	}),
	orientation: PropTypes.oneOf(Object.values(OrientationEnums).concat('')),
	className: PropTypes.string,
	style: PropTypes.object,
	onChange: PropTypes.func,
	isDisabled: PropTypes.bool,
	disabledText: PropTypes.string,
	defaultAmount: PropTypes.number,
	columnCount: PropTypes.number,
	xinYongPlaySlotType: PropTypes.oneOf(Object.values(XinYongPlaySlotTypeEnums).concat('')),
};

const defaultProps = {
	orientation: OrientationEnums.VERTICAL,
	playsMap: {},
	bettingsMap: {},
	playTemplates: [],
	playSubcondition: {},
	disabledText: '',
	isDisabled: false,
	defaultAmount: 0,
	columnCount: 4,
	onChange: () => {},
	xinYongPlaySlotType: XinYongPlaySlotTypeEnums.LINE,
};

class XinYongBettingCard extends Component {
	constructor(props) {
		super(props);

		this._handleChangeAmount = this._handleChangeAmount.bind(this);
		this._getPlaySlots = this._getPlaySlots.bind(this);
		this._renderPlaySlots = this._renderPlaySlots.bind(this);
	}

	_handleChangeAmount(play, amount) {
		const { onChange, playSubcondition, } = this.props;

		onChange(playSubcondition, play, amount);
	}

	_getPlaySlots() {
		const {
			playsMap,
			bettingsMap,
			playTemplates,
			isDisabled,
			disabledText,
			defaultAmount,
			xinYongPlaySlotType,
		} = this.props;
		const { _handleChangeAmount, } = this;

		return playTemplates.map(playTemplate => {
			const play = {
				...playTemplate,
				...playsMap[playTemplate.id],
			};

			const { id, status, } = play;
			const betting = bettingsMap[id] || {};
			const isPlaySlotDisabled = status === 'offline' || isDisabled;
			const playSlotDisabledText = status === 'offline' ? '不支援' : disabledText;

			if (xinYongPlaySlotType === XinYongPlaySlotTypeEnums.LINE) {
				return (
					<XinYongPlaySlotLine
						key={`xin-yong-play-slot-${playTemplate.name + playTemplate.id}`}
						play={play}
						playSlotType={playTemplate.playSlotType}
						betting={betting}
						isDisabled={isPlaySlotDisabled}
						disabledText={playSlotDisabledText}
						defaultAmount={defaultAmount}
						onChange={_handleChangeAmount}
					/>
				);
			} else if (xinYongPlaySlotType === XinYongPlaySlotTypeEnums.SQUARE) {
				const { amount, } = betting;
				const isSelected = amount > 0;

				return (
					<XinYongPlaySlotSquare
						key={`xin-yong-play-slot-${playTemplate.name + playTemplate.id}`}
						play={play}
						playSlotType={playTemplate.playSlotType}
						isSelected={isSelected}
						isDisabled={isPlaySlotDisabled}
						onClick={() => {
							_handleChangeAmount(play, isSelected ? undefined: defaultAmount);
						}}
					/>
				);
			}
		});

	}

	_renderPlaySlots() {
		const { orientation, columnCount, } = this.props;
		const playSlots = this._getPlaySlots();

		if (orientation === OrientationEnums.VERTICAL) {
			return playSlots;
		} else {
			const renderHorizontalSlots = playSlots.map((_slot, index) => {
				const columnSpan = 24 % columnCount === 0 ? 24 / columnCount : null;

				return <Col
					key={`xin-yong-betting-card-col-${index}`}
					className={`xin-yong-betting-card__col--${columnCount}`}
					span={columnSpan}
				>
					{_slot}
				</Col>;
			});

			return (
				<div className={columnCount % 2 !== 0 ? 'ljit-xin-yong-betting-card__content--odd-columns' : ''}>
					<Row>{renderHorizontalSlots}</Row>
				</div>
			);
		}
	}

	render() {
		const {
			orientation,
			playSubcondition,
			className,
			style,
		} = this.props;
		const { _renderPlaySlots, } = this;
		const title = playSubcondition.name;

		return (
			<div
				className={cx(`ljit-xin-yong-betting-card ljit-xin-yong-betting-card--${orientation}`, className)}
				style={style}
			>
				<div className="ljit-xin-yong-betting-card__title">
					{title}
				</div>
				<div className={cx(`ljit-xin-yong-betting-card__content`)}>
					{_renderPlaySlots()}
				</div>
			</div>
		);
	}
}

XinYongBettingCard.propTypes = propTypes;
XinYongBettingCard.defaultProps = defaultProps;
XinYongBettingCard.OrientationEnums = OrientationEnums;
XinYongBettingCard.TypeEnums = TypeEnums;
XinYongBettingCard.XinYongPlaySlotTypeEnums = XinYongPlaySlotTypeEnums;

export default XinYongBettingCard;
