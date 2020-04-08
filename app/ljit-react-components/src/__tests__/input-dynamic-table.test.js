import React from 'react';
import { shallow, mount, render, } from 'enzyme';
import InputDynamicTable, { getTableComponentConfig, PREFIX_CLASS, } from '../components/input-dynamic-table';
import Input from '../components/input';
import Form from '../components/form';
import FormItem from '../components/form-item';

const { AlignTypeEnums, } = InputDynamicTable;

class InputDynamicTableTestContainer extends React.Component {
	constructor() {
		super();
		this.state = {
			initialDatas: [
				{ key: '0', name: 'a', id: '1', },
			],
		};
		this.columns = [
			{ key: '1', dataIndex: 'name', title: 'Name', },
			{ key: '2', dataIndex: 'id', title: 'ID', },
		];
		this._handleTableChange = this._handleTableChange.bind(this);
	}

	_handleTableChange(value) {
		this.setState({
			initialDatas: value,
		});
	}

	render() {
		const { initialDatas, } = this.state;
		const { columns, _handleTableChange, } = this;

		return (
			<Form ref={(refForm) => this.formInstance = refForm }>
				<FormItem
					key="mock-table-name"
					itemName="mock-table-name"
					itemConfig={{
						initialValue: initialDatas,
					}}
				>
					<InputDynamicTable
						rowKey="key"
						tableName="mock-table-name"
						value={initialDatas}
						columns={columns}
						disabled={false}
						alignType={AlignTypeEnums.CENTER}
						removingColumnTitle="操作"
						removingButtonText="刪除"
						addingRowButtonText="新增"
						onChange={_handleTableChange}
					/>
				</FormItem>
			</Form>
		);
	}
}

