import React from 'react';
import PropTypes from 'prop-types';
import LotteryIcon from '../../../../../../components/lottery-icon';
import { BettingRecordStatusEnum } from '../../../../../../lib/enums';
import {
	bettingRecordPropType,
	getBettingRecordStatusMap,
} from '../../../../../../lib/betting-utils';
import { formatDate, } from '../../../../../../../lib/moment-utils';
import {  IconButton, LabelText, } from 'ljit-react-components';
import './style.styl';

const { IconTypeEnums, SizeEnums, ColorEnums } = IconButton;

const PREFIX_CLASS = 'betting-record-card';

const propTypes = {
	bettingRecord: bettingRecordPropType,
	lotteryCode: PropTypes.string,
	onClickMoreInfo: PropTypes.func,
	onClickDiscard: PropTypes.func,
};
const defaultProps = {
	bettingRecord: {},
	lotteryCode: '',
	onClickMoreInfo: () => {},
	onClickDiscard: () => {},
};

function BettingRecordCard({
	bettingRecord,
	lotteryCode,
	onClickMoreInfo,
	onClickDiscard,
}) {

	function _renderDiscardButton() {
		return (
			// TODO add 分割線 component
			// TODO check if this use IconButton component
			<div className={`${PREFIX_CLASS}__action`}>
				<div
					className={`${PREFIX_CLASS}__action-item`}
					onClick={onClickDiscard}
				>
					<div />
					撤单
				</div>
			</div>
		);
	}

	const {
		id,
		lotteryName,
		amount,
		name,
		reward,
		issue,
		createdAt,
		status,
	} = bettingRecord;

	const isShowingDiscardButton = (status === BettingRecordStatusEnum.NOT_OPENED);
	const statusMap = getBettingRecordStatusMap(status);

	return (
		<div className={PREFIX_CLASS}>
			<div
				className={`${PREFIX_CLASS}__header`}
				onClick={onClickMoreInfo}
			>
				<LotteryIcon lotteryCode={lotteryCode}/>
				<div>{lotteryName}</div>
				<div>{formatDate(createdAt)}</div>
				<IconButton
					type={IconTypeEnums.RIGHT}
					size={SizeEnums.SMALL}
					color={ColorEnums.GREY}
				/>
			</div>
			<div className={`${PREFIX_CLASS}__body`}>
				<div>
					<LabelText
						label="方案"
						text={id}
						labelColon={false}
					/>
					<LabelText
						label="期号"
						text={issue}
						labelColon={false}
					/>
					<LabelText
						label="玩法"
						text={name}
						labelColon={false}
					/>
				</div>
				<div>
					<LabelText
						label="投注金额"
						text={amount}
						labelColon={false}
					/>
					<LabelText
						label="中奖金额"
						text={reward ? reward : '-'}
						labelColon={false}
					>
						{issue}
					</LabelText>
					<LabelText
						label="状态"
						text={statusMap.text}
						labelColon={false}
					/>
				</div>
			</div>
			{isShowingDiscardButton ? _renderDiscardButton() : null}
		</div>
	);
}

BettingRecordCard.propTypes = propTypes;
BettingRecordCard.defaultProps = defaultProps;

export default BettingRecordCard;
