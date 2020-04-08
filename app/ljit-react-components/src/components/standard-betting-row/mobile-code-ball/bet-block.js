import React from 'react';
import PropTypes from 'prop-types';
import BetBall from './bet-ball';

const propTypes = {
	onClick: PropTypes.func,
	codes: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string,
		isSelected: PropTypes.bool,
	})).isRequired,
};

const defaultProps = {
	onClick: () => {},
	codes: [],
};

function BetBlock({ codes, onClick, }) {
	return (
		<div className="ljit-mobile-betting-block__balls">
			{
				codes.map((code, index) => (
					<BetBall
						key={`code__${code.name}`}
						text={code.name}
						isSelected={code.isSelected}
						onClick={ () => {onClick(index);} }
					/>
				))
			}
		</div>
	);
}
BetBlock.propTypes = propTypes;
BetBlock.defaultProps = defaultProps;

export default BetBlock;
