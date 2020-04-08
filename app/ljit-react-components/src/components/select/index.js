import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Select as AntdSelect, } from 'antd';
import cx from 'classnames';

const ModeEnums = {
	TAGS: 'tags',
	MULTIPLE: 'multiple',
	DEFAULT: 'default',
};

const propTypes = {
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
		value: PropTypes.string,
	})),
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	onFocus: PropTypes.func,
	disabled: PropTypes.bool,
	placeholder: PropTypes.string,
	className: PropTypes.string,
	dropdownClassName: PropTypes.string,
	mode: PropTypes.oneOf([
		ModeEnums.TAGS,
		ModeEnums.MULTIPLE,
		ModeEnums.DEFAULT,
	]),
	isShowSearch: PropTypes.bool,
	filterOption: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.func,
	]),
};
const defaultProps = {
	options: [],
	onChange: () => {},
	onBlur: () => {},
	onFocus: () => {},
	disabled: false,
	mode: ModeEnums.DEFAULT,
	isShowSearch: false,
	filterOption: true,
};

class Select extends Component {
	constructor() {
		super();
		this._renderOption = this._renderOption.bind(this);
	}

	_renderOption({ label, value, } = {}) {
		return <AntdSelect.Option className="ljit-form-select__option" key={value} value={value}>{label}</AntdSelect.Option>;
	}

	render() {
		const {
			style,
			options,
			defaultValue,
			value,
			onChange,
			onBlur,
			onFocus,
			disabled,
			placeholder,
			className,
			dropdownClassName,
			mode,
			isShowSearch,
			filterOption,
		} = this.props;

		return (
			<AntdSelect
				defaultValue={defaultValue}
				value={value}
				style={style}
				onChange={onChange}
				onBlur={onBlur}
				onFocus={onFocus}
				disabled={disabled}
				placeholder={placeholder}
				mode={mode}
				className={cx('ljit-form-select', className)}
				dropdownClassName={dropdownClassName}
				showSearch={isShowSearch}
				filterOption={filterOption}
			>
				{options && options.map(this._renderOption)}
			</AntdSelect>
		);
	}
}

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;
Select.ModeEnums = ModeEnums;

export default Select;
