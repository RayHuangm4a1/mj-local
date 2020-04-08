import React, {
	useRef,
	useState,
} from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Select,
} from 'ljit-react-components';
import PageModal from '../../../../components/page-modal';

const { ColumnTypeEnums, } = FormItem;
const selectStyle = {
	maxWidth: 150,
};

const propTypes = {
	isVisible: PropTypes.bool,
	/*
		TODO 待確認 cities, cityDistricts 實際資料結構
		實際串接資料流後，將 cities, cityDistricts 接回頁面
	*/
	cities: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string,
		value: PropTypes.string,
	})),
	cityDistricts: PropTypes.objectOf(
		PropTypes.arrayOf(PropTypes.object)
	),
	onClose: PropTypes.func,
	onSubmit: PropTypes.func,
};
const defaultProps = {
	isVisible: false,
	onClose: () => {},
	onSubmit: () => {},
};

const RegionFormModal = ({
	isVisible,
	cities = fakeCities,
	cityDistricts = fakeCityDistricts,
	onClose,
	onSubmit,
}) => {
	const formInstance = useRef(null);
	const [ cityValue, setCityValue, ] = useState(null);

	function _handleChangeCity(value) {
		const form = formInstance.current.getForm();
		const districts = cityDistricts[value] || [];
		const nextDistrictValue = districts[0] ? districts[0].value : null;

		setCityValue(value);
		form.setFieldsValue({ district: nextDistrictValue, });
	}

	function _handleSubmit(event) {
		const form = formInstance.current.getForm();

		event.preventDefault();
		form.validateFields((error, values) => {
			if (error) {
				return;
			}

			onSubmit(values);
			form.resetFields();
		});
	}

	function _handleClose() {
		const form = formInstance.current.getForm();

		onClose();
		form.resetFields();
	}

	return (
		<PageModal
			title="新增地区"
			visible={isVisible}
			modalSize={PageModal.ModalSizeEnum.SMALL}
			onClickOk={_handleSubmit}
			onClickCancel={_handleClose}
		>
			<Form
				ref={formInstance}
				submitButtonDisabled
				cancelButtonDisabled
			>
				<FormItem
					label="市"
					itemName="city"
					columnType={ColumnTypeEnums.SMALL}
				>
					<Select
						options={cities}
						onChange={_handleChangeCity}
						placeholder="请选择市"
						style={selectStyle}
					/>
				</FormItem>
				<FormItem
					label="区"
					itemName="district"
					columnType={ColumnTypeEnums.SMALL}
				>
					<Select
						options={cityDistricts[cityValue] || []}
						placeholder="请选择地区"
						style={selectStyle}
					/>
				</FormItem>
			</Form>
		</PageModal>
	);
};

RegionFormModal.propTypes = propTypes;
RegionFormModal.defaultProps = defaultProps;

export default RegionFormModal;

const fakeCities = [
	{ label: '北京', value: 'beijing', },
	{ label: '上海', value: 'shanghai', },
];
// TODO group by city value
const fakeCityDistricts = {
	beijing: [
		{ label: '昌平', value: 'changping', },
		{ label: '东城', value: 'dongcheng', },
		{ label: '房山', value: 'fangshan', },
		{ label: '丰台', value: 'fengtai', },
	],
	shanghai: [
		{ label: '宝山', value: 'baoshan', },
		{ label: '长宁', value: 'changning', },
		{ label: '崇明', value: 'chongming', },
		{ label: '奉贤', value: 'fengxian', },
	],
};
