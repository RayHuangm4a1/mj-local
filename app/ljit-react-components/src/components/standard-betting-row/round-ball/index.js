import React from 'react';
import PropTypes from 'prop-types';
import BetBall from './bet-ball';
import PKTooltip from './pk-tooltip';
import { BallSizeEnum, } from '../../standard-betting-element/utils';
import './style.styl';

const PREFIX_CLASS = 'ljit-round-ball';

const propTypes = {
	title: PropTypes.string,
	codes: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string,
		bonus: PropTypes.string,
		isSelected: PropTypes.bool,
	})),
	onPressCodeBall: PropTypes.func,
	codeBallSize: PropTypes.oneOf(Object.values(BallSizeEnum).concat('')),
	codeBallBadges: PropTypes.object,
};

const defaultProps = {
	codes: [],
	codeBallBadges: {},
	onPressCodeBall: () => {},
};

function StandardBettingRowRoundBall({ title, codes, onPressCodeBall, codeBallSize, codeBallBadges, }) {
	const isShowPKDescription = Object.keys(codeBallBadges).length > 0;

	return (
		<div className={PREFIX_CLASS}>
			<div className={`${PREFIX_CLASS}__title`}>
				{title}
				<span>
					{isShowPKDescription ? <PKTooltip/> :  null }
				</span>
			</div>
			<div className={`${PREFIX_CLASS}__balls`}>
				{
					codes.map((item, index) => {
						return (
							<BetBall
								key={`${PREFIX_CLASS}_${item.name}`}
								onClick={() => onPressCodeBall(index)}
								text={item.name}
								isSelected={item.isSelected}
								codeBallSize={codeBallSize}
								badge={codeBallBadges[item.name] ? codeBallBadges[item.name] : null}
							/>
						);
					})
				}
			</div>
		</div>
	);
}

StandardBettingRowRoundBall.propTypes = propTypes;
StandardBettingRowRoundBall.defaultProps = defaultProps;

export default StandardBettingRowRoundBall;
