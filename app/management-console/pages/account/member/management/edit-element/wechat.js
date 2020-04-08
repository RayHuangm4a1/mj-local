import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'ljit-react-components';
import ConfirmMessageButton from '../../../../../components/modal-buttons/confirm-message-button';

const fakeWechat = {
	state: 'bind',
	openId: 'asdsada',
	expiredAt: '2020/12/21',
};

const propTypes = {
	wechat: PropTypes.shape({
		state: PropTypes.string,
		openId: PropTypes.string,
		expiredAt: PropTypes.string //Date
	}),
};
const defaultProps = {
	wechat: {},
};

class WechatEditElement extends Component {
	constructor() {
		super();
		this.state = {
			// TODO remove this, get data from props
			wechat: fakeWechat,
		};

		this._handleConfirm = this._handleConfirm.bind(this);
		this._renderOperation = this._renderOperation.bind(this);
	}
	_handleConfirm() {
		// TODO send unbind api
		this.setState({
			wechat: {
				state: null,
				openId: null,
				expiredAt: null,
			},
		});
	}
	_renderOperation() {
		const { wechat, } = this.state;
		const wechatUnbindDisable = !wechat.state;
		const { _handleConfirm, } = this;

		return (
			<ConfirmMessageButton
				buttonText="解除绑定"
				title="确认提示"
				message="是否解除绑定"
				onConfirm={_handleConfirm}
				isDisabled={wechatUnbindDisable}
			/>
		);
	}
	render() {
		const { wechat, } = this.state;
		const { _renderOperation, } = this;
		const wechatBindingContent = wechat.state ? '已绑定' : '未设定';

		return (
			<ListItem
				title="微信绑定"
				content={wechatBindingContent}
				right={_renderOperation()}
			/>
		);
	}
}

WechatEditElement.propTypes = propTypes;
WechatEditElement.defaultProps = defaultProps;

export default WechatEditElement;
