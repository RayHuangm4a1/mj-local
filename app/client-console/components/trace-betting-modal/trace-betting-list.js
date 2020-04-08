import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import isEqual from 'lodash/isEqual';
import TraceTable from './trace-table';

const propTypes = {
	className: PropTypes.string,
	hasProfitColumn: PropTypes.bool,
	traceBettingsData: PropTypes.arrayOf(PropTypes.shape({
		issue: PropTypes.string,
		multiple: PropTypes.number,
		reward: PropTypes.number,
		amount: PropTypes.number,
		accumulation: PropTypes.number,
		profit: PropTypes.number,
		profitRate: PropTypes.number,
	})).isRequired,
	totalBettingCount: PropTypes.number.isRequired,
	totalBettingAmount: PropTypes.number.isRequired,
	onChangeMultiple: PropTypes.func,
};

const defaultProps = {
	className: '',
	hasProfitColumn: false,
	onChangeMultiple: () => {},
};

const PREFIX_CLASS = 'trace-betting-list';

class TraceBettingList extends Component {
	constructor() {
		super();
	}

	render() {
		const {
			className,
			hasProfitColumn,
			traceBettingsData,
			totalBettingCount,
			totalBettingAmount,
			onChangeMultiple,
		} = this.props;
		const zhuiHaoQiShu = <span className={`${PREFIX_CLASS}__number`}>{traceBettingsData.length}</span>;
		const count = <span className={`${PREFIX_CLASS}__number`}>{totalBettingCount}</span>;
		const amount = <span className={`${PREFIX_CLASS}__number`}>{totalBettingAmount}</span>;

		return (
			<div className={cx(`${PREFIX_CLASS}__wrapper`, className)}>
				<div className={`${PREFIX_CLASS}__table-row`}>
					<TraceTable
						hasProfitColumn={hasProfitColumn}
						traceBettings={traceBettingsData}
						onChangeMultiple={onChangeMultiple}
					/>
				</div>
				<div className={`${PREFIX_CLASS}__summary-row`}>共 {count} 注，追 {zhuiHaoQiShu} 期，總追號金額 {amount} 元</div>
			</div>
		);
	}

	shouldComponentUpdate(nextProps) {
		if (!isEqual(this.props.traceBettingsData, nextProps.traceBettingsData)) {
			return true;
		}
		return false;
	}
}

TraceBettingList.propTypes = propTypes;
TraceBettingList.defaultProps = defaultProps;

export default TraceBettingList;
