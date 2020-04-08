import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import BettingCheckout from '../betting-checkout';
import { InputNumber } from 'ljit-react-components';

const propTypes = {
	bettingCount: PropTypes.number,
	balance: PropTypes.number,
	isDisabled: PropTypes.bool,
	onClickBet: PropTypes.func,
	onChangeValue: PropTypes.func,
};
const defaultProps = {
	bettingCount: 0,
	balance: 0,
	onClickBet: () => {},
	onChangeValue: () => {},
};

class XinYongBettingCheckout extends Component {
	constructor() {
		super();
		this.state = {
			amountPerBet: 0,
		};
		this._handleChangeAmountPerBet = this._handleChangeAmountPerBet.bind(this);
		this._renderAmountPerBetInput = this._renderAmountPerBetInput.bind(this);
		this._renderBettingText = this._renderBettingText.bind(this);
	}
	_handleChangeAmountPerBet(amountPerBet) {
		this.setState({
			amountPerBet
		});
		this.props.onChangeValue(amountPerBet);
	}
	_renderBettingText() {
		const { bettingCount } = this.props;

		return (
			<div className="ljit-mobile-betting-checkout__betting-text">
				已选 <span> {bettingCount} </span> 注
			</div>
		);
	}
	_renderAmountPerBetInput() {
		const { amountPerBet } = this.state;
		const { _handleChangeAmountPerBet } = this;

		return (
			<div className="ljit-mobile-betting-checkout__betting-input">
				<div>
					每注金額
				</div>
				<InputNumber
					formatType={InputNumber.FormatTypeEnums.YUAN}
					value={amountPerBet}
					onChange={_handleChangeAmountPerBet}
				></InputNumber>
			</div>
		);
	}
	render() {
		const {
			_renderBettingText,
			_renderAmountPerBetInput,
		} = this;
		const { 
			balance,
			isDisabled,
			onClickBet,
		} = this.props;

		return (
			<BettingCheckout
				bettingText={_renderBettingText()}
				left={_renderAmountPerBetInput()}
				onClickBet={onClickBet}
				balance={balance}
				isDisabled={isDisabled}
			/>
		);
	}
}

XinYongBettingCheckout.propTypes = propTypes;
XinYongBettingCheckout.defaultProps = defaultProps;

export default XinYongBettingCheckout;
