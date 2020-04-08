import React, { Component, } from 'react';
import CollectionBox from '../../../src/components/collection-box';

const lotteryClasses = [
	{ id: 0, name: '时时彩', },
	{ id: 1, name: '华宇彩', },
	{ id: 2, name: '11选5', },
	{ id: 3, name: '快乐彩', },
	{ id: 4, name: 'PC蛋蛋', },
	{ id: 5, name: '数字3D', },
];

const lotteries = {
	0: [
		{ id: 1, name: '重庆时时彩', },
		{ id: 11, name: '韩式1.5分', },
		{ id: 12, name: '东京1.5分', },
		{ id: 16, name: '腾讯分分彩', },
		{ id: 17, name: '腾讯5分彩', },
		{ id: 18, name: '美东二分彩', },
		{ id: 19, name: '腾讯10分彩', },
		{ id: 20, name: '腾讯11分彩', },
		{ id: 21, name: '腾讯12分彩', },
		{ id: 22, name: '腾讯13分彩', },
		{ id: 23, name: '腾讯14分彩', },
	],
	1: [
		{ id: 31, name: '华宇5分彩', },
		{ id: 32, name: '华宇2分彩', },
		{ id: 33, name: '华宇分分彩', },
	],
};

const myLotteryIds = [1, 16, 33, ];

class MyCollection extends Component {
	constructor(props) {
		super(props);

		this.state = {
			myLotteryIds: myLotteryIds,
		};

		this._handleChangeMyLotteryIds = this._handleChangeMyLotteryIds.bind(this);
	}

	_handleChangeMyLotteryIds(lotteryIds) {
		this.setState({ myLotteryIds: lotteryIds, });
	}

	render() {
		const { myLotteryIds, } = this.state;
		const { _handleChangeMyLotteryIds, } = this;

		return (
			<div className="ljit-my-collection" style={{ width: '520px', }}>
				<p>
					current my collection IDs: [{myLotteryIds.toString()}],
					total: {myLotteryIds.length}
				</p>

				<CollectionBox
					mainList={lotteryClasses}
					subList={lotteries}
					selectedIds={myLotteryIds}
					onChange={_handleChangeMyLotteryIds}
				/>
			</div>
		);
	}
}

export default MyCollection;