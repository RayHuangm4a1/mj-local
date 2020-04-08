import React from 'react';
import PropTypes from 'prop-types';
import { Select, Button, IconButton, InputNumber, } from 'ljit-react-components';
import { amountPerBetOptions } from '../../lib/betting-utils';
import './style.styl';

const PREFIX_CLASS = 'ljit-mobile-betting-amount-select-block';

const propTypes = {
	multiple: PropTypes.number,
	amountPerBet: PropTypes.number,
	onClickClearAll: PropTypes.func,
	onClickRefreshBalance: PropTypes.func,
	onChangeAmountPerBet: PropTypes.func,
	onChangeMultiple: PropTypes.func,
};

const defaultProps = {
	onClickClearAll: () => {},
	onClickRefreshBalance: () => {},
	onChangeAmountPerBet: () => {},
	onChangeMultiple: () => {},
};

function MobileBettingAmoutSelectBlock({
	multiple,
	amountPerBet,
	onClickClearAll,
	onClickRefreshBalance,
	onChangeAmountPerBet,
	onChangeMultiple,
}) {
	function _handleChangeMultiple(value) {
		if (value && value > 1) {
			onChangeMultiple(value);
		} else {
			onChangeMultiple(1);
		}
	}
	function _handlePlusMultiple() {
		_handleChangeMultiple(multiple + 1);
	}
	function _handleMinusMultiple() {
		_handleChangeMultiple(multiple - 1);
	}

	return (
		<div className={PREFIX_CLASS}>
			<div className={`${PREFIX_CLASS}__item`}>
				<div className={`${PREFIX_CLASS}__item-title`}>单注金额</div>
				<Select
					value={amountPerBet}
					options={amountPerBetOptions}
					onChange={onChangeAmountPerBet}
				/>
			</div>
			<div className={`${PREFIX_CLASS}__item`}>
				<div className={`${PREFIX_CLASS}__item-title`}>倍数</div>
				<div className={`${PREFIX_CLASS}__multiple-block`}>
					<Button
						onClick={_handleMinusMultiple}
						outline={Button.OutlineEnums.HOLLOW}
						color={Button.ColorEnums.GREYISHBROWN}
					>
						-
					</Button>
					<InputNumber
						value={multiple}
						defaultValue={1}
						min={1}
						onChange={_handleChangeMultiple}
						formatType={InputNumber.FormatTypeEnums.MULTIPLE}
					/>
					<Button
						onClick={_handlePlusMultiple}
						outline={Button.OutlineEnums.HOLLOW}
						color={Button.ColorEnums.GREYISHBROWN}
					>
						+
					</Button>
				</div>
			</div>
			<div className={`${PREFIX_CLASS}__item`}>
				<div className={`${PREFIX_CLASS}__item-title`}>全清</div>
				<IconButton
					type={IconButton.IconTypeEnums.TRASH2}
					size={IconButton.SizeEnums.SMALL}
					onClick={onClickClearAll}
				/>
			</div>
			<div className={`${PREFIX_CLASS}__item`}>
				<div className={`${PREFIX_CLASS}__item-title`}>余额</div>
				<IconButton
					type={IconButton.IconTypeEnums.REFRESH}
					size={IconButton.SizeEnums.SMALL}
					onClick={onClickRefreshBalance}
				/>
			</div>

		</div>
	);
}

MobileBettingAmoutSelectBlock.propTypes = propTypes;
MobileBettingAmoutSelectBlock.defaultProps = defaultProps;

export default MobileBettingAmoutSelectBlock;
