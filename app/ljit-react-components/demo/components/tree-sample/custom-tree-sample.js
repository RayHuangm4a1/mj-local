import React, { Component, } from 'react';
import { Tree, } from 'ljit-react-components';
import TreeTitleItem from './tree-title-item';
import './style.styl';

const TreeNode = Tree.TreeNode;

const treeData = [
	{
		title: '游戏管理',
		key: '游戏管理',
		children: [
			{
				title: '遊戲管理頁面',
				key: '遊戲管理頁面',
				children: [
					{
						title: '彩种设置',
						key: '彩种设置',
						isDisabled: true,
					},
					{
						title: '彩种赔率设置',
						key: '彩种赔率设置',
						children: [
							{ title: '时时彩', key: '时时彩', },
							{ title: '11選5', key: '11選5', },
						],
					},
					{ title: '玩法设置', key: '玩法设置', },
					{ title: '开奖游戏设置', key: '开奖游戏设置', },
					{ title: '赔率限制设置', key: '赔率限制设置', },
					{ title: '投注量限制设置', key: '投注量限制设置', },
					{ title: '玩法奖金号限制设置', key: '玩法奖金号限制设置', },
				],
			},
		],
	},
	{
		title: '帐户管理',
		key: '帐户管理',
		children: [
			{
				title: '帐户管理页面',
				key: '帐户管理页面',
				children: [
					{ title: '会员帐户管理', key: '会员帐户管理', },
					{ title: '层级设置', key: '层级设置', },
					{ title: '帐户移桶', key: '帐户移桶', },
					{ title: '登录IP位址查询', key: '登录IP位址查询', },
					{ title: '删除会员帐户', key: '删除会员帐户', },
				],
			},
		],
	},
];

class CustomTreeSample extends Component {
	constructor() {
		super();

		this.state = {
			checkedKeys: [],
		};

		this._handleSelectedNode = this._handleSelectedNode.bind(this);
		this._handleCheckedNode = this._handleCheckedNode.bind(this);
		this._renderTreeNodes = this._renderTreeNodes.bind(this);
	}
	_handleSelectedNode(selectedKey) {

	}
	_handleCheckedNode(checkedKeys) {
		this.setState({ checkedKeys, });
	}
	_renderTreeNodes(nodes) {
		const { checkedKeys, } = this.state;

		return nodes.map(item => {
			if (item.children) {
				return (
					<TreeNode title={item.title} key={item.key} disabled={item.isDisabled}>
						{this._renderTreeNodes(item.children)}
					</TreeNode>
				);
			}
			return <TreeNode title={generateTreeTitleItem(item, checkedKeys)} key={item.key}  disabled={item.isDisabled}/>;
		});
	}
	render() {
		const {
			_handleSelectedNode,
			_handleCheckedNode,
			_renderTreeNodes,
			state: {
				checkedKeys,
			},
		} = this;

		return (
			<div>
				<Tree
					className="custom-tree-sample"
					treeNodes={treeData}
					onSelect={_handleSelectedNode}
					onCheck={_handleCheckedNode}
					onRenderTreeNodes={_renderTreeNodes}
					checkedKeys={checkedKeys}
					isCheckable
					isSelectable
					isAutoExpandParent
				/>
			</div>

		);
	}
}

export default CustomTreeSample;

function generateTreeTitleItem(item, checkedKeys) {
	const isShowSelect = checkedKeys.includes(item.key);

	return (
		<TreeTitleItem
			title={item.title}
			isShowSelect={isShowSelect}
		/>
	);
}
