import React, { Component, } from 'react';
import PropTypes from 'prop-types';

import {
	generateData,
	generateNextData as defaultGenerateNextData,
	generatePositionDescription,
	convertDataToCombination,
	convertPosition,
	BallSizeEnum,
	generateCodeBallBadges,
} from './utils';

import StandardBettingElementInput from '../standard-betting-element-input';

function withRoundBallBettingElement(
	labels = [],
	codes = [],
	{
		positions = [],
		minPositionCount = 0,
		codeSplitter = '',
		generateNextData = defaultGenerateNextData,
		codeBallSize = BallSizeEnum.MIDDLE,
	}
) {
	class RoundBallBettingElement extends Component {
		constructor(props) {
			super(props);

			this.state = {
				data: generateData(labels, codes),
				codeBallBadges: generateCodeBallBadges(props.codeBallAwards),
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
				codeBallBadges
			} = this.state;

			return (
				<StandardBettingElementInput.RoundBall
					positions={positions}
					positionDescription={generatePositionDescription(positions, minPositionCount)}
					data={data}
					onSelectCode={_handleSelectCode}
					onSelectPosition={_handleSelectPosition}
					codeBallSize={codeBallSize}
					codeBallBadges={codeBallBadges}
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

	RoundBallBettingElement.propTypes = {
		onUpdateCombination: PropTypes.func,
		onUpdatePosition: PropTypes.func,
		codeBallAwards: PropTypes.object,
	};

	RoundBallBettingElement.defaultProps = {
		onUpdateCombination: () => {},
		onUpdatePosition: () => {},
		codeBallAwards: {},
	};

	return RoundBallBettingElement;
}

export default withRoundBallBettingElement;
