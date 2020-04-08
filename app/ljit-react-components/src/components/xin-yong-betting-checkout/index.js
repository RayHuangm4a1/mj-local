import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import InputNumber from '../input-number';
import DecimalNumber from '../decimal-number';
import './style.styl';
import ChipGroup from './chip-group';
import cx from 'classnames';

export const PREFIX_CLASS = 'ljit-xin-yong-betting-checkout';

const propTypes = {
	betCount: PropTypes.number,
	betAmount: PropTypes.number,
	balance: PropTypes.number,
	isSquare: PropTypes.bool,
	onSubmit: PropTypes.func,
	onReset: PropTypes.func,
	inputValue: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]),
	onChangeInputValue: PropTypes.func,
};

const defaultProps = {
	betCount: 0,
	balance: 0,
	betAmount: 0,
	isSquare: false,
	inputValue: 0,
	onSubmit: () => {},
	onReset: () => {},
	onChangeInputValue: () => {},
};

class XinYongBettingCheckout extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			betCount,
			betAmount,
			balance,
			isSquare,
			onSubmit,
			onReset,
			inputValue,
			onChangeInputValue,
		} = this.props;

		return (
			<div className={cx(PREFIX_CLASS, { 'ljit-xin-yong-betting-checkout--square': isSquare, })}>
				<div className="ljit-xin-yong-betting-checkout__input">
					快选金额
					<InputNumber
						min={0.001}
						step={0.001}
						placeholder=""
						value={inputValue}
						onChange={onChangeInputValue}
					/>
				</div>
				<ChipGroup onClick={onChangeInputValue}/>
				<div className="ljit-xin-yong-betting-checkout__balance">
					<div>
						共 { betCount } 注，共 <DecimalNumber data={betAmount} hasSeparator/> 元
					</div>
					<div>
						余额 <DecimalNumber data={balance} hasSeparator/>
					</div>
				</div>
				<div className="ljit-xin-yong-betting-checkout__button">
					<Button
						outline={Button.OutlineEnums.HOLLOW}
						color={Button.ColorEnums.WARMORANGE700}
						className="ljit-xin-yong-betting-checkout__reset__button"
						onClick={onReset}
					>清空选号</Button>
					<Button
						color={Button.ColorEnums.WARMORANGE700}
						className="ljit-xin-yong-betting-checkout__submit__button"
						onClick={onSubmit}
					>下注</Button>
				</div>
			</div>
		);
	}
}

XinYongBettingCheckout.propTypes = propTypes;
XinYongBettingCheckout.defaultProps = defaultProps;

export default XinYongBettingCheckout;
