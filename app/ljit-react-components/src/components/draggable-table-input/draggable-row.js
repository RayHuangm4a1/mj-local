import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Draggable,
} from 'react-beautiful-dnd';
import cx from 'classnames';
import { omit, } from 'lodash';
import { PREFIX_CLASS, } from './utils';

const rowClassName = `${PREFIX_CLASS}__row`;

const propTypes = {
	draggableId: PropTypes.string.isRequired,
	rowIndex: PropTypes.number.isRequired,
	children: PropTypes.any,
	className: PropTypes.string,
};
const defaultProps = {};

class DraggableRow extends Component {
	render() {
		const {
			draggableId,
			rowIndex,
			children,
			className,
		} = this.props;
		const childProps = omit(this.props, ['draggableId', 'rowIndex', 'className']);

		return (
			<Draggable
				draggableId={draggableId}
				key={rowIndex}
				index={rowIndex}
			>
				{(provided, snapshot) => (
					<tr
						{...childProps}
						ref={provided.innerRef}
						className={cx(rowClassName, {
							[`${rowClassName}--dragging`]: snapshot.isDragging,
						}, className)}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
					>
						{children}
					</tr>
				)}
			</Draggable>
		);
	}
}

DraggableRow.propTypes = propTypes;
DraggableRow.defaultProps = defaultProps;

export default DraggableRow;
