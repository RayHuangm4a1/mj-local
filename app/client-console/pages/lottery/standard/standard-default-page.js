import { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect, } from 'ljit-store-connecter';
import { RouteKeyEnums, } from '../../../route';
import { PlayClassesEnum, } from '../../../lib/enums';

const { LOTTERY_HOME, } = RouteKeyEnums;
const { STANDARD, } = PlayClassesEnum;
const propTypes = {
	renderedRoutes: PropTypes.object,
	playConditionsData: PropTypes.array,
	pathName: PropTypes.string,
	onNavigate: PropTypes.func,
	lotteryId: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]),
	lotteriesMapData: PropTypes.object,
};

class StandardDefaultPage extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return null;
	}
	componentDidUpdate() {
		const {
			onNavigate,
			lotteryId,
			playConditionsData,
			lotteriesMapData,
		} = this.props;
		const lottery = lotteriesMapData[lotteryId];
		const { lotteryClass = {}, } = lottery;
		const hasPlayConditionData = playConditionsData.length > 0;
		const isPlayConditionIdMatchLotteryId = hasPlayConditionData ? playConditionsData[0].lottery.id === parseInt(lotteryId, 10) : false;
		const canNavigate = hasPlayConditionData && isPlayConditionIdMatchLotteryId;

		if (canNavigate) {
			onNavigate(`${LOTTERY_HOME}/${lotteryClass.id}/${lottery.id}/${STANDARD}/${playConditionsData[0].id}`);
		}
	}
} 

StandardDefaultPage.propTypes = propTypes;

function mapStateToProps(state) {
	return {
		playConditionsData: state.playConditions.get('data').toObject().standard,
		lotteriesMapData: state.lotteries.get('lotteriesMapData').toObject(),
	};
}
function mapDispatchToProps(dispatch) {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(StandardDefaultPage);
