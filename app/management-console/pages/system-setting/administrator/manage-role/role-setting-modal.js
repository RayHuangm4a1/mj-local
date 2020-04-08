import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Input,
	Select,
	InputTextarea,
	RadioGroup,
} from 'ljit-react-components';
import PageModal from '../../../../components/page-modal';

const propTypes = {
	// TODO: should confirm record data
	modalTitle: PropTypes.string,
	roleData: PropTypes.shape({
		name: PropTypes.string,
		type: PropTypes.string,
		parent: PropTypes.string,
		status: PropTypes.string,
		remark: PropTypes.string,
	}),
	roleParentOptions: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string,
		value: PropTypes.string,
	})),
	isModalVisible: PropTypes.bool,
	onSubmit: PropTypes.func,
	onCancel: PropTypes.func,
};
const defaultProps = {
	modalTitle: '',
	roleData: {},
	isModalVisible: false,
	roleParentOptions: [],
	onSubmit: () => {},
	onCancel: () => {},
};

const RoleTypeOptions = [
	{ label: '客服', value: '客服' },
	{ label: '财务', value: '财务' },
];

const RoleStatusOptions = [
	{ label: '启用', value: 'active', },
	{ label: '停用', value: 'inactive', },
];
const PREFIX_CLASS = 'role-setting-modal';

function RoleSettingModal({
	modalTitle,
	roleData,
	isModalVisible,
	roleParentOptions,
	onSubmit,
	onCancel,
}) {
	const formInstance = useRef(null);

	function _handleSubmit(event) {
		event.preventDefault();

		const { validateFields, resetFields } = formInstance.current;

		validateFields((error, values) => {
			if (!error) {
				onSubmit(values);
				resetFields();
			}
		});
	}

	function _handleCancel(event) {
		event.preventDefault();

		const { resetFields } = formInstance.current;

		resetFields();
		onCancel();
	}

	const {
		name,
		type,
		parent,
		remark,
		status,
	} = roleData;

	return (
		<PageModal
			title={modalTitle}
			visible={isModalVisible}
			onClickOk={_handleSubmit}
			onClickCancel={_handleCancel}
			className={PREFIX_CLASS}
		>
			<Form
				ref={formInstance}
				submitButtonDisabled
				cancelButtonDisabled
			>
				<FormItem
					itemName="name"
					label="角色名称"
					columnType={FormItem.ColumnTypeEnums.SMALL}
					itemConfig={{
						initialValue: name,
						rules: [{
							required: true,
							message: '角色名称不能为空',
						}],
					}}
				>
					<Input />
				</FormItem>
				<FormItem
					itemName="type"
					label="类别"
					columnType={FormItem.ColumnTypeEnums.SMALL}
					itemConfig={{ initialValue: type || RoleTypeOptions[0].value }}
				>
					<Select
						options={RoleTypeOptions}
						placeholder="请选择类别"
					/>
				</FormItem>
				<FormItem
					itemName="parent"
					label="上级"
					columnType={FormItem.ColumnTypeEnums.SMALL}
					itemConfig={{ initialValue: parent }}
				>
					<Select
						options={roleParentOptions}
						placeholder="请选择上级"
					/>
				</FormItem>
				<FormItem
					itemName="remark"
					label="备注"
					columnType={FormItem.ColumnTypeEnums.SMALL}
					itemConfig={{ initialValue: remark }}
				>
					<InputTextarea
						minRows={4}
						maxRows={4}
					/>
				</FormItem>
				<FormItem
					itemName="status"
					label="状态"
					columnType={FormItem.ColumnTypeEnums.SMALL}
					itemConfig={{ initialValue: status || RoleStatusOptions[1].value }}
				>
					<RadioGroup
						className={`${PREFIX_CLASS}__radio-group`}
						radioType={RadioGroup.RadioTypeEnums.BUTTON}
						buttonStyle={RadioGroup.ButtonStyleEnums.SOLID}
						options={RoleStatusOptions}
					/>
				</FormItem>
			</Form>
		</PageModal>
	);
}

RoleSettingModal.propTypes = propTypes;
RoleSettingModal.defaultProps = defaultProps;

export default RoleSettingModal;
