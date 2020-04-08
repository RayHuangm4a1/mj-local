import React from 'react';
import PropTypes from 'prop-types';
import CodeBallButton from '../../code-ball-button';

const propTypes = {
	title: PropTypes.string,
	onClick: PropTypes.func,
	quickOptions: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
	onClick: () => {},
	quickOptions: [],
};

const style = {
	fontSize: '12px',
	width: '100%',
	height: '24px',
	color: 'rgb(74,74,74)',
	backgroundColor: 'rgb(240,240,240)',
	border: '1px solid rgb(206,206,210)',
	cursor: 'pointer',
	fontWeight: '400',
};

function SelectBlock({ onClick, quickOptions, title, }) {
	return (
		<React.Fragment>
			<div className="ljit-mobile-betting-block__upper">
				<div className="ljit-mobile-betting-block__title">
					{title}
				</div>
				<div className="ljit-mobile-betting-block__select-block">
					{
						quickOptions.map(quickOption => {
							return (
								<div
									className="ljit-mobile-betting-block__select-block-options"
									key={`option__${quickOption}`}
									onClick={ () => (onClick(quickOption, title)) }
								>
									<CodeBallButton.Round
										text={quickOption}
										size={CodeBallButton.Round.SizeEnum.FULL}
										fontSize={CodeBallButton.Round.FontSizeEnum.SMALL}
									/>
								</div>
							);
						})
					}
				</div>
			</div>

		</React.Fragment>
		
	);
}
SelectBlock.propTypes = propTypes;
SelectBlock.defaultProps = defaultProps;

export default SelectBlock;
