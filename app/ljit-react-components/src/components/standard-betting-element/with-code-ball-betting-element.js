import React, { Component, } from 'react';
import PropTypes from 'prop-types';

import {
	QuickTypeEnum,
	generateData,
	generateDataForLabelsWithCodes,
	generateNextData,
	generatePositionDescription,
	generateQuickSelectData,
	convertDataToCombination as defaultConvertDataToCombination,
	convertPosition,
} from './utils';

import StandardBettingElementInput from '../standard-betting-element-input';

function withCodeBallBettingElement(
	labels = [],
	codes = [],
	{
		labelsWithCodes = [],
		// TODO add '冷熱遺漏' on and off config
		positions = [],
		minPositionCount = 0,
		quickOptions = [
			QuickTypeEnum.ALL,
			QuickTypeEnum.BIG,
			QuickTypeEnum.SMALL,
			QuickTypeEnum.ODD,
			QuickTypeEnum.EVEN,
			QuickTypeEnum.NONE,
		],
		codeSplitter = '',
		getNextData = generateNextData,
		convertDataToCombination = defaultConvertDataToCombination,
	}
) {
	class CodeBallBettingElement extends Component {
		constructor(props) {
			super(props);

			this.state = {
				data: labelsWithCodes.length ? generateDataForLabelsWithCodes(labelsWithCodes) : generateData(labels, codes),
				positions,
			};

			this._handlePressQuickSelect = this._handlePressQuickSelect.bind(this);
			this._handleSelectCode = this._handleSelectCode.bind(this);
			this._handleSelectPosition = this._handleSelectPosition.bind(this);
		}

		_handlePressQuickSelect(quickSelectActionType, quickSelectPositionName) {
			this.setState((prevState) => {
				return {
					data: generateQuickSelectData({
						quickSelectActionType,
						quickSelectPositionName,
						data: prevState.data,
					}),
				};

			}, () => {
				this.props.onUpdateCombination(convertDataToCombination(this.state.data, codeSplitter));
			});
		}

		_handleSelectCode(index1, index2) {
			this.setState((prevState) => {
				prevState.data = getNextData(index1, index2, prevState.data);

				return prevState;

			}, () => {
				this.props.onUpdateCombination(convertDataToCombination(this.state.data, codeSplitter));
			});
		}

		_handleSelectPosition(index) {
			if (positions.length > 0) {
				this.setState((prevState) => {
					const isSelected = prevState.positions[index].isSelected;

					prevState.positions[index].isSelected = !isSelected;

					return prevState;

				}, () => {
					this.props.onUpdatePosition(convertPosition(this.state.positions));
				});
			}
		}

		render() {
			const {
				data,
				positions,
			} = this.state;

			const {
				_handlePressQuickSelect,
				_handleSelectCode,
				_handleSelectPosition,
			} = this;
			
			const { isMobile, } = this.props;

			return (
				<StandardBettingElementInput.CodeBall
					isMobile={isMobile}
					positions={positions}
					positionDescription={generatePositionDescription(positions, minPositionCount)}
					data={data}
					quickOptions={quickOptions}
					onSelectCode={_handleSelectCode}
					onSelectPosition={_handleSelectPosition}
					onPressQuickOption={_handlePressQuickSelect}
				/>
			);
		}

		componentDidMount() {
			const {
				data,
				positions,
			} = this.state;

			const {
				onUpdateCombination,
				onUpdatePosition,
			} = this.props;

			onUpdateCombination(convertDataToCombination(data, codeSplitter));

			if (positions.length > 0) {
				onUpdatePosition(convertPosition(positions));
			}
		}
	}

	CodeBallBettingElement.propTypes = {
		onUpdateCombination: PropTypes.func,
		onUpdatePosition: PropTypes.func,
		isMobile: PropTypes.bool,
	};

	CodeBallBettingElement.defaultProps = {
		onUpdateCombination: () => {},
		onUpdatePosition: () => {},
		isMobile: false,
	};

	return CodeBallBettingElement;
}

export default withCodeBallBettingElement;
