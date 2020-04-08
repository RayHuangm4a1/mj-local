import React, { createRef, } from 'react';
import PropTypes from 'prop-types';
import {
	Input,
	Form,
	FormItem,
	Button,
} from 'ljit-react-components';
import {
	DATE_TIME,
} from '../../../../../lib/moment-utils';
import { MAX_SELECTION_DAYS } from '../../../../../lib/constants';
import SelectDropdown from '../../../../components/select-dropdown';
import ClientDateRangePicker from '../../../../features/client-date-range-picker';

const { RangesEnums } = ClientDateRangePicker;
const {
	TODAY,
	YESTERDAY,
	THIS_WEEK,
} = RangesEnums;

const propTypes = {
	id: PropTypes.string,
	type: PropTypes.string,
	period: PropTypes.array,
	disabled: PropTypes.bool,
	typeOptions: PropTypes.array.isRequired,
	onSearch: PropTypes.func.isRequired,
};

const SearchForm = ({
	id,
	type,
	period,
	disabled,
	typeOptions,
	onSearch,
}) => {
	const formRef = createRef(null);

	function _handleSearch(event) {
		event.preventDefault();

		const form = formRef.current.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				onSearch(values);
			}
		});
	}

	return (
		<Form
			cancelButtonDisabled
			submitButtonDisabled
			ref={formRef}
		>
			<FormItem
				label="方案号"
				itemName="id"
				labelColon={false}
				itemConfig={{
					initialValue: id,
				}}
			>
				<Input
					placeholder="输入方案号"
				/>
			</FormItem>
			<FormItem
				label="类型"
				itemName="type"
				labelColon={false}
				itemConfig={{
					initialValue: type,
				}}
			>
				<SelectDropdown
					options={typeOptions}
				/>
			</FormItem>
			<FormItem
				label="时间"
				itemName="period"
				labelColon={false}
				itemConfig={{
					initialValue: period,
				}}
			>
				<ClientDateRangePicker
					inputStyle={{ width: '310px', }}
					ranges={[TODAY, YESTERDAY, THIS_WEEK]}
					showTime
					format={DATE_TIME}
					limitDays={MAX_SELECTION_DAYS}
				/>
			</FormItem>
			<Button
				outline={Button.OutlineEnums.SOLID}
				onClick={_handleSearch}
				disabled={disabled}
			>
				查询
			</Button>
		</Form>
	);
};

SearchForm.propTypes = propTypes;

export default SearchForm;
