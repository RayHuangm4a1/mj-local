import React from 'react';
import { shallow, mount, } from 'enzyme';
import { dragAndDrop, } from '../../helpers';
import { PREFIX_CLASS, reorder, } from '../components/draggable-table-input/utils';

const {
	simulateDragAndDrop,
} = dragAndDrop;

describe('DraggableTableInput', () => {
	let DraggableTableInput;
	let tableName;
	let rowKey;
	let dataColumns;
	let dataSource;

	beforeEach(() => {
		DraggableTableInput = require('../components/draggable-table-input').default;

		tableName = 'orders';
		rowKey = '_id';

		dataColumns = [
			{
				title: 'Title',
				dataIndex: 'title',
			},
			{
				title: 'Order',
				dataIndex: 'order',
			},
		];
		dataSource = [
			{
				title: 'title 1',
				order: 1,
				_id: '0',
			},
			{
				title: 'title 2',
				order: 2,
				_id: '1',
			},
			{
				title: 'title 3',
				order: 3,
				_id: '2',
			},
		];
	});
	afterEach(() => {
		tableName = undefined;
		rowKey = undefined;
		DraggableTableInput = undefined;
		dataColumns = undefined;
		dataSource = undefined;
	});

	it('should handle default props', () => {
		const {
			value,
			columns,
			alignType,
			isDragColumnVisible,
			onChange,
			className,
		} = DraggableTableInput.defaultProps;

		expect(columns).toMatchObject([]);
		expect(value).toMatchObject([]);
		expect(alignType).toEqual('center');
		expect(className).toEqual('');
		expect(isDragColumnVisible).toEqual(true);
		expect(onChange).toBeDefined();
		expect(onChange).toBeInstanceOf(Function);
	});

	it('should renders correctly', () => {
		const className = 'mock-class';
		const wrapper = shallow(
			<DraggableTableInput
				tableName={tableName}
				rowKey={rowKey}
				value={dataSource}
				columns={dataColumns}
				className={className}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-draggable-table-input', () => {
		const wrapper = shallow(
			<DraggableTableInput
				tableName={tableName}
				rowKey={rowKey}
				columns={dataColumns}
			/>
		);
		const expected = 1;

		expect(wrapper.find('.ljit-draggable-table-input')).toHaveLength(expected);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(
			<DraggableTableInput
				tableName={tableName}
				rowKey={rowKey}
				className={className}
				columns={dataColumns}
			/>
		);
		const expected = 1;

		expect(wrapper.find(`.${className}`)).toHaveLength(expected);
	});

	it('should mount in a full DOM', () => {
		const alignType = 'right';
		const className = 'mock-class';
		const isDragColumnVisible = true;
		const onDragEnd = () => {};
		const wrapper = mount(
			<DraggableTableInput
				tableName={tableName}
				rowKey={rowKey}
				value={dataSource}
				columns={dataColumns}
				alignType={alignType}
				className={className}
				isDragColumnVisible={isDragColumnVisible}
				onDragEnd={onDragEnd}
			/>
		);

		expect(wrapper.props().tableName).toEqual(tableName);
		expect(wrapper.props().rowKey).toEqual(rowKey);
		expect(wrapper.props().value).toEqual(dataSource);
		expect(wrapper.props().columns).toEqual(dataColumns);
		expect(wrapper.props().alignType).toEqual(alignType);
		expect(wrapper.props().className).toEqual(className);
		expect(wrapper.props().isDragColumnVisible).toEqual(isDragColumnVisible);
		expect(wrapper.props().onDragEnd).toEqual(onDragEnd);
	});

	it('should handle onChange', () => {
		const onChange = jest.fn();
		const wrapper = mount(
			<DraggableTableInput
				tableName={tableName}
				rowKey={rowKey}
				value={dataSource}
				columns={dataColumns}
				onChange={onChange}
			/>
		);

		simulateDragAndDrop(wrapper, tableName, 1, tableName, 0);

		expect(onChange).toHaveBeenCalled();
	});

	describe('AlignTypeEnums', () => {
		it('should contain left property', () => {
			expect(DraggableTableInput.AlignTypeEnums).toHaveProperty('LEFT', 'left');
		});

		it('should contain center property', () => {
			expect(DraggableTableInput.AlignTypeEnums).toHaveProperty('CENTER', 'center');
		});

		it('should contain right property', () => {
			expect(DraggableTableInput.AlignTypeEnums).toHaveProperty('RIGHT', 'right');
		});
	});

	describe('Whan pass alignType as left, center, or right', () => {
		it('should be selected by class ljit-draggable-table-input--align-left', () => {
			const wrapper = shallow(
				<DraggableTableInput
					tableName={tableName}
					rowKey={rowKey}
					value={dataSource}
					columns={dataColumns}
					alignType="left"
				/>
			);
			const wrappedTable = wrapper.find('.ljit-draggable-table-input').at(0);

			expect(wrappedTable.hasClass('ljit-draggable-table-input--align-left')).toEqual(true);
		});

		it('should be selected by class ljit-draggable-table-input--align-center', () => {
			const wrapper = shallow(
				<DraggableTableInput
					tableName={tableName}
					rowKey={rowKey}
					value={dataSource}
					columns={dataColumns}
					alignType="center"
				/>
			);
			const wrappedTable = wrapper.find('.ljit-draggable-table-input').at(0);

			expect(wrappedTable.hasClass('ljit-draggable-table-input--align-center')).toEqual(true);
		});

		it('should be selected by class ljit-draggable-table-input--align-right', () => {
			const wrapper = shallow(
				<DraggableTableInput
					tableName={tableName}
					rowKey={rowKey}
					value={dataSource}
					columns={dataColumns}
					alignType="right"
				/>
			);
			const wrappedTable = wrapper.find('.ljit-draggable-table-input').at(0);

			expect(wrappedTable.hasClass('ljit-draggable-table-input--align-right')).toEqual(true);
		});
	});

	describe('utils', () => {
		describe('PREFIX_CLASS', () => {
			it('should PREFIX_CLASS to equal ljit-draggable-table-input', () => {
				const expected = 'ljit-draggable-table-input';

				expect(PREFIX_CLASS).toEqual(expected);
			});
		});

		describe('reorder', () => {
			it('should remove dataSource at 0, then insert to 1', () => {
				const startIndex = 0;
				const endIndex = 1;
				const received = reorder(dataSource, startIndex, endIndex);
				const expected = [
					{
						title: 'title 2',
						order: 2,
						_id: '1',
					},
					{
						title: 'title 1',
						order: 1,
						_id: '0',
					},
					{
						title: 'title 3',
						order: 3,
						_id: '2',
					},
				];

				expect(received).toMatchObject(expected);
			});

			it('should remove dataSource at 0, then insert to 2', () => {
				const startIndex = 0;
				const endIndex = 2;
				const received = reorder(dataSource, startIndex, endIndex);
				const expected = [
					{
						title: 'title 2',
						order: 2,
						_id: '1',
					},
					{
						title: 'title 3',
						order: 3,
						_id: '2',
					},
					{
						title: 'title 1',
						order: 1,
						_id: '0',
					},
				];

				expect(received).toMatchObject(expected);
			});
		});
	});
});
