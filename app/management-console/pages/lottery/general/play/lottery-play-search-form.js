import React, { useRef, useEffect, } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	Form,
	FormItem,
	Select,
	Input,
} from 'ljit-react-components';
import {
	filtersPropType,
	optionsPropType,
	statusOptions,
} from './utils';

const propTypes = {
	filters: filtersPropType,
	playConditionOptions: optionsPropType,
	subconditionOptions: optionsPropType,
	onChangePlayConditionId: PropTypes.func,
	onSearch: PropTypes.func,
};
const defaultProps = {
	filters: {},
	onChangePlayConditionId: () => {},
	onSearch: () => {},
};

const PREFIX_CLASS = 'lottery-play-search-form';

function LotteryPlaySearchFrom({
	filters: {
		playConditionId,
		subconditionId,
		status,
		keyword,
	},
	playConditionOptions,
	subconditionOptions,
	onChangePlayConditionId,
	onSearch,
}) {
	const formInstance = useRef(null);

	useEffect(() => {
		const form = formInstance.current.getForm();

		onChangePlayConditionId(playConditionId);
		form.setFieldsValue({
			playConditionId,
			subconditionId,
			status,
			keyword,
		});
	}, [playConditionId, subconditionId, status, keyword]);

	function _handleSelectPlayConditionId(playConditionId) {
		const form = formInstance.current.getForm();

		onChangePlayConditionId(playConditionId);
		form.setFieldsValue({
			subconditionId: null,
		});
	}

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

	return (
		<div className={`${PREFIX_CLASS}`}>
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
					>
						<Select
							options={playConditionOptions}
							placeholder={"请选择分类"}
							onChange={_handleSelectPlayConditionId}
						/>
					</FormItem>
					<FormItem
						itemName="subconditionId"
						label="子分类"
						labelColon
					>
						<Select
							options={subconditionOptions}
							placeholder={"请选择子分类"}
						/>
					</FormItem>
					<FormItem
						itemName="status"
						label="状态"
						labelColon
					>
						<Select
							options= {statusOptions}
							placeholder={"请选择状态"}
						/>
					</FormItem>
					<FormItem
						itemName="keyword"
						label="关键字"
						labelColon
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

LotteryPlaySearchFrom.propTypes = propTypes;
LotteryPlaySearchFrom.defaultProps = defaultProps;

export default LotteryPlaySearchFrom;
