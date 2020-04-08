import React from 'react';
import PropTypes from 'prop-types';
import Ball from '../../code-ball';

const propTypes = {
	title: PropTypes.string,
	onClick: PropTypes.func,
	quickOptions: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
	onClick: () => {},
	quickOptions: [],
};

function SelectBlock({ onClick, quickOptions, title, }) {
	return (
		<div className="ljit-betting-block__select-block">
			{
				quickOptions.map(quickOption => {
					{/* TODO  using code-ball-button.round replace*/ }
					return (
						<div className="ljit-betting-block__select-block-options" key={`option__${quickOption}`} onClick={ () => (onClick(quickOption, title)) }>
							<Ball.Round
								text={quickOption}
								size={Ball.Round.SizeEnum.MIDDLE}
								fontSize={Ball.Round.FontSizeEnum.MIDDLE}
								type={Ball.Round.StatusTypeEnum.PRIMARY}
							/>
						</div>
					);
				})
			}
		</div>
	);
}
SelectBlock.propTypes = propTypes;
SelectBlock.defaultProps = defaultProps;

export default SelectBlock;
