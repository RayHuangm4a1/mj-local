import React, { Component, } from 'react';
import PropTypes from 'prop-types';

import BettingWeizhiBlock from '../../betting-weizhi-block';
import StandardBettingRow from '../../standard-betting-row';
import { BallSizeEnum, } from '../../standard-betting-element/utils';

const CLASS_PREFIX = 'ljit-betting-element-input';

class RoundBallBettingElementInput extends Component {
	constructor(props) {
		super(props);

		this._handlePressCodeBall = this._handlePressCodeBall.bind(this);
		this._handlePressCheckbox = this._handlePressCheckbox.bind(this);
		this._renderCheckboxRow = this._renderCheckboxRow.bind(this);
		this._renderRoundBallRow = this._renderRoundBallRow.bind(this);
	}

	_handlePressCheckbox(index) {
		this.props.onSelectPosition(index);
	}

	_handlePressCodeBall(index1, index2) {
		this.props.onSelectCode(index1, index2);
	}

	_renderCheckboxRow() {
		const {
			positions,
			positionDescription,
		} = this.props;

		const { _handlePressCheckbox, } = this;

		if (positions.length > 0) {
			return (
				<BettingWeizhiBlock
					className={`${CLASS_PREFIX}__weizhi-block`}
					options={positions}
					description={positionDescription}
					onPressCheckbox={_handlePressCheckbox}
				/>
			);
		}
	}

	_renderRoundBallRow() {
		const {
			data,
			codeBallSize,
			codeBallBadges,
		} = this.props;

		const {
			_handlePressCodeBall,
		} = this;

		return data.map((item, index) => {
			return (
				<StandardBettingRow.RoundBall
					key={'StandardBettingRow.RoundBall' + item.name }
					title={item.name}
					codes={item.codes}
					codeBallSize={codeBallSize}
					codeBallBadges={codeBallBadges}
					onPressCodeBall={_handlePressCodeBall.bind(this, index)}
				/>
			);
		});
	}

	render() {
		const {
			_renderCheckboxRow,
			_renderRoundBallRow,
		} = this;

		return (
			<div>
				{_renderCheckboxRow()}
				{_renderRoundBallRow()}
			</div>
		);
	}
}

RoundBallBettingElementInput.propTypes = {
	positions: PropTypes.array,
	positionDescription: PropTypes.string,
	data: PropTypes.array,
	onSelectCode: PropTypes.func,
	onSelectPosition: PropTypes.func,
	codeBallSize: PropTypes.oneOf(Object.values(BallSizeEnum).concat('')),
	codeBallBadges: PropTypes.object,
};

RoundBallBettingElementInput.defaultProps = {
	positions: [],
	positionDescription: '',
	data: [],
	codeBallBadges: {},
	onSelectCode: () => {},
	onSelectPosition: () => {},
};

export default RoundBallBettingElementInput;
