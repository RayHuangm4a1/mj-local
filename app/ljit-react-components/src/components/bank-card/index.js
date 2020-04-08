import React, { Component, } from 'react';
import InfoCard from '../info-card';
import LabelText from '../label-text';
import Button from '../button';
import { isDateValid, formatDate,  } from '../../lib/moment-utils';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './style.styl';
const PREFIX_CLASS = 'ljit-bank-card';

const propTypes = {
	dataSource: PropTypes.shape({
		bankName: PropTypes.string.isRequired,
		payer: PropTypes.string.isRequired,
		number: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]).isRequired,
		activatedAt: PropTypes.string,
		withdrawableAt: PropTypes.string,
	}),
	isUnbindButtonVisible: PropTypes.bool,
	onClickUnbind: PropTypes.func,
	className: PropTypes.string,
};

const defaultProps = {
	isUnbindButtonVisible: false,
	onClickUnbind: () => {},
	className: '',
};

class BankCard extends Component {
	constructor() {
		super();

		this._renderUnbindButton = this._renderUnbindButton.bind(this);
		this._formatDate = this._formatDate.bind(this);
	}

	_renderUnbindButton() {
		const { dataSource, onClickUnbind, isUnbindButtonVisible, } = this.props;

		if (isUnbindButtonVisible) {
			return (
				<div className={`${PREFIX_CLASS}__bottom`}>
					<Button
						onClick={() => onClickUnbind(dataSource)}
						isFullWidth
					>
						解除绑定
					</Button>
				</div>
			);
		}
	}

	_formatDate(date) {
		if (isDateValid(date)) {
			return formatDate(date);
		}
		return '-';
	}

	render() {
		const { dataSource, className, } = this.props;
		const { _renderUnbindButton, _formatDate, } = this;
		const {
			bankName,
			payer,
			number,
			activatedAt,
			withdrawableAt,
		} = dataSource;

		return (
			<InfoCard
				className={cx(PREFIX_CLASS, className)}
				left={(
					<div className={`${PREFIX_CLASS}__left`}>
						<div className={`${PREFIX_CLASS}__title`}>{bankName}</div>
						<LabelText
							label="持卡人："
							text={payer}
							fontSize={LabelText.SizeEnums.SMALL}
						/>
						<LabelText
							label="尾号："
							text={number}
							fontSize={LabelText.SizeEnums.SMALL}
						/>
					</div>
				)}
				right={(
					<div className={`${PREFIX_CLASS}__right`}>
						<LabelText
							label="绑定时间"
							text={_formatDate(activatedAt)}
							fontSize={LabelText.SizeEnums.SMALL}
						/>
						<LabelText
							label="可提现时间："
							text={_formatDate(withdrawableAt)}
							fontSize={LabelText.SizeEnums.SMALL}
						/>
					</div>
				)}
				bottom={_renderUnbindButton()}
			/>
		);
	}
}

BankCard.propTypes = propTypes;
BankCard.defaultProps = defaultProps;

export default BankCard;
