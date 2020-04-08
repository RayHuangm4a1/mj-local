import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import LotteryList from '../../components/lottery-list';
import { connect } from 'ljit-store-connecter';

const StatusEnums = {
	ONLINE: 'online',
	MAINTENANCE: 'maintenance',
	OFFLINE: 'offline',
};

// TODO add lotteryDrawings data
const propTypes = {
	lotteriesMapData: PropTypes.objectOf(PropTypes.shape({
		_id: PropTypes.string,
		id: PropTypes.number,
		name: PropTypes.string,
		code: PropTypes.string,
		lotteryClass: {
			id: PropTypes.number,
			name: PropTypes.string,
			code: PropTypes.string,
			status: PropTypes.oneOf(Object.values(StatusEnums)),
		},
		playClasses: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.number,
				name: PropTypes.string,
				code: PropTypes.string,
			}),
		),
		numOfIssues: PropTypes.number,
		status: PropTypes.oneOf(Object.values(StatusEnums)),
		ordering: PropTypes.number,
		tags: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string,
			code: PropTypes.string,
		})),
	})),
	onNavigate: PropTypes.func,
};
const defaultProps = {
	onNavigate: () => {},
};

class HotLotteryList extends Component {
	constructor() {
		super();

		this._handleClickLottery = this._handleClickLottery.bind(this);
	}

	_handleClickLottery(lottery) {
		const { onNavigate, } = this.props;
		const { id: lotteryId, lotteryClass = {}, } = lottery;
		const { id: lotteryClassId, } = lotteryClass;

		onNavigate(`/lottery/${lotteryClassId}/${lotteryId}/standard`);
	}

	render() {
		const { lotteriesMapData, } = this.props;
		const { _handleClickLottery } = this;
		const hotLotteryList = getHotLotteries(lotteriesMapData);

		return (
			<LotteryList
				lotteries={hotLotteryList}
				lotteryDrawings={fakelotteryDrawingsData}
				onClickLottery={_handleClickLottery}
			/>
		);
	}
}
function mapStateToProps(state) {
	return {
		// TODO get lotteryDrawings Data
		lotteriesMapData: state.lotteries.get('lotteriesMapData').toObject(),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		// TODO add update updatea lotteryDrawings Data action
	};
}

HotLotteryList.propTypes = propTypes;
HotLotteryList.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(HotLotteryList);

// remove while api done
const fakelotteryDrawingsData = {
	12: { current: { closedAt: new Date(1600001114409) } },
	16: { current: { closedAt: new Date(1605001114409) } },
	3: { current: { closedAt: new Date(1600001114409) } },
};

// API 確定之後 要把 tag 的 id 宣告成 enum
const getHotLotteries = (lotteriesMapData) =>
	Object.values(lotteriesMapData).filter(
		(lottery) => lottery.tags.find(tag => tag.id === 1)
	);
