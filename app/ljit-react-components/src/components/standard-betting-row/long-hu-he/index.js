import React from 'react';
import PropTypes from 'prop-types';
import LongHuHeBall from './long-hu-he-ball';
import './style.styl';

const prefixClass = 'ljit-long-hu-he';

const propTypes = {
	title: PropTypes.string,
	codes: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string,
		bonus: PropTypes.string,
		isSelected: PropTypes.bool,
	})),
	onPressCodeBall: PropTypes.func,
};

const defaultProps = {
	codes: [],
	onPressCodeBall: () => {},
};

function LongHuHe({ title, codes, onPressCodeBall, }) {
	return (
		<div className={prefixClass}>
			<div className={`${prefixClass}__title`}>{title}</div>
			{
				codes.map((item, index) =>  (
					<LongHuHeBall
						key={`${prefixClass}${item.name}-${index}`}
						onClick={() => { onPressCodeBall(index); }}
						ballType={item.name}
						isSelected={item.isSelected}
					/>
				))
			}
		</div>
	);
}

LongHuHe.propTypes = propTypes;
LongHuHe.defaultProps = defaultProps;

export default LongHuHe;
