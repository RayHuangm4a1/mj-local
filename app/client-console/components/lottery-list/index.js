import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import CountdownListItem from '../countdown-list-item';
import LotteryIcon from '../lottery-icon';
import DataInlineList from '../../components/data-inline-list';
import { get, } from 'lodash';
import './style.styl';

const prefixClass = 'ljit-lottery-list';

const propTypes = {
	lotteries: PropTypes.arrayOf(PropTypes.shape({
		code: PropTypes.string,
		id: PropTypes.number,
		name: PropTypes.string,
	})),
	lotteryDrawings: PropTypes.objectOf(PropTypes.shape({
		current: PropTypes.shape({
			closedAt: PropTypes.oneOfType([
				PropTypes.instanceOf(Date),
				PropTypes.string,
			]),
		})
	})),
	onClickLottery: PropTypes.func,
	isShowIcon: PropTypes.bool,
	isShowEndTime: PropTypes.bool,
};
const defaultProps = {
	lotteries: [],
	lotteryDrawings: {},
	onClickLottery: () => {},
	isShowIcon: true,
	isShowEndTime: false,
};

function LotteryList({ lotteries, lotteryDrawings, onClickLottery, isShowIcon, isShowEndTime, }) {
	return (
		<DataInlineList
			className={cx(prefixClass, { [`${prefixClass}--hide-end-time`]: !isShowEndTime, })}
			data={lotteries}
			onClickItem={onClickLottery}
			renderItem={(data = {}) => (
				<CountdownListItem
					name={data.name}
					// TODO change icon type base on lottery id or code
					prefix={isShowIcon ? <LotteryIcon lotteryCode={data.code}/> : null}
					endTime={get(lotteryDrawings, [data.id, 'current', 'closedAt'])}
				/>
			)}
		/>
	);
}

LotteryList.propTypes = propTypes;
LotteryList.defaultProps = defaultProps;

export default LotteryList;
