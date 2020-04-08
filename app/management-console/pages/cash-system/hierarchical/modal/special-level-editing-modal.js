import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Input,
	LabelContent,
	RadioGroup,
} from 'ljit-react-components';
import PageModal from '../../../../components/page-modal';
import { FinanceLevelDataPropTypes, } from '../../../../lib/prop-types-utils';
import { FinanceLevelStatusEnum, } from '../../../../lib/enums';

const {
	ENABLE,
	DISABLE,
} = FinanceLevelStatusEnum;

const PREFIX_CLASS = 'special-level-editing-modal';

const propTypes = {
	data: FinanceLevelDataPropTypes,
	className: PropTypes.string,
	isVisible: PropTypes.bool,
	onSubmit: PropTypes.func,
	onClose: PropTypes.func,
};
const defaultProps = {
	isVisible: false,
	data: {},
	onSubmit: () => {},
	onClose: () => {},
};

class SpecialLevelEditingModal extends Component {
	constructor() {
		super();
		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleCancel = this._handleCancel.bind(this);
	}

	_handleSubmit(event) {
		const { onSubmit, } = this.props;
		const form = this.formInstance.getForm();

		event.preventDefault();
		form.validateFields((error, values) => {
			if (!error) {
				onSubmit(values);
				form.resetFields();
			}
		});
	}

	_handleCancel(event) {
		const { onClose, } = this.props;
		const form = this.formInstance.getForm();

		onClose(event, form);
		form.resetFields();
	}

	render() {
		const { data, isVisible, } = this.props;
		const { _handleSubmit, _handleCancel, } = this;
		const {
			name,
			displayLevel,
			status,
		} = data;

		return (
			<PageModal
				className={PREFIX_CLASS}
				title="修改"
				visible={isVisible}
				onClickOk={_handleSubmit}
				onClickCancel={_handleCancel}
				width="640px"
			>
				<Form
					ref={formRef => this.formInstance = formRef}
					submitButtonDisabled
					cancelButtonDisabled
				>
					<LabelContent
						className={`${PREFIX_CLASS}__form-item`}
						label="层级"
						columnType={FormItem.ColumnTypeEnums.LARGE}
					>
						{displayLevel}
					</LabelContent>
					<FormItem
						className={`${PREFIX_CLASS}__form-item`}
						itemName="name"
						itemConfig={{
							initialValue: name,
							rules: [
								{
									required: true,
									min: 3,
									max: 15,
									message: '描述名称最少3码最多15码',
								},
							],
						}}
						label="描述名称"
						columnType={FormItem.ColumnTypeEnums.LARGE}
					>
						<Input
							style={{ width: 152 }}
						/>
					</FormItem>
					<FormItem
						className={`${PREFIX_CLASS}__form-item`}
						itemName="status"
						itemConfig={{
							initialValue: status,
							rules: [
								{
									required: true,
									message: '状态不能为空',
								},
							],
						}}
						label="状态"
						columnType={FormItem.ColumnTypeEnums.LARGE}
					>
						<RadioGroup
							className={`${PREFIX_CLASS}__radio-group`}
							options={[
								{ label: '启用', value: ENABLE, },
								{ label: '停用', value: DISABLE, },
							]}
						/>
					</FormItem>
				</Form>
			</PageModal>
		);
	}
}

SpecialLevelEditingModal.propTypes = propTypes;
SpecialLevelEditingModal.defaultProps = defaultProps;

export default SpecialLevelEditingModal;
