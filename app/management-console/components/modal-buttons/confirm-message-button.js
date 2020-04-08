import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextButton, } from 'ljit-react-components';
import PageModal from '../page-modal';

const { Message, } = PageModal;

const propTypes = {
	buttonText: PropTypes.string,
	title: PropTypes.string,
	message: PropTypes.string,
	onConfirm: PropTypes.func,
	isDisabled: PropTypes.bool,
};
const defaultProps = {
	onConfirm: () => {},
	isDisabled: false,
};

class ConfirmMessageButton extends Component {
	constructor() {
		super();
		this.state = {
			isConfirmMessageVisible: false,
		};

		this._handleConfirm = this._handleConfirm.bind(this);
	}
	_handleConfirm() {
		const { onConfirm, } = this.props;

		onConfirm();
		this.setState({ isConfirmMessageVisible: false });
	}
	render() {
		const {
			buttonText,
			title,
			message,
			isDisabled,
		} = this.props;
		const { isConfirmMessageVisible, } = this.state;
		const { _handleConfirm, } = this;

		return (
			<React.Fragment>
				<TextButton
					text={buttonText}
					onClick={() => this.setState({ isConfirmMessageVisible: true, })}
					disabled={isDisabled}
				/>
				<Message
					visible={isConfirmMessageVisible}
					title={title}
					message={message}
					onClickOk={_handleConfirm}
					onClickCancel={() => this.setState({ isConfirmMessageVisible: false, })}
				/>
			</React.Fragment>
		);
	}
}

ConfirmMessageButton.propTypes = propTypes;
ConfirmMessageButton.defaultProps = defaultProps;

export default ConfirmMessageButton;
