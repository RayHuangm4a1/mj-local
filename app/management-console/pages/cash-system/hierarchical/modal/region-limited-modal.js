import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	InputDynamicTable,
	Select,
	Button,
} from 'ljit-react-components';
import PageModal from '../../../../components/page-modal';

const propTypes = {
	defaultData: PropTypes.arrayOf(PropTypes.shape({
		province: PropTypes.string,
		city: PropTypes.string,
	})),
	isVisible: PropTypes.bool,
	onSubmit: PropTypes.func,
	onClose: PropTypes.func,
};
const defaultProps = {
	isVisible: false,
	defaultData: [],
	onSubmit: () => {},
	onClose: () => {},
};

class RegionLimitedModal extends Component {
	constructor() {
		super();
		this.state = {
			data: []
		};

		this._handleSubmit = this._handleSubmit.bind(this);
	}
	_handleSubmit() {
		const { onSubmit, } = this.props;
		const { data } =  this.state;

		onSubmit(data);
	}
	render() {
		const { isVisible, onClose } = this.props;
		const { data, } = this.state;
		const { _handleSubmit } = this;

		return (
			<PageModal
				title="地区限制列表"
				visible={isVisible}
				onClickCancel={onClose}
				footer={(
					<Button
						color={Button.ColorEnums.BRIGHTBLUE500}
						onClick={_handleSubmit}
					>
						保 存
					</Button>
				)}
			>
				<InputDynamicTable
					columns={[
						{
							title: '省',
							dataIndex: 'province',
							renderField: (record, rowIndex, onChange) => (
								<Select
									placeholder="请选择地区"
									value={record.province}
									// TODO get options
									options={[
										{ label: '上海', value: '上海', },
										{ label: '北京', value: '北京', },
									]}
									style={{ width: 156 }}
									onChange={(value) => onChange('province', value, rowIndex)}
								/>
							)
						},
						{
							title: '市',
							dataIndex: 'city',
							renderField: (record, rowIndex, onChange) => (
								<Select
									placeholder="请选择地区"
									value={record.city}
									// TODO get options
									options={[
										{ label: '徐匯', value: '徐匯', },
										{ label: '東城', value: '東城', },
									]}
									style={{ width: 156 }}
									onChange={(value) => onChange('city', value, rowIndex)}
								/>
							)
						}
					]}
					value={data}
					onChange={(data) => this.setState({ data, })}
				/>
			</PageModal>
		);
	}
	componentDidUpdate(prevProp) {
		const { isVisible, defaultData, } = this.props;

		if (prevProp.isVisible !== isVisible) {
			this.setState({ data: defaultData, });
		}
	}
}

RegionLimitedModal.propTypes = propTypes;
RegionLimitedModal.defaultProps = defaultProps;

export default RegionLimitedModal;
