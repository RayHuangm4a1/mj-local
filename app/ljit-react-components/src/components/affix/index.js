import React from 'react';
import { Affix as AntdAffix, } from 'antd';
import PropTypes from 'prop-types';
import cx from 'classnames';

const propTypes = {
	style: PropTypes.object,
	className: PropTypes.string,
	positionToTop: PropTypes.number,
	positionToBottom: PropTypes.number,
	children: PropTypes.any,
	onChange: PropTypes.func,
};
const defaultProps = {
	onChange: () => {},
};

function Affix(props) {
	const {
		style,
		className,
		positionToTop,
		positionToBottom,
		children,
		onChange,
	} = props;

	return (
		<AntdAffix
			style={style}
			className={cx('ljit-affix', className,)}
			offsetBottom={positionToBottom}
			offsetTop={positionToTop}
			onChange={onChange}
		>
			{children}
		</AntdAffix>
	);
}

Affix.propTypes = propTypes;
Affix.defaultProps = defaultProps;

export default Affix;
