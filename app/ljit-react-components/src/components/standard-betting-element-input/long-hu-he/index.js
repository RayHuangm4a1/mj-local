import React, { Component, } from 'react';
import PropTypes from 'prop-types';

import BettingWeizhiBlock from '../../betting-weizhi-block';
import StandardBettingRow from '../../standard-betting-row';

const CLASS_PREFIX = 'ljit-betting-element-input';

class LongHuHeBettingElementInput extends Component {
	constructor(props) {
		super(props);

		this._handlePressCodeBall = this._handlePressCodeBall.bind(this);
		this._handlePressCheckbox = this._handlePressCheckbox.bind(this);
		this._renderCheckboxRow = this._renderCheckboxRow.bind(this);
		this._renderLongHuHeRow = this._renderLongHuHeRow.bind(this);
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

	_renderLongHuHeRow() {
		const {
			data,
		} = this.props;

		const {
			_handlePressCodeBall,
		} = this;

		return data.map((item, index) => {
			return (
				<StandardBettingRow.LongHuHe
					key={'StandardBettingRow.LongHuHe' + item.name + index}
					title={item.name}
					codes={item.codes}
					onPressCodeBall={_handlePressCodeBall.bind(this, index)}
				/>
			);
		});
	}

	render() {
		const {
			_renderCheckboxRow,
			_renderLongHuHeRow,
		} = this;

		return (
			<div>
				{_renderCheckboxRow()}
				{_renderLongHuHeRow()}
			</div>
		);
	}
}

LongHuHeBettingElementInput.propTypes = {
	positions: PropTypes.array,
	positionDescription: PropTypes.string,
	data: PropTypes.array,
	codeBallBonus: PropTypes.object,
	onSelectCode: PropTypes.func,
	onSelectPosition: PropTypes.func,
};

LongHuHeBettingElementInput.defaultProps = {
	positions: [],
	positionDescription: '',
	data: [],
	codeBallBonus: {},
	onSelectCode: () => {},
	onSelectPosition: () => {},
};

export default LongHuHeBettingElementInput;
