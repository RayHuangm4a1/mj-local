import React, { useState, } from 'react';
import PropTypes from 'prop-types';
import { DropdownMenuBar, } from 'ljit-react-components';
import RecentDrawingTable from './recent-drawing-table';
import './style.styl';

const PREFIX_CLASS = 'xin-yong-bet-dropdown-menu';

const propTypes = {
	lotteryDrawingRecords: PropTypes.arrayOf(PropTypes.shape({
		issue: PropTypes.string,
		opencode: PropTypes.string,
	})),
	selectedLotteryClass: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
	}),
	selectedLottery: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
	}),
};
const defaultProps = {
	lotteryDrawingRecords: [],
	selectedLottery: {},
	selectedLotteryClass: {},
};

function XinYongBetDropdownMenu({
	lotteryDrawingRecords,
	selectedLottery,
	selectedLotteryClass,
}) {
	const [ selectedMenuId, setSelectedMenuId, ] = useState();

	const _handleClickMenu = (id) => {
		if (selectedMenuId === id) {
			setSelectedMenuId();
		} else {
			setSelectedMenuId(id);
		}
	};
	const _handleClickMask = () => {
		setSelectedMenuId();
	};
	const _renderLotterySelector = () => {
		return (
			// TODO use pr #1138 [手機平台-頁面]  官方 menu 實作的 component 處理
			<div>lottery selector</div>
		);
	};

	const menuItems = [
		{ title: selectedLottery.name, id: 1, dropdownContent: _renderLotterySelector(), },
		{ title: '最近开奖', id: 2, dropdownContent: (
			<RecentDrawingTable
				lotteryClassId={selectedLotteryClass.id}
				lotteryDrawingRecords={lotteryDrawingRecords}
			/>)
		},
	];

	return (
		<div className={PREFIX_CLASS}>
			<DropdownMenuBar
				menuItems={menuItems}
				selectedId={selectedMenuId}
				onClickMenu={_handleClickMenu}
				onClickMask={_handleClickMask}
			/>
		</div>
	);
}

XinYongBetDropdownMenu.propTypes = propTypes;
XinYongBetDropdownMenu.defaultProps = defaultProps;

export default XinYongBetDropdownMenu;
