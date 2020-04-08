import React from 'react';
import PropTypes from 'prop-types';
import BetBall from './bet-ball';

const propTypes = {
	onClick: PropTypes.func,
	codes: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string,
		bonus: PropTypes.string,
		isSelected: PropTypes.bool,
	})).isRequired,
	title: PropTypes.string,
};

const defaultProps = {
	onClick: () => {},
	codes: [],
	title: '',
};

function BetBlock({ codes, onClick, title,  }) {

	return (
		<div className="ljit-bet-block">
			<div className="ljit-bet-block__number__of__digits">
				<div>{title}</div>
				<div className="ljit-bet-block__sub">
					{/* TODO wait for 遗漏/冷热 api data */}
					{/* <div className="ljit-bet-block__sub__style ljit-bet-block__sub--left">遗漏</div>
					<div className="ljit-bet-block__sub__style ljit-bet-block__sub--right">冷热</div> */}
				</div>
			</div>
			<div className="ljit-bet-block__balls">
				{
					codes.map((code, index) => (
						<BetBall key={`code__${code.name}`} text={code.name} isSelected={code.isSelected} onClick={ () => {onClick(index);} }/>
					))
				}
			</div>
		</div>
	);
}
BetBlock.propTypes = propTypes;
BetBlock.defaultProps = defaultProps;

export default BetBlock;
