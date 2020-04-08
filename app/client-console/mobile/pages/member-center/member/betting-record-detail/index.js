import React from 'react';
import PropTypes from 'prop-types';
import { DecimalNumber, LabelText, } from 'ljit-react-components';
import LotteryIcon from '../../../../../components/lottery-icon';
import {
	bettingRecordPropType,
	getBettingRecordStatusMap,
} from '../../../../../lib/betting-utils';
import { formatDate, } from '../../../../../../lib/moment-utils';
import './style.styl';

const PREFIX_CLASS = 'betting-record-detail-page';

// TODO get data from redux
const fakeLotteriesMap = {
	16: { code: 'txffc', },
};
// TODO get data from redux or params
// TODO 確認資料結構與顯示時要處理的，ex: enums 的轉換
const fakeBettingRecordDetail = {
	id: 1,
	userId: 1,
	username: 'test01',
	walletId: 23,
	type: 1,
	traceId: 0,
	lotteryClassId: 1,
	lotteryId: 16,
	lotteryName: '腾讯分分彩',
	playId: 1,
	unit: 2,
	awards: {
		小: {
			deltaBonus: 0,
			numerator: 1,
			denominator: 2
		}
	},
	name: "整合 小",
	bonus: 1956,
	rebate: 0,
	issue: "20190827-442",
	opencode: "",
	reward: 0,
	amountPerBet: 10,
	multiple: 2,
	count: 1,
	amount: 12345,
	betcontent: "小",
	weizhi: "",
	isPK: false,
	status: 1,
	details: [
		{
			name: "和",
			count: 1,
			reward: 10
		}
	],
	device: "unknown",
	oid: 0,
	createdAt: Date(),
	updatedAt: Date()
};

const propTypes = {
	bettingRecordDetailData: bettingRecordPropType,
	lotteriesMapData: PropTypes.object,
};

const defaultProps = {
	bettingRecordDetailData: fakeBettingRecordDetail,
	lotteriesMapData: fakeLotteriesMap,
};

function BettingRecordDetailPage({
	bettingRecordDetailData,
	lotteriesMapData,
}) {

	const {
		lotteryId,
		lotteryName,
		status,
		id,
		username,
		name,
		betcontent,
		amount,
		weizhi,
		amountPerBet,
		multiple,
		createdAt,
		issue,
		details,
		reward,
		device,
		type,
		count,
	} = bettingRecordDetailData;
	const lotteryCode = lotteriesMapData[lotteryId] ? fakeLotteriesMap[lotteryId].code : null;
	const statusMap = getBettingRecordStatusMap(status);
	
	function _handleConversionUsername(username) {
		return `${username.slice(0, -3)}***`;
	}

	function _renderItem(label, data) {
		return (
			<LabelText
				className={`${PREFIX_CLASS}__detail-item`}
				label={label}
				text={data}
				isSpaceBetween
				labelColor={LabelText.ColorEnums.LIGHT_BLACK}
				textColor={LabelText.ColorEnums.LIGHT_BLACK}
			/>
		);
	}

	return (
		<div className={PREFIX_CLASS}>
			<div className={`${PREFIX_CLASS}__lottery`}>
				<div>
					<LotteryIcon lotteryCode={lotteryCode}/>
					{lotteryName}
				</div>
				{statusMap.text}
			</div>
			<div className={`${PREFIX_CLASS}__details-list`}>
				{_renderItem('方案', id)}
				{_renderItem('会员名', _handleConversionUsername(username))}
				{_renderItem('彩种', lotteryName)}
				{_renderItem('玩法', name)}
				{_renderItem('总金额', <DecimalNumber data={amount} hasSeparator/>)}
				{_renderItem('位置', weizhi)}
				{_renderItem('狀态', statusMap.text)}
				{_renderItem('单注金额', <DecimalNumber data={amountPerBet} hasSeparator/>)}
				{_renderItem('倍数', multiple)}
				{_renderItem('下注时间', formatDate(createdAt))}
				{_renderItem('期号',issue)}
				{_renderItem('奖金', <DecimalNumber data={details[0].reward} hasSeparator/>)}
				{_renderItem('下注奖金返点', reward)}
				{_renderItem('投注来源', device)}
				{_renderItem('中奖类型', type)}
				{_renderItem('投注注数', count)}
			</div>
			<div className={`${PREFIX_CLASS}__bet-content`}>
				<div>
					投注內容
				</div>
				<div>
					{betcontent}
				</div>
			</div>
		</div>
	);
}

BettingRecordDetailPage.propTypes = propTypes;
BettingRecordDetailPage.defaultProps = defaultProps;

export default BettingRecordDetailPage;
