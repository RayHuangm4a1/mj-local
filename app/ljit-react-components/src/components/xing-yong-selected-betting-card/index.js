import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import LabelText from '../label-text';
import InfoCard from '../info-card';
import DecimalNumber from '../decimal-number';
import cx from 'classnames';
import './style.styl';

const propTypes = {
	data: PropTypes.shape({
		betcontent: PropTypes.string,
		amount: PropTypes.number,
		odds: PropTypes.number,
		reward: PropTypes.number,
	}),
	onClose: PropTypes.func,
	isShowingCloseButton: PropTypes.bool,
	className: PropTypes.string,
};
const defaultProps = {
	data: {},
	onClose: () => {},
	isShowingCloseButton: true,
	className: '',
};

class XinYongSelectedBettingCard extends Component {
	constructor() {
		super();
	}

	render() {
		const {
			data,
			onClose,
			isShowingCloseButton,
			className,
		} = this.props;
		const { betcontent, amount, odds, reward, } = data;

		return (
			<InfoCard
				className={cx('selected-betting-card', className)}
				onClose={onClose}
				isShowingCloseButton={isShowingCloseButton}
				left={(
					<React.Fragment>
						<LabelText
							className="selected-betting-card__number"
							label="号码 :"
							text={betcontent ? betcontent : '-'}
							labelColType={LabelText.SizeEnums.LARGE}
							fontSize={LabelText.SizeEnums.MEDIUM}
						/>
						<LabelText
							className="selected-betting-card__amount"
							label="金额 :"
							text={amount ? amount : '-'}
							labelColType={LabelText.SizeEnums.LARGE}
							fontSize={LabelText.SizeEnums.MEDIUM}
						/>
					</React.Fragment>
				)}
				right={(
					<React.Fragment>
						<LabelText
							label="赔率 :"
							text={odds ? <DecimalNumber data={odds} hasSeparator/> : '-'}
							labelColType={LabelText.SizeEnums.LARGE}
							fontSize={LabelText.SizeEnums.MEDIUM}
						/>
						<LabelText
							label="可赢 :"
							text={reward ? <DecimalNumber data={reward} hasSeparator/> : '-'}
							labelColType={LabelText.SizeEnums.LARGE}
							fontSize={LabelText.SizeEnums.MEDIUM}
						/>
					</React.Fragment>
				)}
			/>
		);
	}
}

XinYongSelectedBettingCard.propTypes = propTypes;
XinYongSelectedBettingCard.defaultProps = defaultProps;

export default XinYongSelectedBettingCard;
