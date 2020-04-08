import React, { useState, } from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import {
	HeaderButtonBar,
	Button,
	Table,
	TextButton,
} from 'ljit-react-components';
import { isObjectEmpty, } from '../../../../../../lib/object-utils';
import { useToggle, } from '../../../../../lib/react-utils';
import PageModal from '../../../../../components/page-modal';
import IpFormModal from '../../form/ip-form-modal';

const { Message, } = PageModal;

const propTypes = {
	// TODO update prop types
	ipsData: PropTypes.arrayOf(PropTypes.object),
};

const IpPage = ({
	// TODO select from reducer
	ipsData = fakeData,
}) => {
	const [ isModalVisible, toggleModalVisible, ] = useToggle(false);
	const [ isDeleteMessageVisible, toggleDeleteMessageVisible, ] = useToggle(false);
	const [ selectedIpId, setSelectedIpId, ] = useState(null);
	// TODO 應該透過 redux 更新資料，於串接 reducer 後移除
	const [ ips, setIps, ] = useState(ipsData);
	const tableColumns = [
		{
			title: 'IP列表',
			dataIndex: 'ip',
		},
		{
			title: '操作',
			dataIndex: 'operation',
			render: function _render(value, record) {
				return (
					<TextButton
						color="danger"
						text="删除"
						onClick={() => _handleClickDelete(record)}
					/>
				);
			},
		},
	];

	// TODO fetch ips data

	function _handleClickDelete({ id, }) {
		setSelectedIpId(id);
		toggleDeleteMessageVisible();
	}
	function _handleDelete() {
		// TODO delete data by selectedIpId
		setIps(prev => prev.filter(item => item.id !== selectedIpId));
		toggleDeleteMessageVisible();
	}

	function _handleCreateIp(inputIp) {
		if (isObjectEmpty(inputIp)) {
			toggleModalVisible();

			return;
		}

		// TODO update reducer
		const rowdata = {
			...inputIp,
			id: uuidv4(),
		};

		setIps(prev => [ ...prev, rowdata, ]);

		toggleModalVisible();
	}

	return (
		<div className="auto-page-content">
			<HeaderButtonBar
				left={(
					<div className="auto-page-content__title">
						IP条件设置
					</div>
				)}
				right={(
					<Button
						color={Button.ColorEnums.BRIGHTBLUE500}
						onClick={toggleModalVisible}
					>
						新增IP
					</Button>
				)}
			/>
			<Table
				rowKey="id"
				dataSource={ips}
				columns={tableColumns}
			/>
			<IpFormModal
				isVisible={isModalVisible}
				onSubmit={_handleCreateIp}
				onClose={toggleModalVisible}
			/>
			<Message
				visible={isDeleteMessageVisible}
				title="确认提示"
				message="是否确认删除"
				onClickCancel={toggleDeleteMessageVisible}
				onClickOk={_handleDelete}
			/>
		</div>
	);
};

IpPage.propTypes = propTypes;

export default IpPage;

const fakeData = [
	{
		id: 0,
		ip: '192.168.0.1',
	},
	{
		id: 1,
		ip: '192.168.225.200',
	},
];
