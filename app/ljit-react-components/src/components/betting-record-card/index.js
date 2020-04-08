import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import TextButton from '../text-button';
import LabelText from '../label-text';
import InfoCard from '../info-card';
import StatusTag from '../status-tag';
import {
	TIME_SECONDS,
	formatDate,
	isDateValid,
} from '../../lib/moment-utils';
import './style.styl';

const TagStatusEnums = StatusTag.StatusEnums;
const PREFIX_CLASS = 'ljit-betting-info-card';
const StatusEnums = {
	NEW: 1,
	WIN: 2,
	LOSE: 3,
	DRAW: 4,
	FAILED: 5,
	CANCELED: 6,
	EXPIRED: 7,
	NOT_OPENED: 8,
	OPENING: 9,
};
const {
	NEW,
	WIN,
	LOSE,
	DRAW,
	FAILED,
	CANCELED,
	EXPIRED,
	NOT_OPENED,
	OPENING,
} = StatusEnums;
const StatusMap = {
	[OPENING]: { text: '开奖中', statusTag: TagStatusEnums.BET_OPENING, },
	[WIN]: { text: '中奖', statusTag: TagStatusEnums.BET_WIN, },
	[LOSE]: { text: '未中奖', statusTag: TagStatusEnums.BET_LOSE, },
	[NEW]: { text: '未开奖', statusTag: TagStatusEnums.BET_UNOPENED, },
	[NOT_OPENED]: { text: '未开奖', statusTag: TagStatusEnums.BET_UNOPENED, },
	[DRAW]: { text: '平局', statusTag: TagStatusEnums.BET_UNOPENED, },
	[CANCELED]: { text: '已撤单', statusTag: TagStatusEnums.BET_CANCELED, },
	[FAILED]: { text: '失败', statusTag: TagStatusEnums.BET_CANCELED, },
	[EXPIRED]: { text: '过期', statusTag: TagStatusEnums.BET_UNOPENED, },
};

const propTypes = {
	onClick: PropTypes.func,
	onClickCancel: PropTypes.func,
	bettingRecord: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		lotteryId: PropTypes.number,
		lotteryName: PropTypes.string,
		playId: PropTypes.number,
		unit: PropTypes.number,
		amountPerBet: PropTypes.number,
		amount: PropTypes.number,
		multiple: PropTypes.number,
		reward: PropTypes.number,
		rebate: PropTypes.number,
		issue: PropTypes.string,
		opencode: PropTypes.string,
		count: PropTypes.number,
		betcontent: PropTypes.string,
		weizhi: PropTypes.string,
		device: PropTypes.string,
		isPK: PropTypes.bool,
		details: PropTypes.arrayOf(PropTypes.shape({
			name: PropTypes.string,
			count: PropTypes.number,
			reward: PropTypes.number,
		})),
		status:  PropTypes.oneOf([
			NEW,
			WIN,
			LOSE,
			DRAW,
			FAILED,
			CANCELED,
			EXPIRED,
			NOT_OPENED,
			OPENING,
		]),
		createdAt: PropTypes.instanceOf(Date),
	}),
	className: PropTypes.string,
};
const defaultProps = {
	onClick: () => {},
	onClickCancel: () => {},
	bettingRecord: {},
	className: '',
};

class BettingRecordCard extends Component {
	constructor() {
		super();

		this._handleClickCancel = this._handleClickCancel.bind(this);
		this._renderCancelButton = this._renderCancelButton.bind(this);
	}

	_handleClickCancel(e) {
		const { onClickCancel, } = this.props;

		e.stopPropagation();
		onClickCancel();
	}
	_renderCancelButton() {
		const { _handleClickCancel, } = this;

		return (
			<TextButton
				text="撤單"
				onClick={_handleClickCancel}
				className={`${PREFIX_CLASS}__cancel`}
				fontSize={TextButton.SizeEnums.SMALL}
				fontWeight={TextButton.WeightEnums.HEAVY}
			/>
		);
	}
	render() {
		const { bettingRecord, className, onClick, } = this.props;
		const { _renderCancelButton, } = this;
		const {
			id,
			lotteryName,
			name,
			amountPerBet,
			reward,
			issue,
			createdAt,
			multiple,
			opencode,
			status = NOT_OPENED,
		} = bettingRecord;
		const isShowingCancelButton = (status === NOT_OPENED);

		return (
			<div
				className={cx(PREFIX_CLASS, className)}
				onClick={onClick}
			>
				<InfoCard
					className={`${PREFIX_CLASS}__info`}
					topLeft={(
						<div className={`${PREFIX_CLASS}__header`}>
							<span className={`${PREFIX_CLASS}__title`}>{lotteryName}</span>
							{isShowingCancelButton ? _renderCancelButton() : null}
							{StatusMap[status] ? <StatusTag status={StatusMap[status].statusTag} text={StatusMap[status].text}/> : null}
						</div>
					)}
					left={(
						<React.Fragment>
							<LabelText
								label="方案号"
								text={id}
								labelColType={LabelText.SizeEnums.MEDIUM}
								fontSize={LabelText.SizeEnums.SMALL}
							/>
							<LabelText
								label="玩法"
								text={name}
								labelColType={LabelText.SizeEnums.MEDIUM}
								fontSize={LabelText.SizeEnums.SMALL}
							/>
							<LabelText
								label="单注金额"
								text={amountPerBet}
								labelColType={LabelText.SizeEnums.LARGE}
								fontSize={LabelText.SizeEnums.SMALL}
							/>
							<LabelText
								label="中奖金额"
								text={reward ? reward : '-'}
								labelColType={LabelText.SizeEnums.LARGE}
								fontSize={LabelText.SizeEnums.SMALL}
							/>
						</React.Fragment>
					)}
					right={(
						<React.Fragment>
							<LabelText
								label="期号"
								text={issue}
								labelColType={LabelText.SizeEnums.SMALL}
								fontSize={LabelText.SizeEnums.SMALL}
							/>
							<LabelText
								label="时间"
								text={isDateValid(createdAt) ? formatDate(createdAt, `M/D ${TIME_SECONDS}`) : '-'}
								labelColType={LabelText.SizeEnums.SMALL}
								fontSize={LabelText.SizeEnums.SMALL}
							/>
							<LabelText
								label="倍数"
								text={multiple}
								labelColType={LabelText.SizeEnums.SMALL}
								fontSize={LabelText.SizeEnums.SMALL}
							/>
							<LabelText
								label="中奖号码"
								text={opencode ? opencode : '-'}
								labelColType={LabelText.SizeEnums.LARGE}
								fontSize={LabelText.SizeEnums.SMALL}
							/>
						</React.Fragment>
					)}
				/>
			</div>
		);
	}
}

BettingRecordCard.propTypes = propTypes;
BettingRecordCard.defaultProps = defaultProps;

BettingRecordCard.StatusEnums = StatusEnums;
BettingRecordCard.StatusMap = StatusMap;

export default BettingRecordCard;
