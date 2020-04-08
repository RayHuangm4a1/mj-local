import React from 'react';
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

function MobileStandardBettingRowCodeBall({ title, codes, quickOptions, onPressCodeBall, onPressQuickOption, }) {
	return (
		<div className="ljit-mobile-betting-block">
			<SelectBlock title={title} quickOptions={quickOptions} onClick={onPressQuickOption } />
			<BetBlock title={title} codes={codes} onClick={onPressCodeBall}/>
		</div>
	);
}


MobileStandardBettingRowCodeBall.propTypes = propTypes;
MobileStandardBettingRowCodeBall.defaultProps = defaultProps;

export default MobileStandardBettingRowCodeBall;
