import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import PageBlock from '../../../../components/page-block';
import { HeaderButtonBar, Button, } from 'ljit-react-components';
import PageModal from '../../../../components/page-modal';
import XinyongOddsTable from './xinyong-odds-table';
import './style.styl';
import { connect, } from 'ljit-store-connecter';
import { LoadingStatusEnum } from '../../../../lib/enums';
import { PlayClassIdEnums } from '../../../../lib/enums';
import {
	lotteryPlayConditionsActions,
	lotteryPlaysActions,
} from '../../../../controller';
import { withLoadingStatusNotification } from '../../../../../lib/notify-handler';
import { RouteKeyEnums } from '../../../../routes';

const { LOTTERY_ODDS_XINYONG } = RouteKeyEnums;
const { fetchLotteryPlayConditionsAction, } = lotteryPlayConditionsActions;
const { fetchLotteryPlaysAction } = lotteryPlaysActions;
const {
	NONE,
	SUCCESS,
	FAILED,
	LOADING,
} = LoadingStatusEnum;
const { XING_YONG, } = PlayClassIdEnums;
const { Message, } = PageModal;
const propTypes = {
	onNavigate: PropTypes.func,
	lotteryClassId: PropTypes.string,
	lotteryId: PropTypes.string,
	playConditionId: PropTypes.string,
	onUpdate: PropTypes.func.isRequired,
	lotteries: PropTypes.array,
	lotteriesLoadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING,]).isRequired,
	playConditionsLoadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING,]).isRequired,
	lotteriesLoadingStatusMessage: PropTypes.string.isRequired,
	playConditionsLoadingStatusMessage: PropTypes.string.isRequired,
	fetchLotteryPlayConditionsAction: PropTypes.func.isRequired,
	fetchLotteryPlaysAction: PropTypes.func.isRequired,
	playConditionsData: PropTypes.array,
};

const defaultProps = {
	lotteryClassId: '',
	lotteryId: '',
	playConditionId: '',
	lotteries: [],
};

class LotteryOddsXinyongEditPage extends Component {
	constructor() {
		super();
		this.state = {
			isConfirmMessageVisible: false,
		};
		this._handleConfirm = this._handleConfirm.bind(this);
		this._handleOnUpdate = this._handleOnUpdate.bind(this);
		this._handleNavigateBack = this._handleNavigateBack.bind(this);
	}

	_handleNavigateBack() {
		const {
			lotteryClassId,
			lotteryId,
			playConditionId,
			onNavigate,
		} = this.props;

		onNavigate(LOTTERY_ODDS_XINYONG, {
			passProps: {
				lotteryClassId,
				lotteryId,
				playConditionId,
			}
		});
	}

	_handleConfirm() {
		// TODO dispatch confirm action
		this._handleNavigateBack();
		this.setState({ isConfirmMessageVisible: false, });
	}

	_handleOnUpdate() {
		const { lotteries, lotteryId, onUpdate } = this.props;

		const lottery = lotteries.filter(lottery => lottery.id === Number(lotteryId))[0];
		const lotteryName = lottery ? lottery.name : '';

		onUpdate({
			lotteryName
		});
	}

	render() {
		const { isConfirmMessageVisible } = this.state;
		const { _handleConfirm, _handleNavigateBack } = this;
		const {
			playConditionsData,
			playConditionId,
		} = this.props;
		const playCondition = playConditionsData.filter(playCondition => playCondition.id === Number(playConditionId))[0]; 
		const subconditions = playCondition ? playCondition.subconditions : [];

		return (
			<div>
				<div className="xin-yong-odds-edit">
					<HeaderButtonBar
						left={
							<Button
								outline={Button.OutlineEnums.HOLLOW}
								onClick={_handleNavigateBack}
								className="xin-yong-odds-edit__button"
							>
							返回上一層
							</Button>
						}
					/>
					<PageBlock>
						<Button
							color={Button.ColorEnums.BRIGHTBLUE500}
							onClick={ () => { this.setState({ isConfirmMessageVisible: true, }); } }
						>
						储存
						</Button>
						<XinyongOddsTable
							isEdit
							subconditions={subconditions}
						/>
					</PageBlock>
				</div>
				<Message
					visible={isConfirmMessageVisible}
					title="提示"
					message="确定变更项目？"
					onClickOk={_handleConfirm}
					onClickCancel={() => this.setState({ isConfirmMessageVisible: false, })}
				/>
			</div>
		);
	}
	componentDidMount() {
		const {
			lotteryId,
			fetchLotteryPlaysAction,
			fetchLotteryPlayConditionsAction
		} = this.props;

		this._handleOnUpdate();
		fetchLotteryPlaysAction(lotteryId, XING_YONG);
		fetchLotteryPlayConditionsAction(lotteryId, XING_YONG);
	}
	componentDidUpdate(prevProps) {
		const { lotteriesLoadingStatus, } = this.props;
		const { _handleOnUpdate, } = this;

		if (prevProps.lotteriesLoadingStatus === LOADING && lotteriesLoadingStatus === SUCCESS) {
			_handleOnUpdate();
		}
	}
}

LotteryOddsXinyongEditPage.propTypes = propTypes;
LotteryOddsXinyongEditPage.defaultProps = defaultProps;

function mapStateToProp(state) {
	return {
		lotteries: state.lotteryClassesAndLotteries.get('lotteries').toArray(),
		lotteriesLoadingStatus: state.lotteryClassesAndLotteries.get('loadingStatus'),
		lotteriesLoadingStatusMessage: state.lotteryClassesAndLotteries.get('loadingStatusMessage'),
		playConditionsData: state.lotteryPlayConditions.get('data').toArray(),
		playConditionsLoadingStatus: state.lotteryPlayConditions.get('loadingStatus'),
		playConditionsLoadingStatusMessage: state.lotteryPlayConditions.get('loadingStatusMessage'),
	};
}

function mapDispatchToProp(dispatch) {
	return {
		fetchLotteryPlaysAction: (lotteryId, playClassId) => dispatch(fetchLotteryPlaysAction(lotteryId, playClassId)),
		fetchLotteryPlayConditionsAction: (lotteryId, playClassId) => dispatch(fetchLotteryPlayConditionsAction(lotteryId, playClassId)),
	};
}

export default connect(mapStateToProp, mapDispatchToProp)(withLoadingStatusNotification(
	[
		{
			loadingStatus: 'lotteriesLoadingStatus',
			loadingStatusMessage: 'lotteriesLoadingStatusMessage',
		},
		{
			loadingStatus: 'playConditionsLoadingStatus',
			loadingStatusMessage: 'playConditionsLoadingStatusMessage',
		},
	],
	LotteryOddsXinyongEditPage)
);
