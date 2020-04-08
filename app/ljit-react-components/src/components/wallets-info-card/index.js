import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Icon from '../icon';
import './style.styl';

export const PREFIX_CLASS = 'ljit-wallets-info-card';

const SizeEnums = {
	MEDIUM: 'medium',
	SMALL: 'small',
};

const IconColorEnums ={
	YELLOW: 'yellow',
	GREEN: 'green',
};

const StatusEnums = {
	BASIC: 'basic',
	INCOMING: 'incoming',
	OUTGOING: 'outgoing',
	DISABLED: 'disabled',
};

const propTypes = {
	size: PropTypes.oneOf(Object.values(SizeEnums)),
	status: PropTypes.oneOf(Object.values(StatusEnums)),
	iconColor: PropTypes.oneOf(Object.values(IconColorEnums)),
	className: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.number,
	onClick: PropTypes.func,
};

const defaultProps = {
	size: SizeEnums.MEDIUM,
	status: StatusEnums.BASIC,
	iconColor: IconColorEnums.YELLOW,
	className: '',
	name: '',
	value: 0,
	onClick: () => {},
};

class WalletsInfoCard extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { className, size, status, iconColor, name, value, onClick, } = this.props;
		const walletsInfoCardClass = cx(
			PREFIX_CLASS,
			className,
			`${PREFIX_CLASS}__${size}`,
			`${PREFIX_CLASS}--${status}`,
			`${PREFIX_CLASS}--${iconColor}`,
		);

		return  (
			<div className={walletsInfoCardClass} onClick={onClick}>
				<div className={`${PREFIX_CLASS}__title`}>
					<Icon 
						type={Icon.IconTypeEnums.RECHARGE}
						size={Icon.SizeEnums.SMALL}
					/>
					<div className={`${PREFIX_CLASS}__wallet-name`}>
						{name}
					</div>
				</div>
				<div className={`${PREFIX_CLASS}__value`}>
					{value}
				</div>
				<div className={`${PREFIX_CLASS}__tag`}></div>
			</div>
		);
	}
}

WalletsInfoCard.propTypes = propTypes;
WalletsInfoCard.defaultProps = defaultProps;
WalletsInfoCard.SizeEnums = SizeEnums;
WalletsInfoCard.StatusEnums = StatusEnums;
WalletsInfoCard.IconColorEnums = IconColorEnums;

export default WalletsInfoCard;
