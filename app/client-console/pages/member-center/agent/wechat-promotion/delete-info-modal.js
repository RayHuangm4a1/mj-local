import React from 'react';
import SubmitFormModal from '../../../../components/submit-form-modal';
import PropTypes from 'prop-types';

const propTypes = {
	isVisable: PropTypes.bool,
	onClickCancel: PropTypes.func,
	onClickOk: PropTypes.func,
};

const defaultProps = {
	onClickCancel: () => {},
	onClickOk: () => {},
};

// post delete API
function DeleteInfoModal({ isVisable, onClickCancel, onClickOk }) {
	return (
		<SubmitFormModal
			isVisible={isVisable}
			title="通知"
			onClickCancel={onClickCancel}
			onClickOk={onClickOk}
			width={"320px"}
			okText="刪除"
			className="ljit-wechat-promotion__delete-modal"
		>
			<div>
				确定要删除吗？
			</div>
		</SubmitFormModal>
	);
}

DeleteInfoModal.propTypes = propTypes;
DeleteInfoModal.defaultProps =defaultProps;

export default DeleteInfoModal;
