const {
	ENUM_TRACE_STATUS,
	ENUM_BETTING_STATUS,
} = require("../../../../server/lib/enum");

const FUTURE_DRAWINGS = [
	{
		"issue": 20190830602,
		"index": "602",
		"opencode": null,
		"missing": null,
		"startedAt": "2019-08-30T07:00:55.000Z",
		"closedAt": "2019-08-30T07:02:25.000Z",
		"openedAt": "2019-08-30T07:03:00.000Z"
	},
	{
		"issue": 20190830603,
		"index": "603",
		"opencode": null,
		"missing": null,
		"startedAt": "2019-08-30T07:02:25.000Z",
		"closedAt": "2019-08-30T07:03:55.000Z",
		"openedAt": "2019-08-30T07:04:30.000Z"
	},
	{
		"issue": 20190830604,
		"index": "604",
		"opencode": null,
		"missing": null,
		"startedAt": "2019-08-30T07:03:55.000Z",
		"closedAt": "2019-08-30T07:05:25.000Z",
		"openedAt": "2019-08-30T07:06:00.000Z"
	},
	{
		"issue": 20190830605,
		"index": "605",
		"opencode": null,
		"missing": null,
		"startedAt": "2019-08-30T07:05:25.000Z",
		"closedAt": "2019-08-30T07:06:55.000Z",
		"openedAt": "2019-08-30T07:07:30.000Z"
	},
	{
		"issue": 20190830606,
		"index": "606",
		"opencode": null,
		"missing": null,
		"startedAt": "2019-08-30T07:06:55.000Z",
		"closedAt": "2019-08-30T07:08:25.000Z",
		"openedAt": "2019-08-30T07:09:00.000Z"
	},
	{
		"issue": 20190830607,
		"index": "607",
		"opencode": null,
		"missing": null,
		"startedAt": "2019-08-30T07:08:25.000Z",
		"closedAt": "2019-08-30T07:09:55.000Z",
		"openedAt": "2019-08-30T07:10:30.000Z"
	},
	{
		"issue": 20190830608,
		"index": "608",
		"opencode": null,
		"missing": null,
		"startedAt": "2019-08-30T07:09:55.000Z",
		"closedAt": "2019-08-30T07:11:25.000Z",
		"openedAt": "2019-08-30T07:12:00.000Z"
	},
	{
		"issue": 20190830609,
		"index": "609",
		"opencode": null,
		"missing": null,
		"startedAt": "2019-08-30T07:11:25.000Z",
		"closedAt": "2019-08-30T07:12:55.000Z",
		"openedAt": "2019-08-30T07:13:30.000Z"
	},
	{
		"issue": 20190830610,
		"index": "610",
		"opencode": null,
		"missing": null,
		"startedAt": "2019-08-30T07:12:55.000Z",
		"closedAt": "2019-08-30T07:14:25.000Z",
		"openedAt": "2019-08-30T07:15:00.000Z"
	},
	{
		"issue": 20190830611,
		"index": "611",
		"opencode": null,
		"missing": null,
		"startedAt": "2019-08-30T07:14:25.000Z",
		"closedAt": "2019-08-30T07:15:55.000Z",
		"openedAt": "2019-08-30T07:16:30.000Z"
	}
];
const TRACES = [{
	"id": 1,
	"userId": 3,
	"username": "test01",
	"lotteryClassId": 0,
	"lotteryId": 16,
	"lotteryName": "腾讯分分彩",
	"playId": 1,
	"name": "五星 直选复式",
	"isTerminatedIfWin": true,
	"numOfIssues": 5,
	"numOfFinishedIssues": 0,
	"rebate": 0,
	"amountPerBet": 1,
	"count": 1,
	"amount": 15,
	"betcontent": "1,2,3,4,5",
	"weizhi": "",
	"isPK": false,
	"status": ENUM_TRACE_STATUS.NEW,
	"device": "unknown",
	"oid": 0,
	"createdAt": "2019-09-03T06:00:40.189Z",
	"updatedAt": "2019-09-03T06:00:40.189Z"
},
{
	"id": 2,
	"userId": 3,
	"username": "test01",
	"lotteryClassId": 0,
	"lotteryId": 16,
	"lotteryName": "腾讯分分彩",
	"playId": 2,
	"name": "五星 直选单式",
	"isTerminatedIfWin": true,
	"numOfIssues": 2,
	"numOfFinishedIssues": 0,
	"rebate": 0,
	"amountPerBet": 2,
	"count": 1,
	"amount": 8,
	"betcontent": "26132",
	"weizhi": "",
	"isPK": false,
	"status": ENUM_TRACE_STATUS.NEW,
	"device": "unknown",
	"oid": 1,
	"createdAt": "2019-09-03T06:00:40.189Z",
	"updatedAt": "2019-09-03T06:00:40.189Z"
}];
const FIRST_ELEMENT_PLAY_NOT_EXIST_TRACES = [{
	"type": "RequestValidationError",
	"message": "玩法不存在",
	"code": "888.007.404",
	"fields": []
},
{
	"id": 2,
	"userId": 3,
	"username": "test01",
	"lotteryClassId": 0,
	"lotteryId": 16,
	"lotteryName": "腾讯分分彩",
	"playId": 2,
	"name": "五星 直选单式",
	"isTerminatedIfWin": true,
	"numOfIssues": 2,
	"numOfFinishedIssues": 0,
	"rebate": 0,
	"amountPerBet": 2,
	"count": 1,
	"amount": 8,
	"betcontent": "26132",
	"weizhi": "",
	"isPK": false,
	"status": ENUM_BETTING_STATUS.NEW,
	"device": "unknown",
	"oid": 1,
	"createdAt": "2019-09-03T06:00:40.189Z",
	"updatedAt": "2019-09-03T06:00:40.189Z"
}];

module.exports = {
	FUTURE_DRAWINGS,
	TRACES,
	FIRST_ELEMENT_PLAY_NOT_EXIST_TRACES,
};
