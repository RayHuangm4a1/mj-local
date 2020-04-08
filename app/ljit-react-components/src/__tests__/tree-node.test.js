import React from 'react';
import { shallow, mount, } from 'enzyme';


describe('TreeNode', () => {
	let TreeNode;

	beforeEach(() => {
		jest.doMock('rc-tree/lib/TreeNode');
		TreeNode = require('../components/tree/tree-node').default;
	});

	afterEach(() => {
		jest.unmock('rc-tree/lib/TreeNode');
		TreeNode = undefined;
	});

	it('should renders correctly', () => {
		const wrapper = shallow(
			<TreeNode/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-tree_tree-node', () => {
		const wrapper = shallow(<TreeNode />);

		expect(wrapper.hasClass('ljit-tree_tree-node')).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const title = 'mock-title';
		const children = 'mock-children';

		const wrapper = mount(
			<TreeNode
				title={title}
			>
				{children}
			</TreeNode>
		);

		expect(wrapper.props().title).toBe(title);
		expect(wrapper.props().children).toEqual(children);
	});
});
