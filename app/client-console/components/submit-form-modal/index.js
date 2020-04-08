import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Modal, } from 'ljit-react-components';
import './style.styl';

const propTypes = {
	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	width: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	footer: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	okText: PropTypes.string,
	cancelText: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.string,
	isVisible: PropTypes.bool,
	onClickCancel: PropTypes.func,
	onClickOk: PropTypes.func,
	zIndex: PropTypes.number,
	isCentered: PropTypes.bool,
};
const defaultProps = {
	title: '',
	className: '',
	width: '440px',
	okText: '确 定',
	cancelText: '取 消',
	isCentered: true,
	isVisible: false,
	onClickCancel: () => {},
	onClickOk: () => {},
};
const PREFIX_CLASS = 'ljit-submit-form-modal';

const SubmitFormModal = ({
	title,
	children,
	className,
	isVisible,
	width,
	okText,
	cancelText,
	footer,
	onClickCancel,
	onClickOk,
	zIndex,
	isCentered,
} = {}) => (
	<Modal
		className={cx(PREFIX_CLASS, className)}
		title={title}
		width={width}
		visible={isVisible}
		onClickOk={onClickOk}
		okText={okText}
		onClickCancel={onClickCancel}
		okButtonClassname={`${PREFIX_CLASS}__btn-ok`}
		cancelButtonClassname={`${PREFIX_CLASS}__btn-cancel`}
		cancelText={cancelText}
		footer={footer}
		zIndex={zIndex}
		isCentered={isCentered}
	>
		{children}
	</Modal>
);

SubmitFormModal.propTypes = propTypes;
SubmitFormModal.defaultProps = defaultProps;

export default SubmitFormModal;
