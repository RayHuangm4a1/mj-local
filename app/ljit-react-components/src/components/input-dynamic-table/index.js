import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import cx from 'classnames';
import { Table as AntdTable, } from 'antd';
import Button from '../button';
import Cell from './cell';
import cloneDeep from 'lodash/cloneDeep';

import './style.styl';

const AlignTypeEnums = {
	LEFT: 'left',
	CENTER: 'center',
	RIGHT: 'right',
};
const { LEFT, CENTER, RIGHT, } = AlignTypeEnums;

const propTypes = {
	tableName: PropTypes.string.isRequired,
	value: PropTypes.arrayOf(PropTypes.object),
	columns: PropTypes.arrayOf(PropTypes.shape({
		dataIndex: PropTypes.string.isRequired,
		title: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.node,
		]).isRequired,
		width: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string,
		]),
		renderField: PropTypes.func,
	})).isRequired,
	alignType: PropTypes.oneOf([
		LEFT,
		CENTER,
		RIGHT,
	]),
	className: PropTypes.string,
	tableClassName: PropTypes.string,
	removingColumnTitle: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element,
	]),
	removingButtonText: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element,
	]),
	addingRowButtonText: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element,
	]),
	hasRemoveButton: PropTypes.bool,
	isAddingRowButtonDisabled: PropTypes.bool,
	isRemovingButtonDisabled: PropTypes.bool,
	isShowOnlyLastRemovingButton: PropTypes.bool,
	onChange: PropTypes.func,
	rowKey: PropTypes.string,
};
const defaultProps = {
	rowKey: 'id',
	value: [],
	alignType: CENTER,
	className: '',
	tableClassName: '',
	removingColumnTitle: '操作',
	removingButtonText: '删除',
	addingRowButtonText: '新增',
	hasRemoveButton: true,
	isAddingRowButtonDisabled: false,
	isRemovingButtonDisabled: false,
	isShowOnlyLastRemovingButton: false,
	onChange: () => {},
};

export const PREFIX_CLASS = 'ljit-input-dynamic-table';
const DELETABLE_FIELD_NAME = 'operation';

class InputDynamicTable extends Component {
	constructor(props) {
		super(props);

		this._handleDelete = this._handleDelete.bind(this);
		this._handleAdd = this._handleAdd.bind(this);
		this._handleChange = this._handleChange.bind(this);

		this._getEditableColumn = this._getEditableColumn.bind(this);
		this._getDeletableColumn = this._getDeletableColumn.bind(this);
		this._getColumns = this._getColumns.bind(this);
	}

	_handleDelete(key) {
		const { value, onChange, } = this.props;
		const filteredValue = value.filter((_record, index) => index !== key);

		onChange(filteredValue);
	}

	_handleAdd(e) {
		e.preventDefault();

		const { value, onChange, } = this.props;
		const newData = {
			key: uuid(),
		};
		const updatedValue = value.concat(newData);

		onChange(updatedValue);
	}

	_handleChange(key, inputValue, rowIndex) {
		const { value, onChange, } = this.props;
		const updatedValue = cloneDeep(value);

		updatedValue[rowIndex][key] = inputValue;

		onChange(updatedValue);
	}

	_getDeletableColumn() {
		const {
			value,
			hasRemoveButton,
			isRemovingButtonDisabled,
			isShowOnlyLastRemovingButton,
			removingColumnTitle,
			removingButtonText,
		} = this.props;
		const lastIndex = value.length - 1;

		return {
			title: removingColumnTitle,
			dataIndex: DELETABLE_FIELD_NAME,
			className: `${PREFIX_CLASS}--deletable-column`,
			render: (text, record, index) => {
				if (hasRemoveButton) {
					const isLastIndex = index === lastIndex;
					const button = (
						<Button
							className={`${PREFIX_CLASS}__button--delete-row`}
							outline={Button.OutlineEnums.TEXT}
							color={isRemovingButtonDisabled ? null : Button.ColorEnums.LIGHTRED500}
							onClick={() => this._handleDelete(index)}
							disabled={isRemovingButtonDisabled}
						>
							{removingButtonText}
						</Button>
					);

					if (isShowOnlyLastRemovingButton) {
						return isLastIndex ? button : null;
					} else {
						return button;
					}
				}
			},
		};
	}

	_getEditableColumn(column = {}) {
		const { renderField, } = column;
		const { _handleChange, } = this;
		const editableColumn = Object.assign({}, column, {
			onCell: (record, rowIndex,) => {
				return {
					record,
					rowIndex,
					renderField,
					onChange: _handleChange,
				};
			},
		});

		return editableColumn;
	}

	_getColumns() {
		const {
			columns: _originalColumns,
		} = this.props;

		const originColumns = _originalColumns.slice();
		const fieldColumns = originColumns.map(this._getEditableColumn);
		const deletableColumn = this._getDeletableColumn();

		fieldColumns.push(deletableColumn);

		return fieldColumns;
	}

	render() {
		const {
			value,
			className,
			tableClassName,
			tableName,
			alignType,
			addingRowButtonText,
			isAddingRowButtonDisabled,
			rowKey,
		} = this.props;
		const fieldColumns = this._getColumns();
		const tableComponentConfig = getTableComponentConfig();

		return (
			<div className={cx(`${PREFIX_CLASS}__wrapper`, className)}>
				<AntdTable
					rowKey={rowKey}
					tableName={tableName}
					dataSource={value}
					columns={fieldColumns}
					components={tableComponentConfig}
					pagination={false}
					className={cx(`${PREFIX_CLASS} ${PREFIX_CLASS}--${tableName}`, {
						[`${PREFIX_CLASS}--align-left`]: alignType === LEFT,
						[`${PREFIX_CLASS}--align-center`]: alignType === CENTER,
						[`${PREFIX_CLASS}--align-right`]: alignType === RIGHT,
					}, tableClassName)}
				/>
				<Button
					outline={Button.OutlineEnums.DASHED}
					className={`${PREFIX_CLASS}__button ${PREFIX_CLASS}__button--full`}
					icon={Button.IconEnums.PLUS}
					onClick={this._handleAdd}
					disabled={isAddingRowButtonDisabled}
					htmlType="button"
					isFullWidth
				>
					{addingRowButtonText}
				</Button>
			</div>
		);
	}
}

InputDynamicTable.propTypes = propTypes;
InputDynamicTable.defaultProps = defaultProps;
InputDynamicTable.AlignTypeEnums = AlignTypeEnums;

export default InputDynamicTable;

export function getTableComponentConfig() {
	return {
		body: { cell: Cell, },
	};
}
