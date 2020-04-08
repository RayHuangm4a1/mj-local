import React, { Component, } from 'react';
import { Tree, } from 'ljit-react-components';

const treeData = [
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

class SimpleTreeSample extends Component {
	constructor() {
		super();

		this.state = {
			checkedKeys: [],
		};
		this._handleSelectedNode = this._handleSelectedNode.bind(this);
		this._handleCheckedNode = this._handleCheckedNode.bind(this);
	}
	_handleSelectedNode(selectedKey) {

	}
	_handleCheckedNode(checkedKeys) {
		this.setState({ checkedKeys, });
	}
	render() {
		const {
			_handleSelectedNode,
			_handleCheckedNode,
			state: {
				checkedKeys,
			},
		} = this;

		return (
			<div>
				<Tree
					className="simple-tree-sample"
					treeNodes={treeData}
					onSelect={_handleSelectedNode}
					onCheck={_handleCheckedNode}
					checkedKeys={checkedKeys}
					isCheckable
					isSelectable
					isAutoExpandParent
				>
				</Tree>
			</div>

		);
	}
}

export default SimpleTreeSample;
