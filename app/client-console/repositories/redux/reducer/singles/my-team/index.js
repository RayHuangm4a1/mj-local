import { combineReducers, } from 'redux';
import bettingRecords from './betting-records';
import reports from './reports';
import traceRecords from './trace-records';
import traceRecordDetail from './trace-record-detail';
import stats from './stats';

const myTeam = combineReducers({
	bettingRecords,
	reports,
	traceRecords,
	traceRecordDetail,
	stats,
});

export default myTeam;
