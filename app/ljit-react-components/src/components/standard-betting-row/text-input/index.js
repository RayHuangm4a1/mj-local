import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import InputTextarea from '../../input-textarea';
import Button from '../../button';
import cx from 'classnames';
import './style.styl';

export const PREFIX_CLASS = 'ljit-text-input';

const propTypes = {
	data: PropTypes.string,
	placeholder: PropTypes.string,
	onChangeText: PropTypes.func,
};

const defaultProps = {
	data: '',
	placeholder: '',
	onChangeText: () => {},
};


class StandardBettingRowTextInput extends Component {
	constructor(prop) {
		super(prop);
		this._handleImportFile = this._handleImportFile.bind(this);
		this._handleDeleteRepeatNumber = this._handleDeleteRepeatNumber.bind(this);
		this._handleResetInputText = this._handleResetInputText.bind(this);
	}

	_handleImportFile() {
		// TODO import file and show file content in input value
		console.log('test');
	}

	_handleDeleteRepeatNumber() {
		const { data, onChangeText, } = this.props;
		const noRepeatData = data
			.replace(/[,|;|\r\n]/g, ' ')
			.split(' ')
			.filter((item, index, array) => array.indexOf(item) === index && item)
			.join(' ');

		onChangeText(noRepeatData);
	}

	_handleResetInputText() {
		this.props.onChangeText('');
	}

	render() {
		const {  _handleImportFile, _handleDeleteRepeatNumber, _handleResetInputText, } = this;
		const { data, placeholder, onChangeText, } = this.props;

		return (
			<div className={cx(PREFIX_CLASS)}>
				<div className="ljit-text-input__button-group">
					<Button className="ljit-text-input__button" onClick={_handleImportFile}> 导入注单 </Button>
					<Button className="ljit-text-input__button" onClick={_handleDeleteRepeatNumber}> 删除重复号 </Button>
					<Button className="ljit-text-input__button" onClick={_handleResetInputText}> 清 空 </Button>
				</div>
				<InputTextarea
					maxRows={7}
					minRows={7}
					placeholder={placeholder}
					onChange={ (event) => {onChangeText(event.target.value);} }
					value={data}
				/>
			</div>
		);
	}
}

StandardBettingRowTextInput.propTypes = propTypes;
StandardBettingRowTextInput.defaultProps = defaultProps;

export default StandardBettingRowTextInput;
