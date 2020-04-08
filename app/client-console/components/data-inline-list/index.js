import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import DataInlineListItem from './data-inline-list-item';
import './style.styl';

const PREFIX_CLASS = 'data-inline-list';

const propTypes = {
	className: PropTypes.string,
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
	renderItem: PropTypes.func.isRequired,
	// Function (rowData, index, event) => {}
	onClickItem: PropTypes.func,
};

const defaultProps = {
	onClickItem:() => {},
};

const DataInlineList = ({
	renderItem,
	className = '',
	data = [],
	onClickItem = () => {},
}) => (
	<ul className={cx(PREFIX_CLASS, className)}>
		{data.map((...args) => {
			const [
				rowData,
				index,
			] = args;

			return (
				<DataInlineListItem
					onClick={event => onClickItem(rowData, index, event)}
					key={index}
					prefixClass={PREFIX_CLASS}
				>
					{renderItem(...args)}
				</DataInlineListItem>
			);
		})}
	</ul>
);

DataInlineList.propTypes = propTypes;
DataInlineList.defaultProps = defaultProps;

export default DataInlineList;
