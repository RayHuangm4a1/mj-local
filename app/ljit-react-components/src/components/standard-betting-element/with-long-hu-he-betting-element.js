import React, { Component, } from 'react';
import PropTypes from 'prop-types';

import {
	generateData,
	generateNextData as defaultGenerateNextData,
	generatePositionDescription,
	convertDataToCombination,
	convertPosition,
} from './utils';

import StandardBettingElementInput from '../standard-betting-element-input';

function withLongHuHeBettingElement(
	labels = [],
	{
		codes = ['龙', '虎', '和',],
		positions = [],
		minPositionCount = 0,
		codeSplitter = '',
		generateNextData = defaultGenerateNextData,
	}
) {
	class LongHuHeBettingElement extends Component {
		constructor(props) {
			super(props);

			this.state = {
				data: generateData(labels, codes),
				positions,
			};

			this._handleSelectCode = this._handleSelectCode.bind(this);
			this._handleSelectPosition = this._handleSelectPosition.bind(this);
		}

		_handleSelectCode(index1, index2) {
			this.setState((prevState) => {
				prevState.data = generateNextData(index1, index2, prevState.data);

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
				_handleSelectCode,
				_handleSelectPosition,
			} = this;

			const {
				data,
				positions,
			} = this.state;

			const {
				codeBallBonus,
			} = this.props;

			return (
				<StandardBettingElementInput.LongHuHe
					positions={positions}
					positionDescription={generatePositionDescription(positions, minPositionCount)}
					data={data}
					codeBallBonus={codeBallBonus}
					onSelectCode={_handleSelectCode}
					onSelectPosition={_handleSelectPosition}
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

	LongHuHeBettingElement.propTypes = {
		onUpdateCombination: PropTypes.func,
		onUpdatePosition: PropTypes.func,
		codeBallBonus: PropTypes.object,
		isMobile: PropTypes.bool,
	};

	LongHuHeBettingElement.defaultProps = {
		onUpdateCombination: () => {},
		onUpdatePosition: () => {},
		codeBallBonus: {},
		isMobile: false,
	};

	return LongHuHeBettingElement;
}

export default withLongHuHeBettingElement;
