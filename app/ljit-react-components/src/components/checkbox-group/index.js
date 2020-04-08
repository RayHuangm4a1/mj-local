import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import AntdCheckBox from 'antd/lib/checkbox';
import cx from 'classnames';

const propTypes = {
	defaultValue: PropTypes.arrayOf(PropTypes.string),
	value: PropTypes.arrayOf(PropTypes.string),
	name: PropTypes.string,
	options: PropTypes.arrayOf(PropTypes.shape({
		autoFocus: PropTypes.bool,
		checked: PropTypes.bool,
		value: PropTypes.any,
		name: PropTypes.string,
		disabled: PropTypes.bool,
		label: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.node,
		]),
	})),
	onChange: PropTypes.func,
	disabled: PropTypes.bool,
	className: PropTypes.string,
};
const defaultProps = {
	disabled: false,
	className: '',
	onChange: () => {},
};

class CheckBoxGroup extends Component {
	constructor() {
		super();
		this._renderOption = this._renderOption.bind(this);
	}

	_renderOption({
		autoFocus,
		checked,
		value,
		disabled,
		name,
		label,
	} = {}) {
		return (
			<AntdCheckBox
				autoFocus={autoFocus}
				checked={checked}
				value={value}
				disabled={disabled}
				key={value}
				name={name}
				className="ljit-checkbox-group__option"
			>
				{label}
			</AntdCheckBox>
		);
	}

	render() {
		const {
			name,
			options,
			defaultValue,
			value,
			disabled,
			onChange,
			className,
		} = this.props;

		return (
			<AntdCheckBox.Group
				name={name}
				defaultValue={defaultValue}
				value={value}
				onChange={onChange}
				disabled={disabled}
				className={cx('ljit-checkbox-group', className)}
			>
				{options && options.map(option => this._renderOption(option))}
			</AntdCheckBox.Group>
		);
	}
}

CheckBoxGroup.propTypes = propTypes;
CheckBoxGroup.defaultProps = defaultProps;

export default CheckBoxGroup;
