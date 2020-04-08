import React from 'react';
import PropTypes from 'prop-types';
import PageModal from '../../../../components/page-modal';
import { LabelContent, InputNumber } from 'ljit-react-components';
import { PREFIX_CLASS } from '.';

const propTypes = {
	isVisible: PropTypes.bool,
	input: PropTypes.oneOfType(
		PropTypes.number,
		PropTypes.string,
	),
	title: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	onCloseModal: PropTypes.func,
	onClickOk: PropTypes.func,
};

const defaultProps = {
	isVisible: false,
	onCloseModal: () => {},
	onClickOk: () => {},
	onChange: () => {},
	placeholder: '',
};

function EditModal({
	isVisible,
	input,
	onCloseModal,
	onClickOk,
	title,
	label,
	placeholder,
	onChange,
}) {
	function _handleSubmit() {
		onClickOk(input);
		_handleClose();
	}

	function _handleClose() {
		onCloseModal();
	}

	return (
		<PageModal
			className={`${PREFIX_CLASS}__page-modal`}
			modalSize={PageModal.ModalSizeEnum.SMALL}
			visible={isVisible}
			title={title}
			onClickCancel={_handleClose}
			onClickOk={_handleSubmit}
		>
			<LabelContent
				label={label}
				columnType={LabelContent.ColumnTypeEnums.LARGE}
			>
				<InputNumber
					value={input}
					onChange={(value) => onChange(value)}
					min={0}
					placeholder={placeholder}
				/>
			</LabelContent>
		</PageModal>
	);
}

EditModal.propTypes = propTypes;
EditModal.defaultProps = defaultProps;

export default EditModal;
