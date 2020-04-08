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
import RegionFormModal from '../../form/region-form-modal';

const { Message, } = PageModal;

const propTypes = {
	// TODO update prop types
	regionsData: PropTypes.arrayOf(PropTypes.object),
};

const RegionPage = ({
	// TODO select from reducer
	regionsData = fakeData,
}) => {
	const [ isModalVisible, toggleModalVisible, ] = useToggle(false);
	const [ isDeleteMessageVisible, toggleDeleteMessageVisible, ] = useToggle(false);
	const [ selectedRegionId, setSelectedRegionId, ] = useState(null);
	// TODO 應該透過 redux 更新資料，於串接 reducer 後移除
	const [ regions, setRegions, ] = useState(regionsData);
	const tableColumns = [
		{
			title: '地区列表',
			dataIndex: 'region',
			// TODO mapping city and district name by value
			render: (data, { city = '', district = '', }) => {
				const cityName = fakeRegionValueMap[city] || city;
				const districtName = fakeRegionValueMap[district] || district;

				return `${cityName}-${districtName}`;
			},
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

	// TODO fetch regions data

	function _handleClickDelete({ id, }) {
		setSelectedRegionId(id);
		toggleDeleteMessageVisible();
	}
	function _handleDelete() {
		// TODO delete data by selectedRegionId
		setRegions(prev => prev.filter(item => item.id !== selectedRegionId));
		toggleDeleteMessageVisible();
	}

	function _handleCreateRegion(inputRegion) {
		if (isObjectEmpty(inputRegion)) {
			toggleModalVisible();

			return;
		}

		// TODO update reducer
		const rowdata = {
			...inputRegion,
			id: uuidv4(),
		};

		setRegions(prev => [ ...prev, rowdata, ]);

		toggleModalVisible();
	}

	return (
		<div className="auto-page-content">
			<HeaderButtonBar
				left={(
					<div className="auto-page-content__title">
						地区条件设置
					</div>
				)}
				right={(
					<Button
						color={Button.ColorEnums.BRIGHTBLUE500}
						onClick={toggleModalVisible}
					>
						新增地区
					</Button>
				)}
			/>
			<Table
				rowKey="id"
				dataSource={regions}
				columns={tableColumns}
			/>
			<RegionFormModal
				isVisible={isModalVisible}
				onSubmit={_handleCreateRegion}
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

RegionPage.propTypes = propTypes;

export default RegionPage;

const fakeData = [
	{
		id: 0,
		city: '上海',
		district: '徐匯',
	},
	{
		id: 1,
		city: '北京',
		district: '東城',
	},
];

const fakeRegionValueMap = {
	beijing: '北京',
	shanghai: '上海',
	changping: '昌平',
	dongcheng: '东城',
	fangshan: '房山',
	fengtai: '丰台',
	baoshan: '宝山',
	changning: '长宁',
	chongming: '崇明',
	fengxian: '奉贤',
};
