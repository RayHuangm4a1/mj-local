import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BetBlock from './bet-block';
import SelectBlock from './select-block';
import './style.styl';

const propTypes = {
	title: PropTypes.string.isRequired,
	codes: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string,
		bonus: PropTypes.string,
		isSelected: PropTypes.bool,
	})).isRequired,
	quickOptions: PropTypes.arrayOf(PropTypes.string),
	onPressCodeBall: PropTypes.func,
	onPressQuickOption: PropTypes.func,
};

const defaultProps = {
	title: '',
	codes: [],
	quickOptions: [],
	onPressCodeBall: () => {},
	onPressQuickOption: () => {},
};

function StandardBettingRowCodeBall({ title, codes, quickOptions, onPressCodeBall, onPressQuickOption, }) {
	return (
		<div className="ljit-betting-block">
			<BetBlock title={title} codes={codes} onClick={onPressCodeBall}/>
			<SelectBlock title={title} quickOptions={quickOptions} onClick={onPressQuickOption } />
		</div>
	);
}


StandardBettingRowCodeBall.propTypes = propTypes;
StandardBettingRowCodeBall.defaultProps = defaultProps;

export default StandardBettingRowCodeBall;
