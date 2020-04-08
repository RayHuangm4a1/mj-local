import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {  LabelSelector, } from 'ljit-react-components';

const prefixClass = 'play-subcondition-selection-group';
const propTypes = {
	subconditions: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.string,
		id: PropTypes.number,
		name: PropTypes.string,
		plays: PropTypes.arrayOf(PropTypes.shape({
			_id: PropTypes.string,
			id: PropTypes.number,
			name: PropTypes.string,
		})),
	})),
	selectedPlayId: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]),
	onClickPlay: PropTypes.func,
};
const defaultProps = {
	selectionGroups: [],
	onClickPlay: () => {},
};

class PlaySelectionGroup extends Component {
	constructor() {
		super();

		this._renderSelectionGroups = this._renderSelectionGroups.bind(this);
	}

	_renderSelectionGroups() {
		const { subconditions, selectedPlayId, onClickPlay, } = this.props;
		const content = subconditions.map((subcondition) => {
			return (
				<LabelSelector
					key={`data-key-${subcondition.id}`}
					label={subcondition.name}
					items={subcondition.plays}
					selectedId={selectedPlayId}
					onClickItem={onClickPlay}
				/>
			);
		});

		return content;
	}

	render() {
		const { _renderSelectionGroups, } = this;

		return (
			<div className={`${prefixClass}`}>
				{_renderSelectionGroups()}
			</div>
		);
	}
}

PlaySelectionGroup.propTypes = propTypes;
PlaySelectionGroup.defaultProps = defaultProps;

export default PlaySelectionGroup;
