import React from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	Tree,
} from 'ljit-react-components';
import { getAllTreeKeys, } from './utils';

const { TreeNode, } = Tree;

const PREFIX_CLASS = 'permission-rule-trees';

const propTypes = {
	treeData: PropTypes.arrayOf(PropTypes.object),
	treeSelectionsMap: PropTypes.object,
	onCheckTreeNode: PropTypes.func,
	onClickSelectAll: PropTypes.func,
};
const defaultProps = {
	treeData: [],
	treeSelectionsMap: {},
	onCheckTreeNode: () => {},
	onClickSelectAll: () => {},
};

const RuleTrees = ({
	treeData,
	treeSelectionsMap,
	onCheckTreeNode,
	onClickSelectAll,
}) => {
	const _renderTreeNodes = (nodes) => {
		return nodes.map((item) => {
			const {
				title,
				key,
				isDisabled,
				children,
			} = item;

			if (children) {
				// TODO 可能會增加 select 選擇能夠執行的動作
				return (
					<TreeNode
						title={title}
						key={key}
						disabled={isDisabled}
					>
						{_renderTreeNodes(children)}
					</TreeNode>
				);
			}

			return (
				<TreeNode
					title={title}
					key={key}
					disabled={isDisabled}
				/>
			);
		});
	};

	return treeData.map((tree) => {
		const {
			title,
			children,
			key: rootTreeKey,
		} = tree;
		const checkedKeys = treeSelectionsMap[rootTreeKey];

		return (
			<div className={PREFIX_CLASS} key={rootTreeKey}>
				<div className={`${PREFIX_CLASS}__title`}>
					{title}
					<Button
						className={`${PREFIX_CLASS}__button`}
						outline={Button.OutlineEnums.HOLLOW}
						onClick={() => {
							const allTreeKeys = getAllTreeKeys(children);

							onClickSelectAll(rootTreeKey, allTreeKeys);
						}}
					>
						全选
					</Button>
				</div>
				<Tree
					treeNodes={children}
					checkedKeys={checkedKeys}
					onCheck={(_checkedKeys) => onCheckTreeNode(rootTreeKey, _checkedKeys)}
					onRenderTreeNodes={_renderTreeNodes}
					isCheckable
					isSelectable
					isAutoExpandParent
				/>
			</div>
		);
	});
};

RuleTrees.propTypes = propTypes;
RuleTrees.defaultProps = defaultProps;

export default RuleTrees;
