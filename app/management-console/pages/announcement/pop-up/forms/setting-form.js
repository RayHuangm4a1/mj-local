import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	InputNumber,
	RadioGroup,
} from 'ljit-react-components';

const propTypes = {
	onSubmit: PropTypes.func,
	isShowingWinningAnnouncement: PropTypes.bool,
	minimumWinningAmount: PropTypes.number,
	timeRange: PropTypes.number,
	announcementUpdateTime: PropTypes.number,
};
const defaultProps = {
	onSubmit: () => {},
	isShowingWinningAnnouncement: true,
	minimumWinningAmount: 10,
	timeRange: 20,
	announcementUpdateTime: 5,
};

class SettingForm extends Component {
	constructor() {
		super();

		this._handleFormSubmit = this._handleFormSubmit.bind(this);
	}
	_handleFormSubmit() {
		const { onSubmit, } = this.props;
		const form = this.formInstance.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				// TODO send save setting apion
				onSubmit(values);
			}
		});
	}

	render() {
		const {
			isShowingWinningAnnouncement,
			minimumWinningAmount,
			timeRange,
			announcementUpdateTime,
		} = this.props;
		const { _handleFormSubmit, } = this;

		return (
			<Form
				ref={formRef => this.formInstance = formRef}
				onSubmit={_handleFormSubmit}
				submitText="保存设置"
				cancelButtonDisabled
			>
				<FormItem
					itemName="isShowingWinningAnnouncement"
					label="中獎公告"
					columnType={FormItem.ColumnTypeEnums.LARGE}
					itemConfig={{ initialValue: isShowingWinningAnnouncement, }}
				>
					<RadioGroup
						options={[
							{ label: '显示', value: true, },
							{ label: '不显示', value: false, }
						]}
					/>
				</FormItem>
				<FormItem
					itemName="minimumWinningAmount"
					label="最低中獎金額 (中獎公告)"
					columnType={FormItem.ColumnTypeEnums.LARGE}
					itemConfig={{ initialValue: minimumWinningAmount, }}
				>
					<InputNumber style={{ width: 108, }} min={0}/>
				</FormItem>
				<div style={{ position: 'relative', }}>
					<FormItem
						itemName="timeRange"
						label="选择多久时间资料"
						columnType={FormItem.ColumnTypeEnums.LARGE}
						itemConfig={{ initialValue: timeRange, }}
					>
						<InputNumber style={{ width: 108, }} min={0}/>
					</FormItem>
					<span className="suffix-text">分</span>
				</div>
				<div style={{ position: 'relative', }}>
					<FormItem
						itemName="announcementUpdateTime"
						label="公告更新时间"
						columnType={FormItem.ColumnTypeEnums.LARGE}
						itemConfig={{ initialValue: announcementUpdateTime, }}
					>
						<InputNumber style={{ width: 108, }} min={0}/>
					</FormItem>
					<span className="suffix-text">分</span>
				</div>
			</Form>
		);
	}
}

SettingForm.propTypes = propTypes;
SettingForm.defaultProps = defaultProps;

export default SettingForm;
