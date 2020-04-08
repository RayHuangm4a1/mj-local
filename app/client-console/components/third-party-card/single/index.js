import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from 'ljit-react-components';
import './style.styl';

const PREFIX_CLASS = 'ljit-third-party-game-card';

const propTypes = {
	imageSrc: PropTypes.string,
	tag: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	title: PropTypes.string,
	isFavorite: PropTypes.bool,
	onClickFavorite: PropTypes.func,
	onClick: PropTypes.func,
};

const defaultProps = {
	isFavorite: false,
	onClickFavorite: () => {},
	onClick: () => {},
};

function Single({ imageSrc, tag, title, isFavorite, onClickFavorite, onClick }) {
	function _renderIcon() {
		const {
			IconTypeEnums,
			SizeEnums,
			ColorEnums,
		} = IconButton;
		const {
			HEART_OUTLINE,
			HEART_FILL
		} = IconTypeEnums;

		let IconType = HEART_OUTLINE;

		let IconColor = '';
		
		if (isFavorite) {
			IconType = HEART_FILL;
			IconColor = ColorEnums.DANGER;
		}
		
		return <IconButton 
			type={IconType} 
			size={SizeEnums.X_SMALL} 
			color={IconColor}
			onClick={onClickFavorite}
		/>;
	}
	return (
		<div className={PREFIX_CLASS}>
			<div className={`${PREFIX_CLASS}__image-container`} onClick={onClick}>
				<img src={imageSrc} alt={title}></img>
				<div className={`${PREFIX_CLASS}__tag`}>
					{tag}
				</div>
			</div>
			<div className={`${PREFIX_CLASS}__title`}>
				<p>{title}</p>
				{_renderIcon()}
			</div>
		</div>
	);
}

Single.propTypes = propTypes;
Single.defaultProps = defaultProps;

export default Single;
