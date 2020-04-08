import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumbs, BreadcrumbsProvider, } from 'react-breadcrumbs-dynamic';
import cx from 'classnames';
import BreadcrumbItem from './item';
import './style.styl';

export const prefixClass = 'ljit-breadcrumb';

const propTypes = {
	className: PropTypes.string,
	Item: PropTypes.element,
};

const Breadcrumb = ({
	className,
	Item = 'a',
}) => {
	const itemClass = `${prefixClass}__item`;

	return (
		<Breadcrumbs
			container={(containerProps) => (
				<div
					{...containerProps}
					className={cx(prefixClass, className)}
				/>
			)}
			item={(itemProps) => {
				if (itemProps['data-isactive'] === true) {
					return <Item {...itemProps} />;
				}
				return React.createElement('span', itemProps);
			}}
			separator={<span className={`${prefixClass}__separator`}>/</span>}
			finalItem={'span'}
			finalProps={{
				className: `${itemClass} ${itemClass}--inactive`,
			}}
		/>
	);
};

Breadcrumb.propTypes = propTypes;

Breadcrumb.BreadcrumbProvider = BreadcrumbsProvider;
Breadcrumb.BreadcrumbItem = BreadcrumbItem;

export default Breadcrumb;
