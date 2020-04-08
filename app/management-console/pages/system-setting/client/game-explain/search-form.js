import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { PREFIX_CLASS } from './';
import {
	Form,
	FormItem,
	Select,
	InputSearch,
	DateRangePicker,
	Button,
} from 'ljit-react-components';

const propTypes = {
	onSearch: PropTypes.func,
	lotteryOptions: PropTypes.array,
};

const defaultProps = {
	onSearch: () => {},
	lotteryOptions: [],
};

function SearchForm({
	lotteryOptions,
	onSearch
}) {

	const formInstance = useRef(null);

	function _handleSearch() {
		const form = formInstance.current.getForm();

		form.validateFields((err, value) => {
			if (!err) {
				form.resetFields();
				onSearch(value);
			}
		});
	}
	function _handleReset() {
		const form = formInstance.current.getForm();

		form.resetFields();
	}
	return (
		<div className={`${PREFIX_CLASS}__search-form`}> 
			<Form
				submitButtonDisabled
				cancelButtonDisabled
				ref={formInstance}
			>
				<div>
					<FormItem
						itemName="lottery"
						label="彩种"
						labelColon
					>
						{/* TOOD use search select when use real data */}
						<Select
							options={lotteryOptions}
							placeholder={"请选择分类"}
						/>
					</FormItem>
					<FormItem
						itemName="playName"
						label="玩法名称"
						labelColon
					>
						<InputSearch/>
					</FormItem>
					<FormItem
						itemName="date"
						label="创建时间"
						labelColon
					>
						<DateRangePicker/>
					</FormItem>
				</div>
				<div>
					<Button
						onClick={_handleSearch}
						outline={Button.OutlineEnums.SOLID}
					>查询</Button>
					<Button
						onClick={_handleReset}
						outline={Button.OutlineEnums.HOLLOW}
					>重置</Button>
				</div>
			</Form>
		</div>
	);
}

SearchForm.propTypes = propTypes;
SearchForm.defaultProps = defaultProps;

export default SearchForm;
