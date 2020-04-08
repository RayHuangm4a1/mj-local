import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './style.styl';

const propTypes = {
	data: PropTypes.arrayOf(PropTypes.object),
	titleKey: PropTypes.string.isRequired,
	contentKey: PropTypes.string.isRequired,
	className: PropTypes.string,
};
const defaultProps = {
	data: [],
};

const prefixClass = 'ljit-two-columns-list';

const TwoColumnsList = ({
	className,
	data,
	titleKey,
	contentKey,
}) => {
	const halfLength = Math.ceil(data.length / 2);
	const leftList = data.slice(0, halfLength);
	const rightList = data.slice(halfLength);
	const dataKeys = { titleKey, contentKey, };

	return (
		<div className={cx(prefixClass, className)}>
			<div className={`${prefixClass}__list`}>
				{renderList(leftList, dataKeys)}
			</div>
			<div className={`${prefixClass}__list`}>
				{renderList(rightList, dataKeys)}
			</div>
		</div>
	);
};

TwoColumnsList.propTypes = propTypes;
TwoColumnsList.defaultProps = defaultProps;

function renderList(list = [], dataKeys = {}) {
	return (
		<table className={`${prefixClass}__table`}>
			<tbody>
				{list.map((item, index) => (
					<tr key={index}>
						<td>
							{item[dataKeys.titleKey]}
						</td>
						<td>
							{item[dataKeys.contentKey]}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default TwoColumnsList;
