import React, { useRef, useEffect, } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	Form,
	FormItem,
	Select,
	Input,
} from 'ljit-react-components';
import { PREFIX_CLASS } from './';

const propTypes = {
	filters: PropTypes.shape({
		playConditionId: PropTypes.number,
		award: PropTypes.string,
		keyword: PropTypes.string,
	}),
	playConditionOptions: PropTypes.array,
	awardOptions: PropTypes.array,
	onSearch: PropTypes.func,
};
const defaultProps = {
	filters: {},
	playConditionOptions: [],
	awardOptions: [],
	onSearch: () => {},
};

function SearchForm({
	filters: {
		playConditionId,
		award,
		keyword,
	},
	playConditionOptions,
	awardOptions,
	onSearch,
}) {
	const formInstance = useRef(null);
	
	useEffect(() => {
		const form = formInstance.current.getForm();

		form.setFieldsValue({
			playConditionId,
			award,
			keyword,
		});
	}, [playConditionId, award, keyword]);

	function _handleSearch() {
		const form = formInstance.current.getForm();

		form.validateFields((err, values) => {
			if (!err) {
				onSearch(values);
			}
		});
	}

	function _handleReset() {
		const form = formInstance.current.getForm();

		form.resetFields();
	}

	const allOption = { label: '全部', value: null };
	const playConditionSelectOptions = [allOption, ...playConditionOptions];
	const awardSelectOptions = [allOption, ...awardOptions];

	return (
		<div className={`${PREFIX_CLASS}__form`}>
			<Form
				submitButtonDisabled
				cancelButtonDisabled
				ref={formInstance}
			>
				<div>
					<FormItem
						itemName="playConditionId"
						label="分类"
						labelColon
						itemConfig={{ initialValue: null, }}
					>
						<Select
							options={playConditionSelectOptions}
							placeholder={"请选择分类"}
						/>
					</FormItem>
					<FormItem
						itemName="award"
						label="奖项"
						labelColon
						itemConfig={{ initialValue: null, }}
					>
						<Select
							options={awardSelectOptions}
							placeholder={"请选择奖项名称"}
						/>
					</FormItem>
					<FormItem
						itemName="keyword"
						label="关键字"
						labelColon
						itemConfig={{ initialValue: '', }}
					>
						<Input
							placeholder={"请输入关键字"}
						/>
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
