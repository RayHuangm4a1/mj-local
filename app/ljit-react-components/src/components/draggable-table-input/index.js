import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, } from 'antd';
import {
	DragDropContext,
} from 'react-beautiful-dnd';
import cx from 'classnames';
import DroppableBody from './droppable-body';
import DragableRow from './draggable-row';
import { PREFIX_CLASS, reorder, } from './utils';
import './style.styl';

const AlignTypeEnums = {
	LEFT: 'left',
	CENTER: 'center',
	RIGHT: 'right',
};
const {
	LEFT,
	CENTER,
	RIGHT,
} = AlignTypeEnums;

const propTypes = {
	// string|Function(record):string
	rowKey: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.func,
	]).isRequired,
	tableName: PropTypes.string.isRequired,
	value: PropTypes.arrayOf(PropTypes.object),
	columns: PropTypes.arrayOf(PropTypes.shape({
		dataIndex: PropTypes.string.isRequired,
		title: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.node,
		]).isRequired,
	})).isRequired,
	alignType: PropTypes.oneOf([
		LEFT,
		CENTER,
		RIGHT,
	]),
	isDragColumnVisible: PropTypes.bool,
	onChange: PropTypes.func,
	className: PropTypes.string,
};
const defaultProps = {
	value: [],
	columns: [],
	alignType: CENTER,
	isDragColumnVisible: true,
	onChange: () => {},
	className: '',
};

class DraggableTableInput extends Component {
	constructor() {
		super();
		this._getKey = this._getKey.bind(this);
		this._getColumns = this._getColumns.bind(this);
		this._handleSetRowProps = this._handleSetRowProps.bind(this);
		this._handleDragEnd = this._handleDragEnd.bind(this);
		this._renderSubComponents = this._renderSubComponents.bind(this);
		this._wrapperDroppableBody = this._wrapperDroppableBody.bind(this);
	}

	_getKey(record = {}) {
		const {
			rowKey,
		} = this.props;

		if (typeof rowKey === 'function') {
			return rowKey(record);
		}

		return record[rowKey];
	}

	_getColumns() {
		const {
			isDragColumnVisible,
			columns,
		} = this.props;
		let result = columns.slice();

		if (!isDragColumnVisible) {
			return result;
		}

		const dragColumn = {
			dataIndex: 'drag',
			width: 60,
			render: () => <Icon type="menu" />,
		};

		result.unshift(dragColumn);
		return result;
	}

	_handleSetRowProps(record, rowIndex) {
		const {
			tableName,
		} = this.props;
		const key = this._getKey(record);
		const draggableId = `${tableName}-row-${key}`;

		return {
			record,
			rowIndex,
			draggableId,
		};
	}

	_handleDragEnd(result = {}) {
		const {
			value,
			onChange,
		} = this.props;

		if (
			!result.destination
			|| result.destination.index === result.source.index
		) {
			return;
		}

		const data = reorder(
			value,
			result.source.index,
			result.destination.index,
		);

		onChange(data);
	}
	_wrapperDroppableBody(props) {
		const {
			tableName,
		} = this.props;

		return <DroppableBody {...props} droppableId={tableName} />;
	}

	_renderSubComponents() {
		const { _wrapperDroppableBody, } = this;

		return {
			body: {
				wrapper: _wrapperDroppableBody,
				row: DragableRow,
			},
		};
	}

	render() {
		const {
			rowKey,
			alignType,
			tableName,
			className,
			value,
		} = this.props;
		const columns = this._getColumns();

		return (
			<DragDropContext onDragEnd={this._handleDragEnd}>
				<Table
					rowKey={rowKey}
					className={cx(`${PREFIX_CLASS} ${PREFIX_CLASS}--${tableName}`, {
						[`${PREFIX_CLASS}--align-left`]: alignType === LEFT,
						[`${PREFIX_CLASS}--align-center`]: alignType === CENTER,
						[`${PREFIX_CLASS}--align-right`]: alignType === RIGHT,
					}, className)}
					columns={columns}
					dataSource={value}
					pagination={false}
					onRow={this._handleSetRowProps}
					components={this._renderSubComponents()}
				/>
			</DragDropContext>
		);
	}
}

DraggableTableInput.propTypes = propTypes;
DraggableTableInput.defaultProps = defaultProps;

DraggableTableInput.AlignTypeEnums = AlignTypeEnums;

export default DraggableTableInput;
