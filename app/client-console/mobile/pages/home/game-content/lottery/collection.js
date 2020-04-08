import React from 'react';
import PropTypes from 'prop-types';
import { PREFIX_CLASS } from '../../';
import { Countdown, CodeBall } from 'ljit-react-components';
import LotteryIcon from '../../../../../components/lottery-icon';
import { Icon } from 'ljit-react-components';

const propTypes = {
	onPressLottery: PropTypes.func.isRequired,
};

function Collection({ onPressLottery }) {

	function _renderMoveIcon() {
		return (
			<div className={`${PREFIX_CLASS}__collection-move-icon`}>
				<div></div>
				<div></div>
				<div></div>
			</div>
		);
	}
	function _renderBalls(opencode) {
		return opencode.split(',').map((item, index) => {
			return (
				<CodeBall.Circle
					key={index}
					text={item}
					className={`${PREFIX_CLASS}__collection-ball`}
					size={CodeBall.Circle.SizeEnum.SMALL}
					fontSize={CodeBall.Circle.FontSizeEnum.SMALL}
					type={CodeBall.Circle.StatusTypeEnum.SELECTED}
				/>
			);
		});
	}
	function _renderCollectionItem(drawing) {
		// TODO 實作拖拉改變位置功能
		const { code, name, previous, current } = drawing;

		return (
			// TODO 取得 lottery id 並導頁
			<li onClick={() => {onPressLottery();}} key={code}>
				{_renderMoveIcon()}
				<LotteryIcon lotteryCode={code}/>
				<div className={`${PREFIX_CLASS}__collection-name`}>
					<span>{previous.issue}</span> <br/> {name}
				</div>
				<Countdown
					className={`${PREFIX_CLASS}__collection-drawing`}
					title={_renderBalls(previous.opencode)}
					prefix={`${current.issue} 截止`}
				/>
				<Icon
					type={Icon.IconTypeEnums.RIGHT}
					className={`${PREFIX_CLASS}__collection-arrow`}
				/>
			</li>
		);
	}
	return (
		<div className={`${PREFIX_CLASS}__collection`}> 
			<div className={`${PREFIX_CLASS}__add-collection`} onClick={() => {/* TODO show select */}}>
				<div className={`${PREFIX_CLASS}__add-collection-icon`}> + </div>
				新增收藏
			</div>
			<ul>
				{
					fakeData.map(item => (
						_renderCollectionItem(item)
					))
				}
			</ul>
		</div>
	);
}

Collection.propTypes = propTypes;

export default Collection;

// TODO GET data from reducer and check data structure
const fakeData = [
	{
		name: '腾讯时时彩',
		code: 'dj1.5fc',
		previous: {
			opencode: '1,2,3,4,5',
			issue: '201b0610-012'
		},
		current: {
			opencode: null,
			issue: '201b0610-013'
		},
	},
	{
		name: '重庆时时彩',
		code: 'ccsss',
		previous: {
			opencode: '1,2,3,4,5',
			issue: '201b0610-012'
		},
		current: {
			opencode: null,
			issue: '201b0610-013'
		},
	},
	{
		name: '华宇2分彩',
		code: 'ahq3',
		previous: {
			opencode: '1,2,3,4,5',
			issue: '201b0610-012'
		},
		current: {
			opencode: null,
			issue: '201b0610-013'
		},
	},
	{
		name: 'PC蛋蛋',
		code: 'pcdd',
		previous: {
			opencode: '1,2,3,4,5',
			issue: '201b0610-012'
		},
		current: {
			opencode: null,
			issue: '201b0610-013'
		},
	},
	{
		name: 'PK10',
		code: 'ahq34',
		previous: {
			opencode: '1,2,3,4,5',
			issue: '201b0610-012'
		},
		current: {
			opencode: null,
			issue: '201b0610-013'
		},
	}
];
