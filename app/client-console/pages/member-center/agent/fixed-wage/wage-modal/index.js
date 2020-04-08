import React, { Component, } from 'react';
import {
	Form,
	FormItem,
	LabelContent,
} from 'ljit-react-components';
import SubmitFormModal from '../../../../../components/submit-form-modal';
import SelectDropdown from '../../../../../components/select-dropdown';
import PropTypes from 'prop-types';
import './style.styl';

const PREFIX_CLASS = 'agent-wage-modal';

const propTypes = {
	editingMember: PropTypes.object,
	onEditMember: PropTypes.func,
	onCreateMember: PropTypes.func,
	onCancel: PropTypes.func,
	isVisible: PropTypes.bool,
	wageOptions: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]),
		value: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		])
	})),
};
const defaultProps = {
	onEditMember: () => {},
	onCreateMember: () => {},
	onCancel: () => {},
	isVisible: false,
	wageOptions: [],
};

class WageModal extends Component {
	constructor() {
		super();

		this._handleEditMember = this._handleEditMember.bind(this);
		this._handleCancel = this._handleCancel.bind(this);
	}

	_handleEditMember() {
		const { onEditMember, } = this.props;
		const form = this.formInstance.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				onEditMember(values);
			}
		});
	}
	_handleCancel() {
		const { onCancel, } = this.props;
		const form = this.formInstance.getForm();

		onCancel();
		form.resetFields();
	}

	render() {
		const {
			_handleEditMember,
			_handleCancel,
		} = this;
		const {
			editingMember,
			isVisible,
			wageOptions,
		} = this.props;

		const title = "固定工资设置";
		const username =  editingMember.username;
		const wage =  editingMember.fixedWage;

		return (
			<SubmitFormModal
				title={title}
				isVisible={isVisible}
				okText="保存"
				onClickCancel={_handleCancel}
				onClickOk={_handleEditMember}
				className={PREFIX_CLASS}
			>
				<Form
					cancelButtonDisabled
					submitButtonDisabled
					ref={(refForm) => this.formInstance = refForm}
				>
					<LabelContent
						label="会员名"
						labelColon={false}
						itemName="username"
					>
						<span>{username}</span>
					</LabelContent>
					<FormItem
						label="固定工资"
						itemName="wage"
						itemConfig={{
							initialValue: wage,
						}}
					>
						<SelectDropdown
							className={`${PREFIX_CLASS}__select`}
							options={wageOptions}
							placeholder="请选择需要设置的固定工资"
						/>
					</FormItem>
				</Form>
			</SubmitFormModal>
		);
	}
}

WageModal.propTypes = propTypes;
WageModal.defaultProps = defaultProps;

export default WageModal;
