import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	LabelContent,
	InputNumber,
} from 'ljit-react-components';
import { validateInputNumber, } from '../validate';

const propTypes = {
	className: PropTypes.string,
	data: PropTypes.number,
	index: PropTypes.number,
	onChangeCell: PropTypes.func,
};

const defaultProps = {
	onChangeCell: () => {},
};

class InputNumberCell extends Component {
	constructor() {
		super();

		this._handleChangeCell = this._handleChangeCell.bind(this);
	}

	_handleChangeCell(value) {
		const { index, onChangeCell, } = this.props;
		const number = Number(value);
		const multiple = Number.isNaN(number) ? 0 : number;

		return onChangeCell(multiple, index);
	}

	render() {
		const { className, data, } = this.props;
		const { _handleChangeCell, } = this;

		return (
			<LabelContent
				className={className}
				validateStatus={validateInputNumber(data)}
			>
				<InputNumber
					value={data}
					min={0}
					onChange={_handleChangeCell}
				/>
			</LabelContent>
		);
	}

	shouldComponentUpdate(nextProps) {
		if (this.props.data !== nextProps.data) {
			return true;
		}
		return false;
	}
}

InputNumberCell.propTypes = propTypes;
InputNumberCell.defaultProps = defaultProps;

export default InputNumberCell;
