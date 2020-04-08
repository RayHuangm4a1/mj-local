import React from 'react';
import cx from 'classnames';

const ComponentItem = (props) => {
	const { children, className } = props;
	return (
		<div
			{...props}
			className={cx('component-block__item', className)}
		>
			{children}
		</div>
	);
};

export default ComponentItem;
