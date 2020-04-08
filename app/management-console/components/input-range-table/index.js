import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { InputDynamicTable } from 'ljit-react-components';
import './style.styl';

const propTypes = {
	rangeConfig: PropTypes.shape({
		minKey: PropTypes.string,
		maxKey: PropTypes.string,
		offset: PropTypes.number,
	}).isRequired,
	value: PropTypes.arrayOf(PropTypes.object),
	selectedKey: PropTypes.string,
	onChange: PropTypes.func.isRequired,
};

const defaultProps = {
	value: [],
	selectedKey: 'isSelected',
};

class InputRangeTable extends Component {
	constructor(props) {
		super(props);

		this._handleChange = this._handleChange.bind(this);
	}

	_handleChange(value) {
		const { onChange, rangeConfig, } = this.props;
		const { minKey, maxKey, offset, } = rangeConfig;
		const updatedValue = [...value];

		updatedValue.forEach((_v, index, value) => {
			if (index > 0) {
				const previousRow = value[index - 1];
				if (!previousRow[maxKey]) {
					previousRow[maxKey] = previousRow[minKey];
				}
				_v[minKey] = previousRow[maxKey] + offset;
			} else {
				_v[minKey] = 0;
			}
		});

		onChange(updatedValue);
	}

	render() {
		const { value, selectedKey, } = this.props;
		const { _handleChange, } = this;
		const valueLength = value.length;
		const isLastRowSelected = valueLength ? value[valueLength - 1][selectedKey] : false;

		return (
			<div className="ljit-input-range-table">
				<InputDynamicTable
					{...this.props}
					onChange={_handleChange}
					isAddingRowButtonDisabled={isLastRowSelected}
				/>
			</div>
		);
	}
}

InputRangeTable.propTypes = propTypes;
InputRangeTable.defaultProps = defaultProps;

export default InputRangeTable;
