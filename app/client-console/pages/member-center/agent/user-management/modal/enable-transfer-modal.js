import React, { Component, } from 'react';
import {
	Form,
	FormItem,
	Input,
	Icon,
} from 'ljit-react-components';
import SubmitFormModal from '../../../../../components/submit-form-modal';
import PropTypes from 'prop-types';
import cx from 'classnames';

const PREFIX_CLASS = 'enable-transfer-modal';

const propTypes = {
	className: PropTypes.string,
	isVisible: PropTypes.bool,
	onClickOk: PropTypes.func,
	onClickCancel: PropTypes.func,
};
const defaultProps = {
	onClickOk: () => {},
	onClickCancel: () => {},
	isVisible: false,
};

class EnableTransferModal extends Component {
	constructor() {
		super();
		this._renderTitle = this._renderTitle.bind(this);
		this._handleClickOK = this._handleClickOK.bind(this);
		this._handleClickCancel = this._handleClickCancel.bind(this);
	}

	_handleClickOK() {
		const { onClickOk, } = this.props;
		const form = this.formInstance.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				// TODO verification password
				onClickOk(values);
				form.resetFields();
			}
		});
	}

	_handleClickCancel() {
		const { onClickCancel, } = this.props;
		const form = this.formInstance.getForm();

		onClickCancel();
		form.resetFields();
	}
	_renderTitle() {
		return (
			<div className={`${PREFIX_CLASS}__title`}>
				<div>
					开通转帐
				</div>
				<div className="prompt-message">
					<Icon
						type={Icon.IconTypeEnums.INFO_FILL}
						size={Icon.SizeEnums.X_SMALL}
					/>
						开通有效期为12小时！
				</div>
			</div>
		);
	}
	render() {
		const {
			_renderTitle,
			_handleClickOK,
			_handleClickCancel,
		} = this;
		const {
			isVisible,
			className,
		} = this.props;

		return (
			<SubmitFormModal
				title={_renderTitle()}
				width="440px"
				isVisible={isVisible}
				onClickCancel={_handleClickCancel}
				onClickOk={_handleClickOK}
				className={cx(PREFIX_CLASS, className)}
			>
				<Form
					cancelButtonDisabled
					submitButtonDisabled
					ref={(refForm) => this.formInstance = refForm}
				>
					<FormItem
						label="资金密码"
						itemName="fundsPassword"
						labelColon={false}
					>
						<Input
							placeholder="请输入资金密码"
							type="password"
						/>
					</FormItem>
					<FormItem
						label="谷歌动态密码"
						itemName="googlePassword"
						labelColon={false}
					>
						<Input
							placeholder="请输入谷歌动态密码"
							type="password"
						/>
					</FormItem>
				</Form>
			</SubmitFormModal>
		);
	}
}

EnableTransferModal.propTypes = propTypes;
EnableTransferModal.defaultProps = defaultProps;

export default EnableTransferModal;
