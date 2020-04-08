import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Card from '../card';
import Icon from '../icon';
import LableContent from '../label-content';
import './style.styl';

const propTypes = {
	className: PropTypes.string,
	betting: PropTypes.shape({
		lotteryName: PropTypes.string,
		name: PropTypes.string,
		weizhi: PropTypes.string,
		count: PropTypes.number,
		multiple: PropTypes.number,
		amountPerBet: PropTypes.number,
		amount: PropTypes.number,
		betcontent: PropTypes.string,
	}),
	onClickClose: PropTypes.func,
};

const PREFIX_CLASS = 'standard-selected-betting-card';

const defaultProps = {
	betting: {},
	onClickClose: () => {},
};

class StandardSelectedBettingCard extends Component {
	constructor() {
		super();
	}

	render() {
		const { className, betting, onClickClose, } = this.props;
		const {
			lotteryName,
			name,
			weizhi = '-',
			count,
			multiple,
			amountPerBet,
			amount,
			betcontent,
		} = betting;

		return (
			<Card
				className={cx(`${PREFIX_CLASS}`, className)}
			>
				<div className={`${PREFIX_CLASS}__header`}>
					<div className={`${PREFIX_CLASS}__lottery`}>{lotteryName}</div>
					<div
						className={`${PREFIX_CLASS}__close`}
						onClick={onClickClose}
					>
						<Icon type={Icon.IconTypeEnums.CLOSE}/>
					</div>
				</div>
				<div className={`${PREFIX_CLASS}__info`}>
					<div className={`${PREFIX_CLASS}__info-left`}>
						<LableContent
							className={`${PREFIX_CLASS}__label-text`}
							label="玩法："
						>
							<span className={`${PREFIX_CLASS}--grey-text`}>{name}</span>
						</LableContent>
						<LableContent
							className={`${PREFIX_CLASS}__label-text`}
							label="位置："
						>
							{weizhi}
						</LableContent>
						<LableContent
							className={`${PREFIX_CLASS}__label-text`}
							label="注数："
						>
							<span className={`${PREFIX_CLASS}--count-number`}>{count}</span>
						</LableContent>
					</div>
					<div className={`${PREFIX_CLASS}__info-right`}>
						<LableContent
							className={`${PREFIX_CLASS}__label-text`}
							label="倍数："
						>
							<span className={`${PREFIX_CLASS}--grey-text`}>{multiple}倍</span>
						</LableContent>
						<LableContent
							className={`${PREFIX_CLASS}__label-text`}
							label="单注金额："
						>
							<span className={`${PREFIX_CLASS}--grey-text`}>{amountPerBet}</span>
						</LableContent>
						<LableContent
							className={`${PREFIX_CLASS}__label-text`}
							label="金额："
						>
							<span className={`${PREFIX_CLASS}--amount-number`}>{amount}</span>
						</LableContent>
					</div>
					<div className={`${PREFIX_CLASS}__footer`}>
						<LableContent
							className={`${PREFIX_CLASS}__label-text ${PREFIX_CLASS}__label-text--ellipsis`}
							label="投注号码："
						>
							<span className={`${PREFIX_CLASS}--grey-text`} title={betcontent}>{betcontent}</span>
						</LableContent>
					</div>
				</div>
			</Card>
		);
	}
}

StandardSelectedBettingCard.propTypes = propTypes;
StandardSelectedBettingCard.defaultProps = defaultProps;

export default StandardSelectedBettingCard;
