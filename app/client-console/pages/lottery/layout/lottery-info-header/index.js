import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'ljit-react-components';
import LotteryDrawingInfoCard from '../../../../features/lottery-drawing-info-card';
import { connect } from '../../../../../ljit-store-connecter';
import { withFeatureToggle, layoutConfigsPropTypes, } from '../../../../../lib/feature-toggle-provider';
import { default as compose } from 'lodash/flowRight';
import { FeatureCodeEnum, } from '../../../../lib/enums';
import './style.styl';

const PREFIX_CLASS = 'client-page-header';

const propTypes = {
	isDrawingTrendVisible: PropTypes.bool,
	isTurnOnSound: PropTypes.bool,
	lotteryDrawingsData: PropTypes.object.isRequired,
	lotteryId: PropTypes.string.isRequired,
	lotteryClassId: PropTypes.string.isRequired,
	layoutConfigs: layoutConfigsPropTypes,
};

class LotteryInfoHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isDrawingTrendVisible: props.isDrawingTrendVisible,
			isTurnOnSound: props.isTurnOnSound,
		};

		this._renderTrendToggle = this._renderTrendToggle.bind(this);
	}

	_renderTrendToggle() {
		const {
			layoutConfigs,
		} = this.props;
		const { isDrawingTrendVisible, } = this.state;
		const {
			toggles: {
				is_TREND_TOGGLE_Active,
			}
		} = layoutConfigs;

		if (is_TREND_TOGGLE_Active) {
			return (
				<React.Fragment>
					<span>走势图</span>
					<div >
						<Switch
							checked={isDrawingTrendVisible}
							onChange={checked => this.setState({ isDrawingTrendVisible: checked, })}
						/>
					</div>
				</React.Fragment>
			);
		}

		return null;
	}

	render() {
		const {
			lotteryId,
			lotteryClassId,
		} = this.props;
		const { isTurnOnSound } = this.state;
		const {
			_renderTrendToggle
		} = this;

		return (
			<div className={`${PREFIX_CLASS}`}>
				<div className={`${PREFIX_CLASS}__header`}>
					<div className={`${PREFIX_CLASS}__content`}>
						<LotteryDrawingInfoCard
							lotteryId={lotteryId}
							lotteryClassId={lotteryClassId}
						/>
						<div className={`lottery-info ${PREFIX_CLASS}__lottery-info`}>
							<div className="lottery-info__trend">
								{_renderTrendToggle()}
							</div>
							<div className="lottery-info__sound">
								<span>中奖音效</span>
								<div >
									<Switch
										checked={isTurnOnSound}
										onChange={checked => this.setState({ isTurnOnSound: checked, })}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
	shouldComponentUpdate(nextProps, nextState) {
		const thisLotteryDrawings = this.props.lotteryDrawingsData[this.props.lotteryId];
		const nextLotteryDrawings = nextProps.lotteryDrawingsData[nextProps.lotteryId];

		if (nextProps.lotteryId !== this.props.lotteryId) return true;

		if ((thisLotteryDrawings === undefined) && nextLotteryDrawings) return true;

		if (thisLotteryDrawings && (nextLotteryDrawings === undefined)) return true;

		if ((thisLotteryDrawings === undefined) && (nextLotteryDrawings === undefined)) return false;

		if (thisLotteryDrawings.current.issue !== nextLotteryDrawings.current.issue) return true;

		return (this.state.isDrawingTrendVisible !== nextState.isDrawingTrendVisible)
			|| (this.state.isTurnOnSound !== nextState.isTurnOnSound);
	}
}

LotteryInfoHeader.propTypes = propTypes;

function mapStateToProps(state) {
	return {
		lotteryDrawingsData: state.lotteryDrawings.get('data').toJSON(),
	};
}

function mapDispatchToProps(dispatch) {
	return {};
}

export default compose(
	connect(mapStateToProps,mapDispatchToProps),
	withFeatureToggle(FeatureCodeEnum.LOTTERY_INFO_HEADER)
)(LotteryInfoHeader);
