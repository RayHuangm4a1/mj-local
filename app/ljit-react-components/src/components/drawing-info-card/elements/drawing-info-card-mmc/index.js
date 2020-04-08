import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import repeat from 'lodash/repeat';
import CodeBall from '../../../code-ball';
import { drawingInfoCardPropTypes, } from '../../utils';
import './style.styl';

const CodeBallRound = CodeBall.Round;

const PREFIX_CLASS = 'drawing-info-card-mmc';
const EMPTY_OPENCODE = '?';
// TODO maybe sync lottery class positions length
const OPENCODE_POSITION_SIZE = 5;

const propTypes = {
	className: PropTypes.string,
	buttonText: PropTypes.string,
	isButtonDisabled: PropTypes.bool,
	// Function (event: object)
	onClickButton: PropTypes.func.isRequired,
	...drawingInfoCardPropTypes,
};
const defaultProps = {
	className: '',
	buttonText: '投注',
	isButtonDisabled: false,
};

const DrawingInfoCardMMC = ({
	opencode,
	className,
	buttonText,
	isButtonDisabled,
	onClickButton,
}) => {
	// TODO compare opencode or drawing openedAt
	const isClosed = !opencode;
	const opencodes = isClosed ? repeat(EMPTY_OPENCODE, OPENCODE_POSITION_SIZE).split('') : opencode.split(',');

	return (
		<div className={cx(PREFIX_CLASS, className)}>
			<div>
				{
					opencodes.map((code, index) => (
						<CodeBallRound
							className={`${PREFIX_CLASS}__ball`}
							key={`${code}-${index}`}
							text={code}
						/>
					))
				}
			</div>
			<div className={`${PREFIX_CLASS}__bet-wrapper`}>
				<button
					className={`${PREFIX_CLASS}__bet`}
					onClick={onClickButton}
					disabled={isButtonDisabled}
				>
					{buttonText}
				</button>
			</div>
		</div>
	);
};

DrawingInfoCardMMC.propTypes = propTypes;
DrawingInfoCardMMC.defaultProps = defaultProps;

export default DrawingInfoCardMMC;
