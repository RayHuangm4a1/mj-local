import React, { useState, useEffect }  from 'react';
import PropTypes from 'prop-types';
import { CheckSelector } from 'ljit-react-components';
import { PREFIX_CLASS } from '../';
import { get, convertToOptions, } from './utils';

const propTypes = {
	plays: PropTypes.array,
	selectedPlayGroup: PropTypes.object,
	onChangePlay: PropTypes.func,
};

const defaultProps = {
	plays: [],
	selectedPlayGroup: {},
	onChangePlay: () => {},
};


function getSubconditions(plays, playConditionId) {
	return get(plays, playConditionId, { subconditions: [], }).subconditions;
}
function getPlays(subconditions, subConditionId) {
	return get(subconditions, subConditionId, { plays: [], }).plays;
}

function PlaySelector({
	plays,
	selectedPlayGroup,
	onChangePlay,
}) {
	const [playConditionId, setPlayConditionId] = useState();
	const [subConditionId, setSubConditionId] = useState();
	const [playId, setPlayId] = useState();

	useEffect(() => {
		const { playConditionId, subConditionId, playId } = selectedPlayGroup;

		setPlayConditionId(playConditionId);
		setSubConditionId(subConditionId);
		setPlayId(playId);
	},[selectedPlayGroup.playId]);

	const subconditions = getSubconditions(plays, playConditionId);

	const playConditionOptions = convertToOptions(plays);
	const subConditionOptions = convertToOptions(subconditions);
	const playOptions = convertToOptions(getPlays(subconditions, subConditionId));

	function _handleChangePlayId(playId) {
		setPlayId(playId);
		const play = get(playOptions, playId);
		const playName = play.name;

		onChangePlay({ playConditionId, subConditionId, playId }, playName);
	}

	function _handleChangePlayConditionId(selectedPlayConditionId) {
		const { playConditionId, subConditionId, playId } = selectedPlayGroup;

		setPlayConditionId(selectedPlayConditionId);
		if (selectedPlayConditionId !== playConditionId) {
			const subconditions = getSubconditions(plays, selectedPlayConditionId);
			const defaultSubConditionId = subconditions[0].id;

			setSubConditionId(defaultSubConditionId);
		} else {
			setPlayConditionId(selectedPlayConditionId);
			setSubConditionId(subConditionId);
			setPlayId(playId);
		}
	}

	return (
		<div className={`${PREFIX_CLASS}__play-selector`}>
			<CheckSelector
				source={playConditionOptions}
				activeIds={[playConditionId]}
				onChange={_handleChangePlayConditionId}
			/>
			<CheckSelector
				source={subConditionOptions}
				backgroundColor={CheckSelector.BackgroundColorEnums.WHITE}
				activeIds={[subConditionId]}
				onChange={setSubConditionId}
			/>
			<CheckSelector
				source={playOptions}
				backgroundColor={CheckSelector.BackgroundColorEnums.WHITE}
				checkedIds={[playId]}
				onChange={_handleChangePlayId}
			/>
		</div>
	);
}

PlaySelector.propTypes = propTypes;
PlaySelector.defaultProps = defaultProps;

export default PlaySelector;
