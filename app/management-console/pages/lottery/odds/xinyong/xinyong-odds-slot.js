import React, { Component, } from 'react';
import { CheckBox, InputNumber } from 'ljit-react-components';
import PropTypes from 'prop-types';
import { connect } from 'ljit-store-connecter';
import { LoadingStatusEnum } from '../../../../../lib/enums';
import { calculateBonus, calculateRebate } from '../../../../../lib/bonus-utils';
import find from 'lodash/find';
const {
	NONE,
	SUCCESS,
	FAILED,
	LOADING,
} = LoadingStatusEnum;
const propTypes = {
	isEdit: PropTypes.bool,
	playsData: PropTypes.array,
	playsLoadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING,]),
	playId: PropTypes.number,
	platformData: PropTypes.object,
};

const defaultProps = {
	isEdit: false,
};

class XinyongOddsSlot extends Component {
	constructor() {
		super();
		this.state = {
			play: {
				awards: {},
				pk: {},
			},
			bonus: 0,
		};
		this._renderSlot = this._renderSlot.bind(this);
		this._renderPK = this._renderPK.bind(this);
		this._handleChangeValue = this._handleChangeValue.bind(this);
		this._handleChangeIsPKValue = this._handleChangeIsPKValue.bind(this);
		this._handleSetData = this._handleSetData.bind(this);
	}
	_handleChangeValue(value) {
		this.setState({ bonus: value });
	}
	_handleChangeIsPKValue(event) {
		this.setState({
			isPKValue: event.target.checked
		});
	}
	_renderSlot() {
		const { bonus } = this.state;
		const { _handleChangeValue } = this;
		const { isEdit, platformData } = this.props;
		const platformMaxBonus = platformData.bonus.max;
		const percentItem = (
			<span className="xin-yong-odds-slot__percent">{`(${calculateRebate(bonus, platformMaxBonus)}%)`}</span>
		);

		if (isEdit) {
			return (
				<div className="xin-yong-odds-slot__value">
					<InputNumber
						value={bonus}
						onChange={_handleChangeValue}
					/>
				</div>
			);
		} else {
			return (
				<div className="xin-yong-odds-slot__value"> {bonus}{percentItem} </div>
			);
		}
	}
	_renderPK() {
		const { _handleChangeIsPKValue } = this;
		const { play } = this.state;
		const { isEdit } = this.props;
		const { pk, } = play;
		const { isSupported, awards = {} } = pk;
		const awardKey = Object.keys(awards)[0];
		const isEnabled = awards[awardKey] ? awards[awardKey].isEnabled : false;

		if (!isSupported) {
			if (isEdit) {
				return null;
			} else {
				return <div className="xin-yong-odds-slot__options-text"> - </div>;
			}
		}

		if (isEdit) {
			return (
				<div>
					<CheckBox
						value={isEnabled}
						onChange={_handleChangeIsPKValue}
					>单挑</CheckBox>
				</div>
			);
		} else {
			return <div className="xin-yong-odds-slot__options-text"> { isEnabled ? '单挑' : '-'}</div>;
		}
	}
	_handleSetData() {
		const {
			playsData,
			playId,
			platformData
		} = this.props;

		const platformMaxBonus = platformData.bonus.max;
		const play = playsData.filter(play => play.id === playId)[0];
		const deltaBonus = getDeltaBonus(play);

		this.setState({
			play: play || { awards: {}, pk: {}, },
			bonus: calculateBonus(platformMaxBonus, deltaBonus),
		});
	}
	render() {
		const { _renderSlot, _renderPK, } = this;
		const { play } = this.state;
		const { name } = play;

		return (
			<div className="xin-yong-odds-slot">
				<div className="xin-yong-odds-slot__name"> {name} </div>
				{_renderSlot()}
				<div className="xin-yong-odds-slot__options">
					{_renderPK()}
				</div>
			</div>
		);
	}
	componentDidMount() {
		const { playsData } = this.props;
		const { _handleSetData } = this;

		if (playsData.length !== 0) {
			_handleSetData();
		}
	}
	componentDidUpdate(prevProps) {
		const { playsLoadingStatus } = this.props;
		const { _handleSetData } = this;

		if (prevProps.playsLoadingStatus === LOADING && playsLoadingStatus === SUCCESS) {
			_handleSetData();
		}
	}
}

XinyongOddsSlot.propTypes = propTypes;
XinyongOddsSlot.defaultProps = defaultProps;


function mapStateToProps(state) {
	return {
		playsData: state.lotteryPlays.get('plays').toArray(),
		playsLoadingStatus: state.lotteryPlays.get('loadingStatus'),
		platformData: state.platform.get('data').toObject(),
	};
}

export default connect(mapStateToProps)(XinyongOddsSlot);

function getDeltaBonus(play = {}) {
	let deltaBonus;

	try {
		const awards = play.awards;
		const awardKey = Object.keys(awards)[0];

		deltaBonus = awards[awardKey].deltaBonus;
	} catch {
		deltaBonus = 0;
	}

	return deltaBonus;
}
