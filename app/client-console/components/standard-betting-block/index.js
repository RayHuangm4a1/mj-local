import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	InputNumber,
	Button,
	CodeBallButton,
} from 'ljit-react-components';
import './style.styl';
import SelectDropdown from '../select-dropdown';
import BetContentHelperFactory from 'ljit-betcontent-helper';
import { amountPerBetOptions, calculateRebate } from '../../lib/betting-utils';

const propTypes = {
	classId: PropTypes.number,
	lotteryId: PropTypes.number,
	playId: PropTypes.number,
	bettingData: PropTypes.shape({
		play: PropTypes.shape({
			_id: PropTypes.string,
			id: PropTypes.number,
			name: PropTypes.string,
			bonus: PropTypes.number,
		}),
		name: PropTypes.string,
		betcontent: PropTypes.string,
		weizhi: PropTypes.string,
		multiple: PropTypes.number,
		amountPerBet: PropTypes.number,
		rebate: PropTypes.number,
		amount: PropTypes.number,
	}),
	platformBonus: PropTypes.shape({
		max: PropTypes.number,
		min: PropTypes.number,
		list: PropTypes.arrayOf(PropTypes.number),
	}),
	userBonus: PropTypes.number,
	isValidBetting: PropTypes.bool,
	style: PropTypes.object,
	onClickAllIn: PropTypes.func,
	onClickAddBasket: PropTypes.func,
	onClickBetting: PropTypes.func,
	isAmountActive: PropTypes.bool,
	isAllInActive: PropTypes.bool,
};

const defaultProps = {
	classId: 0,
	lotteryId: 0,
	playId: 0,
	bettingData: {},
	isValidBetting: false,
	onClickAllIn: () => {},
	onClickAddBasket: () => {},
	onClickBetting: () => {},
	isAmountActive: true,
	isAllInActive: true,
};

class StandardBettingBlock extends Component {
	constructor(props) {
		super(props);

		this.state = {
			amountPerBet: 2,
			multiple: 1,
			amount: 0,
			rebateOptions: [],
			rebateValue: null,
			__prevProps__bettingData: props.bettingData,
		};

		this._renderAmountBlock = this._renderAmountBlock.bind(this);
		this._renderAllInButton = this._renderAllInButton.bind(this);
		this._handleChangeMultiple = this._handleChangeMultiple.bind(this);
		this._handleAddBasket = this._handleAddBasket.bind(this);
		this._handleClickBet = this._handleClickBet.bind(this);
		this._handleChangeRebateValue = this._handleChangeRebateValue.bind(this);
		this._handleCreateBettingAmountData = this._handleCreateBettingAmountData.bind(this);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.bettingData !== prevState.__prevProps__bettingData) {
			return {
				__prevProps__bettingData: nextProps.bettingData,
			};
		}

