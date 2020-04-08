import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import {
	switchMap,
	map,
	catchError,
} from 'rxjs/operators';
import {
	actionTypes,
	traceRecordBettingsActions,
} from '../../../../controller';
import {
	catchErrorMessageForEpics,
} from '../../../../../lib/epic-utils';

const {
	START_FETCH_TRACE_RECORD_BETTINGS,
} = actionTypes;
const {
	fetchTraceRecordBettingsSuccessAction,
	fetchTraceRecordBettingsFailedAction,
} = traceRecordBettingsActions;

const fakeTraceRecordBetting = {
	traceBettings: [{
		id: 1,
		userId: 12,
		username: "test01",
		walletCode: "primary",
		type: 2,
		traceId: 1,
		lotteryClassId: 0,
		lotteryId: 16,
		lotteryName: "腾讯分分彩",
		playId: 53007,
		unit: 1,
		awards: {
			3: {
				numerator: 1,
				deltaBonus: 0,
				denominator: 10
			}
		},
		name: "整合 3",
		bonus: 1956,
		rebate: 3,
		issue: "20190918-0864",
		opencode: null,
		reward: 0,
		amountPerBet: 0.2,
		multiple: 1,
		count: 1,
		amount: 0.2,
		betcontent: "3",
		weizhi: "",
		isPK: 0,
		status: "new",
		details: [],
		device: "unknown",
		error: null,
		oid: 0,
		pid: 1,
		closedAt: "2019-09-18T06:23:58.000Z",
		createdAt: "2019-09-18T06:22:59.000Z",
		updatedAt: "2019-09-18T06:22:59.000Z"
		// .... 少了期號，獎金，取消期數，取消金額
	}],
	page: 1,
	numOfItems: 0,
	numOfPages: 1,
};

// TODO: 改成用API
export function fetchTraceRecordBettingsEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_TRACE_RECORD_BETTINGS),
		switchMap(action =>
			of(fakeTraceRecordBetting).pipe(
				map(payload => fetchTraceRecordBettingsSuccessAction(payload)),
				catchError(error => catchErrorMessageForEpics(error, fetchTraceRecordBettingsFailedAction)),
			)
		)
	);
}
