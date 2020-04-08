import React, { Component, } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	record: PropTypes.object,
	children: PropTypes.any,
	rowIndex: PropTypes.number,
	renderField: PropTypes.func,
	onChange: PropTypes.func,
};

class Cell extends Component {
	constructor() {
		super();
	}

	render() {
		const { record, children, rowIndex, onChange, renderField, } = this.props;

		if (typeof renderField !== 'function') {
			return <td>{children}</td>;
		} else {
			return <td>{renderField(record, rowIndex, onChange)}</td>;
		}
	}
}

Cell.propTypes = propTypes;

export default Cell;