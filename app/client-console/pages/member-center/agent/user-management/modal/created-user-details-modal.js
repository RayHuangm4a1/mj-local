import React, { Component, } from 'react';
import {
	LabelText,
} from 'ljit-react-components';
import SubmitFormModal from '../../../../../components/submit-form-modal';
import copy from 'copy-to-clipboard';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { UserTypeEnum } from '../../../../../lib/enums'; 
const PREFIX_CLASS = 'created-user-details-modal';
const {
	AGENT,
} = UserTypeEnum;
const {
	SizeEnums,
} = LabelText;

const {
	MEDIUM,
} = SizeEnums;

const propTypes = {
	className: PropTypes.string,
	isVisible: PropTypes.bool,
	onClickOk: PropTypes.func,
	onClose: PropTypes.func,
	userData: PropTypes.shape({
		username: PropTypes.string,
		password: PropTypes.string,
		type: PropTypes.number,
		bonus: PropTypes.number,
		link: PropTypes.string,
	}),
};
const defaultProps = {
	onClickOk: () => {},
	onClose: () => {},
	isVisible: false,
	userData: {},
};

class CreatedUserDetailsModal extends Component {
	constructor() {
		super();
		this._handleClickOK = this._handleClickOK.bind(this);
	}
	_handleClickOK() {
		const {
			userData,
		} = this.props;
		const {
			password,
			link,
			username,
			type,
			bonus,
		} = userData;

		copy(`会员名称：${username}
预设密码：${password}
会员类型：${type === AGENT ? '代理' : '会员'}
会员奖金：${bonus}
当前线路：${link}`
		);
		this.props.onClose();
	}
	render() {
		const {
			_handleClickOK,
		} = this;
		const {
			isVisible,
			className,
			onClose,
			userData,
		} = this.props;
		const {
			username,
			password,
			type,
			bonus,
			link,
		} = userData;
		
		return (
			<SubmitFormModal
				title='新增会员详情'
				width="440px"
				isVisible={isVisible}
				okText='复制'
				cancelText='关闭'
				onClickCancel={onClose}
				onClickOk={_handleClickOK}
				className={cx(PREFIX_CLASS, className)}
			>
				<LabelText
					label="会员名称"
					text={username}
					labelColType={MEDIUM}
					fontSize={MEDIUM}
				/>
				<LabelText
					label="预设密码"
					text={password}
					labelColType={MEDIUM}
					fontSize={MEDIUM}
				/>
				<LabelText
					label="会员类型"
					text={type === AGENT ? '代理' : '会员'}
					labelColType={MEDIUM}
					fontSize={MEDIUM}
				/>
				<LabelText
					label="会员奖金"
					text={bonus}
					labelColType={MEDIUM}
					fontSize={MEDIUM}
				/>
				<LabelText
					label="当前线路"
					text={link}
					labelColType={MEDIUM}
					fontSize={MEDIUM}
				/>
			</SubmitFormModal>
		);
	}
}

CreatedUserDetailsModal.propTypes = propTypes;
CreatedUserDetailsModal.defaultProps = defaultProps;

export default CreatedUserDetailsModal;
