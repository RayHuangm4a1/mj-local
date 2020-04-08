import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import BettingCheckout from '../betting-checkout';
import { DecimalNumber } from 'ljit-react-components';

const propTypes = {
	bettingCount: PropTypes.number,
	traceCount: PropTypes.number,
	amount: PropTypes.number,
	balance: PropTypes.number,
	isDisabled: PropTypes.bool,
	onClickBet: PropTypes.func,
};

const defaultProps = {
	bettingCount: 0,
	traceCount: 0,
	amount: 0,
	balance: 0,
	onClickBet: () => {},
};

class TraceBettingCheckout extends Component {
	constructor() {
		super();
		this._renderBettingText = this._renderBettingText.bind(this);
	}
	_renderBettingText() {
		const {
			bettingCount,
			traceCount,
			amount,
		} = this.props;

		return (
			<div className="ljit-mobile-betting-checkout__betting-text">
				共 <span> {bettingCount} </span> 注, 追 <span> {traceCount} </span> 期 总共 <span> <DecimalNumber data={amount} hasSeparator decimalPlaces={2}/> </span> 元
			</div>
		);
	}
	render() {
		const {
			_renderBettingText,
		} = this;
		const {
			balance,
			isDisabled,
			onClickBet,
		} = this.props;

		return (
			<BettingCheckout
				buttonText="投注"
				bettingText={_renderBettingText()}
				onClickBet={onClickBet}
				balance={balance}
				isDisabled={isDisabled}
			/>
		);
	}
}

TraceBettingCheckout.propTypes = propTypes;
TraceBettingCheckout.defaultProps = defaultProps;

export default TraceBettingCheckout;
