import React from 'react';
import PropTypes from 'prop-types';
import AntdTree from 'antd/lib/tree';
import omit from 'lodash/omit';

const AntdTreeNode = AntdTree.TreeNode;
const ANTD_IS_TREE_NODE = 1;

const propTypes = {
	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	children: PropTypes.node,
};


const TreeNode = (props) => {
	// antd need additional props itself
	const childProps = omit(props, ['title',]);

	return (
		<AntdTreeNode
			{...childProps}
			className="ljit-tree_tree-node"
			title={props.title}
		>
			{props.children}
		</AntdTreeNode>

	);
};

TreeNode.propTypes = propTypes;

/**
 * antd 沿用的rc-treeNode 有加這個property 來判斷是否為TreeNode
 * 因此需要加上這個才能偽裝成TreeNode, 否則無法Tree 無法找到children
 *  */
TreeNode.isTreeNode = ANTD_IS_TREE_NODE;


export default TreeNode;
