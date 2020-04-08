import React, { Component, } from 'react';
import PropTypes from 'prop-types';

import '../style.styl';

import BettingWeizhiBlock from '../../betting-weizhi-block';
import StandardBettingRow from '../../standard-betting-row';

const CLASS_PREFIX = 'ljit-betting-element-input';

class TextInputBettingElementInput extends Component {
	constructor(props) {
		super(props);

		this._handlePressCheckbox = this._handlePressCheckbox.bind(this);
		this._handleClearText = this._handleClearText.bind(this);
		this._renderCheckboxRow = this._renderCheckboxRow.bind(this);
		this._renderTextInput = this._renderTextInput.bind(this);
	}

	_handlePressCheckbox(index) {
		this.props.onSelectPosition(index);
	}

	_handleClearText() {
		this.props.onChangeText('');
	}

	_renderCheckboxRow() {
		const {
			positions,
			positionDescription,
		} = this.props;

		const { _handlePressCheckbox, } = this;

		if (positions.length > 0) {
			return (
				<BettingWeizhiBlock
					className={`${CLASS_PREFIX}__weizhi-block`}
					options={positions}
					description={positionDescription}
					onPressCheckbox={_handlePressCheckbox}
				/>
			);
		}
	}

	_renderTextInput() {
		const {
			data,
			placeholder,
			onChangeText,
			isMobile,
		} = this.props;

		const StandardBettingRowTextInput = StandardBettingRow[isMobile ? 'MobileTextInput' : 'TextInput'];

		return (
			<StandardBettingRowTextInput
				data={data}
				placeholder={placeholder}
				onChangeText={onChangeText}
			/>
		);
	}

	render() {
		const {
			_renderCheckboxRow,
			_renderTextInput,
		} = this;

		return (
			<div>
				{_renderCheckboxRow()}
				{_renderTextInput()}
			</div>
		);
	}
}

TextInputBettingElementInput.propTypes = {
	positions: PropTypes.array,
	positionDescription: PropTypes.string,
	data: PropTypes.string,
	placeholder: PropTypes.string,
	onChangeText: PropTypes.func,
	onSelectPosition: PropTypes.func,
	isMobile: PropTypes.bool,
};

TextInputBettingElementInput.defaultProps = {
	positions: [],
	positionDescription: '',
	data: '',
	placeholder: '',
	onChangeText: () => {},
	onSelectPosition: () => {},
	isMobile: false,
};

export default TextInputBettingElementInput;
