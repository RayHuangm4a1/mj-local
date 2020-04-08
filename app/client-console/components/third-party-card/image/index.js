import React from 'react';
import PropTypes from 'prop-types';
import ButtonList from '../button-list';
import './style.styl';

const PREFIX_CLASS = 'ljit-third-party-lobby-card';

const propTypes = {
	icon: PropTypes.node,
	title: PropTypes.string,
	imageSrc: PropTypes.string,
	thirdParties: PropTypes.array,
	onClickThirdPartyButton: PropTypes.func,
};

const defatulProps = {
	thirdParties: [],
	onClickThirdPartyButton: () => {},
};

function Image({ icon, title, imageSrc, thirdParties, onClickThirdPartyButton }) {
	return (
		<div className={PREFIX_CLASS}>
			<div className={`${PREFIX_CLASS}__header`}>
				{icon}
				<span>{title}</span>
			</div>
			<div className={`${PREFIX_CLASS}__image-container`}>
				<img src={imageSrc} alt={title}/>
				<div className={`${PREFIX_CLASS}__image-container--hover`}>
					<ButtonList
						thirdParties={thirdParties}
						onClick={onClickThirdPartyButton}
						className={`${PREFIX_CLASS}__third-party-game-button`}
					/>
				</div>
			</div>
		</div>
	);
}

Image.propTypes = propTypes;
Image.defatulProps = defatulProps;

export default Image;
