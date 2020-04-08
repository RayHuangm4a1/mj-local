import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	Row,
	Col,
} from 'ljit-react-components';
import { connect, } from 'ljit-store-connecter';
import DrawingCountDownCard from '../../components/drawing-counting-down-card';
import ArrowRaiseGif from './images/arrow_raise.gif';
import './style.styl';

const propTypes = {
	lotteryDrawingsData: PropTypes.object,
	lotteriesMapData: PropTypes.object,
	lotteryId: PropTypes.number,
	playId: PropTypes.number,
	// TODO: playCondition 和 play 的資料結構還沒確定需要檢查
	playCondition: PropTypes.string,
	play: PropTypes.string,
	onUpdateCombination: PropTypes.func,
};

const defaultProps = {
	lotteryId: 0,
	playId: 0,
	onUpdateCombination: () => {},
};

const prefixClass = 'betting-long__item';

// TODO: 等確認長龍玩法的 codes 再替換掉
const fakeCodesLists = {
	'1': [
		{
			name: '总和大',
			id: 53112,
			isSelected: false,
		},
		{
			name: '总和小',
			id: 53113,
			isSelected: false,
		},
	],
};

class BettingLongItem extends Component {
	constructor(props) {
		super(props);
		const playCodes = fakeCodesLists[props.playId];

		this.state = {
			data: playCodes,
		};
		this._handleClickCodeBallButton = this._handleClickCodeBallButton.bind(this);
		this._renderCodeBallButtons = this._renderCodeBallButtons.bind(this);
	}
	_handleClickCodeBallButton(name) {
		const { props, state, } = this;
		const { data, } = state;
		const { playCondition, onUpdateCombination, } = props;

		const nextData = data.map(code => {
			if (code.name === name) {
				return {
					...code,
					isSelected: !code.isSelected,
				};
			}
			return code;
		});

		this.setState({ data: nextData, });
		onUpdateCombination(playCondition, convertDataToCombination(nextData));
	}
	_renderCodeBallButtons() {
		const {
			state,
			_handleClickCodeBallButton,
		} = this;

		return (
			<Col className={`${prefixClass}__code-ball`}>
				{state.data.map(code => {
					const {
						name,
						isSelected,
					} = code;
					const color = isSelected ? Button.ColorEnums.BLOODORANGE : Button.ColorEnums.GREY12;

					return (
						<Button
							key={name}
							outline={Button.OutlineEnums.SOLID}
							color={color}
							onClick={() => _handleClickCodeBallButton(name)}
						>
							{name}
						</Button>
					);
				})}
			</Col>
		);
	}
	render() {
		const {
			props,
			_renderCodeBallButtons,
		} = this;
		const {
			playCondition,
			play,
			lotteryDrawingsData,
			lotteriesMapData,
			lotteryId,
		} = props;
		const lotteryMapData = getLotteryMapData(lotteryId, lotteriesMapData);
		const lotteryDrawingData = getLotteryDrawingData(lotteryId, lotteryDrawingsData);
		const {
			current = {},
		} = lotteryDrawingData;
		const {
			name,
		} = lotteryMapData;
		const {
			issue,
			index,
			// TODO remove default closedAt after LotteryDrawingData can update automatically.
			closedAt = (new Date()),
		} = current;

		return (
			<Row
				type={Row.TypeEnums.FLEX}
				align={Row.AlignEnums.MIDDLE}
				className={prefixClass}
			>
				<Col className={`${prefixClass}__consecutive-periods`}>
					連
					<span>{index}</span>
					期
					<img src={ArrowRaiseGif} />
				</Col>
				<Col className={`${prefixClass}__name`}>
					<div>{name}</div>
				</Col>
				<Col className={`${prefixClass}__betting`}>
					{playCondition}
					<span>
						{play}
					</span>
				</Col>
				<Col className={`${prefixClass}__issue`}>
					<div>{issue}</div>
					<div>离截止时间还有</div>
				</Col>
				<Col className={`${prefixClass}__timer`}>
					<DrawingCountDownCard
						type={DrawingCountDownCard.TypeEnums.DEFAULT}
						color={DrawingCountDownCard.ColorEnums.GRAY}
						closedAt={new Date(closedAt)}
					/>
				</Col>
				{_renderCodeBallButtons()}
			</Row>
		);
	}
}

BettingLongItem.propTypes = propTypes;
BettingLongItem.defaultProps = defaultProps;

function getLotteryMapData(lotteryId, lotteriesMapData) {
	return lotteriesMapData[lotteryId] || {};
}
function getLotteryDrawingData(lotteryId, lotteryDrawingsData) {
	return lotteryDrawingsData[lotteryId] || {};
}
function convertDataToCombination(data) {
	return data.filter((code) => code.isSelected);
}
function mapStateToProps(state) {
	return {
		lotteryDrawingsData: state.lotteryDrawings.get('data').toObject(),
		lotteriesMapData: state.lotteries.get('lotteriesMapData').toObject(),
	};
}

export default connect(mapStateToProps)(BettingLongItem);
