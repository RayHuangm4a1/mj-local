import React, { Component, } from 'react';
import AntdInput from 'antd/lib/input';
import PropTypes from 'prop-types';
import cx from 'classnames';

const propTypes = {
	disabled: PropTypes.bool,
	id: PropTypes.string,
	value: PropTypes.string,
	placeholder: PropTypes.string,
	className: PropTypes.string,
	readOnly: PropTypes.bool,
	style: PropTypes.object,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	onPressEnter: PropTypes.func,
	onSearch: PropTypes.func,
};
const defaultProps = {
	disabled: false,
	readOnly: false,
	placeholder: '请输入',
	onChange: () => {},
	onFocus: () => {},
	onBlur: () => {},
	onPressEnter: () => {},
	onSearch: () => {},
};

class InputSearch extends Component {
	render() {
		const {
			disabled,
			id,
			value,
			placeholder,
			readOnly,
			className,
			style,
			onChange,
			onFocus,
			onBlur,
			onPressEnter,
			onSearch,
		} = this.props;

		return (
			<AntdInput.Search
				disabled={disabled}
				id={id}
				type="text"
				value={value}
				placeholder={placeholder}
				readOnly={readOnly}
				className={cx('ljit-input-search form-field', className)}
				style={style}
				onChange={onChange}
				onFocus={onFocus}
				onBlur={onBlur}
				onPressEnter={onPressEnter}
				onSearch={onSearch}
			/>
		);
	}
}

InputSearch.propTypes = propTypes;
InputSearch.defaultProps = defaultProps;

export default InputSearch;