describe('InputDynamicTable', () => {
	let dataSource = [];

	beforeEach(() => {
		jest.doMock('antd/lib/input');
		jest.doMock('antd/lib/button');
		jest.doMock('antd/lib/table');
		jest.doMock('antd/lib/form');

		dataSource = [
			{
				key: '0',
				ip:'ip1234',
				note:'note1',
			},
			{
				key: '1',
				ip:'ip5678',
				note:'note2',
			},
		];
	});
	afterEach(() => {
		jest.unmock('antd/lib/input');
		jest.unmock('antd/lib/button');
		jest.unmock('antd/lib/table');
		jest.unmock('antd/lib/form');

		dataSource = [];
	});

	const columns = [
		{
			title: 'IP',
			dataIndex: 'ip',
			width: '25%',
			onCell: () => {},
			renderField: () => (< Input/>),
		},
		{
			title: '备注',
			dataIndex: 'note',
			width: '25%',
			onCell: () => {},
			renderField: () => (< Input/> ),
		},
	];

	const tableName = 'input-dynamic-table-test';

	it('handle default props', () => {
		const {
			value,
			alignType,
			className,
			tableClassName,
			removingColumnTitle,
			removingButtonText,
			addingRowButtonText,
			hasRemoveButton,
			isAddingRowButtonDisabled,
			isRemovingButtonDisabled,
			isShowOnlyLastRemovingButton,
			onChange,
		} = InputDynamicTable.defaultProps;

		expect(value).toEqual([]);
		expect(alignType).toEqual(AlignTypeEnums.CENTER);
		expect(className).toEqual('');
		expect(tableClassName).toEqual('');
		expect(removingColumnTitle).toEqual('操作');
		expect(removingButtonText).toEqual('删除');
		expect(addingRowButtonText).toEqual('新增');
		expect(hasRemoveButton).toEqual(true);
		expect(isAddingRowButtonDisabled).toEqual(false);
		expect(isRemovingButtonDisabled).toEqual(false);
		expect(isShowOnlyLastRemovingButton).toEqual(false);
		expect(onChange).toBeDefined();
		expect(onChange).toBeInstanceOf(Function);
	});

	it('should render correctly', () => {
		const props = {
			tableName: tableName,
			value: dataSource,
			columns: columns,
			alignType: AlignTypeEnums.CENTER,
			tableClassName: 'mock-table-class-name',
			className: 'mock-wrapper-class-name',
			removingColumnTitle: 'mock-deletable-title',
			removingButtonText: 'mock-deletable-text',
			addingRowButtonText: 'mock-add-button-text',
			isAddingRowButtonDisabled: false,
			isRemovingButtonDisabled: false,
			isShowOnlyLastRemovingButton: false,
			onChange: () => {},
			rowKey: 'key',
		};
		const wrapper = render(<InputDynamicTable {...props} />);

		expect(wrapper).toMatchSnapshot();
	});

	it('should has return value of getTableComponentConfig right', () => {
		const tableComponentConfig = getTableComponentConfig();
		const props = {
			value: dataSource,
			columns: columns,
			tableName: tableName,
			onChange: () => {},
			rowKey: 'key',
		};
		const wrapper = mount(<InputDynamicTable {...props} />);
		const wrappedTable = wrapper.find('.ljit-input-dynamic-table').at(0);

		expect(wrappedTable.prop('components')).toEqual(tableComponentConfig);
	});

	it('should be selected by custom tableName', () => {
		const tableName = 'mock-tableName';
		const props = {
			value: dataSource,
			columns: columns,
			onChange: () => {},
			rowKey: 'key',
		};
		const wrapper = mount(<InputDynamicTable tableName={tableName} {...props} />);
		const wrappedTable = wrapper.find('.ljit-input-dynamic-table').at(0);

		expect(wrappedTable.hasClass(`ljit-input-dynamic-table--${tableName}`)).toEqual(true);
	});

	it('should have a default PREFIX_CLASS name as ljit-input-dynamic-table', () => {
		expect(PREFIX_CLASS).toEqual('ljit-input-dynamic-table');
	});

	it('should be selected by custom PREFIX_CLASS name', () => {
		const PREFIX_CLASS = 'mock-prefix-class';
		const props = {
			tableName: tableName,
			value: dataSource,
			columns: columns,
			alignType: AlignTypeEnums.CENTER,
			disabled: false,
			onChange: () => {},
			rowKey: 'key',
		};
		const wrapper = mount(<InputDynamicTable {...props} className={`${PREFIX_CLASS}`} />);

		expect(wrapper.hasClass(PREFIX_CLASS)).toEqual(true);
	});

	it('should be selected by custom className', () => {
		const className = 'mock-class';
		const props = {
			tableName: tableName,
			value: dataSource,
			columns: columns,
			alignType: AlignTypeEnums.CENTER,
			disabled: false,
			onChange: () => {},
			rowKey: 'key',
		};
		const wrapper = mount(<InputDynamicTable {...props} className={className} />);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const value = dataSource;
		const disabled = false;
		const alignType = 'center';
		const tableName = 'mock-table-name';
		const className = 'mock-class-name';
		const tableClassName = 'mock-table-class-name';
		const removingColumnTitle = 'mock-removing-column-title';
		const removingButtonText = 'mock-removing-button-text';
		const addingRowButtonText = 'mock-adding-row-button-text';
		const isAddingRowButtonDisabled = false;
		const isRemovingButtonDisabled = false;
		const isShowOnlyLastRemovingButton = false;
		const onChange = () => {};
		const rowKey = 'key';

		const wrapper = mount(
			<InputDynamicTable
				rowKey={rowKey}
				value={value}
				columns={columns}
				tableName={tableName}
				alignType={alignType}
				disabled={disabled}
				className={className}
				tableClassName={tableClassName}
				removingColumnTitle={removingColumnTitle}
				removingButtonText={removingButtonText}
				addingRowButtonText={addingRowButtonText}
				isAddingRowButtonDisabled={isAddingRowButtonDisabled}
				isRemovingButtonDisabled={isRemovingButtonDisabled}
				isShowOnlyLastRemovingButton={isShowOnlyLastRemovingButton}
				onChange={onChange}
			/>
		);
		const wrappedTable = wrapper.find('.ljit-input-dynamic-table').at(0);

		expect(wrapper.props().value).toMatchObject(value);
		expect(wrapper.props().tableName).toEqual(tableName);
		expect(wrapper.props().alignType).toEqual(alignType);
		expect(wrapper.props().disabled).toEqual(disabled);
		expect(wrapper.props().className).toEqual(className);
		expect(wrapper.props().tableClassName).toEqual(tableClassName);
		expect(wrapper.props().removingColumnTitle).toEqual(removingColumnTitle);
		expect(wrapper.props().removingButtonText).toEqual(removingButtonText);
		expect(wrapper.props().addingRowButtonText).toEqual(addingRowButtonText);
		expect(wrapper.props().isAddingRowButtonDisabled).toEqual(isAddingRowButtonDisabled);
		expect(wrapper.props().isRemovingButtonDisabled).toEqual(isRemovingButtonDisabled);
		expect(wrapper.props().isShowOnlyLastRemovingButton).toEqual(isShowOnlyLastRemovingButton);
		expect(wrapper.props().onChange).toEqual(onChange);
		expect(wrappedTable.props().columns).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					dataIndex: 'operation',
				}),
			]));
		expect(wrapper.find('.ljit-input-dynamic-table__button--full')).toMatchObject({});
	});

	describe('Align Type Enums', () => {
		it('should contain left property', () => {
			expect(InputDynamicTable.AlignTypeEnums).toHaveProperty('LEFT', 'left');
		});

		it('should contain center property', () => {
			expect(InputDynamicTable.AlignTypeEnums).toHaveProperty('CENTER', 'center');
		});

		it('should contain right property', () => {
			expect(InputDynamicTable.AlignTypeEnums).toHaveProperty('RIGHT', 'right');
		});
	});

	describe('When pass alignType as left, center, or right', () => {
		it('should be selected by class ljit-input-dynamic-table--align-left', () => {
			const props = {
				tableName: tableName,
				value: dataSource,
				columns: columns,
				onChange: () => {},
				rowKey: 'key',
			};
			const wrapper = shallow(<InputDynamicTable alignType="left" {...props} />);
			const wrappedTable = wrapper.find('.ljit-input-dynamic-table').at(0);

			expect(wrappedTable.hasClass('ljit-input-dynamic-table--align-left')).toEqual(true);
		});

		it('should be selected by class ljit-input-dynamic-table--align-center', () => {
			const props = {
				tableName: tableName,
				value: dataSource,
				columns: columns,
				onChange: () => {},
				rowKey: 'key',
			};
			const wrapper = shallow(<InputDynamicTable alignType="center" {...props} />);
			const wrappedTable = wrapper.find('.ljit-input-dynamic-table').at(0);

			expect(wrappedTable.hasClass('ljit-input-dynamic-table--align-center')).toEqual(true);
		});

		it('should be selected by class ljit-input-dynamic-table--align-right', () => {
			const props = {
				tableName: tableName,
				value: dataSource,
				columns: columns,
				onChange: () => {},
				rowKey: 'key',
			};
			const wrapper = shallow(<InputDynamicTable alignType="right" {...props} />);
			const wrappedTable = wrapper.find('.ljit-input-dynamic-table').at(0);

			expect(wrappedTable.hasClass('ljit-input-dynamic-table--align-right')).toEqual(true);
		});
	});

	describe('handle passing hasRemoveButton', () => {
		it('should have removing button when hasRemoveButton is true', () => {
			const props = {
				tableName: tableName,
				value: dataSource,
				columns: columns,
				alignType: AlignTypeEnums.CENTER,
				hasRemoveButton: true,
				onChange: () => {},
				rowKey: 'key',
			};
			const wrapper = mount(<InputDynamicTable {...props} />);
			const wrappedTable = wrapper.find('.ljit-input-dynamic-table').at(0);
			const removingButton = wrappedTable.find('.ljit-input-dynamic-table__button--delete-row');

			expect(removingButton.hostNodes().length).toBeGreaterThan(1);
		});

		it('should have no removing button when hasRemoveButton is false', () => {
			const props = {
				tableName: tableName,
				value: dataSource,
				columns: columns,
				alignType: AlignTypeEnums.CENTER,
				hasRemoveButton: false,
				onChange: () => {},
				rowKey: 'key',
			};
			const wrapper = mount(<InputDynamicTable {...props} />);
			const wrappedTable = wrapper.find('.ljit-input-dynamic-table').at(0);
			const removingButton = wrappedTable.find('.ljit-input-dynamic-table__button--delete-row');

			expect(removingButton.hostNodes().length).toBe(0);
		});
	});

	describe('handle passing isShowOnlyLastRemovingButton', () => {
		it('should find only one removing button when isShowOnlyLastRemovingButton is true', () => {
			const props = {
				tableName: tableName,
				value: dataSource,
				columns: columns,
				alignType: AlignTypeEnums.CENTER,
				isShowOnlyLastRemovingButton: true,
				onChange: () => {},
				rowKey: 'key',
			};
			const wrapper = mount(<InputDynamicTable {...props} />);
			const wrappedTable = wrapper.find('.ljit-input-dynamic-table').at(0);
			const removingButton = wrappedTable.find('.ljit-input-dynamic-table__button--delete-row');

			expect(removingButton.hostNodes().length).toBe(1);
		});

		it('should find at least one removing button when isShowOnlyLastRemovingButton is false', () => {
			const props = {
				tableName: tableName,
				value: dataSource,
				columns: columns,
				alignType: AlignTypeEnums.CENTER,
				isShowOnlyLastRemovingButton: false,
				onChange: () => {},
				rowKey: 'key',
			};
			const wrapper = mount(<InputDynamicTable {...props} />);
			const wrappedTable = wrapper.find('.ljit-input-dynamic-table').at(0);
			const removingButton = wrappedTable.find('.ljit-input-dynamic-table__button--delete-row');

			expect(removingButton.hostNodes().length).toBeGreaterThan(1);
		});
	});

	describe('handle passing isRemovingButtonDisabled', () => {
		it('should have delete row button is disabled when isRemovingButtonDisabled is true', () => {
			const props = {
				tableName: tableName,
				value: dataSource,
				columns: columns,
				alignType: AlignTypeEnums.CENTER,
				isRemovingButtonDisabled: true,
				onChange: () => {},
				rowKey: 'key',
			};
			const wrapper = mount(<InputDynamicTable {...props} />);
			const wrappedTable = wrapper.find('.ljit-input-dynamic-table').at(0);
			const removingButton = wrappedTable.find('.ljit-input-dynamic-table__button--delete-row').at(0);

			expect(removingButton.props().disabled).toEqual(true);
		});

		it('should have delete row button is not disabled when isRemovingButtonDisabled is false', () => {
			const props = {
				tableName: tableName,
				value: dataSource,
				columns: columns,
				alignType: AlignTypeEnums.CENTER,
				isRemovingButtonDisabled: false,
				onChange: () => {},
				rowKey: 'key',
			};
			const wrapper = mount(<InputDynamicTable {...props} />);
			const wrappedTable = wrapper.find('.ljit-input-dynamic-table').at(0);
			const removingButton = wrappedTable.find('.ljit-input-dynamic-table__button--delete-row').at(0);

			expect(removingButton.props().disabled).toEqual(false);
		});
	});

	describe('handle passing isAddingRowButtonDisabled', () => {
		it('should have adding row button is not disabled when isAddingRowButtonDisabled is true', () => {
			const props = {
				tableName: tableName,
				value: dataSource,
				columns: columns,
				alignType: AlignTypeEnums.CENTER,
				isAddingRowButtonDisabled: true,
				onChange: () => {},
				rowKey: 'key',
			};
			const wrapper = mount(<InputDynamicTable {...props} />);
			const addingRowButton = wrapper.find('.ljit-input-dynamic-table__button--full').at(0);

			expect(addingRowButton.props().disabled).toEqual(true);
		});

		it('should have adding row button is not disabled when isAddingRowButtonDisabled is false', () => {
			const props = {
				tableName: tableName,
				value: dataSource,
				columns: columns,
				alignType: AlignTypeEnums.CENTER,
				isAddingRowButtonDisabled: false,
				onChange: () => {},
				rowKey: 'key',
			};
			const wrapper = mount(<InputDynamicTable {...props} />);
			const addingRowButton = wrapper.find('.ljit-input-dynamic-table__button--full').at(0);

			expect(addingRowButton.props().disabled).toEqual(false);
		});
	});

	describe('handle adding row and delete row button', () => {
		it('should add one data when _handleAdd is called', () => {
			const wrapper = mount(<InputDynamicTableTestContainer rowKey='key' />);
			const table = wrapper.find(InputDynamicTable);
			const addButton = table.find('.ljit-input-dynamic-table__button--full').at(0);
			const newDatas = wrapper.state('initialDatas').concat({ key: '1', name: 'b', id: '2', });

			expect(table).toHaveLength(1);

			addButton.simulate('click');

			wrapper.setState({ initialDatas: newDatas, });

			expect(wrapper.state('initialDatas').length).toBe(2);
		});

		it('should delete one data when _handleDelete is called', () => {
			const wrapper = mount(<InputDynamicTableTestContainer rowKey='key' />);
			const table = wrapper.find(InputDynamicTable);
			const deleteButton = table.find('.ljit-input-dynamic-table__button--delete-row').at(0);

			expect(table).toHaveLength(1);

			deleteButton.simulate('click', { key: 0, });

			expect(wrapper.state('initialDatas').length).toBe(0);
		});

		it ('should call onChange once when adding row button is clicked,', () => {
			const props = {
				tableName: tableName,
				value: dataSource,
				columns: columns,
				alignType: AlignTypeEnums.CENTER,
				disabled: false,
				onChange: jest.fn(),
				rowKey: 'key',
			};

			const wrapper = mount(<InputDynamicTable {...props} />);
			const table = wrapper.find(InputDynamicTable);
			const addButton = table.find('.ljit-input-dynamic-table__button--full').at(0);

			addButton.simulate('click');

			expect(props.onChange.mock.calls.length).toBe(1);
		});

		it ('should call onChange once when delete button is clicked', () => {
			const props = {
				tableName: tableName,
				value: dataSource,
				columns: columns,
				alignType: AlignTypeEnums.CENTER,
				disabled: false,
				onChange: jest.fn(),
				rowKey: 'key',
			};
			const wrapper = mount(<InputDynamicTable {...props} />);
			const table = wrapper.find(InputDynamicTable);
			const deleteButton = table.find('.ljit-input-dynamic-table__button--delete-row').at(0);

			deleteButton.simulate('click', { key: 0, });

			expect(props.onChange).toHaveBeenCalledTimes(1);
		});
	});
});
