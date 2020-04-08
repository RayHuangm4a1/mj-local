import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	LabelContent,
	Select,
	RadioGroup,
} from 'ljit-react-components';
import PageModal from '../../../../components/page-modal';

const PREFIX_CLASS = 'hierarchical-management-log';

const propTypes = {
	data: PropTypes.shape({
		previousLevelId: PropTypes.number,
		afterLevelId: PropTypes.number,
		type: PropTypes.number,
	}),
	isVisible: PropTypes.bool,
	onSubmit: PropTypes.func,
	onClose: PropTypes.func,
};
const defaultProps = {
	data: {},
	isVisible: false,
	onSubmit: () => {},
	onClose: () => {},
};

class LevelEditModal extends Component {
	constructor() {
		super();

		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleCancel = this._handleCancel.bind(this);
	}

	_handleSubmit() {
		const { onSubmit, onClose, } = this.props;
		const form = this.formInstance.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				onSubmit(values);
				onClose();
			}
		});
	}

	_handleCancel() {
		const { onClose, } = this.props;
		const form = this.formInstance.getForm();

		onClose();
		form.resetFields();
	}

	render() {
		const { data, isVisible, } = this.props;
		const { _handleSubmit, _handleCancel, } = this;
		const { previousLevelId, afterLevelId, type, } = data;

		return (
			<PageModal
				title="层级修改"
				visible={isVisible}
				onClickOk={_handleSubmit}
				onClickCancel={_handleCancel}
				width={'640px'}
				className={`${PREFIX_CLASS}__edit-level-modal`}
			>
				<Form
					ref={formRef => this.formInstance = formRef}
					submitButtonDisabled
					cancelButtonDisabled
				>
					<LabelContent
						itemName="previousLevelId"
						label="目前层级"
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
					>
						<span>{previousLevelId}</span>
					</LabelContent>
					<FormItem
						itemName="type"
						itemConfig={{ initialValue: type, }}
						label="层级类型"
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
					>
						<RadioGroup
							options={[
								// TODO use correct value
								{ label: '一般层', value: 0, },
								{ label: '特殊层', value: 1, },
							]}
						/>
					</FormItem>
					<FormItem
						itemName="afterLevelId"
						itemConfig={{ initialValue: afterLevelId, }}
						label="新的层级"
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
					>
						<Select
							options={[
								{ label: '自动加入层', value: '自动加入层', },
								{ label: '第四层', value: '第四层', },
							]}
						/>
					</FormItem>
				</Form>
			</PageModal>
		);
	}
}

LevelEditModal.propTypes = propTypes;
LevelEditModal.defaultProps = defaultProps;

export default LevelEditModal;
