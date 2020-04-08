import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Badge as AntdBadge, } from 'antd';
import './style.styl';

const MAX_VISIBLE_COUNT = 99;
const PREFIX_CLASS = 'ljit-badge';

const propTypes = {
	className: PropTypes.string,
	count: PropTypes.node,
	overflowCount: PropTypes.number,
	isZeroVisible: PropTypes.bool,
	isBordered: PropTypes.bool,
	children: PropTypes.node,
};

const defaultProps = {
	className: '',
	overflowCount: MAX_VISIBLE_COUNT,
	isZeroVisible: false,
	isBordered: true,
};

const Badge = ({
	className,
	count,
	overflowCount,
	isZeroVisible,
	isBordered,
	children,
}) => (
	<AntdBadge
		className={cx(PREFIX_CLASS, {
			[`${PREFIX_CLASS}--bordered`]: isBordered,
			[`${PREFIX_CLASS}--no-bordered`]: !isBordered,
		}, className)}
		count={count}
		overflowCount={overflowCount}
		showZero={isZeroVisible}
	>
		{children}
	</AntdBadge>
);

Badge.propTypes = propTypes;
Badge.defaultProps = defaultProps;

export default Badge;
