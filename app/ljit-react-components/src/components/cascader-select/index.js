import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Cascader as AntdCascader, } from 'antd';
import cx from 'classnames';
import './style.styl';

const optionsShape = {
	label: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	disabled: PropTypes.bool,
};

optionsShape.children = PropTypes.arrayOf(PropTypes.shape(optionsShape));

const propTypes = {
	value: PropTypes.arrayOf(PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	])).isRequired,
	style: PropTypes.object,
	options: PropTypes.arrayOf(PropTypes.shape(optionsShape)).isRequired,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	onFocus: PropTypes.func,
	disabled: PropTypes.bool,
	placeholder: PropTypes.string,
	className: PropTypes.string,
	popupClassName: PropTypes.string,
	isShowAll: PropTypes.bool,
	isAllowClear: PropTypes.bool,
};
const defaultProps = {
	style: {},
	onChange: () => {},
	onBlur: () => {},
	onFocus: () => {},
	disabled: false,
	placeholder: '',
	className: '',
	popupClassName: '',
	isShowAll: false,
	isAllowClear: true,
};

class CascaderSelect extends Component {
	constructor() {
		super();

		this._handleDisplayRender = this._handleDisplayRender.bind(this);
	}

	_handleDisplayRender(labels=[]) {
		const { isShowAll, } = this.props;

		if (isShowAll) {
			return labels.join('/');
		} else {
			return labels[labels.length - 1];
		}
	}

	render() {
		const {
			_handleDisplayRender,
		} = this;
		const {
			value,
			style,
			options,
			onChange,
			onBlur,
			onFocus,
			disabled,
			placeholder,
			className,
			popupClassName,
			isAllowClear,
		} = this.props;

		return (
			<AntdCascader
				value={value}
				style={style}
				options={options}
				expandTrigger="hover"
				onChange={onChange}
				onBlur={onBlur}
				onFocus={onFocus}
				disabled={disabled}
				placeholder={placeholder}
				className={cx('ljit-cascader-select', className)}
				popupClassName={cx('ljit-cascader-select__pop-up', popupClassName)}
				displayRender={_handleDisplayRender}
				allowClear={isAllowClear}
			/>
		);
	}
}

CascaderSelect.propTypes = propTypes;
CascaderSelect.defaultProps = defaultProps;

export default CascaderSelect;
