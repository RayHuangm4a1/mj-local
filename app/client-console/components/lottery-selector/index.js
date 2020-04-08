import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { CollectionBox, } from 'ljit-react-components';
import './style.styl';

const propTypes = {
	className: PropTypes.string,
	lotteryClasses: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
	})),
	lotteries: PropTypes.objectOf(PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string,
			platform: PropTypes.objectOf(PropTypes.string),
			lotteryClass: PropTypes.shape({
				_id: PropTypes.string,
				id: PropTypes.number,
				name: PropTypes.string,
				code: PropTypes.string,
			}),
			playClasses: PropTypes.arrayOf(PropTypes.shape({
				id: PropTypes.number,
				name: PropTypes.string,
				code: PropTypes.string,
			})),
			id: PropTypes.number,
			name: PropTypes.string,
			code: PropTypes.string,
			numOfIssues: PropTypes.number,
			status: PropTypes.string,
			createdAt: PropTypes.instanceOf(Date),
			updatedAt: PropTypes.instanceOf(Date),
		})
	)),
	selectedLotteryIds: PropTypes.arrayOf(PropTypes.number),
	onChangeSelectedLotteryIds: PropTypes.func,
};
const defaultProps = {
	className: '',
	selectedLotteryIds: [],
	onChangeSelectedLotteryIds: () => {},
};

class LotterySelector extends Component {
	constructor() {
		super();
	}

	render() {
		const { className, lotteryClasses, lotteries, selectedLotteryIds, onChangeSelectedLotteryIds, } = this.props;

		return (
			<div className={cx('ljit-lottery-selector', className)}>
				<CollectionBox
					mainList={lotteryClasses}
					subList={lotteries}
					selectedIds={selectedLotteryIds}
					onChange={onChangeSelectedLotteryIds}
				/>
			</div>
		);
	}
}

LotterySelector.propTypes = propTypes;
LotterySelector.defaultProps = defaultProps;

export default LotterySelector;
