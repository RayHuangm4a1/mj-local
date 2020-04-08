import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import AntdSwitch from 'antd/lib/switch';
import cx from 'classnames';
import 'antd/lib/switch/style';
import './style.styl';

const propTypes = {
	checked: PropTypes.bool,
	disabled: PropTypes.bool,
	className: PropTypes.string,
	// Function(checked: boolean, event: Event)
	onChange: PropTypes.func,
};
const defaultProps = {
	checked: false,
	disabled: false,
	onChange: () => {},
};

class Switch extends Component {
	render() {
		const {
			checked,
			disabled,
			className,
			onChange,
		} = this.props;

		return (
			<AntdSwitch
				checked={checked}
				disabled={disabled}
				className={cx('ljit-switch', {
					'ljit-switch--checked': checked === true,
				}, className)}
				onChange={onChange}
			/>
		);
	}
}

Switch.propTypes = propTypes;
Switch.defaultProps = defaultProps;

export default Switch;
