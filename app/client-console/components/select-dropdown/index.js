import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Select, } from 'ljit-react-components';
import './style.styl';

const { ModeEnums, } = Select;

const propTypes = {
	dropdownClassName: PropTypes.string,
	style: PropTypes.object,
	defaultValue: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.array,
	]),
	options: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.node,
		]),
		value: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]),
	})),
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	onFocus: PropTypes.func,
	disabled: PropTypes.bool,
	placeholder: PropTypes.string,
	className: PropTypes.string,
	mode: PropTypes.oneOf([
		ModeEnums.TAGS,
		ModeEnums.MULTIPLE,
		ModeEnums.DEFAULT,
	]),
};
const defaultProps = {
	options: [],
	onChange: () => {},
	onBlur: () => {},
	onFocus: () => {},
	disabled: false,
	mode: ModeEnums.DEFAULT,
};

class SelectDropdown extends Component {
	render() {
		const {
			dropdownClassName,
			defaultValue,
			value,
			options,
			mode,
			className,
			style,
			placeholder,
			disabled,
			onChange,
			onBlur,
			onFocus,
		} = this.props;

		return (
			<Select
				defaultValue={defaultValue}
				value={value}
				options={options}
				mode={mode}
				className={cx('ljit-select-dropdown', className)}
				style={style}
				placeholder={placeholder}
				disabled={disabled}
				onChange={onChange}
				onBlur={onBlur}
				onFocus={onFocus}
				dropdownClassName={cx('ljit-select-dropdown-menu', dropdownClassName)}
			/>
		);
	}
}

SelectDropdown.propTypes = propTypes;
SelectDropdown.defaultProps = defaultProps;
SelectDropdown.ModeEnums = ModeEnums;

export default SelectDropdown;
