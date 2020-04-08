import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Row,
	Col,
	Select,
} from 'ljit-react-components';

const propTypes = {
	roleParentOptions: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string,
		value: PropTypes.string,
	})),
	onReset: PropTypes.func,
	onSearch: PropTypes.func,
};
const defaultProps = {
	roleParentOptions: [],
	onReset: () => {},
	onSearch: () => {},
};

const COL_SPAN_NUMBER = 8;
const RoleTypeOptions = [
	{ label: '客服', value: '客服' },
	{ label: '财务', value: '财务' },
];

const RoleStatusOptions = [
	{ label: '全部', value: 'all', },
	{ label: '启用', value: 'active', },
	{ label: '停用', value: 'inactive', },
];

function SearchForm({
	roleParentOptions,
	onReset,
	onSearch,
}) {
	const formInstance = useRef(null);

	function _handleSearch(event) {
		event.preventDefault();

		const { validateFields } = formInstance.current;

		validateFields((error, data) => {
			if (!error) {
				onSearch(data);
			}
		});
	}

	function _handleReset(event) {
		event.preventDefault();

		const { resetFields } = formInstance.current;

		resetFields();
		onReset(event);
	}

	return (
		<Form
			ref={formInstance}
			onSubmit={_handleSearch}
			onCancel={_handleReset}
			submitText="查询"
			cancelText="重置"
		>
			<Row type={Row.TypeEnums.FLEX}>
				<Col span={COL_SPAN_NUMBER}>
					<FormItem
						itemName="type"
						label="类别"
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
					>
						<Select
							options={RoleTypeOptions}
							placeholder="请选择类别"
						/>
					</FormItem>
				</Col>
				<Col span={COL_SPAN_NUMBER}>
					<FormItem
						label="上级"
						itemName="parent"
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
					>
						<Select
							options={roleParentOptions}
							placeholder="请选择上级"
						/>
					</FormItem>
				</Col>
				<Col span={COL_SPAN_NUMBER}>
					<FormItem
						itemName="status"
						label="状态"
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
						itemConfig={{ initialValue: RoleStatusOptions[0].value }}
					>
						<Select
							options={RoleStatusOptions}
							placeholder="请选择状态"
						/>
					</FormItem>
				</Col>
			</Row>
		</Form>
	);
}

SearchForm.propTypes = propTypes;
SearchForm.defaultProps = defaultProps;

export default SearchForm;
