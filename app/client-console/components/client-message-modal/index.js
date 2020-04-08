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
	message: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	okText: PropTypes.string,
	cancelText: PropTypes.string,
	className: PropTypes.string,
	isVisible: PropTypes.bool,
	isHideCancelButton: PropTypes.bool,
	isCentered: PropTypes.bool,
	onClickCancel: PropTypes.func,
	onClickOk: PropTypes.func,
	zIndex: PropTypes.number,
};
const defaultProps = {
	title: '通知',
	className: '',
	message: '',
	width: '320px',
	okText: '确 定',
	cancelText: '取 消',
	isVisible: false,
	isHideCancelButton: false,
	isCentered: true,
	onClickCancel: () => {},
	onClickOk: () => {},
	zIndex: 1001,
};
const PREFIX_CLASS = 'ljit-client-message-modal';

const ClientMessageModal = ({
	title,
	className,
	message,
	isVisible,
	isHideCancelButton,
	isCentered,
	width,
	okText,
	cancelText,
	footer,
	onClickCancel,
	onClickOk,
	zIndex,
} = {}) => (
	<Modal
		className={cx(PREFIX_CLASS, className)}
		title={title}
		width={width}
		visible={isVisible}
		okText={okText}
		onClickOk={onClickOk}
		cancelText={cancelText}
		onClickCancel={onClickCancel}
		okButtonClassname={`${PREFIX_CLASS}__btn-ok`}
		cancelButtonClassname={cx(`${PREFIX_CLASS}__btn-cancel`, { [`${PREFIX_CLASS}__btn-cancel--hidden`]: isHideCancelButton })}
		footer={footer}
		isCentered={isCentered}
		zIndex={zIndex}
	>
		{message}
	</Modal>
);

ClientMessageModal.propTypes = propTypes;
ClientMessageModal.defaultProps = defaultProps;

export default ClientMessageModal;
