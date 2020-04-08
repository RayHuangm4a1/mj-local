import React, { Component, } from 'react';
import PropTypes from 'prop-types';

import {
	generateFilterData,
	generatePositionDescription,
	convertPosition,
} from './utils';

import StandardBettingElementInput from '../standard-betting-element-input';

const DEFAULT_PLACEHOLDER = `请複製或输入投注内容
每注之间可以用回车、空格、逗号[,]或者分号[;]隔开
支持格式如下：
123 456
123,456
123;456`;

function withTextInputBettingElement({
	positions = [],
	minPositionCount = 0,
	placeholder = DEFAULT_PLACEHOLDER,
	filterData = generateFilterData,
}) {
	class TextInputBettingElement extends Component {
		constructor(props) {
			super(props);

			this.state = {
				positions,
				data: '',
			};

			this._handleChangeText = this._handleChangeText.bind(this);
			this._handleSelectPosition = this._handleSelectPosition.bind(this);
		}

		_handleChangeText(data) {
			let filteredData;
			const currentData = this.state.data;
			const currentDataLength = currentData ? currentData.length : 0;

			if (Math.abs(data.length - currentDataLength) === 1) {
				filteredData = filterData(data);

			} else {
				// 複製貼上的字串
				filteredData = filterData(data.trim());
			}

			this.setState({
				data: filteredData,
			});

			this.props.onUpdateCombination(filteredData);
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
			const { _handleChangeText, _handleSelectPosition, } = this;
			const { data, positions, } = this.state;
			const { isMobile, } = this.props;

			return (
				<StandardBettingElementInput.TextInput
					positions={positions}
					positionDescription={generatePositionDescription(positions, minPositionCount)}
					data={data}
					placeholder={placeholder}
					onChangeText={_handleChangeText}
					onSelectPosition={_handleSelectPosition}
					isMobile={isMobile}
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

			onUpdateCombination(data);

			if (positions.length > 0) {
				onUpdatePosition(convertPosition(positions));
			}
		}
	}

	TextInputBettingElement.propTypes = {
		onUpdateCombination: PropTypes.func,
		onUpdatePosition: PropTypes.func,
		isMobile: PropTypes.bool,
	};

	TextInputBettingElement.defaultProps = {
		onUpdateCombination: () => {},
		onUpdatePosition: () => {},
		isMobile: false,
	};

	return TextInputBettingElement;
}

export default withTextInputBettingElement;
