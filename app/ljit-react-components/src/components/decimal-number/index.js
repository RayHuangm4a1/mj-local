import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
	isPositiveNumber,
	isNegativeNumber,
	formatNumberToStringWithSeparator,
	addDollarSymbol,
	addPercentageSymbol,
	getRoundDownNPlaceDecimal,
} from '../../lib/number-utils';
import './style.styl';

export const PREFIX_CLASS = 'ljit-decimal-number';

const propTypes = {
	data: PropTypes.number,
	isTolerance: PropTypes.bool,
	isCurrency: PropTypes.bool,
	isPercent: PropTypes.bool,
	hasSeparator: PropTypes.bool,
	className: PropTypes.string,
	decimalPlaces: PropTypes.number,
};
const defaultProps = {
	isTolerance: false,
	isCurrency: false,
	isPercent: false,
	hasSeparator: false,
	className: '',
	decimalPlaces: 4,
};

const DecimalNumber = ({
	data,
	isTolerance,
	isCurrency,
	isPercent,
	hasSeparator,
	className,
	decimalPlaces,
}) => {
	let result = getRoundDownNPlaceDecimal(data, decimalPlaces);

	if (hasSeparator) {
		result = formatNumberToStringWithSeparator(result);
	}

	if (isCurrency) {
		result = addDollarSymbol(result);
	}

	if (isPercent) {
		result = addPercentageSymbol(result);
	}

	return (
		<span
			className={cx(PREFIX_CLASS, {
				[`${PREFIX_CLASS}--positive`]: isTolerance && isPositiveNumber(data),
				[`${PREFIX_CLASS}--negative`]: isTolerance && isNegativeNumber(data),
			}, className)}
		>
			{result}
		</span>
	);
};

DecimalNumber.propTypes = propTypes;
DecimalNumber.defaultProps = defaultProps;

export default DecimalNumber;
