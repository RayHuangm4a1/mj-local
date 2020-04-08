import React, { Children, } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import {
	Row,
	Col,
} from 'ljit-react-components';

const PREFIX_CLASS = 'betting-record-detail-list';
const colSpans = [7, 6, 6, 5,];

const propTypes = {
	className: PropTypes.string,
	children: PropTypes.arrayOf(PropTypes.element),
};

const BettingRecordDetailList = ({ children = [], className, }) => {
	let cols = null;

	if (Children.count(children)) {
		cols = Children.map(children, (child, index) => {
			const colSpan = getColSpan(index);

			return (
				<Col key={index} span={colSpan}>
					{child}
				</Col>
			);
		});
	}

	return (
		<Row className={cx(PREFIX_CLASS, className)}>
			{cols}
		</Row>
	);
};

BettingRecordDetailList.propTypes = propTypes;

function getColSpan(childIndex = 0) {
	const colSpansIndex = childIndex % colSpans.length;

	return colSpans[colSpansIndex];
}

export default BettingRecordDetailList;
