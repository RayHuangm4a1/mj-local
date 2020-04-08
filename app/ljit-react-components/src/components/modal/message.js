import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import omit from 'lodash/omit';
import Modal from './';

const propTypes = {
	className: PropTypes.string,
	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	message: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
};
const defaultProps = {
	title: '提示',
	message: '',
};

class MessageModal extends Component {
	render() {
		const {
			className,
			title,
			message,
		} = this.props;
		const childProps = omit(this.props, [
			'className',
			'title',
			'message',
		]);

		return (
			<Modal
				{...childProps}
				title={title}
				isCentered
				className={cx('ljit-message-modal', className)}
				modalSize={Modal.ModalSizeEnum.SMALL}
			>
				{message}
			</Modal>
		);
	}
}

MessageModal.propTypes = propTypes;
MessageModal.defaultProps = defaultProps;

export default MessageModal;
