import React, { Component, } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import '../style.styl';

import BettingWeizhiBlock from '../../betting-weizhi-block';
import StandardBettingRow from '../../standard-betting-row';

const { SOLID, HOLLOW, } = BettingWeizhiBlock.CheckboxStyleEnum;

const CLASS_PREFIX = 'ljit-betting-element-input';

class CodeBallBettingElementInput extends Component {
	constructor(props) {
		super(props);

		this._handlePressCodeBall = this._handlePressCodeBall.bind(this);
		this._handlePressCheckbox = this._handlePressCheckbox.bind(this);
		this._renderCheckboxRow = this._renderCheckboxRow.bind(this);
		this._renderCodeBallRow = this._renderCodeBallRow.bind(this);
	}

	_handlePressCodeBall(index1, index2) {
		this.props.onSelectCode(index1, index2);
	}

	_handlePressCheckbox(index) {
		this.props.onSelectPosition(index);
	}

	_renderCheckboxRow() {
		const {
			positions,
			positionDescription,
			isMobile,
		} = this.props;

		const { _handlePressCheckbox, } = this;

		if (positions.length > 0) {
			return (
				<BettingWeizhiBlock
					checkboxStyle={isMobile ? HOLLOW : SOLID}
					className={cx(`${CLASS_PREFIX}__weizhi-block`, {
						[`${CLASS_PREFIX}__weizhi-block--mobile`]: isMobile,
					})}
					options={positions}
					description={isMobile ? null : positionDescription}
					onPressCheckbox={_handlePressCheckbox}
				/>
			);
		}
	}

	_renderCodeBallRow() {
		const {
			data,
			onPressQuickOption,
			quickOptions,
			isMobile,
		} = this.props;

		const {
			_handlePressCodeBall,
		} = this;

		let StandardBettingRowCodeBall = isMobile ? StandardBettingRow.MobileCodeBall : StandardBettingRow.CodeBall;

		return data.map((item, index) => {
			return (
				<StandardBettingRowCodeBall
					key={'StandardBettingRow.CodeBall' + item.name + index}
					title={item.name}
					codes={item.codes}
					quickOptions={quickOptions}
					onPressCodeBall={_handlePressCodeBall.bind(this, index)}
					onPressQuickOption={onPressQuickOption}
				/>
			);
		});
	}

	render() {
		const {
			_renderCheckboxRow,
			_renderCodeBallRow,
		} = this;

		return (
			<div>
				{_renderCheckboxRow()}
				{_renderCodeBallRow()}
			</div>
		);
	}
}

CodeBallBettingElementInput.propTypes = {
	positions: PropTypes.array,
	positionDescription: PropTypes.string,
	data: PropTypes.array,
	quickOptions: PropTypes.array,
	onSelectCode: PropTypes.func,
	onSelectPosition: PropTypes.func,
	onPressQuickOption: PropTypes.func,
	isMobile: PropTypes.bool,
};

CodeBallBettingElementInput.defaultProps = {
	positions: [],
	positionDescription: '',
	data: [],
	quickOptions: [],
	onSelectCode: () => {},
	onSelectPosition: () => {},
	onPressQuickOption: () => {},
	isMobile: false,
};

export default CodeBallBettingElementInput;
