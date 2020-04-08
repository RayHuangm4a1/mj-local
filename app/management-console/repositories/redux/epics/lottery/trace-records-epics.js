import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import {
	switchMap,
	mergeMap,
	map,
	catchError,
} from 'rxjs/operators';
import {
	actionTypes,
	traceRecordsActions,
} from '../../../../controller';
import {
	catchErrorMessageForEpics,
} from '../../../../../lib/epic-utils';

const {
	START_FETCH_TRACE_RECORDS,
} = actionTypes;
const {
	fetchTraceRecordsSuccessAction,
	fetchTraceRecordsFailedAction,
} = traceRecordsActions;

const fakeTraces = {
	traceRecords: [
		{
			id: 1,
			userId: 12,
			username: "test01",
			lotteryClassId: 0,
			lotteryId: 16,
			lotteryName: "腾讯分分彩",
			playId: 53007,
			name: "整合 3",
			isTerminatedIfWin: true,       // 中獎後停止
			isTerminatedIfNotOpened: true, // 中斷後停止
			totalIssues: 3,                // 總共追號期數
			totalFinishedIssues: 2,        // 全部完成幾期
			rebate: 3,
			amountPerBet: 0.2,
			count: 1,
			amount: 0.2,
			betcontent: "3",
			weizhi: "",
			isPK: 0,
			status: "new",
			device: "unknown", // unknown,website,android,ios
			closedAt: "2019-09-18T06:23:58.000Z",
			createdAt: "2019-09-18T06:20:58.000Z",
			updatedAt: "2019-09-18T06:24:58.000Z",
		},
		// ....
	],
	page: 1,
	numOfItems: 0,
	numOfPages: 1,
};

//TODO 改成用API
export function fetchTraceRecordsEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_TRACE_RECORDS),
		switchMap(action =>
			of(fakeTraces).pipe(
				map(payload => fetchTraceRecordsSuccessAction(payload)),
				catchError(error => catchErrorMessageForEpics(error, fetchTraceRecordsFailedAction)),
			)
		)
	);
}
