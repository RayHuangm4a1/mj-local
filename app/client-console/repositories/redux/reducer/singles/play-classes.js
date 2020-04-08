import { List, Map } from 'immutable';
import { LoadingStatusEnum } from "../../../../lib/enums";

/* Example
data:
[
	{
		_id: "_id",
		platform: {
			_id: "_id",
			name: "QQ",
			code: "qq",
		},
		name: "官方",
		code: "standard",
		createdAt: Date,
		updatedAt: Date,
	},
]
*/

const initialState = Map({
	data: List(),

	loadingStatus: LoadingStatusEnum.NONE,
	loadingMessage: "",
});

export default function playClasses(state = initialState, action) {
	switch (action.type) {
		default:
			return state;
	}
}
