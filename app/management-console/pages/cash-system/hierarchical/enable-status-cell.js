import {
	StatusTag,
} from 'ljit-react-components';
import { Cells, } from '../../../components/table';

const {
	SUCCESS,
	ERROR,
} = StatusTag.StatusEnums;
const {
	withStatuses,
} = Cells;

const EnableStatuses = [
	{
		status: SUCCESS,
		text: '启用',
		value: 'enabled',
	},
	{
		status: ERROR,
		text: '停用',
		value: 'disabled',
	},
];

const EnableStatusCell = withStatuses(EnableStatuses);

export default EnableStatusCell;
