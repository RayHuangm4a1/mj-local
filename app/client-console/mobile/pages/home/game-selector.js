import React from 'react';
import PropTypes from 'prop-types';
import { PREFIX_CLASS } from './';
import IconTag from '../../../components/icon-tag';

const PIN_INDEX = 0;

const propTypes = {
	games: PropTypes.array,
	onSelectGame: PropTypes.func,
	selectedGameIndex: PropTypes.number,
};

const defatulProps = {
	games: [],
	onSelectGame: () => {},
	selectedGameIndex: PIN_INDEX,
};

function GameSelector({
	games,
	onSelectGame,
	selectedGameIndex,
}) {
	return (
		<div className={`${PREFIX_CLASS}__tab`}>
			<IconTag
				text={games[PIN_INDEX].name}
				onClick={() => {onSelectGame(PIN_INDEX);}}
				isSelected={selectedGameIndex === PIN_INDEX }
			/>
			<div>
				{
					games.map((game, index) => {
						if (index === PIN_INDEX) {
							return null;
						}
						return (<IconTag
							key={index}
							text={game.name}
							onClick={() => {onSelectGame(index);}}
							isSelected={index === selectedGameIndex}
						/>);
					})
				}
			</div>
		</div>
	);
}

GameSelector.propTypes = propTypes;
GameSelector.defatulProps = defatulProps;

export default GameSelector;
