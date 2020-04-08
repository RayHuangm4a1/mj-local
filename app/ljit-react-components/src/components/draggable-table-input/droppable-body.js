import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Droppable,
} from 'react-beautiful-dnd';
import { omit, } from 'lodash';
import cx from 'classnames';
import { PREFIX_CLASS, } from './utils';

const propTypes = {
	droppableId: PropTypes.string.isRequired,
	className: PropTypes.string,
	children: PropTypes.any,
};

class DroppableBody extends Component {
	render() {
		const {
			droppableId,
			children,
			className,
		} = this.props;
		const childProps = omit(this.props, ['droppableId', 'children', 'className']);

		return (
			<Droppable droppableId={droppableId}>
				{(provided) => (
					<tbody
						{...childProps}
						ref={ref => provided.innerRef(ref)}
						{...provided.droppableProps}
						className={cx(`${PREFIX_CLASS}__body`, className)}
					>
						{children}
						{provided.placeholder}
					</tbody>
				)}
			</Droppable>
		);
	}
}

DroppableBody.propTypes = propTypes;

export default DroppableBody;
