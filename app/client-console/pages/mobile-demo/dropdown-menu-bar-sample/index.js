import React, { useState, } from 'react';
import { DropdownMenuBar, } from 'ljit-react-components';

function DropdownMenuBarSample() {
	const [selectedId, setSelectedId] = useState();
	const [data1, setData1] = useState('重庆时时彩');
	const [data2, setData2] = useState('前三直选複式');
	const _handleClickMenu = (id) => {
		if (selectedId === id) {
			setSelectedId();
		} else {
			setSelectedId(id);
		}
	};
	const _handleClickMask = () => {
		setSelectedId();
	};

	const options1 = ['重庆时时彩', 'b时时彩', 'c时时彩'];
	const options2 = ['前三直选複式', 'b直选複式', 'c直选複式'];

	function _renderDropdown(options, onClickItem) {
		return (
			<div style={{ height: '30vh', }}>
				<ul
					onClick={(e) => {
						onClickItem(e.target.innerText);
						setSelectedId();
					}}
				>
					{options.map((option, i) => {
						return (
							<li key={i}>
								{option}
							</li>
						);
					})}
				</ul>
				<div onClick={() => {
					setSelectedId();
				}}
				>close</div>
			</div>
		);
	}

	const menuItems = [
		{ title: data1, id: 1, dropdownContent: _renderDropdown(options1, setData1), },
		{ title: data2, id: 2, dropdownContent: _renderDropdown(options2, setData2), },
		{ title: '最近开奖', id: 3, dropdownContent: (
			<div>
				<div>最近开奖 1,2,3,4,5</div>
				<div onClick={() => {
					setSelectedId();
				}}
				>close</div>
			</div>
		), },
	];

	return (
		<DropdownMenuBar
			menuItems={menuItems}
			selectedId={selectedId}
			onClickMenu={_handleClickMenu}
			onClickMask={_handleClickMask}
		/>
	);
}

export default DropdownMenuBarSample;
