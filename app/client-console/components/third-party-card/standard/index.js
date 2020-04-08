import React from 'react';
import PropTypes from 'prop-types';
import ButtonList from '../button-list';

import './style.styl';

const PREFIX_CLASS = 'ljit-third-party-redirect-card';

const propTypes = {
	icon: PropTypes.node,
	title: PropTypes.string,
	slogin: PropTypes.string,
	thirdParties: PropTypes.array,
	onClickThirdPartyButton: PropTypes.func,
	onClickMore: PropTypes.func,
};

const defaultProps = {
	title: '',
	slogin: '',
	// TODO 確認外接遊戲的資料結構
	thirdParties: [],
	onClickThirdPartyButton: () => {},
	onClickMore: () => {},
};

function Standard({ icon, title, slogin, thirdParties, onClickThirdPartyButton, onClickMore, }) {
	return (
		<div className={`${PREFIX_CLASS}`}>
			<div className={`${PREFIX_CLASS}__content`}>
				<div className={`${PREFIX_CLASS}__icon`}>
					{icon}
				</div>
				<div className={`${PREFIX_CLASS}__title`}>
					{title}
				</div>
				<div className={`${PREFIX_CLASS}__slogan`}>
					{slogin}
				</div>
			</div>
			<div className={`${PREFIX_CLASS}--hover`}>
				<div className={`${PREFIX_CLASS}__button-list`}>
					<ButtonList
						thirdParties={thirdParties}
						onClick={onClickThirdPartyButton}
						className={`${PREFIX_CLASS}__third-party-game-button`}
					/>
				</div>
				<p
					onClick={onClickMore}
				>查看全部</p>
			</div>
		</div>
	);
}

Standard.propTypes = propTypes;
Standard.defaultProps = defaultProps;

export default Standard;
