import { List, Map, } from 'immutable';

// TODO: should remove when data is ready
const fakeAutoChannels = [
	{
		_id: 0,
		channel: '上海銀行（銀行代付）',
		minValue: 100,
		maxValue: 400,
		blackList: ['中央银行', '农民银行', '工商银行'],
	},
	{
		_id: 1,
		channel: '智付（代付公司）',
		minValue: 500,
		maxValue: 1000,
		blackList: ['中央银行', '农民银行', '工商银行'],
	},
	{
		_id: 2,
		channel: '支付宝（第三方代付）',
		minValue: 1200,
		maxValue: 1500,
		blackList: ['中央银行', '农民银行', '工商银行'],
	},
];

// TODO: check state schema
const initialState = Map({
	autoChannelsData: List(fakeAutoChannels),
});

export default function cashSystemAutoChannelManagementPage(state = initialState, action) {
	switch (action.type) {
		default:
			return state;
	}
}
