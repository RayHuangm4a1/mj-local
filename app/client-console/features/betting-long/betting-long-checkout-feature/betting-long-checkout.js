import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
	Button,
	InputNumber,
	DecimalNumber,
} from 'ljit-react-components';
import ChipGroup from './chip-group';

export const PREFIX_CLASS = 'betting-long-checkout';

const propTypes = {
	className: PropTypes.string,
	betCount: PropTypes.number,
	betAmount: PropTypes.number,
	balance: PropTypes.number,
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
	inputValue: 0,
	onSubmit: () => {},
	onReset: () => {},
	onChangeInputValue: () => {},
};

class BettingLongCheckout extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			className,
			betCount,
			betAmount,
			balance,
			onSubmit,
			onReset,
			inputValue,
			onChangeInputValue,
		} = this.props;

		return (
			<div className={cx(PREFIX_CLASS, className)}>
				<div className={`${PREFIX_CLASS}__input`}>
					快选金额:
					<InputNumber
						min={0.001}
						step={0.001}
						placeholder=""
						value={inputValue}
						onChange={onChangeInputValue}
					/>
				</div>
				<ChipGroup onClick={onChangeInputValue}/>
				<div className={`${PREFIX_CLASS}__balance`}>
					<div>
						共 { betCount } 注，共 <DecimalNumber data={betAmount} hasSeparator/> 元
					</div>
					<div>
						余额 <DecimalNumber data={balance} hasSeparator/> 元
					</div>
				</div>
				<div className={`${PREFIX_CLASS}__button`}>
					<Button
						outline={Button.OutlineEnums.HOLLOW}
						color={Button.ColorEnums.WARMORANGE700}
						className={`${PREFIX_CLASS}__reset__button`}
						onClick={onReset}
					>
						清空选号
					</Button>
					<Button
						color={Button.ColorEnums.WARMORANGE700}
						className={`${PREFIX_CLASS}__submit__button`}
						onClick={onSubmit}
					>
						下注
					</Button>
				</div>
			</div>
		);
	}
}

BettingLongCheckout.propTypes = propTypes;
BettingLongCheckout.defaultProps = defaultProps;

export default BettingLongCheckout;
