import React, { useState, useEffect } from 'react';
import {
	HeaderButtonBar,
	Table,
	StatusTag,
	Button,
	TextButton,
} from 'ljit-react-components';
import RoleSettingModal from './role-setting-modal';
import SearchForm from './search-form';
import PageBlock from '../../../../components/page-block';
import './style.styl';

const { SUCCESS, ERROR } = StatusTag.StatusEnums;
const initialFormState = {
	// TODO: confirm data
	name: '',
	type: '',
	parent: '',
	status: 'inactive',
	remark: '',
};

function SystemSettingAdministratorManageRolePage() {
	const [roleDatas, setRoleDatas] = useState([]);
	const [roleParentOptions, setRoleParentOptions] = useState([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [record, setRecord] = useState(initialFormState);

	useEffect(() => {
		// TODO: should fetch role datas from api
		const roleParentOptions = fakeRoleParents.map((option, index) => {
			const { value } = option;

			return {
				label: value,
				value: `option-${index}`,
			};
		});

		setRoleDatas(fakeRoleDatas);
		setRoleParentOptions(roleParentOptions);
	}, []);

	function _handleClickCreate() {
		setIsModalVisible(true);
		setIsEditing(false);
	}

	function _handleSubmitCreate(data) {
		// TODO: handle submit role create action with data

		_handleCancel();
	}

	function _handleClickEdit(record = {}) {
		setIsModalVisible(true);
		setIsEditing(true);
		setRecord(record);
	}

	function _handleSubmitEdit(data) {
		// TODO: handle submit role edit action with data

		_handleCancel();
	}

	function _handleCancel() {
		setIsModalVisible(false);
		setRecord(initialFormState);
	}

	function _handleSearch(data) {
		//TODO fetch data api with data
	}

	function _handleReset(event) {
		//TODO reset
	}

	return (
		<PageBlock className="system-setting-role">
			<SearchForm
				roleParentOptions={roleParentOptions}
				onReset={_handleReset}
				onSearch={_handleSearch}
			/>
			<HeaderButtonBar
				right={[
					(
						<Button
							color={Button.ColorEnums.BRIGHTBLUE500}
							icon="plus"
							onClick={_handleClickCreate}
							key="create"
						>
							新增角色
						</Button>
					),
				]}
			/>
			<Table
				dataSource={roleDatas}
				columns={[
					{
						title: "角色名称",
						dataIndex: "name",
					},
					{
						title: "类別",
						dataIndex: "type",
					},
					{
						title: "上级",
						dataIndex: "parent",
					},
					{
						title: "状态",
						dataIndex: "status",
						render: (value, record, index) => (
							<StatusTag
								status={value === 'active' ? SUCCESS : ERROR}
								text={value === 'active' ? '启用' : '停用'}
							/>
						),
					},
					{
						title: "备注",
						dataIndex: "remark",
						width: 360,
					},
					{
						title: "操作",
						dataIndex: "action",
						render: (value, record, index) => (
							<TextButton
								text="修改"
								onClick={() => _handleClickEdit(record)}
							/>
						),
					},
				]}
			/>
			<RoleSettingModal
				modalTitle={isEditing ? '修改' : '新增角色'}
				isModalVisible={isModalVisible}
				onSubmit={isEditing ? _handleSubmitEdit : _handleSubmitCreate}
				onCancel={_handleCancel}
				roleData={record}
				roleParentOptions={roleParentOptions}
			/>
		</PageBlock>
	);
}

export default SystemSettingAdministratorManageRolePage;

// TODO: to remove when api is ready
const fakeRoleDatas = [
	{
		key: 1,
		name: '客服人员',
		type: '客服',
		parent: '客服主任',
		status: 'active',
		remark: '',
	},
	{
		key: 2,
		name: '客服主任',
		type: '客服',
		parent: '客服主管',
		status: 'inactive',
		remark: '',
	},
	{
		key: 3,
		name: '财务',
		type: '财务',
		parent: '财务代理',
		status: 'active',
		remark: '',
	},
	{
		key: 4,
		name: '客服人员',
		type: '客服',
		parent: '客服主任',
		status: 'active',
		remark: '',
	},
	{
		key: 5,
		name: '财务组长',
		type: '财务',
		parent: '财务主管',
		status: 'active',
		remark: '',
	},
	{
		key: 6,
		name: '系統管理員',
		type: '客服',
		parent: '系統管理員',
		status: 'active',
		remark: '',
	},
];
const fakeRoleParents = [
	{ key: 1, value: '客服主任' },
	{ key: 2, value: '财务代理' },
	{ key: 3, value: '财务主管' },
	{ key: 4, value: '系統管理員' },
];
