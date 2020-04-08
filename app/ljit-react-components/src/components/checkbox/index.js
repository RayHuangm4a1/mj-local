import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import AntdCheckBox from 'antd/lib/checkbox';
import cx from 'classnames';
import 'antd/lib/checkbox/style';
import './style.styl';

const TypeEnums = {
	CIRCLE: 'circle',
};

const {
	CIRCLE,
} = TypeEnums;

const propTypes = {
	value: PropTypes.bool,
	autoFocus: PropTypes.bool,
	disabled: PropTypes.bool,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	name: PropTypes.string,
	className: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	type: PropTypes.oneOf(Object.values(TypeEnums).concat('')),
};
const defaultProps = {
	autoFocus: false,
	value: false,
	disabled: false,
	className: '',
	onChange: () => {},
	onFocus: () => {},
	onBlur: () => {},
};

class CheckBox extends Component {
	render() {
		const {
			value,
			autoFocus,
			disabled,
			onChange,
			onFocus,
			onBlur,
			name,
			className,
			children,
			type,
		} = this.props;

		return (
			<AntdCheckBox
				autoFocus={autoFocus}
				checked={value}
				disabled={disabled}
				onChange={onChange}
				onFocus={onFocus}
				onBlur={onBlur}
				name={name}
				className={cx('ljit-checkbox', className, 
					{ [`ljit-checkbox--circle`] : type === CIRCLE, }
				)}
			>
				{children}
			</AntdCheckBox>
		);
	}
}

CheckBox.propTypes = propTypes;
CheckBox.defaultProps = defaultProps;
CheckBox.TypeEnums = TypeEnums;

export default CheckBox;
