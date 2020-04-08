import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Button, DecimalNumber } from 'ljit-react-components';
const PREFIX_CLASS = 'ljit-mobile-betting-checkout';

const propTypes = {
	bettingText: PropTypes.node,
	buttonText: PropTypes.string,
	left: PropTypes.node,
	onClickBet: PropTypes.func,
	balance: PropTypes.number,
	isDisabled: PropTypes.bool,
};

const defaultProps = {
	buttonText: '一键投注',
	onClickBet: () => {},
	balance: 0,
	isDisabled: false,
};

class BettingCheckout extends Component {
	render() {
		const {
			bettingText,
			buttonText,
			left,
			onClickBet,
			balance,
			isDisabled,
		} = this.props;

		return (
			<div className={PREFIX_CLASS}>
				{bettingText}
				<div className={`${PREFIX_CLASS}__content`}>
					{left}
					<Button
						color={Button.ColorEnums.ORANGE}
						className={`${PREFIX_CLASS}__betting-button`}
						onClick={onClickBet}
						disabled={isDisabled}
					>
						<p>
							{buttonText}
							<br/>
							<span>(余额 {<DecimalNumber data={balance} hasSeparator decimalPlaces={2}/>} 元)</span>
						</p>
					</Button>
				</div>
			</div>
		);
	}
}

BettingCheckout.propTypes = propTypes;
BettingCheckout.defaultProps = defaultProps;

export default BettingCheckout;
