import React from 'react';
import { shallow, mount, } from 'enzyme';

describe('Tree', () => {
	let Tree;
	let treeData;

	beforeEach(() => {
		jest.doMock('antd/lib/tree');
		Tree = require('../components/tree').default;
		treeData = [
			{
				title: 'parent 1',
				key: '0-0',
				children: [
					{
						title: 'parent 1-0',
						key: '0-0-0',
						children: [
							{
								title: 'leaf',
								key: '0-0-0-0',
								isDisabled: true,
							},
							{ title: 'leaf', key: '0-0-0-1', },
						],
					},
				],
			},
			{
				title: 'parent 1-1',
				key: '0-0-1',
				children: [
					{
						title: (<span style={{ color: '#1890ff', }}>sss</span>),
						key: '0-0-1-0',
					},
				],
			},
		];
	});

	afterEach(() => {
		jest.unmock('antd/lib/tree');
		Tree = undefined;
		treeData = undefined;
	});

	it('handle default props', () => {
		const {
			isCheckable,
			isAutoExpandParent,
			isDisabled,
			isSelectable,
			isDefaultExpandAll,
			isDefaultExpandParent,
			onExpand,
			onCheck,
			onSelect,
		} = Tree.defaultProps;

		expect(isCheckable).toEqual(true);
		expect(isAutoExpandParent).toEqual(true);
		expect(isDisabled).toEqual(false);
		expect(isSelectable).toEqual(false);
		expect(isDefaultExpandAll).toEqual(true);
		expect(isDefaultExpandParent).toEqual(true);
		expect(onExpand).toBeDefined();
		expect(onExpand).toBeInstanceOf(Function);
		expect(onCheck).toBeDefined();
		expect(onCheck).toBeInstanceOf(Function);
		expect(onSelect).toBeDefined();
		expect(onSelect).toBeInstanceOf(Function);
	});

	it('should renders correctly', () => {
		const wrapper = shallow(
			<Tree
				treeNodes={treeData}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-tree', () => {
		const wrapper = shallow(<Tree treeNodes={treeData}/>);

		expect(wrapper.hasClass('ljit-tree')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<Tree className={className} treeNodes={treeData}/>);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const className = 'mock-class';
		const defaultExpandedKeys = [];
		const defaultCheckedKeys = [];
		const checkedKeys = [];
		const onExpand = () => {};
		const onCheck = () => {};
		const onSelect = () => {};

		const wrapper = mount(
			<Tree
				treeNodes={treeData}
				className={className}
				defaultExpandedKeys={defaultExpandedKeys}
				defaultCheckedKeys={defaultCheckedKeys}
				checkedKeys={checkedKeys}
				onExpand={onExpand}
				onCheck={onCheck}
				onSelect={onSelect}
				isCheckable
				isAutoExpandParent
				isDisabled
				isSelectable
				isDefaultExpandAll
				isDefaultExpandParent
			>
			</Tree>
		);

		expect(wrapper.props().treeNodes).toEqual(treeData);
		expect(wrapper.props().className).toBe(className);
		expect(wrapper.props().defaultExpandedKeys).toBe(defaultExpandedKeys);
		expect(wrapper.props().defaultCheckedKeys).toEqual(defaultCheckedKeys);
		expect(wrapper.props().checkedKeys).toEqual(checkedKeys);
		expect(wrapper.props().onExpand).toEqual(onExpand);
		expect(wrapper.props().onCheck).toEqual(onCheck);
		expect(wrapper.props().onSelect).toEqual(onSelect);
		expect(wrapper.props().isCheckable).toEqual(true);
		expect(wrapper.props().isAutoExpandParent).toEqual(true);
		expect(wrapper.props().isDisabled).toEqual(true);
		expect(wrapper.props().isSelectable).toEqual(true);
		expect(wrapper.props().isDefaultExpandAll).toEqual(true);
		expect(wrapper.props().isDefaultExpandParent).toEqual(true);
	});

	it('should handle expand event', () => {
		const onExpand = jest.fn();
		const wrapper = mount(
			<Tree
				treeNodes={treeData}
				onExpand={onExpand}
				isCheckable
				isSelectable
				isDefaultExpandAll
			>
			</Tree>
		);

		wrapper.find('.ljit-tree').props().onExpand();

		expect(onExpand).toHaveBeenCalledTimes(1);
		expect(onExpand).toBeCalled();
	});

	it('should handle check event', () => {
		const onCheck = jest.fn();
		const wrapper = mount(
			<Tree
				treeNodes={treeData}
				onCheck={onCheck}
				isCheckable
			>
			</Tree>
		);

		wrapper.find('.ljit-tree').props().onCheck();

		expect(onCheck).toHaveBeenCalledTimes(1);
		expect(onCheck).toBeCalled();
	});

	it('should handle select event', () => {
		const onSelect = jest.fn();
		const wrapper = mount(
			<Tree
				treeNodes={treeData}
				onSelect={onSelect}
				isDefaultExpandAll
			>
			</Tree>
		);

		wrapper.find('.ljit-tree').props().onSelect();

		expect(onSelect).toHaveBeenCalledTimes(1);
		expect(onSelect).toBeCalled();
	});
});
