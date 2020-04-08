import React, { useState, useEffect,  } from 'react';
import PropTypes from 'prop-types';
import { CheckSelector, } from 'ljit-react-components';
import './style.styl';

const PREFIX_CLASS = 'xin-yong-bet-lottery-play';

const propTypes = {
	selectedLottery: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
	}),
	playConditions: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		subconditions: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string,
		})),
	})),
	playsMap: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		odds: PropTypes.number,
	}))),
	selectedSlots: PropTypes.arrayOf(PropTypes.number),
	onClickBetSlot: PropTypes.func,
};
const defatultProps = {
	selectedLottery: {},
	playConditions: [],
	playsMap: {},
	selectedSlots: [],
	onClickBetSlot: () => {},
};

function XinYongBetLotteryPlay({
	selectedLottery,
	playConditions,
	playsMap,
	selectedSlots,
	onClickBetSlot,
}) {
	const [ activePlayCondition, setActivePlayCondition, ] = useState(playConditions[0]);
	const [ selectedPlayConditionIds, setSelectedPlayConditionIds, ] = useState([]);

	useEffect(() => {
		setActivePlayCondition(playConditions[0]);
		setSelectedPlayConditionIds([]);
	}, [selectedLottery.id]);

	const _handleChangePlayCondition = (playConditionId) => {
		const playCondition = playConditions.find(playCondition => playCondition.id === playConditionId);

		setActivePlayCondition(playCondition);
	};
	const _handleClickBetSlot = (playId, playConditionId, _selectedSlots) => {
		if (_selectedSlots.includes(playId) && _selectedSlots.length === 1) {
			setSelectedPlayConditionIds(selectedPlayConditionIds.filter(id => id !== playConditionId));
		} else {
			setSelectedPlayConditionIds([...selectedPlayConditionIds, playConditionId]);
		}

		onClickBetSlot(playId);
	};
	const _renderPlayConditionsSelector = () => {
		return (
			<CheckSelector
				source={playConditions}
				activeIds={[activePlayCondition.id]}
				selectedIds={selectedPlayConditionIds}
				onChange={_handleChangePlayCondition}
			/>
		);
	};
	const _renderSubconditions = () => {
		const { subconditions } = activePlayCondition;
		// TODO replace below code with mobile-xin-yong-bet-card and mobile-xin-yong-slot
		const subconditionsContent = subconditions.map(subcondition => {
			const _selectedSlots = [];
			const { id, name, } = subcondition;
			const plays = playsMap[id] || [];

			plays.forEach(play => {
				if (selectedSlots.includes(play.id)) {
					_selectedSlots.push(play.id);
				}
			});

			return (
				<div key={id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
					<div>{name}</div>
					<div style={{ display: 'flex', }}>
						{plays.map(play => {
							const { name, odds, id } = play;
							const isActive = selectedSlots.includes(id);

							return (
								<div
									key={id}
									style={{ textAlign: 'center', color: isActive ? 'red': 'black', }}
									onClick={() => _handleClickBetSlot(id, activePlayCondition.id, _selectedSlots)}
								>
									<div>{name}</div>
									<div>{odds}</div>
								</div>
							);
						})}
					</div>
				</div>
			);
		});

		return (
			<div className={`${PREFIX_CLASS}__content`}>
				{subconditionsContent}
			</div>
		);
	};

	return (
		<div className={PREFIX_CLASS}>
			{/* TODO replace with xin-yong-bet-element */}
			{_renderPlayConditionsSelector()}
			{_renderSubconditions()}
		</div>
	);
}

XinYongBetLotteryPlay.propTypes = propTypes;
XinYongBetLotteryPlay.defatultProps = defatultProps;

export default XinYongBetLotteryPlay;
