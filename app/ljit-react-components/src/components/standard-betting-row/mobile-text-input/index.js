import React from 'react';
import PropTypes from 'prop-types';
import InputTextarea from '../../input-textarea';
import cx from 'classnames';
import './style.styl';

const PREFIX_CLASS = 'ljit-mobile-text-input';

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

function MobileStandardBettingRowTextInput({
	data,
	placeholder,
	onChangeText,
}) {
	return (
		<InputTextarea
			maxRows={10}
			minRows={10}
			className={cx(PREFIX_CLASS)}
			placeholder={placeholder}
			onChange={(event) => {onChangeText(event.target.value);}}
			value={data}
		/>
	);
}

MobileStandardBettingRowTextInput.propTypes = propTypes;
MobileStandardBettingRowTextInput.defaultProps = defaultProps;

export default MobileStandardBettingRowTextInput;
