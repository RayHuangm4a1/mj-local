import { GameTypeEnums, } from '../../lib/enums';

export const FieldEnums = {
	TIME: '時間',
	GAMETYPE: '类型',
	USERNAME: '帐号',
	GAMENAME: '游戏名称',
	LOTTERY: '彩种',
	PLAY: '玩法',
	REPORTTIME: '报表日期',
	IP: 'IP',
	STATUS: '狀態',
	TRANSACTION_ID: '交易号',
	ISSUE: '期号',
	AMOUNT_PERBET: '金额模式',
	ACCOUNT: '用戶名',
	LOTTERY_PLAY: '彩种玩法'
};

const {
	TIME,
	GAMETYPE,
	USERNAME,
	GAMENAME,
	LOTTERY,
	PLAY,
	REPORTTIME,
	IP,
	STATUS,
	TRANSACTION_ID,
	ISSUE,
	ACCOUNT,
	LOTTERY_PLAY,
} = FieldEnums;

export function getBettingSearchFormFields(gameType = '') {
	switch (gameType) {
		case GameTypeEnums.LOTTERY:
			return [
				GAMETYPE,
				LOTTERY,
				PLAY,
				TIME,
				USERNAME,
				IP,
				STATUS,
				TRANSACTION_ID,
				ISSUE,
			];
		case GameTypeEnums.VRLIVELOTTERY:
			return [
				GAMETYPE,
				TIME,
				ACCOUNT,
				USERNAME,
				STATUS,
				TRANSACTION_ID,
				IP,
				LOTTERY_PLAY,
			];
		case GameTypeEnums.TREASURE:
			return [
				GAMETYPE,
				TIME,
				USERNAME,
			];
		default:
			return [
				GAMETYPE,
				GAMENAME,
				USERNAME,
				TIME,
				REPORTTIME,
			];
	}
}