import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	DecimalNumber,
} from 'ljit-react-components';

const propTypes = {
	className: PropTypes.string,
	data: PropTypes.number,
	isPercent: PropTypes.bool,
};

const defaultProps = {
	isPercent: false,
};

class NumberCell extends Component {
	constructor() {
		super();
	}
	render() {
		const { className, data, isPercent, } = this.props;

		return (
			<DecimalNumber
				className={className}
				data={data}
				hasSeparator
				isPercent={isPercent}
			/>
		);
	}

	shouldComponentUpdate(nextProps) {
		if (this.props.data !== nextProps.data) {
			return true;
		}
		return false;
	}
}

NumberCell.propTypes = propTypes;
NumberCell.defaultProps = defaultProps;

export default NumberCell;
