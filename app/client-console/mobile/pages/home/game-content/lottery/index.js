import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PREFIX_CLASS } from '../../';
import IconTag from '../../../../../components/icon-tag';
import Collection from './collection';

const propTypes = {
	onPressLottery: PropTypes.func,
};

function Lottery({ onPressLottery }) {
	
	const lotteryOptions = [
		{
			name: '收藏',
			component: <Collection onPressLottery={onPressLottery}/>
		},
		{
			name: '時時彩',
			component: <div>時時彩</div>
		},
		{
			name: '11選5',
			component: <div>11選5</div>
		},
		{
			name: '快樂彩',
			component: <div>快樂彩</div>
		},
		{
			name: 'PC蛋蛋',
			component: <div>PC蛋蛋</div>
		},
		{
			name: '數字3D',
			component: <div>數字3D</div>
		},
		{
			name: '六合彩',
			component: <div>六合彩</div>
		},
		{
			name: 'VR彩票',
			component: <div>VR彩票</div>
		},
	];

	const [ optionIndex, setOptionIndex ] = useState(0);
	const lotteryOption = lotteryOptions[optionIndex];


	return (
		<React.Fragment> 
			<div className={`${PREFIX_CLASS}__lottery-options`}>
				{
					lotteryOptions.map((option, index) => (
						<IconTag
							key={index}
							text={option.name}
							onClick={() => {setOptionIndex(index);}}
							isSelected={index === optionIndex}
							selectedStyle={IconTag.SelectedStyleEnums.BOLD}
						/>
					))
				}
			</div>
			<div className={`${PREFIX_CLASS}__lottery-title`}>{lotteryOption.name}</div>
			<div className={`${PREFIX_CLASS}__lottery-content`} >{lotteryOption.component}</div>
		</React.Fragment>
	);
}

Lottery.propTypes = propTypes;

export default Lottery;