		return null;
	}

	_handleChangeMultiple(value) {
		this.setState({ multiple: value, });
	}

	_handleAddBasket() {
		const { isValidBetting, onClickAddBasket } = this.props;
		const { _handleCreateBettingAmountData } = this;

		if (isValidBetting) {
			onClickAddBasket(_handleCreateBettingAmountData());
		}
	}

	_handleCreateBettingAmountData() {
		const { classId, lotteryId, playId, bettingData, } = this.props;
		const { amountPerBet, multiple, rebateValue, } = this.state;
		const { betcontent, weizhi, } = bettingData;
		const betContentHelper = BetContentHelperFactory.getHelper(classId, lotteryId, playId);
		const count = betContentHelper.count(betcontent, { weizhi });
		const amount = amountPerBet * multiple * count;

		return {
			amountPerBet,
			multiple,
			amount,
			rebate: rebateValue,
			count,
		};
	}

	_handleClickBet() {
		const { onClickBetting, isValidBetting } = this.props;
		const { _handleCreateBettingAmountData } = this;

		if (isValidBetting) {
			onClickBetting(_handleCreateBettingAmountData());
		}
	}

	_handleChangeRebateValue(value) {
		this.setState({
			rebateValue: value,
		});
	}

	_renderAmountBlock() {
		const {
			amount,
		} = this.state;
		const {
			isAmountActive,
		} = this.props;

		if (isAmountActive) {
			return (
				<div className="standard-betting-block__amount">
					金额投注
					<div className="betting-input">
						<InputNumber min={0} value={amount} onChange={value => this.setState({ amount: value, })} />
					</div>
				</div>
			);
		}

		return null;
	}

	_renderAllInButton() {
		const {
			onClickAllIn,
			isAllInActive,
		} = this.props;

		if (isAllInActive) {
			return (
				<Button
					outline={Button.OutlineEnums.HOLLOW}
					color={Button.ColorEnums.ORANGE}
					onClick={() => onClickAllIn()}
				>
					梭哈
				</Button>
			);
		}

		return null;
	}

	render() {
		const {
			bettingData,
			classId,
			lotteryId,
			playId,
			style,
			isValidBetting,
		} = this.props;
		const {
			amountPerBet,
			multiple,
			rebateOptions,
			rebateValue,
		} = this.state;
		const {
			_handleAddBasket,
			_handleChangeMultiple,
			_handleClickBet,
			_handleChangeRebateValue,
			_renderAmountBlock,
			_renderAllInButton,
		} = this;
		const { betcontent, weizhi, } = bettingData;
		const betContentHelper = BetContentHelperFactory.getHelper(classId, lotteryId, playId);

		let count = 0, showAmount = 0;

		if (betcontent) {
			count = betContentHelper.count(betcontent, { weizhi });
			showAmount = (amountPerBet * multiple * count).toFixed(3);
		}

		return (
			<div className="standard-betting-block" style={style}>
				<div className="standard-betting-block__top">
					<div className="standard-betting-block__amount-per-bet">
						每注
						<div className="betting-input">
							<SelectDropdown
								value={amountPerBet}
								options={amountPerBetOptions}
								// TODO: 實作 - 另一種計算方式
								onChange={value => {
									this.setState({ amountPerBet: value, });
								}}
							/>
						</div>
					</div>
					<div className="standard-betting-block__multiple">
						倍数
						<div className="betting-input">
							<InputNumber
								value={multiple}
								defaultValue={1}
								min={0}
								onChange={value => {
									this.setState({ multiple: value, });
								}}
							/>
						</div>
						<CodeBallButton.Round
							text={5}
							size={CodeBallButton.Round.SizeEnum.MIDDLE}
							onChange={_handleChangeMultiple}
						/>
						<CodeBallButton.Round
							text={10}
							size="middle"
							onChange={_handleChangeMultiple}
						/>
						<CodeBallButton.Round
							text={50}
							size="middle"
							onChange={_handleChangeMultiple}
						/>
						<CodeBallButton.Round
							text={100}
							size="middle"
							onChange={_handleChangeMultiple}
						/>
					</div>
					{_renderAmountBlock()}
				</div>
				<div className="standard-betting-block__bottom">
					<div className="standard-betting-block__bottom-left">
						獎金返点
						<div className="betting-input">
							<SelectDropdown
								options={rebateOptions}
								value={rebateValue}
								onChange={_handleChangeRebateValue}
							/>
						</div>
					</div>
					<div className="standard-betting-block__bottom-right">
						<span>共 <span className="digits">{count}</span> 注，共 <span className="digits">{showAmount}</span> 元</span>
						{/* TODO: 實作 - 梭哈 */}
						{_renderAllInButton()}
						<Button
							outline={Button.OutlineEnums.HOLLOW}
							color={Button.ColorEnums.ORANGE}
							onClick={_handleAddBasket}
							disabled={isBettingDisable(isValidBetting, count)}
						>
							加入号码篮
						</Button>
						<Button
							color={Button.ColorEnums.ORANGE}
							onClick={_handleClickBet}
							disabled={isBettingDisable(isValidBetting, count)}
						>
							一鍵投注
						</Button>
					</div>
				</div>
			</div>
		);
	}
	componentDidMount() {
		const { platformBonus, userBonus, } = this.props;

		const rebateOptions = getRebateOptions(platformBonus, userBonus);
		const rebateValue = rebateOptions[0].value;

		this.setState({
			rebateOptions,
			rebateValue,
		});
	}
}
StandardBettingBlock.propTypes = propTypes;
StandardBettingBlock.defaultProps = defaultProps;

export default StandardBettingBlock;

function getRebateOptions(platform, userBonus) {
	const {
		min: platformMinBonus,
	} = platform;
	const userRebate = calculateRebate(platformMinBonus);
	const platformRebate = calculateRebate(userBonus);

	return [
		{
			label: `${userBonus} - ${userRebate}%`,
			value: userRebate
		},
		{
			label: `${platformMinBonus} - ${platformRebate}%`,
			value: platformRebate
		},
	];
}

function isBettingDisable(isValidBettingFormat, count) {
	return !isValidBettingFormat || count === 0;
}
