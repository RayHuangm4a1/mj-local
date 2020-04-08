import React, {
	useState,
	useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { Button, } from 'ljit-react-components';
import { usePrevious, } from '../../../../lib/react-utils';
import RuleTrees from './rule-trees';

const PREFIX_CLASS = 'permission-rule';

const propTypes = {
	roleId: PropTypes.string.isRequired,
};

const initialTreeState = {};

const Rule = ({
	roleId,
	data = fakeTreeData,
}) => {
	const prevRoleId = usePrevious(roleId);
	const [ treeSelectionsMap, setTreeSelectionsMap, ] = useState(initialTreeState);

	useEffect(() => {
		if (roleId !== prevRoleId) {
			// TODO fetch next role rules
			setTreeSelectionsMap(initialTreeState);
		}

		// TODO 之後在 dependency array 中可能會需要用 object 來比對，要用 usePrevious 的方式來處理
		// ref: https://stackblitz.com/edit/react-ommrhy
	});

	const _handleChangeTreeNodes = (rootTreeKey, keys) => {
		setTreeSelectionsMap((prevTreeSelectionsMap) => ({
			...prevTreeSelectionsMap,
			[rootTreeKey]: keys,
		}));
	};

	return (
		<div className={PREFIX_CLASS}>
			<div className={`${PREFIX_CLASS}__title`}>
				进入权限
			</div>
			<RuleTrees
				treeData={data}
				treeSelectionsMap={treeSelectionsMap}
				onClickSelectAll={_handleChangeTreeNodes}
				onCheckTreeNode={_handleChangeTreeNodes}
			/>
			<div className={`${PREFIX_CLASS}__footer`}>
				<Button
					color={Button.ColorEnums.BRIGHTBLUE500}
					onClick={(event) => {
						event.preventDefault();
						// TODO 等待實際資料結構後更新 submit data.
					}}
				>
					保存设置
				</Button>
			</div>
		</div>
	);
};

Rule.propTypes = propTypes;

export default Rule;

const fakeTreeData = [
	{
		title: '游戏管理',
		key: '0',
		children: [
			{
				title: '遊戲管理頁面',
				key: '0-0',
				children: [
					{
						title: '彩种设置',
						key: '0-0-0',
						isDisabled: true,
					},
					{
						title: '彩种赔率设置',
						key: '0-0-1',
						children: [
							{ title: '时时彩', key: '0-0-0-0', },
							{ title: '11選5', key: '0-0-0-1', },
						],
					},
					{ title: '玩法设置', key: '0-0-2', },
					{ title: '开奖游戏设置', key: '0-0-3', },
					{ title: '赔率限制设置', key: '0-0-4', },
					{ title: '投注量限制设置', key: '0-0-5', },
					{ title: '玩法奖金号限制设置', key: '0-0-6', },
				],
			},
		],
	},
	{
		title: '帐户管理',
		key: '1',
		children: [
			{
				title: '帐户管理页面',
				key: '1-0',
				children: [
					{ title: '会员帐户管理', key: '1-0-0', },
					{ title: '层级设置', key: '1-0-1', },
					{ title: '帐户移桶', key: '1-0-2', },
					{ title: '登录IP位址查询', key: '1-0-3', },
					{ title: '删除会员帐户', key: '1-0-4', },
				],
			},
		],
	},
];
