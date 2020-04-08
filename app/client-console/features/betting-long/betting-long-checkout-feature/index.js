import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BettingLongCheckout from './betting-long-checkout';
import { connect } from 'ljit-store-connecter';
import './style.styl';

// TODO 和信用整合

const propTypes = {
	className: PropTypes.string,
	bettingsData: PropTypes.arrayOf(PropTypes.shape({
		play: PropTypes.shape({
			_id: PropTypes.string,
			id: PropTypes.number,
			name: PropTypes.string,
			bonus: PropTypes.number,
			odds: PropTypes.number,
			lottery: PropTypes.string,
		}),
		name: PropTypes.string,
		betcontent: PropTypes.string,
		weizhi: PropTypes.string,
		multiple: PropTypes.number,
		amountPerBet: PropTypes.number,
		rebate: PropTypes.number,
		amount: PropTypes.number,
	})),
};

const defaultProps = {
	className: '',
	bettingsData: [
		{
			play: {
				_id: '1234123412341234',
				lottery: '重庆时时彩',
				id: 15,
				name: '五星直選複式',
				bonus: 1.987,
			},
			name: '五星直選複式',
			betcontent: '1,1,1,1,1',
			multiple: 1,
			amountPerBet: 1,
			count: 2,
			amount: 2,
			rebate: 0,
		},
		{
			play: {
				_id: '1234123412341234',
				lottery: '重庆时时彩',
				id: 16,
				name: '五星直選複式',
				bonus: 1.987,
			},
			name: '五星直選複式',
			betcontent: '2,2,2,2,2',
			multiple: 1,
			amountPerBet: 1,
			count: 2,
			amount: 2,
			rebate: 0,
		},
		{
			play: {
				_id: '1234123412341234',
				lottery: '重庆时时彩',
				id: 16,
				name: '五星直選複式',
				bonus: 1.987,
			},
			name: '五星直選複式',
			betcontent: '3,3,3,3,3',
			multiple: 1,
			amountPerBet: 1,
			count: 2,
			amount: 2,
			rebate: 0,
		},
		{
			play: {
				_id: '1234123412341234',
				lottery: '重庆时时彩',
				id: 16,
				name: '五星直選複式',
				bonus: 1.987,
			},
			name: '五星直選複式',
			betcontent: '4,4,4,4,4',
			multiple: 1,
			amountPerBet: 1,
			count: 2,
			amount: 2,
			rebate: 0,
		},
		{
			play: {
				_id: '1234123412341234',
				lottery: '重庆时时彩',
				id: 16,
				name: '五星直選複式',
				bonus: 1.987,
			},
			name: '五星直選複式',
			betcontent: '5,5,5,5,5',
			multiple: 1,
			amountPerBet: 1,
			count: 2,
			amount: 2,
			rebate: 0,
		},
		{
			play: {
				_id: '1234123412341234',
				lottery: '重庆时时彩',
				id: 16,
				name: '五星直選複式',
				bonus: 1.987,
			},
			name: '五星直選複式',
			betcontent: '6,6,6,6,6',
			multiple: 1,
			amountPerBet: 1,
			count: 2,
			amount: 2,
			rebate: 0,
		},
		{
			play: {
				_id: '1234123412341234',
				lottery: '重庆时时彩',
				id: 16,
				name: '五星直選複式',
				bonus: 1.987,
			},
			name: '五星直選複式',
			betcontent: '7,7,7,7,7',
			multiple: 1,
			amountPerBet: 1,
			count: 2,
			amount: 2,
			rebate: 0,
		},
		{
			play: {
				_id: '1234123412341234',
				lottery: '重庆时时彩',
				id: 16,
				name: '五星直選複式',
				bonus: 1.987,
			},
			name: '五星直選複式',
			betcontent: '9,9,9,9,9',
			multiple: 1,
			amountPerBet: 1,
			count: 2,
			amount: 2,
			rebate: 0,
		},
	],
};

const MIN_AMOUNT_PER_BET = 0.001;

class BettingLongCheckoutFeature extends Component {
	constructor() {
		super();

		this.state = {
			amountPerBet: 1,
		};

		this._handleChangeAmountPerBet = this._handleChangeAmountPerBet.bind(this);
		this._handleSubmitBettings = this._handleSubmitBettings.bind(this);
	}
	_handleChangeAmountPerBet(amountPerBet) {
		const floatAmountPerBet = parseFloat(amountPerBet);
		const isFloatAmountPerBetNaN = isNaN(floatAmountPerBet);
		const updatedAmountPerBet = !isFloatAmountPerBetNaN ? floatAmountPerBet : MIN_AMOUNT_PER_BET;

		this.setState({ amountPerBet: updatedAmountPerBet, });
	}
	_handleSubmitBettings(bettings) {}

	render() {
		const {
			className,
			bettingsData,
		} = this.props;
		const { amountPerBet, } = this.state;
		const { _handleChangeAmountPerBet, _handleSubmitBettings, } = this;
		const betCount = bettingsData.length;
		const amount = bettingsData.reduce((acc, betting) => {
			return acc + betting.amount;
		}, 0);

		return (
			<BettingLongCheckout
				className={className}
				betCount={betCount}
				betAmount={amount}
				inputValue={amountPerBet}
				onChangeInputValue={_handleChangeAmountPerBet}
				onSubmit={_handleSubmitBettings}
				onReset={() => {}}
			/>
		);
	}
}

BettingLongCheckoutFeature.propTypes = propTypes;
BettingLongCheckoutFeature.defaultProps = defaultProps;

function mapStateToProps(state) {
	return {
		// TODO add reducer state to props
	};
}

function mapDispatchToProps(dispatch) {
	return {
		// TODO add betting long betting actions
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(BettingLongCheckoutFeature);
