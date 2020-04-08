import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	LabelContent,
	Input,
	Select,
	RadioGroup,
	Modal,
} from 'ljit-react-components';
import PageModal from '../../../components/page-modal';
import { StatusEnums, TransferEnums, } from '../utils';

const { ONLINE, MAINTENANCE, OFFLINE, } = StatusEnums;
const { MANUAL, } = TransferEnums;

const propTypes = {
	isVisible: PropTypes.bool,
	initialValues: PropTypes.object,
	onSubmit: PropTypes.func,
	onCancel: PropTypes.func,
};
const defaultProps = {
	onSubmit: () => {},
	onCancel: () => {},
};

class SettingForm extends Component {
	constructor() {
		super();

		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleReset = this._handleReset.bind(this);
	}

	_handleSubmit(event) {
		event.preventDefault();
		const form = this.formInstance.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				this.props.onSubmit({ ...values, transfer: MANUAL, });
			}
		});
	}

	_handleReset(event) {
		event.preventDefault();
		const form = this.formInstance.getForm();

		form.resetFields();
		this.props.onCancel();
	}

	render() {
		const { isVisible, initialValues, } = this.props;
		const { _handleSubmit, _handleReset, } = this;

		return (
			<PageModal
				className="external-game-setting-form"
				visible={isVisible}
				title="修改"
				modalSize={Modal.ModalSizeEnum.NORMAL}
				onClickCancel={_handleReset}
				onClickOk={_handleSubmit}
			>
				<Form
					submitButtonDisabled
					cancelButtonDisabled
					onChange={() => {}}
					ref={(refForm) => this.formInstance = refForm }
				>
					<FormItem
						label="平台名称："
						itemName="platformName"
						itemConfig={{
							initialValue: initialValues.platformName,
						}}
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
					>
						<Input
							className="external-game-setting-form__input"
							placeholder=""
						/>
					</FormItem>
					<FormItem
						label="类别："
						itemName="platformClass"
						itemConfig={{
							initialValue: initialValues.platformClass,
						}}
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
					>
						<Select
							className="external-game-setting-form__input"
							options={[
								{ label: '真人', value: 'live', },
								{ label: '棋牌', value: 'chess', },
								{ label: '体育', value: 'sport', },
								{ label: '电子', value: 'electric', },
							]}
							placeholder="请选择类别"
						/>
					</FormItem>
					<FormItem
						label="APP是否显示："
						itemName="isAppShow"
						itemConfig={{
							initialValue: initialValues.isAppShow,
						}}
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
					>
						<RadioGroup
							className="external-game-setting-form__input"
							options={[
								{ label: '显示', value: true, },
								{ label: '不显示', value: false, },
							]}
						/>
					</FormItem>
					<LabelContent
						label="转点方式："
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
					>
						{'手动转点'}
					</LabelContent>
					<FormItem
						label="修改状态："
						itemName="status"
						itemConfig={{
							initialValue: initialValues.status,
						}}
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
					>
						<RadioGroup
							radioType={RadioGroup.RadioTypeEnums.BUTTON}
							options={[
								{ value: ONLINE, label: '上线',  },
								{ value: MAINTENANCE, label: '系统维护中',  },
								{ value: OFFLINE, label: '下线',  },
							]}
						/>
					</FormItem>
				</Form>
			</PageModal>
		);
	}
}

SettingForm.propTypes = propTypes;
SettingForm.defaultProps = defaultProps;

export default SettingForm;
