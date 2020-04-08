import React from 'react';
import omit from 'lodash/omit';
import cx from 'classnames';
import ComponentItem from './ComponentItem';
import './style.styl';

const ComponentBlock = (props) => {
	const { children, title, className } = props;
	const restProps = omit(props, ['children', 'title'])
	return (
		<div
			{...restProps}
			className={cx('component-block', className)}
		>
			<div className="component-block__title">{title}</div>
			<div className="component-block__content">{children}</div>
		</div>
	);
};

ComponentBlock.Item = ComponentItem;

export default ComponentBlock;
