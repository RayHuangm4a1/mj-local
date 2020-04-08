import { ofType } from 'redux-observable';
import { ajax, } from 'rxjs/ajax';
import { of } from 'rxjs';
import {
	switchMap,
	map,
	catchError,
} from 'rxjs/operators';
import {
	catchErrorMessageForEpics,
} from '../../../../lib/epic-utils';
import {
	actionTypes,
	announcementActions,
} from '../../../controller';
import { getAPIBaseUrl, } from '../../../lib/general-utils';

const {
	START_FETCH_ANNOUNCEMENTS,
} = actionTypes;
const {
	fetchAnnouncementsSuccessAction,
	fetchAnnouncementsFailedAction,
} = announcementActions;

const apiBaseUrl = getAPIBaseUrl();

export function fetchAnnouncementsEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_ANNOUNCEMENTS),
		//TODO: fetch API
		switchMap(action =>
			of(announcementData).pipe(
				map(payload => fetchAnnouncementsSuccessAction(payload)),
				catchError(error => catchErrorMessageForEpics(error, fetchAnnouncementsFailedAction)),
			),
		),
	);
}

//TODO remove
const announcementData = [
	{
		id: 1,
		title: '华宇原生APP正式上线公告',
		createdAt: '2018-12-20T16:01:20.000Z',
		content: `亲爱的彩迷们好：

华宇原生APP 於8月8日（星期四）15：10维护完毕。

欢迎彩民们多加选择娱乐，祝彩民们投注顺利 盈利多多！欢迎彩民们多加选择娱乐，祝彩民们投注顺利 盈利多多！欢迎彩民们多加选择娱乐，祝彩民们投注顺利 盈利多多！
亲爱的彩迷们好：

华宇原生APP 於8月8日（星期四）15：10维护完毕。

欢迎彩民们多加选择娱乐，祝彩民们投注顺利 盈利多多！
亲爱的彩迷们好：

华宇原生APP 於8月8日（星期四）15：10维护完毕。

欢迎彩民们多加选择娱乐，祝彩民们投注顺利 盈利多多！
亲爱的彩迷们好：

华宇原生APP 於8月8日（星期四）15：10维护完毕。

欢迎彩民们多加选择娱乐，祝彩民们投注顺利 盈利多多！
亲爱的彩迷们好：

华宇原生APP 於8月8日（星期四）15：10维护完毕。

欢迎彩民们多加选择娱乐，祝彩民们投注顺利 盈利多多！
亲爱的彩迷们好：

华宇原生APP 於8月8日（星期四）15：10维护完毕。

欢迎彩民们多加选择娱乐，祝彩民们投注顺利 盈利多多！
亲爱的彩迷们好：

华宇原生APP 於8月8日（星期四）15：10维护完毕。

欢迎彩民们多加选择娱乐，祝彩民们投注顺利 盈利多多！
亲爱的彩迷们好：

华宇原生APP 於8月8日（星期四）15：10维护完毕。

欢迎彩民们多加选择娱乐，祝彩民们投注顺利 盈利多多！
亲爱的彩迷们好：

华宇原生APP 於8月8日（星期四）15：10维护完毕。

欢迎彩民们多加选择娱乐，祝彩民们投注顺利 盈利多多！`
	},
	{
		id: 2,
		title: '请注意收款账号，避免汇款进同姓请注意收款账号，避免汇款进同姓',
		createdAt: '2018-12-20T16:01:21.000Z',
		content: `亲爱的彩迷们好：

请注意收款账号，避免汇款进同姓请注意收款账号，避免汇款进同`
	},
	{
		id: 3,
		title: '8/8 河内时时彩 维护完毕公告',
		createdAt: '2018-12-20T16:01:22.000Z',
		content: `亲爱的彩迷们好：

『河内时时彩』已经于 8月8日（星期四）15：10维护完毕。

欢迎彩民们多加选择娱乐，祝彩民们投注顺利 盈利多多！`
	},
	{
		id: 4,
		title: '8/8 VR金星1.5分彩 维护公告',
		createdAt: '2018-12-20T16:01:23.000Z',
		content: `亲爱的彩迷们好：

『河内时时彩』已经于 8月8日（星期四）15：10维护完毕。

欢迎彩民们多加选择娱乐，祝彩民们投注顺利 盈利多多！`
	},
	{
		id: 5,
		title: '8/8 VR金星1.5分彩 维护公告',
		createdAt: '2018-12-20T16:01:23.000Z',
		content: `亲爱的彩迷们好：

『河内时时彩』已经于 8月8日（星期四）15：10维护完毕。

欢迎彩民们多加选择娱乐，祝彩民们投注顺利 盈利多多！`
	},
	{
		id: 6,
		title: '8/8 VR金星1.5分彩 维护公告',
		createdAt: '2018-12-20T16:01:23.000Z',
		content: `亲爱的彩迷们好：

『河内时时彩』已经于 8月8日（星期四）15：10维护完毕。

欢迎彩民们多加选择娱乐，祝彩民们投注顺利 盈利多多！`
	},
	{
		id: 7,
		title: '8/8 VR金星1.5分彩 维护公告',
		createdAt: '2018-12-20T16:01:23.000Z',
		content: `亲爱的彩迷们好：

『河内时时彩』已经于 8月8日（星期四）15：10维护完毕。

欢迎彩民们多加选择娱乐，祝彩民们投注顺利 盈利多多！`
	},
	{
		id: 8,
		title: '8/8 VR金星1.5分彩 维护公告',
		createdAt: '2018-12-20T16:01:23.000Z',
		content: `亲爱的彩迷们好：

『河内时时彩』已经于 8月8日（星期四）15：10维护完毕。

欢迎彩民们多加选择娱乐，祝彩民们投注顺利 盈利多多！`
	},
	{
		id: 9,
		title: '8/8 VR金星1.5分彩 维护公告',
		createdAt: '2018-12-20T16:01:23.000Z',
		content: `亲爱的彩迷们好：

『河内时时彩』已经于 8月8日（星期四）15：10维护完毕。

欢迎彩民们多加选择娱乐，祝彩民们投注顺利 盈利多多！`
	},
	{
		id: 10,
		title: '8/8 VR金星1.5分彩 维护公告',
		createdAt: '2018-12-20T16:01:23.000Z',
		content: `亲爱的彩迷们好：

『河内时时彩』已经于 8月8日（星期四）15：10维护完毕。

欢迎彩民们多加选择娱乐，祝彩民们投注顺利 盈利多多！`
	},
];
