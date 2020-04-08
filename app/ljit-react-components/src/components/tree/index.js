import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Tree as AntdTree, } from 'antd';
import TreeNode from './tree-node';

const propTypes = {
	treeNodes: PropTypes.arrayOf(PropTypes.object).isRequired,
	className: PropTypes.string,
	isCheckable: PropTypes.bool,
	isAutoExpandParent: PropTypes.bool,
	isDisabled: PropTypes.bool,
	isSelectable: PropTypes.bool,
	defaultExpandedKeys: PropTypes.arrayOf(PropTypes.string),
	defaultCheckedKeys: PropTypes.arrayOf(PropTypes.string),
	isDefaultExpandAll: PropTypes.bool,
	isDefaultExpandParent: PropTypes.bool,
	checkedKeys: PropTypes.arrayOf(PropTypes.string),
	//function(expandedKeys, {expanded: bool, node})
	onExpand: PropTypes.func,
	//function(checkedKeys, e:{checked: bool, checkedNodes, node, event})
	onCheck: PropTypes.func,
	//function(selectedKeys, e:{selected: bool, selectedNodes, node, event})
	onSelect: PropTypes.func,
	children: PropTypes.node,
	onRenderTreeNodes: PropTypes.func,
};
const defaultProps = {
	isCheckable: true,
	isAutoExpandParent: true,
	isDisabled: false,
	isSelectable: false,
	isDefaultExpandAll: true,
	isDefaultExpandParent: true,
	onExpand: () => {},
	onCheck: () => {},
	onSelect: () => {},
	onRenderTreeNodes: (nodes) => renderTreeNodes(nodes),
};

const PREFIX_CLASS = 'ljit-tree';

class Tree extends Component {
	render() {
		const {
			treeNodes,
			className,
			isCheckable,
			isAutoExpandParent,
			isDisabled,
			isSelectable,
			defaultExpandedKeys,
			defaultCheckedKeys,
			isDefaultExpandAll,
			isDefaultExpandParent,
			checkedKeys,
			onExpand,
			onCheck,
			onSelect,
			onRenderTreeNodes,
		} = this.props;

		return (
			<AntdTree
				className={cx(PREFIX_CLASS, className)}
				checkable={isCheckable}
				autoExpandParent={isAutoExpandParent}
				disabled={isDisabled}
				selectable={isSelectable}
				defaultExpandedKeys={defaultExpandedKeys}
				defaultExpandAll={isDefaultExpandAll}
				defaultExpandParent={isDefaultExpandParent}
				defaultCheckedKeys={defaultCheckedKeys}
				checkedKeys={checkedKeys}
				onExpand={onExpand}
				onCheck={onCheck}
				onSelect={onSelect}
			>
				{onRenderTreeNodes(treeNodes)}
			</AntdTree>
		);
	}
}

Tree.propTypes = propTypes;
Tree.defaultProps = defaultProps;

Tree.TreeNode = TreeNode;

export default Tree;

function renderTreeNodes(nodes = []) {

	return nodes.map(item => {
		if (item.children) {
			return (
				<TreeNode title={item.title} key={item.key} disabled={item.isDisabled}>
					{renderTreeNodes(item.children)}
				</TreeNode>
			);
		}
		return <TreeNode title={item.title} key={item.key}  disabled={item.isDisabled}/>;
	});
}
